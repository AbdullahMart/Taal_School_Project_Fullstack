import React, { useState } from 'react';
import { User, Settings, ChevronDown, Bell, LogOut } from 'lucide-react';

interface ProfileHeaderProps {
  user: { full_name: string; email: string } | null;
  onLogout?: () => void;
}

const ProfileHeader = ({ user, onLogout }: ProfileHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Kullanıcı adının baş harflerini al
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const fullName = user?.full_name || 'Admin User';
  const email = user?.email || 'admin@careeracademy.com';

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-end px-12 py-4 border-b border-gray-100 h-20">
      <div className="flex items-center space-x-8 pr-12">
        {/* Bildirim İkonu */}
        <button className="relative text-gray-500 hover:text-orange-600 transition-colors p-2 bg-white rounded-full shadow-sm hover:shadow-md">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>

        {/* Logout Butonu */}
        <button
          onClick={onLogout}
          className="text-gray-500 hover:text-red-600 transition-colors p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-red-50"
          title="Logout"
        >
          <LogOut size={20} />
        </button>

        {/* Profil Kısmı */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-4 bg-white p-2.5 rounded-2xl shadow-sm hover:shadow-md ring-1 ring-gray-100 hover:ring-orange-200 transition-all border border-gray-100"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white ring-2 ring-orange-200 shadow-lg shadow-orange-100 overflow-hidden font-bold">
               {getInitials(fullName)}
            </div>
            <div className="hidden sm:block text-left pr-2">
              <p className="text-sm font-bold text-gray-800 tracking-tight">{fullName}</p>
              <p className="text-[11px] font-semibold text-orange-600/80 uppercase tracking-widest leading-none mt-0.5">Administrator</p>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-600' : ''}`} />
          </button>

          {/* Profil Dropdown */}
          {isOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-200 origin-top-right overflow-hidden ring-1 ring-black/5">
              <div className="px-4 py-3 border-b border-gray-50 mb-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Account</p>
                <p className="text-sm font-medium text-gray-700 truncate">{email}</p>
              </div>
              
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors group">
                <div className="p-1.5 bg-gray-50 group-hover:bg-orange-100/50 rounded-lg transition-colors">
                  <User size={16} />
                </div>
                <span className="font-semibold tracking-tight">Edit Profile</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors group">
                <div className="p-1.5 bg-gray-50 group-hover:bg-orange-100/50 rounded-lg transition-colors">
                  <Settings size={16} />
                </div>
                <span className="font-semibold tracking-tight">Settings</span>
              </button>
              

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
