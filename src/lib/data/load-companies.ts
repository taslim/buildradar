import companiesData from '../../../data/companies.json';
import type { Company } from '../../../types/company';

export interface CompaniesData {
  metadata: {
    processedAt: string;
    totalCompanies: number;
    totalCategories: number;
    companiesWithUrls: number;
    categoriesBreakdown: Record<string, number>;
  };
  companies: Company[];
}

/**
 * Fisher-Yates shuffle algorithm to randomize array order
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Create a copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
}

export function loadCompanies(): CompaniesData {
  return companiesData as CompaniesData;
}

export function getCompanies(): Company[] {
  const data = loadCompanies();
  // Randomize the companies array on every load
  return shuffleArray(data.companies);
}

export function getCompaniesMetadata() {
  const data = loadCompanies();
  return data.metadata;
} 