'use server';

import { firestore } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export interface CompanyProfile {
    companyName?: string;
    gstNumber?: string;
    address?: string;
    contactNumber?: string;
    supportNumber?: string;
    logoUrl?: string;
    defaultTax?: number;
}

const PROFILE_DOC_ID = 'Naa70mv1rJxOhhv6chCS';
const profileDocRef = doc(firestore, 'profile', PROFILE_DOC_ID);

export async function getProfile(): Promise<CompanyProfile | null> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    try {
        const docSnap = await getDoc(profileDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            // Manually construct a plain Javascript object to ensure it's serializable.
            // This prevents errors when passing data from Server Components to Client Components,
            // as complex Firestore types (like GeoPoint or Timestamp) are not supported.
            const plainProfile: CompanyProfile = {
                companyName: data.companyName || '',
                gstNumber: data.gstNumber || '',
                address: data.address || '',
                contactNumber: data.contactNumber || '',
                supportNumber: data.supportNumber || '',
                logoUrl: data.logoUrl || '',
                defaultTax: data.defaultTax || 0,
            };
            return plainProfile;
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch profile from Firestore:", error);
        return null;
    }
}

export async function updateProfile(data: CompanyProfile): Promise<{ success: boolean; message: string }> {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }
    
    try {
        await setDoc(profileDocRef, data, { merge: true });
        revalidatePath('/dashboard/profile');
        return { success: true, message: "Profile updated successfully." };
    } catch (e) {
        console.error("Failed to update profile:", e);
        const typedError = e as any;
        return { success: false, message: typedError.message || "Failed to update profile." };
    }
}
