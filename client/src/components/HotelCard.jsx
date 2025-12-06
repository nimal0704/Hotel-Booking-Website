import React from 'react';
import { useNavigate } from 'react-router-dom';

// --- Shadcn UI Component Imports ---
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function HotelCard({ hotel, checkin, checkout }) {
  const navigate = useNavigate();

  const handleViewDeal = () => {
    navigate(`/hotels/${hotel._id}?checkin=${checkin}&checkout=${checkout}`);
  }

  // The logic to find the lowest price remains the same.
  let minPrice = 0;
  if (hotel.availableRooms && hotel.availableRooms.length > 0) {
    const prices = hotel.availableRooms.map(room => room.price);
    minPrice = Math.min(...prices);
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={hotel.imageUrl || 'https://via.placeholder.com/400x250'}
          alt={hotel.name}
          className="w-full h-48 object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-bold truncate">{hotel.name}</CardTitle>
        <CardDescription>{hotel.location}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        <div className="flex flex-wrap gap-2">
          {Array.isArray(hotel.amenities) && hotel.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>
        
        {minPrice > 0 ? (
          <div>
            <p className="text-sm text-slate-500">Rooms from</p>
            <p className="text-2xl font-bold text-slate-800">
              ₹{minPrice}
              <span className="text-base font-normal text-slate-500"> / night</span>
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No available rooms found for these dates.
          </p>
        )}
      </CardContent>

      <CardFooter>
         <Button onClick={handleViewDeal} className="w-full">
            View Available Rooms
         </Button>
      </CardFooter>
    </Card>
  );
}

export default HotelCard;


