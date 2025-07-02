import type { InvoiceData } from '@/types/invoice'

interface TemplateProps {
  data: InvoiceData
}

export default function ModernTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">{data.companyName}</h1>
            <p className="text-gray-600 mt-2">Professional Services</p>
          </div>
          <div className="text-right">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              <span className="text-sm uppercase tracking-wide">Invoice</span>
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-2">{data.invoiceNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Bill To:</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium text-blue-800">{data.clientName}</p>
              <p className="text-blue-600">123 Client Street</p>
              <p className="text-blue-600">City, State 12345</p>
            </div>
          </div>
          <div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Invoice Date:</span>
                <span className="font-medium">{data.invoiceDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Due Date:</span>
                <span className="font-medium">{data.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-200 pt-6">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <div className="grid grid-cols-4 gap-4">
              <span className="font-semibold">Description</span>
              <span className="font-semibold text-center">Qty</span>
              <span className="font-semibold text-center">Rate</span>
              <span className="font-semibold text-right">Amount</span>
            </div>
          </div>
          <div className="bg-white border border-blue-200 p-4">
            <div className="grid grid-cols-4 gap-4 py-2">
              <span>Professional Services</span>
              <span className="text-center">1</span>
              <span className="text-center">₹{data.price.toFixed(2)}</span>
              <span className="text-right font-semibold">₹{data.price.toFixed(2)}</span>
            </div>
          </div>
          <div className="bg-blue-50 p-4">
            <div className="space-y-2">
                <div className="flex justify-end gap-4">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="w-24 text-right">₹{data.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-end gap-4">
                    <span className="text-gray-600">VAT ({data.vatPercentage}%):</span>
                    <span className="w-24 text-right">₹{data.vatAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-end gap-4">
                    <span className="text-gray-600">GSTIN ({data.gstinPercentage}%):</span>
                    <span className="w-24 text-right">₹{data.gstinAmount.toFixed(2)}</span>
                </div>
                <div className="border-t border-blue-200 pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount:</span>
                    <span className="text-blue-600">₹{data.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>
          </div>
          <div className="bg-blue-600 text-white p-4 rounded-b-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold">₹{data.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Paid Amount:</span>
                <span className="font-bold">₹{data.paidAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-yellow-200">
                <span>Balance Amount:</span>
                <span className="font-bold text-xl">₹{data.balanceAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
