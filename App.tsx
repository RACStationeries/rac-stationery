import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Search, Filter, Plus, Edit, Trash2, X, Check, 
  Send, Copy, Eye, RefreshCw, ShoppingCart, Info, Package, Phone, Mail, User, Shield, MapPin, ExternalLink
} from 'lucide-react';

const DEFAULT_PRODUCTS = [
  {
    id: 'rac-1',
    name: 'Executive Leatherette Hardbound Notebook (A5)',
    category: 'Notebooks & Paper',
    price: 249.00,
    description: 'Premium 192-page ruled journal with ribbon bookmark, elastic closure, and pen holder loop.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    sku: 'NTB-A5-001'
  },
  {
    id: 'rac-2',
    name: 'Parker Vector Stainless Steel Rollerball Pen',
    category: 'Pens & Writing',
    price: 450.00,
    description: 'Sleek brushed metal body rollerball pen with smooth blue ink refilling for refined signature experience.',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    sku: 'PEN-PRK-002'
  },
  {
    id: 'rac-3',
    name: 'Custom Wooden Photo Frame (8x10)',
    category: 'Gifts & Frames',
    price: 399.00,
    description: 'Rustic walnut finish tabletop/wall frame suitable for family photos, portraits, and customized gift prints.',
    image: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    sku: 'GFT-FRM-003'
  },
  {
    id: 'rac-4',
    name: 'Multi-Compartment Wooden Desk Organizer',
    category: 'Office & Desk',
    price: 599.00,
    description: 'Eco-friendly wooden organizer with pen stands, sticky note holder, phone dock, and memo drawer.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    sku: 'OFF-ORG-004'
  },
  {
    id: 'rac-5',
    name: 'Dual-Tip Acrylic Art Marker Set (24 Colors)',
    category: 'Art & Craft',
    price: 680.00,
    description: 'Vibrant quick-dry acrylic paint markers suitable for canvas, glass, stone, wood, and craft projects.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    sku: 'ART-MRK-005'
  },
  {
    id: 'rac-6',
    name: 'Luxury Birthday Celebration Gift Hamper',
    category: 'Gifts & Frames',
    price: 1250.00,
    description: 'Curated gift hamper containing custom mug, greeting card, scented candle, and premium chocolates.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    sku: 'GFT-HMP-006'
  },
  {
    id: 'rac-7',
    name: 'Spiral Artist Watercolor Drawing Pad (A4)',
    category: 'Notebooks & Paper',
    price: 195.00,
    description: '300 GSM cold pressed textured paper sheets ideal for watercolors, gouache, and heavy ink sketching.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    sku: 'NTB-WCR-007'
  },
  {
    id: 'rac-8',
    name: 'Insulated Stainless Steel Water Bottle (750ml)',
    category: 'Gifts & Frames',
    price: 480.00,
    description: 'Double-wall vacuum flask keeping liquids hot or cold for 18 hours. Available with custom name print.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    sku: 'GFT-BTL-008'
  },
  {
    id: 'rac-9',
    name: 'Scientific Financial Desktop Calculator',
    category: 'Office & Desk',
    price: 520.00,
    description: 'Dual-power solar and battery desktop calculator with 12-digit display and tax calculation keys.',
    image: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48d?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    sku: 'OFF-CAL-009'
  }
];

