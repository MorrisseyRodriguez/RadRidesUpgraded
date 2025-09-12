import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 font-inter">
          We Deliver The Moment
        </h1>
        <div className="w-24 h-1 bg-blue-500 mb-16"></div>

        <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <p className="text-2xl font-medium text-gray-800">
            Most Companies Overpromise and Underdeliver. We Built Rad Rides to Change That.
          </p>

          <p>You've been ghosted.</p>
          <p>You've seen your "dream car" swapped last minute for "something similar."</p>
          <p>You've dealt with the nonsense or sketchy fees and no one picking up the phone.</p>
          <p className="text-xl font-bold text-gray-900">That's exactly why we started Rad Rides.</p>

          <p>We're not just a rental company with a fleet.</p>
          <p>We're car people who take absolute care of our cars, in the hopes that the same care we give our cars extends to you and your experience.</p>

          <p className="text-xl font-bold text-gray-900">You're not just booking a ride.</p>
          <p className="text-xl font-bold text-gray-900">You're unlocking a story.</p>

          <p>Maybe you're pulling up to a wedding, or big event,</p>
          <p>Doors swing open, cameras flash, and heads turn like you're the damn main character.</p>
          <p>Because, for that moment, you are.</p>

          <p>Maybe you're in town visiting family,</p>
          <p>and that quiet cousin who always had the nicer car?</p>
          <p>Yeah, he's speechless now. So is everyone else.</p>

          <p>Or maybe this is the one,</p>
          <p>The car you've been obsessed with since you were 13.</p>
          <p>Now it's under your foot, rumbling with every tap of the gas.</p>
          <p>And it's not a dream. It's real. It's right now.</p>

          <p className="text-xl font-bold text-gray-900">Whatever brings you here, this won't feel like a rental.</p>
          <p className="text-xl font-bold text-gray-900">It'll feel like a moment you'll talk about for years.</p>

          <div className="bg-gray-50 rounded-lg p-8 space-y-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <p className="text-lg">No ghosting when you text.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <p className="text-lg">No "similar vehicle" BS when you show up.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <p className="text-lg">No cold, front-desk energy.</p>
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-900">Just real cars. Real replies. Real people.</p>

          <p className="text-xl">
            Whether you're pulling up for a special event, or just chasing that first-time thrill, 
            we'll make sure the entire process is smooth.
          </p>

          <div className="bg-gray-50 rounded-lg p-8 space-y-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <p className="text-lg">Need something specific? Ask.</p>
            </div>
          </div>

          <p className="text-xl">Because here, it's not just about the car.</p>

          <p className="text-2xl font-bold text-gray-900">
            It's about the feeling you get when you grab the keys and realize... 
            you're about to experience something unforgettable.
          </p>
        </div>
      </div>
    </div>
  );
}