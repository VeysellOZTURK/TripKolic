import React from 'react';
import Image from 'next/image';
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

interface TourCardProps {
  title: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  duration: string;
}

const TourCard: React.FC<TourCardProps> = React.memo(({
  title,
  image,
  price = 0,
  rating = 0,
  location,
  duration
}) => {
  return (
    <div className="bg-[#fdfdfd] rounded-lg shadow-md overflow-hidden mb-4 hover:-translate-y-2 hover:shadow-2xl duration-300">
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
            <span className='text-gray-600 font-bold'>{rating ? rating.toFixed(1) : 'N/A'}</span>
          </div>
          
          <div className="text-lg font-bold text-primary-500">
            ${price}
          </div>
        </div>
      </div>
    </div>
  );
});

export default TourCard;
