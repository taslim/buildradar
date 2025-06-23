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

export function loadCompanies(): CompaniesData {
  return companiesData as CompaniesData;
}

export function getCompanies(): Company[] {
  const data = loadCompanies();
  return data.companies;
}

export function getCompaniesMetadata() {
  const data = loadCompanies();
  return data.metadata;
} 