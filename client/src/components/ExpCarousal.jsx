import React from 'react';

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
const ExperiencesCarousell = () => {
    return (
        <section className="py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center md:text-left mb-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Unforgettable Experiences
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Curated adventures designed to become your favorite stories.
                    </p>
                </div>

                {/* Native Horizontal Scrolling Container */}
                {/* Add a custom class like 'native-scrollbar' if you want to style the scrollbar in your index.css */}
                <div className="flex space-x-6 overflow-x-auto pb-4">
                    {experiences.map((exp, index) => (
                        // Each card is now a flex item
                        <div key={index} className="flex-shrink-0 w-80">
                            <div className="group relative rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                                <div className="relative h-72">
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
        </section>
    );
}

export default ExperiencesCarousell;