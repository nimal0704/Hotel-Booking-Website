import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// --- Shadcn UI Component Imports ---
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// --- Icons (using Lucide React, which Shadcn recommends) ---
import { Lock, AlertCircle, CheckCircle2 } from 'lucide-react';


function BookingPage (){
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  
  const {user} = useAuth();
  
  const type = searchParam.get('type');
  const id = searchParam.get('id');
  const roomId = searchParam.get('roomId');
  const checkin = searchParam.get('checkin');
  const checkout = searchParam.get('checkout');


  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    // State for the form fields
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if(!user){
      navigate('/login',{replace: true});
      return;
    }else{
      setFirstName(user.name?.split(' ')[0] || '');
      setSurname(user.name?.split(' ').slice(1).join(' ') || '');
      setEmail(user.email || '');
    }
    const fetchItemData = async() =>{
      if(!type || !id){
      setLoading(false);
      return;
      }
      try{
        setLoading(true);
        const response = await fetch(`${baseUrl}/hotels/${id}/rooms/${roomId}/availability?checkin=${checkin}&checkout=${checkout}`);
        const data = await response.json();
        console.log("Availability API response:", data);
        setItem(data);
      }catch (err) { // Use a different name like 'err' to avoid confusion
        console.error('Error fetching item data:', err);
        setError(err.message || "Failed to fetch data"); // Set the error state
      }finally{
        setLoading(false);
      }
    };
    fetchItemData();

  },[navigate,id,type,user,roomId,checkout,checkin]);

    const price = item?.price || item?.totalPrice || 0;
    const tax = price * 0.12;
    const finalPrice = price + tax;

     // In BookingPage.jsx

const handleConfirmBooking = async (e) => {
    e.preventDefault();

    // Calculate nights for sending to backend
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const numberOfNights = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);


    const bookingDetails = {
        userId: user.userId, // Assumes your user object has an _id
        hotelId: id,
        roomId: roomId,
        guestName: `${firstName} ${surname}`,
        checkin: checkin,
        checkout: checkout,
        numberOfNights: numberOfNights,
        totalPrice: finalPrice // The final price including tax
    };

    try {
        const response = await fetch(`${baseUrl}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingDetails),
        });

        if (!response.ok) {
            throw new Error('Booking failed. Please try again.');
        }

        const data = await response.json();
        console.log("Booking successful:", data);
        alert("Booking Successful!");
        navigate('/'); // Redirect to homepage on success

    } catch (error) {
        console.error('Booking submission error:', error);
        alert(error.message);
    }
  };

  if(loading){
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }
  if(!item){
    return (
            <div className="container mx-auto p-4 md:p-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error || "Could not load booking details."}</AlertDescription>
                </Alert>
            </div>
        );
  }



return (
        <div className="bg-slate-50 min-h-screen p-4 md:p-8">
            <div className="container mx-auto">
                {/* --- This is the Tailwind CSS Grid Layout --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Form (takes up 2 of 3 columns on large screens) */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleConfirmBooking}>
                            <Card className="border-none shadow-none bg-transparent">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">Secure booking</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <Alert className="bg-green-100 border-green-200 text-green-800">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <AlertDescription>You've picked a winner! This experience is highly rated.</AlertDescription>
                                </Alert>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold">Who's checking in?</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input id="firstName" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="surname">Surname</Label>
                                            <Input id="surname" required value={surname} onChange={e => setSurname(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email address</Label>
                                        <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold">Payment method</h3>
                                    <div className="flex items-center text-sm text-slate-500">
                                        <Lock className="h-4 w-4 mr-2" />
                                        <p>We use secure transmission and protect your personal information.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cardName">Name on Card</Label>
                                            <Input id="cardName" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cardNumber">Debit/Credit card number</Label>
                                            <Input id="cardNumber" required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry">Expiry date (MM/YY)</Label>
                                                <Input id="expiry" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cvv">Security code (CVV)</Label>
                                                <Input id="cvv" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" className="w-full h-12 text-lg">
                                    Complete Booking (Dummy)
                                </Button>
                            </CardFooter>
                        </Card>
                        </form>
                    </div>

                    {/* Right Column: Summary Card (takes up 1 of 3 columns on large screens) */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8">
                            <CardHeader>
                                <img
                                    src={item?.imageUrl || `https://placehold.co/600x400?text=${item?.name || item?.title || item?.packageName}`}
                                    alt={item?.name || item?.title || item?.packageName}
                                    className="rounded-lg mb-4"
                                />
                                <CardTitle>{item?.name || item?.title || item?.packageName}</CardTitle>
                                <CardDescription className="capitalize">{item?.location}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Separator />
                                <div>
                                    <h4 className="font-semibold mb-2">Price details</h4>
                                    <div className="flex justify-between text-sm">
                                        <p>Price</p>
                                        <p>₹{price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <p>Taxes and fees</p>
                                        <p>₹{tax.toFixed(2)}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-lg">
                                    <p>Total</p>
                                    <p>₹{finalPrice.toFixed(2)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
  
}
export default BookingPage;

  