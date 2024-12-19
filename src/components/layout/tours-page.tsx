'use client';
import React, { useState } from 'react';
import Navbar from './navbar';
import TourCard from '../tours/tour-card';
import useTours from '../../hooks/use-tours';

export default function ToursPage() {
  const { tours, loading, error } = useTours();

  // Filtreleme durumunu yönet
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleApplyFilters = (category: string, selectedFilters: { [key: string]: string }) => {
    setFilters(selectedFilters); // Gelen filtreleri state'e kaydet
  };

  // Filtrelenmiş turları hesapla
  const filteredTours = tours.filter((tour) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true; // Boş filtreleri geç

      // Price filtrasyonu
      if (key === 'Min Price') return tour.price >= parseFloat(value);
      if (key === 'Max Price') return tour.price <= parseFloat(value);
      
      // Location filtrasyonu
      if (key === 'Location') return tour.location.toLowerCase().includes(value.toLowerCase());
      
      // Duration filtrasyonu
      if (key === 'Min Duration') return parseFloat(tour.duration) >= parseFloat(value);
      if (key === 'Max Duration') return parseFloat(tour.duration) <= parseFloat(value);
      
      // Rating filtrasyonu
      if (key === 'Rate') return tour.rating >= parseFloat(value);
      if (key === 'Rate') return tour.rating <= parseFloat(value);

      
      return true;
    });
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

  // Turlar yoksa
  if (tours.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar onApplyFilters={handleApplyFilters} />
        <div className="pt-16 px-4 flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-500 text-center">No tours available</p>
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
