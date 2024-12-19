'use client';
import React, { useState } from 'react';
import Navbar from './navbar';
import TourCard from '../tours/tour-card';
import useTours from '../../hooks/use-tours';

export default function ToursPage() {
  const { tours, loading, error } = useTours();

  // Filtreleme durumunu yönet
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleApplyFilters = (_category: string, selectedFilters: { [key: string]: string }) => {
    setFilters(selectedFilters); // Gelen filtreleri state'e kaydet
  };
  handleApplyFilters.displayName = 'handleApplyFilters'

  const filteredTours = tours.filter((tour) => {
    const result = Object.entries(filters).every(([key, value]) => {
      if (!value) return true; // Boş filtreleri geç
      if (Number(key === 'Min-Rate') && tour.rating < Number(value)) return false;
      if (Number(key === 'Max-Rate') && tour.rating > Number(value)) return false;
      if (key === 'Min-Price' && tour.price < Number(value)) return false;
      if (key === 'Max-Price' && tour.price > Number(value)) return false;
      if (key === 'Location' && !tour.location?.toLowerCase().includes(value.toLowerCase())) return false;
      if (key === 'Min-Duration' && Number(tour.duration) < Number(value)) return false;
      if (key === 'Max-Duration' && Number(tour.duration) > Number(value)) return false;
      return true;
    });
  
    return result;
  });

  

  // Loading durumu
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Hata durumu
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

    // filtrelemeye uygun turlar yoksa
    if (filteredTours.length === 0) {
      return (
        <div className="min-h-screen bg-[#E7E7E5]">
          <Navbar onApplyFilters={handleApplyFilters} />
          <div className="pt-48 px-4 flex flex-col items-center justify-center min-h-[60vh] pointer-events-none ">
          <p className="text-gray-700 text-center text-base font-semibold" >Sorry, we couldn&apos;t find the tours you wanted...</p>
            <iframe className='pointer-events-none' src="https://giphy.com/embed/9J7tdYltWyXIY" width="340" height="403" allowFullScreen></iframe>
          </div>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onApplyFilters={handleApplyFilters} />

      <main className="pt-16 px-4 mt-6">
        <h1 className="text-2xl font-bold mb-4 text-primary-600">Popular Tours</h1>

        <div className="grid gap-4">
          {filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              title={tour.title}
              image={tour.image}
              price={tour.price}
              rating={tour.rating}
              location={tour.location}
              duration={tour.duration}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
