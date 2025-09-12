import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Footer from './Footer';
import { images } from '../assets/images';

const NavLink = ({ to, children, className = "", onClick }) => (
  onClick ? (
    <button 
      onClick={onClick}
      className={clsx(
        "text-white/80 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-zinc-800 nav-link",
        className
      )}
    >
      {children}
    </button>
  ) : (
    <Link 
      to={to} 
      className={clsx(
        "text-white/80 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-zinc-800 nav-link",
        className
      )}
    >
      {children}
    </Link>
  )
);

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-32">
            <Link to="/" className="flex items-center gap-4">
              <img 
                src={images.logo}
                alt="Rad Rides Logo" 
                className="h-24 w-auto object-contain"
                width={96}
                height={96}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                onError={(e) => {
                  console.error('Primary logo failed to load, trying fallback:', images.logo);
                  // Try the fallback logo from public directory
                  e.target.src = '/RadRides-Logo.jpg';
                  e.target.onerror = () => {
                    console.error('All logo options failed, hiding image');
                    e.target.style.display = 'none';
                  };
                }}
                onLoad={() => {
                  console.log('Logo loaded successfully:', images.logo);
                }}
              />
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-inter">
                <span className="text-white">RadRides</span>
                <span className="text-blue-500">BCR</span>
              </span>
            </Link>

            {/* Right side navigation */}
            <div className="flex items-center gap-4">
              {/* Menu dropdown button */}
              <button
                className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 w-80 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-50 mr-4">
            <div className="px-4 pt-4 pb-4 space-y-2">
              <NavLink to="/" className="block">Home</NavLink>
              <NavLink onClick={() => scrollToSection('contact')} className="block">Contact Us</NavLink>
              <NavLink to="/other-rentals" className="block">Other Rentals</NavLink>
              <NavLink to="/request-car" className="block">Request a Car</NavLink>
              <NavLink to="/about" className="block">About Us</NavLink>
              <NavLink to="/faqs" className="block">FAQs</NavLink>
            </div>
          </div>
        )}
      </nav>

      <div>
        <Outlet />
      </div>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}