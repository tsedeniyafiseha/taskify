'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, MapPin, DollarSign, Calendar, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface SearchFilters {
  query: string;
  category: string;
  location: string;
  minBudget: number;
  maxBudget: number;
  budgetType: 'all' | 'fixed' | 'hourly';
  dateRange: 'all' | 'today' | 'week' | 'month';
  sortBy: 'newest' | 'budget_low' | 'budget_high' | 'closest';
}

interface EnhancedSearchProps {
  onFiltersChange: (filters: SearchFilters) => void;
  categories: any[];
  locations: any[];
  loading?: boolean;
}

export default function EnhancedSearch({ 
  onFiltersChange, 
  categories, 
  locations, 
  loading = false 
}: EnhancedSearchProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    location: 'all',
    minBudget: 0,
    maxBudget: 1000,
    budgetType: 'all',
    dateRange: 'all',
    sortBy: 'newest'
  });

  // Debounced search suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 2) {
        try {
          const { data } = await supabase
            .from('tasks')
            .select('title')
            .eq('status', 'approved')
            .ilike('title', `%${searchQuery}%`)
            .limit(5);
          
          if (data) {
            setSuggestions(data.map(t => t.title));
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, supabase]);

  // Update filters when search query changes
  useEffect(() => {
    const updatedFilters = { ...filters, query: searchQuery };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  }, [searchQuery]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      query: '',
      category: 'all',
      location: 'all',
      minBudget: 0,
      maxBudget: 1000,
      budgetType: 'all',
      dateRange: 'all',
      sortBy: 'newest'
    };
    setFilters(clearedFilters);
    setSearchQuery('');
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = filters.category !== 'all' || 
                          filters.location !== 'all' || 
                          filters.budgetType !== 'all' || 
                          filters.dateRange !== 'all' ||
                          filters.minBudget > 0 ||
                          filters.maxBudget < 1000;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search tasks by title, description, or location..."
              className="w-full pl-12 pr-20 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white text-gray-900"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  showFilters || hasActiveFilters
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                )}
              </button>
            </div>
          </div>

          {/* Search Suggestions */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => updateFilter('location', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.slug}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={filters.minBudget}
                      onChange={(e) => updateFilter('minBudget', Number(e.target.value))}
                      placeholder="Min"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      value={filters.maxBudget}
                      onChange={(e) => updateFilter('maxBudget', Number(e.target.value))}
                      placeholder="Max"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="budget_low">Budget: Low to High</option>
                    <option value="budget_high">Budget: High to Low</option>
                    <option value="closest">Closest Deadline</option>
                  </select>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700">Quick filters:</span>
                {[
                  { key: 'budgetType', value: 'fixed', label: 'Fixed Price' },
                  { key: 'budgetType', value: 'hourly', label: 'Hourly Rate' },
                  { key: 'dateRange', value: 'today', label: 'Posted Today' },
                  { key: 'dateRange', value: 'week', label: 'This Week' },
                ].map((quickFilter) => (
                  <button
                    key={`${quickFilter.key}-${quickFilter.value}`}
                    onClick={() => updateFilter(quickFilter.key as keyof SearchFilters, quickFilter.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      filters[quickFilter.key as keyof SearchFilters] === quickFilter.value
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {quickFilter.label}
                  </button>
                ))}
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && (
          <div className="mt-4 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
            <span className="ml-2 text-sm text-gray-500">Searching...</span>
          </div>
        )}
      </div>
    </div>
  );
}