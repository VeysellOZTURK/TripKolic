'use client';
import React, { useState } from 'react';
import Navbar from './navbar';
import TourCard from '../tours/tour-card';
import useTours from '../../hooks/use-tours';


interface Filters {
  'Min-Price'?: number;
  'Max-Price'?: number;
  'Location'?: string;
  'Min-Duration'?: number;
  'Max-Duration'?: number;
  'Vehicle'?: string;
  'Category'?: string;
  'Activity'?: string;
}

export default function ToursPage() {
  const { tours, loading, error } = useTours();
  const [filters, setFilters] = useState<Filters>({});

  const handleApplyFilters = (_category: string, selectedFilters: Filters) => {
    setFilters(selectedFilters);
  };

  const filteredTours = tours.filter((tour) => {
    const result = Object.entries(filters).every(([key, value]) => {
      if (!value) return true; // Boş filtreleri geç
      if (Number(key === 'Min-Rate') && tour.rating < Number(value)) return false;
      if (Number(key === 'Max-Rate') && tour.rating > Number(value)) return false;
      if (key === 'Min-Price' && tour.price.adult < Number(value)) return false;
      if (key === 'Max-Price' && tour.price.adult > Number(value)) return false;
      if (key === 'Location' && !tour.location?.address.toLowerCase().includes(value.toLowerCase())) return false;
      if (key === 'Min-Duration' && Number(tour.duration) < Number(value)) return false;
      if (key === 'Max-Duration' && Number(tour.duration) > Number(value)) return false;
      return true;
    });
  
    return result;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center p-4">
          <h2 className="text-xl font-bold mb-2">Error Loading Tours</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (filteredTours.length === 0) {
    return (
      <div className="min-h-screen bg-[#E7E7E5]">
        <Navbar onApplyFilters={handleApplyFilters} />
        <div className="pt-48 px-4 flex flex-col items-center justify-center min-h-[60vh] pointer-events-none">
          <p className="text-gray-700 text-center text-base font-semibold">
            Sorry, we couldn&apos;t find the tours you wanted...
          </p>
          <iframe 
            className="pointer-events-none" 
            src="https://giphy.com/embed/9J7tdYltWyXIY" 
            width="340" 
            height="403" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onApplyFilters={handleApplyFilters} />
      <main className="pt-16 px-4 mt-6">
        <h1 className="text-2xl font-bold mb-4 text-primary-600">Popular Tours</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              title={tour.title}
              image={tour.images[0] || '/placeholder-tour.jpg'}
              price={tour.price.adult}
              location={tour.location.address}
              duration={`${tour.duration} Day${Number(tour.duration) > 1 ? 's' : ''}`}
              activities={tour.activities}
              startTimes={tour.startTimes}
              vehicle={tour.vehicle}
              category={tour.category}
              rating={tour.rating}
            />
          ))}
        </div>
      </main>
    </div>
  );
}