import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import articleBarfi from "@/assets/article-barfi.jpg";
import articleSandesh from "@/assets/article-sandesh.jpg";
import articlePeda from "@/assets/article-peda.jpg";

const ArticlesResources = () => {
  const articles = [
    {
      image: articleBarfi,
      title: "Premium Kaju Barfi Collection",
      description: "Indulge in our signature Kaju Barfi, crafted with pure cashews and traditional methods. A melt-in-mouth experience that celebrates authentic Indian sweetness.",
      price: "₹299/250g - ₹1099/1kg"
    },
    {
      image: articleSandesh,
      title: "Bengali Sandesh Delights",
      description: "Experience the authentic taste of Bengal with our handcrafted Sandesh. Made fresh daily with cottage cheese and subtle flavors, perfect for any celebration.",
      price: "₹199/250g - ₹699/1kg"
    },
    {
      image: articlePeda,
      title: "Traditional Milk Peda",
      description: "Our classic Milk Peda made with pure milk and cardamom. A timeless favorite that brings the taste of tradition to every bite.",
      price: "₹149/250g - ₹499/1kg"
    }
  ];

  return (
    <section className="py-16 px-4 border-t-2 border-b-2 border-dashed border-primary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Articles & Resources</h2>
          <span className="text-sm text-muted-foreground">September 13, 2024</span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card key={index} className="overflow-hidden group">
              <div className="aspect-square overflow-hidden p-4">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {article.description}
                </p>
                <p className="font-semibold text-primary mb-4">{article.price}</p>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesResources;
