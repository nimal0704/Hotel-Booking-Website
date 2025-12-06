// src/components/HotelSearchForm.jsx

import React from 'react';
// 1. Import the DatePicker component
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';


function HotelSearchForm() {
  // 3. Set up state for the date range. It holds an array: [startDate, endDate]
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [location, setLocation] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    // Convert dates to a string format (YYYY-MM-DD)
    const checkin = startDate ? startDate.toISOString().split('T')[0] : '';
    const checkout = endDate ? endDate.toISOString().split('T')[0] : '';

    navigate(`/search?type=hotel&location=${location}&checkin=${checkin}&checkout=${checkout}`);
};

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      {/* Location Input (no changes) */}
      <div className="md:col-span-2">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <input 
            type="text" 
            id="location" 
            placeholder="e.g., Munnar" 
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#ff4c1f] focus:border-[#ff4c1f]" 
        />
      </div>

      {/* 4. Replace the two date inputs with one DatePicker for selecting a range */}
      <div className="md:col-span-2">
          <label htmlFor="daterange" className="block text-sm font-medium text-gray-700">Check-in & Check-out</label>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            minDate={new Date()} // Prevents selecting past dates
            isClearable={true} // Adds a small 'x' to clear the date
            placeholderText="Select your dates"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#ff4c1f] focus:border-[#ff4c1f]" // Apply your Tailwind styles
          />
      </div>
      
      {/* Guests & Search Button */}
      {/* You can add a guest selector here */}

      <button className="md:col-start-4 bg-[#ff4c1f] text-white font-bold py-2 px-4 rounded-md hover:bg-[#f13f12] transition-colors shadow-lg h-10" onClick={handleSearch}>
        Search Hotels
      </button>
    </div>
  );
}

export default HotelSearchForm;