import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, BookOpen } from 'lucide-react';
import type { Lecture } from '../types';

const InstructorDashboard: React.FC = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLectures = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      try {
        const res = await axios.get<Lecture[]>('https://course-live-scheduler.onrender.com/api/instructor/my-lectures', {
          headers: { 'x-auth-token': token }
        });
        setLectures(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLectures();
  }, []);

  
  const getLevelBadge = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-900/30 text-green-300 border-green-800';
      case 'intermediate': return 'bg-yellow-900/30 text-yellow-300 border-yellow-800';
      case 'advanced': return 'bg-red-900/30 text-red-300 border-red-800';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold text-white">
            My Schedule
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Upcoming lectures assigned to you.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : lectures.length === 0 ? (
          <div className="text-center py-16 bg-slate-800 rounded-xl border border-slate-700">
            <div className="inline-flex p-3 rounded-full bg-slate-700 mb-4 text-slate-400">
              <Calendar size={24} />
            </div>
            <h3 className="text-lg font-medium text-white">No lectures assigned</h3>
            <p className="text-slate-400 mt-2 text-sm">You are free for now.</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {lectures.map((lec) => (
              <div 
                key={lec._id}
                className="group bg-slate-800 border border-slate-700 rounded-lg p-5 hover:border-indigo-500/50 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Date & Course Info */}
                  <div className="flex items-start gap-4">
                    {/* Calendar Box */}
                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-slate-900 rounded-lg border border-slate-700 shrink-0">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                        {new Date(lec.date).toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="text-xl font-bold text-white leading-none mt-0.5">
                        {new Date(lec.date).getDate()}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {lec.course.name}
                      </h3>
                      <div className="flex items-center gap-3 text-slate-400 text-xs mt-1.5">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          All Day
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} />
                          {lec.course.description.substring(0, 30)}...
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Level Badge */}
                  <div className="flex items-center gap-4 self-start sm:self-center">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getLevelBadge(lec.course.level)}`}>
                      {lec.course.level}
                    </span>
                    
                    <div className="hidden sm:block text-slate-600">
                      <ChevronRight size={18} />
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;