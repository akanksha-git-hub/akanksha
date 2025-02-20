'use client';
import { useState } from "react";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";
import Image from "next/image";
import { PrismicNextImage } from "@prismicio/next";
import PencilShading from "@/assets/shading-side.svg";

const IconShowcaseLocation = ({ slice }) => {
  const [selectedCity, setSelectedCity] = useState("Pune");

  // Get unique city names from Prismic data
  const uniqueCities = [...new Set(slice.primary.data.map(item => item.city))];

  // Filter locations based on the selected city
  const filteredLocations = slice.primary.data.filter(item => item.city === selectedCity);

  // Define alternating colors for each city
  const cityColors = {
    "Mumbai": ["bg-v2-yellow", "bg-white"],  // Keep existing
    "Pune": ["bg-[#55BBD3]", "bg-white"],    // Light blue
    "Nagpur": ["bg-[#F4456E]", "bg-white"]   // Reddish-pink
  };

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="universal-padding">
     

{/* City Selection Tabs */}
<div className="flex space-x-6 mb-6 flex-row items-center justify-around"> 
  {uniqueCities.map(city => (
    <button 
      key={city} 
      onClick={() => setSelectedCity(city)} 
      className={`flex items-center space-x-2 md:text-3xl text-xl uppercase transition-all duration-300 
        ${selectedCity === city ? 'text-black' : 'text-gray-500'}`}
    >
      {/* Inline SVG Icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={selectedCity === city ? "#F4456E" : "#9CA3AF"} // Red when active, Gray when inactive
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 w-6 h-6"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9C5 11.36 6.19 13.78 7.86 16.22C9.47 18.58 10.94 20.5 11.41 21.17C11.62 21.45 11.81 21.67 12 21.88C12.19 21.67 12.38 21.45 12.59 21.17C13.06 20.5 14.53 18.58 16.14 16.22C17.81 13.78 19 11.36 19 9C19 5.13 15.87 2 12 2ZM12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12Z" />
      </svg>

      <span>{city}</span>
    </button>
  ))}
</div>



      {/* Filtered Data Display */}
      {filteredLocations.length > 0 ? (
       <ul className="grid md:grid-cols-2 xl:grid-cols-3 mt-10 min-h-[300px]">
       {filteredLocations.map((item, index) => (
         <li 
           key={item.title}
           className={`flex flex-col items-start justify-between h-full border rounded-3xl p-8 
             ${cityColors[selectedCity][index % 2]} group relative overflow-hidden`}
         >
           {/* Left Border Decoration */}
           <div className="absolute top-0 -left-6 group-hover:left-0 h-full w-4 transition-all">
             <Image src={PencilShading} alt="img" fill />
           </div>
     
       
           <div className="text-black">
           <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.title + ", " + item.address)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl font-ambit-semibold mb-0 cursor-pointer"
              >
                <RichText text={item.title} />
              </a>
             <RichText 
               text={item.address}  
               className="text-lg font-ambit-regular mt-0"
             />
           </div>
     
           
           <div className=" mt-4">
             <RichText 
               text={item.school_leader}  
               className="text-black font-ambit-regular text-lg"
             />
             <RichText 
               text={item.leader_name}  
               className="text-black font-ambit-regular text-lg underline"
             />
           </div>
         </li>
       ))}
     </ul>
     
      
      ) : (
        <p>No locations found for {selectedCity}.</p>
      )}
    </section>
  );
};

export default IconShowcaseLocation;
