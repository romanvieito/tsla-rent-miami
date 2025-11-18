import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">TSLA Rent Miami</h1>
                <p className="text-sm text-gray-600 mt-1">Premium Tesla Rentals</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/#fleet" className="text-gray-700 hover:text-gray-900 font-medium">Our Fleet</Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">About</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              I&apos;m an engineer who loves exploring new places. A sunrise view with an espresso in hand? ☀️☕ That&apos;s my kind of bliss!
            </p>

            <p className="text-lg leading-relaxed">
              Fun fact: I used to be a hesitant driver, but I&apos;ve grown into a confident and careful one. Thanks to its incredible innovation, I feel safest in a Tesla. I&apos;m excited to share the joy of the road with you!
            </p>

            <p className="text-lg leading-relaxed">
              Let&apos;s connect on <a href="https://linkedin.com/in/yaibolanos" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-700 underline font-medium">LinkedIn</a>. Can&apos;t wait to drive and make new memories!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TSLA Rent Miami</h3>
              <p className="text-gray-400">
                Your premier destination for Tesla rentals in Miami. Experience FSD and sustainability in Miami.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/#fleet" className="hover:text-white">Our Fleet</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📍 Miami, FL</li>
                <li>📞 (786) 817-9906</li>
                <li>✉️ hi@tslarent.miami</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TSLA Rent Miami.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

