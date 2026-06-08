import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  const [checkoutStatus, setCheckoutStatus] = React.useState<'idle' | 'processing' | 'success'>('idle');

  const handleCheckout = () => {
    setCheckoutStatus('processing');
    setTimeout(() => {
      setCheckoutStatus('success');
      setTimeout(() => {
        clearCart();
        setIsCartOpen(false);
        setCheckoutStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 pointer-events-auto"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-stone-50 shadow-2xl z-50 flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-white">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="text-stone-900" />
                <h2 className="text-xl font-serif font-bold text-stone-900">Your Order</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 text-stone-400 hover:text-stone-900 transition-colors rounded-full hover:bg-stone-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-stone-400 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="text-lg">Your cart is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-accent hover:underline font-medium"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : checkoutStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900">Order Placed!</h3>
                  <p className="text-stone-500 font-light max-w-[250px]">
                    Your order is being prepared. We'll notify you when it's ready.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-bold text-stone-900">{item.menuItem.name}</h4>
                          <span className="font-medium text-stone-900 ml-4">{item.menuItem.price}</span>
                        </div>
                        <p className="text-sm text-stone-500 font-light mt-1 line-clamp-1">{item.menuItem.description}</p>
                        
                        {item.instructions && (
                          <div className="mt-2 bg-stone-50 p-2 rounded text-xs text-stone-600 border border-stone-100">
                            <span className="font-medium uppercase tracking-wider text-[10px] text-stone-400 block mb-0.5">Note</span>
                            {item.instructions}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-3 bg-stone-100 rounded-full p-1 border border-stone-200">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-sm"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-sm"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs font-semibold text-stone-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && checkoutStatus !== 'success' && (
              <div className="bg-white border-t border-stone-200 p-6 space-y-4 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between text-stone-600 text-sm">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600 text-sm">
                  <span>Taxes & Fees</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-900 font-serif font-bold text-xl pt-4 border-t border-stone-100">
                  <span>Total</span>
                  <span>${(cartTotal * 1.1).toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={checkoutStatus === 'processing'}
                  className="w-full py-4 mt-2 bg-stone-900 text-white rounded-2xl font-semibold hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {checkoutStatus === 'processing' ? 'Processing...' : `Checkout - ${(cartTotal * 1.1).toFixed(2)}`}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
