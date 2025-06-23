import fs from 'fs';
import path from 'path';
import axios from 'axios';
import type { Company } from '../../types/company';

// Raw data structures
export interface RawTweet {
  id: string;
  created_at: string;
  text: string;
  user: {
    id:string;
    username: string;
    display_name: string;
  };
  user_mentions?: { name: string; screen_name: string }[];
  urls?: { expanded_url: string; display_url: string }[];
}

export interface RawCompany {
  type: 'mention' | 'url' | 'text_mention' | 'profile_url';
  name: string;
  displayName?: string;
  url?: string;
  description: string;
  source: string;
}

// --- Categorization and Deduplication Logic ---

const duplicateGroups = [
    {
      mainName: "@techkiddies",
      displayName: "Tech Kiddies",
      variants: ["@techkiddies", "youtube.com/@TechKiddies", "@TechKiddies"],
      category: "EdTech",
      description: "Empowering kids with digital and future skills",
      urls: ["https://www.youtube.com/@TechKiddies"],
      sources: ["AA_DrSmith"]
    },
    {
      mainName: "@Mollet_app",
      displayName: "Mollet",
      variants: ["@Mollet_app", "elisee-oueffa-portfolio.super.site", "linktr.ee/elikemmedehou"],
      category: "FinTech",
      description: "A fully automated app that tracks and manages your mobile money finances without internet connection",
      urls: ["https://elisee-oueffa-portfolio.super.site/", "https://linktr.ee/elikemmedehou"],
      sources: ["elisee_oueffa", "elikemmedehou"]
    },
    {
      mainName: "@MugenicStridehq",
      displayName: "MugenicStride",
      variants: ["@MugenicStridehq", "@MGS_Ushering", "selar.co/m/chimuanya-dike"],
      category: "Technology/Software",
      description: "Solutions brand helping businesses improve customer service and creating job opportunities",
      urls: ["https://selar.co/m/chimuanya-dike"],
      sources: ["ChimuanyaDike"]
    }
];

export const categorizeCompany = (description: string): string => {
  const desc = description.toLowerCase();
  const categories = {
    'Healthcare/MedTech': ['health', 'medical', 'clinical', 'telemedicine', 'first aid', 'doctor', 'healthcare'],
    'FinTech': ['fintech', 'payment', 'finance', 'money', 'stablecoin', 'banking', 'financial'],
    'EdTech': ['education', 'learn', 'student', 'school', 'training', 'edtech', 'teach', 'course'],
    'Real Estate/PropTech': ['real estate', 'property', 'accommodation', 'housing', 'proptech', 'rent'],
    'Blockchain/Web3': ['blockchain', 'crypto', 'web3', 'defi', 'nft', 'chain', 'decentralized'],
    'Creative/Design': ['creative', 'design', 'art', 'brand', 'media', 'moodboard', 'studio', 'resin'],
    'E-commerce/Marketplace': ['marketplace', 'e-commerce', 'selling', 'shopping', 'vendor', 'fashion'],
    'AgriTech/Food': ['agriculture', 'farm', 'food', 'cassava', 'agri', 'farmer'],
    'Marketing/AdTech': ['ads', 'advertising', 'marketing', 'adtech', 'billboard'],
    'Transportation/Logistics': ['transport', 'mobility', 'logistics', 'charging', 'vehicle'],
    'Energy/CleanTech': ['energy', 'gas', 'electric', 'cleantech', 'solar', 'charge'],
    'Social/Community': ['collaboration', 'community', 'social', 'communication', 'privacy', 'book club'],
    'Technology/Software': ['automation', 'crm', 'saas', 'software', 'platform', 'app', 'tech', 'data']
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => desc.includes(keyword))) return category;
  }
  return 'Other';
};

export const cleanAndDeduplicate = (rawCompanies: RawCompany[]): Company[] => {
  const cleanCompanies: Company[] = [];
  duplicateGroups.forEach(group => {
    cleanCompanies.push({
      name: group.mainName,
      displayName: group.displayName,
      url: group.urls.length > 0 ? group.urls[0]! : '',
      allUrls: group.urls,
      description: group.description,
      category: group.category,
      sources: group.sources,
      variants: group.variants
    });
  });

  const allVariants = new Set(duplicateGroups.flatMap(g => g.variants.map(v => v.toLowerCase().replace(/[@\s\.]/g, ''))));
  const processedCompanies = new Map<string, Company>();

  rawCompanies.forEach(rawCompany => {
    const key = rawCompany.name.toLowerCase().replace(/[@\s\.]/g, '');
    if (!allVariants.has(key) && !key.includes('http')) {
      if (processedCompanies.has(key)) {
        const existing = processedCompanies.get(key);
        if (existing) {
          if (!existing.sources.includes(rawCompany.source)) existing.sources.push(rawCompany.source);
          if (rawCompany.url && !existing.allUrls.includes(rawCompany.url)) {
            existing.allUrls.push(rawCompany.url);
            if (!existing.url) existing.url = rawCompany.url ?? '';
          }
        }
      } else {
        const description = rawCompany.description?.split('\\n')[0]?.trim() ?? '';
        processedCompanies.set(key, {
          name: rawCompany.name,
          displayName: rawCompany.displayName ?? rawCompany.name.replace('@', ''),
          url: rawCompany.url ?? '',
          allUrls: rawCompany.url ? [rawCompany.url] : [],
          description,
          category: categorizeCompany(description),
          sources: [rawCompany.source],
          variants: [rawCompany.name]
        });
      }
    }
  });

  return [...cleanCompanies, ...Array.from(processedCompanies.values())];
};


