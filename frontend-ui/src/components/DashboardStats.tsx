import React, { useState, useEffect } from 'react';
import { Users, BookOpen, HelpCircle, TrendingUp, Award, Target, MapPin, Building2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createColoredIcon = (color: string) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"></div>`,
    iconSize: [30, 30],
    className: 'custom-icon'
  });
};

const DashboardStats = () => {
  const [counters, setCounters] = useState({
    students: 0,
    courses: 0,
    questions: 0,
    exams: 0
  });

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    const targets = { students: 1240, courses: 48, questions: 4120, exams: 156 };
    
    ['students', 'courses', 'questions', 'exams'].forEach((key) => {
      let current = 0;
      const target = targets[key as keyof typeof targets];
      const increment = Math.ceil(target / 50);
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setCounters(prev => ({ ...prev, [key]: current }));
      }, 30);
      
      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const stats = [
    {
      title: 'Total Students',
      value: counters.students,
      target: '1,240',
      icon: Users,
      color: 'emerald',
      bgGradient: 'from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      trend: '+12% this month',
      trendColor: 'text-emerald-600',
      progressColor: 'from-emerald-400 to-emerald-600'
    },
    {
      title: 'Active Courses',
      value: counters.courses,
      target: '48',
      icon: BookOpen,
      color: 'orange',
      bgGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      trend: '+5 courses',
      trendColor: 'text-orange-600',
      progressColor: 'from-orange-400 to-orange-600'
    },
    {
      title: 'Question Bank',
      value: counters.questions,
      target: '4,120',
      icon: HelpCircle,
      color: 'cyan',
      bgGradient: 'from-cyan-50 to-cyan-100',
      borderColor: 'border-cyan-200',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-700',
      trend: '+8% growth',
      trendColor: 'text-cyan-700',
      progressColor: 'from-cyan-400 to-cyan-700'
    },
    {
      title: 'Available Exams',
      value: counters.exams,
      target: '156',
      icon: Award,
      color: 'blue',
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trend: '+3 new',
      trendColor: 'text-blue-600',
      progressColor: 'from-blue-400 to-blue-600'
    }
  ];

  // Academy şubeleri
  const branches = [
    { name: 'Istanbul', country: 'Turkey', students: 450, lat: 41.0082, lng: 28.9784, color: '#10b981' },
    { name: 'Berlin', country: 'Germany', students: 320, lat: 52.5200, lng: 13.4050, color: '#2563eb' },
    { name: 'London', country: 'United Kingdom', students: 280, lat: 51.5074, lng: -0.1278, color: '#ea580c' },
    { name: 'Dubai', country: 'UAE', students: 310, lat: 25.2048, lng: 55.2708, color: '#0891b2' },
    { name: 'Singapore', country: 'Singapore', students: 290, lat: 1.3521, lng: 103.8198, color: '#a855f7' },
    { name: 'New York', country: 'USA', students: 380, lat: 40.7128, lng: -74.0060, color: '#dc2626' },
    { name: 'Tokyo', country: 'Japan', students: 350, lat: 35.6762, lng: 139.6503, color: '#ec4899' },
    { name: 'Sydney', country: 'Australia', students: 270, lat: -33.8688, lng: 151.2093, color: '#4f46e5' }
  ];

  return (
    <div className="space-y-8 mt-12">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.bgGradient} rounded-4xl border ${stat.borderColor} p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden relative`}
            >
              {/* Animated Background Element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/30 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/20 rounded-full -ml-8 -mb-8 group-hover:scale-125 transition-transform duration-500" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.iconBg} p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`${stat.iconColor} w-6 h-6`} />
                  </div>
                  <TrendingUp className={`${stat.trendColor} w-5 h-5 opacity-60`} />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <p className="text-gray-600 font-semibold text-sm">{stat.title}</p>
                  
                  {/* Counter with Animation */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-gray-900 tracking-tight">
                      {stat.value.toString().padStart(3, ' ')}
                    </span>
                    <span className="text-sm text-gray-500 font-semibold">
                      / {stat.target}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full bg-gradient-to-r ${stat.progressColor} rounded-full transition-all duration-500 ease-out`}
                        style={{
                          width: `${Math.min((stat.value / parseInt(stat.target.replace(',', ''))) * 100, 100)}%`
                        }}
                      />
                    </div>
                    <p className={`text-xs font-bold ${stat.trendColor}`}>
                      {stat.trend}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completion Rate */}
        <div className="bg-white rounded-4xl border border-slate-100 p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Course Completion</h3>
              <p className="text-sm text-slate-500 italic">Average rate</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="relative h-32 flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle cx="56" cy="56" r="50" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="8"
                  strokeDasharray={`${3.14 * 100 * (82 / 100)} 314`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute text-center">
                <p className="text-3xl font-black text-slate-900">82%</p>
                <p className="text-xs text-slate-500 font-semibold">Overall</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Engagement */}
        <div className="bg-white rounded-4xl border border-slate-100 p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Engagement</h3>
              <p className="text-sm text-slate-500 italic">Weekly activity</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Active Users', value: '956', color: 'bg-orange-600' },
              { label: 'Completed Tasks', value: '2,340', color: 'bg-orange-500' },
              { label: 'Avg. Session', value: '45 min', color: 'bg-orange-400' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-600">{item.label}</p>
                <span className={`px-3 py-1 rounded-lg text-sm font-black text-white ${item.color}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-4xl border border-slate-100 p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Quick Stats</h3>
              <p className="text-sm text-slate-500 italic">This month</p>
            </div>
            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-cyan-700" />
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'New Students', value: '142', trend: '+8%', color: 'text-emerald-600' },
              { label: 'New Questions', value: '456', trend: '+12%', color: 'text-cyan-700' },
              { label: 'Pass Rate', value: '89%', trend: '+3%', color: 'text-blue-600' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-600">{item.label}</p>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900">{item.value}</span>
                  <span className={`text-xs font-bold ${item.color}`}>{item.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Leaflet Map */}
      <div className="mt-16 border-t-2 border-slate-200 pt-12">
        <div className="flex items-center gap-3 mb-8">
          <MapPin className="w-8 h-8 text-emerald-600" />
          <h2 className="text-3xl font-black text-gray-900">Academy Global Branches</h2>
        </div>
        
        <div className="bg-white rounded-4xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="h-[500px] w-full">
            <MapContainer
              center={[20, 10]}
              zoom={2}
              style={{ height: '100%', width: '100%' }}
              className="rounded-4xl"
            >
              <TileLayer
                attribution='&copy; ESRI'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
              />
              
              {branches.map((branch) => (
                <Marker
                  key={branch.name}
                  position={[branch.lat, branch.lng]}
                  icon={createColoredIcon(branch.color)}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 text-center">
                      <p className="font-bold text-gray-900">{branch.name}</p>
                      <p className="text-sm text-gray-600">{branch.country}</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{branch.students} students</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Branch Information Grid */}
          <div className="bg-gradient-to-b from-slate-50 to-white p-8">
            <h3 className="text-xl font-black text-gray-900 mb-6">Global Presence</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {branches.map((branch) => (
                <div
                  key={branch.name}
                  className="border-2 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
                  style={{ borderColor: branch.color + '40', backgroundColor: branch.color + '08' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{branch.name}</p>
                      <p className="text-xs text-gray-500">{branch.country}</p>
                    </div>
                    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: branch.color }}></div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white/70 rounded-lg px-3 py-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="font-bold text-gray-900">{branch.students}</span>
                    <span className="text-xs text-gray-600">students</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200">
              <div className="text-center">
                <Building2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <p className="text-2xl font-black text-gray-900">{branches.length}</p>
                <p className="text-xs text-gray-600 font-semibold">Branches</p>
              </div>
              <div className="text-center">
                <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-black text-gray-900">
                  {branches.reduce((sum, b) => sum + b.students, 0).toLocaleString()}
                </p>
                <p className="text-xs text-gray-600 font-semibold">Total Students</p>
              </div>
              <div className="text-center">
                <MapPin className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                <p className="text-2xl font-black text-gray-900">
                  {new Set(branches.map(b => b.country)).size}
                </p>
                <p className="text-xs text-gray-600 font-semibold">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;