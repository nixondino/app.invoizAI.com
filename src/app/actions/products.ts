'use server';

import { firestore } from '@/lib/firebase';
import { doc, getDoc, runTransaction, collection } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export interface Product {
    id: string;
    name: string;
    sku: string;
    price: number;
    inventory: number;
    tax: number;
}

export type ProductData = Omit<Product, 'id'>;

// As per your request, using a single document in the 'profile' collection to store products.
const PROFILE_DOC_ID = 'Naa70mv1rJxOhhv6chCS';
const profileDocRef = doc(firestore, 'profile', PROFILE_DOC_ID);

export async function getProducts(): Promise<Product[]> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    try {
        const docSnap = await getDoc(profileDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const productList = (data.products as Product[]) || [];
            return productList.sort((a, b) => a.name.localeCompare(b.name));
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch products from Firestore:", error);
        return [];
    }
}

export async function addProduct(data: ProductData): Promise<Product> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }

    // Generate a new unique ID for the product document.
    const newId = doc(collection(firestore, '_')).id;
    const newProduct: Product = { id: newId, ...data };

    try {
        await runTransaction(firestore, async (transaction) => {
            const profileDoc = await transaction.get(profileDocRef);
            if (!profileDoc.exists()) {
                transaction.set(profileDocRef, { products: [newProduct] });
            } else {
                const existingProducts = profileDoc.data().products || [];
                transaction.update(profileDocRef, { products: [...existingProducts, newProduct] });
            }
        });
    } catch (e) {
        console.error("Transaction failed: ", e);
        throw new Error("Failed to add product.");
    }

    revalidatePath('/dashboard/products');
    return newProduct;
}


export async function updateProduct(data: Product): Promise<Product> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    
    try {
        await runTransaction(firestore, async (transaction) => {
            const profileDoc = await transaction.get(profileDocRef);
            if (!profileDoc.exists()) {
                throw new Error("Profile document does not exist.");
            }
            
            const products = (profileDoc.data().products || []) as Product[];
            const productIndex = products.findIndex(p => p.id === data.id);

            if (productIndex > -1) {
                products[productIndex] = data;
                transaction.update(profileDocRef, { products });
            } else {
                throw new Error("Product not found for updating.");
            }
        });
    } catch(e) {
        console.error("Transaction failed: ", e);
        throw new Error("Failed to update product.");
    }
    
    revalidatePath('/dashboard/products');
    return data;
}

export async function deleteProduct(id: string): Promise<{ success: true, id: string }> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }

    try {
        await runTransaction(firestore, async (transaction) => {
            const profileDoc = await transaction.get(profileDocRef);
            if (!profileDoc.exists()) {
                 // Nothing to delete
                return;
            }
            
            const products = (profileDoc.data().products || []) as Product[];
            const updatedProducts = products.filter(p => p.id !== id);
            
            if (products.length === updatedProducts.length) {
                // Product not found, but we don't need to throw an error.
                // The result is the same: the product is not in the list.
            }

            transaction.update(profileDocRef, { products: updatedProducts });
        });
    } catch(e) {
        console.error("Transaction failed: ", e);
        throw new Error("Failed to delete product.");
    }
    
    revalidatePath('/dashboard/products');
    return { success: true, id };
}
