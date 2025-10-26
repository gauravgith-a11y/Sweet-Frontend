import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Heart, TrendingUp } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "50,000+" },
    { icon: Award, label: "Years of Excellence", value: "25+" },
    { icon: Heart, label: "Products Crafted", value: "1M+" },
    { icon: TrendingUp, label: "Cities Served", value: "100+" },
  ];

  const values = [
    {
      title: "Quality First",
      description: "We never compromise on the quality of our ingredients and preparation methods.",
      icon: "🌟",
    },
    {
      title: "Traditional Recipes",
      description: "Authentic recipes passed down through generations, preserving our rich heritage.",
      icon: "📖",
    },
    {
      title: "Customer Satisfaction",
      description: "Your happiness is our success. We go the extra mile to ensure you're delighted.",
      icon: "😊",
    },
    {
      title: "Innovation",
      description: "While honoring tradition, we innovate to create new flavors for modern tastes.",
      icon: "💡",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">Our Story</Badge>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            About <span className="text-primary">Mithai</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For over 25 years, we've been crafting traditional Indian sweets with love, 
            dedication, and the finest ingredients. Our journey began in a small kitchen 
            and has grown into a beloved brand across the nation.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center gradient-card shadow-elegant hover:shadow-warm transition-smooth">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">Our Journey</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 1998 by Master Confectioner Rajesh Kumar, Mithai began as a 
                  humble sweet shop in the heart of Mumbai. With recipes inherited from his 
                  grandfather and a passion for perfection, Rajesh set out to create sweets 
                  that would touch people's hearts.
                </p>
                <p>
                  What started as a small family business has grown into one of India's most 
                  trusted sweet brands. Today, we operate in over 100 cities, but our 
                  commitment remains unchanged: to deliver authentic taste and quality in 
                  every bite.
                </p>
                <p>
                  Every sweet we make is a testament to our heritage, crafted with the same 
                  care and attention as if we were preparing it for our own family celebrations.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/src/assets/hero-sweets.jpg"
                alt="Our traditional sweet shop"
                className="rounded-2xl shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide us in everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 gradient-card shadow-elegant hover:shadow-warm transition-smooth">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Meet Our Master Chefs</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our team of expert confectioners brings decades of combined experience and 
            passion to every creation.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden gradient-card shadow-elegant hover:shadow-warm transition-smooth">
                <img
                  src={`/src/assets/customer-${i}.jpg`}
                  alt={`Chef ${i}`}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">Master Chef {i}</h3>
                  <p className="text-sm text-primary mb-2">Head Confectioner</p>
                  <p className="text-sm text-muted-foreground">
                    {20 + i * 5}+ years of experience in traditional sweet making
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
