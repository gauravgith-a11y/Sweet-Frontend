import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import kajuKatli from "@/assets/kaju-katli.jpg";
import gulabJamun from "@/assets/gulab-jamun.jpg";

const ProductShowcase = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleOrderNow = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login", { state: { from: "/checkout" } });
    }
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Delights</h2>
          <p className="text-muted-foreground text-lg">Handpicked favorites that define excellence</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product 1 */}
          <Card className="gradient-card shadow-elegant overflow-hidden group hover-lift cursor-pointer shine-effect">
            <div className="p-8">
              <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-smooth">Premium Kaju Katli</h3>
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-6 relative">
                <img 
                  src={kajuKatli} 
                  alt="Kaju Katli - Traditional Indian cashew sweets"
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end justify-center pb-4">
                  <span className="text-primary-foreground font-semibold bg-primary px-4 py-2 rounded-full">View Details</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Experience the richness of pure cashews in our signature Kaju Katli. Made with premium quality cashews, pure ghee, and just the right amount of sugar, creating a delicate, melt-in-your-mouth texture that's been loved for generations.
              </p>
              <Button variant="default" onClick={handleOrderNow} className="w-full group-hover:scale-105 transition-bounce">
                Order Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </div>
          </Card>

          {/* Product 2 */}
          <Card className="gradient-card shadow-elegant overflow-hidden group hover-lift cursor-pointer shine-effect">
            <div className="p-8">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-6 relative">
                <img 
                  src={gulabJamun} 
                  alt="Gulab Jamun - Traditional Indian milk solid sweets"
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end justify-center pb-4">
                  <span className="text-primary-foreground font-semibold bg-primary px-4 py-2 rounded-full">View Details</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-smooth">Classic Gulab Jamun</h3>
              <p className="text-muted-foreground mb-6">
                Soft, spongy milk solid dumplings soaked in aromatic rose-cardamom syrup. Our Gulab Jamun is made fresh daily using traditional methods, ensuring every bite is perfectly sweet and irresistibly delicious. A timeless favorite for celebrations and everyday indulgence.
              </p>
              <Button variant="default" onClick={handleOrderNow} className="w-full group-hover:scale-105 transition-bounce">
                Order Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
