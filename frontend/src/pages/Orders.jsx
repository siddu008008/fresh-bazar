import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        // Using user.uid as requested: /api/orders/user/:userId
        const { data } = await axios.get(`https://fresh-bazar.onrender.com/api/orders/user/${user.uid}`, config);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load orders', error);
        setLoading(false);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="bg-surface min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
                <h1 className="text-4xl md:text-5xl font-black text-primary font-headline tracking-tight mb-2">My Orders</h1>
                <p className="text-on-surface-variant font-bold uppercase tracking-widest text-xs">Track your fresh grocery deliveries</p>
            </div>
            {orders.length > 0 && (
                <div className="bg-primary/10 px-4 py-2 rounded-2xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">shopping_bag</span>
                    <span className="font-black text-primary uppercase text-sm">{orders.length} Orders Placed</span>
                </div>
            )}
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center shadow-[0_8px_32px_rgba(26,28,26,0.02)] border border-outline-variant/10">
             <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">inventory_2</span>
             </div>
             <h2 className="text-2xl font-black text-primary mb-4">You have not placed any orders yet.</h2>
             <Link to="/" className="btn-primary inline-flex">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={order._id} 
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_8px_32px_rgba(26,28,26,0.02)] border border-outline-variant/10"
              >
                <div className="p-8 border-b border-outline-variant/10 bg-surface-container-low/50 flex flex-wrap justify-between items-center gap-6">
                  <div className="flex gap-6 items-center">
                    <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-outline-variant/10">
                        <span className="material-symbols-outlined">receipt</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-1">Order Identifier</p>
                        <p className="text-primary font-black font-mono text-sm uppercase tracking-tighter">{order._id}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-8">
                     <div>
                        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-1">Date</p>
                        <p className="text-on-surface font-extrabold text-sm">{new Date(order.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-1">Total Amount</p>
                        <p className="text-secondary font-black text-lg">₹{order.totalAmount.toFixed(2)}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-1">Status</p>
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                            {order.orderStatus}
                        </span>
                     </div>
                  </div>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/5">
                            <div className="w-16 h-16 bg-white rounded-xl flex-shrink-0 p-2 border border-outline-variant/10">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-primary truncate">{item.name}</p>
                                <p className="text-xs text-on-surface-variant font-extrabold uppercase tracking-tighter">Qty: {item.qty} × ₹{item.price.toFixed(2)}</p>
                            </div>
                        </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-outline-variant/10 flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2 text-on-surface-variant font-bold">
                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                            <span>{order.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest">
                            <span className="material-symbols-outlined text-sm">payments</span>
                            <span>{order.paymentMethod}</span>
                        </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
