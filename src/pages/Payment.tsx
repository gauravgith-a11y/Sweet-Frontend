// pages/Payment.tsx (replace)
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface Delivery {
    id: number;
    total_amount: number;
    status: string;
    created_at: string;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

const Payment = () => {
    const { user } = useAuth();
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        fetch(`http://127.0.0.1:8000/api/delivery/pending?user_id=${user.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.deliveries && data.deliveries.length > 0) {
                    setDeliveries(data.deliveries);
                } else {
                    setDeliveries([]);
                    toast.error("No pending orders found.");
                }
            })
            .catch(() => toast.error("Failed to fetch orders"))
            .finally(() => setLoading(false));
    }, [user]);

    const handleRazorpayPayment = async (deliveryId: number) => {
        try {
            // Create Razorpay order on backend
            const res = await fetch(
                `http://127.0.0.1:8000/api/delivery/razorpay/${deliveryId}?user_id=${user?.id}`,
                { method: "POST" }
            );
            const data = await res.json();

            if (!res.ok || !data.success) {
                toast.error(data.message || "Failed to create Razorpay order");
                return;
            }

            const options = {
                key: data.key,
                amount: data.amount, // already in paise from backend
                currency: data.currency,
                name: "Your Shop Name",
                description: `Payment for Order #${deliveryId}`,
                order_id: data.order_id, // backend returns order_id
                handler: async function (response: any) {
                    try {
                        // send signature to backend for verification & update
                        const verifyRes = await fetch(
                            `http://127.0.0.1:8000/api/delivery/pay/${deliveryId}?user_id=${user?.id}`,
                            {
                                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                })
                            },
                        );
                        const verifyData = await verifyRes.json();

                        if (verifyRes.ok && verifyData.success) {
                            toast.success("Payment successful!");
                            setDeliveries((prev) => prev.filter((d) => d.id !== deliveryId));
                        } else {
                            toast.error(verifyData.message || "Payment verification failed");
                        }
                    } catch (err) {
                        console.error(err);
                        toast.error("Payment verification error");
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                },
                theme: { color: "#4f46e5" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            toast.error("Payment failed");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen">
            <Navigation />
            <div className="pt-32 pb-16 px-4 max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Pending Orders</h1>

                {deliveries.length === 0 && <p>No pending orders.</p>}

                {deliveries.map((delivery) => (
                    <Card key={delivery.id} className="p-6 shadow-elegant space-y-4 mb-4">
                        <div className="flex justify-between">
                            <span>Order ID:</span>
                            <span>#{delivery.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Amount:</span>
                            <span>₹{delivery.total_amount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Status:</span>
                            <span>{delivery.status}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Created At:</span>
                            <span>{new Date(delivery.created_at).toLocaleString()}</span>
                        </div>
                        <Separator />
                        <Button
                            onClick={() => handleRazorpayPayment(delivery.id)}
                            size="lg"
                            className="w-full"
                        >
                            Pay Now
                        </Button>
                    </Card>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Payment;
