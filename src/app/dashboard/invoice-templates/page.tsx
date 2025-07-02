'use client'

import { useState } from 'react'
import InvoiceForm from '@/components/InvoiceForm'
import InvoicePreview from '@/components/InvoicePreview'
import TemplateSelector from '@/components/TemplateSelector'
import type { InvoiceData, TemplateType } from '@/types/invoice'

export default function InvoiceTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern')
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    companyName: 'InvoicePilot Corp',
    invoiceNumber: 'INV-2024-001',
    clientName: 'Client Company',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    price: 1000.00,
    vatPercentage: 12,
    gstinPercentage: 18,
    paidAmount: 500.00,
    // Calculated fields are initialized here but recalculated in updateInvoiceData
    vatAmount: 120.00,
    gstinAmount: 180.00,
    subtotal: 1300.00,
    totalAmount: 1300.00,
    balanceAmount: 800.00
  })

  const updateInvoiceData = (data: Partial<InvoiceData>) => {
    setInvoiceData(prev => {
      const updated = { ...prev, ...data }
      
      // Recalculate amounts
      const vatAmount = (updated.price * updated.vatPercentage) / 100
      const gstinAmount = (updated.price * updated.gstinPercentage) / 100
      const subtotal = updated.price + vatAmount + gstinAmount
      const totalAmount = subtotal
      const balanceAmount = totalAmount - updated.paidAmount

      return {
        ...updated,
        vatAmount,
        gstinAmount,
        subtotal,
        totalAmount,
        balanceAmount
      }
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Invoice Templates</h1>
        <p className="text-muted-foreground mt-2">Choose a template, fill in the details, and see your invoice come to life.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
            <TemplateSelector 
                selectedTemplate={selectedTemplate}
                onTemplateSelect={setSelectedTemplate}
            />
            
            <InvoiceForm 
                invoiceData={invoiceData}
                onDataChange={updateInvoiceData}
            />
        </div>
        
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">Live Preview</h2>
            <div className="h-[800px] overflow-auto rounded-lg border shadow-lg">
                <InvoicePreview 
                    invoiceData={invoiceData}
                    template={selectedTemplate}
                />
            </div>
        </div>
      </div>
    </div>
  )
}