export default function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('rac_catalog_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [basket, setBasket] = useState(() => {
    const saved = localStorage.getItem('rac_catalog_basket');
    return saved ? JSON.parse(saved) : [];
  });

  const [storeInfo, setStoreInfo] = useState(() => {
    const saved = localStorage.getItem('rac_store_info');
    return saved ? JSON.parse(saved) : {
      name: 'RAC Stationery and Gifts',
      address: 'Arunachalam Nagar, Chennamanayakanpatti, Dindigul - 624004',
      phoneDisplay: '79040 89224 / 84284 89224',
      whatsappPhone: '917904089224',
      email: 'racstationeryshop@gmail.com',
      currency: '₹'
    };
  });

  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog', 'admin'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [toast, setToast] = useState(null);

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    fulfillment: 'Pickup', // 'Pickup' or 'Delivery'
    address: '',
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('rac_catalog_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rac_catalog_basket', JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    localStorage.setItem('rac_store_info', JSON.stringify(storeInfo));
  }, [storeInfo]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const categories = useMemo(() => {
    const defaultCats = ['All', 'Notebooks & Paper', 'Pens & Writing', 'Gifts & Frames', 'Office & Desk', 'Art & Craft'];
    const customCats = products.map(p => p.category);
    return ['All', ...new Set([...defaultCats.filter(c => c !== 'All'), ...customCats])];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (product.sku && product.sku.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const addToBasket = (product, quantityToAdd = 1) => {
    setBasket(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
      }
      return [...prev, { ...product, quantity: quantityToAdd }];
    });
    showToast(`Added ${product.name} to quote basket`);
  };

  const updateQuantity = (id, delta) => {
    setBasket(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromBasket = (id) => {
    setBasket(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from basket', 'info');
  };

  const basketTotal = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const basketItemCount = basket.reduce((sum, item) => sum + item.quantity, 0);

  const handleSaveProduct = (productData) => {
    if (productData.id) {
      setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
      showToast('Product updated successfully');
    } else {
      const newProd = {
        ...productData,
        id: `rac-${Date.now()}`
      };
      setProducts(prev => [newProd, ...prev]);
      showToast('New product added to catalog');
    }
    setEditingProduct(null);
    setIsAddModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      setBasket(prev => prev.filter(item => item.id !== id));
      showToast('Product deleted', 'info');
    }
  };

  const resetToDefaultProducts = () => {
    if (window.confirm('Reset catalog to sample items? Custom edits will be lost.')) {
      setProducts(DEFAULT_PRODUCTS);
      showToast('Catalog reset to defaults', 'info');
    }
  };

  const generateQuoteText = () => {
    let text = `🛍️ *PRODUCT QUOTE REQUEST*\n`;
    text += `🏬 *${storeInfo.name}*\n`;
    text += `📍 ${storeInfo.address}\n`;
    text += `-----------------------------------\n`;
    text += `👤 *Customer Name:* ${customer.name || 'Not specified'}\n`;
    text += `📞 *Customer Phone:* ${customer.phone || 'Not specified'}\n`;
    text += `🚚 *Fulfillment Option:* ${customer.fulfillment}\n`;
    if (customer.fulfillment === 'Delivery' && customer.address) {
      text += `🏡 *Delivery Address:* ${customer.address}\n`;
    }
    if (customer.notes) {
      text += `📝 *Notes/Requirements:* ${customer.notes}\n`;
    }
    text += `-----------------------------------\n📦 *ITEMS REQUESTED:*\n\n`;

    basket.forEach((item, index) => {
      text += `${index + 1}. *${item.name}*\n`;
      text += `   • Qty: ${item.quantity} × ${storeInfo.currency}${item.price.toFixed(2)} = ${storeInfo.currency}${(item.quantity * item.price).toFixed(2)}\n`;
      if (item.sku) text += `   • Code: ${item.sku}\n`;
    });

    text += `\n-----------------------------------`;
    text += `\n💰 *ESTIMATED TOTAL:* ${storeInfo.currency}${basketTotal.toFixed(2)}`;
    text += `\n-----------------------------------`;
    text += `\nPlease confirm availability and payment details. Thank you!`;

    return text;
  };

  const handleSendWhatsApp = () => {
    if (basket.length === 0) return;
    const text = generateQuoteText();
    const encodedText = encodeURIComponent(text);
    const cleanPhone = storeInfo.whatsappPhone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodedText}`;
    
    window.open(url, '_blank');
  };

  const handleCopyQuote = () => {
    if (basket.length === 0) return;
    const text = generateQuoteText();
    
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Quote copied to clipboard!');
    } catch (err) {
      showToast('Failed to copy quote', 'error');
    }
    document.body.removeChild(textarea);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-white transition-all transform ${
          toast.type === 'error' ? 'bg-red-600' : toast.type === 'info' ? 'bg-slate-800' : 'bg-emerald-600'
        }`}>
          <Info size={18} />
          <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        {/* Top Info Banner */}
        <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2 truncate">
              <MapPin size={13} className="text-emerald-400 flex-shrink-0" />
              <span className="truncate">{storeInfo.address}</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-medium">
              <a href={`tel:${storeInfo.phoneDisplay.split('/')[0].trim()}`} className="hover:text-emerald-400 flex items-center gap-1">
                <Phone size={12} />
                <span>{storeInfo.phoneDisplay}</span>
              </a>
              <a href={`mailto:${storeInfo.email}`} className="hover:text-emerald-400 hidden md:flex items-center gap-1">
                <Mail size={12} />
                <span>{storeInfo.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Navbar Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white p-2.5 rounded-xl shadow-md">
              <ShoppingBag size={22} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">{storeInfo.name}</h1>
              <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Stationery, Custom Gifts & Art Supplies
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-slate-100 p-1 rounded-xl flex text-xs font-semibold">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'catalog' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Storefront
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${activeTab === 'admin' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Shield size={13} />
                Manage
              </button>
            </div>

            <button
              onClick={() => setIsBasketOpen(true)}
              className="relative bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 font-semibold text-xs sm:text-sm"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Quote Basket</span>
              {basketItemCount > 0 && (
                <span className="bg-white text-emerald-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {basketItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {activeTab === 'catalog' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* Quick Info Hero Banner */}
          <div className="mb-6 p-4 sm:p-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 rounded-2xl text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold tracking-wide uppercase rounded-full">
                Direct WhatsApp Quote Ordering
              </span>
              <h2 className="text-lg sm:text-2xl font-bold mt-2">Welcome to RAC Stationery & Gifts</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                Browse our product catalog, select your items, and click <strong className="text-emerald-400">"Send via WhatsApp"</strong> to receive price quotes, bulk discounts, and order confirmation directly from our shop.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={`https://wa.me/${storeInfo.whatsappPhone}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition-all"
              >
                <Send size={14} />
                WhatsApp Us
              </a>
              <a
                href={`tel:${storeInfo.phoneDisplay.split('/')[0].trim()}`}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 flex items-center gap-1.5 transition-all"
              >
                <Phone size={14} />
                Call Shop
              </a>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search notebooks, pens, frames, hampers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Filter Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <Filter size={16} className="text-slate-400 flex-shrink-0 ml-1" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
              <Package size={48} className="mx-auto text-slate-300 mb-3" />
              <h3 className="text-base font-semibold text-slate-700">No products match your criteria</h3>
              <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting a different category.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-100"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="relative aspect-square bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/400x400/e2e8f0/64748b?text=RAC+Stationery';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur rounded-full text-[11px] font-semibold text-slate-700 shadow-sm">
                        {product.category}
                      </span>
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-md transition-transform hover:scale-110"
                      title="Quick View Details"
                    >
                      <Eye size={18} />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{product.name}</h3>
                        <span className="font-black text-indigo-600 whitespace-nowrap text-sm">
                          {storeInfo.currency}{product.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">
                        {product.sku || 'RAC-ITEM'}
                      </span>
                      <button
                        onClick={() => addToBasket(product)}
                        disabled={!product.inStock}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          product.inStock 
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Plus size={14} />
                        Add to Quote
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Store Information Settings */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Info size={18} className="text-indigo-600" />
                RAC Shop Details
              </h2>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Store Name</label>
                  <input
                    type="text"
                    value={storeInfo.name}
                    onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Store Address</label>
                  <textarea
                    rows={2}
                    value={storeInfo.address}
                    onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Display Phone Numbers</label>
                  <input
                    type="text"
                    value={storeInfo.phoneDisplay}
                    onChange={(e) => setStoreInfo({ ...storeInfo, phoneDisplay: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">WhatsApp Target Phone (With Country Code)</label>
                  <input
                    type="text"
                    value={storeInfo.whatsappPhone}
                    onChange={(e) => setStoreInfo({ ...storeInfo, whatsappPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={storeInfo.email}
                    onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Currency Symbol</label>
                  <input
                    type="text"
                    value={storeInfo.currency}
                    onChange={(e) => setStoreInfo({ ...storeInfo, currency: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="pt-3 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={resetToDefaultProducts}
                    className="w-full px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RefreshCw size={14} />
                    Reset Default Products
                  </button>
                </div>
              </div>
            </div>

            {/* Product Table Management */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Inventory Catalog Manager</h2>
                  <p className="text-xs text-slate-500">Add new gifts, stationery, prices, and stock availability</p>
                </div>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddModalOpen(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Plus size={16} />
                  Add New Item
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="px-3 py-2.5 rounded-l-lg">Product</th>
                      <th className="px-3 py-2.5">Category</th>
                      <th className="px-3 py-2.5">Price</th>
                      <th className="px-3 py-2.5">Stock</th>
                      <th className="px-3 py-2.5 rounded-r-lg text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/50">
                        <td className="px-3 py-3 font-medium text-slate-900 flex items-center gap-3">
                          <img src={p.image} alt="" className="w-9 h-9 rounded-lg object-cover bg-slate-100" />
                          <div>
                            <div className="font-bold">{p.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{p.sku}</div>
                          </div>
                        </td>
                        <td className="px-3 py-3 font-medium">{p.category}</td>
                        <td className="px-3 py-3 font-bold">{storeInfo.currency}{p.price.toFixed(2)}</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.inStock ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                            {p.inStock ? 'Available' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setIsAddModalOpen(true);
                              }}
                              className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-md"
                              title="Edit"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 hover:bg-red-50 text-red-600 rounded-md"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      )}

      {isBasketOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsBasketOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={20} className="text-emerald-400" />
                  <div>
                    <h2 className="text-sm sm:text-base font-bold">Quote Basket</h2>
                    <p className="text-[11px] text-slate-400">RAC Stationery and Gifts</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsBasketOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {basket.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag size={44} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-slate-600 text-sm font-semibold">Your quote basket is empty</p>
                    <p className="text-slate-400 text-xs mt-1">Select items from our stationery and gift catalog to request a quote.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {basket.map(item => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-white" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                          <p className="text-xs text-indigo-600 font-bold">
                            {storeInfo.currency}{item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 py-1 text-slate-500 hover:bg-slate-100 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 py-1 text-slate-500 hover:bg-slate-100 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromBasket(item.id)}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}

                    <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-black">
                      <span>Estimated Total</span>
                      <span className="text-indigo-600 text-base">{storeInfo.currency}{basketTotal.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Customer Details Form */}
                {basket.length > 0 && (
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Customer & Delivery Info</h3>
                    <div className="space-y-2.5">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                          type="text"
                          placeholder="Your Name *"
                          value={customer.name}
                          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                          type="text"
                          placeholder="Contact Phone Number *"
                          value={customer.phone}
                          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="flex gap-2 pt-1">
                        <label className={`flex-1 p-2 rounded-lg border text-center cursor-pointer text-xs font-bold ${customer.fulfillment === 'Pickup' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-slate-200 text-slate-600'}`}>
                          <input 
                            type="radio" 
                            name="fulfillment" 
                            value="Pickup" 
                            checked={customer.fulfillment === 'Pickup'} 
                            onChange={() => setCustomer({ ...customer, fulfillment: 'Pickup' })}
                            className="sr-only" 
                          />
                          Shop Pickup
                        </label>
                        <label className={`flex-1 p-2 rounded-lg border text-center cursor-pointer text-xs font-bold ${customer.fulfillment === 'Delivery' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-slate-200 text-slate-600'}`}>
                          <input 
                            type="radio" 
                            name="fulfillment" 
                            value="Delivery" 
                            checked={customer.fulfillment === 'Delivery'} 
                            onChange={() => setCustomer({ ...customer, fulfillment: 'Delivery' })}
                            className="sr-only" 
                          />
                          Home Delivery
                        </label>
                      </div>

                      {customer.fulfillment === 'Delivery' && (
                        <textarea
                          placeholder="Delivery Address with Landmark *"
                          value={customer.address}
                          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 h-16 resize-none"
                        />
                      )}

                      <textarea
                        placeholder="Gift message, custom print details, or special requests..."
                        value={customer.notes}
                        onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 h-16 resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Actions */}
              {basket.length > 0 && (
                <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-2">
                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send size={15} />
                    Send Quote Request via WhatsApp
                  </button>
                  <button
                    onClick={handleCopyQuote}
                    className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <Copy size={15} />
                    Copy Formatted Quote Text
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-3 right-3 p-1.5 bg-white/80 hover:bg-white text-slate-600 rounded-full shadow-md z-10"
            >
              <X size={18} />
            </button>
            <div className="aspect-video bg-slate-100 relative">
              <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{quickViewProduct.category}</span>
                  <h3 className="text-lg font-bold text-slate-900">{quickViewProduct.name}</h3>
                </div>
                <span className="text-xl font-black text-slate-900">{storeInfo.currency}{quickViewProduct.price.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">{quickViewProduct.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400 font-mono">Code: {quickViewProduct.sku || 'N/A'}</span>
                <button
                  onClick={() => {
                    addToBasket(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  disabled={!quickViewProduct.inStock}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <Plus size={16} />
                  Add to Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <ProductFormModal
          product={editingProduct}
          categories={categories.filter(c => c !== 'All')}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}

function ProductFormModal({ product, categories, onClose, onSave }) {
  const [formData, setFormData] = useState(
    product || {
      name: '',
      category: categories[0] || 'General',
      price: '',
      description: '',
      image: '',
      inStock: true,
      sku: ''
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    onSave({
      ...formData,
      price: parseFloat(formData.price) || 0,
      image: formData.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-slate-900">
            {product ? 'Edit Item' : 'Add Item to RAC Store'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Item Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Handmade Photo Frame"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Price (₹)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Product SKU / Code</label>
            <input
              type="text"
              placeholder="RAC-001"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description & Specifications</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="inStock"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="inStock" className="font-semibold text-slate-700">Available in Stock</label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
