'use server';

import { firestore } from '@/lib/firebase';
import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy
} from 'firebase/firestore';
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

const productsCollectionRef = collection(firestore, 'products');

export async function getProducts(): Promise<Product[]> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    try {
        const q = query(productsCollectionRef, orderBy("name"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    } catch (error) {
        console.error("Failed to fetch products from Firestore:", error);
        return [];
    }
}

export async function addProduct(data: ProductData): Promise<Product> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    try {
        const docRef = await addDoc(productsCollectionRef, data);
        revalidatePath('/dashboard/products');
        return { id: docRef.id, ...data };
    } catch (e) {
        console.error("Failed to add product:", e);
        throw new Error("Failed to add product.");
    }
}

export async function updateProduct(data: Product): Promise<Product> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    const { id, ...productData } = data;
    const productDoc = doc(firestore, 'products', id);
    try {
        await updateDoc(productDoc, productData);
    } catch (e) {
        console.error("Failed to update product:", e);
        throw new Error("Failed to update product.");
    }
    revalidatePath('/dashboard/products');
    return data;
}

export async function deleteProduct(id: string): Promise<{ success: true, id: string }> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    const productDoc = doc(firestore, 'products', id);
    try {
        await deleteDoc(productDoc);
    } catch (e) {
        console.error("Failed to delete product:", e);
        throw new Error("Failed to delete product.");
    }
    revalidatePath('/dashboard/products');
    return { success: true, id };
}
