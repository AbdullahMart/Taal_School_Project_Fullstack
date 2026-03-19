import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Student } from '../types';
import { Search, Users, GraduationCap, MapPin, UserCircle, UserPlus, BookOpen } from 'lucide-react';

export default function StudentPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/students')
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching students:', err);
        // Fallback dummy data
        setStudents([
          { student_id: 1, first_name: 'Emma', last_name: 'Thompson', country: 'United Kingdom', age: 22, gender: 'Female', education_level: 'Bachelor', field_of_study: 'Computer Science' },
          { student_id: 2, first_name: 'Lukas', last_name: 'Müller', country: 'Germany', age: 24, gender: 'Male', education_level: 'Master', field_of_study: 'Data Science' },
          { student_id: 3, first_name: 'Sofia', last_name: 'Garcia', country: 'Spain', age: 21, gender: 'Female', education_level: 'High School', field_of_study: 'Artificial Intelligence' },
          { student_id: 4, first_name: 'Hiroshi', last_name: 'Tanaka', country: 'Japan', age: 23, gender: 'Male', education_level: 'PhD', field_of_study: 'Cyber Security' },
          { student_id: 5, first_name: 'Amara', last_name: 'Diallo', country: 'Senegal', age: 25, gender: 'Female', education_level: 'Bachelor', field_of_study: 'Software Engineering' },
          { student_id: 6, first_name: 'Mateo', last_name: 'Rossi', country: 'Italy', age: 22, gender: 'Male', education_level: 'Bachelor', field_of_study: 'Web Development' }
        ]);
        setLoading(false);
      });
  }, []);

  const filteredStudents = students.filter(s => 
    s.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-8 py-10 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-100">
              <Users size={14} />
              Student Directory
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">University Enrollment</h1>
            <p className="text-slate-500 font-medium italic">Global student database and academic levels</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group min-w-75">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search by name or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-2.5 bg-white rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm shadow-slate-200/50 text-sm"
              />
            </div>

            <button 
              onClick={() => navigate('/students/add')}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 active:scale-95 transition-all shadow-lg shadow-emerald-200"
            >
              <UserPlus size={18} />
              Add Student
            </button>
          </div>
        </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-64 bg-white rounded-4xl border border-slate-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden ring-1 ring-slate-100 ring-offset-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-600 border-b border-emerald-600">
                  <th className="px-8 py-6 text-sm font-bold text-white uppercase tracking-widest">Student</th>
                  <th className="px-6 py-6 text-sm font-bold text-white uppercase tracking-widest">Gender</th>
                  <th className="px-6 py-6 text-sm font-bold text-white uppercase tracking-widest text-center">Age</th>
                  <th className="px-6 py-6 text-sm font-bold text-white uppercase tracking-widest">Country</th>
                  <th className="px-6 py-6 text-sm font-bold text-white uppercase tracking-widest">Field of Study</th>
                  <th className="px-8 py-6 text-sm font-bold text-white uppercase tracking-widest text-right">Education Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                  <tr key={student.student_id} className="group hover:bg-slate-50/80 transition-all duration-300">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 group-hover:scale-110 group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                          <UserCircle size={24} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-lg">{student.first_name} {student.last_name}</div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-tight">ID: #{student.student_id.toString().padStart(4, '0')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${
                        student.gender === 'Female' ? 'bg-pink-50 text-pink-600 border-pink-100' : 
                        student.gender === 'Male' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                        'bg-slate-50 text-slate-600 border-slate-100'
                      }`}>
                        {student.gender}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-center">
                         <span className="text-lg font-black text-slate-800">{student.age}</span>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter -mt-1">Years</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/50 border border-slate-100 w-fit group-hover:bg-white group-hover:border-slate-200 transition-colors">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="text-sm font-bold text-slate-700">{student.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold border border-emerald-100 italic">
                        <BookOpen size={14} /> {student.field_of_study || 'N/A'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="inline-flex items-center gap-2 text-sm font-black text-slate-800 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm group-hover:border-blue-500/30 group-hover:text-blue-600 transition-all">
                        <GraduationCap size={16} className="text-blue-500" />
                        {student.education_level}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <div className="max-w-xs mx-auto space-y-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto text-slate-300">
                          <Users size={32} />
                        </div>
                        <h3 className="font-bold text-slate-900">No students found</h3>
                        <p className="text-sm text-slate-500">We couldn't find any results for "{searchTerm}". Try another search term.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
