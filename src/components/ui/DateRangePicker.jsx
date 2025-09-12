import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const DateRangePicker = ({ 
  onDateChange, 
  initialStartDate = '', 
  initialEndDate = '',
  className = '',
  placeholder = 'Select dates'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [displayValue, setDisplayValue] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState(null);
  const [error, setError] = useState('');
  const [focusedDate, setFocusedDate] = useState(null);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const calendarRef = useRef(null);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Format date for display (MMM D)
  const formatDisplayDate = useCallback((dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
  }, [monthNames]);

  // Update display value when dates change
  useEffect(() => {
    if (startDate && endDate && startDate !== endDate) {
      setDisplayValue(`${formatDisplayDate(startDate)} — ${formatDisplayDate(endDate)}`);
    } else if (startDate) {
      setDisplayValue(formatDisplayDate(startDate));
    } else {
      setDisplayValue('');
    }
  }, [startDate, endDate, formatDisplayDate]);

  // Notify parent of date changes
  useEffect(() => {
    if (onDateChange) {
      onDateChange({
        startDate,
        endDate: endDate || startDate, // If only start date, use it as end date too
        displayValue
      });
    }
  }, [startDate, endDate, displayValue, onDateChange]);

  // Close calendar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setError('');
        // If only start date is selected, set end date to start date
        if (startDate && !endDate) {
          setEndDate(startDate);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, startDate, endDate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          setError('');
          if (startDate && !endDate) {
            setEndDate(startDate);
          }
          break;
        case 'Tab':
          // Allow normal tab behavior
          break;
        default:
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, startDate, endDate]);

  // Generate calendar days
  const generateCalendarDays = useCallback(() => {
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const day = current.getDate();
      const isCurrentMonth = current.getMonth() === currentMonth.getMonth();
      const isPast = current < today;
      const dateStr = current.toISOString().split('T')[0];

      days.push({
        day,
        dateStr,
        isCurrentMonth,
        isPast,
        isToday: current.toDateString() === today.toDateString(),
        date: new Date(current)
      });

      current.setDate(current.getDate() + 1);
    }

    return days.slice(0, 35); // Show 5 weeks
  }, [currentMonth]);

  // Navigate months
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  // Handle date selection
  const handleDateClick = (dateStr, isPast) => {
    if (isPast) return;

    setError('');

    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(dateStr);
      setEndDate('');
      setHoverDate(null);
    } else if (startDate && !endDate) {
      // Complete the range
      if (dateStr < startDate) {
        setStartDate(dateStr);
        setEndDate(startDate);
      } else {
        setEndDate(dateStr);
      }
      // Close calendar after selection
      setTimeout(() => setIsOpen(false), 100);
    }
  };

  // Handle input click
  const handleInputClick = () => {
    setIsOpen(true);
    setError('');
  };

  // Handle clear
  const handleClear = (e) => {
    e.stopPropagation();
    setStartDate('');
    setEndDate('');
    setDisplayValue('');
    setError('');
  };

  // Check if date is in range
  const isInRange = (dateStr) => {
    if (!startDate || !endDate) return false;
    return dateStr >= startDate && dateStr <= endDate;
  };

  // Check if date is selected
  const isSelected = (dateStr) => {
    return dateStr === startDate || dateStr === endDate;
  };

  // Check if date is in hover range
  const isInHoverRange = (dateStr) => {
    if (!startDate || endDate || !hoverDate) return false;
    const start = startDate < hoverDate ? startDate : hoverDate;
    const end = startDate < hoverDate ? hoverDate : startDate;
    return dateStr >= start && dateStr <= end;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          placeholder={placeholder}
          onClick={handleInputClick}
          readOnly
          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-0 cursor-pointer transition-colors duration-200 pr-10"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        />
        
        {/* Clear Button */}
        {displayValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-white transition-colors"
            aria-label="Clear dates"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-1 text-sm text-red-400" role="alert">
          {error}
        </div>
      )}

      {/* Calendar Popup */}
      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-50 p-4"
          role="dialog"
          aria-label="Date range picker"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <h3 className="text-white font-semibold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((dayObj, index) => {
              const isSelectedDay = isSelected(dayObj.dateStr);
              const isInRangeDay = isInRange(dayObj.dateStr);
              const isInHoverRangeDay = isInHoverRange(dayObj.dateStr);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateClick(dayObj.dateStr, dayObj.isPast)}
                  onMouseEnter={() => setHoverDate(dayObj.dateStr)}
                  onMouseLeave={() => setHoverDate(null)}
                  disabled={dayObj.isPast || !dayObj.isCurrentMonth}
                  className={`
                    relative h-10 w-full text-sm rounded-lg transition-all duration-200 font-medium
                    ${!dayObj.isCurrentMonth ? 'text-gray-600 cursor-not-allowed' : ''}
                    ${dayObj.isPast ? 'text-gray-600 cursor-not-allowed' : ''}
                    ${dayObj.isCurrentMonth && !dayObj.isPast ? 'text-white hover:bg-gray-700 cursor-pointer' : ''}
                    ${dayObj.isToday ? 'ring-1 ring-blue-400' : ''}
                    ${isSelectedDay ? 'bg-blue-600 text-white font-bold' : ''}
                    ${(isInRangeDay || isInHoverRangeDay) && !isSelectedDay ? 'bg-blue-600/20 text-blue-300' : ''}
                  `}
                  aria-label={`${dayObj.date.toLocaleDateString()}`}
                >
                  {dayObj.day}
                </button>
              );
            })}
          </div>

          {/* Selection Summary */}
          {(startDate || endDate) && (
            <div className="mt-4 pt-3 border-t border-gray-700">
              <div className="text-sm text-gray-300" aria-live="polite">
                {startDate && endDate && startDate !== endDate
                  ? `${formatDisplayDate(startDate)} to ${formatDisplayDate(endDate)} selected`
                  : startDate
                  ? `${formatDisplayDate(startDate)} selected`
                  : ''
                }
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden inputs for form submission */}
      <input type="hidden" name="start_date" value={startDate} />
      <input type="hidden" name="end_date" value={endDate || startDate} />
      <input type="hidden" name="rental_dates" value={displayValue} />
    </div>
  );
};

export default DateRangePicker;