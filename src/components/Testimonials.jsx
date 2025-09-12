import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Diego Carrillo',
    rating: 5,
    text: 'Chad and Rad Rides, are amazing to work with. Super convenient, easy pick up and drop off. Not to mention the experience with the car, no issues whatsoever and a great ride.'
  },
  {
    name: 'Arta Gold',
    rating: 5,
    text: 'I had an amazing experience renting out the 570S! Chad was super nice and made the rental process easy. The car was in fantastic condition, and driving it was such a thrill.'
  },
  {
    name: 'Jonathan Bach',
    rating: 5,
    text: 'Flawless experience with the Corvette. The car was super clean and a blast to drive, thanks Chad!'
  },
  {
    name: 'Rafael Moreira',
    rating: 5,
    text: 'Chad helped me with any issues I had, even after I returned the car. Had a great time and will definitely look to rent again in the future!!'
  },
  {
    name: 'Justin Baraglia',
    rating: 5,
    text: 'Chad is an amazing guy and so easy to deal with! He always has the best cars for the best prices. When you need a great car without all the hassle chose Rad Rides.'
  },
  {
    name: 'Alan Bogdanov',
    rating: 5,
    text: 'I had an amazing experience renting multiple cars from Chad. The cars are spotless, inside and out, and well-maintained. The pricing is very reasonable, offering great value for the quality of service provided.'
  },
  {
    name: 'Tim Russell',
    rating: 5,
    text: 'Rad Rides gave me a perfect experience. Chad was very helpful and I would recommend this service to anyone. You can\'t go wrong putting your trust into Rad Rides.'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-rotate testimonials every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-inter">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Real experiences from real customers who chose Rad Rides for their special occasions.
          </p>
          
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>

        {/* Single Testimonial Card with Auto-rotation */}
        <div className="relative">
          <div 
            className={`bg-white rounded-2xl p-8 border border-gray-200 shadow-lg max-w-2xl mx-auto transition-all duration-300 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-70 transform translate-y-2'
            }`}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentTestimonial.name}</h3>
              
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed italic">
                "{currentTestimonial.text}"
              </p>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsVisible(true);
                  }, 300);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}