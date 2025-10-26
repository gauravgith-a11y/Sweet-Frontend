import { Card } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataContext";

const ProductsSlider = () => {
  const { productSlides } = useData();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-16 px-4 border-t-2 border-b-2 border-dashed border-primary/30 relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Customer Favorites</h2>
          <p className="text-muted-foreground text-lg">Discover what makes our sweets special</p>
        </div>

        {/* Left Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-smooth hover:shadow-hover hover:scale-110"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Carousel */}
        <div className="overflow-hidden px-12" ref={emblaRef}>
          <div className="flex gap-6">
            {productSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`flex-[0_0_100%] min-w-0 ${
                  index === 0 ? "pl-6" : index === productSlides.length - 1 ? "pr-6" : ""
                }`}
              >
                <div className="grid md:grid-cols-3 gap-6 items-stretch">
                  {/* Left Image */}
                  <Card className="overflow-hidden h-full group hover-lift shine-effect">
                    <div className="aspect-[4/5] w-full h-full relative">
                      <img
                        src={slide.leftImage}
                        alt={`${slide.title} left`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                    </div>
                  </Card>

                  {/* Center Text */}
                  <Card className="bg-primary text-primary-foreground p-8 flex flex-col justify-center items-center text-center h-full relative overflow-hidden group hover-lift">
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-smooth">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/20 to-transparent" />
                    </div>
                    <div className="w-full max-w-md relative z-10">
                      <h3 className="text-2xl font-bold mb-4 group-hover:scale-105 transition-bounce">{slide.title}</h3>
                      <p className="mb-6">{slide.description}</p>
                      <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-bounce">
                        {slide.statValue}
                      </div>
                      <p className="text-sm">{slide.statNote}</p>
                    </div>
                  </Card>

                  {/* Right Image */}
                  <Card className="overflow-hidden h-full group hover-lift shine-effect">
                    <div className="aspect-[4/5] w-full h-full relative">
                      <img
                        src={slide.rightImage}
                        alt={`${slide.title} right`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-smooth hover:shadow-hover hover:scale-110"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default ProductsSlider;
