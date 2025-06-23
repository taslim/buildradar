import React from 'react';
import { CompanyCard } from './company-card';
import type { Company } from '../../../types/company';

interface CompanyGridProps {
  companies: Company[];
  singleView?: boolean;
  onReturnHome: () => void;
}

export const CompanyGrid: React.FC<CompanyGridProps> = ({
  companies,
  singleView,
  onReturnHome,
}) => {
  if (companies.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          No companies found
        </h3>
        <p className="text-gray-500">
          No companies found, but that means there&apos;s room for yours! 🚀
        </p>
      </div>
    );
  }

  if (singleView) {
    return (
      <div className="max-w-2xl mx-auto pt-6">
        <button
          onClick={onReturnHome}
          className="text-[#2563EB] hover:underline mb-6 inline-flex items-center transition-colors"
        >
          ← Go back to all companies
        </button>
        {companies[0] && <CompanyCard company={companies[0]} />}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {companies.map((company, index) => (
        <div key={`${company.name}-${index}`}>
          <CompanyCard company={company} />
        </div>
      ))}
    </div>
  );
}; 