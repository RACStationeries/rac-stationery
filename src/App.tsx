import React, { useState } from 'react';
import { ShoppingCart, Phone, Mail, MapPin, Search, Send, Trash2, Plus, Minus } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'A4 Copier Paper (70 GSM)', category: 'Paper', price: 210, unit: 'Ream', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400' },
  { id: 2, name: 'Executive Gel Pens (Blue - Box of 20)', category: 'Writing', price: 180, unit: 'Box', image: 'https://images.unsplash.com/photo-1585336261026-6757f541a674?w=400' },
  { id: 3, name: 'Heavy Duty Stapler', category: 'Office Supplies', price: 350, unit: 'Piece', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400' },
  { id: 4, name: 'Permanent Markers (Assorted 4-Pack)', category: 'Writing', price: 120, unit: 'Pack', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400' },
  { id: 5, name: 'Standard Sticky Notes (3x3 Yellow)', category: 'Office Supplies', price: 45, unit: 'Pad', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400' },
  { id: 6, name: 'Spiral Binding Register (200 Pages)', category: 'Notebooks', price: 110, unit: 'Piece', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' }
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ['All', 'Paper', 'Writing', 'Office Supplies', 'Notebooks'];

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return;
    let message = `*Bulk Order Inquiry - RAC Stationery & Gifts*\n\n`;
    cart.forEach((item) => {
      message += `• ${item.name} - ${item.quantity} ${item.unit}(s) @ ₹${item.price}/${item.unit} = ₹${item.price * item.quantity}\n`;
    });
    message += `\n*Estimated Total:* ₹${totalPrice}\n\nPlease let me know availability and delivery timelines for Dindigul.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/917904089224?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-blue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">RAC Stationery & Gifts</h1>
            <p className="text-xs text-blue-200">Dindigul (624004) • B2B & Bulk Orders</p>
          </div>

          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative bg-blue-800 hover:bg-blue-700 p-2.5 rounded-lg flex items-center gap-2 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Quote List</span>
            {totalItems > 0 && (
              <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero / Contact Bar */}
      <section className="bg-blue-800 text-blue-100 py-3 border-t border-blue-700 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> 79040 89224 / 84284 89224</span>
            <span className="hidden md:flex items-center gap-1"><Mail className="w-4 h-4" /> racstationeryshop@gmail.com</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> Dindigul - 624004
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search stationery, paper, pens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
              <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-slate-900 mt-2">{product.name}</h3>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-slate-900">₹{product.price}</span>
                    <span className="text-xs text-slate-500"> / {product.unit}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-xl">
            <div className="p-4 bg-blue-900 text-white flex justify-between items-center">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Bulk Order Quote
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-blue-200 hover:text-white">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  Your quote list is empty. Add products to request pricing via WhatsApp.
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h4 className="font-medium text-slate-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-500">₹{item.price} per {item.unit}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-lg">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-slate-100">
                          <Minus className="w-3 h-3 text-slate-600" />
                        </button>
                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-slate-100">
                          <Plus className="w-3 h-3 text-slate-600" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t bg-slate-50 space-y-3">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Estimated Total:</span>
                  <span>₹{totalPrice}</span>
                </div>
                <button
                  onClick={sendWhatsAppOrder}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-5 h-5" /> Send Quote via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
