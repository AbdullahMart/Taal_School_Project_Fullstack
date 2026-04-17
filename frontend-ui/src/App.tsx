import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProfileHeader from './components/ProfileHeader';
import HomePage from './components/HomePage';
import CoursePage from './components/CoursePage';
import StudentPage from './components/StudentPage';
import AddStudentPage from './components/AddStudentPage';
import EditStudentPage from './components/EditStudentPage';
import LoginPage from './components/LoginPage';
import ExamPage from './components/ExamPage';
import QuestionTable from './components/QuestionTable';
import type { Filters } from './types';
import { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('access_token') !== null || sessionStorage.getItem('access_token') !== null;
  });

  const [user, setUser] = useState<{full_name: string, email: string} | null>(() => {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [filters, setFilters] = useState<Filters>({
    level: 'All',
    skill: 'All',
    search: ''
  });

  const handleLogin = (token: string, userData: {full_name: string, email: string}, rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('access_token', token);
      sessionStorage.setItem('user', JSON.stringify(userData));
    }
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
  };

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-800 antialiased selection:bg-orange-100 selection:text-orange-900">
      {/* Sol Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Sağ Üst Profil Header */}
        <ProfileHeader user={user} onLogout={handleLogout} />

        {/* Ana İçerik Alanı */}
        <main className="flex-1 overflow-x-hidden">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />
            
            {/* Courses Page (Database Verilerini İçeren Yeni Tasarım) */}
            <Route path="/courses" element={<CoursePage />} />
            
            {/* Exams Page */}
            <Route path="/exams" element={<ExamPage />} />
            
            {/* Questions Page */}
            <Route path="/questions" element={
              <div className="max-w-7xl mx-auto px-8 py-10 space-y-8 animate-in slide-in-from-bottom duration-700">
                <div className="flex flex-col gap-2">
                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">Question Database</h1>
                   <p className="text-slate-500 font-medium italic">Filter and manage your academic content</p>
                </div>
                <div className="bg-white p-2 rounded-4xl shadow-2xl shadow-slate-200/50 border border-slate-100">
                   <FilterBar filters={filters} setFilters={setFilters} />
                </div>
                <div className="bg-white rounded-4xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden ring-1 ring-slate-100 ring-offset-8">
                   <QuestionTable filters={filters} />
                </div>
              </div>
            } />

            {/* Students Page */}
            <Route path="/students" element={<StudentPage />} />
            <Route path="/students/add" element={<AddStudentPage />} />
            <Route path="/students/edit/:id" element={<EditStudentPage />} />

            {/* Students Page Placeholder (Removed and Replaced by StudentPage) */}
          </Routes>
        </main>
      </div>
    </div>
  );
}
