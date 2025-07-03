'use client'

import React, { useState, useEffect, useCallback } from "react"
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
import { MoreHorizontal, PlusCircle, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@prisma/client"
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/app/actions/products"


const emptyProduct: Omit<Product, 'id'> = { name: "", sku: "", price: 0, inventory: 0, tax: 0 };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Failed to fetch products",
            description: "There was an error loading the products.",
        });
    } finally {
        setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [fetchProducts]);

  const handleOpenForm = (product: Product | null) => {
    setProductToEdit(product);
    setIsFormOpen(true);
  };

  const handleOpenAlert = (product: Product) => {
    setProductToDelete(product);
    setIsAlertOpen(true);
  };
  
  const handleSaveProduct = async (formData: Omit<Product, 'id'> | Product) => {
    setIsSaving(true);
    try {
        if ('id' in formData && formData.id) {
            await updateProduct(formData as Product);
            toast({ title: "Product Updated", description: `Product ${formData.name} has been updated.` });
        } else {
            await addProduct(formData as Omit<Product, 'id'>);
            toast({ title: "Product Added", description: `Product ${formData.name} has been added.` });
        }
        await fetchProducts();
        setIsFormOpen(false);
        setProductToEdit(null);
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Failed to save product",
            description: error.message || "An unexpected error occurred.",
        });
    } finally {
        setIsSaving(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (productToDelete && productToDelete.id) {
        try {
            await deleteProduct(productToDelete.id);
            toast({ variant: "destructive", title: "Product Deleted", description: `Product ${productToDelete.name} has been deleted.` });
            await fetchProducts();
        } catch (error: any) {
             toast({
                variant: "destructive",
                title: "Failed to delete product",
                description: error.message || "An unexpected error occurred.",
            });
        } finally {
            setIsAlertOpen(false);
            setProductToDelete(null);
        }
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
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : (
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
            )}
        </CardContent>
      </Card>
      
      <ProductFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={productToEdit}
        onSave={handleSaveProduct}
        isSaving={isSaving}
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
  onSave: (product: Omit<Product, 'id'> | Product) => Promise<void>;
  isSaving: boolean;
}

function ProductFormDialog({ isOpen, onOpenChange, product, onSave, isSaving }: ProductFormDialogProps) {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(emptyProduct);

  React.useEffect(() => {
    if (isOpen) {
        if (product) {
            const { id, ...dataToEdit } = product;
            setFormData(dataToEdit);
        } else {
            setFormData(emptyProduct);
        }
    }
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData(prev => ({ ...prev, [id]: type === 'number' ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = product ? { ...formData, id: product.id } : formData;
    await onSave(dataToSave);
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
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>Cancel</Button>
          <Button type="submit" form="product-form" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
