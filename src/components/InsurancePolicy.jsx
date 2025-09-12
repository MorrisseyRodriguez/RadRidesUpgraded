import React from 'react';

export default function InsurancePolicy() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 font-inter">
          Our Insurance Policy
        </h1>
        <div className="w-24 h-1 bg-blue-500 mb-16"></div>

        <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <p>
            Since we are a rental car company, it is common that your personal auto policy will transfer to your rental car with Rad Rides BCR covering you as if it's your own. Your personal auto policy MUST include Liability, Comprehensive and Collision.
          </p>

          <p>
            For the sake of protecting your personal assets in case of an at-fault accident, we suggest having minimum liability protection coverage set at $100,000 for one person / $300,000 for more than one person along with $50,000 of property damage. Your auto policy would designate this as 100/300/50.
          </p>

          <p>
            It is possible to raise your auto policy limits for the duration of your rental for a small fee. Check with your auto insurance carrier for details and cost.
          </p>

          <p className="text-xl font-semibold text-gray-800">
            Once you meet that initial insurance coverage criteria we will need:
          </p>

          <ul className="list-disc pl-8 space-y-2 text-base">
            <li>A photo of your driver license</li>
            <li>Auto policy info</li>
          </ul>

          <p>
            Rad Rides BCR will call your auto policy carrier and verify your coverages and confirm that your auto policy is transferable. You may need to be conferenced in on the insurance call for verification, depending on your insurance carrier.
          </p>

          <p>
            All insurance verification calls are recorded for the protection of renters and Rad Rides BCR.
          </p>

          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <p className="text-xl font-semibold text-gray-800 mb-4">
              Car insurance lingo can be confusing.
            </p>
            <p className="mb-4">
              If you'd like more information, here is a link to help clarify:
            </p>
            <p>
              👉{' '}
              <a 
                href="https://www.moneygeek.com/insurance/auto/car-insurance-for-beginners-101/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium underline"
              >
                https://www.moneygeek.com/insurance/auto/car-insurance-for-beginners-101/
              </a>
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What if I don't have insurance?
            </h2>
            <p className="text-xl">
              Contact us for possible options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}