import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-bold mb-4">Subscribe to Our Newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input 
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                required
              />
              <Button 
                type="submit" 
                variant="secondary"
                className="whitespace-nowrap"
              >
                Subscribe
              </Button>
            </form>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold mb-4">ABOUT</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/about" className="hover:underline">Story</Link></li>
              <li><Link to="/about" className="hover:underline">Our Team</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Get Help */}
          <div>
            <h3 className="font-bold mb-4">GET HELP</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">FAQ</Link></li>
              <li><Link to="/" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link to="/" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:underline">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="font-bold mb-4">GET IN TOUCH</h3>
            <ul className="space-y-2 text-sm">
              <li>📧 info@sweetshop.com</li>
              <li>📞 +91 98765 43210</li>
              <li className="flex gap-3 mt-4">
                <a href="#" className="hover:opacity-80">
                  <Facebook size={20} />
                </a>
                <a href="#" className="hover:opacity-80">
                  <Instagram size={20} />
                </a>
                <a href="#" className="hover:opacity-80">
                  <Twitter size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm">
          <p>Copyright © 2024 . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
