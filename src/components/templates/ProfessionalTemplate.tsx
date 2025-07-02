import type { InvoiceData } from '@/types/invoice'

interface TemplateProps {
  data: InvoiceData
}

export default function ProfessionalTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="border-b-2 border-green-500 pb-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-green-700">{data.companyName}</h1>
              <p className="text-green-600 mt-1">Professional Business Solutions</p>
            </div>
            <div className="text-right">
              <div className="bg-green-600 text-white px-6 py-3 rounded">
                <p className="text-sm uppercase">Invoice</p>
                <p className="text-xl font-bold">{data.invoiceNumber}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-2">From:</h3>
            <p className="font-medium">{data.companyName}</p>
            <p className="text-green-600 text-sm">456 Business Blvd</p>
            <p className="text-green-600 text-sm">Business City, BC 54321</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-2">To:</h3>
            <p className="font-medium">{data.clientName}</p>
            <p className="text-green-600 text-sm">789 Client Road</p>
            <p className="text-green-600 text-sm">Client City, CC 98765</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-2">Payment Details:</h3>
            <p className="text-sm"><span className="font-medium">Date:</span> {data.invoiceDate}</p>
            <p className="text-sm"><span className="font-medium">Due:</span> {data.dueDate}</p>
            <p className="text-sm"><span className="font-medium">Terms:</span> Net 30</p>
          </div>
        </div>

        <table className="w-full mb-6">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="text-left p-4 rounded-tl-lg">Description</th>
              <th className="text-center p-4">Quantity</th>
              <th className="text-center p-4">Unit Price</th>
              <th className="text-right p-4 rounded-tr-lg">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-green-100">
              <td className="p-4">Business Consulting Services</td>
              <td className="text-center p-4">1</td>
              <td className="text-center p-4">₹{data.price.toFixed(2)}</td>
              <td className="text-right p-4 font-semibold">₹{data.price.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-green-50 p-4 rounded-lg mb-6 ml-auto max-w-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{data.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT ({data.vatPercentage}%):</span>
              <span>₹{data.vatAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GSTIN ({data.gstinPercentage}%):</span>
              <span>₹{data.gstinAmount.toFixed(2)}</span>
            </div>
            <div className="border-t border-green-200 pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount:</span>
                <span className="text-green-600">₹{data.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-600 text-white p-4 rounded-lg">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-bold">₹{data.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Paid Amount:</span>
              <span className="font-bold">₹{data.paidAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-200">
              <span>Balance Amount:</span>
              <span className="font-bold text-xl">₹{data.balanceAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
