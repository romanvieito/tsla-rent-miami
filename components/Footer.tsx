import Link from 'next/link';
import { forwardRef } from 'react';

const Footer = forwardRef<HTMLElement>((props, ref) => {
  return (
    <footer ref={ref} className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Tsla.miami</p>
          <div className="flex gap-6">
            <Link href="/reviews" className="hover:text-gray-900 transition-colors">
              Reviews
            </Link>
            <Link href="/about" className="hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-900 transition-colors">
              Contact
            </Link>
            <a href="mailto:yai@tsla.miami" className="hover:text-gray-900 transition-colors">
              yai@tsla.miami
            </a>
            <a href="tel:+17868179906" className="hover:text-gray-900 transition-colors">
              +1 (786) 817-9906
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;

