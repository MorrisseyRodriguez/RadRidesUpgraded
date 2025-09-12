import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ArrowRight, ArrowLeft, Star } from 'lucide-react';
import clsx from 'clsx';
import logoImage from '../assets/Logo/RadRides Logo-Picsart-BackgroundRemover.jpg';

export default function Hero() {
  const location = useLocation();
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simplified video loading and autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let playInterval;

    const attemptPlay = async () => {
      try {
        video.muted = true;
        video.volume = 0;
        video.playsInline = true;
        video.loop = true;
        video.autoplay = true;
        
        await video.play();
        setIsPlaying(true);
        setVideoError(false);
        
        // Clear interval on successful play
        if (playInterval) {
          clearInterval(playInterval);
          playInterval = null;
        }
      } catch (error) {
        console.log('Video play failed:', error);
        setIsPlaying(false);
      }
    };

    const handleCanPlay = () => {
      setVideoLoaded(true);
      attemptPlay();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setVideoError(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      // Simple retry on pause
      setTimeout(attemptPlay, 1000);
    };

    const handleError = () => {
      setVideoError(true);
      setVideoLoaded(true);
    };

    const handleUserInteraction = () => {
      if (video.paused) {
        attemptPlay();
      }
    };

    // Add essential event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    // Add user interaction listeners
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true });

    // Simple retry mechanism - only if video is paused
    playInterval = setInterval(() => {
      if (video.paused && !video.ended && videoLoaded && !videoError) {
        attemptPlay();
      }
    }, 3000); // Check every 3 seconds

    // Initial load attempt
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    // Cleanup
    return () => {
      if (playInterval) {
        clearInterval(playInterval);
      }
      
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [videoLoaded, videoError]);

  const handleManualPlay = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
      video.play().then(() => {
        setIsPlaying(true);
        setVideoError(false);
      }).catch((error) => {
        console.log('Manual play failed:', error);
      });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-visible">
      {/* Back Button - Only show on car detail pages */}
      {location.pathname.startsWith('/cars/') && (
        <div className="absolute top-8 left-8 z-50">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Fleet
          </Link>
        </div>
      )}

      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        {/* Static background image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://res.cloudinary.com/dro8u1ikn/image/upload/v1754675738/2nd_version_of_b_roll_xorabw.jpg)'
          }}
        />
        
        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          controls={false}
          poster="https://res.cloudinary.com/dro8u1ikn/image/upload/v1754675738/2nd_version_of_b_roll_xorabw.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center center',
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <source 
            src="https://res.cloudinary.com/dnxzhyyw0/video/upload/v1756694442/5th_version_of_b_roll_jw0fvt.mp4" 
            type="video/mp4"
          />
        </video>

        {/* Manual play overlay - only show if needed */}
        {videoError && (
          <div 
            className="absolute inset-0 bg-cover bg-center cursor-pointer"
            style={{
              backgroundImage: 'url(https://res.cloudinary.com/dro8u1ikn/image/upload/v1754675738/2nd_version_of_b_roll_xorabw.jpg)'
            }}
            onClick={handleManualPlay}
          >
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
              <div className="text-center mb-8">
                <Link
                  to="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleManualPlay();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 rounded-lg font-black text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-2xl backdrop-blur-md border border-white/20 uppercase tracking-wide"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}
                >
                  Book Your Experience
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
              <p className="text-lg font-semibold text-white">Tap to play video</p>
            </div>
          </div>
        )}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-4 sm:px-8 max-w-7xl mx-auto overflow-visible">
        {/* Top content - empty */}
        <div className="pt-40">
        </div>

        {/* Bottom content - logo and headline */}
        <div className="pb-8">
          <div className="max-w-2xl">
            {/* Large Logo */}
            <div className="flex justify-start">
              <img 
                src={logoImage}
                alt="Rad Rides BCR Logo" 
                className="h-32 sm:h-40 lg:h-48 w-auto object-contain"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  console.error('Hero logo failed to load:', logoImage);
                  e.target.style.display = 'none';
                }}
              />
            </div>
            
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-shadow-lg font-inter">
              LA & OC's Local
              <br />
              Favorite Rides
            </h1>
          </div>
        </div>
      </div>

      {/* Google Reviews Badge - Desktop Only */}
      <div className="absolute bottom-8 right-8 z-20 hidden sm:block">
        <a
          href="https://www.google.com/search?q=rad+rides+bcr&rlz=1C1RXMK_enUS1153US1153&oq=rad+rides+bcr&gs_lcrp=EgZjaHJvbWUqDAgAECMYJxiABBiKBTIMCAAQIxgnGIAEGIoFMgYIARAjGCcyCggCEAAYogQYiQUyCggDEAAYgAQYogQyBwgEEAAY7wUyBggFEEUYQTIGCAYQRRhBMgYIBxBFGEHSAQg2NTg1ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-black rounded-xl p-4 shadow-xl border border-gray-800 hover:bg-gray-900 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 block"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Google Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" className="flex-shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-white font-semibold text-sm">Google</span>
            </div>
            
            {/* Rating and Reviews */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">4.9</span>
                <div className="flex gap-0.5 flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <span className="text-white font-medium group-hover:text-blue-300 transition-colors whitespace-nowrap">
                40 reviews
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}