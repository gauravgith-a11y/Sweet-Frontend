// Admin.tsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminDashboard from "@/components/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Product, Category } from "@/data/products";

const API_BASE = "http://127.0.0.1:8000/api";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  // data
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // product image handling (single image)
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);

  // category image handling (single image)
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState<string | null>(null);

  // editing state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const productFormRef = useRef<HTMLFormElement>(null);
  const categoryFormRef = useRef<HTMLFormElement>(null);

  // auth + initial fetch
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (user?.role?.toLowerCase() !== "admin") {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    fetchCategories();
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  // when editing product, set selectedCategory & preview
  useEffect(() => {
    if (editingProduct) {
      setSelectedCategory(
        editingProduct.category_id?.toString() || editingProduct.category?.id?.toString() || ""
      );
      if (editingProduct.image) {
        // show existing stored image as preview (not a base64, but okay for display)
        setProductImagePreview(`http://127.0.0.1:8000/storage/products/${editingProduct.image}`);
      } else {
        setProductImagePreview(null);
      }
      setProductImage(null); // no new file yet
    } else {
      setSelectedCategory("");
      setProductImagePreview(null);
      setProductImage(null);
    }
  }, [editingProduct]);

  // when editing category, set preview
  useEffect(() => {
    if (editingCategory) {
      if (editingCategory.image) {
        setCategoryImagePreview(`http://127.0.0.1:8000/storage/categories/${editingCategory.image}`);
      } else {
        setCategoryImagePreview(null);
      }
      setCategoryImage(null);
    } else {
      setCategoryImagePreview(null);
      setCategoryImage(null);
    }
  }, [editingCategory]);

  // fetch helpers
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/category/`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data || []);
    } catch (err: any) {
      toast({ title: "Failed to load categories", description: err.message, variant: "destructive" });
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/product/`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch products");
      setProducts(data.products || []);
    } catch (err: any) {
      toast({ title: "Failed to load products", description: err.message, variant: "destructive" });
    }
  };

  // product image change (single)
  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setProductImage(f);
    if (!f) {
      setProductImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setProductImagePreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  // category image change (single)
  const handleCategoryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setCategoryImage(f);
    if (!f) {
      setCategoryImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setCategoryImagePreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  // product submit (create/update) with single image handling
  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (categories.length === 0) {
      toast({ title: "No categories available", description: "Please add a category first.", variant: "destructive" });
      return;
    }

    const formData = new FormData(e.currentTarget);
    // ensure controlled category is sent
    formData.set("category_id", selectedCategory);

    // append single image if user selected one
    if (productImage) formData.append("image", productImage);

    // If editing and backend expects _method override, use PUT — adjust if your backend needs POST+_method
    const url = editingProduct
      ? `${API_BASE}/product/update/${editingProduct.id}`
      : `${API_BASE}/product/store`;

    // do not set content-type: browser sets multipart/form-data with boundary
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save product");

      toast({ title: editingProduct ? "Product updated successfully" : "Product added successfully" });
      setEditingProduct(null);
      setProductImage(null);
      setProductImagePreview(null);
      setSelectedCategory("");
      productFormRef.current?.reset();
      fetchProducts();
    } catch (err: any) {
      toast({ title: "Failed to save product", description: err.message, variant: "destructive" });
    }
  };

  // delete product
  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_BASE}/product/delete/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete product");
      toast({ title: "Product deleted successfully" });
      fetchProducts();
    } catch (err: any) {
      toast({ title: "Failed to delete product", description: err.message, variant: "destructive" });
    }
  };

  // category create/update
  const handleCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim();
    if (!name) return;

    const duplicate = categories.some(
      (c) => c.name.toLowerCase() === name.toLowerCase() && c.id !== editingCategory?.id
    );
    if (duplicate) {
      toast({ title: "Duplicate Category", description: `Category "${name}" already exists.`, variant: "destructive" });
      return;
    }

    // append image if selected
    if (categoryImage) formData.append("image", categoryImage);

    const url = editingCategory
      ? `${API_BASE}/category/update/${editingCategory.id}`
      : `${API_BASE}/category/store`;

    try {
      const res = await fetch(url, { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save category");
      toast({ title: editingCategory ? "Category updated" : "Category added" });
      setEditingCategory(null);
      setCategoryImage(null);
      setCategoryImagePreview(null);
      categoryFormRef.current?.reset();
      fetchCategories();
    } catch (err: any) {
      toast({ title: "Failed to save category", description: err.message, variant: "destructive" });
    }
  };

  // delete category
  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`${API_BASE}/category/delete/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete category");
      toast({ title: "Category deleted" });
      fetchCategories();
    } catch (err: any) {
      toast({ title: "Failed to delete category", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

          <Tabs defaultValue="dashboard" className="space-y-8">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="products" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    ref={productFormRef}
                    onSubmit={handleProductSubmit}
                    className="space-y-4"
                    encType="multipart/form-data"
                  >
                    <div>
                      <Label htmlFor="name">Product Name</Label>
                      <Input id="name" name="name" defaultValue={editingProduct?.name} required />
                    </div>

                    <div>
                      <Label htmlFor="category_id">Select Category</Label>
                      <select
                        id="category_id"
                        name="category_id"
                        className="w-full border rounded-md p-2"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                      >
                        <option value="">-- Select Category --</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input id="price" name="price" type="number" defaultValue={editingProduct?.price} required />
                      </div>

                      <div>
                        <Label htmlFor="rating">Rating (1–5)</Label>
                        <Input
                          id="rating"
                          name="rating"
                          type="number"
                          min="1"
                          max="5"
                          defaultValue={editingProduct?.rating || ""}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="image">Upload Image</Label>
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleProductImageChange}
                      />
                      {productImagePreview && (
                        <img src={productImagePreview} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded" />
                      )}
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" name="description" defaultValue={editingProduct?.description || ""} />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">
                        <Plus className="mr-2 h-4 w-4" />
                        {editingProduct ? "Update Product" : "Add Product"}
                      </Button>
                      {editingProduct && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingProduct(null);
                            setSelectedCategory("");
                            setProductImage(null);
                            setProductImagePreview(null);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category?.name || "N/A"}</TableCell>
                          <TableCell>₹{product.price}</TableCell>
                          <TableCell>{product.rating || "—"}</TableCell>
                          <TableCell>
                            {product.image ? (
                              <img
                                src={`http://127.0.0.1:8000/storage/products/${product.image}`}
                                // alt={product.name}
                                className="h-12 w-12 rounded object-cover"
                              />
                            ) : (
                              "—"
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => setEditingProduct(product)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteProduct(product.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{editingCategory ? "Edit Category" : "Add New Category"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form ref={categoryFormRef} onSubmit={handleCategorySubmit} className="space-y-4" encType="multipart/form-data">
                    <div>
                      <Label htmlFor="cat-name">Category Name</Label>
                      <Input id="cat-name" name="name" defaultValue={editingCategory?.name} required />
                    </div>

                    <div>
                      <Label htmlFor="cat-image">Upload Image</Label>
                      <Input id="cat-image" name="image" type="file" accept="image/*" onChange={handleCategoryImageChange} />
                      {categoryImagePreview && (
                        <img src={categoryImagePreview} alt="Cat Preview" className="mt-2 h-16 w-16 object-cover rounded" />
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">
                        <Plus className="mr-2 h-4 w-4" />
                        {editingCategory ? "Update Category" : "Add Category"}
                      </Button>
                      {editingCategory && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingCategory(null);
                            setCategoryImage(null);
                            setCategoryImagePreview(null);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {categories.map((cat) => (
                        <TableRow key={cat.id}>
                          <TableCell>{cat.id}</TableCell>
                          <TableCell>{cat.name}</TableCell>
                          <TableCell>
                            {cat.image && (
                              <img
                                src={`http://127.0.0.1:8000/storage/categories/${cat.image}`}
                                alt={cat.name}
                                className="h-12 w-12 object-cover rounded"
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => setEditingCategory(cat)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteCategory(cat.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
