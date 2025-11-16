import React, { useState, useEffect } from 'react';
import { Phone, Mail, Instagram, Send, MapPin, Clock, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import DateRangePicker from './ui/DateRangePicker';
import corvetteBgImage from '../assets/C8 Corvette/DSC01434.jpg';
import logoImage from '../assets/Logo/RadRides Logo-Picsart-BackgroundRemover.jpg';

// Vehicle options for the dropdown
const vehicleOptions = [
  { value: '', label: 'Select a vehicle' },
  { value: 'McLaren 570S Spider', label: 'McLaren 570S Spider' },
  { value: 'Corvette C8 Z06', label: 'Corvette C8 Z06' },
  { value: 'Cadillac Escalade Sport Platinum', label: 'Cadillac Escalade Sport Platinum' },
  { value: 'Jeep Wrangler Rubicon 4xe', label: 'Jeep Wrangler Rubicon 4xe' },
  { value: 'Fiat 500 Abarth', label: 'Fiat 500 Abarth' },
  { value: 'Request Car', label: 'Request Car' }
];

export default function Contact() {
  const location = useLocation();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [formData, setFormData] = useState({
    request_type: '',
    vehicle: '',
    start_date: '',
    end_date: '',
    tell_us_about_your_request: '',
    name: '',
    email: '',
    phone: '',
    first_timer_discount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle pre-selections from navigation state
  useEffect(() => {
    if (location.state?.preSelectCarRequest) {
      setFormData(prev => ({
        ...prev,
        request_type: 'car-request',
        vehicle: 'not-sure'
      }));
    }
  }, [location.state]);

  // Listen for custom event to pre-select form options
  useEffect(() => {
    const handlePreSelect = (event) => {
      if (event.detail?.preSelectCarRequest) {
        setFormData(prev => ({
          ...prev,
          request_type: 'car-request',
          vehicle: 'not-sure'
        }));
      }
    };

    const handleOpenBookingModal = (event) => {
      if (event.detail?.preSelectCarRequest) {
        setShowBookingModal(true);
        setFormData(prev => ({
          ...prev,
          request_type: 'booking',
          vehicle: 'not-sure'
        }));
      }
    };

    window.addEventListener('preSelectCarRequest', handlePreSelect);
    window.addEventListener('preSelectCarRequest', handleOpenBookingModal);
    return () => {
      window.removeEventListener('preSelectCarRequest', handlePreSelect);
      window.removeEventListener('preSelectCarRequest', handleOpenBookingModal);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'Yes' : '') : value
    }));
  };

  const handleDateSelect = (startDate, endDate) => {
    setFormData(prev => ({
      ...prev,
      start_date: startDate,
      end_date: endDate
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get current timestamp for the time field
    const currentTime = new Date().toLocaleString();

    try {
      // Create form data with all required fields for EmailJS
      const emailData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        vehicle: formData.vehicle || 'Not specified',
        start_date: formData.start_date || 'Not specified',
        end_date: formData.end_date || 'Not specified',
        tell_us_about_your_request: formData.tell_us_about_your_request,
        first_timer_discount: formData.first_timer_discount || 'No',
        time: currentTime
      };

      // Create a temporary form for EmailJS
      const tempForm = document.createElement('form');
      Object.keys(emailData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = emailData[key];
        tempForm.appendChild(input);
      });

      // 1. Internal email to you/your team
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        tempForm,
        'A-HdMpoJwY4IWoljY'
      );

      // 2. Auto-reply to customer
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
        tempForm,
        'A-HdMpoJwY4IWoljY'
      );

      toast.success('Message sent successfully!');

      // Track conversion in Google Ads
      if (window.gtag) {
        window.gtag('event', 'conversion', { 
          'send_to': `${import.meta.env.VITE_GOOGLE_ADS_ID}/${import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL}` 
        });
      }

      // Track form submission in Google Analytics 4
      if (window.gtag) {
        window.gtag('event', 'form_submission', {
          'form_name': 'Contact Page Form',
          'vehicle_of_interest': formData.vehicle || 'Not specified',
          'request_type': formData.request_type || 'Not specified',
          'first_timer_discount': formData.first_timer_discount || 'No'
        });
      }

      setFormData({
        request_type: '',
        vehicle: '',
        start_date: '',
        end_date: '',
        tell_us_about_your_request: '',
        name: '',
        email: '',
        phone: '',
        first_timer_discount: ''
      });

      // Close modal after successful submission
      setShowBookingModal(false);
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="relative min-h-screen">
      <Toaster position="top-right" />
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={corvetteBgImage}
          alt="Corvette background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Heading */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-inter tracking-wider">
              GET IN TOUCH
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left Side - Contact Information */}
            <div className="space-y-8">
              
              {/* Service Area */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">
                  SERVING LOS ANGELES & ORANGE COUNTY
                </h3>
                
                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-white">
                    <Instagram className="w-6 h-6 text-blue-400 flex-shrink-0" />
                    <div>
                      <a 
                        href="https://www.instagram.com/radridesbcr" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-medium hover:text-blue-300 transition-colors"
                      >
                        @radridesbcr
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white">
                    <Phone className="w-6 h-6 text-blue-400 flex-shrink-0" />
                    <div>
                      <a 
                        href="tel:+18189750220" 
                        className="text-lg font-medium hover:text-blue-300 transition-colors"
                      >
                        (818) 975-0220
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white">
                    <Mail className="w-6 h-6 text-blue-400 flex-shrink-0" />
                    <div>
                      <a 
                        href="mailto:radridesbcr@gmail.com" 
                        className="text-lg font-medium hover:text-blue-300 transition-colors"
                      >
                        radridesbcr@gmail.com
                      </a>
                    </div>
                  </div>
                  
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-8">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full max-w-md bg-transparent border-2 border-white text-white px-8 py-4 font-bold text-lg tracking-wider hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
                >
                  BOOK YOUR EXPERIENCE NOW
                </button>
              </div>
            </div>

            {/* Right Side - Google Maps */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d298915.0807693263!2d-118.6464318535588!3d34.131596318680245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa60b475497a1e3b9%3A0x11e11b485203e25c!2sRad%20Rides%20BCR!5e0!3m2!1sen!2sus!4v1756438707730!5m2!1sen!2sus" 
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-2xl"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form Section - Below the main content */}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-gray-900 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Logo */}
              <div className="text-center mb-6">
                <img 
                  src={logoImage}
                  alt="Rad Rides Logo" 
                  className="h-32 w-auto mx-auto mb-4"
                  onError={(e) => {
                    console.error('Logo failed to load:', logoImage);
                    e.target.style.display = 'none';
                  }}
                />
                <h2 className="text-2xl font-bold text-white mb-2 font-inter">
                  Book Your Dream Car Today
                </h2>
                <p className="text-gray-300 text-sm">
                  Let us know what you're looking for and we'll text you right back
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <select
                  name="request_type"
                  value={formData.request_type}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-600 p-3 text-white text-sm rounded focus:border-blue-500 focus:ring-0 transition-colors"
                >
                  <option value="" className="text-gray-900">Select your request type</option>
                  <option value="booking" className="text-gray-900">Booking a rental</option>
                  <option value="car-request" className="text-gray-900">Car request</option>
                </select>

                <select
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-600 p-3 text-white text-sm rounded focus:border-blue-500 focus:ring-0 transition-colors"
                >
                  {vehicleOptions.map((option) => (
                    <option key={option.value} value={option.value} style={{ color: 'white', backgroundColor: '#1f2937' }}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <DateRangePicker
                  onDateChange={(dates) => {
                    setFormData(prev => ({
                      ...prev,
                      start_date: dates.startDate,
                      end_date: dates.endDate
                    }));
                  }}
                  initialStartDate={formData.start_date}
                  initialEndDate={formData.end_date}
                  placeholder="Select rental dates"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-gray-800 border border-gray-600 p-3 text-white text-sm placeholder-gray-400 rounded focus:border-blue-500 focus:ring-0 transition-colors"
                />

                <textarea
                  name="tell_us_about_your_request"
                  value={formData.tell_us_about_your_request}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your request"
                  className="w-full bg-gray-800 border border-gray-600 p-3 text-white h-24 text-sm placeholder-gray-400 rounded focus:border-blue-500 focus:ring-0 transition-colors resize-none"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                  className="w-full bg-gray-800 border border-gray-600 p-3 text-white text-sm placeholder-gray-400 rounded focus:border-blue-500 focus:ring-0 transition-colors"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Your phone number"
                  className="w-full bg-gray-800 border border-gray-600 p-3 text-white text-sm placeholder-gray-400 rounded focus:border-blue-500 focus:ring-0 transition-colors"
                />

                <label className="flex items-center gap-3 text-sm text-white">
                  <input 
                    type="checkbox" 
                    name="first_timer_discount" 
                    checked={formData.first_timer_discount === 'Yes'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                  />
                  This is my first time renting with Rad Rides
                </label>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold btn-primary"
                >
                  {isSubmitting ? 'Sending...' : 'Book Your Ride Now'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}