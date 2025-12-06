import { useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import { Mousewheel } from 'swiper/modules';
// Data for the experience cards
        const experiences = [
          { category: 'Trekking', title: 'Himalayan Sunrise Trek', rating: 4.9, reviewCount: 120, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop' },
          { category: 'Watersports', title: 'Bali Scuba Diving', rating: 4.8, reviewCount: 95, image: 'https://images.unsplash.com/photo-1577499719438-79f2f043a4e6?q=80&w=1974&auto=format&fit=crop' },
          { category: 'Cultural', title: 'Kyoto Temple Tour', rating: 4.9, reviewCount: 210, image: 'https://images.unsplash.com/photo-1528133418093-20641683484b?q=80&w=2070&auto=format&fit=crop' },
          { category: 'Safari', title: 'Serengeti Wildlife Safari', rating: 5.0, reviewCount: 150, image: 'https://images.unsplash.com/photo-1534437433343-a655d6865853?q=80&w=2070&auto=format&fit=crop' },
          { category: 'Adventure', title: 'Costa Rica Ziplining', rating: 4.7, reviewCount: 88, image: 'https://images.unsplash.com/photo-1599212258941-8884d35a2ea3?q=80&w=1974&auto=format&fit=crop' },
          { category: 'Relaxation', title: 'Iceland\'s Blue Lagoon', rating: 4.9, reviewCount: 300, image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2070&auto=format&fit=crop' },
        ];

        // The main React component
        const ExperiencesCarousel = () => {
            // STEP 1: Create a state to hold the Swiper instance.
            // This allows our custom buttons to control the slider.
            const [swiper, setSwiper] = useState('');

            // STEP 2: Initialize Swiper. We pass the configuration directly here.
            // Note: We are NOT using the built-in navigation option.
            const swiperConfig = {
                loop: false,
                slidesPerView: 1.2,
                spaceBetween: 16,
                simulateTouch: true,
                breakpoints: {
                    640: { slidesPerView: 2.5, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 24 }
                },
                Mousewheel:{
                  forceToAxis: true,
                },
                
            };

            // This effect initializes Swiper when the component mounts
            useEffect(() => {
                const swiperInstance = new Swiper('.swiper-container', swiperConfig);
                setSwiper(swiperInstance);

                // Cleanup Swiper instance on component unmount
                return () => swiperInstance.destroy();
            }, []);


            return (
                <section className="py-12 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <div className="text-center md:text-left mb-8">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                                Unforgettable Experiences
                            </h2>
                            <p className="mt-2 text-lg text-gray-600">
                                Curated adventures designed to become your favorite stories.
                            </p>
                        </div>

                        {/* STEP 3: Carousel Container with Relative Positioning */}
                        {/* The `relative` class is crucial for positioning our custom buttons. */}
                        <div className="relative overflow-hidden">
                            {/* Swiper Carousel */}
                            <div className="swiper-container">
                                <div className="swiper-wrapper">
                                    {experiences.map((exp, index) => (
                                        <div key={index} className="swiper-slide">
                                            {/* Card Component */}
                                            <div className="group relative rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                                                <div className="relative h-72 overflow-hidden">
                                                    <img src={exp.image} alt={exp.title} className="absolute h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                                    <div className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">{exp.category}</div>
                                                </div>
                                                <div className="p-4 bg-white flex-grow">
                                                    <h3 className="font-bold text-lg text-gray-800">{exp.title}</h3>
                                                    <div className="flex items-center mt-2">
                                                        <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                        <span className="text-gray-700 font-bold ml-1">{exp.rating}</span>
                                                        <span className="text-gray-500 text-sm ml-2">({exp.reviewCount} reviews)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* STEP 4: Custom Navigation Buttons Styled with Tailwind */}
                            {/* Previous Button */}
                            <button 
                                onClick={() => swiper?.slidePrev()}
                                className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform duration-200 hidden md:flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ff4c1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            
                            {/* Next Button */}
                            <button 
                                onClick={() => swiper?.slideNext()}
                                className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform duration-200 hidden md:flex items-center justify-center"
                            >
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ff4c1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>
                </section>
            );
        }

        export default ExperiencesCarousel;