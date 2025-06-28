'use client'

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  inventory: number;
  tax: number;
};

const initialProducts: Product[] = [
  { id: "PROD001", name: "Premium Web Hosting", sku: "WH-PREM-YR", price: 8000.00, inventory: 1000, tax: 18.0 },
  { id: "PROD002", name: "Standard Domain Registration", sku: "DOM-STD-YR", price: 1200.00, inventory: 5000, tax: 0.0 },
  { id: "PROD003", name: "SSL Certificate", sku: "SSL-CERT-YR", price: 4000.00, inventory: 2500, tax: 12.0 },
  { id: "PROD004", name: "Cloud Storage (1TB)", sku: "CS-1TB-MO", price: 800.00, inventory: 10000, tax: 18.0 },
  { id: "PROD005", name: "Website Maintenance Plan", sku: "WEB-MAINT-MO", price: 6000.00, inventory: 500, tax: 18.0 },
];

const emptyProduct: Product = { id: "", name: "", sku: "", price: 0, inventory: 0, tax: 0 };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleOpenForm = (product: Product | null) => {
    setProductToEdit(product);
    setIsFormOpen(true);
  };

  const handleOpenAlert = (product: Product) => {
    setProductToDelete(product);
    setIsAlertOpen(true);
  };
  
  const handleSaveProduct = (formData: Product) => {
    if (productToEdit) {
      // Edit existing product
      setProducts(products.map(p => p.id === productToEdit.id ? { ...p, ...formData } : p));
      toast({ title: "Product Updated", description: `Product ${formData.name} has been updated.` });
    } else {
      // Add new product
      const newProduct = { ...formData, id: `PROD${String(Date.now()).slice(-4)}` };
      setProducts([...products, newProduct]);
      toast({ title: "Product Added", description: `Product ${formData.name} has been added.` });
    }
    setIsFormOpen(false);
    setProductToEdit(null);
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
      toast({ variant: "destructive", title: "Product Deleted", description: `Product ${productToDelete.name} has been deleted.` });
      setIsAlertOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
              <CardTitle>Products</CardTitle>
              <CardDescription>
                  Manage your products and their inventory.
              </CardDescription>
          </div>
          <Button size="sm" className="ml-auto gap-1" onClick={() => handleOpenForm(null)}>
              <PlusCircle className="h-4 w-4" />
              Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Tax (%)</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>₹{product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.inventory}</TableCell>
                  <TableCell>{product.tax.toFixed(1)}%</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleOpenForm(product)}>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleOpenAlert(product)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <ProductFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={productToEdit}
        onSave={handleSaveProduct}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product "{productToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

// Product Form Dialog Component
interface ProductFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  product: Product | null;
  onSave: (product: Product) => void;
}

function ProductFormDialog({ isOpen, onOpenChange, product, onSave }: ProductFormDialogProps) {
  const [formData, setFormData] = useState<Product>(product || emptyProduct);

  React.useEffect(() => {
    setFormData(product || emptyProduct);
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData(prev => ({ ...prev, [id]: type === 'number' ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
     <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {product ? "Update the details for this product." : "Fill in the details for your new product."}
          </DialogDescription>
        </DialogHeader>
        <form id="product-form" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sku" className="text-right">SKU</Label>
              <Input id="sku" value={formData.sku} onChange={handleChange} className="col-span-3" required />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price (₹)</Label>
              <Input id="price" type="number" value={formData.price} onChange={handleChange} className="col-span-3" required />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="inventory" className="text-right">Inventory</Label>
              <Input id="inventory" type="number" value={formData.inventory} onChange={handleChange} className="col-span-3" required />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tax" className="text-right">Tax (%)</Label>
              <Input id="tax" type="number" value={formData.tax} onChange={handleChange} className="col-span-3" required />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" form="product-form">Save Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
