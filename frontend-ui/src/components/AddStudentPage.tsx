import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft, Save, User, MapPin, GraduationCap, Calendar, VenusAndMars, BookOpen } from 'lucide-react';

export default function AddStudentPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    country: '',
    age: '',
    gender: 'Male',
    education_level: 'Bachelor',
    field_of_study: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age)
        }),
      });

      if (response.ok) {
        navigate('/students');
      } else {
        alert('Error adding student');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-10 space-y-8 animate-in slide-in-from-bottom duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <button 
            onClick={() => navigate('/students')}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors mb-4 group text-sm"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Directory
          </button>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-200">
              <UserPlus size={32} />
            </div>
            Enroll New Student
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 ring-1 ring-slate-100 ring-offset-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Name */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <User size={16} /> First Name
              </label>
              <input
                required
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Ex: John"
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <User size={16} /> Last Name
              </label>
              <input
                required
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Ex: Doe"
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
              />
            </div>

            {/* Country */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={16} /> Country
              </label>
              <input
                required
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Ex: USA"
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
              />
            </div>

            {/* Age */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={16} /> Age
              </label>
              <input
                required
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Ex: 22"
                min="1"
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
              />
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <VenusAndMars size={16} /> Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium appearance-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Education Level */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <GraduationCap size={16} /> Education Level
              </label>
              <select
                name="education_level"
                value={formData.education_level}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium appearance-none"
              >
                <option value="High School">High School</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            {/* Field of Study */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <BookOpen size={16} /> Field of Study
              </label>
              <input
                name="field_of_study"
                value={formData.field_of_study}
                onChange={handleChange}
                placeholder="Ex: Computer Science"
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              disabled={loading}
              type="submit"
              className="flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-3xl font-black text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-200 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (
                <>
                  <Save size={20} />
                  Save Student Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
