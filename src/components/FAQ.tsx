import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqImage from "@/assets/faq-sweets.jpg";

const FAQ = () => {
  const faqs = [
    {
      question: "What are your shop timings?",
      answer: "We are open 7 days a week from 9:00 AM to 9:00 PM. During festival seasons, we extend our hours to serve you better."
    },
    {
      question: "Do you offer home delivery?",
      answer: "Yes, we provide home delivery for orders above ₹500. Delivery is free for orders above ₹1000 within the city limits. We also offer same-day delivery for orders placed before 2 PM."
    },
    {
      question: "How fresh are your sweets?",
      answer: "All our sweets are prepared fresh daily using traditional recipes and the finest ingredients. We never use preservatives, ensuring you get authentic taste and quality."
    },
    {
      question: "Can I place bulk orders for events?",
      answer: "Absolutely! We specialize in bulk orders for weddings, parties, and corporate events. Please contact us at least 2 days in advance for large orders to ensure availability."
    },
    {
      question: "Do you have sugar-free options?",
      answer: "Yes, we offer a variety of sugar-free sweets made with natural sweeteners, perfect for those managing their sugar intake without compromising on taste."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, all major credit/debit cards, UPI payments, and digital wallets. Online payment options are also available for delivery orders."
    }
  ];

  return (
    <section className="py-16 px-4 border-t-2 border-dashed border-primary/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden h-fit">
            <img 
              src={faqImage} 
              alt="Traditional sweets display"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
