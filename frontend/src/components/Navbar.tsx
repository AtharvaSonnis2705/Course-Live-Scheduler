import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
    setMobileMenuOpen(false);
  };

  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/90 backdrop-blur-md border-b border-white/10 shadow-lg' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
                H
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                HERMANOS
              </span>
            </motion.div>
          </div>

          
          <div className="hidden md:flex items-center space-x-8">
           
            <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              Home
            </Link>
            
            
            {token ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  <User size={14} />
                  {role === 'admin' ? 'Administrator' : 'Instructor'}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all border border-white/10 backdrop-blur-sm"
                >
                  <LogOut size={16} />
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                  Sign In
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-indigo-900/20 transition-all"
                  >
                    Get Started <ChevronRight size={16} />
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 hover:text-white">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-white hover:text-indigo-400">
                Home
              </Link>
              
              {token ? (
                <>
                  <div className="text-sm text-gray-400 border-t border-white/10 pt-4 mt-2">
                    Signed in as <span className="text-white capitalize">{role}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 py-3 rounded-lg mt-2 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-center py-3 border border-white/10 rounded-lg text-white font-medium hover:bg-white/5"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-center py-3 bg-indigo-600 rounded-lg text-white font-bold hover:bg-indigo-500"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;