// --- Data Extraction and Execution ---

export const readTwitterData = (): { quotes: RawTweet[], replies: RawTweet[] } => {
  const dataDir = path.join(process.cwd(), 'twitter_data');
  try {
    const quotesData = fs.readFileSync(path.join(dataDir, 'cleaned_quotes.json'), 'utf-8');
    const repliesData = fs.readFileSync(path.join(dataDir, 'cleaned_replies.json'), 'utf-8');
    const quotesJson = JSON.parse(quotesData) as { tweets: RawTweet[] };
    const repliesJson = JSON.parse(repliesData) as { tweets: RawTweet[] };
    return {
      quotes: quotesJson.tweets,
      replies: repliesJson.tweets
    };
  } catch (error) {
    console.error("Error reading twitter data:", error);
    return { quotes: [], replies: [] };
  }
};

export const expandUrl = async (url: string): Promise<string> => {
  try {
    if (url.startsWith('https://t.co/')) {
      const response = await axios.get(url, { timeout: 5000 });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return (response.request.res as { responseUrl?: string }).responseUrl ?? url;
    }
    return url;
  } catch {
    console.warn(`Could not expand URL ${url}. Retaining original.`);
    return url;
  }
};

export const extractRawCompanies = async (tweets: RawTweet[]): Promise<RawCompany[]> => {
  const rawCompanies: RawCompany[] = [];
  for (const tweet of tweets) {
    const cleanDescription = tweet.text.replace(/@AdewaleYusuf_/gi, '').trim();

    if (tweet.user_mentions) {
      for (const mention of tweet.user_mentions) {
        if (mention.screen_name.toLowerCase() !== 'adewaleyusuf_') {
            rawCompanies.push({ type: 'mention', name: `@${mention.screen_name}`, displayName: mention.name, description: cleanDescription, source: tweet.user.username });
        }
      }
    }
    if (tweet.urls) {
      for (const url of tweet.urls) {
        const expandedUrl = await expandUrl(url.expanded_url);
        if (!expandedUrl.includes('twitter.com') && !expandedUrl.includes('x.com')) {
          rawCompanies.push({ type: 'url', name: url.display_url, url: expandedUrl, description: cleanDescription, source: tweet.user.username });
        }
      }
    }
  }
  return rawCompanies;
};

export const processData = async () => {
  console.log('🚀 Starting company data cleaning process...\n');
  const { quotes, replies } = readTwitterData();
  const allTweets = [...quotes, ...replies];
  console.log(`🗞️  Read ${allTweets.length} total tweets.`);

  const rawCompanies = await extractRawCompanies(allTweets);
  console.log(`🔎 Extracted ${rawCompanies.length} raw company references.`);

  const cleanedCompanies = cleanAndDeduplicate(rawCompanies);
  console.log(`✨ Cleaned down to ${cleanedCompanies.length} unique companies.`);

  cleanedCompanies.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  
  const generateStats = (companies: Company[]) => {
    const byCategory = companies.reduce((acc, company) => {
      acc[company.category] = (acc[company.category] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return {
      totalCompanies: companies.length,
      totalCategories: Object.keys(byCategory).length,
      companiesWithUrls: companies.filter(c => c.url).length,
      categoriesBreakdown: byCategory,
    };
  };

  const stats = generateStats(cleanedCompanies);
  const output = {
    metadata: { processedAt: new Date().toISOString(), ...stats },
    companies: cleanedCompanies
  };

  const outputFile = path.join(process.cwd(), 'data', 'companies.json');
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));

  console.log('\n✅ Cleaning completed successfully!');
  console.log(`\n📁 Output written to: ${outputFile}`);
  console.log(`\n📈 Category breakdown:`);
  Object.entries(stats.categoriesBreakdown)
    .sort(([, countA], [, countB]) => countB - countA)
    .forEach(([category, count]) => console.log(`   ${category.padEnd(25, ' ')}: ${count}`));
};

if (require.main === module) {
    processData().catch((error: Error) => {
    console.error('❌ Error during cleaning process:', error.message);
    process.exit(1);
  });
} 