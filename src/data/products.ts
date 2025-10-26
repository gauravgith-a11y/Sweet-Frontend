// Mock data structured like backend API response
// This can be replaced with actual API calls later

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

// This structure mimics what a backend API would return
export const categories: Category[] = [
  { id: "barfi", name: "Barfi", image: "/src/assets/category-barfi.jpg" },
  { id: "peda", name: "Peda", image: "/src/assets/category-peda.jpg" },
  { id: "halwa", name: "Halwa", image: "/src/assets/category-halwa.jpg" },
  { id: "ladoo", name: "Ladoo", image: "/src/assets/category-ladoo.jpg" },
  { id: "mysore-pak", name: "Mysore Pak", image: "/src/assets/category-mysore-pak.jpg" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Kaju Katli",
    category: "barfi",
    price: 450,
    rating: 5,
    image: "/src/assets/kaju-katli.jpg",
    description: "Premium cashew fudge"
  },
  {
    id: "2",
    name: "Strawberry Barfi",
    category: "barfi",
    price: 380,
    rating: 4,
    image: "/src/assets/product-chocolate-barfi.jpg",
    description: "Sweet strawberry delight"
  },
  {
    id: "3",
    name: "Coconut Barfi",
    category: "barfi",
    price: 320,
    rating: 5,
    image: "/src/assets/product-rasgulla.jpg",
    description: "Fresh coconut sweet"
  },
  {
    id: "4",
    name: "Mango Barfi",
    category: "barfi",
    price: 400,
    rating: 5,
    image: "/src/assets/kaju-katli.jpg",
    description: "Tropical mango flavor"
  },
  {
    id: "5",
    name: "Chocolate Barfi",
    category: "barfi",
    price: 420,
    rating: 4,
    image: "/src/assets/product-chocolate-barfi.jpg",
    description: "Rich chocolate barfi"
  },
  {
    id: "6",
    name: "Pistachio Barfi",
    category: "barfi",
    price: 520,
    rating: 5,
    image: "/src/assets/gulab-jamun.jpg",
    description: "Premium pistachio sweet"
  },
  {
    id: "7",
    name: "Kesar Peda",
    category: "peda",
    price: 360,
    rating: 5,
    image: "/src/assets/category-peda.jpg",
    description: "Saffron flavored peda"
  },
  {
    id: "8",
    name: "Rose Peda",
    category: "peda",
    price: 340,
    rating: 4,
    image: "/src/assets/product-chocolate-barfi.jpg",
    description: "Delicate rose flavor"
  },
  {
    id: "9",
    name: "Plain Peda",
    category: "peda",
    price: 300,
    rating: 5,
    image: "/src/assets/category-peda.jpg",
    description: "Traditional milk peda"
  },
  {
    id: "10",
    name: "Gajar Halwa",
    category: "halwa",
    price: 280,
    rating: 5,
    image: "/src/assets/category-halwa.jpg",
    description: "Carrot pudding delight"
  },
  {
    id: "11",
    name: "Moong Dal Halwa",
    category: "halwa",
    price: 350,
    rating: 4,
    image: "/src/assets/product-chocolate-barfi.jpg",
    description: "Rich lentil halwa"
  },
  {
    id: "12",
    name: "Sooji Halwa",
    category: "halwa",
    price: 250,
    rating: 5,
    image: "/src/assets/category-halwa.jpg",
    description: "Semolina pudding"
  },
];

// Simulated API functions - replace these with actual API calls
export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return products;
};

export const fetchCategories = async (): Promise<Category[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return categories;
};

export const fetchProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return categoryId === "all" 
    ? products 
    : products.filter(p => p.category === categoryId);
};
