'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '../components/ui/header';
import { CategoryNav } from '../components/ui/category-nav';
import { CompanyGrid } from '../components/ui/company-grid';
import { FeelingLuckyButton } from '../components/ui/feeling-lucky-button';
import { getCompanies } from '../lib/data/load-companies';
import { searchCompanies, getRandomCompany, normalizeCategory } from '../lib/utils/search-utils';
import { categories } from '../../lib/categorization/categories';
import type { Company } from '../../types/company';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [singleCompanyId, setSingleCompanyId] = useState<string | null>(null);

  // Load companies data
  const companies = useMemo(() => getCompanies(), []);

  // Filter companies based on selected category and search query
  const filteredCompanies = useMemo(() => {
    if (singleCompanyId) {
      return companies.filter((company: Company) => 
        `${company.name}-${company.displayName}` === singleCompanyId
      );
    }

    return searchCompanies(companies, {
      query: searchQuery,
      category: selectedCategory === 'all' ? 'all' : normalizeCategory(selectedCategory),
    });
  }, [companies, selectedCategory, searchQuery, singleCompanyId]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSingleCompanyId(null);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSingleCompanyId(null);
  };

  const handleRandomCompany = () => {
    const randomCompany = getRandomCompany(companies);
    if (randomCompany) {
      setSingleCompanyId(`${randomCompany.name}-${randomCompany.displayName}`);
    }
  };

  const handleReturnHome = () => {
    setSingleCompanyId(null);
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Header
        onSearch={handleSearch}
        onRandomCompany={handleRandomCompany}
        onLogoClick={handleReturnHome}
        showSearch={!singleCompanyId}
      />
      <main className="container mx-auto px-4 pb-20">
        {!singleCompanyId && (
          <CategoryNav
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        )}
        <CompanyGrid
          companies={filteredCompanies}
          singleView={!!singleCompanyId}
          onReturnHome={handleReturnHome}
        />
      </main>
      <FeelingLuckyButton onClick={handleRandomCompany} />
    </div>
  );
}
