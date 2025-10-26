import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import heroImage from "@/assets/hero-sweets.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { heroStats } = useData();

  const handleExplore = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login", { state: { from: "/checkout" } });
    }
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
          Where Tradition <br />
          Meets Innovation
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-fade-in">
          Handcrafted sweets made with love, using traditional recipes passed down through generations
        </p>
        <Button
          variant="hero"
          size="lg"
          onClick={handleExplore}
          className="group hover:scale-105 transition-bounce shadow-warm hover:shadow-hover"
        >
          Explore Our Collection
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
        </Button>
      </div>

      {/* Stats */}
      <div className="absolute bottom-16 left-0 right-0 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-primary-foreground text-center">
            {heroStats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center justify-center">
                <div className="text-4xl md:text-5xl font-extrabold mb-2 leading-none">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-medium text-primary-foreground/90 whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
