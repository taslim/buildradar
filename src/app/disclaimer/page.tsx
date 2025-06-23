import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Disclaimer - BuildRadar',
  description: 'Important information about data accuracy and usage',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              ← Back to BuildRadar
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Quick Heads Up! 👋
            </h1>
            <p className="text-gray-600">
              Here&apos;s what you should know about BuildRadar
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h2 className="font-semibold text-blue-900 mb-2">
                    This data wasn&apos;t verified
                  </h2>
                  <p className="text-blue-800 text-sm">
                    We automatically scraped Twitter replies and quotes to build this directory. 
                    Some info might be wrong, outdated, or missing since we haven&apos;t manually checked everything.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📸</span>
                <div>
                  <h2 className="font-semibold text-amber-900 mb-2">
                    It&apos;s a snapshot, not live data
                  </h2>
                  <p className="text-amber-800 text-sm">
                    This is a one-time pull from Twitter, so new companies and updates won&apos;t appear here. 
                    Think of it as exploring a moment in time.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <h2 className="font-semibold text-green-900 mb-2">
                    Perfect for discovery, not decisions
                  </h2>
                  <p className="text-green-800 text-sm">
                    Use this to find cool companies and get inspired! But always double-check with the 
                    companies directly before making any business decisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 text-center">
                Found something wrong? This is open source! 
                <a
                  href="https://github.com/taslim/buildradar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium ml-1"
                >
                  Help us improve it →
                </a>
              </p>
            </div>

            <div className="text-xs text-gray-500 text-center border-t border-gray-200 pt-4">
              <p>
                By using BuildRadar, you understand these limitations. 
                We&apos;re not responsible for decisions made based on this data, 
                but we hope you discover some amazing companies! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 