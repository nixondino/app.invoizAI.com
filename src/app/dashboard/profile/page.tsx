'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ProfilePage() {
    const { toast } = useToast();
    const [logo, setLogo] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
        maxFiles: 1,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Profile Saved",
            description: "Your company profile has been updated successfully.",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Company Profile</CardTitle>
                    <CardDescription>Update your company's information and branding.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" placeholder="Acme Inc." defaultValue="InvoicePilot Corp" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gstNumber">GST Number</Label>
                            <Input id="gstNumber" placeholder="22AAAAA0000A1Z5" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" placeholder="123 Main St, Anytown, USA" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="contactNumber">Contact Number</Label>
                            <Input id="contactNumber" type="tel" placeholder="+1 (555) 123-4567" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="supportNumber">Customer Support Number</Label>
                            <Input id="supportNumber" type="tel" placeholder="+1 (800) 555-0199" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Company Logo</Label>
                        <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${isDragActive ? 'border-primary bg-primary/10' : 'border-border'}`}>
                            <input {...getInputProps()} />
                             <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                            {logoPreview ? (
                                <div className="mt-4">
                                    <Image src={logoPreview} alt="Logo preview" width={100} height={100} className="mx-auto rounded-lg object-contain" />
                                    <p className="mt-2 text-sm text-muted-foreground">Click or drag to replace</p>
                                </div>
                            ) : (
                                <p className="mt-2 text-sm text-muted-foreground">Drag 'n' drop a logo here, or click to select a file</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Invoice Customization</CardTitle>
                    <CardDescription>Choose a template and set default tax rates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Invoice Template</Label>
                        <RadioGroup defaultValue="template-1" className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map(id => (
                                <div key={id}>
                                    <RadioGroupItem value={`template-${id}`} id={`template-${id}`} className="peer sr-only" />
                                    <Label htmlFor={`template-${id}`} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                        <Image src={`https://placehold.co/200x283.png`} data-ai-hint="invoice template" width={100} height={141} alt={`Template ${id}`} className="mb-2 rounded-sm" />
                                        Template {id}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <Separator />
                    <div className="space-y-2 max-w-xs">
                        <Label htmlFor="defaultTax">Default Tax Rate (%)</Label>
                        <Input id="defaultTax" type="number" placeholder="e.g., 8.25" step="0.01" />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
            </div>
        </form>
    );
}
