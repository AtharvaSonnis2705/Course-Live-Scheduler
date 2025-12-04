import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ShieldCheck, Users, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  // Get auth details directly from localStorage
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        
        {/* Animated Background Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </motion.div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            

            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200"
            >
              Scheduling mastered. <br/> Conflicts eliminated.
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="mt-6 text-lg leading-8 text-gray-300">
              The intelligent platform for modern educational institutes. Automatically detect conflicts, manage instructors, and streamline your academic calendar with zero friction.
            </motion.p>
            
            
            <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-center gap-x-6">
              
              {token ? (
                
                <Link
                  to={role === 'admin' ? '/admin' : '/instructor'}
                  className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-all flex items-center gap-2"
                >
                  
                  Go to {role === 'admin' ? 'Admin' : 'Instructor'} Dashboard <ArrowRight size={18} />
                </Link>
              ) : (
                
                <>
                  <Link
                    to="/register"
                    className="rounded-md bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-all flex items-center gap-2"
                  >
                    Get Started <ArrowRight size={18} />
                  </Link>
                  <Link to="/login" className="text-sm font-semibold leading-6 text-white hover:text-indigo-300 transition-colors">
                    Log In <span aria-hidden="true">→</span>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      
      <div className="bg-slate-900 py-24 sm:py-32 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">Deploy faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need to schedule your lectures
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              
              
              <motion.div 
                whileHover={{ y: -10 }}
                className="flex flex-col bg-white/5 p-6 rounded-2xl ring-1 ring-white/10 backdrop-blur-sm"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <ShieldCheck className="h-5 w-5 flex-none text-indigo-400" />
                  Conflict Guard™
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">Our proprietary algorithm blocks double bookings instantly. Never worry about assigning an instructor to two places at once again.</p>
                </dd>
              </motion.div>

              
              <motion.div 
                whileHover={{ y: -10 }}
                className="flex flex-col bg-white/5 p-6 rounded-2xl ring-1 ring-white/10 backdrop-blur-sm"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Users className="h-5 w-5 flex-none text-indigo-400" />
                  Instructor Hub
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">Manage your entire faculty in one dashboard. Assign courses, view availability, and track lecture loads effortlessly.</p>
                </dd>
              </motion.div>

              
              <motion.div 
                whileHover={{ y: -10 }}
                className="flex flex-col bg-white/5 p-6 rounded-2xl ring-1 ring-white/10 backdrop-blur-sm"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Calendar className="h-5 w-5 flex-none text-indigo-400" />
                  Visual Calendar
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">A crystal clear view of who is teaching what, and when. Interface designed for administrative speed and clarity.</p>
                </dd>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;