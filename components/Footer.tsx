import Link from 'next/link';
import { forwardRef } from 'react';

const Footer = forwardRef<HTMLElement>((props, ref) => {
  return (
    <footer ref={ref} className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop: Single Row Layout */}
        <div className="hidden lg:flex justify-between items-center gap-8">
          {/* Left: Navigation Links */}
          <nav className="flex gap-6">
            <Link
              href="/reviews"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/policies"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Policies
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Center: Contact Info */}
          <div className="flex items-center gap-6">
            <a 
              href="mailto:yai@tsla.miami" 
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors group"
            >
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                yai@tsla.miami
              </span>
            </a>
            
            <span className="text-gray-300">|</span>
            
            <a 
              href="tel:+17868179906" 
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors group"
            >
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (786) 817-9906
              </span>
            </a>
          </div>
          
          {/* Right: Copyright */}
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Tsla.miami
          </p>
        </div>

        {/* Mobile: Contact First, Then Minimal Row */}
        <div className="lg:hidden flex flex-col items-center gap-3">
          {/* Contact Info - Prominent */}
          <div className="flex flex-col items-center gap-2">
            <a 
              href="mailto:yai@tsla.miami" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                yai@tsla.miami
              </span>
            </a>
            
            <a 
              href="tel:+17868179906" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (786) 817-9906
              </span>
            </a>
          </div>

          {/* Everything Else - Minimal Single Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] text-gray-400">
            <Link href="/reviews" className="hover:text-gray-600 transition-colors">
              Reviews
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-gray-600 transition-colors">
              About
            </Link>
            <span>•</span>
            <Link href="/policies" className="hover:text-gray-600 transition-colors">
              Policies
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-gray-600 transition-colors">
              Contact
            </Link>
            <span>•</span>
            <span>&copy; {new Date().getFullYear()} Tsla.miami</span>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;

