export interface Category {
  id: string;
  name: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: 'healthcare',
    name: 'Healthcare/MedTech',
    color: '#EF4444',
  },
  {
    id: 'fintech',
    name: 'FinTech',
    color: '#10B981',
  },
  {
    id: 'edtech',
    name: 'EdTech',
    color: '#8B5CF6',
  },
  {
    id: 'proptech',
    name: 'Real Estate/PropTech',
    color: '#F59E0B',
  },
  {
    id: 'blockchain',
    name: 'Blockchain/Web3',
    color: '#06B6D4',
  },
  {
    id: 'creative',
    name: 'Creative/Design',
    color: '#EC4899',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce/Marketplace',
    color: '#84CC16',
  },
  {
    id: 'agritech',
    name: 'AgriTech/Food',
    color: '#65A30D',
  },
  {
    id: 'marketing',
    name: 'Marketing/AdTech',
    color: '#F97316',
  },
  {
    id: 'transport',
    name: 'Transportation/Logistics',
    color: '#3B82F6',
  },
  {
    id: 'energy',
    name: 'Energy/CleanTech',
    color: '#FBBF24',
  },
  {
    id: 'social',
    name: 'Social/Community',
    color: '#A855F7',
  },
  {
    id: 'technology',
    name: 'Technology/Software',
    color: '#6366F1',
  },
  {
    id: 'other',
    name: 'Other',
    color: '#6B7280',
  },
];

// Helper function to get category by ID
export function getCategoryById(id: string): Category | undefined {
  return categories.find(cat => cat.id === id);
}

// Helper function to get category by name (case-insensitive)
export function getCategoryByName(name: string): Category | undefined {
  return categories.find(cat => 
    cat.name.toLowerCase() === name.toLowerCase() ||
    cat.id.toLowerCase() === name.toLowerCase()
  );
} 