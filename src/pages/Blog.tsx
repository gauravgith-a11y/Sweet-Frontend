import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Making Perfect Barfi",
      excerpt: "Discover the secrets behind creating the perfect texture and taste in traditional barfi. Learn the techniques passed down through generations.",
      image: "/src/assets/article-barfi.jpg",
      category: "Recipes",
      date: "March 15, 2024",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Health Benefits of Traditional Indian Sweets",
      excerpt: "While moderation is key, traditional sweets made with natural ingredients offer surprising health benefits you should know about.",
      image: "/src/assets/article-peda.jpg",
      category: "Health",
      date: "March 10, 2024",
      readTime: "4 min read",
    },
    {
      id: 3,
      title: "Festival Special: Diwali Sweets Guide",
      excerpt: "Complete guide to choosing and serving the perfect sweets for your Diwali celebrations. Make your festival memorable.",
      image: "/src/assets/article-sandesh.jpg",
      category: "Festivals",
      date: "March 5, 2024",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Preserving Sweet Traditions in Modern Times",
      excerpt: "How we're keeping traditional recipes alive while adapting to contemporary tastes and dietary preferences.",
      image: "/src/assets/kaju-katli.jpg",
      category: "Culture",
      date: "February 28, 2024",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "The Science Behind Sweet Making",
      excerpt: "Understanding the chemistry and physics that goes into creating perfect sweets. Temperature, timing, and technique explained.",
      image: "/src/assets/gulab-jamun.jpg",
      category: "Education",
      date: "February 20, 2024",
      readTime: "8 min read",
    },
    {
      id: 6,
      title: "Gifting Guide: Sweets for Every Occasion",
      excerpt: "From weddings to corporate events, learn how to choose the perfect sweet gifts that leave a lasting impression.",
      image: "/src/assets/product-chocolate-barfi.jpg",
      category: "Gifting",
      date: "February 15, 2024",
      readTime: "5 min read",
    },
  ];

  const categories = ["All", "Recipes", "Health", "Festivals", "Culture", "Education", "Gifting"];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">Our Blog</Badge>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Sweet Stories & <span className="text-primary">Insights</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore recipes, traditions, and the sweet stories behind our craft
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <Badge className="mb-4">Featured</Badge>
          <Card className="overflow-hidden gradient-card shadow-elegant">
            <div className="grid md:grid-cols-2 gap-8">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover"
              />
              <div className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4" variant="secondary">
                  {blogPosts[0].category}
                </Badge>
                <h2 className="text-3xl font-display font-bold mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <Button className="w-fit gap-2">
                  Read Article <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12">Recent Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden gradient-card shadow-elegant hover:shadow-warm transition-smooth group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                </div>
                <div className="p-6">
                  <Badge className="mb-3" variant="secondary">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <Button variant="ghost" className="gap-2 p-0 h-auto">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-muted-foreground mb-8">
            Get the latest recipes, stories, and special offers delivered to your inbox
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
