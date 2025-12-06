import React from 'react';
import { useNavigate } from 'react-router-dom';


function TripSearchForm() {
    const [location, setLocation] = React.useState('');
    const navigate = useNavigate();


    const handleSearch = () =>{
        navigate(`/search?type=packages&location=${location}`);
    }

    
    return (
        <div className="flex items-center gap-4">
            <input 
                type="text" 
                placeholder="Search for a destination or package... e.g., 'Kerala Backwaters Tour'"
                className="flex-grow w-full border border-gray-300 rounded-md shadow-sm p-3 text-lg focus:ring-[#ff4c1f] focus:border-[#ed451b]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button className="bg-[#ff4c1f] text-white font-bold py-3 px-8 rounded-md hover:bg-[#e14119] transition-colors shadow-lg" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}

export default TripSearchForm;