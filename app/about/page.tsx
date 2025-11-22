import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900">
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        {/* Header */}
        <Header />
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
          <Image
            src="/TeslaModels.jpg"
            alt="Tesla lineup in Miami"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Text content at bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16 drop-shadow-lg">
                About
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
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

      <Footer />
    </main>
  );
}

