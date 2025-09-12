import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 font-inter">
          Privacy Policy
        </h1>
        <div className="w-24 h-1 bg-blue-500 mb-16"></div>

        <div className="space-y-12 text-gray-700 text-lg leading-relaxed">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-inter">SMS Opt-In Policy</h2>
            <p className="mb-6">
              When you provide your phone number to us and check the opt-in box on our forms, 
              you are giving Rad Rides consent to send you SMS messages related to booking 
              confirmations, rental details, updates, and customer service.
            </p>

            <p className="mb-8 text-xl font-semibold text-gray-800">By opting in, you agree to:</p>
            
            <ul className="list-disc pl-8 space-y-3 mb-8 text-base">
              <li>Receive SMS messages from Rad Rides (standard messaging rates may apply)</li>
              <li>Messages may be sent using an automatic telephone dialing system</li>
              <li>Message frequency will vary based on your activity with our service</li>
            </ul>

            <p className="mb-6">
              You can opt out at any time by replying STOP to any message. For help, reply HELP.
            </p>

            <p className="text-2xl font-bold text-gray-900">
              Your privacy matters to us. We do not sell or share your information.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}