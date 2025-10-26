import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PRODUCT_SLIDES } from "@/components/constant";

// Types for our data structures
export interface HeroStat {
  id: string;
  value: string;
  label: string;
}

export interface ProductSlide {
  id: number;
  title: string;
  description: string;
  statValue: string;
  statNote: string;
  leftImage: string;
  rightImage: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
}

interface DataContextType {
  heroStats: HeroStat[];
  productSlides: ProductSlide[];
  categories: Category[];
  articles: Article[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  gallery: GalleryItem[];
  isLoading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Default data - can be overridden by backend
const defaultData: DataContextType = {
  heroStats: [
    { id: "1", value: "50+", label: "Varieties Available" },
    { id: "2", value: "10+", label: "Years of Experience" },
    { id: "3", value: "95%", label: "Customer Satisfaction" },
  ],
  productSlides: PRODUCT_SLIDES,
  categories: [],
  articles: [],
  testimonials: [],
  faqs: [],
  gallery: [],
  isLoading: false,
  error: null,
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DataContextType>(defaultData);

  // TODO: Replace this with actual backend fetching when Lovable Cloud is connected
  useEffect(() => {
    const fetchData = async () => {
      try {
        // When backend is connected, fetch data here
        // const response = await fetch('/api/content');
        // const backendData = await response.json();
        // setData({ ...defaultData, ...backendData, isLoading: false });
        
        // For now, use default data
        setData({ ...defaultData, isLoading: false });
      } catch (error) {
        setData({ 
          ...defaultData, 
          isLoading: false, 
          error: error instanceof Error ? error.message : "Failed to load data" 
        });
      }
    };

    fetchData();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
