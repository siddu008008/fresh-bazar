import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cartItems, updateQty, removeFromCart } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + (item.itemPrice || item.discountPrice || item.price) * item.qty, 0);
  const deliveryFee = subtotal > 0 ? 20.00 : 0;

  return (
    <div className="bg-surface min-h-screen pt-24 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="flex items-center gap-4 mb-12">
           <Link to="/" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:scale-95 transition-transform">
             <span className="material-symbols-outlined">arrow_back</span>
           </Link>
           <h1 className="text-4xl md:text-5xl font-black text-primary font-headline tracking-tight">Your Basket</h1>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] text-center border border-outline-variant/10 shadow-sm flex flex-col items-center">
            <span className="material-symbols-outlined text-8xl text-secondary/20 mb-6">shopping_basket</span>
            <h2 className="text-3xl font-bold text-primary mb-4 font-headline">Empty Harvest</h2>
            <p className="text-on-surface-variant mb-10 max-w-md font-medium">Your basket is waiting for fresh picks from our garden. Start your journey below.</p>
            <Link to="/" className="btn-primary">Browse The Garden</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.cartItemId || item._id} 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    layout
                    className="bg-white p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(26,28,26,0.02)] flex items-center gap-8 relative overflow-hidden group border border-transparent hover:border-outline-variant/10"
                  >
                    <div className="w-24 h-24 bg-surface-container rounded-2xl flex-shrink-0 flex items-center justify-center p-4">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{item.brand}</span>
                      <h3 className="font-bold text-primary text-xl font-headline mt-1">
                        {item.name} {item.selectedOption && <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md ml-2">{item.selectedOption.label}</span>}
                      </h3>
                      <p className="text-secondary font-black mt-2">₹{(item.itemPrice || item.discountPrice || item.price).toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                       <div className="flex items-center gap-4 bg-surface-container-low rounded-2xl p-2 h-12">
                          <button onClick={() => updateQty(item.cartItemId || item._id, -1)} className="w-8 h-8 rounded-xl bg-white text-primary flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <span className="w-6 text-center font-black text-primary">{item.qty}</span>
                          <button onClick={() => updateQty(item.cartItemId || item._id, 1)} className="w-8 h-8 rounded-xl bg-white text-primary flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.cartItemId || item._id)} className="text-on-surface-variant hover:text-error transition-colors">
                          <span className="material-symbols-outlined">delete_outline</span>
                        </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="lg:col-span-4 sticky top-32">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_8px_32px_rgba(26,28,26,0.04)] border border-outline-variant/10">
                <h3 className="text-2xl font-bold text-primary mb-8 font-headline border-b border-surface-container pb-6">Summary</h3>
                <div className="space-y-6 text-on-surface-variant font-medium mb-10">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="text-primary font-bold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delivery</span>
                    <span className="text-primary font-bold">₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-surface-container-high w-full"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-primary font-headline text-lg">Total Charge</span>
                    <span className="text-3xl font-black text-secondary">₹{(subtotal + deliveryFee).toFixed(2)}</span>
                  </div>
                </div>
                <Link to="/checkout">
                  <button className="w-full btn-primary shadow-lg shadow-tertiary-container/10 group">
                    Secure Checkout
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">lock</span>
                  </button>
                </Link>
                <p className="text-center mt-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Environmentally Friendly Packaging Included</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;
