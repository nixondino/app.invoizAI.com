import type { InvoiceData } from '@/types/invoice'

interface TemplateProps {
  data: InvoiceData
}

export default function VibrantTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 p-8">
      <div className="bg-white rounded-xl shadow-xl p-8 border-4 border-orange-300">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-xl mb-6">
            <h1 className="text-4xl font-bold">{data.companyName}</h1>
            <p className="text-orange-100 mt-2">Creative Solutions</p>
          </div>
          <div className="bg-yellow-400 text-orange-800 px-6 py-3 rounded-full inline-block">
            <span className="font-bold text-lg">INVOICE {data.invoiceNumber}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-200 to-red-200 p-6 rounded-xl">
            <h3 className="font-bold text-orange-800 mb-3 text-lg">Client Information</h3>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold text-orange-700">{data.clientName}</p>
              <p className="text-orange-600">456 Vibrant Ave</p>
              <p className="text-orange-600">Color City, VC 67890</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-200 to-orange-200 p-6 rounded-xl">
            <h3 className="font-bold text-orange-800 mb-3 text-lg">Invoice Details</h3>
            <div className="bg-white p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-orange-600">Date:</span>
                <span className="font-semibold text-orange-800">{data.invoiceDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-600">Due:</span>
                <span className="font-semibold text-orange-800">{data.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-t-xl">
            <div className="grid grid-cols-4 gap-4">
              <span className="font-bold">Service</span>
              <span className="font-bold text-center">Qty</span>
              <span className="font-bold text-center">Rate</span>
              <span className="font-bold text-right">Total</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 border-l-4 border-r-4 border-orange-300">
            <div className="grid grid-cols-4 gap-4 py-3">
              <span className="text-orange-800 font-medium">Creative Design Services</span>
              <span className="text-center text-orange-700">1</span>
              <span className="text-center text-orange-700">₹{data.price.toFixed(2)}</span>
              <span className="text-right font-bold text-orange-800">₹{data.price.toFixed(2)}</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 border-l-4 border-r-4 border-orange-300">
            <div className="ml-auto max-w-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-orange-700">Subtotal:</span>
                <span className="text-orange-800">₹{data.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-700">VAT ({data.vatPercentage}%):</span>
                <span className="text-orange-800">₹{data.vatAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-700">GSTIN ({data.gstinPercentage}%):</span>
                <span className="text-orange-800">₹{data.gstinAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-300 to-orange-400 p-6 rounded-b-xl">
            <div className="space-y-3">
              <div className="flex justify-between text-white">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold">₹{data.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-orange-100">
                <span>Paid Amount:</span>
                <span className="font-semibold">₹{data.paidAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-orange-100 border-t border-orange-200 pt-2">
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
