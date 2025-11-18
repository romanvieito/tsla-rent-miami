import { cars } from '@/lib/cars';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">TSLA Rent Miami</h1>
              <p className="text-sm text-gray-600 mt-1">Premium Tesla Rentals</p>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#fleet" className="text-gray-700 hover:text-gray-900 font-medium">Our Fleet</a>
              <a href="/about" className="text-gray-700 hover:text-gray-900 font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Feel the Future in Miami
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our premium fleet of Teslas. All with FSD included.
          </p>
        </div>

        {/* Cars Grid */}
        <div id="fleet" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 bg-gray-200">
                <img
                  src={car.image}
                  alt={`${car.model} ${car.year}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-semibold text-gray-800">
                  {car.year}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{car.model}</h3>
                <p className="text-sm text-gray-600 mb-3">{car.color}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${car.price}</span>
                    <span className="text-sm text-gray-600">/day</span>
                  </div>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
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
                <li><a href="#fleet" className="hover:text-white">Our Fleet</a></li>
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
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

