import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, BookOpen, User, Settings, Menu, X, FileText } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Students', path: '/students', icon: <Users size={20} /> },
    { name: 'Courses', path: '/courses', icon: <BookOpen size={20} /> },
    { name: 'Exams', path: '/exams', icon: <FileText size={20} /> },
  ];

  return (
    <aside className={`bg-white shadow-xl transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col h-screen sticky top-0`}>
      <div className="p-6 flex items-center justify-between border-b border-gray-100">
        {isOpen && <h2 className="text-xl font-bold bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Career Academy</h2>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-orange-50 rounded-lg text-orange-600">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center space-x-4 p-3 rounded-xl transition-all ${
                isActive ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
              }`
            }
          >
            {item.icon}
            {isOpen && <span className="font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        {isOpen && (
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold text-gray-600">Version 1.0.0</p>
            <p className="text-[10px] text-gray-500 leading-tight">
              © 2026 Career Academy. All rights reserved.
            </p>
          </div>
        )}
        {!isOpen && (
          <div className="text-center">
            <p className="text-[8px] text-gray-500">v1.0.3</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
