'use client';

import React, { useState } from 'react';
import { SearchBar } from './search-bar';

interface HeaderProps {
  onSearch: (query: string) => void;
  onRandomCompany: () => void;
  onLogoClick: () => void;
  showSearch: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onRandomCompany,
  onLogoClick,
  showSearch,
}) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl md:text-3xl mr-2">🏗️</span>
            <h1 className="text-lg md:text-xl font-semibold">BuildRadar</h1>
          </button>
          
          {/* Desktop Search and Random Button */}
          {showSearch && (
            <div className="hidden md:flex items-center gap-3 flex-1 max-w-2xl ml-8">
              <div className="flex-1">
                <SearchBar onSearch={onSearch} />
              </div>
              <button
                onClick={onRandomCompany}
                className="flex items-center px-4 py-2 bg-[#DBEAFE] text-[#2563EB] rounded-md hover:bg-[#BFDBFE] transition-colors whitespace-nowrap"
              >
                <span className="mr-2">🎲</span>
                <span>I&apos;m Feeling Lucky</span>
              </button>
            </div>
          )}
          
          {/* Mobile Search Icon */}
          {showSearch && (
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="w-10 h-10 flex items-center justify-center"
              >
                <span className="text-xl">🔍</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Search Overlay */}
      {showMobileSearch && showSearch && (
        <div className="md:hidden p-4 bg-white border-t border-gray-200">
          <SearchBar onSearch={onSearch} autoFocus />
        </div>
      )}
    </header>
  );
}; 