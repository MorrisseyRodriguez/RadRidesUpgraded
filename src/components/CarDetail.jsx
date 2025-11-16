import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Calendar, Gauge, Users, Clock, ChevronLeft, ChevronRight, ChevronDown, Send, Play, Shield, Truck, CircleCheck as CheckCircle, X, Cog, Car } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import DateRangePicker from './ui/DateRangePicker';

export default function CarDetail() {
  const car = useLoaderData();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    request_type: 'booking',
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

  if (!car) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Car not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to fleet
          </button>
        </div>
      </div>
    );
  }

  const images = car.images || [];
  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    if (images.length > 1) {
      setIsImageLoading(true);
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setIsImageLoading(true);
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const selectImage = (index) => {
    if (index !== currentImageIndex) {
      setIsImageLoading(true);
      setCurrentImageIndex(index);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  // Initialize form with car name
  useEffect(() => {
    if (car?.name) {
      setFormData(prev => ({
        ...prev,
        vehicle: car.name
      }));
    }
  }, [car?.name]);

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
        vehicle: formData.vehicle || car?.name || 'Not specified',
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
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 2. Auto-reply to customer
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
        tempForm,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success('Booking request sent successfully!');

      // Track conversion in Google Ads
      if (window.gtag) {
        window.gtag('event', 'conversion', { 
          'send_to': `${import.meta.env.VITE_GOOGLE_ADS_ID}/${import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL}` 
        });
      }

      // Track form submission in Google Analytics 4
      if (window.gtag) {
        window.gtag('event', 'form_submission', {
          'form_name': 'Car Detail Page Form',
          'vehicle_of_interest': formData.vehicle || car?.name || 'Not specified',
          'request_type': 'booking',
          'first_timer_discount': formData.first_timer_discount || 'No'
        });
      }

      setFormData({
        request_type: 'booking',
        vehicle: car?.name || '',
        start_date: '',
        end_date: '',
        tell_us_about_your_request: '',
        name: '',
        email: '',
        phone: '',
        first_timer_discount: ''
      });

      // Close form after successful submission
      setShowBookingForm(false);
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Failed to send booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    setShowBookingForm(true);
  };

  // Get pricing based on car name
  const getPricing = (carName) => {
    switch (carName) {
      case 'McLaren 570S Spider':
        return '$1,000';
      case 'Corvette C8 Z06':
        return '$750';
      case 'Cadillac Escalade Sport Platinum':
        return '$450';
      case 'Fiat 500 Abarth':
        return '$350';
      case 'Jeep Wrangler Rubicon 4xe':
        return '$400';
      default:
        return 'Contact for pricing';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      
      {/* Hero Section with Car Image */}
      <div className="relative h-[70vh] lg:h-screen">
        {/* Back Button */}
        <div className="absolute top-8 left-8 z-50">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Fleet
          </button>
        </div>

        {/* Main Car Image */}
        <div className="relative w-full h-full overflow-hidden">
          {currentImage && (
            <img
              src={currentImage}
              alt={car.name}
              className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                isImageLoading ? 'opacity-70' : 'opacity-100'
              }`}
              onLoad={handleImageLoad}
              loading="eager"
              fetchPriority="high"
            />
          )}
          
          {/* Image Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-30"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-30"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-6 right-6 z-30">
              <div className="image-counter">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
          )}

          {/* Car Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
            <div className="max-w-7xl mx-auto">
              <div className="car-detail-brand text-white/70 mb-2">
                {car.name.split(' ')[0]}
              </div>
              <h1 className="car-detail-model text-white mb-4">
                {car.name}
              </h1>
              
              {/* Pricing */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-white">
                  {getPricing(car.name)}/Day
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={scrollToContact}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Reserve Now
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery - Desktop */}
        {images.length > 1 && (
          <div className="hidden lg:block absolute bottom-24 left-8 right-8 z-20">
            <div className="flex gap-2 justify-center overflow-x-auto scrollbar-hide max-w-2xl mx-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`thumbnail-button flex-shrink-0 w-20 h-16 rounded overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'border-blue-500 active-thumbnail' 
                      : 'border-white/30 hover:border-white/70'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${car.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="lg:hidden bg-gray-100 py-4">
          <div className="px-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`thumbnail-button-mobile flex-shrink-0 w-16 h-12 rounded overflow-hidden border transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'border-blue-500 active-thumbnail-mobile' 
                      : 'border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${car.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Car Details Section */}
      <div className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Overview */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Overview</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {car.overview}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{car.acceleration}</div>
                  <div className="text-gray-600">0-60 mph</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{car.horsepower}</div>
                  <div className="text-gray-600">Horsepower</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{car.seats}</div>
                  <div className="text-gray-600">Seats</div>
                </div>
              </div>
            </div>

            {/* Right Column - Features & Booking */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Features</h2>
              <ul className="space-y-3 mb-8">
                {car.features?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Deposit Info */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Deposit Required</h3>
                <p className="text-gray-700">
                  A refundable deposit of <span className="font-semibold">{car.depositAmount}</span> is required to secure your booking.
                </p>
              </div>

              {/* Book Now Button */}
              <button
                onClick={scrollToContact}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Phone className="w-5 h-5" />
                Book This Car
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-gray-900 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowBookingForm(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 font-inter">
                  Book {car?.name}
                </h2>
                <p className="text-gray-300 text-sm">
                  Fill out the form below and we'll get back to you right away
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="request_type" value="booking" />
                <input type="hidden" name="vehicle" value={car?.name || ''} />

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
                  placeholder="Tell us about your rental needs"
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
                  {isSubmitting ? 'Sending...' : 'Book This Car Now'}
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