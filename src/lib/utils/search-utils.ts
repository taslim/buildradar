import type { Company } from '../../../types/company';

export interface SearchOptions {
  query: string;
  category: string;
}

export function searchCompanies(companies: Company[], options: SearchOptions): Company[] {
  const { query, category } = options;
  
  return companies.filter((company) => {
    // Filter by category
    const matchesCategory = 
      category === 'all' || 
      company.category.toLowerCase() === category.toLowerCase() ||
      company.category.toLowerCase().includes(category.toLowerCase());
    
    // Filter by search query
    const matchesSearch = 
      query === '' ||
      company.name.toLowerCase().includes(query.toLowerCase()) ||
      company.displayName.toLowerCase().includes(query.toLowerCase()) ||
      company.description.toLowerCase().includes(query.toLowerCase()) ||
      company.sources.some((source: string) => 
        source.toLowerCase().includes(query.toLowerCase())
      );
    
    return matchesCategory && matchesSearch;
  });
}

export function getRandomCompany(companies: Company[]): Company | null {
  if (companies.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * companies.length);
  return companies[randomIndex] || null;
}

export function normalizeCategory(category: string): string {
  // Map category names to IDs for consistent filtering
  const categoryMap: Record<string, string> = {
    'Healthcare/MedTech': 'healthcare',
    'FinTech': 'fintech',
    'EdTech': 'edtech',
    'Real Estate/PropTech': 'proptech',
    'Blockchain/Web3': 'blockchain',
    'Creative/Design': 'creative',
    'E-commerce/Marketplace': 'ecommerce',
    'AgriTech/Food': 'agritech',
    'Marketing/AdTech': 'marketing',
    'Transportation/Logistics': 'transport',
    'Energy/CleanTech': 'energy',
    'Social/Community': 'social',
    'Technology/Software': 'technology',
    'Other': 'other',
  };
  
  return categoryMap[category] || category.toLowerCase();
} 