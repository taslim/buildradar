import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-inset-bottom">
      <div className="px-2 py-2 text-center">
        {/* Mobile: Single row, smaller text, better spacing */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-gray-600 sm:hidden">
          <a
            href="https://github.com/taslimislamjoy/buildradar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors px-1 py-1 rounded-sm touch-manipulation"
          >
            Open Source
          </a>
          <span className="text-gray-400">•</span>
          <a
            href="https://twitter.com/adewaleben/status/1866120574925697088"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors px-1 py-1 rounded-sm touch-manipulation"
          >
            h/t Adewale
          </a>
          <span className="text-gray-400">•</span>
          <a
            href="https://taslim.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors px-1 py-1 rounded-sm touch-manipulation"
          >
            taslim.xyz
          </a>
          <span className="text-gray-400">•</span>
          <Link
            href="/disclaimer"
            className="hover:text-gray-900 transition-colors px-1 py-1 rounded-sm touch-manipulation"
          >
            Disclaimer
          </Link>
        </div>

        {/* Desktop: Horizontal layout */}
        <div className="hidden sm:flex items-center justify-center text-sm text-gray-600 space-x-4 px-4">
          <a
            href="https://github.com/taslimislamjoy/buildradar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            Open Source
          </a>
          <span className="text-gray-400">•</span>
          <a
            href="https://twitter.com/adewaleben/status/1866120574925697088"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            h/t Adewale Yusuf
          </a>
          <span className="text-gray-400">•</span>
          <a
            href="https://taslim.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            taslim.xyz
          </a>
          <span className="text-gray-400">•</span>
          <Link
            href="/disclaimer"
            className="hover:text-gray-900 transition-colors"
          >
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
} 