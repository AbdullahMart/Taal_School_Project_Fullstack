import React, { useEffect, useState } from 'react';
import type { StudentStat } from '../types';
import { Search, Globe, BookOpen, Clock, BarChart3, Star } from 'lucide-react';

const CoursePage = () => {
  const [stats, setStats] = useState<StudentStat[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/student-stats')
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching stats:', err);
        // Fallback dummy data
        setStats([
          { id: 1, student_id: 1, country: 'United Kingdom', field_of_study: 'Computer Science', platform_used: 'Coursera', learning_hours_per_week: 15, quiz_score: 92, assignment_score: 88, exam_score: 95, course_completion_rate: '95%' },
          { id: 2, student_id: 2, country: 'Germany', field_of_study: 'Data Science', platform_used: 'Udemy', learning_hours_per_week: 12, quiz_score: 85, assignment_score: 90, exam_score: 82, course_completion_rate: '78%' },
          { id: 3, student_id: 3, country: 'Spain', field_of_study: 'Artificial Intelligence', platform_used: 'edX', learning_hours_per_week: 20, quiz_score: 78, assignment_score: 75, exam_score: 80, course_completion_rate: '60%' },
          { id: 4, student_id: 4, country: 'Japan', field_of_study: 'Cyber Security', platform_used: 'Pluralsight', learning_hours_per_week: 10, quiz_score: 95, assignment_score: 98, exam_score: 91, course_completion_rate: '88%' },
          { id: 5, student_id: 5, country: 'Senegal', field_of_study: 'Software Engineering', platform_used: 'LinkedIn Learning', learning_hours_per_week: 18, quiz_score: 88, assignment_score: 82, exam_score: 85, course_completion_rate: '92%' }
        ]);
        setLoading(false);
      });
  }, []);

  const filteredStats = stats.filter(stat => 
    stat.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stat.field_of_study.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stat.platform_used.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-8 py-10 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Student Performance Dashboard</h1>
          <p className="text-slate-500 font-medium italic">Global learning trends and course metrics</p>
        </div>
        
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by country, study or platform..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500/20 transition-all outline-none font-medium text-slate-700 shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden ring-1 ring-slate-100 ring-offset-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-600 border-b border-emerald-600">
                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-white">Student Info</th>
                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-white">Field of Study</th>
                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-white">Tech & Platform</th>
                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-white text-center">Learning Stats</th>
                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-white text-center">Completion</th>
                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-white text-center">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-400 font-bold italic text-xl">Loading student records...</td>
                </tr>
              ) : filteredStats.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-400 font-bold italic text-xl">No records found matching your search.</td>
                </tr>
              ) : (
                filteredStats.map((stat) => (
                  <tr key={stat.student_id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">#{stat.student_id}</div>
                        <div>
                          <p className="font-bold text-slate-900 flex items-center gap-1.5">
                            <Globe size={14} className="text-slate-400" /> {stat.country}
                          </p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{stat.enrollment_date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold border border-blue-100 italic">
                        <BookOpen size={14} /> {stat.field_of_study}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-700">{stat.platform_used}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.device_used} • {stat.learning_mode}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-4">
                          <div className="text-center">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest line-clamp-1">Hrs/Day</p>
                            <p className="text-sm font-bold text-slate-900">{stat.daily_learning_hours}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest line-clamp-1">Quizzes</p>
                            <p className="text-sm font-bold text-slate-900">{stat.quizzes_attempted}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-full max-w-25 h-1.5 bg-slate-100 rounded-full overflow-hidden text-[0px]">
                           .
                          <div 
                            className="h-full bg-linear-to-r from-orange-400 to-orange-600 rounded-full"
                            style={{ width: `${stat.course_completion_rate}` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-orange-600 italic">%{stat.course_completion_rate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg font-black text-sm border border-amber-100 shadow-sm">
                        <Star size={14} className="fill-amber-600" /> {stat.satisfaction_score}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
