import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import { LoginModalProvider, useLoginModal } from '@/context/LoginModalContext';

// --- Shadcn UI Component Imports ---
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from '@/components/ui/separator';

// --- Icons (using Lucide React) ---
import { Wifi, BedDouble, Users, Star, MapPin } from 'lucide-react';

function DetailPage() {
  const { id } = useParams(); 
  const { user } = useAuth();
  const {openModal} = useLoginModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');

  const type = location.pathname.split('/')[1].slice(0, -1); 

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Your existing data-fetching logic is perfect.
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // We need to pass checkin/checkout to get the availableRooms back from the API
        const endpoint = `http://localhost:3000/hotels/${id}?checkin=${checkin}&checkout=${checkout}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Item not found or network response was not ok');
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    // Only fetch for hotels, as other types don't have this structure yet.
    if (type === 'hotel') {
        fetchData();
    } else {
        // TODO: Add fetch logic for adventures and packages
        setLoading(false);
        setError(`Detail page for ${type}s is not yet implemented.`);
    }
  }, [id, type, checkin, checkout]);

  const handleSelectRoom = (room) => {
    if (user) {
      // If user is logged in, navigate to the booking page
      console.log("User is logged in, proceeding to booking...");
      navigate(`/bookings?type=hotel&id=${id}&roomId=${room._id}&checkin=${checkin}&checkout=${checkout}`);
    } else {
      // If no user, open the login modal
      console.log("No user found, opening login modal.");
      openModal();
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }
  if (error || !item) {
    return <div className="container mx-auto p-8"><p className="text-red-500">Error: {error || "Item not found."}</p></div>;
  }

  // --- New, Simplified Main Render ---
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8 space-y-8">
        
        {/* --- 1. Image Carousel --- */}
        <Carousel className="w-full rounded-xl overflow-hidden shadow-lg">
          <CarouselContent>
            {/* We'll create a small array of images to display */}
            {[item.imageUrl, item.imageUrl, item.imageUrl, item.imageUrl].map((src, index) => (
              <CarouselItem key={index}>
                <div className="h-[400px]">
                  <img src={src || 'https://placehold.co/1200x600'} alt={`${item.name} view ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>

        {/* --- 2. Essential Hotel Details --- */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{item.name}</h1>
              <div className="flex items-center gap-2 text-slate-500 mt-2">
                <MapPin className="h-5 w-5" />
                <span>{item.address}, {item.location}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
                <div className="flex items-center gap-2 justify-end">
                   <Badge className="text-lg bg-sky-600 hover:bg-sky-700">{item.rating || '8.2'}</Badge>
                   <p className="font-bold">Good</p>
                </div>
                <p className="text-sm text-slate-500">Based on 23 reviews</p>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {Array.isArray(item.amenities) && item.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-orange-600" />
                  <span className="text-slate-700">{amenity}</span>
                </div>
              ))}
          </div>
        </div>
        
        {/* --- 3. Room Selection Section --- */}
        <div className="space-y-6 pt-4">
            <h2 className="text-3xl font-bold">Select your room</h2>
            {(item.availableRooms || item.rooms || []).map(room => (
                <Card key={room._id} className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-6">
                        {/* Room Image */}
                        <div className="md:col-span-2">
                             <img src={item.imageUrl || 'https://placehold.co/600x400'} alt={room.roomType} className="w-full h-full object-cover" />
                        </div>
                        {/* Room Details */}
                        <div className="p-6 md:col-span-3">
                            <h3 className="text-2xl font-bold text-sky-700 mb-4">{room.roomType} Room</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 text-slate-600">
                                    <div className="flex items-center gap-2"><Users className="h-5 w-5" /><span>Sleeps {room.maxGuests}</span></div>
                                    <div className="flex items-center gap-2"><BedDouble className="h-5 w-5" /><span>1 King Bed</span></div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {Array.isArray(room.amenities) && room.amenities.map(amenity => (
                                        <Badge key={amenity} variant="secondary">{amenity}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Price & Booking Button */}
                        <div className="p-6 bg-slate-100 flex flex-col justify-center items-center text-center md:col-span-1 border-t md:border-t-0 md:border-l">
                            <p className="text-3xl font-bold mb-1">₹{room.price}</p>
                            <p className="text-sm text-slate-500 mb-4">per night</p>
                            <Button className="w-full" onClick={() => handleSelectRoom(room)}>
                                Select
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>

      </div>
    </div>
  );
}

export default DetailPage;

