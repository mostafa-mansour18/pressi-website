'use client';

import { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = '96170083049';

const products = [
  {
    id: '1',
    name: 'Pressi Classic Tee',
    price: 45,
    description: 'Premium cotton t-shirt with embroidered logo.',
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
  },
  {
    id: '2',
    name: 'Pressi Signature Hoodie',
    price: 95,
    description: 'Heavyweight fleece hoodie, unisex fit.',
    image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
  },
  {
    id: '3',
    name: 'Pressi Cap',
    price: 35,
    description: 'Adjustable cap with tonal embroidery.',
    image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800',
  },
];

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('pressi-cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('pressi-cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: (typeof products)[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const checkoutOnWhatsApp = () => {
    if (cart.length === 0) return;
    const lines = cart
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.name} × ${i.quantity} — $${i.price * i.quantity}`
      )
      .join('\n');
    const message = `Hi Pressi, I'd like to order:\n\n${lines}\n\nTotal: $${totalPrice}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold tracking-tight">Pressi</h1>
        <div className="flex gap-6 text-sm items-center">
          <a href="#products" className="hover:opacity-60">
            Shop
          </a>
          <a href="#" className="hover:opacity-60">
            About
          </a>
          <button
            onClick={() => setIsCartOpen(true)}
            className="hover:opacity-60 relative"
          >
            Cart ({totalItems})
          </button>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-6xl md:text-7xl font-bold tracking-tight leading-none">
          Premium products,
          <br />
          delivered.
        </h2>
        <p className="text-lg text-gray-500 mt-6 max-w-lg">
          Curated essentials, made with intention. Shipped worldwide.
        </p>
      </section>

      <section id="products" className="max-w-6xl mx-auto px-8 pb-24">
        <h3 className="text-2xl font-semibold mb-10">All Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl 
transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform 
duration-500"
                />
              </div>
              <div className="p-5">
                <h4 className="font-semibold text-lg">{p.name}</h4>
                <p className="text-gray-500 text-sm mt-1">{p.description}</p>
                <p className="mt-4 font-bold text-xl">${p.price}</p>
                <button
                  onClick={() => addToCart(p)}
                  className="mt-4 w-full bg-black text-white py-2.5 rounded-md text-sm font-medium 
hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl 
transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center px-6 py-5 border-b">
            <h3 className="font-semibold text-lg">Your Cart</h3>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-2xl leading-none hover:opacity-60"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            ) : (
              <div className="space-y-5">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-gray-500 text-sm mt-0.5">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 border rounded hover:bg-gray-100 text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 border rounded hover:bg-gray-100 text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t px-6 py-5">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-bold">${totalPrice}</span>
              </div>
              <button
                onClick={checkoutOnWhatsApp}
                className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 
transition"
              >
                Checkout on WhatsApp
              </button>
            </div>
          )}
        </div>
      </aside>
    </main>
  );
}
