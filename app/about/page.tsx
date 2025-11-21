import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

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

      <Footer />
    </main>
  );
}

