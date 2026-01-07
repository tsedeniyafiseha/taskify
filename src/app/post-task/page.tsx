'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  ArrowLeft, ArrowRight, Calendar, CheckCircle2, Phone, Mail, 
  Loader2, ImagePlus, X, Sparkles, Clock,
  Wrench, Leaf, Truck, Palette, Puzzle, Package,
  Monitor, Heart
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

const categoryData = [
  { slug: 'cleaning', name: 'Cleaning', icon: Sparkles },
  { slug: 'carpet-cleaning', name: 'Carpet Cleaning', icon: Sparkles },
  { slug: 'window-cleaning', name: 'Window Cleaning', icon: Sparkles },
  { slug: 'handyman', name: 'Handyman', icon: Wrench },
  { slug: 'gardening', name: 'Gardening', icon: Leaf },
  { slug: 'tech-help', name: 'Tech Help', icon: Monitor },
  { slug: 'rubbish-removal', name: 'Rubbish Removal', icon: Package },
  { slug: 'moving', name: 'Moving Help', icon: Truck },
  { slug: 'painting', name: 'Painting', icon: Palette },
  { slug: 'assembly', name: 'Assembly', icon: Puzzle },
  { slug: 'delivery', name: 'Delivery', icon: Package },
  { slug: 'pet-care', name: 'Pet Care', icon: Heart },
];

const locationData = [
  // Christchurch
  'Christchurch CBD', 'Riccarton', 'Papanui', 'Hornby', 'Fendalton', 'Rolleston',
  // Auckland
  'Auckland CBD', 'Ponsonby', 'Newmarket', 'Mt Eden', 'Takapuna', 'Henderson'
];

interface DbCategory { id: string; slug: string; name: string; }
interface DbLocation { id: string; name: string; }

