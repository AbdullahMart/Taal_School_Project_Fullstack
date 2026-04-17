import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Sparkles, GraduationCap, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: (token: string, user: {full_name: string, email: string}, rememberMe: boolean) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState(() => localStorage.getItem('rememberedEmail') || '');
  const [password, setPassword] = useState(() => localStorage.getItem('rememberedPassword') || '');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => localStorage.getItem('rememberMe') === 'true');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberedPassword', password);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
          localStorage.setItem('rememberMe', 'false');
        }
        onLogin(data.access_token, data.user, rememberMe);
        navigate('/');
      } else {
        setError(data.detail || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Connection to server failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC] antialiased">
      {/* Left Decoration Side (Visual) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-125 h-125 rounded-full bg-blue-600 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 rounded-full bg-indigo-600 blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-lg space-y-8 animate-in fade-in slide-in-from-left duration-1000">
           <div className="w-20 h-20 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] flex items-center justify-center border border-white/20 shadow-2xl">
              <GraduationCap className="text-white" size={40} />
           </div>
           
           <div className="space-y-4">
              <h1 className="text-6xl font-black text-white leading-tight tracking-tighter">
                Welcome to <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Career Academy</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium leading-relaxed">
                The most advanced educational management platform for modern schools and professional training centers.
              </p>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 space-y-2">
                 <div className="text-3xl font-black text-white">2.5k+</div>
                 <div className="text-slate-400 text-sm font-bold uppercase tracking-widest">Active Students</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 space-y-2">
                 <div className="text-3xl font-black text-white">98%</div>
                 <div className="text-slate-400 text-sm font-bold uppercase tracking-widest">Success Rate</div>
              </div>
           </div>
        </div>
      </div>

      {/* Right Login Side */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative">
        {/* Mobile Logo */}
        <div className="lg:hidden mb-12 flex items-center gap-3">
           <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
              <GraduationCap size={24} />
           </div>
           <span className="text-2xl font-black text-slate-900 tracking-tighter">Career Academy</span>
        </div>

        <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center lg:justify-start gap-3">
              Sign In <Sparkles className="text-orange-400" size={24} />
            </h2>
            <p className="text-slate-500 font-medium italic">Enter your credentials to access the dashboard</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <div className="w-1 h-1 bg-red-600 rounded-full" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Password</label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only" 
                  />
                  <div className="w-5 h-5 border-2 border-slate-200 rounded-lg group-hover:border-blue-400 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 shadow-sm" />
                  <div className="absolute inset-0 flex items-center justify-center text-white scale-0 peer-checked:scale-100 transition-transform duration-200">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot Password?</button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Login
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="pt-8 border-t border-slate-100 text-center">
             <p className="text-slate-500 font-medium">
               Don't have an account? <button className="text-blue-600 font-bold hover:underline">Contact Administrator</button>
             </p>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="absolute bottom-8 text-slate-400 text-sm font-medium tracking-tight">
          © 2026 Career Academy. All rights reserved.
        </div>
      </div>
    </div>
  );
}
