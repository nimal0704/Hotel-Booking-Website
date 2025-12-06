// src/pages/SearchResultsPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import HotelCard from '../components/HotelCard';
import AdventureCard from '../components/AdventureCard';
import PackageCard from '../components/PackageCard';

// --- Shadcn UI Component Imports ---
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from 'lucide-react';


function SearchResultsPage() {
    const [hotels, setHotels] = useState([]);
    const [adventures, setAdventures] = useState([]);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState('popularity-desc');
    const [filters, setFilters] = useState({
        breakfast: false,
        pool: false,
        wifi: false,
    });

    const type = searchParams.get('type');
    const location = searchParams.get('location');
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const activity = searchParams.get('option');

    const handleFilterChange = (filterName) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName]
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!type || !location) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                let response;

                if (type === 'hotel') {
                    response = await fetch(`http://localhost:3000/hotels?location=${location}&checkin=${checkin}&checkout=${checkout}`);
                } else if (type === 'adventure') {
                    if (activity) {
                        response = await fetch(`http://localhost:3000/adventures?option=${activity}&location=${location}`);
                    }
                } else if (type === 'packages') {
                    response = await fetch(`http://localhost:3000/packages?location=${location}`);
                }

                if (!response) {
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Data received from backend:', data);

                if (Array.isArray(data)) {
                    if (type === 'hotel') {
                        setHotels(data);
                        setAdventures([]);
                        setPackages([]);

                    } else if (type === 'adventure') {
                        setAdventures(data);
                        setHotels([]);
                        setPackages([]);
                    } else if (type === 'packages') {
                        setPackages(data);
                        setHotels([]);
                        setAdventures([]);
                    }
                } else {
                    console.error("Data received is not an array:", data);
                    setHotels([]);
                    setAdventures([]);
                    setPackages([]);
                }

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams, type, location, checkin, checkout, activity]);

    // --- Combined Filtering and Sorting Logic ---
    const filteredAndSortedHotels = useMemo(() => {
        let filteredHotels = [...hotels].filter(hotel => {
            const hotelAmenities = hotel.amenities.map(a => a.toLowerCase());
            if (filters.breakfast && !hotelAmenities.includes('breakfast included')) return false;
            if (filters.pool && !hotelAmenities.includes('pool')) return false;
            if (filters.wifi && !hotelAmenities.includes('free wifi')) return false;
            return true;
        });

        switch (sortBy) {
            case 'price-asc':
                filteredHotels.sort((a, b) => {
                    const priceA = Math.min(...a.availableRooms.map(r => r.price));
                    const priceB = Math.min(...b.availableRooms.map(r => r.price));
                    return priceA - priceB;
                });
                break;
            case 'price-desc':
                filteredHotels.sort((a, b) => {
                    const priceA = Math.min(...a.availableRooms.map(r => r.price));
                    const priceB = Math.min(...b.availableRooms.map(r => r.price));
                    return priceB - priceA;
                });
                break;
            case 'rating-desc':
                filteredHotels.sort((a, b) => {
                    const ratingA = a.rating || 0;
                    const ratingB = b.rating || 0;
                    return ratingB - ratingA;
                });
                break;
            case 'popularity-desc':
                filteredHotels.sort((a, b) => {
                    const popularityA = a.availableRooms.reduce((total, room) => total + (room.bookings?.length || 0), 0);
                    const popularityB = b.availableRooms.reduce((total, room) => total + (room.bookings?.length || 0), 0);
                    return popularityB - popularityA;
                });
                break;
            default:
                // 'recommended' or default case
                break;
        }
        return filteredHotels;
    }, [hotels, filters, sortBy]);

    if (loading) {
        return <div className="container mx-auto p-8 text-center">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto p-8">
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

     const noResults = 
        (type === 'hotel' && filteredAndSortedHotels.length === 0) ||
        (type === 'adventure' && adventures.length === 0) ||
        (type === 'packages' && packages.length === 0);
    
    const title = 
        type === 'hotel' ? `Available Hotels in ${location}`
        : type === 'adventure' ? `Adventures in ${location}`
        : `Available Packages in ${location}`;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold tracking-tight capitalize">{title}</h2>
                {type === 'hotel' && (
                    <div className="flex items-center gap-2">
                        <Label htmlFor="sort-by">Sort by</Label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger id="sort-by" className="w-[180px]">
                                <SelectValue placeholder="Sort by..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="popularity-desc">Popularity</SelectItem>
                                <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {type === 'hotel' && (
                    <aside className="lg:col-span-1">
                        <div className="sticky top-8">
                            <h3 className="text-lg font-semibold mb-4">Filter by</h3>
                            <div className="space-y-4">
                                <h4 className="font-semibold">Popular filters</h4>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="breakfast" checked={filters.breakfast} onCheckedChange={() => handleFilterChange('breakfast')} />
                                    <Label htmlFor="breakfast">Breakfast included</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="pool" checked={filters.pool} onCheckedChange={() => handleFilterChange('pool')} />
                                    <Label htmlFor="pool">Pool</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="wifi" checked={filters.wifi} onCheckedChange={() => handleFilterChange('wifi')} />
                                    <Label htmlFor="wifi">Free WiFi</Label>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                <main className={type === 'hotel' ? "lg:col-span-3" : "col-span-full"}>
                    {noResults ? (
                        <p>No results found for your search.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {type === 'hotel' && filteredAndSortedHotels.map((hotel) => (
                                <HotelCard key={hotel._id} hotel={hotel} checkin={checkin} checkout={checkout} />
                            ))}
                            {type === 'adventure' && adventures.map((adventure) => (
                                <AdventureCard key={adventure._id} adventure={adventure} />
                            ))}
                            {type === 'packages' && packages.map((pkg) => (
                                <PackageCard key={pkg._id} pkg={pkg} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default SearchResultsPage;