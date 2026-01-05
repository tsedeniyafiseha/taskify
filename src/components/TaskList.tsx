'use client';

import { Task, FilterState } from '@/types';
import TaskCard from './TaskCard';
import { SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';

interface TaskListProps {
  tasks: Task[];
  filters: FilterState;
  onOpenFilters: () => void;
}

export default function TaskList({ tasks, filters, onOpenFilters }: TaskListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      if (filters.category !== 'all' && task.category !== filters.category) return false;
      if (task.budget < filters.minBudget || task.budget > filters.maxBudget) return false;
      if (filters.location !== 'All Locations' && task.location !== filters.location) return false;
      if (filters.status !== 'all' && task.status !== filters.status) return false;
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'budget-high':
          return b.budget - a.budget;
        case 'budget-low':
          return a.budget - b.budget;
        case 'offers':
          return b.offers - a.offers;
        default:
          return 0;
      }
    });

  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            {filteredTasks.length} tasks available
          </h2>
          <p className="text-sm text-neutral-500">
            {filters.category === 'all' ? 'All categories' : filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}
            {filters.location !== 'All Locations' && ` in ${filters.location}`}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Mobile Filter Button */}
          <button 
            onClick={onOpenFilters}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-full text-sm font-medium hover:bg-neutral-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-neutral-200'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-neutral-200'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Task Grid/List */}
      {filteredTasks.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 gap-4' 
          : 'flex flex-col gap-4'
        }>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SlidersHorizontal className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No tasks found</h3>
          <p className="text-neutral-500 mb-4">Try adjusting your filters to see more results</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Load More */}
      {filteredTasks.length > 0 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-neutral-200 rounded-full text-sm font-medium hover:bg-neutral-50 transition-colors">
            Load More Tasks
          </button>
        </div>
      )}
    </div>
  );
}