export default function PostTaskPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [locations, setLocations] = useState<DbLocation[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [form, setForm] = useState({
    title: '', description: '', category_id: '', location_id: '',
    preferred_date: '', working_hours: '', budget: 100,
    budget_type: 'fixed' as 'fixed' | 'hourly',
    contact_phone: '', contact_email: '', image_url: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/post-task');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        const [catsRes, locsRes] = await Promise.all([
          supabase.from('categories').select('id, slug, name').order('name'),
          supabase.from('locations').select('id, name').order('is_primary', { ascending: false })
        ]);
        if (catsRes.data) setCategories(catsRes.data);
        if (locsRes.data) setLocations(locsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (profile) {
      setForm(prev => ({ ...prev, contact_email: profile.email || '', contact_phone: profile.phone || '' }));
    }
  }, [profile]);

  const updateForm = (field: string, value: string | number) => setForm(prev => ({ ...prev, [field]: value }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (!file.type.startsWith('image/')) { setError('Please upload an image'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Image must be < 5MB'); return; }
    setUploadingImage(true); setError('');
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
    try {
      const supabase = createClient();
      const fileName = `${user.id}-${Date.now()}.${file.name.split('.').pop()}`;
      const { error: upErr } = await supabase.storage.from('task-images').upload(fileName, file);
      if (upErr) throw upErr;
      const { data: { publicUrl } } = supabase.storage.from('task-images').getPublicUrl(fileName);
      setForm(prev => ({ ...prev, image_url: publicUrl }));
    } catch { setError('Upload failed'); setImagePreview(null); }
    setUploadingImage(false);
  };

  const handleSubmit = async () => {
    if (!user) return;
    setSubmitting(true); setError('');
    try {
      const supabase = createClient();
      const { error: err } = await supabase.from('tasks').insert({
        poster_id: user.id, category_id: form.category_id, location_id: form.location_id,
        title: form.title, description: form.description, budget: form.budget,
        budget_type: form.budget_type, working_hours: form.working_hours || null,
        preferred_date: form.preferred_date || null, contact_phone: form.contact_phone || null,
        contact_email: form.contact_email || null, image_url: form.image_url || null,
        status: 'pending', is_featured: false,
      });
      if (err) throw err;
      setSubmitted(true);
    } catch (err: unknown) { 
      setError(err instanceof Error ? err.message : 'Failed to post task'); 
    }
    setSubmitting(false);
  };

  const canProceed = () => {
    if (step === 1) return form.category_id;
    if (step === 2) return form.title.length >= 5 && form.description.length >= 10;
    if (step === 3) return form.location_id;
    if (step === 4) return form.budget > 0;
    return true;
  };

  if (authLoading || loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
    </div>
  );
  if (!user) return null;

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-3 text-gray-900">Task Posted!</h1>
            <p className="text-gray-500 mb-8">Your task is pending admin approval.</p>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard/my-tasks"><button className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">View My Tasks</button></Link>
              <Link href="/"><button className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">Back Home</button></Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const selectedCat = categories.find(c => c.id === form.category_id);
  const selectedLoc = locations.find(l => l.id === form.location_id);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-medium text-gray-600">Step {step} of 5</span>
              <span className="text-gray-400">{Math.round((step / 5) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div className="h-full bg-purple-600" animate={{ width: `${(step / 5) * 100}%` }} />
            </div>
          </div>

          {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">What do you need help with?</h1>
                  <p className="text-gray-500">Select a category</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.length > 0 ? categories.map((cat) => {
                    const catInfo = categoryData.find(c => c.slug === cat.slug);
                    const Icon = catInfo?.icon || Sparkles;
                    const isSelected = form.category_id === cat.id;
                    return (
                      <motion.button key={cat.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => updateForm('category_id', cat.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${isSelected ? 'border-purple-600 bg-purple-50' : 'border-gray-100 hover:border-gray-200'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${isSelected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className={`font-medium text-sm ${isSelected ? 'text-purple-700' : 'text-gray-700'}`}>{cat.name}</p>
                      </motion.button>
                    );
                  }) : categoryData.map((cat) => {
                    const isSelected = form.category_id === cat.slug;
                    return (
                      <motion.button key={cat.slug} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => updateForm('category_id', cat.slug)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${isSelected ? 'border-purple-600 bg-purple-50' : 'border-gray-100 hover:border-gray-200'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${isSelected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                          <cat.icon className="w-5 h-5" />
                        </div>
                        <p className={`font-medium text-sm ${isSelected ? 'text-purple-700' : 'text-gray-700'}`}>{cat.name}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">{selectedCat?.name || 'Task'}</span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Describe your task</h1>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Task title</label>
                    <input type="text" value={form.title} onChange={(e) => updateForm('title', e.target.value)}
                      placeholder="e.g., Help me move a couch" className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 text-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                    <textarea value={form.description} onChange={(e) => updateForm('description', e.target.value)}
                      placeholder="Include size, weight, specific requirements..." rows={5}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photo (optional)</label>
                    {imagePreview ? (
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-gray-200">
                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                        <button onClick={() => { setImagePreview(null); setForm(p => ({ ...p, image_url: '' })); }} className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full"><X className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <button onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}
                        className="w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-purple-400 hover:bg-purple-50 transition-colors">
                        {uploadingImage ? <Loader2 className="w-6 h-6 animate-spin text-purple-600" /> : <><ImagePlus className="w-6 h-6 text-gray-400" /><span className="text-sm text-gray-500">Upload</span></>}
                      </button>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Where and when?</h1>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(locations.length > 0 ? locations : locationData.map((n, i) => ({ id: String(i), name: n }))).map((loc) => (
                        <button key={loc.id} onClick={() => updateForm('location_id', loc.id)}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${form.location_id === loc.id ? 'bg-purple-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'}`}>
                          {loc.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="date" value={form.preferred_date} onChange={(e) => updateForm('preferred_date', e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select value={form.working_hours} onChange={(e) => updateForm('working_hours', e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 appearance-none">
                          <option value="">Flexible</option>
                          <option value="Morning">Morning</option>
                          <option value="Afternoon">Afternoon</option>
                          <option value="Evening">Evening</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Set your budget</h1>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-3 justify-center">
                    {(['fixed', 'hourly'] as const).map((t) => (
                      <button key={t} onClick={() => updateForm('budget_type', t)}
                        className={`px-6 py-3 rounded-xl font-medium ${form.budget_type === t ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {t === 'fixed' ? 'Fixed' : 'Hourly'}
                      </button>
                    ))}
                  </div>
                  <div className="text-center py-8">
                    <div className="inline-flex items-center text-6xl font-bold text-gray-900">
                      <span className="text-3xl text-gray-400">$</span>
                      <input type="number" value={form.budget} onChange={(e) => updateForm('budget', Number(e.target.value))}
                        className="w-32 text-center bg-transparent border-none focus:outline-none text-6xl font-bold" />
                      {form.budget_type === 'hourly' && <span className="text-2xl text-gray-400">/hr</span>}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {[50, 100, 150, 200, 300].map((a) => (
                      <button key={a} onClick={() => updateForm('budget', a)}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${form.budget === a ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>${a}</button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact & Review</h1>
                </div>
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="tel" value={form.contact_phone} onChange={(e) => updateForm('contact_phone', e.target.value)}
                          placeholder="021 123 4567" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="email" value={form.contact_email} onChange={(e) => updateForm('contact_email', e.target.value)}
                          placeholder="you@email.com" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                    <h3 className="font-semibold text-gray-900">Summary</h3>
                    {imagePreview && <div className="relative w-full h-32 rounded-xl overflow-hidden"><Image src={imagePreview} alt="Task" fill className="object-cover" /></div>}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-500">Category</span><p className="font-medium text-gray-900">{selectedCat?.name}</p></div>
                      <div><span className="text-gray-500">Location</span><p className="font-medium text-gray-900">{selectedLoc?.name}</p></div>
                      <div><span className="text-gray-500">Budget</span><p className="font-medium text-purple-600">${form.budget} {form.budget_type}</p></div>
                      <div><span className="text-gray-500">Date</span><p className="font-medium text-gray-900">{form.preferred_date || 'Flexible'}</p></div>
                    </div>
                    <div><span className="text-gray-500 text-sm">Title</span><p className="font-medium text-gray-900">{form.title}</p></div>
                  </div>
                  <p className="text-xs text-gray-500 text-center">By posting, you agree to our <Link href="/terms" className="text-purple-600">Terms</Link></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium ${step === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}>
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            {step < 5 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()}
                className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting}
                className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50">
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Post Task</>}
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
