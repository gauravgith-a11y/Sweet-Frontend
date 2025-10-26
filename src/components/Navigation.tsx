import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Menu, Search, X, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import radhaKrishna from "../assets/newRadhaKrishnaLogo.svg";

const Navigation = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/categories?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex-shrink-0">
            <Link to="/" className="inline-block">
              <h1 className="text-2xl font-bold text-primary w-12">
                <img
                  src={radhaKrishna}
                  alt="Radha Krishna"
                  className="h-[50px] w-auto max-w-none cursor-pointer"
                />
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-smooth">Home</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-smooth">About Us</Link>
            <Link to="/categories" className="text-foreground hover:text-primary transition-smooth">Categories</Link>
            <Link to="/blog" className="text-foreground hover:text-primary transition-smooth">Blog</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-smooth">Contact Us</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {!showSearch ? (
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
                <Search className="h-5 w-5" />
              </Button>
            ) : (
              <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-48"
                  autoFocus
                />
                <Button type="submit" size="icon" variant="ghost">
                  <Search className="h-5 w-5" />
                </Button>
                <Button type="button" size="icon" variant="ghost" onClick={() => setShowSearch(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </form>
            )}

            <Link to="/checkout">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    variant="destructive"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Hi, {user?.name}</span>
                {localStorage.getItem("isAdmin") === "true" && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm">Admin</Button>
                  </Link>
                )}
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )} */}


            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Hi, {user?.name}</span>

                {/* Payment Link */}
                <Link to="/payment">
                  <Button variant="ghost" size="sm">Payment</Button>
                </Link>

                {localStorage.getItem("isAdmin") === "true" && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm">Admin</Button>
                  </Link>
                )}
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}


            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-6 mt-8">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                    />
                    <Button type="submit" size="icon">
                      <Search className="h-5 w-5" />
                    </Button>
                  </form>

                  <div className="flex flex-col space-y-4">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Home</Link>
                    <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">About Us</Link>
                    <Link to="/categories" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Categories</Link>
                    <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Blog</Link>
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Contact Us</Link>
                    
                    {isAuthenticated ? (
                      <>
                        <div className="text-sm text-muted-foreground pt-4">Logged in as {user?.name}</div>
                        {localStorage.getItem("isAdmin") === "true" && (
                          <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">
                            Admin Panel
                          </Link>
                        )}
                        <Button variant="outline" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                          <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="outline" className="w-full">Login</Button>
                        </Link>
                        <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                          <Button className="w-full">Sign Up</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
