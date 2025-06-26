'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot, Plus, Trash2, FileText, Download } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/providers/auth-provider';
import html2pdf from 'html2pdf.js';
import { InvoicePreview } from '@/components/invoice-preview';

type Message = {
    id: number;
    sender: 'bot' | 'user';
    content: React.ReactNode;
};

type Product = {
    name: string;
    quantity: number;
    price: number;
};

export default function NewInvoicePage() {
    const { user } = useAuth();
    const [step, setStep] = useState(0);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'bot', content: "Hello! I'm your InvoicePilot assistant. Let's create a new invoice. Who is this invoice for?" },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState({ name: '', quantity: '1', price: '0' });

    const addMessage = (sender: 'bot' | 'user', content: React.ReactNode) => {
        setMessages(prev => [...prev, { id: prev.length + 1, sender, content }]);
    };

    const handleUserInput = () => {
        if (!inputValue.trim()) return;
        addMessage('user', inputValue);

        switch (step) {
            case 0: // Customer Name
                setCustomerName(inputValue);
                addMessage('bot', `Great! Let's add some products for ${inputValue}.`);
                setStep(1);
                break;
        }
        setInputValue('');
    };
    
    const handleAddProduct = () => {
        if(newProduct.name && parseFloat(newProduct.quantity) > 0 && parseFloat(newProduct.price) >= 0) {
            const productToAdd = {
                name: newProduct.name,
                quantity: parseFloat(newProduct.quantity),
                price: parseFloat(newProduct.price),
            };
            setProducts(prev => [...prev, productToAdd]);
            setNewProduct({ name: '', quantity: '1', price: '0' });
        }
    }

    const handleRemoveProduct = (index: number) => {
        setProducts(prev => prev.filter((_, i) => i !== index));
    }

    const handleFinalize = () => {
        addMessage('bot', "Invoice details are complete. Here is a preview. You can now download it as a PDF.");
        setStep(2);
    }
    
    const downloadPDF = () => {
        const element = document.getElementById('invoice-preview');
        const opt = {
          margin:       0.5,
          filename:     `invoice-${customerName.replace(' ','-')}-${new Date().toISOString().split('T')[0]}.pdf`,
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    }

    const totalAmount = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

    const botAvatar = <Avatar className="h-8 w-8"><AvatarFallback><Bot/></AvatarFallback></Avatar>;
    const userAvatar = <Avatar className="h-8 w-8"><AvatarImage src={user?.photoURL || ''}/><AvatarFallback>{user?.displayName?.[0] || 'U'}</AvatarFallback></Avatar>;

    const renderStepContent = () => {
        if (step === 1) {
            return (
                 <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {products.map((p, i) => (
                           <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                               <div>
                                   <p className="font-medium">{p.name}</p>
                                   <p className="text-sm text-muted-foreground">{p.quantity} x ${p.price.toFixed(2)}</p>
                               </div>
                               <div className="flex items-center gap-2">
                                    <p className="font-semibold">${(p.quantity * p.price).toFixed(2)}</p>
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveProduct(i)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                               </div>
                           </div>
                       ))}
                        <div className="flex items-end gap-2">
                            <Input placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                            <Input type="number" placeholder="Qty" value={newProduct.quantity} onChange={e => setNewProduct({...newProduct, quantity: e.target.value})} className="w-20" />
                            <Input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-24" />
                            <Button size="icon" onClick={handleAddProduct}><Plus className="h-4 w-4"/></Button>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col items-stretch gap-4">
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <Button onClick={handleFinalize} disabled={products.length === 0}>
                            <FileText className="mr-2 h-4 w-4"/> Finalize Invoice
                        </Button>
                    </CardFooter>
                </Card>
            );
        }
        if (step === 2) {
             return (
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Invoice Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div id="invoice-preview" className="bg-white rounded-lg shadow-lg p-8">
                           <InvoicePreview customerName={customerName} products={products} total={totalAmount} />
                        </div>
                    </CardContent>
                    <CardFooter>
                       <Button onClick={downloadPDF} className="w-full">
                            <Download className="mr-2 h-4 w-4"/> Download PDF
                       </Button>
                    </CardFooter>
                </Card>
             )
        }
        return null;
    };


    return (
        <div className="flex flex-col h-[calc(100vh-100px)]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((message, index) => (
                        <motion.div
                            key={message.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}
                        >
                            {message.sender === 'bot' && botAvatar}
                            <div className={`rounded-lg px-4 py-2 max-w-md ${message.sender === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                {message.content}
                            </div>
                            {message.sender === 'user' && userAvatar}
                        </motion.div>
                    ))}
                </AnimatePresence>
                 {renderStepContent()}
            </div>

            {step === 0 && (
                 <div className="p-4 border-t bg-background">
                    <div className="relative">
                        <Input
                            placeholder="Type customer name..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUserInput()}
                            disabled={step !== 0}
                            className="pr-12"
                        />
                        <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleUserInput} disabled={step !== 0}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
