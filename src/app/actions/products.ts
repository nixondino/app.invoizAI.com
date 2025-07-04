'use server';

import { firestore } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
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

export async function getProducts(): Promise<Product[]> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    try {
        const productsCol = collection(firestore, 'products');
        const productSnapshot = await getDocs(productsCol);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        return productList.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error("Failed to fetch products from Firestore:", error);
        return [];
    }
}

export async function addProduct(data: ProductData): Promise<Product> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    const productsCol = collection(firestore, 'products');
    const docRef = await addDoc(productsCol, data);
    revalidatePath('/dashboard/products');
    return { id: docRef.id, ...data };
}

export async function updateProduct(data: Product): Promise<Product> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    const productDoc = doc(firestore, 'products', data.id);
    const { id, ...productData } = data;
    await updateDoc(productDoc, productData);
    revalidatePath('/dashboard/products');
    return data;
}

export async function deleteProduct(id: string): Promise<{ success: true, id: string }> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    const productDoc = doc(firestore, 'products', id);
    await deleteDoc(productDoc);
    revalidatePath('/dashboard/products');
    return { success: true, id };
}
