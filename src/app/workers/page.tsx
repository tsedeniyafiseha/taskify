'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types/database';
import { MapPin, Star, Phone, Mail, Clock, Search, Filter, Loader2, CheckCircle, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function WorkersPage() {
  const { user, profile: currentUser } = useAuth();
  const supabase = createClient();
  
  const [workers, setWorkers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const allSkills = ['Cleaning', 'Gardening', 'Moving', 'Handyman', 'Painting', 'Assembly', 
    'Rubbish Removal', 'Tutoring', 'Tech Help', 'Babysitting', 'Pet Care', 'Errands', 'Car Wash'];
  
  const locations = ['Christchurch CBD', 'Riccarton', 'Papanui', 'Hornby', 'Fendalton', 
    'Rolleston', 'Rangiora', 'Lincoln', 'Kaiapoi', 'Ashburton'];

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    setLoading(true);
    
    // Fetch only approved workers with active subscription
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('is_worker', true)
      .eq('worker_status', 'approved')
      .order('created_at', { ascending: false });
    
    if (data) setWorkers(data);
    setLoading(false);
  };

  const filteredWorkers = workers.filter(worker => {
    if (searchQuery && !worker.full_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !worker.skills?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    if (selectedSkill !== 'all' && !worker.skills?.includes(selectedSkill)) return false;
    if (selectedLocation !== 'all' && !worker.locations_covered?.includes(selectedLocation)) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Skilled Workers</h1>
            <p className="text-lg text-gray-500 mb-8">
              Browse verified workers in Christchurch ready to help with your tasks
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter className="w-4 h-4" />
              <span>Filter by:</span>
            </div>
            
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            
            <span className="ml-auto text-sm text-gray-500">
              {filteredWorkers.length} workers found
            </span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : filteredWorkers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workers found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map((worker, i) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-purple-300 hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-white">
                        {worker.full_name?.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900 truncate">{worker.full_name}</h3>
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      </div>
                      {worker.hourly_rate && (
                        <p className="text-purple-600 font-semibold">${worker.hourly_rate}/hr</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {worker.bio && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 text-sm line-clamp-2">{worker.bio}</p>
                  </div>
                )}

                {/* Skills */}
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {worker.skills?.slice(0, 4).map(skill => (
                      <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                        {skill}
                      </span>
                    ))}
                    {worker.skills && worker.skills.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        +{worker.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Locations */}
                {worker.locations_covered && worker.locations_covered.length > 0 && (
                  <div className="px-6 pb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{worker.locations_covered.slice(0, 2).join(', ')}</span>
                      {worker.locations_covered.length > 2 && (
                        <span className="text-gray-400">+{worker.locations_covered.length - 2}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Working Hours */}
                {worker.working_hours && (
                  <div className="px-6 pb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{worker.working_hours}</span>
                    </div>
                  </div>
                )}

                {/* Contact - Only for logged in users */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  {user ? (
                    <div className="flex items-center gap-2">
                      {worker.phone && (
                        <a
                          href={`tel:${worker.phone}`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          Call
                        </a>
                      )}
                      {worker.email && (
                        <a
                          href={`mailto:${worker.email}`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                      )}
                    </div>
                  ) : (
                    <Link href="/auth/login">
                      <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors">
                        Sign in to contact
                      </button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
