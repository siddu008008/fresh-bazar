import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Star, Truck, Shield, ArrowLeft, Plus, Minus, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        if (data.pricingOptions && data.pricingOptions.length > 0) {
          setSelectedOption(data.pricingOptions[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    if(product.stock === 0) return;
    addToCart(product, qty, selectedOption);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full animate-pulse flex flex-col md:flex-row gap-12">
       <div className="w-full md:w-1/2 h-96 bg-gray-100 rounded-[2rem]"></div>
       <div className="w-full md:w-1/2 space-y-6 flex flex-col justify-center">
         <div className="h-8 bg-gray-100 rounded-lg w-1/4"></div>
         <div className="h-16 bg-gray-100 rounded-lg w-3/4"></div>
         <div className="h-32 bg-gray-100 rounded-xl w-full mt-6"></div>
         <div className="h-16 bg-gray-100 rounded-xl w-1/2 mt-8"></div>
       </div>
    </div>
  );
  
  if (!product) return <div className="text-center p-24 w-full font-bold text-2xl font-display">Product not found</div>;

  const currentPrice = selectedOption ? selectedOption.price : (product.discountPrice || product.price);
  const hasOptions = product.pricingOptions && product.pricingOptions.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full"
    >
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors font-medium mb-8 bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>
      
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="p-8 md:p-16 flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100/50">
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
              src={product.image} alt={product.name} 
              className="max-w-full h-auto max-h-[500px] object-contain drop-shadow-xl mix-blend-darken hover:scale-105 transition-transform duration-500" 
            />
          </div>
          
          {/* Details */}
          <div className="p-8 md:p-14 border-l border-gray-100 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <span className="bg-primary/10 text-primary text-[13px] font-bold px-3 py-1.5 rounded-lg tracking-wide uppercase">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-5 font-display leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-gray-700 font-bold">{product.rating}</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500 font-medium">Brand: <span className="font-bold text-gray-900 uppercase tracking-wider">{product.brand}</span></span>
              </div>
              
              <div className="my-8 flex items-baseline gap-3">
                <span className="text-5xl font-extrabold text-gray-900 tracking-tight">₹{currentPrice.toFixed(2)}</span>
                {!hasOptions && product.discountPrice && (
                  <span className="text-2xl text-gray-400 line-through font-semibold">₹{product.price.toFixed(2)}</span>
                )}
                {!hasOptions && <span className="text-gray-500 font-medium ml-2">per {product.unit}</span>}
              </div>
              
              <p className="text-gray-600 mb-10 leading-relaxed text-lg">{product.description}</p>
              
              {hasOptions && (
                <div className="mb-8 relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Select Quantity Options</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-gray-50/80 text-gray-800 text-lg font-bold p-4 rounded-xl border border-gray-200 outline-none hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer appearance-none shadow-sm pr-12"
                      value={selectedOption?.label}
                      onChange={(e) => {
                        const opt = product.pricingOptions.find(o => o.label === e.target.value);
                        setSelectedOption(opt);
                      }}
                    >
                      {product.pricingOptions.map((opt, idx) => (
                        <option key={idx} value={opt.label}>
                          {opt.label} - ₹{opt.price}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              )}
              
              <hr className="border-gray-100 mb-10" />
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <div className="flex items-center gap-4 bg-gray-50/80 rounded-2xl p-2 border border-gray-200/60 shadow-inner">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-gray-500 hover:text-primary transition-colors p-3 bg-white rounded-xl shadow-sm hover:shadow">
                    <Minus className="w-5 h-5"/>
                  </button>
                  <span className="w-12 text-center font-bold text-xl">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="text-gray-500 hover:text-primary transition-colors p-3 bg-white rounded-xl shadow-sm hover:shadow">
                    <Plus className="w-5 h-5"/>
                  </button>
                </div>
                
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                  className={`flex-1 py-5 text-lg w-full font-bold rounded-2xl transition-all duration-300 shadow-lg flex justify-center items-center gap-2 ${
                    added 
                      ? 'bg-green-500 text-white shadow-green-500/40' 
                      : product.stock === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary-dark shadow-primary/30'
                  }`}
                >
                  {added ? <><Check className="w-6 h-6 animate-in" /> Added to Cart</> : 'Add to Cart'}
                </motion.button>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="bg-white p-3 rounded-full text-primary shadow-sm border border-gray-100">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-[15px]">Fast Delivery</p>
                    <p>In 30 minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="bg-white p-3 rounded-full text-primary shadow-sm border border-gray-100">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-[15px]">Fresh Assured</p>
                    <p>Quality inspected</p>
                  </div>
                </div>
              </div>
              
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
