'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  ArrowRight, ArrowLeft, DollarSign, Clock, Shield, Star, Users, CheckCircle, 
  Loader2, MapPin, Briefcase, Phone, FileText, Sparkles, Check
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

const skills = [
  'Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Handyman', 'Gardening', 
  'Tech Help', 'Rubbish Removal', 'Moving Help', 'Painting', 'Assembly', 'Delivery', 'Pet Care'
];

const locations = [
  // Christchurch
  'Christchurch CBD', 'Riccarton', 'Papanui', 'Hornby', 'Fendalton', 'Rolleston',
  // Auckland
  'Auckland CBD', 'Ponsonby', 'Newmarket', 'Mt Eden', 'Takapuna', 'Henderson'
];

const benefits = [
  { icon: DollarSign, title: 'Earn on your terms', desc: 'Set your own rates' },
  { icon: Clock, title: 'Flexible hours', desc: 'Work when you want' },
  { icon: Shield, title: 'Direct contact', desc: 'Connect with clients' },
  { icon: Star, title: 'Build reputation', desc: 'Grow with reviews' },
];

export default function BecomeTaskerPage() {
  const { user, profile, becomeWorker, updateProfile } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  
  const [step, setStep] = useState(0); // 0 = landing, 1-4 = form steps
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [form, setForm] = useState({
    bio: '',
    skills: [] as string[],
    locations_covered: [] as string[],
    working_hours: '',
    hourly_rate: 25,
    phone: '',
  });

  useEffect(() => {
    if (profile) {
      setForm(prev => ({
        ...prev,
        bio: profile.bio || '',
        skills: profile.skills || [],
        locations_covered: profile.locations_covered || [],
        working_hours: profile.working_hours || '',
        hourly_rate: profile.hourly_rate || 25,
        phone: profile.phone || '',
      }));
    }
  }, [profile]);

  const toggleSkill = (skill: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleLocation = (loc: string) => {
    setForm(prev => ({
      ...prev,
      locations_covered: prev.locations_covered.includes(loc)
        ? prev.locations_covered.filter(l => l !== loc)
        : [...prev.locations_covered, loc]
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      router.push('/auth/signup');
      return;
    }

    setSubmitting(true);
    setError('');

    // First become a worker if not already
    if (!profile?.is_worker) {
      const { error: workerError } = await becomeWorker();
      if (workerError) {
        setError(workerError.message);
        setSubmitting(false);
        return;
      }
    }

    // Update profile with worker details
    const { error: updateError } = await updateProfile({
      bio: form.bio,
      skills: form.skills,
      locations_covered: form.locations_covered,
      working_hours: form.working_hours,
      hourly_rate: form.hourly_rate,
      phone: form.phone,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setStep(5); // Success
    }
    setSubmitting(false);
  };

  const canProceed = () => {
    if (step === 1) return form.skills.length > 0;
    if (step === 2) return form.locations_covered.length > 0;
    if (step === 3) return form.bio.length >= 20;
    if (step === 4) return form.hourly_rate > 0;
    return true;
  };

  const isAlreadyWorker = profile?.is_worker;
  const isApproved = profile?.worker_status === 'approved';

  // Landing page
  if (step === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="relative py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white" />
            <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-30" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-[120px] opacity-20" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full text-sm mb-6">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-purple-700 font-medium">Join workers earning in Christchurch</span>
                </motion.div>
                
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                  Earn money doing<br />what you love
                </motion.h1>
                
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="text-xl text-gray-500 mb-10">
                  Be your own boss. Set your own hours. Get paid to help people in your community.
                </motion.p>

                {isAlreadyWorker && isApproved ? (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="inline-flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full font-medium">
                      <CheckCircle className="w-5 h-5" /> You&apos;re an approved worker!
                    </div>
                    <Link href="/tasks"><button className="px-8 py-4 bg-purple-600 text-white rounded-full text-lg font-semibold hover:bg-purple-700 transition-all">Browse Tasks</button></Link>
                  </motion.div>
                ) : isAlreadyWorker ? (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="inline-flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-700 rounded-full font-medium">
                      <Clock className="w-5 h-5" /> Your profile is pending approval
                    </div>
                    <button onClick={() => setStep(1)} className="px-8 py-4 bg-purple-600 text-white rounded-full text-lg font-semibold hover:bg-purple-700 transition-all">
                      Update Profile
                    </button>
                  </motion.div>
                ) : (
                  <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    onClick={() => user ? setStep(1) : router.push('/auth/signup')}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-purple-600 text-white rounded-full text-xl font-semibold hover:bg-purple-700 transition-all shadow-xl shadow-purple-200">
                    {user ? 'Get Started' : 'Sign Up to Start'} <ArrowRight className="w-6 h-6" />
                  </motion.button>
                )}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why become a Worker?</h2>
              <div className="grid md:grid-cols-4 gap-8">
                {benefits.map((b, i) => (
                  <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <b.icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
                    <p className="text-sm text-gray-500">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="py-20 bg-white">
            <div className="max-w-lg mx-auto px-4 sm:px-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-8 text-center text-white">
                <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">Worker Subscription</span>
                <div className="text-5xl font-bold mb-2">$20<span className="text-xl font-normal opacity-80">/month</span></div>
                <p className="opacity-80 mb-6">Cancel anytime</p>
                <ul className="space-y-3 text-left mb-8">
                  {['Unlimited task browsing', 'Direct contact with posters', 'Profile visible to all', 'Priority support'].map(f => (
                    <li key={f} className="flex items-center gap-3"><Check className="w-5 h-5 text-green-300" />{f}</li>
                  ))}
                </ul>
                <button onClick={() => user ? setStep(1) : router.push('/auth/signup')}
                  className="w-full py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  {user ? 'Start Application' : 'Sign Up First'}
                </button>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Success page
  if (step === 5) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-3 text-gray-900">Application Submitted!</h1>
            <p className="text-gray-500 mb-8">Your worker profile is pending admin approval. We&apos;ll notify you once approved.</p>
            <div className="flex flex-col gap-3">
              <Link href="/tasks"><button className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-all">Browse Tasks</button></Link>
              <Link href="/dashboard"><button className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all">Go to Dashboard</button></Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // Form steps
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
              <span className="text-sm text-gray-400">{Math.round((step / 4) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div className="h-full bg-purple-600 rounded-full" animate={{ width: `${(step / 4) * 100}%` }} />
            </div>
          </div>

          {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

          <AnimatePresence mode="wait">
            {/* Step 1: Skills */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-7 h-7 text-purple-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">What are your skills?</h1>
                  <p className="text-gray-500">Select all the services you can offer</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {skills.map(skill => (
                    <button key={skill} onClick={() => toggleSkill(skill)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${form.skills.includes(skill) ? 'bg-purple-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'}`}>
                      {form.skills.includes(skill) && <Check className="w-4 h-4 inline mr-2" />}{skill}
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">{form.skills.length} selected</p>
              </motion.div>
            )}

            {/* Step 2: Locations */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-7 h-7 text-purple-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Where can you work?</h1>
                  <p className="text-gray-500">Select all areas you can cover</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {locations.map(loc => (
                    <button key={loc} onClick={() => toggleLocation(loc)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${form.locations_covered.includes(loc) ? 'bg-purple-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'}`}>
                      {form.locations_covered.includes(loc) && <Check className="w-4 h-4 inline mr-2" />}{loc}
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">{form.locations_covered.length} selected</p>
              </motion.div>
            )}

            {/* Step 3: Bio & Contact */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-7 h-7 text-purple-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell us about yourself</h1>
                  <p className="text-gray-500">Help clients get to know you</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your bio</label>
                    <textarea value={form.bio} onChange={(e) => setForm(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell clients about your experience, skills, and what makes you great at what you do..."
                      rows={5} className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-gray-900 placeholder:text-gray-400" />
                    <p className="text-xs text-gray-500 mt-1">{form.bio.length} characters (min 20)</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="tel" value={form.phone} onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="021 123 4567" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder:text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Working hours</label>
                    <select value={form.working_hours} onChange={(e) => setForm(prev => ({ ...prev, working_hours: e.target.value }))}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900">
                      <option value="">Select availability</option>
                      <option value="Weekdays only">Weekdays only</option>
                      <option value="Weekends only">Weekends only</option>
                      <option value="Flexible / Anytime">Flexible / Anytime</option>
                      <option value="Mornings only">Mornings only</option>
                      <option value="Evenings only">Evenings only</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Rate & Review */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-7 h-7 text-purple-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Set your hourly rate</h1>
                  <p className="text-gray-500">You can change this anytime</p>
                </div>
                
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-2 text-6xl font-bold text-gray-900">
                    <span className="text-3xl text-gray-400">$</span>
                    <input type="number" value={form.hourly_rate} onChange={(e) => setForm(prev => ({ ...prev, hourly_rate: Number(e.target.value) }))}
                      className="w-32 text-center bg-transparent border-none focus:outline-none text-6xl font-bold" />
                    <span className="text-2xl text-gray-400">/hr</span>
                  </div>
                  <p className="text-gray-500 mt-2">NZD</p>
                </div>

                <div className="flex justify-center gap-2 mb-8">
                  {[20, 25, 30, 40, 50, 75].map(rate => (
                    <button key={rate} onClick={() => setForm(prev => ({ ...prev, hourly_rate: rate }))}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${form.hourly_rate === rate ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      ${rate}
                    </button>
                  ))}
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                  <h3 className="font-semibold text-gray-900">Profile Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">Skills</span><p className="font-medium text-gray-900">{form.skills.length} selected</p></div>
                    <div><span className="text-gray-500">Locations</span><p className="font-medium text-gray-900">{form.locations_covered.length} areas</p></div>
                    <div><span className="text-gray-500">Rate</span><p className="font-medium text-purple-600">${form.hourly_rate}/hr</p></div>
                    <div><span className="text-gray-500">Availability</span><p className="font-medium text-gray-900">{form.working_hours || 'Not set'}</p></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button onClick={() => setStep(s => Math.max(0, s - 1))}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {step < 4 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()}
                className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting}
                className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-all disabled:opacity-50">
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle className="w-5 h-5" /> Submit Application</>}
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
