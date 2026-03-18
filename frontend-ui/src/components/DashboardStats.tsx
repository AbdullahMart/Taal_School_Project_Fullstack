import React, { useState, useEffect } from 'react';
import ReactCountryFlag from "react-country-flag";
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker 
} from 'react-simple-maps';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { MapPin, Info } from 'lucide-react';

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const mapData = [
  { name: "Germany", coordinates: [10.4515, 51.1657], count: 450, code: "DE" },
  { name: "United Kingdom", coordinates: [-3.436, 55.3781], count: 380, code: "GB" },
  { name: "Spain", coordinates: [-3.7492, 40.4637], count: 320, code: "ES" },
  { name: "Japan", coordinates: [138.2529, 36.2048], count: 290, code: "JP" },
  { name: "Senegal", coordinates: [-14.4524, 14.4974], count: 150, code: "SN" },
  { name: "USA", coordinates: [-95.7129, 37.0902], count: 600, code: "US" },
  { name: "Turkey", coordinates: [35.2433, 38.9637], count: 420, code: "TR" },
];

const studentData = [
  { name: 'Bachelor', count: 850, color: '#4f46e5' }, // Indigo-600
  { name: 'Master', count: 420, color: '#06b6d4' },   // Cyan-500
  { name: 'PhD', count: 120, color: '#8b5cf6' },      // Violet-500
  { name: 'High School', count: 230, color: '#f59e0b' }, // Amber-500
];

const techData = [
  { name: 'Cloud/AWS', count: 450, color: '#4f46e5' }, // Indigo-600
  { name: 'Python/AI', count: 320, color: '#06b6d4' }, // Cyan-500
  { name: 'React/Web', count: 280, color: '#f59e0b' }, // Amber-500
  { name: 'Data Sci', count: 210, color: '#ec4899' },  // Pink-500
];

const DashboardStats = () => {
  const [snackbar, setSnackbar] = useState<{ show: boolean; country: string; code: string }>({ show: false, country: '', code: '' });

  useEffect(() => {
    if (snackbar.show) {
      const timer = setTimeout(() => {
        setSnackbar({ show: false, country: '', code: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [snackbar.show]);

  const handleMarkerClick = (country: string, code: string) => {
    setSnackbar({ show: true, country, code });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 relative">
      {/* Snackbar */}
      {snackbar.show && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top fade-in duration-500">
          <div className="bg-slate-900/90 backdrop-blur-3xl text-white px-8 py-5 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] flex items-center gap-6 border border-white/10 ring-1 ring-white/10">
            <div className="w-16 h-16 bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border border-white/10">
              <ReactCountryFlag 
                countryCode={snackbar.code} 
                svg 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">Campus Online</p>
              </div>
              <p className="text-xl font-black tracking-tight">{snackbar.country} Academy</p>
              <p className="text-xs font-medium text-slate-400 italic">International Educational Hub</p>
            </div>
          </div>
        </div>
      )}

      {/* Harita Kartı */}
      <div className="bg-white p-10 rounded-4xl shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col h-[650px] lg:col-span-2">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Global Course Presence</h3>
            <p className="text-base font-medium text-slate-400 italic">Exploring our international campus network</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Active Hubs</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-[#001f3f] rounded-3xl overflow-hidden border border-white/5 relative shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center -mt-20">
            <ComposableMap projectionConfig={{ scale: 120, center: [10, 0] }} style={{ width: "110%", height: "auto" }}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isHighlighted = mapData.some(d => 
                      d.name === geo.properties.name || 
                      d.code === geo.properties.ISO_A2 || 
                      d.name === geo.properties.SOVEREIGNT ||
                      (geo.properties.name === "United States of America" && d.name === "USA")
                    );
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isHighlighted ? "#0074D9" : "transparent"}
                        stroke="#ffffff"
                        strokeWidth={0.5}
                        strokeOpacity={0.3}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "#39CCCC", outline: "none", transition: 'all 250ms' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
              {mapData.map(({ name, coordinates, count, code }) => (
                <Marker 
                  key={name} 
                  coordinates={coordinates as [number, number]}
                  onClick={() => handleMarkerClick(name, code)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle 
                    r={3} 
                    fill="#ffffff" 
                    className="animate-pulse"
                  />
                  <title>{`${name}: ${count} Students`}</title>
                </Marker>
              ))}
            </ComposableMap>
          </div>
        </div>
      </div>

      {/* Grafik Kartları - Alt Bölüm */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:col-span-2">
        {/* Field of Study - Sol */}
        <div className="bg-white p-8 rounded-4xl shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col h-[450px]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Field of Study</h3>
              <p className="text-sm font-medium text-slate-400 italic">Academic distribution</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
              <Info className="w-5 h-5 text-blue-500" />
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                  width={80}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={35}>
                  {studentData.map((entry, index) => (
                    <Cell key={`cell-f-${index}`} fill={entry.color} fillOpacity={0.9} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tech & Platform - Sağ */}
        <div className="bg-white p-8 rounded-4xl shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col h-[450px]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Tech & Platform</h3>
              <p className="text-sm font-medium text-slate-400 italic">Preferred technologies</p>
            </div>
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100">
              <MapPin className="w-5 h-5 text-indigo-500" />
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={techData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="count"
                  stroke="none"
                >
                  {techData.map((entry, index) => (
                    <Cell 
                      key={`cell-t-${index}`} 
                      fill={entry.color} 
                      className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
                    padding: '12px 20px'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-xs font-bold text-slate-600 ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;