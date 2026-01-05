import Link from 'next/link';
import { forwardRef } from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer = forwardRef<HTMLElement>((props, ref) => {
  return (
    <footer ref={ref} className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Primary Contact Section - Subtle Secondary */}
        <div className="flex flex-col items-center gap-4 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto">
            {/* Email - Subtle Contact */}
            <a 
              href="mailto:yai@tsla.miami" 
              className="group flex items-center justify-center gap-2.5 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm">yai@tsla.miami</span>
            </a>
            
            {/* Phone - Subtle Contact */}
            <a 
              href="tel:+17868179906" 
              className="group flex items-center justify-center gap-2.5 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm">+1 (786) 817-9906</span>
            </a>
          </div>
        </div>

        {/* Secondary Navigation & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100">
          {/* Navigation Links - Subdued */}
          <nav className="flex gap-6 order-2 sm:order-1">
            <Link 
              href="/reviews" 
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Reviews
            </Link>
            <Link 
              href="/about" 
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
          </nav>
          
          {/* Copyright - Subdued */}
          <p className="text-sm text-gray-400 order-1 sm:order-2">
            &copy; {new Date().getFullYear()} Tsla.miami
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;

