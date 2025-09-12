import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Phone, Star, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Contact from './components/Contact';
import CountdownBanner from './components/CountdownBanner';
import { images } from './assets/images';

// Lazy load components that are below the fold
const Testimonials = lazy(() => import('./components/Testimonials'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Team = lazy(() => import('./components/Team'));

// Loading component for Suspense fallback
const ComponentLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          
          setTimeout(() => {
            const elementRect = element.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.pageYOffset;
            window.scrollTo({
              top: absoluteElementTop - 100,
              behavior: 'smooth'
            });
          }, 500);
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative">
        <Hero />
      </div>

      {/* Countdown Banner */}
      <CountdownBanner />

      {/* Google Reviews Badge - Mobile Only */}
      <div className="bg-white py-4 sm:hidden mt-3">
        <div className="max-w-7xl mx-auto px-4 flex justify-center">
          <a
            href="https://www.google.com/search?q=rad+rides+bcr&rlz=1C1RXMK_enUS1153US1153&oq=rad+rides+bcr&gs_lcrp=EgZjaHJvbWUqDAgAECMYJxiABBiKBTIMCAAQIxgnGIAEGIoFMgYIARAjGCcyCggCEAAYogQYiQUyCggDEAAYgAQYogQyBwgEEAAY7wUyBggFEEUYQTIGCAYQRRhBMgYIBxBFGEHSAQg2NTg1ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-black rounded-xl p-4 shadow-xl border border-gray-800 hover:bg-gray-900 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 block"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Google Logo */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" className="flex-shrink-0">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-white font-semibold text-sm">Google</span>
              </div>
              
              {/* Rating and Reviews */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg">4.9</span>
                  <div className="flex gap-0.5 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="text-white font-medium group-hover:text-blue-300 transition-colors whitespace-nowrap">
                  40 reviews
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Testimonials Section */}
      <Suspense fallback={<ComponentLoader />}>
        <Testimonials />
      </Suspense>


      {/* Fleet Section - Simplified */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-inter">
              Our Fleet
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* McLaren 570S Spider */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden bg-black h-80">
                <img 
                  src={images.mclaren570s.main}
                  alt="McLaren 570S Spider"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-6 left-6">
                  <div className="text-white font-light text-lg tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 300 }}>
                    McLaren
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-xl font-bold text-white leading-tight mb-2 uppercase tracking-wide">
                  McLaren 570S Spider
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gray-500 line-through text-lg">$1,000</span>
                  <span className="text-white text-xl font-bold">$900</span>
                </div>
                <Link 
                  to="/cars/mclaren-570s-spider"
                  className="w-full bg-transparent border border-white text-white px-6 py-3 hover:bg-white hover:text-black transition-all duration-300 font-medium text-center block uppercase tracking-wider"
                >
                  RESERVE NOW
                </Link>
              </div>
            </div>

            {/* Corvette C8 Z06 */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden bg-black h-80">
                <img 
                  src={images.c8Corvette.main}
                  alt="Corvette C8 Z06"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-6 left-6">
                  <div className="text-white font-light text-lg tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 300 }}>
                    Chevrolet
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-xl font-bold text-white leading-tight mb-2 uppercase tracking-wide">
                  Corvette C8 Z06
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gray-500 line-through text-lg">$750</span>
                  <span className="text-white text-xl font-bold">$675</span>
                </div>
                <Link 
                  to="/cars/corvette-c8-z06"
                  className="w-full bg-transparent border border-white text-white px-6 py-3 hover:bg-white hover:text-black transition-all duration-300 font-medium text-center block uppercase tracking-wider"
                >
                  RESERVE NOW
                </Link>
              </div>
            </div>

            {/* Cadillac Escalade Sport Platinum */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden bg-black h-80">
                <img 
                  src={images.escalade.main}
                  alt="Cadillac Escalade Sport Platinum"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-6 left-6">
                  <div className="text-white font-light text-lg tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 300 }}>
                    Cadillac
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-xl font-bold text-white leading-tight mb-2 uppercase tracking-wide">
                  Escalade Sport Platinum
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gray-500 line-through text-lg">$450</span>
                  <span className="text-white text-xl font-bold">$405</span>
                </div>
                <Link 
                  to="/cars/cadillac-escalade-sport-platinum"
                  className="w-full bg-transparent border border-white text-white px-6 py-3 hover:bg-white hover:text-black transition-all duration-300 font-medium text-center block uppercase tracking-wider"
                >
                  RESERVE NOW
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12 space-y-4">
            <Link 
              to="/other-rentals"
              className="inline-flex items-center gap-2 bg-transparent border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-300 font-medium uppercase tracking-wider"
            >
              View Other Rentals
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-inter">
              Special Offers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Take advantage of our exclusive deals and save on your next luxury car rental.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-8"></div>
          </div>

          <div className="flex flex-row justify-center items-center gap-8 md:gap-16">
            {/* 10% Off Summer Deal */}
            <div className="text-center group cursor-pointer">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg font-bold">%</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-1">10%</div>
              <div className="text-gray-400 text-sm mb-2">Off First Rentals</div>
            </div>

            {/* Free Delivery */}
            <div className="text-center group cursor-pointer">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-1">FREE</div>
              <div className="text-gray-400 text-sm mb-2">Delivery Available</div>
            </div>

            {/* 4th Day Free */}
            <div className="text-center group cursor-pointer">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-1">4th</div>
              <div className="text-gray-400 text-sm mb-2">Day FREE</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <Suspense fallback={<ComponentLoader />}>
        <HowItWorks />
      </Suspense>

      {/* Team Section */}
      <Suspense fallback={<ComponentLoader />}>
        <Team />
      </Suspense>

      <Contact />
    </div>
  );
}

export default App;