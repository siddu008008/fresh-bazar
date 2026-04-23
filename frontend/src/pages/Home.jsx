import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

import { useSearch } from '../context/SearchContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useSearch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', 'Vegetables', 'Fruits', 'Leafy Greens', 'Dry Fruits', 'Dairy'];
  
  const filteredProducts = useMemo(() => {
    let res = [...products];
    if(searchQuery) {
      res = res.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (activeCategory !== 'All') res = res.filter(p => p.category === activeCategory);
    return res;
  }, [products, searchQuery, activeCategory]);

  return (
    <div className="bg-surface min-h-screen">
      <main className="pt-24 pb-32">
        {/* Daily Fresh Hero Section */}
        <section className="px-6 mb-16 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden sunlight-gradient flex items-center px-8 md:px-20"
          >
            <div className="absolute inset-0 opacity-40 mix-blend-overlay">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy2nyqQedigRCxWnTNxNz2ZRPBFXzIlm6rPvYthVYBVSzyCiIvnoULdE2r0WaEMwVmWc68WIV3YKkzNlqKaaC_22uxxkqPwrO1YFECVFey9719fEgWaxLeSGnuEIWXWh-NxgrjR8hdMDbacUulciEgBeQj9e9lTGnQlLVCKW89v3SOqlLZAcSjXkCMORYZaoSQcgecOF_wSRvgESFRMadZWbR5lALNDm5NYp5OLsOryfAh0t570CSnR_oNSQf6HplS8aUTZdzS2RQO" 
                alt="Organic Vegetables"
              />
            </div>
            <div className="relative z-10 max-w-2xl">
              <span className="bg-secondary-fixed text-on-secondary-fixed px-4 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 inline-block">Daily Fresh Selection</span>
              <h1 className="text-white font-headline text-4xl md:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tight">Curated from the earth to your kitchen.</h1>
              <div className="flex gap-4">
                <button className="bg-tertiary-container text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:scale-95 transition-transform shadow-lg">
                  Shop The Harvest
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Featured Categories */}
        <section className="px-6 mb-20 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-headline text-3xl font-bold text-primary">Discover Fresh Items </h2>
              <p className="text-on-surface-variant font-medium">Fresh Bazar Groceries at Your Doorstep.</p>
            </div>
            <div className="flex items-center gap-4">
               {/* Minimalist Search inside category bar */}
               <div className="hidden sm:flex items-center bg-surface-container-low px-4 py-2 rounded-full w-64 border border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant mr-2">search</span>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search harvest..." 
                    className="bg-transparent border-none focus:ring-0 text-sm w-full"
                  />
               </div>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-surface-container-low text-primary hover:bg-surface-container'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-6 mb-20 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-headline text-4xl font-bold text-primary">
              {activeCategory === 'All' ? 'Trending Now' : activeCategory}
            </h2>
            <div className="flex gap-2">
              <span className="text-on-surface-variant bg-surface-container text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest leading-none flex items-center">
                {filteredProducts.length} Items Found
              </span>
            </div>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[...Array(8)].map((_, i) => (
                 <div key={i} className="bg-surface-container animate-pulse h-80 rounded-[2rem]"></div>
               ))}
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence>
                {filteredProducts.map(p => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">search_off</span>
              <p className="text-on-surface-variant font-medium text-lg">We couldn't find any results for "{searchQuery}" in {activeCategory}.</p>
              <button onClick={() => {setSearchQuery(''); setActiveCategory('All');}} className="mt-4 text-primary font-bold underline">Clear all filters</button>
            </div>
          )}
        </section>

        {/* Newsletter */}
        <section className="px-6 py-12 max-w-7xl mx-auto">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="max-w-2xl mx-auto relative z-10">
              <h2 className="font-headline text-white text-4xl md:text-5xl font-bold mb-6">Become a Garden Member</h2>
              <p className="text-on-primary-container font-medium text-lg mb-10 leading-relaxed">Join 50,000+ home chefs receiving seasonal recipes, harvest alerts, and exclusive early access to rare crops.</p>
              <div className="flex flex-col md:flex-row gap-4 bg-white/5 p-2 rounded-[2rem] backdrop-blur-sm border border-white/10">
                <input className="bg-transparent border-none focus:ring-0 text-white placeholder-white/50 px-6 py-4 flex-grow" placeholder="Enter your email" type="email"/>
                <button className="bg-secondary-fixed text-on-secondary-fixed px-10 py-4 rounded-full font-bold hover:scale-95 transition-transform">Subscribe</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
