import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { CheckCircle } from "lucide-react";

const features = [
  "AI-Powered Invoice Generation",
  "Automated Profile Onboarding",
  "Downloadable PDF Invoices",
  "Secure User Authentication",
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grid min-h-screen w-full lg:grid-cols-2">
      <div className="hidden bg-muted lg:flex lg:flex-col justify-between p-12">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Streamline Your Invoicing with AI</h2>
            <p className="text-muted-foreground">
              InvoicePilot makes creating and managing professional invoices effortless. Let our AI assistant guide you.
            </p>
            <div className="space-y-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <TestimonialsCarousel />
      </div>
      <div className="flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </main>
  )
}
