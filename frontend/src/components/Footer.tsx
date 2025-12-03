import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-8 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-lg font-bold text-red-500 uppercase tracking-wider">
              Hermanos<span className="m-2 text-sm text-indigo-500">LiveScheduler</span>
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Made by <span className=" font-bold text-white font-medium">Atharva Sonnis</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-center md:text-right text-sm font-medium">
            
            <a 
              href="mailto:sonnisatharva2705@gmail.com" 
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              sonnisatharva2705@gmail.com
            </a>

            <a 
              href="tel:+918108686267" 
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              +91 8108 686 267
            </a>

            <a 
              href="https://www.linkedin.com/in/atharva-sonnis-968483188/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              LinkedIn
            </a>

            
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Resume
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Atharva Sonnis. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;