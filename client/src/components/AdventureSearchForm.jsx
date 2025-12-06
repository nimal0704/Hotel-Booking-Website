
import React from 'react';
import { useNavigate } from 'react-router-dom';


function AdventureSearchForm() {
  const [activity, setActivity] = React.useState('trekking');
  const [location, setLocation] = React.useState('');
  const navigate = useNavigate();

  

  const handleSearch = () => {
    navigate(`/search?type=adventure&location=${location}&option=${activity}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-lg md:text-xl font-light">
      <span className="text-gray-600">I want to</span>
      <select value={activity} onChange={(e) => setActivity(e.target.value)} className="cursor-pointer bg-transparent border-0 border-b-2 border-gray-400 p-1 focus:outline-none focus:ring-0 focus:border-[#ff4c1f] transition">
        <option value="trekking">go trekking</option>
        <option value="kayaking">go kayaking</option>
        <option value="camping">go camping</option>
      </select>
      <span className="text-gray-600">in</span>
      <input 
        type="text" 
        placeholder="a location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-grow bg-transparent border-0 border-b-2 border-gray-400 p-1 focus:outline-none focus:ring-0 focus:border-[#ff4c1f] transition"
      />
      <button className="bg-[#ff4c1f] border-2 border-[#c22700] text-[#4e1203] font-medium py-2 px-6 rounded-full hover:bg-[#ee451b] transition-colors shadow-lg hover:shadow-xl" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default AdventureSearchForm;