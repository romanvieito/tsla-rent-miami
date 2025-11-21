'use client';

import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                TRent.
              </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Reserve Button */}
            <a
              href="/#book-form"
              className="hidden sm:inline-flex bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors"
            >
              Reserve
            </a>

            {/* Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          </div>
        </div>

        {/* Menu */}
        {mobileMenuOpen && (
          <nav className="mt-4 pb-4 space-y-3 animate-in slide-in-from-top">
            <a href="/#book-form" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">Reserve</a>
            <a href="/reviews" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">What our clients say</a>
            <a href="/about" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">About</a>
          </nav>
        )}
      </div>
    </header>
  );
}
