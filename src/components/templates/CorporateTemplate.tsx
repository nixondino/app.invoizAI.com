import type { InvoiceData } from '@/types/invoice'

interface TemplateProps {
  data: InvoiceData
}

export default function CorporateTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="border-l-8 border-indigo-600 pl-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-indigo-800">{data.companyName}</h1>
              <p className="text-indigo-600 font-medium">Corporate Services Division</p>
            </div>
            <div className="bg-indigo-600 text-white p-4 rounded">
              <p className="text-sm font-semibold">INVOICE</p>
              <p className="text-xl font-bold">{data.invoiceNumber}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4">
              <h3 className="font-semibold text-indigo-800 mb-3">Billing Address</h3>
              <p className="font-medium text-indigo-700">{data.clientName}</p>
              <p className="text-indigo-600">789 Corporate Plaza</p>
              <p className="text-indigo-600">Suite 100</p>
              <p className="text-indigo-600">Business District, BD 13579</p>
            </div>
          </div>
          <div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h3 className="font-semibold text-indigo-800 mb-3">Payment Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-indigo-600">Invoice Date:</span>
                  <span className="font-semibold text-indigo-800">{data.invoiceDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-600">Payment Due:</span>
                  <span className="font-semibold text-indigo-800">{data.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-600">Terms:</span>
                  <span className="font-semibold text-indigo-800">Net 30 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-indigo-200 rounded-lg overflow-hidden mb-8">
          <div className="bg-indigo-600 text-white">
            <div className="grid grid-cols-5 gap-4 p-4">
              <span className="font-semibold">Item</span>
              <span className="font-semibold text-center">Description</span>
              <span className="font-semibold text-center">Quantity</span>
              <span className="font-semibold text-center">Unit Price</span>
              <span className="font-semibold text-right">Amount</span>
            </div>
          </div>
          <div className="bg-white">
            <div className="grid grid-cols-5 gap-4 p-4 border-b border-indigo-100">
              <span className="text-indigo-800 font-medium">001</span>
              <span className="text-indigo-700">Corporate Consulting</span>
              <span className="text-center text-indigo-700">1</span>
              <span className="text-center text-indigo-700">₹{data.price.toFixed(2)}</span>
              <span className="text-right font-semibold text-indigo-800">₹{data.price.toFixed(2)}</span>
            </div>
          </div>
          <div className="bg-indigo-50 p-4">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-indigo-700">Subtotal:</span>
                    <span className="font-semibold text-indigo-800">₹{data.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-700">VAT ({data.vatPercentage}%):</span>
                    <span className="font-semibold text-indigo-800">₹{data.vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-700">GSTIN ({data.gstinPercentage}%):</span>
                    <span className="font-semibold text-indigo-800">₹{data.gstinAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-indigo-300 mt-2 pt-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-indigo-800">Total Amount:</span>
                      <span className="text-2xl font-bold text-indigo-800">₹{data.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-600 text-white p-4 rounded-lg">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-bold">₹{data.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Paid Amount:</span>
              <span className="font-bold">₹{data.paidAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-indigo-200">
              <span>Balance Amount:</span>
              <span className="font-bold text-xl">₹{data.balanceAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
