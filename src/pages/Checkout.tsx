import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Link } from "react-router-dom";

const checkoutSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(15),
  address: z.string().trim().min(10, "Address is required").max(500),
  city: z.string().trim().min(1, "City is required").max(100),
  pincode: z.string().trim().min(6, "Invalid pincode").max(6),
});


const Checkout = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { user, isAuthenticated } = useAuth();
  // console.log("isAuthenticated value:", isAuthenticated);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" }, replace: true });
    }
  }, [isAuthenticated, navigate]);


  // const handleCheckout = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (items.length === 0) {
  //     toast.error("Your cart is empty!");
  //     return;
  //   }

  //   try {
  //     checkoutSchema.parse(formData);
  //     setErrors({});

  //     const payload = {
  //       user_id: 1, // 👈 Replace with actual logged-in user ID from auth context
  //       ...formData,
  //       cart_items: items.map(item => ({
  //         id: item.id,
  //         quantity: item.quantity,
  //         price: item.price
  //       })),
  //       total_amount: getTotalPrice() + 50 + Math.round(getTotalPrice() * 0.05)
  //     };

  //     const res = await fetch("http://127.0.0.1:8000/api/delivery", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       toast.success("Order placed successfully!");
  //       clearCart();
  //       // navigate("/payment", { state: { orderId: data.delivery.id, amount: payload.total_amount } });
  //       navigate(`/payment/${data.delivery.id}`);
  //     } else {
  //       toast.error(data.message || "Failed to place order");
  //     }

  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       const newErrors: Record<string, string> = {};
  //       error.errors.forEach((err) => {
  //         if (err.path[0]) {
  //           newErrors[err.path[0].toString()] = err.message;
  //         }
  //       });
  //       setErrors(newErrors);
  //       toast.error("Please fill in all required fields correctly");
  //     }
  //   }
  // };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      checkoutSchema.parse(formData);
      setErrors({});

      const payload = {
        user_id: user?.id, // use actual logged-in user ID
        ...formData,
        cart_items: items.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total_amount: getTotalPrice() + 50 + Math.round(getTotalPrice() * 0.05)
      };

      const res = await fetch("http://127.0.0.1:8000/api/delivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Order placed successfully!");
        clearCart();
        navigate(`/payment/${data.delivery.id}`);
      } else {
        toast.error(data.message || "Failed to place order");
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("Please fill in all required fields correctly");
      }
    }
  };



  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-4xl font-display font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any sweets to your cart yet.
            </p>
            <Link to="/categories">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-12">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 gradient-card shadow-elegant">
                <h2 className="text-2xl font-semibold mb-6">Your Order</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id}>
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {item.category?.name || "Uncategorized"}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <p className="text-lg font-semibold text-primary">
                              ₹{item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Delivery Details Form */}
              <Card className="p-6 gradient-card shadow-elegant">
                <h2 className="text-2xl font-semibold mb-6">Delivery Details</h2>
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Delivery Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street address, apartment, etc."
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        City <span className="text-destructive">*</span>
                      </label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Mumbai"
                        className={errors.city ? "border-destructive" : ""}
                      />
                      {errors.city && (
                        <p className="text-sm text-destructive mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Pincode <span className="text-destructive">*</span>
                      </label>
                      <Input
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="400001"
                        className={errors.pincode ? "border-destructive" : ""}
                      />
                      {errors.pincode && (
                        <p className="text-sm text-destructive mt-1">{errors.pincode}</p>
                      )}
                    </div>
                  </div>
                </form>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 gradient-card shadow-elegant sticky top-24">
                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium">₹50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span className="font-medium">₹{Math.round(getTotalPrice() * 0.05)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      ₹{getTotalPrice() + 50 + Math.round(getTotalPrice() * 0.05)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                >
                  Place Order
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By placing this order, you agree to our terms and conditions
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
