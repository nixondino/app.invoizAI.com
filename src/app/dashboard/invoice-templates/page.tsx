'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const templates = [
  {
    name: "Modern",
    description: "A clean and professional design for any business.",
    image: "https://placehold.co/400x565.png",
    hint: "invoice modern",
  },
  {
    name: "Elegant",
    description: "A sophisticated and stylish layout with classic fonts.",
    fontClass: "font-elegant",
    image: "https://placehold.co/400x565.png",
    hint: "invoice elegant",
  },
  {
    name: "Professional",
    description: "A classic and corporate look, perfect for formal documents.",
    image: "https://placehold.co/400x565.png",
    hint: "invoice professional",
  },
  {
    name: "Minimal",
    description: "Simple, clean, and to the point for no-fuss invoicing.",
    image: "https://placehold.co/400x565.png",
    hint: "invoice minimal",
  },
  {
    name: "Vibrant",
    description: "A colorful and eye-catching design to make your brand pop.",
    image: "https://placehold.co/400x565.png",
    hint: "invoice vibrant",
  },
  {
    name: "Corporate",
    description: "A sharp and business-focused template for official use.",
    image: "https://placehold.co/400x565.png",
    hint: "invoice corporate",
  },
];

export default function InvoiceTemplatesPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Invoice Templates</h1>
        <p className="text-muted-foreground mt-2">Choose a template to start creating your invoice. Click on a template to begin.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div key={template.name} className="template-btn cursor-pointer group">
            <Card className="overflow-hidden h-full border-2 border-transparent group-hover:border-primary transition-colors duration-300">
               <CardHeader className="p-0">
                <Image 
                  src={template.image}
                  data-ai-hint={template.hint}
                  alt={`${template.name} invoice template`}
                  width={400}
                  height={565}
                  className="rounded-t-lg w-full"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className={`text-xl ${template.fontClass || ''}`}>{template.name}</CardTitle>
                <p className="text-muted-foreground mt-1 text-sm">{template.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
