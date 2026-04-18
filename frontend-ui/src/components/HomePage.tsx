import React from 'react';
import DashboardStats from './DashboardStats';

const HomePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-10 py-12 space-y-12 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold text-gray-950 font-sans tracking-tight leading-tight">
          Welcome to <span className="bg-linear-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">Career Academy</span>
        </h1>
        <p className="text-lg font-medium text-gray-500 max-w-2xl leading-relaxed">
          Manage your educational ecosystem from one central hub. Streamline student tracking, course management, and academic evaluations.
        </p>
      </div>
      
      <DashboardStats />
    </div>
  );
};

export default HomePage;
