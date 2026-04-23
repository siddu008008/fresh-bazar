import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // Form States
    const [name, setName] = useState(user?.displayName || '');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const subtotal = cartItems.reduce((acc, item) => acc + (item.itemPrice || item.discountPrice || item.price) * item.qty, 0);
    const total = subtotal + 20;

    if (cartItems.length === 0) return (
        <div className="p-20 text-center bg-surface min-h-screen pt-32">
            <h2 className="text-2xl font-black text-primary mb-6">Your cart is empty</h2>
            <Link to="/" className="btn-primary inline-flex">Go back to shop</Link>
        </div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please login to place order");
            return;
        }
        
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const orderData = {
                items: cartItems.map(item => ({
                    name: item.selectedOption ? `${item.name} (${item.selectedOption.label})` : item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.itemPrice || item.discountPrice || item.price,
                    product: item._id
                })),
                totalAmount: total,
                address: address,
                phone: phone,
            };
            
            const { data } = await axios.post('https://fresh-bazar.onrender.com/api/orders', orderData, config);
            
            toast.success('Order placed successfully!');
            clearCart();
            // User requested showing Order ID, so we navigate to success page with ID
            navigate(`/order-success/${data._id}`);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-surface min-h-screen pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-6">
               <div className="flex items-center gap-4 mb-12">
                  <Link to="/cart" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:scale-95 transition-transform">
                    <span className="material-symbols-outlined">arrow_back</span>
                  </Link>
                  <h1 className="text-4xl md:text-5xl font-black text-primary font-headline tracking-tight">Checkout</h1>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  {/* Order Overview */}
                  <div className="lg:col-span-4 order-2 lg:order-1">
                     <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_32px_rgba(26,28,26,0.02)] border border-outline-variant/10">
                        <h3 className="text-xl font-black text-primary font-headline mb-6 border-b border-surface-container pb-4">Order Overview</h3>
                        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 hide-scrollbar">
                           {cartItems.map(item => (
                             <div key={item.cartItemId || item._id} className="flex gap-4 items-center">
                                <div className="w-16 h-16 bg-surface-container rounded-xl flex-shrink-0 p-2">
                                   <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" alt={item.name} />
                                </div>
                                <div className="flex-1 min-w-0">
                                   <p className="font-bold text-gray-900 truncate">
                                     {item.name} {item.selectedOption && <span className="text-xs font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md ml-1">{item.selectedOption.label}</span>}
                                   </p>
                                   <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                </div>
                                <p className="font-medium text-gray-900">₹{((item.itemPrice || item.discountPrice || item.price) * item.qty).toFixed(2)}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Checkout Form */}
                  <div className="lg:col-span-8 order-1 lg:order-2">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Shipping Information */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_32px_rgba(26,28,26,0.02)] border border-outline-variant/10">
                            <h3 className="text-xl font-black text-primary font-headline mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined">local_shipping</span>
                                Shipping Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest pl-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={e=>setName(e.target.value)} 
                                        placeholder="Enter your name" 
                                        className="input-field" 
                                        required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest pl-2">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        value={phone} 
                                        onChange={e=>setPhone(e.target.value)} 
                                        placeholder="e.g. +91 9876543210" 
                                        className="input-field" 
                                        required 
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest pl-2">Delivery Address</label>
                                    <textarea 
                                        value={address} 
                                        onChange={e=>setAddress(e.target.value)} 
                                        placeholder="Enter complete address with landmark" 
                                        className="input-field min-h-[100px] py-4" 
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_32px_rgba(26,28,26,0.02)] border border-outline-variant/10">
                            <h3 className="text-xl font-black text-primary font-headline mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined">payments</span>
                                Payment Method
                            </h3>
                            
                            <div className="p-6 border-2 border-primary/20 rounded-3xl bg-primary/5 flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined">check_circle</span>
                                </div>
                                <div>
                                    <h4 className="font-black text-primary uppercase tracking-tight">Cash on Delivery (COD)</h4>
                                    <p className="text-xs text-on-surface-variant font-bold">Pay in cash when your order is delivered to your doorstep.</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-on-surface-variant text-sm font-medium">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-on-surface-variant text-sm font-medium">
                                    <span>Shipping Fee</span>
                                    <span>₹20.00</span>
                                </div>
                                <div className="h-px bg-outline-variant/10 w-full"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-primary font-bold">Grand Total</span>
                                    <span className="text-3xl font-black text-secondary">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button 
                                disabled={loading} 
                                type="submit" 
                                className="w-full btn-primary disabled:opacity-50 group py-6 text-lg"
                            >
                                {loading ? 'Placing Order...' : `Place COD Order - ₹${total.toFixed(2)}`}
                                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">shopping_bag</span>
                            </button>
                        </div>
                    </form>
                  </div>
               </div>
            </div>
        </div>
    )
};

export default Checkout;
