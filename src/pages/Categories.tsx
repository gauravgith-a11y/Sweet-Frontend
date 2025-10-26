import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import axios from "axios";
import { Star, ShoppingCart, Plus, Minus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchProducts, fetchCategories, type Product, type Category } from "@/data/products";
import { useSearchParams } from "react-router-dom";

const Categories = () => {
  const { items, addToCart, updateQuantity } = useCart();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const searchQuery = searchParams.get("search") || "";

  // useEffect(() => {
  //   loadData();
  // }, []);

  // const loadData = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Replace these with actual API calls when backend is ready
  //     const [productsData, categoriesData] = await Promise.all([
  //       fetchProducts(),
  //       fetchCategories()
  //     ]);
  //     setProducts(productsData);
  //     setCategories(categoriesData);
  //   } catch (error) {
  //     console.error("Failed to load products");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  useEffect(() => {
      const loadData = async () => {
        setIsLoading(true);
        try {
          console.log("Fetching categories and products...");
          const [catRes, prodRes] = await Promise.all([
            axios.get("http://127.0.0.1:8000/api/category"),
            axios.get("http://127.0.0.1:8000/api/product"),
          ]);

          // ✅ Handle Laravel API responses (with or without "data" wrapper)
          const catData = Array.isArray(catRes.data) ? catRes.data : catRes.data.data;
          const prodData = Array.isArray(prodRes.data) ? prodRes.data : prodRes.data.products;

          setCategories(catData || []);
          setProducts(prodData || []);
        } catch (err) {
          console.error("Error fetching:", err);
        } finally {
          setIsLoading(false);
        }
      };

      loadData();
    }, []);



  const filterProducts = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // When backend is ready, call API here instead
    // const filtered = await fetchProductsByCategory(categoryId);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getProductQuantity = (productId: string) => {
    const item = items.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Home sweet Bakery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In most bakeshops you will find an assortment of cakes, pastries and fresh bread
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Categories</h2>
          
          <div className="flex justify-center gap-6 flex-wrap mb-12">
            <button
              onClick={() => filterProducts("all")}
              className={`group flex flex-col items-center gap-3 transition-smooth ${selectedCategory === "all" ? "scale-110" : ""}`}
            >
              <div className={`w-24 h-24 rounded-full overflow-hidden border-4 transition-smooth ${selectedCategory === "all" ? "border-primary shadow-warm" : "border-transparent group-hover:border-primary/50"}`}>
                <div className="w-full h-full bg-gradient-subtle flex items-center justify-center">
                  <span className="text-2xl">🍰</span>
                </div>
              </div>
              <span className="font-semibold">All</span>
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => filterProducts(category.id)}
                className={`group flex flex-col items-center gap-3 transition-smooth ${selectedCategory === category.id ? "scale-110" : ""}`}
              >
                <div className={`w-24 h-24 rounded-full overflow-hidden border-4 transition-smooth ${selectedCategory === category.id ? "border-primary shadow-warm" : "border-transparent group-hover:border-primary/50"}`}>
                  <img src={`http://127.0.0.1:8000/storage/categories/${category.image}`} alt={category.name} className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 border-t-2 border-b-2 border-primary py-4">
            <h2 className="text-3xl font-display font-bold">Most Popular</h2>
            <Badge variant="secondary" className="px-4 py-2">
              {filteredProducts.length} Products
            </Badge>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="aspect-square bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const quantity = getProductQuantity(product.id);
                return (
                  <Card key={product.id} className="p-4 gradient-card shadow-elegant overflow-hidden group hover:shadow-warm transition-smooth">
                    <div className="aspect-square overflow-hidden bg-secondary/20">
                      <img src={`http://127.0.0.1:8000/storage/products/${product.image}`} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-smooth rounded-sm" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      {product.description && <p className="text-sm text-muted-foreground mb-4">{product.description}</p>}
                      
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < product.rating ? "fill-primary text-primary" : "text-muted"}`} />
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                        
                        {quantity === 0 ? (
                          <Button onClick={() => addToCart(product)} size="sm" className="gap-2">
                            <ShoppingCart className="w-4 h-4" /> Add
                          </Button>
                        ) : (
                          <div className="flex items-center border rounded-md overflow-hidden">
                            <Button onClick={() => updateQuantity(product.id, quantity - 1)} size="sm" className="px-2"  variant="ghost">
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-4">{quantity}</span>
                            <Button onClick={() => updateQuantity(product.id, quantity + 1)} size="sm" className="px-2"  variant="ghost">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Food */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12">
            Why choose our <span className="text-primary">Food</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🍯</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pure Ingredients</h3>
                  <p className="text-muted-foreground">
                    We use only the finest and purest ingredients sourced from trusted suppliers
                    to ensure authentic taste and quality in every sweet.
                  </p>
                  <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">👨‍🍳</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Expert Craftsmanship</h3>
                  <p className="text-muted-foreground">
                    Our master confectioners bring decades of experience and traditional recipes
                    passed down through generations.
                  </p>
                  <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🎁</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Perfect for Gifting</h3>
                  <p className="text-muted-foreground">
                    Beautiful packaging and customization options make our sweets perfect for
                    any celebration or special occasion.
                  </p>
                  <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/src/assets/gulab-jamun.jpg"
                alt="Delicious traditional sweets"
                className="rounded-2xl shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Categories;
