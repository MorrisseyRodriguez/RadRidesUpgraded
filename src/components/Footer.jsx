import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

export default function Footer({ scrollToSection }) {
  return (
    <footer className="bg-white text-gray-900 py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <Link to="/" className="text-2xl font-bold">
              <span className="text-blue-500">RadRides</span> BCR
            </Link>
            <p className="text-gray-600 mt-4">
              Luxury and exotic car rentals serving the Los Angeles area since 2014.
            </p>
            <a
              href="https://instagram.com/radridesbcr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-gray-600 hover:text-gray-900 transition-colors">
                About Us
              </Link>
              <Link to="/other-rentals" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Other Rentals
              </Link>
              <Link to="/request-car" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Request a Car
              </Link>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block text-gray-600 hover:text-gray-900 transition-colors w-full text-left"
              >
                Contact Us
              </button>
              <Link to="/faqs" className="block text-gray-600 hover:text-gray-900 transition-colors">
                FAQs
              </Link>
              <Link to="/insurance-policy" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Our Insurance Policy
              </Link>
              <Link to="/privacy" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-600">
              <p>Calabasas, CA 91302</p>
              <a 
                href="tel:+18189750220" 
                className="block hover:text-gray-900 transition-colors"
              >
                (818) 975-0220
              </a>
              <a 
                href="mailto:radridesbcr@gmail.com" 
                className="block hover:text-gray-900 transition-colors"
              >
                radridesbcr@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}