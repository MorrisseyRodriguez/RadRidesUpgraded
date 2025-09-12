import React from 'react';
import { images } from '../assets/images';

export default function Team() {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-inter">
            Meet The Team
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            The passionate people behind Rad Rides who make every rental experience exceptional.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Chad */}
          <div className="text-center group">
            <div className="relative mb-6 overflow-hidden rounded-full w-48 h-48 mx-auto">
              <img 
                src={images.team.chad}
                alt="Chad - Founder"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Chad</h3>
            <p className="text-blue-600 font-semibold mb-3">Founder & CEO</p>
            <p className="text-gray-600 leading-relaxed">
              I stumbled into this business when I listed a salvage title Prius on Relay Rides. In spite of myself and with the help of Dara we've managed to build and keep it growing. I'm an enthusiast so you can always keep me talking when it comes to cars!
            </p>
          </div>

          {/* Dara */}
          <div className="text-center group">
            <div className="relative mb-6 overflow-hidden rounded-full w-48 h-48 mx-auto">
              <img 
                src={images.team.dara}
                alt="Dara - Operations Manager"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Dara</h3>
            <p className="text-blue-600 font-semibold mb-3">Operations Manager</p>
            <p className="text-gray-600 leading-relaxed">
              The silent partner and car rental delivery chase car girl!
            </p>
          </div>

          {/* Mascots */}
          <div className="text-center group">
            <div className="relative mb-6 overflow-hidden rounded-full w-48 h-48 mx-auto">
              <img 
                src={images.team.mascots}
                alt="Team Mascots"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">The Mascots</h3>
            <p className="text-blue-600 font-semibold mb-3">Chief Happiness Officers</p>
            <p className="text-gray-600 leading-relaxed">
              Our four-legged team members who bring joy and positive energy to the Rad Rides family every single day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}