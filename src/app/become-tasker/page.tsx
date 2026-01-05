'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { categories, locations } from '@/data/mockData';
import { ArrowRight, CheckCircle2, DollarSign, Clock, Shield, Star, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import Link from 'next/link';

const benefits = [
  { icon: DollarSign, title: 'Earn on your terms', description: 'Set your own rates and work when you want' },
  { icon: Clock, title: 'Flexible schedule', description: 'Choose tasks that fit your availability' },
  { icon: Shield, title: 'Secure payments', description: 'Get paid safely through our platform' },
  { icon: Star, title: 'Build your reputation', description: 'Grow your business with reviews and ratings' },
];

export default function BecomeTaskerPage() {
  const [step, setStep] = useState<'info' | 'form' | 'success'>('info');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    skills: [] as string[],
    experience: '',
    about: '',
    hasVehicle: false,
    hasTools: false,
    agreeTerms: false,
  });

  const updateForm = (field: string, value: string | boolean | string[]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-6 purple-glow">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-white">Application Submitted!</h1>
            <p className="text-neutral-400 mb-8">
              Thanks for applying to become a Tasker. We&apos;ll review your application and get back to you within 24-48 hours.
            </p>
            <Link href="/tasks">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full font-medium hover:from-purple-700 hover:to-purple-900 transition-all purple-glow">
                Browse Available Tasks
              </button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  if (step === 'info') {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="bg-black text-white py-20 md:py-32 relative overflow-hidden">
            {/* Purple glow effects */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-800 rounded-full blur-[120px] opacity-20" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-6 border border-purple-500/30"
                >
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Join 2,500+ Taskers in Christchurch
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-bold mb-6"
                >
                  Earn money doing what you love
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-neutral-300 mb-8"
                >
                  Be your own boss. Set your own hours. Get paid to help people in your community.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setStep('form')}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-all purple-glow"
                >
                  Start Earning Today
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">Why become a Tasker?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                      <benefit.icon className="w-7 h-7 text-purple-400" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">{benefit.title}</h3>
                    <p className="text-sm text-neutral-400">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">How it works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { step: '1', title: 'Create your profile', desc: 'Sign up and tell us about your skills and experience' },
                  { step: '2', title: 'Browse & bid on tasks', desc: 'Find tasks that match your skills and make offers' },
                  { step: '3', title: 'Get paid', desc: 'Complete tasks and receive secure payments' },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="text-6xl font-bold text-purple-900/30 mb-4">{item.step}</div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                    <p className="text-neutral-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-black">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to start earning?</h2>
              <p className="text-neutral-400 mb-8">Join thousands of Taskers making money on their own terms.</p>
              <button
                onClick={() => setStep('form')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full text-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-all purple-glow"
              >
                Apply Now
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Form step
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl shadow-xl border border-neutral-800 p-6 md:p-8"
          >
            <h1 className="text-2xl font-bold mb-2 text-white">Become a Tasker</h1>
            <p className="text-neutral-400 mb-8">Fill out the form below to start earning</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-2">
                  <User className="w-4 h-4" />
                  Personal Information
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => updateForm('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => updateForm('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-2">
                  <Mail className="w-4 h-4" />
                  Contact Details
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </div>
                <select
                  required
                  value={form.location}
                  onChange={(e) => updateForm('location', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-white"
                >
                  <option value="">Select your area</option>
                  {locations.filter(l => l !== 'All Locations').map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-2">
                  <Briefcase className="w-4 h-4" />
                  Skills (select all that apply)
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.filter(c => c.id !== 'all').map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleSkill(cat.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        form.skills.includes(cat.id)
                          ? 'bg-black text-white'
                          : 'bg-neutral-100 hover:bg-neutral-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium mb-2">Experience Level</label>
                <select
                  required
                  value={form.experience}
                  onChange={(e) => updateForm('experience', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-white"
                >
                  <option value="">Select experience</option>
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="experienced">Experienced (3-5 years)</option>
                  <option value="expert">Expert (5+ years)</option>
                </select>
              </div>

              {/* About */}
              <div>
                <label className="block text-sm font-medium mb-2">About You</label>
                <textarea
                  value={form.about}
                  onChange={(e) => updateForm('about', e.target.value)}
                  placeholder="Tell us about yourself and why you'd be a great Tasker..."
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.hasVehicle}
                    onChange={(e) => updateForm('hasVehicle', e.target.checked)}
                    className="w-5 h-5 rounded border-neutral-300 text-black focus:ring-black"
                  />
                  <span className="text-sm">I have access to a vehicle</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.hasTools}
                    onChange={(e) => updateForm('hasTools', e.target.checked)}
                    className="w-5 h-5 rounded border-neutral-300 text-black focus:ring-black"
                  />
                  <span className="text-sm">I have my own tools/equipment</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.agreeTerms}
                    onChange={(e) => updateForm('agreeTerms', e.target.checked)}
                    className="w-5 h-5 rounded border-neutral-300 text-black focus:ring-black"
                  />
                  <span className="text-sm">I agree to the Terms of Service and Privacy Policy</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-neutral-800 transition-colors"
              >
                Submit Application
              </button>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
