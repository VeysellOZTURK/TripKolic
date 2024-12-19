'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

interface Route {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  operatingDays: string[];
  duration: string;
  groupSize: number;
  startTime: string[];
  guideLanguage: string[];
  locations: {
    id: number;
    lat: number;
    lng: number;
    name: string;
    stop: string | null;
    activities: { name: string }[];
    sightseeing: boolean;
  }[];
}

interface Price {
  id: number;
  isShared: boolean;
  isPrivate: boolean;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  additionalPrices: {
    adultPrice: number;
    childPrice: number;
    infantPrice: number;
  };
  group: {
    size: number;
    retailPrice: number;
  };
}
interface foodAndDrinks {
  id: number;
  name: string;
}

interface Vehicle {
  id: number;
  name: string;
}

interface TourCategory {
  id: number;
  name: string;
}

interface Gallery {
  id: number;
  url: string;
}

interface Product {
  id: number;
  productId: string;
  title: string;
  description: string;
  isPayLater: boolean;
  cutOffTime: number;
  transferType: string;
  isTransfer: boolean;
  transferDescription: string;
  activityLocation: Location;
  draft: boolean;
  step: number;
  stepChild: number;
  createdAt: string;
  productCategory: string;
  vehicle: Vehicle;
  tourCategory: TourCategory;
  routes: Route[];
  price: Price;
  galleries: Gallery[];
  foodAndDrinks: foodAndDrinks;
}

interface TourApiResponse {
  products: Product[];
}

interface Tour {
  id: number;
  productId: string;
  title: string;
  description: string;
  images: string[];
  price: {
    adult: number;
    child: number;
    infant: number;
  };
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  duration: string;
  startTimes: string[];
  groupSize: number;
  vehicle: string;
  category: string;
  isTransfer: boolean;
  transferDescription: string | null;
  operatingDays: string[];
  activities: string[];
  rating: number; // Added rating property
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

        if (response.data && response.data.products && Array.isArray(response.data.products)) {
          const formattedTours = response.data.products.map((product): Tour => {
            // Get all unique activities from all route locations
            const activities = product.routes
              .flatMap(route => 
                route.locations.flatMap(location => 
                  location.activities.map(activity => activity.name)
                )
              )
              .filter((value, index, self) => self.indexOf(value) === index);

            return {
              id: product.id,
              rating: 4.5,  // Assume there's no direct rating in the response, you can adjust if needed
              productId: product.productId,
              title: product.title,
              description: product.description,
              images: product.galleries.map(gallery => gallery.url),
              price: {
                adult: product.price.adultPrice,
                child: product.price.childPrice,
                infant: product.price.infantPrice,
              },
              location: {
                address: product.activityLocation.address,
                coordinates: {
                  lat: product.activityLocation.latitude,
                  lng: product.activityLocation.longitude,
                },
              },
              duration: product.routes[0]?.duration || '1',
              startTimes: product.routes[0]?.startTime || [],
              groupSize: product.routes[0]?.groupSize || 0,
              vehicle: product.vehicle.name,
              category: product.foodAndDrinks.name,
              isTransfer: product.isTransfer,
              transferDescription: product.transferDescription,
              operatingDays: product.routes[0]?.operatingDays || [],
              activities,
            };
          });

          setTours(formattedTours);
          setError(null);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (err) {
        console.error('Error fetching tours:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch tours');
        setTours([]);
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