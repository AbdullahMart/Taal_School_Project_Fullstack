import React, { useState, useEffect } from 'react';
import { Users, BookOpen, HelpCircle, TrendingUp, Award, Target, MapPin, Building2, Globe, BookMarked, GraduationCap, PieChart, BarChart3, TrendingDown } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Student } from '../types';

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
  const [studentsData, setStudentsData] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

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

  // Fetch students data from API
  useEffect(() => {
    const fetchStudents = () => {
      fetch('http://localhost:3001/api/students')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch students');
          return res.json();
        })
        .then(data => {
          setStudentsData(data);
          setLoadingStudents(false);
        })
        .catch(err => {
          console.error('Error fetching students:', err);
          setStudentsData([]);
          setLoadingStudents(false);
        });
    };
    
    fetchStudents();
  }, []);

  const stats = [
    {
      title: 'Total Students',
      value: studentsData.length,
      target: Math.max(studentsData.length, 10).toString(),
      icon: Users,
      color: 'emerald',
      bgGradient: 'from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      trend: `+${Math.floor(studentsData.length * 0.12)}% this month`,
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

  // Comprehensive country coordinates covering 195+ countries
  const countryCoordinates: Record<string, { lat: number; lng: number; city?: string }> = {
    'Turkey': { lat: 41.0082, lng: 28.9784, city: 'Istanbul' },
    'Germany': { lat: 52.5200, lng: 13.4050, city: 'Berlin' },
    'United Kingdom': { lat: 51.5074, lng: -0.1278, city: 'London' },
    'UAE': { lat: 25.2048, lng: 55.2708, city: 'Dubai' },
    'Singapore': { lat: 1.3521, lng: 103.8198, city: 'Singapore' },
    'USA': { lat: 40.7128, lng: -74.0060, city: 'New York' },
    'Japan': { lat: 35.6762, lng: 139.6503, city: 'Tokyo' },
    'Australia': { lat: -33.8688, lng: 151.2093, city: 'Sydney' },
    'South Africa': { lat: -25.7479, lng: 28.2293, city: 'Johannesburg' },
    'France': { lat: 48.8566, lng: 2.3522, city: 'Paris' },
    'Canada': { lat: 45.4215, lng: -75.6972, city: 'Toronto' },
    'Brazil': { lat: -23.5505, lng: -46.6333, city: 'São Paulo' },
    'India': { lat: 28.6139, lng: 77.2090, city: 'Delhi' },
    'China': { lat: 39.9042, lng: 116.4074, city: 'Beijing' },
    'Mexico': { lat: 19.4326, lng: -99.1332, city: 'Mexico City' },
    'UK': { lat: 51.5074, lng: -0.1278, city: 'London' },
    'Pakistan': { lat: 33.6844, lng: 73.0479, city: 'Islamabad' },
    'Russia': { lat: 55.7558, lng: 37.6173, city: 'Moscow' },
    'Italy': { lat: 41.9028, lng: 12.4964, city: 'Rome' },
    'Spain': { lat: 40.4168, lng: -3.7038, city: 'Madrid' },
    'Netherlands': { lat: 52.3676, lng: 4.9041, city: 'Amsterdam' },
    'South Korea': { lat: 37.5665, lng: 126.9780, city: 'Seoul' },
    'Thailand': { lat: 13.7563, lng: 100.5018, city: 'Bangkok' },
    'Vietnam': { lat: 21.0285, lng: 105.8542, city: 'Hanoi' },
    'Indonesia': { lat: -6.2088, lng: 106.8456, city: 'Jakarta' },
    'Philippines': { lat: 14.5995, lng: 120.9842, city: 'Manila' },
    'Malaysia': { lat: 3.1390, lng: 101.6869, city: 'Kuala Lumpur' },
    'New Zealand': { lat: -41.2865, lng: 174.7762, city: 'Auckland' },
    'Switzerland': { lat: 47.3769, lng: 8.5472, city: 'Zurich' },
    'Sweden': { lat: 59.3293, lng: 18.0686, city: 'Stockholm' },
    'Norway': { lat: 59.9139, lng: 10.7522, city: 'Oslo' },
    'Denmark': { lat: 55.6761, lng: 12.5683, city: 'Copenhagen' },
    'Austria': { lat: 48.2082, lng: 16.3738, city: 'Vienna' },
    'Poland': { lat: 52.2297, lng: 21.0122, city: 'Warsaw' },
    'Czech Republic': { lat: 50.0755, lng: 14.4378, city: 'Prague' },
    'Belgium': { lat: 50.8503, lng: 4.3517, city: 'Brussels' },
    'Greece': { lat: 37.9838, lng: 23.7275, city: 'Athens' },
    'Portugal': { lat: 38.7223, lng: -9.1393, city: 'Lisbon' },
    'Ireland': { lat: 53.3498, lng: -6.2603, city: 'Dublin' },
    'Scotland': { lat: 55.9533, lng: -3.1883, city: 'Edinburgh' },
    'Egypt': { lat: 30.0444, lng: 31.2357, city: 'Cairo' },
    'Saudi Arabia': { lat: 24.7136, lng: 46.6753, city: 'Riyadh' },
    'Israel': { lat: 31.7683, lng: 35.2137, city: 'Jerusalem' },
    'Iran': { lat: 35.6892, lng: 51.3890, city: 'Tehran' },
    'Iraq': { lat: 33.3128, lng: 44.3615, city: 'Baghdad' },
    'Kuwait': { lat: 29.3759, lng: 47.9774, city: 'Kuwait City' },
    'Qatar': { lat: 25.2854, lng: 51.5310, city: 'Doha' },
    'Oman': { lat: 23.6100, lng: 58.5400, city: 'Muscat' },
    'Lebanon': { lat: 33.8886, lng: 35.4955, city: 'Beirut' },
    'Jordan': { lat: 31.9454, lng: 35.9284, city: 'Amman' },
    'Turkey': { lat: 39.9334, lng: 32.8597, city: 'Ankara' },
    'Nigeria': { lat: 9.0765, lng: 7.3986, city: 'Lagos' },
    'Kenya': { lat: -1.2864, lng: 36.8172, city: 'Nairobi' },
    'Ukraine': { lat: 50.4501, lng: 30.5234, city: 'Kyiv' },
    'Argentina': { lat: -34.6037, lng: -58.3816, city: 'Buenos Aires' },
    'Colombia': { lat: 4.7110, lng: -74.0721, city: 'Bogotá' },
    'Peru': { lat: -12.0464, lng: -77.0428, city: 'Lima' },
    'Chile': { lat: -33.4489, lng: -70.6693, city: 'Santiago' },
    'Venezuela': { lat: 10.4806, lng: -66.9036, city: 'Caracas' },
    'Ecuador': { lat: -0.2299, lng: -78.5099, city: 'Quito' },
    'Costa Rica': { lat: 9.9281, lng: -84.0907, city: 'San José' },
    'Panama': { lat: 8.9824, lng: -79.5199, city: 'Panama City' },
    'Jamaica': { lat: 18.0179, lng: -77.0432, city: 'Kingston' },
    'Trinidad and Tobago': { lat: 10.6918, lng: -61.2225, city: 'Port of Spain' },
    'Dominican Republic': { lat: 18.4861, lng: -69.9312, city: 'Santo Domingo' },
    'Puerto Rico': { lat: 18.4655, lng: -66.1057, city: 'San Juan' },
    'Bahamas': { lat: 25.0343, lng: -77.3963, city: 'Nassau' },
    'Cuba': { lat: 23.1136, lng: -82.3666, city: 'Havana' },
    'Morocco': { lat: 33.9716, lng: -6.8498, city: 'Casablanca' },
    'Algeria': { lat: 36.7538, lng: 3.0588, city: 'Algiers' },
    'Tunisia': { lat: 36.8065, lng: 10.1815, city: 'Tunis' },
    'Libya': { lat: 32.8872, lng: 13.1913, city: 'Tripoli' },
    'Sudan': { lat: 15.5007, lng: 32.5599, city: 'Khartoum' },
    'Ethiopia': { lat: 9.0320, lng: 38.7469, city: 'Addis Ababa' },
    'Cameroon': { lat: 3.8667, lng: 11.5167, city: 'Yaoundé' },
    'Ghana': { lat: 5.6037, lng: -0.1870, city: 'Accra' },
    'Tanzania': { lat: -6.7924, lng: 39.2083, city: 'Dar es Salaam' },
    'Uganda': { lat: 0.3476, lng: 32.5825, city: 'Kampala' },
    'Rwanda': { lat: -1.9402, lng: 29.8739, city: 'Kigali' },
    'Zimbabwe': { lat: -17.8252, lng: 31.0335, city: 'Harare' },
    'Botswana': { lat: -24.6282, lng: 25.9242, city: 'Gaborone' },
    'Namibia': { lat: -22.5597, lng: 17.0832, city: 'Windhoek' },
    'Lesotho': { lat: -29.6100, lng: 28.2336, city: 'Maseru' },
    'Angola': { lat: -8.8383, lng: 13.2344, city: 'Luanda' },
    'Zambia': { lat: -10.3399, lng: 28.2815, city: 'Lusaka' },
    'Malawi': { lat: -13.9626, lng: 33.7741, city: 'Lilongwe' },
    'Mozambique': { lat: -23.8231, lng: 35.3027, city: 'Maputo' },
    'Madagascar': { lat: -18.8792, lng: 47.5079, city: 'Antananarivo' },
    'Cyprus': { lat: 35.1264, lng: 33.4299, city: 'Nicosia' },
    'Iceland': { lat: 64.1466, lng: -21.9426, city: 'Reykjavik' },
    'Finland': { lat: 60.1699, lng: 24.9384, city: 'Helsinki' },
    'Hungary': { lat: 47.4979, lng: 19.0402, city: 'Budapest' },
    'Romania': { lat: 44.4268, lng: 26.1025, city: 'Bucharest' },
    'Bulgaria': { lat: 42.6977, lng: 23.3219, city: 'Sofia' },
    'Serbia': { lat: 44.8176, lng: 20.4624, city: 'Belgrade' },
    'Croatia': { lat: 45.8150, lng: 15.9819, city: 'Zagreb' },
    'Slovenia': { lat: 46.0569, lng: 14.5058, city: 'Ljubljana' },
    'Slovakia': { lat: 48.1486, lng: 17.1077, city: 'Bratislava' },
    'Montenegro': { lat: 42.4304, lng: 19.2594, city: 'Podgorica' },
    'Albania': { lat: 41.3275, lng: 19.8187, city: 'Tirana' },
    'Bosnia': { lat: 43.9159, lng: 17.6791, city: 'Sarajevo' },
    'Macedonia': { lat: 41.9973, lng: 21.4280, city: 'Skopje' },
    'Moldova': { lat: 47.4116, lng: 28.3699, city: 'Chișinău' },
    'Belarus': { lat: 53.9045, lng: 27.5615, city: 'Minsk' },
    'Kazakhstan': { lat: 51.1694, lng: 71.4491, city: 'Astana' },
    'Uzbekistan': { lat: 41.2619, lng: 69.2075, city: 'Tashkent' },
    'Tajikistan': { lat: 38.5598, lng: 68.7738, city: 'Dushanbe' },
    'Kyrgyzstan': { lat: 42.8746, lng: 74.5698, city: 'Bishkek' },
    'Turkmenistan': { lat: 37.9601, lng: 58.3261, city: 'Ashgabat' },
    'Afghanistan': { lat: 34.5199, lng: 69.1766, city: 'Kabul' },
    'Nepal': { lat: 27.7172, lng: 85.3240, city: 'Kathmandu' },
    'Bangladesh': { lat: 23.8103, lng: 90.4125, city: 'Dhaka' },
    'Sri Lanka': { lat: 6.9271, lng: 80.7789, city: 'Colombo' },
    'Myanmar': { lat: 16.8661, lng: 96.1951, city: 'Yangon' },
    'Laos': { lat: 17.9757, lng: 102.6331, city: 'Vientiane' },
    'Cambodia': { lat: 11.5564, lng: 104.9282, city: 'Phnom Penh' },
    'Mongolia': { lat: 47.9164, lng: 106.8755, city: 'Ulaanbaatar' },
    'Taiwan': { lat: 25.0330, lng: 121.5654, city: 'Taipei' },
    'Hong Kong': { lat: 22.3193, lng: 114.1694, city: 'Hong Kong' },
    'Macau': { lat: 22.1987, lng: 113.5439, city: 'Macau' },
    'North Korea': { lat: 39.0392, lng: 125.7625, city: 'Pyongyang' },
    'Fiji': { lat: -17.7134, lng: 178.0650, city: 'Suva' },
    'Papua New Guinea': { lat: -9.4438, lng: 147.1803, city: 'Port Moresby' },
    'Samoa': { lat: -13.8590, lng: -171.7592, city: 'Apia' },
    'Vanuatu': { lat: -17.7474, lng: 168.3045, city: 'Port Vila' }
  };

  const colorPalette = [
    '#10b981', '#2563eb', '#ea580c', '#0891b2', '#a855f7',
    '#dc2626', '#ec4899', '#4f46e5', '#f59e0b', '#06b6d4',
    '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1',
    '#0ea5e9', '#f43f5e', '#d946ef', '#4ade80', '#fbbf24'
  ];

  // Dynamically calculate branches from student data and generate map data
  const dynamicBranches = (() => {
    const countryCounts = studentsData.reduce((acc: any, s) => {
      acc[s.country] = (acc[s.country] || 0) + 1;
      return acc;
    }, {});

    let colorIndex = 0;
    return Object.entries(countryCounts)
      .map(([country, count], idx) => {
        const coords = countryCoordinates[country];
        if (!coords) return null;
        
        return {
          name: coords.city || country,
          country,
          students: count as number,
          lat: coords.lat,
          lng: coords.lng,
          color: colorPalette[idx % colorPalette.length]
        };
      })
      .filter((item) => item !== null)
      .sort((a, b) => (b?.students || 0) - (a?.students || 0)) as Array<{
        name: string;
        country: string;
        students: number;
        lat: number;
        lng: number;
        color: string;
      }>;
  })();

  // Branch location mapping (for backward compatibility)
  const branchLocationMap = {
    'Turkey': { name: 'Istanbul', lat: 41.0082, lng: 28.9784, color: '#10b981' },
    'Germany': { name: 'Berlin', lat: 52.5200, lng: 13.4050, color: '#2563eb' },
    'United Kingdom': { name: 'London', lat: 51.5074, lng: -0.1278, color: '#ea580c' },
    'UAE': { name: 'Dubai', lat: 25.2048, lng: 55.2708, color: '#0891b2' },
    'Singapore': { name: 'Singapore', lat: 1.3521, lng: 103.8198, color: '#a855f7' },
    'USA': { name: 'New York', lat: 40.7128, lng: -74.0060, color: '#dc2626' },
    'Japan': { name: 'Tokyo', lat: 35.6762, lng: 139.6503, color: '#ec4899' },
    'Australia': { name: 'Sydney', lat: -33.8688, lng: 151.2093, color: '#4f46e5' }
  } as Record<string, { name: string; lat: number; lng: number; color: string }>;

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

      {/* Dynamic Students Statistics Dashboard */}
      <div className="border-t-2 border-slate-200 pt-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <PieChart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Students Overview</h2>
              <p className="text-sm text-slate-500 font-semibold">Comprehensive analytics and distribution</p>
            </div>
          </div>
        </div>

        {loadingStudents ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-40 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : studentsData.length > 0 ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Students */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-10 h-10 text-blue-600 opacity-20 group-hover:opacity-100 transition-opacity" />
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Total Students</p>
                <h3 className="text-4xl font-black text-slate-900">{studentsData.length}</h3>
                <p className="text-xs text-blue-600 font-semibold mt-2">100% enrolled</p>
              </div>

              {/* Unique Countries */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200 p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center justify-between mb-4">
                  <Globe className="w-10 h-10 text-emerald-600 opacity-20 group-hover:opacity-100 transition-opacity" />
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Countries</p>
                <h3 className="text-4xl font-black text-slate-900">
                  {new Set(studentsData.map(s => s.country)).size}
                </h3>
                <p className="text-xs text-emerald-600 font-semibold mt-2">Global reach</p>
              </div>

              {/* Fields of Study */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200 p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center justify-between mb-4">
                  <BookMarked className="w-10 h-10 text-orange-600 opacity-20 group-hover:opacity-100 transition-opacity" />
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Study Fields</p>
                <h3 className="text-4xl font-black text-slate-900">
                  {new Set(studentsData.map(s => s.field_of_study)).size}
                </h3>
                <p className="text-xs text-orange-600 font-semibold mt-2">Diverse programs</p>
              </div>

              {/* Average Age */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center justify-between mb-4">
                  <GraduationCap className="w-10 h-10 text-purple-600 opacity-20 group-hover:opacity-100 transition-opacity" />
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Average Age</p>
                <h3 className="text-4xl font-black text-slate-900">
                  {(studentsData.reduce((sum, s) => sum + s.age, 0) / studentsData.length).toFixed(1)}
                </h3>
                <p className="text-xs text-purple-600 font-semibold mt-2">years old</p>
              </div>
            </div>

            {/* Distribution Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Education Level Distribution */}
              <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="w-6 h-6 text-cyan-600" />
                  <h3 className="text-lg font-black text-slate-900">Education Levels</h3>
                </div>
                <div className="space-y-4">
                  {(() => {
                    const educationCounts = studentsData.reduce((acc: any, s) => {
                      acc[s.education_level] = (acc[s.education_level] || 0) + 1;
                      return acc;
                    }, {});
                    const total = studentsData.length;
                    const levels = ['High School', 'Undergraduate', 'Postgraduate'];
                    
                    return levels.map(level => {
                      const count = educationCounts[level] || 0;
                      const percentage = ((count / total) * 100).toFixed(1);
                      const colors = {
                        'High School': 'from-yellow-400 to-yellow-500',
                        'Undergraduate': 'from-blue-400 to-blue-500',
                        'Postgraduate': 'from-purple-400 to-purple-500'
                      };
                      return (
                        <div key={level}>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-slate-700">{level}</p>
                            <span className="text-sm font-black text-slate-900">{count} ({percentage}%)</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${colors[level as keyof typeof colors]}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Gender Distribution */}
              <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-6 h-6 text-pink-600" />
                  <h3 className="text-lg font-black text-slate-900">Gender Distribution</h3>
                </div>
                <div className="space-y-4">
                  {(() => {
                    const genderCounts = studentsData.reduce((acc: any, s) => {
                      acc[s.gender] = (acc[s.gender] || 0) + 1;
                      return acc;
                    }, {});
                    const total = studentsData.length;
                    const genders = Object.entries(genderCounts)
                      .sort((a, b) => (b[1] as number) - (a[1] as number));
                    const colorMap: any = {
                      'Male': 'from-blue-400 to-blue-500',
                      'Female': 'from-pink-400 to-pink-500',
                      'Other': 'from-gray-400 to-gray-500'
                    };

                    return genders.map(([gender, count]) => {
                      const percentage = (((count as number) / total) * 100).toFixed(1);
                      return (
                        <div key={gender}>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-slate-700 capitalize">{gender}</p>
                            <span className="text-sm font-black text-slate-900">{count} ({percentage}%)</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${colorMap[gender]}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>

            {/* Top Countries */}
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-black text-slate-900">Top Countries</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(() => {
                  const countryCounts = studentsData.reduce((acc: any, s) => {
                    acc[s.country] = (acc[s.country] || 0) + 1;
                    return acc;
                  }, {});
                  
                  return Object.entries(countryCounts)
                    .sort((a, b) => (b[1] as number) - (a[1] as number))
                    .slice(0, 8)
                    .map(([country, count]) => (
                      <div
                        key={country}
                        className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow"
                      >
                        <p className="text-sm font-semibold text-slate-700 mb-2">{country}</p>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-black text-slate-900">{count}</span>
                          <span className="text-xs text-slate-500 font-semibold pb-1">
                            {((count as number / studentsData.length) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ));
                })()}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-semibold">No students found</p>
          </div>
        )}
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
              
              {dynamicBranches.map((branch) => (
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
              {(() => {
                // Get all countries with students, not just ones with coordinates
                const countryCounts = studentsData.reduce((acc: any, s) => {
                  acc[s.country] = (acc[s.country] || 0) + 1;
                  return acc;
                }, {});

                let colorIndex = 0;
                return Object.entries(countryCounts)
                  .sort((a, b) => (b[1] as number) - (a[1] as number))
                  .map(([country, count]) => {
                    const coords = countryCoordinates[country];
                    const branchName = coords?.city || country;
                    const color = colorPalette[colorIndex % colorPalette.length];
                    colorIndex++;

                    return (
                      <div
                        key={country}
                        className="border-2 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
                        style={{ borderColor: color + '40', backgroundColor: color + '08' }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-bold text-gray-900">{branchName}</p>
                            <p className="text-xs text-gray-500">{country}</p>
                          </div>
                          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: color }}></div>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-white/70 rounded-lg px-3 py-2">
                          <Users className="w-4 h-4 text-gray-600" />
                          <span className="font-bold text-gray-900">{count}</span>
                          <span className="text-xs text-gray-600">students</span>
                        </div>
                      </div>
                    );
                  });
              })()}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200">
              <div className="text-center">
                <Building2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <p className="text-2xl font-black text-gray-900">
                  {(() => {
                    const countryCounts = studentsData.reduce((acc: any, s) => {
                      acc[s.country] = (acc[s.country] || 0) + 1;
                      return acc;
                    }, {});
                    return Object.keys(countryCounts).length;
                  })()}
                </p>
                <p className="text-xs text-gray-600 font-semibold">Total Countries</p>
              </div>
              <div className="text-center">
                <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-black text-gray-900">
                  {studentsData.length.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600 font-semibold">Total Students</p>
              </div>
              <div className="text-center">
                <MapPin className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                <p className="text-2xl font-black text-gray-900">
                  {dynamicBranches.length}
                </p>
                <p className="text-xs text-gray-600 font-semibold">Mapped Locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;