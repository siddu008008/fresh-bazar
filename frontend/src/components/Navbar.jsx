import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Garden', category: 'All', path: '/#groceries'},
    { name: 'Pantry', category: 'Dry Fruits', path: '/' },
    { name: 'Wellness', category: 'Fruits', path: '/' },
  ];

  const handleNavClick = (category) => {
    setActiveCategory(category);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#154212] text-white shadow-lg px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link 
            to="/" 
            onClick={() => handleNavClick('All')}
            className="text-2xl font-black font-headline tracking-tighter flex items-center gap-2"
          >
            <span className="bg-white text-primary px-2 py-0.5 rounded-lg">FRESH</span>
            <span className="text-secondary-fixed">BAZAR</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.category)}
                className={`font-headline font-bold text-sm tracking-wide transition-all duration-300 relative py-1
                  ${activeCategory === link.category 
                    ? 'text-white' 
                    : 'text-white/60 hover:text-white'}`}
              >
                {link.name}
                {activeCategory === link.category && (
                  <motion.div 
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary-fixed rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white/10 border border-white/30 px-4 py-2.5 rounded-full w-80 hover:bg-white/15 focus-within:bg-white/20 focus-within:border-white/60 transition-all shadow-sm">
            <span className="material-symbols-outlined text-white/70 text-xl mr-2">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none focus:ring-0 text-sm w-full placeholder-white/50 text-white font-medium" 
              placeholder="Search for fresh harvests..." 
              type="text"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Link to="/cart" className="p-2.5 rounded-2xl hover:bg-white/10 transition-colors relative group">
              <span className="material-symbols-outlined text-white group-hover:scale-110 transition-transform">shopping_basket</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-fixed text-primary text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold border-2 border-primary">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-2 border-l border-white/10 pl-2">
                {user.role === 'admin' && (
                  <Link to="/admin" className="p-2 rounded-2xl hover:bg-white/10 transition-colors flex items-center gap-2 group">
                    <span className="material-symbols-outlined text-white group-hover:scale-110 transition-transform">admin_panel_settings</span>
                    <span className="text-sm font-bold hidden lg:inline">Admin</span>
                  </Link>
                )}
                <Link to="/orders" className="p-2 rounded-2xl hover:bg-white/10 transition-colors flex items-center gap-2 group">
                   <span className="material-symbols-outlined text-white group-hover:scale-110 transition-transform">account_circle</span>
                   <span className="text-sm font-bold hidden lg:inline">
                     {(user.name || user.displayName || user.email || 'User').split(' ')[0]}
                   </span>
                </Link>
                <button onClick={handleLogout} className="p-2 text-white/60 hover:text-error transition-colors" title="Logout">
                  <span className="material-symbols-outlined">logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-2.5 rounded-2xl hover:bg-white/10 transition-colors border border-white/10">
                <span className="material-symbols-outlined text-white">account_circle</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
