import React, { useState, useEffect, useCallback } from 'react';
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  Briefcase,
  Inbox,
  AlertTriangle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminPageProps {
  onNavigateHome: () => void;
}

interface Opening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  is_active: boolean;
  sort_order: number;
}

interface Application {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  state: string;
  experience: string | null;
  resume: string | null;
  message: string | null;
}

const EMPTY_JOB = { title: '', department: '', location: '', type: 'Full-time', sort_order: '0' };

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigateHome }) => {
  const [booting, setBooting] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authError, setAuthError] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  const [tab, setTab] = useState<'openings' | 'applications'>('openings');
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [job, setJob] = useState({ ...EMPTY_JOB });
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    document.title = 'Admin · ROMAS Chocolates';
  }, []);

  // --- Auth session wiring ---
  useEffect(() => {
    if (!supabase) {
      setBooting(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setAuthEmail(data.session?.user?.email ?? '');
      setBooting(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
      setAuthEmail(session?.user?.email ?? '');
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const loadData = useCallback(async () => {
    if (!supabase) return;
    setLoadingData(true);
    const [op, ap] = await Promise.all([
      supabase.from('job_openings').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false }),
      supabase.from('career_applications').select('*').order('created_at', { ascending: false }),
    ]);
    if (!op.error && op.data) setOpenings(op.data as Opening[]);
    if (!ap.error && ap.data) setApplications(ap.data as Application[]);
    setLoadingData(false);
  }, []);

  useEffect(() => {
    if (authed) loadData();
  }, [authed, loadData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setAuthError('');
    setSigningIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setAuthError(error.message);
    setSigningIn(false);
  };

  const handleLogout = async () => {
    await supabase?.auth.signOut();
  };

  const postJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !job.title.trim() || !job.department.trim() || !job.location.trim()) return;
    setPosting(true);
    const { error } = await supabase.from('job_openings').insert({
      title: job.title.trim(),
      department: job.department.trim(),
      location: job.location.trim(),
      type: job.type,
      sort_order: Number(job.sort_order) || 0,
      is_active: true,
    });
    if (!error) {
      setJob({ ...EMPTY_JOB });
      await loadData();
    }
    setPosting(false);
  };

  const toggleActive = async (o: Opening) => {
    if (!supabase) return;
    await supabase.from('job_openings').update({ is_active: !o.is_active }).eq('id', o.id);
    loadData();
  };

  const removeOpening = async (id: string) => {
    if (!supabase) return;
    await supabase.from('job_openings').delete().eq('id', id);
    loadData();
  };

  // --- Render helpers ---
  const shell = (children: React.ReactNode) => (
    <div className="min-h-screen bg-[#1C0E07] text-[#FEE8B4] font-sans flex flex-col">
      <header className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-[#FEE8B4]/10">
        <div className="flex items-center gap-3">
          <img src="/assets/romas-logo-gold.png" alt="ROMAS" className="h-8 w-auto object-contain" />
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#F9BD03]">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FEE8B4]/70 hover:text-[#F9BD03] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Site
          </button>
          {authed && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#381A0E] hover:bg-[#F9BD03] text-[#FEE8B4] hover:text-[#1C0E07] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          )}
        </div>
      </header>
      <main className="flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">{children}</main>
    </div>
  );

  // --- Not configured ---
  if (!supabase) {
    return shell(
      <div className="max-w-md mx-auto text-center mt-10 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-8">
        <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
        <h2 className="text-lg font-bold mb-2">Supabase not configured</h2>
        <p className="text-sm text-[#FEE8B4]/70">
          Add <code className="text-[#F9BD03]">VITE_SUPABASE_URL</code> and{' '}
          <code className="text-[#F9BD03]">VITE_SUPABASE_ANON_KEY</code> to your environment, then reload.
        </p>
      </div>
    );
  }

  if (booting) {
    return shell(
      <div className="flex items-center justify-center mt-20 text-[#FEE8B4]/60">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  // --- Login view ---
  if (!authed) {
    return shell(
      <div className="max-w-sm mx-auto mt-6 sm:mt-12">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#381A0E] text-[#F9BD03] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-xs text-[#FEE8B4]/60 mt-1">Sign in to post openings & view applications</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#F9BD03] mb-2">Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="admin@romasfood.com"
              className="w-full px-4 py-3 rounded-xl bg-[#2A1107] border border-[#FEE8B4]/15 text-sm text-[#FEE8B4] placeholder:text-[#FEE8B4]/30 focus:outline-none focus:border-[#F9BD03]/60"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#F9BD03] mb-2">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 rounded-xl bg-[#2A1107] border border-[#FEE8B4]/15 text-sm text-[#FEE8B4] placeholder:text-[#FEE8B4]/30 focus:outline-none focus:border-[#F9BD03]/60"
              />
              <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FEE8B4]/50 hover:text-[#F9BD03] cursor-pointer">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {authError && <p className="text-xs text-red-400">{authError}</p>}
          <button
            type="submit" disabled={signingIn}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F9BD03] hover:bg-[#E5AC00] text-[#1C0E07] text-sm font-black uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-60"
          >
            {signingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            <span>{signingIn ? 'Signing in…' : 'Sign In'}</span>
          </button>
        </form>
      </div>
    );
  }

  // --- Dashboard view ---
  return shell(
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-xs text-[#FEE8B4]/50 mt-0.5">Signed in as {authEmail}</p>
        </div>
        <div className="inline-flex rounded-full bg-[#2A1107] p-1 border border-[#FEE8B4]/10">
          <button
            onClick={() => setTab('openings')}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${tab === 'openings' ? 'bg-[#F9BD03] text-[#1C0E07]' : 'text-[#FEE8B4]/70'}`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Openings ({openings.length})
          </button>
          <button
            onClick={() => setTab('applications')}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${tab === 'applications' ? 'bg-[#F9BD03] text-[#1C0E07]' : 'text-[#FEE8B4]/70'}`}
          >
            <Inbox className="w-3.5 h-3.5" /> Applications ({applications.length})
          </button>
        </div>
      </div>

      {loadingData && (
        <div className="flex items-center gap-2 text-[#FEE8B4]/50 text-sm mb-6">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      )}

      {tab === 'openings' && (
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Post a job */}
          <form onSubmit={postJob} className="lg:col-span-2 rounded-2xl bg-[#2A1107] border border-[#FEE8B4]/10 p-5 space-y-3 h-fit">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#F9BD03] flex items-center gap-2">
              <Plus className="w-4 h-4" /> Post a new opening
            </h2>
            {[
              { k: 'title', ph: 'Job title' },
              { k: 'department', ph: 'Department' },
              { k: 'location', ph: 'Location' },
            ].map((f) => (
              <input
                key={f.k} required placeholder={f.ph}
                value={(job as any)[f.k]}
                onChange={(e) => setJob((p) => ({ ...p, [f.k]: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C0E07] border border-[#FEE8B4]/15 text-sm text-[#FEE8B4] placeholder:text-[#FEE8B4]/30 focus:outline-none focus:border-[#F9BD03]/60"
              />
            ))}
            <div className="flex gap-3">
              <select
                value={job.type}
                onChange={(e) => setJob((p) => ({ ...p, type: e.target.value }))}
                className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#1C0E07] border border-[#FEE8B4]/15 text-sm text-[#FEE8B4] focus:outline-none focus:border-[#F9BD03]/60 cursor-pointer"
              >
                {['Full-time', 'Part-time', 'Contract', 'Internship'].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <input
                type="number" placeholder="Order" value={job.sort_order}
                onChange={(e) => setJob((p) => ({ ...p, sort_order: e.target.value }))}
                className="w-24 px-3.5 py-2.5 rounded-lg bg-[#1C0E07] border border-[#FEE8B4]/15 text-sm text-[#FEE8B4] placeholder:text-[#FEE8B4]/30 focus:outline-none focus:border-[#F9BD03]/60"
              />
            </div>
            <button
              type="submit" disabled={posting}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#F9BD03] hover:bg-[#E5AC00] text-[#1C0E07] text-xs font-black uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-60"
            >
              {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span>{posting ? 'Posting…' : 'Post Opening'}</span>
            </button>
          </form>

          {/* Openings list */}
          <div className="lg:col-span-3 space-y-3">
            {openings.length === 0 && !loadingData && (
              <p className="text-sm text-[#FEE8B4]/50">No openings yet. Post one on the left.</p>
            )}
            {openings.map((o) => (
              <div key={o.id} className={`rounded-xl border p-4 flex items-center justify-between gap-3 ${o.is_active ? 'bg-[#2A1107] border-[#FEE8B4]/10' : 'bg-[#2A1107]/40 border-[#FEE8B4]/5 opacity-60'}`}>
                <div className="min-w-0">
                  <div className="font-bold text-sm truncate">{o.title}</div>
                  <div className="text-[11px] text-[#FEE8B4]/55 mt-0.5 truncate">
                    {o.department} · {o.location} · {o.type}
                    {!o.is_active && <span className="ml-2 text-amber-400 font-semibold">HIDDEN</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => toggleActive(o)} title={o.is_active ? 'Hide from site' : 'Show on site'} className="p-2 rounded-lg hover:bg-[#FEE8B4]/10 text-[#FEE8B4]/70 hover:text-[#F9BD03] cursor-pointer">
                    {o.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => removeOpening(o.id)} title="Delete" className="p-2 rounded-lg hover:bg-red-500/15 text-[#FEE8B4]/70 hover:text-red-400 cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'applications' && (
        <div className="space-y-3">
          {applications.length === 0 && !loadingData && (
            <p className="text-sm text-[#FEE8B4]/50">No applications yet.</p>
          )}
          {applications.map((a) => (
            <div key={a.id} className="rounded-xl bg-[#2A1107] border border-[#FEE8B4]/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-bold text-sm">{a.name} <span className="text-[#F9BD03] font-medium">· {a.position}</span></div>
                <div className="text-[11px] text-[#FEE8B4]/45">{new Date(a.created_at).toLocaleString('en-IN')}</div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-[11px] text-[#FEE8B4]/70">
                <span>📧 {a.email}</span>
                <span>📞 {a.phone}</span>
                <span>📍 {a.state}</span>
                {a.experience && <span>🧭 {a.experience}</span>}
                {a.resume && <a href={a.resume} target="_blank" rel="noreferrer" className="text-[#F9BD03] underline">Resume ↗</a>}
              </div>
              {a.message && <p className="text-xs text-[#FEE8B4]/60 mt-2 leading-relaxed">{a.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
