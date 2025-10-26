import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import CategorySlider from "@/components/CategorySlider";
import ArticlesResources from "@/components/ArticlesResources";
import Testimonials from "@/components/Testimonials";
import ProductsSlider from "@/components/ProductsSlider";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ScrollSection = ({ children }: { children: React.ReactNode }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      <Navigation />
      <Hero />
      <ScrollSection>
        <ProductShowcase />
      </ScrollSection>
      <ScrollSection>
        <CategorySlider />
      </ScrollSection>
      <ScrollSection>
        <ArticlesResources />
      </ScrollSection>
      <ScrollSection>
        <Testimonials />
      </ScrollSection>
      <ScrollSection>
        <ProductsSlider />
      </ScrollSection>
      <ScrollSection>
        <ContactForm />
      </ScrollSection>
      <ScrollSection>
        <FAQ />
      </ScrollSection>
      <ScrollSection>
        <Gallery />
      </ScrollSection>
      <Footer />
    </div>
  );
};

export default Index;
