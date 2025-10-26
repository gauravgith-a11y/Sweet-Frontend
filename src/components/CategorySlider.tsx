import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import categoryBarfi from "@/assets/category-barfi.jpg";
import categoryPeda from "@/assets/category-peda.jpg";
import categoryHalwa from "@/assets/category-halwa.jpg";
import categoryLadoo from "@/assets/category-ladoo.jpg";
import categoryMysorePak from "@/assets/category-mysore-pak.jpg";

const categories = [
  { name: "Barfi", image: categoryBarfi },
  { name: "Peda", image: categoryPeda },
  { name: "Halwa", image: categoryHalwa },
  { name: "Ladoo", image: categoryLadoo },
  { name: "Mysore Pak", image: categoryMysorePak },
];

const CategorySlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-16 px-4 bg-secondary/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Popular Categories
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our finest collection of traditional sweets
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Prev Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth shadow-lg hover:shadow-hover hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Embla Carousel */}
          <div className="overflow-hidden px-4 sm:px-8" ref={emblaRef}>
            <div className="flex gap-6 px-6 sm:px-10">
              {categories.map((category) => (
                <div key={category.name} className="flex-[0_0_300px]">
                  <Card className="gradient-card shadow-elegant overflow-hidden group cursor-pointer hover-lift h-[400px] flex flex-col shine-effect">
                    <div className="h-[300px] overflow-hidden relative p-4">
                      <img
                        src={category.image}
                        alt={`${category.name} - Traditional Indian sweets category`}
                        className="w-full h-full object-cover rounded-sm"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                    </div>
                    <div className="p-6 text-center flex-1 flex items-center justify-center relative">
                      <h3 className="text-2xl font-semibold group-hover:text-primary transition-smooth group-hover:scale-110 transition-bounce">
                        {category.name}
                      </h3>
                      <div className="absolute bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 transition-smooth">
                        <span className="text-sm text-primary font-medium">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth shadow-lg hover:shadow-hover hover:scale-110"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
