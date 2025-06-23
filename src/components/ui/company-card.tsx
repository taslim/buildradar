import React from 'react';
import Link from 'next/link';
import type { Company } from '../../../types/company';
import { getCategoryByName } from '../../../lib/categorization/categories';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  // Find category details based on the company's category
  const category = getCategoryByName(company.category);
  
  // Clean up the display name and description
  const cleanDescription = company.description
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all transform hover:scale-[1.02] p-5 h-full flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${category?.color}20`,
            color: category?.color,
          }}
        >
          {category?.name || 'Uncategorized'}
        </span>
        <span className="text-sm text-gray-500">{company.name}</span>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{company.displayName}</h3>
      
      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
        {cleanDescription}
      </p>
      
      {/* Sources */}
      {company.sources.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-500">
            Mentioned by: {company.sources.map((source: string) => `@${source}`).join(', ')}
          </p>
        </div>
      )}
      
      {/* Website or Twitter Link */}
      {company.url ? (
        <Link
          href={company.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#2563EB] hover:underline mt-auto transition-colors"
        >
          <span className="mr-1">🌐</span>
          Visit Website
        </Link>
      ) : company.name && (
        <Link
          href={`https://twitter.com/${company.name.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#2563EB] hover:underline mt-auto transition-colors"
        >
          <span className="mr-1">🐦</span>
          View on Twitter
        </Link>
      )}
    </div>
  );
}; 