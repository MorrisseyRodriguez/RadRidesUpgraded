import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../assets/images';

export default function OtherRentals() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-inter">
            Other Rentals
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore our additional rental options for different adventures and occasions.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Fiat 500 Abarth */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="relative overflow-hidden bg-black h-80">
              <img 
                src={images.fiat500.main}
                alt="Fiat 500 Abarth"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-6 left-6">
                <div className="text-white font-light text-lg tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 300 }}>
                  Fiat
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-xl font-bold text-white leading-tight mb-2 uppercase tracking-wide">
                Fiat 500 Abarth
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white text-xl font-bold">$350</span>
              </div>
              <Link 
                to="/cars/fiat-500-abarth"
                className="w-full bg-transparent border border-white text-white px-6 py-3 hover:bg-white hover:text-black transition-all duration-300 font-medium text-center block uppercase tracking-wider"
              >
                RESERVE NOW
              </Link>
            </div>
          </div>

          {/* Jeep Wrangler Rubicon 4xe */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="relative overflow-hidden bg-black h-80">
              <img 
                src={images.jeepWrangler.main}
                alt="Jeep Wrangler Rubicon 4xe"
               loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-6 left-6">
                <div className="text-white font-light text-lg tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 300 }}>
                  Jeep
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-xl font-bold text-white leading-tight mb-2 uppercase tracking-wide">
                Wrangler Rubicon 4xe
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white text-xl font-bold">$400</span>
              </div>
              <Link 
                to="/cars/jeep-wrangler-rubicon-4xe"
                className="w-full bg-transparent border border-white text-white px-6 py-3 hover:bg-white hover:text-black transition-all duration-300 font-medium text-center block uppercase tracking-wider"
              >
                RESERVE NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}