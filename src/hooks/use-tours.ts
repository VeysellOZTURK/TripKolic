'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Tour {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  duration: string;
}

interface TourApiResponse {
  products: {
    id: number;
    title: string;
    galleries: { url: string }[];
    price: { adultPrice: number };
    rating: number;
    activityLocation: { address: string };
    routes: { duration: string }[];
  }[];
}

const useTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await axios.get<TourApiResponse>('https://beta.tripkolic.com/api/v1/product/task/tours');
        
        // API yanıtını kontrol edelim
        console.log('API Response:', response.data);

        // API yanıtının yapısını kontrol edelim
        if (response.data && response.data.products && Array.isArray(response.data.products)) {
          // `products` dizisini alıyoruz
          const toursData = response.data.products;

          const formattedTours = toursData.map((tour) => ({
            id: tour.id || Math.random(),
            title: tour.title || 'Unknown Tour',
            image: (tour.galleries && tour.galleries[0] && tour.galleries[0].url) || '/placeholder-tour.jpg',
            price: tour.price ? tour.price.adultPrice : 0,
            rating: tour.rating || 4.5,  // Assume there's no direct rating in the response, you can adjust if needed
            location: tour.activityLocation ? tour.activityLocation.address : 'Unknown Location',
            duration: tour.routes && tour.routes[0] && tour.routes[0].duration || '1 Day'
          }));

          setTours(formattedTours);
          setError(null);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (err) {
        console.error('Error details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch tours');
        setTours([]); // Hata durumunda tours'u boş array yap
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return {
    tours,
    loading,
    error,
  };
};

export default useTours;
