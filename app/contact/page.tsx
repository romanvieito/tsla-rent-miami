import Link from 'next/link';

export default function Contact() {
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

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📍</span>
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p>2000 Biscayne Blvd</p>
                      <p>Miami, FL</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📞</span>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <a href="tel:7868179906" className="hover:text-gray-900">(786) 817-9906</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">✉️</span>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a href="mailto:hi@tslarent.miami" className="hover:text-gray-900">hi@tslarent.miami</a>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link 
                    href="/"
                    className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold text-base"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.5!2d-80.1914!3d25.7907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b68b0b0b0b0b%3A0x0!2zMjAwMCBCaXNjYXluZSBCbHZkLCBNaWFtaSwgRkwgMzMxMzI!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="2000 Biscayne Blvd, Miami, FL"
              ></iframe>
            </div>
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

