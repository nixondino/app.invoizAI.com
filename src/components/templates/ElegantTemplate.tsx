import type { InvoiceData } from '@/types/invoice'

interface TemplateProps {
  data: InvoiceData
}

export default function ElegantTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-purple-500">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-elegant text-purple-600 mb-2">{data.companyName}</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-4"></div>
          <p className="text-purple-500 uppercase tracking-widest text-sm">Invoice</p>
        </div>

        <div className="flex justify-between mb-8">
          <div className="bg-purple-50 p-6 rounded-lg flex-1 mr-4">
            <h3 className="font-semibold text-purple-700 mb-3">Invoice Details</h3>
            <p><span className="text-purple-600">Number:</span> {data.invoiceNumber}</p>
            <p><span className="text-purple-600">Date:</span> {data.invoiceDate}</p>
            <p><span className="text-purple-600">Due:</span> {data.dueDate}</p>
          </div>
          <div className="bg-pink-50 p-6 rounded-lg flex-1 ml-4">
            <h3 className="font-semibold text-purple-700 mb-3">Bill To</h3>
            <p className="font-medium text-purple-800">{data.clientName}</p>
            <p className="text-purple-600">123 Client Avenue</p>
            <p className="text-purple-600">City, State 12345</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-lg">
            <div className="grid grid-cols-4 gap-4">
              <span className="font-semibold">Service</span>
              <span className="font-semibold text-center">Hours</span>
              <span className="font-semibold text-center">Rate</span>
              <span className="font-semibold text-right">Total</span>
            </div>
          </div>
          <div className="bg-white border-l-4 border-r-4 border-purple-200 p-4">
            <div className="grid grid-cols-4 gap-4 py-3">
              <span className="text-gray-700">Consulting Services</span>
              <span className="text-center text-gray-600">1</span>
              <span className="text-center text-gray-600">₹{data.price.toFixed(2)}</span>
              <span className="text-right font-semibold text-purple-600">₹{data.price.toFixed(2)}</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-l-4 border-r-4 border-purple-200">
            <div className="space-y-2 text-right">
              <div className="flex justify-end gap-4">
                <span className="text-purple-600">Subtotal:</span>
                <span className="text-purple-800 w-24 text-right">₹{data.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-end gap-4">
                <span className="text-purple-600">VAT ({data.vatPercentage}%):</span>
                <span className="text-purple-800 w-24 text-right">₹{data.vatAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-end gap-4">
                <span className="text-purple-600">GSTIN ({data.gstinPercentage}%):</span>
                <span className="text-purple-800 w-24 text-right">₹{data.gstinAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-b-lg border-l-4 border-r-4 border-purple-200">
            <div className="space-y-3">
              <div className="flex justify-between text-purple-800">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold">₹{data.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-purple-700">
                <span>Paid Amount:</span>
                <span className="font-semibold">₹{data.paidAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-purple-600 border-t border-purple-300 pt-2">
                <span className="font-bold">Balance Amount:</span>
                <span className="text-xl font-bold">₹{data.balanceAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
