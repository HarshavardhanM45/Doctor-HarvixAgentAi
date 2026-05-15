import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Send, 
  ShieldCheck, 
  Activity, 
  AlertCircle, 
  User, 
  Search,
  MessageSquare,
  Clock,
  Sun,
  Moon
} from 'lucide-react';

function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleConsult = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`http://localhost:8000/query?user_query=${encodeURIComponent(query)}`, {
        method: 'POST',
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({
        status: 'error',
        response: 'Emergency: Failed to connect to the medical server. Please ensure the backend is running.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-medical-500 p-2 rounded-xl text-white">
            <Stethoscope size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Doctor Harvix</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">System Active</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-medical-600 cursor-pointer transition-colors">
            <ShieldCheck size={18} />
            <span className="text-sm font-medium">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-medical-600 cursor-pointer transition-colors">
            <Activity size={18} />
            <span className="text-sm font-medium">Real-time Diagnostics</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition-colors">
            <User size={20} className="text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 leading-tight">
              Advanced Medical <span className="text-medical-600">AI Consultation</span>
            </h2>
            <p className="text-medical-600 font-bold text-lg mb-6 flex items-center gap-2">
               <span className="w-2 h-2 bg-medical-500 rounded-full"></span>
               Hey, I'm Doctor Harvix — Your Personal Clinical Intelligence
            </p>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
              Experience next-generation clinical intelligence. Describe your symptoms or ask complex medical questions for an immediate, data-driven analysis from Doctor Harvix.
            </p>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-medical-400 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src="/doctor.png" 
                alt="Doctor Harvix" 
                className="relative rounded-3xl shadow-2xl w-full max-w-sm float-animation border-4 border-white"
              />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8 transition-all hover:shadow-2xl hover:shadow-slate-300/50">
          <form onSubmit={handleConsult} className="p-6">
            <div className="relative">
              <textarea
                className="w-full text-lg text-slate-800 placeholder-slate-400 bg-slate-50/50 rounded-2xl p-6 min-h-[160px] border-2 border-transparent focus:border-medical-500 focus:bg-white outline-none transition-all resize-none"
                placeholder="How can I help you today? E.g., 'What are the treatment options for hypertension?'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <span className="text-xs text-slate-400 font-medium bg-white px-2 py-1 rounded-md border border-slate-100">
                  {query.length} chars
                </span>
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="bg-medical-600 hover:bg-medical-700 disabled:opacity-50 disabled:grayscale text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-medical-200 transition-all hover:-translate-y-0.5"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Consult AI</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
          
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500 font-medium">
             <div className="flex items-center gap-1">
               <Clock size={14} />
               <span>Avg. Response: 2.1s</span>
             </div>
             <div className="flex items-center gap-1">
               <Search size={14} />
               <span>Searching Medical Data</span>
             </div>
          </div>
        </div>

        {/* Results Area */}
        {result && (
          <div className={`animate-in fade-in slide-in-from-bottom-6 duration-500`}>
             <div className={`p-8 rounded-3xl border-2 shadow-sm ${
               result.status === 'blocked' ? 'bg-amber-50 border-amber-100' : 
               result.status === 'error' ? 'bg-rose-50 border-rose-100' : 
               'bg-white border-medical-100'
             }`}>
               <div className="flex items-start justify-between mb-6">
                 <div className="flex items-center gap-3">
                    {result.status === 'blocked' ? (
                      <div className="bg-amber-500 p-2 rounded-lg text-white"><AlertCircle size={20} /></div>
                    ) : result.status === 'error' ? (
                      <div className="bg-rose-500 p-2 rounded-lg text-white"><AlertCircle size={20} /></div>
                    ) : (
                      <div className="bg-medical-500 p-2 rounded-lg text-white"><MessageSquare size={20} /></div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {result.status === 'blocked' ? 'System Restriction' : 
                         result.status === 'error' ? 'Connection Error' : 
                         'Clinical Analysis'}
                      </h3>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{result.status}</p>
                    </div>
                 </div>
               </div>

               <div className="prose prose-slate max-w-none">
                 <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
                   {result.response}
                 </p>
               </div>
               
               {result.status === 'allowed' && (
                 <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                      <ShieldCheck size={16} />
                      <span className="text-xs font-medium italic">Verified Clinical Dataset</span>
                    </div>
                    <button className="text-medical-600 text-sm font-bold hover:underline">
                      Download Report (PDF)
                    </button>
                 </div>
               )}
             </div>
          </div>
        )}

        {/* Feature Grid (for empty state) */}
        {!result && !loading && (
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-in fade-in duration-1000">
            {[
              { icon: <Activity className="text-blue-500" />, title: "Precision Diagnostics", desc: "AI-driven analysis of symptoms and medical history." },
              { icon: <ShieldCheck className="text-emerald-500" />, title: "Privacy First", desc: "Your data is anonymized and never stored on public servers." },
              { icon: <MessageSquare className="text-purple-500" />, title: "Expert Knowledge", desc: "Grounded in verified clinical research and medical datasets." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-medical-200 transition-all cursor-default">
                <div className="mb-4">{feature.icon}</div>
                <h4 className="font-bold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="py-12 px-6 border-t border-slate-200 mt-auto bg-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <Stethoscope size={16} />
            <span className="font-medium">© 2026 Doctor Harvix Clinical Intelligence</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-medical-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-medical-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-medical-600 transition-colors">Consultations</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
