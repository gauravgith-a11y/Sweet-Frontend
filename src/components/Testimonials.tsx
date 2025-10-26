import customer1 from "@/assets/customer-1.jpg";
import customer2 from "@/assets/customer-2.jpg";
import customer3 from "@/assets/customer-3.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      image: customer1,
      name: "Rajesh M.",
      text: "The quality of sweets is exceptional! Every bite reminds me of my grandmother's homemade recipes. I order from here for all family celebrations now."
    },
    {
      image: customer2,
      name: "Priya S.",
      text: "Best Kaju Katli I've ever tasted! The freshness and authentic taste are unmatched. Their delivery is always on time and packaging is excellent."
    },
    {
      image: customer3,
      name: "Kavita R.",
      text: "Amazing variety and authentic flavors! I've tried almost everything on the menu and haven't been disappointed once. Highly recommended for traditional sweets lovers."
    }
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground mb-2">@ HAPPYSWEETS</p>
          <h2 className="text-3xl font-bold mb-8">Happy Customers</h2>
        </div>
        
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Our customers are at the heart of everything we do. We take pride in creating authentic Indian sweets that bring joy to thousands of families. 
          Here's what some of our valued customers have to say about their experience with our traditional delicacies and service.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-muted-foreground mb-2">{testimonial.text}</p>
              <p className="font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
