import React, { useState, useEffect } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Calendar, Gauge, Users, Clock, ChevronLeft, ChevronRight, ChevronDown, Send, Play, Shield, Truck, CheckCircle, X, Cog, Car } from 'lucide-react';
import { useCountdown } from './CountdownBanner';
import { images } from '../assets/images';
import DateRangePicker from './ui/DateRangePicker';

// Enhanced image error handler component
const CarImage = ({ src, fallbackSrc, alt, className, index, ...props }) => {
  // Normalize src to prevent undefined errors
  const normalizedSrc = src || '';
  const normalizedFallbackSrc = fallbackSrc || '';
  
  const [currentImageSrc, setCurrentImageSrc] = React.useState(normalizedSrc || normalizedFallbackSrc || '');
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [retryCount, setRetryCount] = React.useState(0);

  // Reset state when src prop changes
  React.useEffect(() => {
    setCurrentImageSrc(normalizedSrc || normalizedFallbackSrc || '');
    setHasError(false);
    setIsLoading(true);
    setRetryCount(0);
  }, [normalizedSrc, normalizedFallbackSrc]);

  // Handle image loading
  React.useEffect(() => {
    if (!currentImageSrc) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    img.onerror = () => {
      console.error(`Image failed to load: ${currentImageSrc}`);
      
      if (retryCount < 1 && normalizedSrc && currentImageSrc === normalizedSrc) {
        const timestamp = Date.now();
        setCurrentImageSrc(`${normalizedSrc}?reload=${timestamp}`);
        setRetryCount(prev => prev + 1);
        return;
      }
      
      if (!hasError && normalizedFallbackSrc && currentImageSrc !== normalizedFallbackSrc) {
        console.log(`Using fallback image for: ${normalizedSrc}`);
        setCurrentImageSrc(normalizedFallbackSrc);
        setRetryCount(0);
      } else {
        setIsLoading(false);
        setHasError(true);
      }
    };
    img.src = currentImageSrc;
  }, [currentImageSrc, normalizedSrc, normalizedFallbackSrc, retryCount, hasError]);

  const handleError = () => {
    console.error(`Image failed to load: ${currentImageSrc}`);
    
    if (retryCount < 1 && normalizedSrc) {
      const timestamp = Date.now();
      setCurrentImageSrc(`${normalizedSrc}?reload=${timestamp}`);
      setRetryCount(prev => prev + 1);
      return;
    }
    
    if (!hasError && normalizedFallbackSrc) {
      console.log(`Using fallback image for: ${currentImageSrc}`);
      setCurrentImageSrc(normalizedFallbackSrc);
      setHasError(true);
      setRetryCount(0);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const forceReload = () => {
    setIsLoading(true);
    setHasError(false);
    const timestamp = Date.now();
    setCurrentImageSrc(normalizedSrc ? `${normalizedSrc}?reload=${timestamp}` : normalizedFallbackSrc || '');
    setRetryCount(0);
  };

  return (
    <div className="relative w-full h-full">
      <img 
        src={currentImageSrc}
        alt={alt || 'Car image'}
        className={`${className} ${isLoading ? 'opacity-75' : 'opacity-100'} transition-opacity duration-200`}
        onError={handleError}
        onLoad={handleLoad}
        loading={index < 4 ? "eager" : "lazy"}
        fetchPriority={index < 4 ? "high" : "auto"}
        decoding={index < 4 ? "sync" : "async"}
        {...props}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90">
          <button
            onClick={forceReload}
            className="text-sm text-blue-600 bg-white px-3 py-2 rounded shadow hover:bg-gray-50"
          >
            Retry Loading
          </button>
        </div>
      )}
    </div>
  );
};

