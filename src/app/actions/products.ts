'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import type { Product } from '@prisma/client';

export async function getProducts(): Promise<Product[]> {
    return await prisma.product.findMany({
        orderBy: { name: 'asc' }
    });
}

export async function addProduct(data: Omit<Product, 'id'>): Promise<Product> {
    const newProduct = await prisma.product.create({
        data: {
            name: data.name,
            sku: data.sku,
            price: data.price,
            inventory: data.inventory,
            tax: data.tax,
        },
    });
    revalidatePath('/dashboard/products');
    return newProduct;
}

export async function updateProduct(data: Product): Promise<Product> {
    const updatedProduct = await prisma.product.update({
        where: { id: data.id },
        data: {
            name: data.name,
            sku: data.sku,
            price: data.price,
            inventory: data.inventory,
            tax: data.tax,
        },
    });
    revalidatePath('/dashboard/products');
    return updatedProduct;
}

export async function deleteProduct(id: string): Promise<Product> {
    const deletedProduct = await prisma.product.delete({
        where: { id },
    });
    revalidatePath('/dashboard/products');
    return deletedProduct;
}
