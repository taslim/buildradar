import React from 'react';
import Link from 'next/link';

export function Footer() {
  const footerLinks = [
    {
      href: "https://github.com/taslim/buildradar",
      label: "Open Source",
      external: true,
    },
    {
      href: "https://twitter.com/AdewaleYusuf_/status/1936389541260050658",
      label: { mobile: "h/t Adewale", desktop: "h/t Adewale Yusuf" },
      external: true,
    },
    {
      href: "https://taslim.xyz",
      label: "taslim.xyz",
      external: true,
    },
    {
      href: "/disclaimer",
      label: "Disclaimer",
      external: false,
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-inset-bottom">
      <div className="px-2 sm:px-4 py-2 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-600 sm:space-x-4">
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.href}>
              {index > 0 && <span className="text-gray-400">•</span>}
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors px-1 py-1 sm:px-0 sm:py-0 rounded-sm touch-manipulation"
                >
                  <span className="sm:hidden">
                    {typeof link.label === 'object' ? link.label.mobile : link.label}
                  </span>
                  <span className="hidden sm:inline">
                    {typeof link.label === 'object' ? link.label.desktop : link.label}
                  </span>
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="hover:text-gray-900 transition-colors px-1 py-1 sm:px-0 sm:py-0 rounded-sm touch-manipulation"
                >
                  <span className="sm:hidden">
                    {typeof link.label === 'object' ? link.label.mobile : link.label}
                  </span>
                  <span className="hidden sm:inline">
                    {typeof link.label === 'object' ? link.label.desktop : link.label}
                  </span>
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
} 