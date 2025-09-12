import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

// Shared countdown logic that can be used across components
export const useCountdown = (targetDate = '2025-09-22T23:59:59') => {
  const [timeLeft, setTimeLeft] = useState({ weeks: 0, days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate);
      const now = new Date();
      const difference = target - now;

      if (difference > 0) {
        const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        const totalHours = Math.floor(difference / (1000 * 60 * 60));
        const totalMinutes = Math.floor(difference / (1000 * 60));
        
        const weeks = Math.floor(totalDays / 7);
        const days = totalDays % 7;
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        
        setTimeLeft({ weeks, days, hours, minutes });
      } else {
        setTimeLeft({ weeks: 0, days: 0, hours: 0, minutes: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second for real-time accuracy
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

export default function CountdownBanner() {
  const timeLeft = useCountdown();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Don't show banner if the offer has expired
  if (timeLeft.weeks === 0 && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) {
    return null;
  }

  return (
    <div className="bg-blue-600 text-white py-2 px-4 relative overflow-hidden">
      {/* Background pattern for visual interest */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 relative z-10">
        {/* Left side - Deal text and countdown */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-base sm:text-lg font-bold tracking-wide text-center sm:text-left">
              SUMMER DEAL: 10% OFF First Visit
            </span>
            
            {/* Countdown display */}
            <div className="flex items-center gap-1 sm:gap-2 bg-blue-700/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg backdrop-blur-sm">
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold leading-none">{timeLeft.weeks}</div>
                <div className="text-xs uppercase tracking-wider opacity-90">Wks</div>
              </div>
              <div className="text-blue-300 text-sm sm:text-base">|</div>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold leading-none">{timeLeft.days}</div>
                <div className="text-xs uppercase tracking-wider opacity-90">Days</div>
              </div>
              <div className="text-blue-300 text-sm sm:text-base">|</div>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold leading-none">{timeLeft.hours}</div>
                <div className="text-xs uppercase tracking-wider opacity-90">Hrs</div>
              </div>
              <div className="text-blue-300 text-sm sm:text-base">|</div>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold leading-none">{timeLeft.minutes}</div>
                <div className="text-xs uppercase tracking-wider opacity-90">Min</div>
              </div>
            </div>
            <div className="text-blue-300 text-sm sm:text-base font-semibold">Left</div>
          </div>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-white text-sm sm:text-base font-medium">
            Fastest way to book
          </span>
          <a
            href="tel:+18189750220"
            className="flex items-center gap-2 bg-white text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded font-semibold hover:bg-blue-50 transition-colors text-sm sm:text-base"
          >
            <Phone className="w-4 h-4" />
            Call or Text
          </a>
        </div>
      </div>
    </div>
  )
}