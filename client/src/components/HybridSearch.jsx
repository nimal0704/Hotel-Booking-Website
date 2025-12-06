import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";

// --- Shadcn UI Component Imports ---
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// --- Icons (using Lucide React) ---
import { Plane, Hotel, Map, Calendar as CalendarIcon } from 'lucide-react';

// --- Form components are now defined inside this single file ---

const AdventureSearchForm = () => {
  const navigate = useNavigate();
  const [activity, setActivity] = React.useState('trekking');
  const [location, setLocation] = React.useState('');

  const handleSearch = () => {
    navigate(`/search?type=adventure&location=${location}&option=${activity}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-lg md:text-xl font-light">
       <span className="text-slate-600">I want to</span>
      <div className='flex flex-row items-center'>
           
       <Select value={activity} onValueChange={setActivity}>
        <SelectTrigger className="w-[180px] bg-transparent border-0 border-b-2 rounded-none border-slate-300 focus:ring-0 focus:ring-offset-0 focus:border-red-500 text-lg font-normal">
          <SelectValue placeholder="Select an activity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="trekking">go trekking</SelectItem>
          <SelectItem value="kayaking">go kayaking</SelectItem>
          <SelectItem value="camping">go camping</SelectItem>
        </SelectContent>
       </Select>
       <span className="text-slate-600">in</span>
       <Input 
        type="text" 
        placeholder="a location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-grow bg-transparent border-0 border-b-2 rounded-none border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-red-500 text-lg font-normal h-9 "
      />
      </div>
      
      <Button 
        onClick={handleSearch}
        className="bg-gradient-to-r from-[#ffe435] to-[#ff470a] text-[#4e1203] font-semibold py-3 px-8 text-base h-12 rounded-full hover:bg-[#e14119] border-2 border-[#4e1203] mx-20"
      >
        Search
      </Button>
    </div>
  );
};

const HotelSearchForm = () => {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = React.useState({ from: undefined, to: undefined });
    const [location, setLocation] = React.useState('');

    const handleSearch = () => {
        if (!location || !dateRange.from || !dateRange.to) {
            alert("Please enter a location and select a date range.");
            return;
        }
        const checkin = format(dateRange.from, "yyyy-MM-dd");
        const checkout = format(dateRange.to, "yyyy-MM-dd");
        navigate(`/search?type=hotel&location=${location}&checkin=${checkin}&checkout=${checkout}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="md:col-span-2 space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                <Input 
                    type="text" 
                    id="location" 
                    placeholder="e.g., Munnar" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-12"
                />
            </div>
            <div className="md:col-span-2 space-y-2">
                <Label htmlFor="daterange" className="text-sm font-medium">Check-in & Check-out</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="daterange"
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal h-12",
                                !dateRange.from && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange.from ? (
                                dateRange.to ? (
                                    <>
                                        {format(dateRange.from, "LLL dd, y")} -{" "}
                                        {format(dateRange.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(dateRange.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Select your dates</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange.from}
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="md:col-span-1">
                <Button 
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-[#ffe435] to-[#ff470a] text-[#4e1203] font-semibold py-3 px-8 text-base h-12 rounded-full hover:bg-[#e14119] border-2 border-[#4e1203]"
                >
                    Search
                </Button>
            </div>
        </div>
    );
};

const TripSearchForm = () => {
    const navigate = useNavigate();
    const [location, setLocation] = React.useState('');

    const handleSearch = () => {
        navigate(`/search?type=packages&location=${location}`);
    }

    return (
        <div className="flex items-center gap-4">
            <Input 
                type="text" 
                placeholder="Search for a destination or package... e.g., 'Kerala Backwaters Tour'"
                className="flex-grow w-full text-base h-12"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <Button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-[#ffe435] to-[#ff470a] text-[#4e1203] font-semibold py-3 px-8 text-base h-12 rounded-full hover:bg-[#e14119] border-2 border-[#4e1203]"
            >
                Search
            </Button>
        </div>
    );
};


function HybridSearch() {
  const [activeTab, setActiveTab] = React.useState('adventures');

  return (
    <Card className="w-full max-w-4xl mx-auto rounded-xl shadow-lg border-slate-200">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100 h-16 rounded-t-xl rounded-b-none p-1">
          <TabsTrigger value="adventures" className="text-sm font-semibold h-full data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-red-600">
            <Plane className="h-5 w-5 mr-2" /> Adventures
          </TabsTrigger>
          <TabsTrigger value="hotels" className="text-sm font-semibold h-full data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-red-600">
            <Hotel className="h-5 w-5 mr-2" /> Hotels
          </TabsTrigger>
          <TabsTrigger value="trips" className="text-sm font-semibold h-full data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-red-600">
            <Map className="h-5 w-5 mr-2" /> Trip Packages
          </TabsTrigger>
        </TabsList>
        
        <CardContent className="p-6">
          <TabsContent value="adventures">
            <AdventureSearchForm />
          </TabsContent>
          <TabsContent value="hotels">
            <HotelSearchForm />
          </TabsContent>
          <TabsContent value="trips">
            <TripSearchForm />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}

export default HybridSearch;

