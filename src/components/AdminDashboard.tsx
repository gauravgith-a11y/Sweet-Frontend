import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Grid3x3, ShoppingCart, Users } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    productCount: 0,
    categoryCount: 0,
    orderCount: 0,
    customerCount: 0,
  });

  // Fetch dashboard statistics
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard-stats")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          productCount: data.productCount || 0,
          categoryCount: data.categoryCount || 0,
          orderCount: data.orderCount || 0,
          customerCount: data.customerCount || 0,
        });
      })
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  const cards = [
    { title: "Total Products", value: stats.productCount, icon: Package, color: "text-blue-500" },
    { title: "Categories", value: stats.categoryCount, icon: Grid3x3, color: "text-green-500" },
    { title: "Orders", value: stats.orderCount, icon: ShoppingCart, color: "text-orange-500" },
    { title: "Customers", value: stats.customerCount, icon: Users, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome back, Admin! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New order received</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Product added: Kaju Katli</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New customer registered</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                <p className="font-medium">Add New Product</p>
                <p className="text-xs text-muted-foreground">Create a new product listing</p>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                <p className="font-medium">Manage Categories</p>
                <p className="text-xs text-muted-foreground">Update category structure</p>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                <p className="font-medium">View Orders</p>
                <p className="text-xs text-muted-foreground">Check pending orders</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
