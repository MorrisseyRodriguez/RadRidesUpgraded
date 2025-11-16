import React, { useState } from 'react';
import { Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import DateRangePicker from './ui/DateRangePicker';
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

export default function RequestCar() {
  const [formData, setFormData] = useState({
    request_type: 'car-request', // Pre-selected
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

      toast.success('Car request sent successfully!');

      // Track conversion in Google Ads
      if (window.gtag) {
        window.gtag('event', 'conversion', { 
          'send_to': `${import.meta.env.VITE_GOOGLE_ADS_ID}/${import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL}` 
        });
      }

      // Track form submission in Google Analytics 4
      if (window.gtag) {
        window.gtag('event', 'form_submission', {
          'form_name': 'Request Car Page Form',
          'vehicle_of_interest': formData.vehicle || 'Not specified',
          'request_type': formData.request_type || 'car-request',
          'first_timer_discount': formData.first_timer_discount || 'No'
        });
      }

      setFormData({
        request_type: 'car-request',
        vehicle: '',
        start_date: '',
        end_date: '',
        tell_us_about_your_request: '',
        name: '',
        email: '',
        phone: '',
        first_timer_discount: ''
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Failed to send request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <Toaster position="top-right" />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <img 
            src={logoImage}
            alt="Rad Rides Logo" 
            className="h-32 w-auto mx-auto mb-6"
            onError={(e) => {
              console.error('Logo failed to load:', logoImage);
              e.target.style.display = 'none';
            }}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-inter">
            Request a Car
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Looking for something specific? Let us know what you're interested in and we'll get back to you.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-8"></div>
        </div>

        <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hidden request type - pre-selected */}
            <input type="hidden" name="request_type" value="car-request" />

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                What vehicle are you interested in?
              </label>
              <select
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 p-3 text-white rounded-lg focus:border-blue-500 focus:ring-0 transition-colors"
              >
                {vehicleOptions.map((option) => (
                  <option key={option.value} value={option.value} style={{ color: 'white', backgroundColor: '#374151' }}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Preferred Dates (Optional)
              </label>
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
                placeholder="Select dates (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tell us about your request
              </label>
              <textarea
                name="tell_us_about_your_request"
                value={formData.tell_us_about_your_request}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 p-3 text-white h-32 rounded-lg resize-none placeholder-gray-400 focus:border-blue-500 focus:ring-0 transition-colors"
                placeholder="What are you looking for? Any specific requirements or questions?"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 p-3 text-white rounded-lg placeholder-gray-400 focus:border-blue-500 focus:ring-0 transition-colors"
                placeholder="Your name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 p-3 text-white rounded-lg placeholder-gray-400 focus:border-blue-500 focus:ring-0 transition-colors"
                placeholder="Your email"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 p-3 text-white rounded-lg placeholder-gray-400 focus:border-blue-500 focus:ring-0 transition-colors"
                placeholder="Your phone number"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isSubmitting ? 'Sending Request...' : 'Send Car Request'}
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}