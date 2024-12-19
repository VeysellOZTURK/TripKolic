import React from 'react';
import Image from 'next/image';
import { FaStar, FaMapMarkerAlt, FaClock, FaHeart } from 'react-icons/fa';

interface TourCardProps {
  title: string;
  image: string;
  price: number;
  location: string;
  duration: string;
  activities: string[];
  startTimes: string[];
  vehicle: string;
  category: string;
  rating: number;
}

const TourCard: React.FC<TourCardProps> = React.memo(({
  title,
  image,
  price = 0,
  rating = 4.2,
  location,
  duration
}) => {
  const [isFav, setIsFav] = React.useState(true)
  return (
    <div className="relative bg-[#fdfdfd] rounded-lg shadow-md overflow-hidden mb-4 hover:-translate-y-2 hover:shadow-2xl duration-300">
      <div 
        onClick={() => { setIsFav(!isFav) }}
        className="absolute top-2 right-2 z-10 bg-gray-200 rounded-lg p-2 transition-colors duration-300 shadow-2xl shadow-white">
        <FaHeart className={isFav ? 'text-red-500 duration-500' : 'text-gray-400 duration-500' } />
      </div>
      <div className="relative w-full h-48">
        <Image 
          src={image} 
          alt={title} 
          layout="fill" 
          objectFit="cover" 
          priority={true} 
        />
      </div>
      
      <div className="p-4">
        <h2 className="text-lg uppercase text-gray-800 font-bold mb-2">{title}</h2>
        
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-primary-500" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <FaClock className="mr-2 text-primary-500" />
          <span>{duration}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className='text-gray-600 font-bold'>{rating}</span>
          </div>
          
          <div className="text-lg font-bold text-primary-500">
            ${price}
          </div>
        </div>
      </div>
    </div>
  );
});

TourCard.displayName = "TourCard";

export default TourCard;
