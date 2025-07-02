import type { InvoiceData } from '@/types/invoice'

interface TemplateProps {
  data: InvoiceData
}

export default function MinimalTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white rounded p-8 max-w-4xl mx-auto border border-gray-200">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-2xl font-light text-gray-800">{data.companyName}</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Invoice</p>
            <p className="text-xl font-medium text-gray-800">{data.invoiceNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Bill To</p>
            <p className="text-gray-800 font-medium">{data.clientName}</p>
            <p className="text-gray-600 text-sm">123 Minimal Street</p>
            <p className="text-gray-600 text-sm">Clean City, CC 11111</p>
          </div>
          <div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Date</span>
                <span className="text-gray-800">{data.invoiceDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Due Date</span>
                <span className="text-gray-800">{data.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="grid grid-cols-4 gap-4 py-4 border-b border-gray-100">
            <span className="text-sm text-gray-500 uppercase tracking-wider">Description</span>
            <span className="text-sm text-gray-500 uppercase tracking-wider text-center">Qty</span>
            <span className="text-sm text-gray-500 uppercase tracking-wider text-center">Rate</span>
            <span className="text-sm text-gray-500 uppercase tracking-wider text-right">Amount</span>
          </div>
          <div className="grid grid-cols-4 gap-4 py-6">
            <span className="text-gray-800">Professional Services</span>
            <span className="text-gray-600 text-center">1</span>
            <span className="text-gray-600 text-center">₹{data.price.toFixed(2)}</span>
            <span className="text-gray-800 font-medium text-right">₹{data.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded mb-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span>₹{data.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">VAT ({data.vatPercentage}%):</span>
              <span>₹{data.vatAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GSTIN ({data.gstinPercentage}%):</span>
              <span>₹{data.gstinAmount.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between font-bold">
                <span>Total Amount:</span>
                <span>₹{data.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-bold">₹{data.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Paid Amount:</span>
              <span className="font-bold">₹{data.paidAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Balance Amount:</span>
              <span className="font-bold text-xl">₹{data.balanceAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
