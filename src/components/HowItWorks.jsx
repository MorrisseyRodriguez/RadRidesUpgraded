import React, { useState } from 'react';
import { ChevronDown, CheckCircle, Car, Clipboard, MapPin, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { images } from '../assets/images';
import corvette1000068218 from '../assets/C8 Corvette/1000068218.jpg';

const insuranceCompanies = [
  'USAA',
  'Wawanesa', 
  'AAA',
  'Allstate',
  'State Farm'
];

const stepsData = [
  {
    id: 1,
    title: "AM I ELIGIBLE?",
    subtitle: "Our minimal requirements make it easy to enjoy your dream car.",
    image: images.c8Corvette.main,
    content: {
      requirements: [
        "Must be 18+ with full coverage auto insurance. If the policy isn't in your name, you just need to be listed as a driver."
      ]
    }
  },
  {
    id: 2,
    title: "LOCK IN YOUR RENTAL",
    subtitle: "Call, text, or fill out a contact form to secure your rental. We'll send you an invoice via phone or text.",
    image: images.mclaren570s.main,
    content: {
      requirements: [
        "Pay a refundable deposit to lock in your vehicle and dates. This deposit goes toward your total rental cost and ensures your booking."
      ]
    }
  },
  {
    id: 3,
    title: "CONFIRM BOOKING",
    subtitle: "We contact them directly. Insurance verification + confirming date. Keep it reassuring and professional.",
    image: images.escalade.main,
    content: {
      requirements: [
        "We'll review your insurance provider to verify coverage",
        "Confirm your rental dates and any special requests",
        "Review pickup/delivery details and final pricing"
      ]
    }
  },
  {
    id: 4,
    title: "PICK UP OR DELIVERY",
    subtitle: "Grab the keys at our Calabasas location or request delivery across LA & OC. We'll meet you on time, walk you through the car, and you're rolling.",
    image: images.jeepWrangler.main,
    content: {
      requirements: [
        "Meet us in Calabasas or we'll deliver to you",
        "Quick walkthrough of the vehicle features",
        "Sign paperwork and you're ready to drive!"
      ]
    }
  }
];

export default function HowItWorks() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState('');

  const currentStep = stepsData[currentStepIndex];

  const handleInsuranceSelect = (company) => {
    setSelectedInsurance(company);
    setIsDropdownOpen(false);
  };

  const nextStepHandler = () => {
    setCurrentStepIndex((prev) => (prev + 1) % stepsData.length);
  };

  const prevStepHandler = () => {
    setCurrentStepIndex((prev) => (prev - 1 + stepsData.length) % stepsData.length);
  };

  const scrollToContact = () => {
    // Dispatch custom event to open booking modal
    window.dispatchEvent(new CustomEvent('preSelectCarRequest', {
      detail: { preSelectCarRequest: true }
    }));
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-[80vh] md:min-h-screen text-white py-12 md:py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={corvette1000068218}
          alt="Corvette background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative z-10 text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 font-inter tracking-wider">
            HOW IT WORKS
          </h2>
        </div>
        {/* Main Content - Single Step Display */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 md:p-8 lg:p-12 border border-gray-700/50">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">{currentStep.title}</h3>
            <p className="text-gray-300 mb-6 md:mb-8 leading-relaxed text-lg md:text-xl max-w-4xl">{currentStep.subtitle}</p>
            
            <div className="space-y-4 md:space-y-6 max-w-4xl">
              {currentStep.content.requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 leading-relaxed text-base md:text-lg">{req}</p>
                </div>
              ))}
            </div>

            {/* Insurance Dropdown for Step 1 */}
            {currentStep.id === 1 && (
              <div className="mt-6 md:mt-8 max-w-md">
                <label className="block text-gray-300 font-medium mb-3">
                  See Insurance Companies we work with
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-left text-white flex items-center justify-between hover:bg-gray-700/50 transition-colors"
                  >
                    <span className={selectedInsurance ? 'text-white' : 'text-gray-400'}>
                      {selectedInsurance || 'Select your insurance provider'}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 w-full max-h-48 overflow-y-auto">
                      {insuranceCompanies.map((company, index) => (
                        <button
                          key={index}
                          onClick={() => handleInsuranceSelect(company)}
                          className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {company}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="relative z-10 flex items-center justify-center mt-8 md:mt-12 gap-4">
          <button
            onClick={prevStepHandler}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="text-white font-medium">
            {stepsData.length} Simple Steps
          </div>
          
          <button
            onClick={nextStepHandler}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Step Indicators */}
        <div className="relative z-10 flex justify-center gap-2 mt-4 md:mt-6">
          {stepsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStepIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStepIndex 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}