export default function CarDetail() {
  const car = useLoaderData();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showRentalInfo, setShowRentalInfo] = useState(false);
  const timeLeft = useCountdown();
  
  // Touch/swipe state for mobile carousel
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Form state management
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
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Early return if no car data
  if (!car) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        {/* Mobile Title and Offer Section - Above Hero */}
        <div className="lg:hidden bg-black px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Car Title */}
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-tight uppercase text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              {car.name}
            </h1>
            
            {/* Pricing Section - Only show for McLaren, Corvette, and Escalade */}
            {(car.name === 'McLaren 570S Spider' || car.name === 'Corvette C8 Z06' || car.name === 'Cadillac Escalade Sport Platinum') && (
              <div className="flex flex-col items-center gap-4">
                <span className="text-blue-400 text-lg font-semibold uppercase tracking-wide">
                  SUMMER TIME OFFER
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-white/60 line-through text-2xl font-light">
                    {car.name === 'McLaren 570S Spider' ? '$1,000' : 
                     car.name === 'Corvette C8 Z06' ? '$750' : 
                     car.name === 'Cadillac Escalade Sport Platinum' ? '$450' : '$500'}
                  </span>
                  <span className="text-white text-3xl font-bold">
                    {car.name === 'McLaren 570S Spider' ? '$900/Day' : 
                     car.name === 'Corvette C8 Z06' ? '$675/Day' : 
                     car.name === 'Cadillac Escalade Sport Platinum' ? '$405/Day' : '$450/Day'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Car not found</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  // Reset form when car changes
  useEffect(() => {
    if (car) {
      setSelectedImageIndex(0);
      setShowGalleryModal(false);
      setShowRentalInfo(false);
      setFormData({
        request_type: 'booking',
        vehicle: car.name || '',
        start_date: '',
        end_date: '',
        tell_us_about_your_request: '',
        name: '',
        email: '',
        phone: '',
        first_timer_discount: ''
      });
    }
  }, [car]);

  // Navigation functions for gallery
  const nextImage = () => {
    const imageArray = car.images || [car.image] || [];
    if (imageArray.length === 0) return;
    setSelectedImageIndex(prev => (prev + 1) % imageArray.length);
  };

  const prevImage = () => {
    const imageArray = car.images || [car.image] || [];
    if (imageArray.length === 0) return;
    setSelectedImageIndex(prev => (prev - 1 + imageArray.length) % imageArray.length);
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showGalleryModal) return;
      
      switch (e.key) {
        case 'Escape':
          setShowGalleryModal(false);
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showGalleryModal]);

  // Swipe functionality for mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  // Form change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'Yes' : '') : value
    }));
  };
  
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.tell_us_about_your_request.trim()) {
      setSubmitStatus('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    // Get current timestamp for the time field
    const currentTime = new Date().toLocaleString();

    try {
      // Create form data with all required fields for EmailJS
      const emailData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        vehicle: formData.vehicle || car.name,
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

      // Check if EmailJS is available
      if (!window.emailjs) {
        throw new Error('EmailJS not loaded');
      }

      // 1. Internal email to you/your team
      await window.emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        tempForm,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 2. Auto-reply to customer
      await window.emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
        tempForm,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('Booking request sent successfully! We\'ll contact you shortly.');

      // Track conversion in Google Ads
      if (window.gtag) {
        window.gtag('event', 'conversion', { 
          'send_to': `${import.meta.env.VITE_GOOGLE_ADS_ID}/${import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL}` 
        });
      }

      // Track form submission in Google Analytics 4
      if (window.gtag) {
        window.gtag('event', 'form_submission', {
          'form_name': 'Car Detail Booking Form',
          'vehicle_of_interest': formData.vehicle || car.name,
          'request_type': formData.request_type || 'booking',
          'first_timer_discount': formData.first_timer_discount || 'No'
        });
      }

      // Reset form after successful submission
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
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('Failed to send booking request. Please try calling us at (818) 975-0220.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ensure we have a valid image array and selected index
  const imageArray = car.images || [car.image] || [];
  const validIndex = selectedImageIndex < imageArray.length ? selectedImageIndex : 0;
  const currentImage = imageArray[validIndex] || car.image || '';

  // Debug logging to check images
  useEffect(() => {
    console.log('Car data:', car.name);
    console.log('Image array:', imageArray);
    console.log('Selected index:', selectedImageIndex);
    console.log('Current image:', currentImage);
  }, [car.name, imageArray, selectedImageIndex, currentImage]);

  // Get car specs based on car name
  const getCarSpecs = (carName) => {
    const specs = {
      'McLaren 570S Spider': {
        acceleration: '3.2s',
        horsepower: '562 hp',
        seats: '2 seats',
        perfectFor: ['Joyrides', 'Celebrations', 'Special Events'],
        whyDrive: "The McLaren 570S isn't just a car. It's a statement. A precision-engineered supercar designed to thrill at every turn — from coastal highways to city nights.",
        experience: "562 hp. 3.2s to 60. An experience engineered for thrill-seekers."
      },
      'Corvette C8 Z06': {
        acceleration: '2.6s',
        horsepower: '670 hp',
        seats: '2 seats',
        perfectFor: ['Joyrides', 'Celebrations', 'Special Occasions'],
        whyDrive: "The C8 Z06 represents the pinnacle of American sports car engineering.",
        experience: "670 hp. 2.6s to 60. Pure American supercar power."
      }
    };
    
    return specs[carName] || {
      acceleration: car.acceleration || 'N/A',
      horsepower: car.horsepower || 'N/A',
      seats: car.seats ? `${car.seats} seats` : 'N/A',
      perfectFor: ['Special Occasions'],
      whyDrive: car.overview || "Experience luxury driving.",
      experience: "Pure driving excellence."
    };
  };

  const carSpecs = getCarSpecs(car.name);

  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Mobile Title Section - Above Images */}
      <div className="lg:hidden bg-black px-4 py-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Car Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            {car.name}
          </h1>
          
          {/* Pricing Section - Only show for McLaren, Corvette, and Escalade */}
          {(car.name === 'McLaren 570S Spider' || car.name === 'Corvette C8 Z06' || car.name === 'Cadillac Escalade Sport Platinum') && (
            <div className="flex flex-col items-center gap-4 mb-6">
              <span className="text-blue-400 text-lg font-semibold uppercase tracking-wide">
                SUMMER TIME OFFER
              </span>
              <div className="flex items-center gap-4">
                <span className="text-white/60 line-through text-2xl font-light">
                  {car.name === 'McLaren 570S Spider' ? '$1,000' : 
                   car.name === 'Corvette C8 Z06' ? '$750' : 
                   car.name === 'Cadillac Escalade Sport Platinum' ? '$450' : '$500'}
                </span>
                <span className="text-white text-3xl font-bold">
                  {car.name === 'McLaren 570S Spider' ? '$900/Day' : 
                   car.name === 'Corvette C8 Z06' ? '$675/Day' : 
                   car.name === 'Cadillac Escalade Sport Platinum' ? '$405/Day' : '$450/Day'}
                </span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Hero Section - Optimized for car images */}
      <div className="relative h-[50vh] md:h-[65vh] lg:h-[70vh] w-full overflow-hidden flex flex-col lg:flex-row">
        {/* Left Column - Car Image */}
        <div 
          className="relative w-full lg:w-3/5 h-full flex items-center justify-center bg-black"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <CarImage 
            src={currentImage}
            fallbackSrc={car.fallbacks?.[0] || 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&h=1080&fit=crop&crop=center'}
            alt={car.name}
            className="w-full h-full object-contain"
            index={0}
          />
          
          {/* Lighter overlay to show more of the car */}
          <div className="absolute inset-0 bg-black/10">
            {/* Navigation Arrows - Positioned closer to image */}
            {imageArray.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </>
            )}
            {/* View All Images Button - Top right */}

            {/* Image Counter - Top left */}
            {imageArray.length > 1 && (
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
                {selectedImageIndex + 1} / {imageArray.length}
              </div>
            )}
          </div>
        </div>
        

        {/* Right Column - Car Title and Offer */}
        <div className="hidden lg:flex lg:relative lg:w-2/5 lg:h-full lg:bg-black lg:p-8 flex-col justify-center items-start">
          {/* Car Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 tracking-tight uppercase text-center lg:text-left" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            {car.name}
          </h1>
          
          {/* Pricing Section - Only show for McLaren, Corvette, and Escalade */}
          {(car.name === 'McLaren 570S Spider' || car.name === 'Corvette C8 Z06' || car.name === 'Cadillac Escalade Sport Platinum') && (
            <div className="flex flex-col items-center lg:items-start gap-2 lg:gap-4">
              <span className="text-blue-400 text-sm lg:text-lg font-semibold uppercase tracking-wide">
                SUMMER TIME OFFER
              </span>
              <div className="flex items-center gap-3 lg:gap-4">
                <span className="text-white/60 line-through text-lg lg:text-2xl font-light">
                  {car.name === 'McLaren 570S Spider' ? '$1,000' : 
                   car.name === 'Corvette C8 Z06' ? '$750' : 
                   car.name === 'Cadillac Escalade Sport Platinum' ? '$450' : '$500'}
                </span>
                <span className="text-white text-xl lg:text-3xl font-bold">
                  {car.name === 'McLaren 570S Spider' ? '$900/Day' : 
                   car.name === 'Corvette C8 Z06' ? '$675/Day' : 
                   car.name === 'Cadillac Escalade Sport Platinum' ? '$405/Day' : '$450/Day'}
                </span>
              </div>
            </div>
          )}
          
          {/* Desktop Thumbnail Gallery - Below text content */}
          {imageArray.length > 1 && (
            <div className="flex justify-center gap-2 bg-black/60 backdrop-blur-sm rounded-lg p-2 mt-6">
              {imageArray.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-12 rounded overflow-hidden border-2 transition-all duration-300 thumbnail-button ${
                    selectedImageIndex === index 
                      ? 'border-blue-400 active-thumbnail' 
                      : 'border-white/40 hover:border-white/70'
                  }`}
                >
                  <CarImage 
                    src={image}
                    fallbackSrc={car.fallbacks?.[index] || 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop&crop=center'}
                    alt={`${car.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    index={index + 10}
                  />
                </button>
              ))}
            </div>
          )}
        </div>


        {/* Mobile Only - Image Navigation Dots and Swipe Hint */}
        {imageArray.length > 1 && (
          <div className="lg:hidden">
            {/* Image Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {imageArray.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedImageIndex 
                      ? 'bg-blue-400 scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Thumbnail Gallery - Below main image */}
      <div className="lg:hidden bg-black px-4 py-4">
        {imageArray.length > 1 && (
          <div className="flex justify-center gap-2 overflow-x-auto scrollbar-hide pb-2">
            {imageArray.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-300 thumbnail-button-mobile ${
                  selectedImageIndex === index 
                    ? 'border-blue-400 active-thumbnail-mobile' 
                    : 'border-white/40 hover:border-white/70'
                }`}
              >
                <CarImage 
                  src={image}
                  fallbackSrc={car.fallbacks?.[index] || 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop&crop=center'}
                  alt={`${car.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                  index={index + 20}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Performance Stats - Below Images */}
      <div className="lg:hidden bg-black px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-xs text-white/60 uppercase tracking-wider mb-1">0-60 MPH</div>
              <div className="text-lg font-bold text-white">{carSpecs.acceleration}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Gauge className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Horsepower</div>
              <div className="text-lg font-bold text-white">{carSpecs.horsepower}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Seating</div>
              <div className="text-lg font-bold text-white">{carSpecs.seats}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column - Car Details and Special Offers */}
            <div className="lg:col-span-3 space-y-8">
              {/* Booking Form - Mobile Only */}
              <div className="lg:hidden">
                <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden" style={{ backgroundColor: '#0b0f14' }}>
                  
                  {/* Promotional Banner */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-lg font-bold">Limited Time: 10% Off First Visit</span>
                    </div>
                    
                    {/* Countdown display */}
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-center">
                        <div className="text-lg font-bold leading-none">{timeLeft.weeks}</div>
                        <div className="text-xs uppercase tracking-wider opacity-90">Wks</div>
                      </div>
                      <div className="text-white/70 text-sm">|</div>
                      <div className="text-center">
                        <div className="text-lg font-bold leading-none">{timeLeft.days}</div>
                        <div className="text-xs uppercase tracking-wider opacity-90">Days</div>
                      </div>
                      <div className="text-white/70 text-sm">|</div>
                      <div className="text-center">
                        <div className="text-lg font-bold leading-none">{timeLeft.hours}</div>
                        <div className="text-xs uppercase tracking-wider opacity-90">Hrs</div>
                      </div>
                      <div className="text-white/70 text-sm">|</div>
                      <div className="text-center">
                        <div className="text-lg font-bold leading-none">{timeLeft.minutes}</div>
                        <div className="text-xs uppercase tracking-wider opacity-90">Min</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-6">BOOK NOW</h3>
                    
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {/* Hidden vehicle input */}
                      <input type="hidden" name="vehicle" value={car.name} />

                      {/* Simplified Date Selection */}
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Select Dates</label>
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
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Tell us about your request</label>
                        <textarea
                          name="tell_us_about_your_request"
                          value={formData.tell_us_about_your_request}
                          onChange={handleChange}
                          required
                          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg h-20 resize-none text-white placeholder-gray-400 focus:border-blue-500 focus:ring-0"
                          placeholder="Optional..."
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-0"
                          placeholder="Name"
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-0"
                          placeholder="Email"
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-0"
                          placeholder="Phone number"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox"
                          name="first_timer_discount"
                          checked={formData.first_timer_discount === 'Yes'}
                          onChange={handleChange}
                          className="w-4 h-4 bg-gray-800/50 border-gray-600 rounded"
                        />
                        <label className="text-sm text-blue-400">
                          Claim Your First-Timers 10% Discount
                        </label>
                      </div>

                      <div className="pt-4 space-y-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-3 px-4 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 text-sm lg:text-base ${
                            isSubmitting 
                              ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105'
                          }`}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Request'}
                          <Send className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                      
                        {/* Status message */}
                        {submitStatus && (
                          <div className="mt-4 text-center">
                            <p className={`text-sm ${submitStatus.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                              {submitStatus}
                            </p>
                          </div>
                        )}
                      </div>
                    </form>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-4 border-t border-gray-700/50">
                      <div className="text-center text-xs text-white/60 space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Shield className="w-3 h-3 flex-shrink-0" />
                          <span>Secure Booking</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <Truck className="w-3 h-3 flex-shrink-0" />
                          <span>Delivery Available</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Stats - Desktop Only */}
              <div className="hidden lg:grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-sm text-white/60 uppercase tracking-wider mb-1">0-60 MPH</div>
                  <div className="text-2xl font-bold text-white">{carSpecs.acceleration}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Gauge className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-sm text-white/60 uppercase tracking-wider mb-1">Horsepower</div>
                  <div className="text-2xl font-bold text-white">{carSpecs.horsepower}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-sm text-white/60 uppercase tracking-wider mb-1">Seating</div>
                  <div className="text-2xl font-bold text-white">{carSpecs.seats}</div>
                </div>
              </div>

              {/* Special Offers Section - Smaller version */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Special Offers</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  {/* 10% Off First Visit */}
                  <div 
                    className="text-center hover:bg-gray-700/20 transition-all duration-300 group cursor-pointer relative overflow-hidden offer-card p-2 lg:p-3 rounded-lg"
                    onClick={(e) => {
                      const card = e.currentTarget;
                      card.classList.add('clicked');
                      setTimeout(() => card.classList.remove('clicked'), 2000);
                    }}
                  >
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xs lg:text-sm font-bold">%</span>
                    </div>
                    <div className="text-base lg:text-lg font-bold text-blue-500 mb-1">10%</div>
                    <div className="text-gray-400 text-xs">Off First Visit</div>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      New customers save 10% on their first rental.
                    </p>
                  </div>

                  {/* Free Delivery */}
                  <div 
                    className="text-center hover:bg-gray-700/20 transition-all duration-300 group cursor-pointer relative overflow-hidden offer-card p-2 lg:p-3 rounded-lg"
                    onClick={(e) => {
                      const card = e.currentTarget;
                      card.classList.add('clicked');
                      setTimeout(() => card.classList.remove('clicked'), 2000);
                    }}
                  >
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="text-base lg:text-lg font-bold text-blue-500 mb-1">FREE</div>
                    <div className="text-gray-400 text-xs">Delivery Available</div>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      Complimentary delivery service throughout LA area.
                    </p>
                  </div>

                  {/* 4th Day Free */}
                  <div 
                    className="text-center hover:bg-gray-700/20 transition-all duration-300 group cursor-pointer relative overflow-hidden offer-card p-2 lg:p-3 rounded-lg"
                    onClick={(e) => {
                      const card = e.currentTarget;
                      card.classList.add('clicked');
                      setTimeout(() => card.classList.remove('clicked'), 2000);
                    }}
                  >
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-base lg:text-lg font-bold text-blue-500 mb-1">4th</div>
                    <div className="text-gray-400 text-xs">Day FREE</div>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      Rent for 3 days and get the 4th day absolutely free.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rental Information */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
                <button
                  onClick={() => setShowRentalInfo(!showRentalInfo)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-white">Rental Information</h3>
                  <ChevronDown className={`w-5 h-5 text-white transition-transform duration-200 ${showRentalInfo ? 'rotate-180' : ''}`} />
                </button>
                
                {showRentalInfo && (
                  <div className="px-6 py-4 border-t border-gray-700/50">
                    <ul className="space-y-4 text-white/80">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span><strong>1 Rental Day</strong> = 100 miles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span><strong>Additional miles:</strong> $5 per mile</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span><strong>Fully Refundable Security/Damage Deposit:</strong> {car.depositAmount || '$1,500'}</span>
                      </li>
                      <li className="text-sm text-white/60 ml-5">
                        This is not the total cost, just a safety hold, like a hotel deposit. Returned after drop-off.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Contact Info */}
            <div className="lg:col-span-2">
              {/* Desktop Booking Form */}
              <div className="hidden lg:block">
                <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden" style={{ backgroundColor: '#0b0f14' }}>
                  
                  {/* Promotional Banner */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-lg font-bold">Limited Time: 10% Off First Visit</span>
                    </div>
                    
                    {/* Countdown display */}
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-center">
                        <div className="text-lg font-bold leading-none">{timeLeft.weeks}</div>
                        <div className="text-xs uppercase tracking-wider opacity-90">Wks</div>
                      </div>
                      <div className="text-white/70 text-sm">|</div>
                      <div className="text-center">
                        <div className="text-lg font-bold leading-none">{timeLeft.days}</div>
                        <div className="text-xs uppercase tracking-wider opacity-90">Days</div>
                      </div>
                      <div className="text-white/70 text-sm">|</div>
                      <div className="text-center">
                        <div className="text-lg font-bold leading-none">{timeLeft.hours}</div>
                        <div className="text-xs uppercase tracking-wider opacity-90">Hrs</div>
                      </div>
                      <div className="text-white/70 text-sm">|</div>
                      <div className="text-center">
                        <div className="text-lg font-bold leading-none">{timeLeft.minutes}</div>
                        <div className="text-xs uppercase tracking-wider opacity-90">Min</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">BOOK NOW</h3>
                    
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {/* Hidden vehicle input */}
                      <input type="hidden" name="vehicle" value={car.name} />

                      {/* Simplified Date Selection */}
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Select Dates</label>
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
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Tell us about your request</label>
                        <textarea
                          name="tell_us_about_your_request"
                          value={formData.tell_us_about_your_request}
                          onChange={handleChange}
                          required
                          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg h-20 resize-none text-white placeholder-gray-400 focus:border-blue-500 focus:ring-0"
                          placeholder="Optional..."
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-0"
                          placeholder="Name"
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-0"
                          placeholder="Email"
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-0"
                          placeholder="Phone number"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox"
                          name="first_timer_discount"
                          checked={formData.first_timer_discount === 'Yes'}
                          onChange={handleChange}
                          className="w-4 h-4 bg-gray-800/50 border-gray-600 rounded"
                        />
                        <label className="text-sm text-blue-400">
                          Claim Your First-Timers 10% Discount
                        </label>
                      </div>

                      <div className="pt-4 space-y-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-3 px-4 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 ${
                            isSubmitting 
                              ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105'
                          }`}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Request'}
                          <Send className="w-4 h-4" />
                        </button>
                      
                        {/* Status message */}
                        {submitStatus && (
                          <div className="mt-4 text-center">
                            <p className={`text-sm ${submitStatus.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                              {submitStatus}
                            </p>
                          </div>
                        )}
                      </div>
                    </form>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-4 border-t border-gray-700/50">
                      <div className="text-center text-xs text-white/60 space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Shield className="w-3 h-3 flex-shrink-0" />
                          <span>Secure Booking</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <Truck className="w-3 h-3 flex-shrink-0" />
                          <span>Delivery Available</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info - Below booking form on desktop */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mt-6">
                <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
                <div className="space-y-4">
                  <a 
                    href="tel:+18189750220"
                    className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>(818) 975-0220</span>
                  </a>
                  <a 
                    href="mailto:radridesbcr@gmail.com"
                    className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>radridesbcr@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Gallery Modal */}
      {showGalleryModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setShowGalleryModal(false)}
        >
          {/* Close Button */}
          <button
            type="button"
            aria-label="Close gallery"
            onClick={() => setShowGalleryModal(false)}
            className="absolute top-4 right-4 z-[70] w-12 h-12 bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-600 hover:scale-110 transition-all duration-300 border-2 border-white/30 hover:border-white shadow-lg"
          >
            <X className="w-6 h-6 stroke-2" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-60 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-xs font-medium">
              {selectedImageIndex + 1} / {imageArray.length}
            </span>
          </div>

          {/* Main Image Display */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 pb-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-5xl">
              <CarImage 
                src={currentImage}
                fallbackSrc={car.fallbacks?.[validIndex] || 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&h=1080&fit=crop&crop=center'}
                alt={`${car.name} view ${validIndex + 1}`}
                className="w-full h-full object-contain rounded-lg"
                index={validIndex + 50}
              />
            </div>

            {/* Navigation Arrows */}
            {imageArray.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          <div 
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-60"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-1 bg-black/80 backdrop-blur-sm rounded-lg p-1 max-w-lg overflow-x-auto scrollbar-hide">
              {imageArray.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-12 h-8 rounded overflow-hidden border transition-all duration-300 ${
                    selectedImageIndex === index 
                      ? 'border-blue-400' 
                      : 'border-white/40 hover:border-white/70'
                  }`}
                >
                  <CarImage 
                    src={image}
                    fallbackSrc={car.fallbacks?.[index] || 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=200&h=150&fit=crop&crop=center'}
                    alt={`${car.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    index={index + 100}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}