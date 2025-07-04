'use server';

import { firestore } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import type { TemplateType } from '@/types/invoice';

export interface Template {
  id: TemplateType;
  name: string;
  color: string;
}

const templatesToSeed: Template[] = [
    { id: 'modern', name: 'Modern', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'elegant', name: 'Elegant', color: 'bg-purple-500 hover:bg-purple-600' },
    { id: 'professional', name: 'Professional', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'minimal', name: 'Minimal', color: 'bg-gray-500 hover:bg-gray-600' },
    { id: 'vibrant', name: 'Vibrant', color: 'bg-orange-500 hover:bg-orange-600' },
    { id: 'corporate', name: 'Corporate', color: 'bg-indigo-500 hover:bg-indigo-600' },
];

export async function seedTemplates() {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    const templatesCollection = collection(firestore, 'templates');
    const batch = writeBatch(firestore);

    templatesToSeed.forEach((template) => {
        const docRef = doc(templatesCollection, template.id);
        batch.set(docRef, template);
    });

    await batch.commit();
    return { success: true, message: `${templatesToSeed.length} templates seeded successfully.` };
}

export async function getTemplates(): Promise<Template[]> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    const templatesCollection = collection(firestore, 'templates');
    const snapshot = await getDocs(templatesCollection);
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => doc.data() as Template);
}
