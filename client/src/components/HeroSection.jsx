import React from 'react'
import HybridSearch from './HybridSearch'
import { useState, useEffect } from 'react';

// Array of images for the slider
const images = [
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    alt: "A serene lake with mountains in the background.",
    user: "@destination_dreamer"
  },
  {
    src: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=2070&auto=format&fit=crop",
    alt: "A wooden pier leading to a calm lake with a beautiful sunset.",
    user: "@wanderlust_lisa"
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
    alt: "A person canoeing on a turquoise lake surrounded by mountains.",
    user: "@adventure_seeker"
  },
  {
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2071&auto=format&fit=crop",
    alt: "A person with a backpack and a hat looking at a world map.",
    user: "@global_explorer"
  }
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect to handle the automatic sliding timer
  useEffect(() => {
    // Set an interval to change the image every 5 seconds (5000 milliseconds)
    const timer = setInterval(() => {
      // Calculate the next index, looping back to 0 if at the end of the array
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    // Cleanup function: This will be called when the component unmounts
    // It's crucial to clear the interval to prevent memory leaks
    return () => {
      clearInterval(timer);
    };
  }, []); // The empty dependency array [] means this effect runs only once on mount
  return (
    <div>
      <h1 className='text-[#530404] text-5xl font-bold text-center mt-17'>What's your next adventure?</h1>
      <HybridSearch/>
     
    <div className="mt-15 max-w-5xl mx-auto">
       {/* Grid layout for the hero card */}
       {/* On mobile, it's a standard block. On medium screens and up, it becomes a grid. */}
      <div className="bg-[#ff4c1f] rounded-2xl  overflow-hidden md:grid md:grid-cols-5">

        {/* Left Column: Image */}
        {/* Takes up 3 of 5 columns on medium screens and up */}
        <div className="md:col-span-3 h-64 md:h-auto relative">
         {/* Map through the images array to render all images */}
          {images.map((image, index) => (
            <img 
              key={index}
              className={`rounded-4xl px-3 py-3 h-full w-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              src={image.src} 
              alt={image.alt}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src='https://placehold.co/800x600/cccccc/ffffff?text=Beautiful+Destination';
              }}
            />
          ))}
          {/* Overlay social tag */}
          <div className="absolute bottom-4 left-4 bg-[#ff4c1f] text-[#4e1203] text-sm px-3 py-1.5 rounded-full backdrop-blur-sm border-2 border-[#c22700]">
             {images[currentImageIndex].user}
          </div>
        </div>

        {/* Right Column: Content */}
        {/* Takes up 2 of 5 columns on medium screens and up */}
        {/* Flexbox is used here to center the content vertically */}
        <div className="md:col-span-2 p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#550d00] !leading-tight tracking-tight">
            Your Next Story Starts Here.
          </h2>
          <p className="mt-4 text-lg text-[#550d00]/90">
            From thrilling treks to serene getaways, book unique experiences curated for the modern explorer.
          </p>
          {/* Call to Action Button */}
          <div className="mt-8">
            <a 
              href="#" 
              className="inline-block bg-gray-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-orange focus:ring-white transition-transform duration-300 ease-in-out hover:scale-105"
            >
              Explore Adventures
            </a>
          </div>
        </div>

      </div>
    </div>
      
    </div>
  )
}

export default HeroSection
