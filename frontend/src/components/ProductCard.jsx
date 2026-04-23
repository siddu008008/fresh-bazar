import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Set the default selected option to the first pricing option if it exists
  const hasOptions = product.pricingOptions && product.pricingOptions.length > 0;
  const [selectedOption, setSelectedOption] = useState(hasOptions ? product.pricingOptions[0] : null);

  const handleAdd = (e) => {
    e.preventDefault();
    if(product.stock === 0) return;
    addToCart(product, 1, selectedOption);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const currentPrice = selectedOption ? selectedOption.price : (product.discountPrice || product.price);
  const displayPrice = typeof currentPrice === 'number' ? currentPrice.toFixed(2) : currentPrice;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2.5rem] p-6 shadow-[0_12px_40px_rgba(21,66,18,0.03)] group border border-transparent hover:border-primary/5 hover:shadow-[0_20px_50px_rgba(21,66,18,0.08)] transition-all duration-500 flex flex-col h-full relative overflow-hidden"
    >
      <Link to={`/product/${product._id}`} className="block relative aspect-square rounded-3xl overflow-hidden bg-[#F8FAF8] mb-6">
        {/* Shimmer Loader */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" 
               style={{ backgroundSize: '1000px 100%' }} />
        )}

        <img 
          src={imageError ? 'https://placehold.co/800x800/f8faf8/154212?text=' + encodeURIComponent(product.name) : product.image} 
          alt={product.name} 
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="lazy"
          className={`w-full h-full object-contain transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} group-hover:scale-110`}
        />

        <button className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-xl flex items-center justify-center text-primary/40 hover:text-primary hover:bg-white transition-all shadow-lg border border-primary/5 active:scale-90">
          <span className="material-symbols-outlined text-xl">favorite</span>
        </button>

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[4px] flex items-center justify-center">
            <span className="bg-[#154212] text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl">Harvested Out</span>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 px-1">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/product/${product._id}`} className="block flex-1 pr-2">
            <h4 className="font-headline font-bold text-xl text-[#1a1c1a] leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h4>
          </Link>
          <div className="flex flex-col items-end shrink-0">
             <span className="text-primary font-black text-xl font-headline tracking-tighter">₹{displayPrice}</span>
             {!hasOptions && <span className="text-[10px] text-primary/40 font-bold uppercase tracking-widest leading-none">per {product.unit}</span>}
          </div>
        </div>
        
        <p className="text-on-surface-variant/60 text-xs flex items-center gap-2 mt-1 mb-4">
          <span className="font-bold text-primary/80 uppercase tracking-wider">{product.brand}</span>
          <span className="w-1 h-1 bg-primary/20 rounded-full" />
          <span className="font-medium italic">{product.category}</span>
        </p>

        {hasOptions && (
          <div className="mb-4 relative">
            <select 
              className="w-full bg-surface-container-lowest text-gray-800 text-sm font-bold p-3 rounded-xl border border-outline-variant/30 outline-none hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer appearance-none shadow-sm pr-10"
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
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        )}

        <div className="mt-auto pt-2">
          <button 
            onClick={handleAdd}
            disabled={product.stock === 0 || added}
            className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${
              added 
                ? 'bg-secondary text-white shadow-lg' 
                : product.stock === 0 
                  ? 'bg-surface-container text-on-surface-variant/40 cursor-not-allowed border border-dashed border-outline-variant'
                  : 'bg-primary text-white hover:bg-[#0d2a0b] shadow-[0_8px_20px_rgba(21,66,18,0.15)] hover:shadow-[0_12px_25px_rgba(21,66,18,0.25)]'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.span 
                key={added ? 'check' : 'cart'}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="material-symbols-outlined !text-lg"
              >
                {added ? 'check_circle' : 'shopping_bag'}
              </motion.span>
            </AnimatePresence>
            {added ? 'In Basket' : 'Add to Basket'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
