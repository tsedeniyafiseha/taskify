'use client';

import { FilterState } from '@/types';
import { locations } from '@/data/mockData';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({ filters, onFilterChange, isOpen, onClose }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    budget: true,
    location: true,
    status: true,
    sort: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      category: 'all',
      minBudget: 0,
      maxBudget: 1000,
      location: 'All Locations',
      sortBy: 'newest',
      status: 'all',
    });
  };

  const hasActiveFilters = 
    filters.minBudget > 0 || 
    filters.maxBudget < 1000 || 
    filters.location !== 'All Locations' ||
    filters.status !== 'all';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 lg:top-20 left-0 h-full lg:h-auto w-80 lg:w-64 
        bg-white lg:bg-transparent z-50 lg:z-0
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto lg:overflow-visible
        border-r lg:border-r-0 border-gray-200
        shadow-xl lg:shadow-none
      `}>
        <div className="p-6 lg:p-0">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-900" />
              <span className="font-semibold text-gray-900">Filters</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-700" />
              <span className="font-medium text-sm text-gray-900">Filters</span>
            </div>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Budget Filter */}
          <div className="mb-6">
            <button 
              onClick={() => toggleSection('budget')}
              className="flex items-center justify-between w-full mb-3"
            >
              <span className="text-sm font-medium text-gray-900">Budget</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.budget ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.budget && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Min</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input
                        type="number"
                        value={filters.minBudget}
                        onChange={(e) => updateFilter('minBudget', Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <span className="text-gray-400 mt-5">—</span>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Max</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input
                        type="number"
                        value={filters.maxBudget}
                        onChange={(e) => updateFilter('maxBudget', Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                        placeholder="1000"
                      />
                    </div>
                  </div>
                </div>
                {/* Quick Budget Buttons */}
                <div className="flex flex-wrap gap-2">
                  {[50, 100, 200, 500].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => updateFilter('maxBudget', amount)}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        filters.maxBudget === amount 
                          ? 'bg-purple-600 text-white border-purple-600' 
                          : 'border-gray-200 text-gray-600 hover:border-purple-500 hover:text-purple-600'
                      }`}
                    >
                      Under ${amount}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <button 
              onClick={() => toggleSection('location')}
              className="flex items-center justify-between w-full mb-3"
            >
              <span className="text-sm font-medium text-gray-900">Location</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.location ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.location && (
              <div className="space-y-1">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => updateFilter('location', location)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.location === location
                        ? 'bg-purple-600 text-white'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="mb-6">
            <button 
              onClick={() => toggleSection('status')}
              className="flex items-center justify-between w-full mb-3"
            >
              <span className="text-sm font-medium text-gray-900">Status</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.status ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.status && (
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Tasks' },
                  { value: 'open', label: 'Open' },
                  { value: 'assigned', label: 'Assigned' },
                  { value: 'completed', label: 'Completed' },
                ].map((status) => (
                  <label key={status.value} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      filters.status === status.value 
                        ? 'bg-purple-600 border-purple-600' 
                        : 'border-gray-300 group-hover:border-purple-500'
                    }`}>
                      {filters.status === status.value && (
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{status.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Sort By */}
          <div className="mb-6">
            <button 
              onClick={() => toggleSection('sort')}
              className="flex items-center justify-between w-full mb-3"
            >
              <span className="text-sm font-medium text-gray-900">Sort By</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.sort ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.sort && (
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value as FilterState['sortBy'])}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
              >
                <option value="newest">Newest First</option>
                <option value="budget-high">Highest Budget</option>
                <option value="budget-low">Lowest Budget</option>
                <option value="offers">Most Offers</option>
              </select>
            )}
          </div>

          {/* Mobile Apply Button */}
          <div className="lg:hidden pt-4 border-t border-gray-200">
            <button 
              onClick={onClose}
              className="w-full bg-purple-600 text-white py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
