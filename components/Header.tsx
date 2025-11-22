'use client';

import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 bg-transparent z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
              <a href="/" className="text-2xl font-bold text-white drop-shadow-lg hover:opacity-80 transition-opacity">
                Tsla.miami
              </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
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
          <nav className="mt-4 pb-4 space-y-3 animate-in slide-in-from-top bg-black/80 backdrop-blur-md rounded-lg p-4">
            <a href="/reviews" className="block py-2 text-white hover:text-gray-200 font-medium">What our clients say</a>
            <a href="/about" className="block py-2 text-white hover:text-gray-200 font-medium">About</a>
          </nav>
        )}
      </div>
    </header>
  );
}
