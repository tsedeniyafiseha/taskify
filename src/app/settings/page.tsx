'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Briefcase, Save, Loader2, CheckCircle, CreditCard, Crown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { Location } from '@/types/database';

const skillOptions = [
  'Cleaning', 'Gardening', 'Moving', 'Handyman', 'Painting', 
  'Assembly', 'Rubbish Removal', 'Tutoring', 'Tech Help', 
  'Babysitting', 'Pet Care', 'Errands', 'Car Wash'
];

export default function SettingsPage() {
  const { user, profile, loading: authLoading, updateProfile, refreshProfile } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    bio: '',
    skills: [] as string[],
    locations_covered: [] as string[],
    working_hours: '',
    hourly_rate: 0,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/settings');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await supabase.from('locations').select('*').order('name');
      if (data) setLocations(data);
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        skills: profile.skills || [],
        locations_covered: profile.locations_covered || [],
        working_hours: profile.working_hours || '',
        hourly_rate: profile.hourly_rate || 0,
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    const { error } = await updateProfile({
      full_name: form.full_name,
      phone: form.phone,
      bio: form.bio,
      skills: form.skills,
      locations_covered: form.locations_covered,
      working_hours: form.working_hours,
      hourly_rate: form.hourly_rate,
    });

    setSaving(false);
    
    if (!error) {
      setSaved(true);
      await refreshProfile();
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const toggleSkill = (skill: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleLocation = (location: string) => {
    setForm(prev => ({
      ...prev,
      locations_covered: prev.locations_covered.includes(location)
        ? prev.locations_covered.filter(l => l !== location)
        : [...prev.locations_covered, location]
    }));
  };

  const handleSubscribe = async () => {
    setSubscribing(true);
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'worker_subscription' }),
      });
      const { url, error } = await response.json();
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Subscription error:', error);
    }
    setSubscribing(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const isWorker = profile.is_worker;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-500">Manage your account and profile information</p>
        </motion.div>

        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700">Profile updated successfully!</span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-8"
        >
          {/* Basic Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              Basic Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => setForm(prev => ({ ...prev, full_name: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="021 123 4567"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <div className="px-4 py-3 bg-purple-50 border border-purple-200 rounded-xl">
                  <span className="text-purple-700 font-medium">
                    {profile.is_worker ? 'Worker' : 'Poster'}
                    {profile.is_admin && ' (Admin)'}
                  </span>
                  {isWorker && (
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      profile.worker_status === 'approved' ? 'bg-green-100 text-green-700' :
                      profile.worker_status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {profile.worker_status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Worker-specific fields */}
          {isWorker && (
            <>
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  Worker Profile
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio / About You</label>
                    <textarea
                      value={form.bio}
                      onChange={(e) => setForm(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell potential clients about yourself, your experience, and what makes you great at what you do..."
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (NZD)</label>
                    <div className="relative w-48">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input
                        type="number"
                        value={form.hourly_rate}
                        onChange={(e) => setForm(prev => ({ ...prev, hourly_rate: Number(e.target.value) }))}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">/hr</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                    <input
                      type="text"
                      value={form.working_hours}
                      onChange={(e) => setForm(prev => ({ ...prev, working_hours: e.target.value }))}
                      placeholder="e.g., Weekdays 9am-5pm, Weekends flexible"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
                <p className="text-sm text-gray-500 mb-4">Select the services you can provide</p>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        form.skills.includes(skill)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Locations Covered
                </h2>
                <p className="text-sm text-gray-500 mb-4">Select the areas where you can work</p>
                <div className="flex flex-wrap gap-2">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => toggleLocation(loc.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        form.locations_covered.includes(loc.name)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subscription Section */}
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  Subscription
                </h2>
                
                {profile.subscription_active ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Crown className="w-6 h-6 text-green-600" />
                      <span className="font-semibold text-green-700">Active Subscription</span>
                    </div>
                    <p className="text-sm text-green-600 mb-2">
                      You have full access to contact task posters.
                    </p>
                    {profile.subscription_expires_at && (
                      <p className="text-xs text-green-500">
                        Renews on {new Date(profile.subscription_expires_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Worker Subscription</h3>
                        <p className="text-sm text-gray-500">Get access to contact task posters</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">$20</div>
                        <div className="text-xs text-gray-500">/month</div>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Unlimited task browsing
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Direct contact with task posters
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Profile visibility to all posters
                      </li>
                    </ul>
                    <button
                      onClick={handleSubscribe}
                      disabled={subscribing || profile.worker_status !== 'approved'}
                      className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {subscribing ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : profile.worker_status !== 'approved' ? (
                        'Waiting for approval'
                      ) : (
                        'Subscribe Now'
                      )}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Save Button */}
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
