import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
    const { orderId } = useParams();

    return (
        <div className="bg-surface min-h-screen pt-32 pb-32 flex items-center justify-center px-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full bg-white rounded-[3rem] p-12 text-center shadow-[0_12px_64px_rgba(26,28,26,0.05)] border border-outline-variant/10"
            >
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-primary/20">
                    <span className="material-symbols-outlined text-5xl">check_circle</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-primary font-headline mb-4">Order Placed Successfully!</h1>
                <p className="text-on-surface-variant font-bold text-lg mb-10">Your fresh groceries are on their way to you.</p>

                <div className="bg-surface-container-low rounded-3xl p-8 mb-10 border border-outline-variant/20 inline-block w-full text-left">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-outline-variant/10">
                            <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Order ID</span>
                            <span className="font-black text-primary font-mono">{orderId}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-outline-variant/10">
                            <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Payment Method</span>
                            <span className="font-extrabold text-secondary">Cash on Delivery (COD)</span>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <span className="text-xl font-bold text-primary">Status</span>
                            <span className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-black uppercase tracking-tighter">Pending</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/orders" className="btn-primary py-5 px-10">
                        View My Orders
                        <span className="material-symbols-outlined">receipt_long</span>
                    </Link>
                    <Link to="/" className="btn-secondary py-5 px-10">
                        Continue Shopping
                        <span className="material-symbols-outlined">shopping_basket</span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;
