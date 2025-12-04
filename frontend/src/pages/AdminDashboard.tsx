import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { User, Course } from '../types';

interface ScheduleForm {
  courseId: string;
  instructorId: string;
  date: string;
}

const AdminDashboard: React.FC = () => {
  const [instructors, setInstructors] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  
  const [courseForm, setCourseForm] = useState({ name: '', level: '', description: '', image: '' });
  const [schedule, setSchedule] = useState<ScheduleForm>({ courseId: '', instructorId: '', date: '' });
  const [message, setMessage] = useState<string>('');

  const token = localStorage.getItem('token');
  const config = { headers: { 'x-auth-token': token } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instRes = await axios.get<User[]>('https://course-live-scheduler.onrender.com/api/admin/instructors', config);
        const courseRes = await axios.get<Course[]>('https://course-live-scheduler.onrender.com/api/admin/courses', config);
        setInstructors(instRes.data);
        setCourses(courseRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://course-live-scheduler.onrender.com/api/admin/add-course', courseForm, config);
      setMessage('Course Added Successfully!');
      const res = await axios.get<Course[]>('https://course-live-scheduler.onrender.com/api/admin/courses', config);
      setCourses(res.data);
    } catch (err) {
      setMessage('Error adding course');
    }
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('https://course-live-scheduler.onrender.com/api/admin/assign-lecture', schedule, config);
      setMessage('Lecture Scheduled Successfully!');
    } catch (err: any) {
      const errorMsg = err.response?.data?.msg || 'Error scheduling lecture';
      setMessage(errorMsg);
    }
  };

  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-md shadow-sm ${message.includes('Success') ? 'bg-green-50 text-green-700 border-l-4 border-green-400' : 'bg-red-50 text-red-700 border-l-4 border-red-400'}`}>
          <p className="font-medium">{message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Course</h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleAddCourse} className="space-y-4">
              <input 
                placeholder="Course Name" 
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 border"
                onChange={e => setCourseForm({...courseForm, name: e.target.value})} 
              />
              <select 
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 border bg-white"
                onChange={e => setCourseForm({...courseForm, level: e.target.value})}
              >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
              </select>
              <textarea 
                placeholder="Description" 
                rows={3}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 border"
                onChange={e => setCourseForm({...courseForm, description: e.target.value})} 
              />
              <input 
                placeholder="Image URL" 
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 border"
                onChange={e => setCourseForm({...courseForm, image: e.target.value})} 
              />
              
              
              <button 
                type="submit" 
                style={{ backgroundColor: '#4F46E5', color: 'white', padding: '10px', marginTop: '10px' }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 transition duration-150"
              >
                Add Course
              </button>
            </form>
          </div>
        </div>

        
        <div className="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Schedule Lecture</h3>
            <p className="mt-1 text-sm text-gray-500">Assign an instructor to a date.</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSchedule} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
                <select 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 border bg-white"
                  onChange={e => setSchedule({...schedule, courseId: e.target.value})}
                >
                  <option value="">-- Choose Course --</option>
                  {courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Instructor</label>
                <select 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 border bg-white"
                  onChange={e => setSchedule({...schedule, instructorId: e.target.value})}
                >
                  <option value="">-- Choose Instructor --</option>
                  {instructors.map(i => <option key={i._id} value={i._id}>{i.username}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input 
                  type="date" 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 border"
                  onChange={e => setSchedule({...schedule, date: e.target.value})} 
                />
              </div>
              
              
              <button 
                type="submit" 
                style={{ backgroundColor: '#1E293B', color: 'white', padding: '10px', marginTop: '10px' }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-slate-900 transition duration-150 mt-4"
              >
                Assign Lecture
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;