'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import FilterSidebar from '@/components/FilterSidebar';
import TaskList from '@/components/TaskList';
import Footer from '@/components/Footer';
import { tasks } from '@/data/mockData';
import { FilterState } from '@/types';

export default function TasksPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    minBudget: 0,
    maxBudget: 1000,
    location: 'All Locations',
    sortBy: 'newest',
    status: 'all',
  });
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <CategoryBar 
        selectedCategory={filters.category} 
        onCategoryChange={handleCategoryChange} 
      />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          <FilterSidebar 
            filters={filters}
            onFilterChange={setFilters}
            isOpen={filterSidebarOpen}
            onClose={() => setFilterSidebarOpen(false)}
          />
          <TaskList 
            tasks={tasks}
            filters={filters}
            onOpenFilters={() => setFilterSidebarOpen(true)}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
