import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Do you provide other car related services such as diminished Value/Total Loss Valuation?Loss of use insurance payouts?",
    answer: "Yes, contact Chad @ 818-975-0220 for information."
  },
  {
    question: "Do I need insurance coverage?",
    answer: (
      <>
        Yes, we REQUIRE you have a personal auto insurance policy with Liability, Comprehensive, and Collision coverage.
        <br /><br />
        Visit our Insurance policy page for renters{' '}
        <a 
          href="https://www.moneygeek.com/insurance/auto/car-insurance-for-beginners-101/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Check out this quick guide.
        </a>
      </>
    )
  },
  {
    question: "Do you require a deposit?",
    answer: "Yes, a fully refundable damage deposit is required. The deposit fee typically varies between $500 to $1500 depending on the vehicle rented. The deposit can be taken via all the same rental payment options. When the rental is returned without damage the deposit is refunded."
  },
  {
    question: "Do you offer delivery and pickup services?",
    answer: "Delivery and pickup services are offered to make the rental process as convenient as possible. The fee varies for this service based on the particulars of your rental and will be disclosed prior to booking your rental."
  },
  {
    question: "What is the minimum age requirement for renting a car?",
    answer: "The minimum age requirement for renting a car is usually 21 years old, but we do make some exceptions"
  },
  {
    question: "What is the cancellation policy?",
    answer: "We understand that plans can change unexpectedly so we offer reasonable accommodations per situation, ask us when you reach out"
  },
  {
    question: "Do you offer any discounts or promotions?",
    answer: "Yes! Discounts are offered for multi-day rentals."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 text-center mb-6 font-inter">
          Frequently Asked Questions
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-16"></div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
            >
              <button
                className="w-full px-8 py-6 flex items-center justify-between text-left text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-lg font-semibold pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-blue-600 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-8 py-6 text-gray-700 border-t border-gray-200 text-base leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}