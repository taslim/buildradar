'use client';

import React, { useEffect, useState, useRef } from 'react';
import type { Category } from '../../../lib/categorization/categories';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Prevent body scroll when bottom sheet is open
  useEffect(() => {
    if (showAllCategories) {
      // Prevent scrolling on the body
      document.body.classList.add('scroll-lock');
    } else {
      // Re-enable scrolling on the body
      document.body.classList.remove('scroll-lock');
    }

    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [showAllCategories]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftFade(scrollLeft > 0);
    setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  const CategoryButton = ({ category }: { category: Category }) => (
    <button
      onClick={() => {
        onSelectCategory(category.id);
        setShowAllCategories(false);
      }}
      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
        selectedCategory === category.id
          ? 'text-white'
          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
      }`}
      style={
        selectedCategory === category.id
          ? {
              backgroundColor: category.color,
            }
          : {}
      }
    >
      <span className="flex items-center">
        <span
          className="w-2 h-2 rounded-full mr-2 flex-shrink-0"
          style={{
            backgroundColor:
              selectedCategory === category.id ? 'white' : category.color,
          }}
        ></span>
        <span className="truncate">{category.name}</span>
      </span>
    </button>
  );

  return (
    <div className="my-6 relative">
      {/* Mobile Scrollable Categories */}
      <div className="relative md:hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto hide-scrollbar gap-2 py-2"
          onScroll={handleScroll}
        >
          <button
            onClick={() => onSelectCategory('all')}
            className={`shrink-0 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#2563EB] text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            All Companies
          </button>
          {categories.slice(0, 5).map((category) => (
            <div key={category.id} className="shrink-0">
              <CategoryButton category={category} />
            </div>
          ))}
          {categories.length > 5 && (
            <button
              onClick={() => setShowAllCategories(true)}
              className="shrink-0 px-4 py-2 rounded-full whitespace-nowrap bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              +{categories.length - 5} More
            </button>
          )}
        </div>
        {showLeftFade && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F9FAFB] to-transparent pointer-events-none" />
        )}
        {showRightFade && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F9FAFB] to-transparent pointer-events-none" />
        )}
      </div>

      {/* Desktop Categories */}
      <div className="hidden md:block">
        <div className="flex flex-wrap gap-2 py-2">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#2563EB] text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            All Companies
          </button>
          {categories.map((category) => (
            <CategoryButton key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Mobile Category Bottom Sheet */}
      {showAllCategories && (
        <div 
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setShowAllCategories(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          
          {/* Bottom Sheet */}
          <div 
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl border-t border-gray-100 animate-in slide-in-from-bottom-full duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-gray-300"></div>
            </div>
            
            {/* Header */}
            <div className="flex justify-between items-center px-6 pb-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold">All Categories</h3>
              <button
                onClick={() => setShowAllCategories(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-500 text-lg">✕</span>
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    setShowAllCategories(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  All Companies
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onSelectCategory(category.id);
                      setShowAllCategories(false);
                    }}
                    className={`w-full px-4 py-3 rounded-xl transition-all ${
                      selectedCategory === category.id
                        ? 'text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                    style={
                      selectedCategory === category.id
                        ? {
                            backgroundColor: category.color,
                          }
                        : {}
                    }
                  >
                                         <span className="flex items-center justify-start">
                       <span
                         className="w-3 h-3 rounded-full mr-3 flex-shrink-0"
                         style={{
                           backgroundColor:
                             selectedCategory === category.id ? 'white' : category.color,
                         }}
                       ></span>
                       <span>{category.name}</span>
                     </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Safe area bottom padding */}
            <div className="h-safe-area-inset-bottom" />
          </div>
        </div>
      )}
    </div>
  );
}; 