'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { categories, locations } from '@/data/mockData';
import { ArrowLeft, ArrowRight, Calendar, DollarSign, MapPin, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const steps = ['Task Details', 'Location & Date', 'Budget', 'Review'];

export default function PostTaskPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    dueDate: '',
    isFlexible: false,
    budget: 100,
    budgetType: 'total' as 'total' | 'hourly',
  });

  const updateForm = (field: string, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
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
            <h1 className="text-3xl font-bold mb-4 text-white">Task Posted!</h1>
            <p className="text-neutral-400 mb-8">
              Your task has been posted successfully. Taskers will start sending offers soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/tasks">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full font-medium hover:from-purple-700 hover:to-purple-900 transition-all purple-glow">
                  View My Tasks
                </button>
              </Link>
              <Link href="/">
                <button className="px-6 py-3 glass border border-neutral-800 text-white rounded-full font-medium hover:border-purple-500 transition-all">
                  Back to Home
                </button>
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    i <= currentStep ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white purple-glow' : 'bg-neutral-800 text-neutral-500'
                  }`}>
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-12 sm:w-24 h-1 mx-2 rounded transition-colors ${
                      i < currentStep ? 'bg-gradient-to-r from-purple-600 to-purple-800' : 'bg-neutral-800'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-neutral-400">{steps[currentStep]}</p>
          </div>

          {/* Form Card */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-2xl shadow-xl border border-neutral-800 p-6 md:p-8"
          >
            {/* Step 1: Task Details */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">What do you need done?</h2>
                    <p className="text-sm text-neutral-400">Describe your task in detail</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Task Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => updateForm('title', e.target.value)}
                    placeholder="e.g., Help me move a couch"
                    className="w-full px-4 py-3 glass border border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.filter(c => c.id !== 'all').map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateForm('category', cat.id)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          form.category === cat.id
                            ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white purple-glow'
                            : 'glass border border-neutral-800 text-neutral-400 hover:border-purple-500'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateForm('description', e.target.value)}
                    placeholder="Provide more details about what you need..."
                    rows={4}
                    className="w-full px-4 py-3 glass border border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-white placeholder:text-neutral-500"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Location & Date */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Where and when?</h2>
                    <p className="text-sm text-neutral-400">Set the location and timing</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Location</label>
                  <select
                    value={form.location}
                    onChange={(e) => updateForm('location', e.target.value)}
                    className="w-full px-4 py-3 glass border border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  >
                    <option value="" className="bg-neutral-900">Select a location</option>
                    {locations.filter(l => l !== 'All Locations').map((loc) => (
                      <option key={loc} value={loc} className="bg-neutral-900">{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">When do you need this done?</label>
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="date"
                      value={form.dueDate}
                      onChange={(e) => updateForm('dueDate', e.target.value)}
                      className="flex-1 px-4 py-3 glass border border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    />
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                      <Calendar className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isFlexible}
                      onChange={(e) => updateForm('isFlexible', e.target.checked)}
                      className="w-5 h-5 rounded border-neutral-700 text-purple-600 focus:ring-purple-500 bg-neutral-900"
                    />
                    <span className="text-sm text-neutral-400">I&apos;m flexible on the date</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Budget */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                    <DollarSign className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Set your budget</h2>
                    <p className="text-sm text-neutral-400">How much are you willing to pay?</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Budget Type</label>
                  <div className="flex gap-3">
                    {(['total', 'hourly'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => updateForm('budgetType', type)}
                        className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          form.budgetType === type
                            ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white purple-glow'
                            : 'glass border border-neutral-800 text-neutral-400 hover:border-purple-500'
                        }`}
                      >
                        {type === 'total' ? 'Total Budget' : 'Hourly Rate'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    {form.budgetType === 'total' ? 'Total Budget' : 'Hourly Rate'} (NZD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg">$</span>
                    <input
                      type="number"
                      value={form.budget}
                      onChange={(e) => updateForm('budget', Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-4 text-2xl font-semibold glass border border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    />
                  </div>
                  <p className="text-sm text-neutral-400 mt-2">
                    Suggested: $50 - $500 for most tasks
                  </p>
                </div>

                <div className="flex gap-2">
                  {[50, 100, 150, 200, 300].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => updateForm('budget', amount)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        form.budget === amount
                          ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white purple-glow'
                          : 'glass border border-neutral-800 text-neutral-400 hover:border-purple-500'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Review your task</h2>
                    <p className="text-sm text-neutral-400">Make sure everything looks good</p>
                  </div>
                </div>

                <div className="glass rounded-xl p-6 space-y-4 border border-neutral-800">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Title</p>
                    <p className="font-medium text-white">{form.title || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Category</p>
                    <p className="font-medium capitalize text-white">{form.category || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Description</p>
                    <p className="text-neutral-400">{form.description || 'Not specified'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Location</p>
                      <p className="font-medium text-white">{form.location || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Due Date</p>
                      <p className="font-medium text-white">{form.dueDate || 'Flexible'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Budget</p>
                    <p className="text-2xl font-bold text-purple-400">${form.budget} <span className="text-sm font-normal text-neutral-500">{form.budgetType}</span></p>
                  </div>
                </div>

                <p className="text-sm text-neutral-500 text-center">
                  By posting this task, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-800">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  currentStep === 0
                    ? 'text-neutral-600 cursor-not-allowed'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full text-sm font-medium hover:from-purple-700 hover:to-purple-900 transition-all purple-glow"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full text-sm font-medium hover:from-purple-700 hover:to-purple-900 transition-all purple-glow"
                >
                  Post Task
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
