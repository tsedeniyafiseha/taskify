'use client';

import { categories } from '@/data/mockData';
import { 
  Grid3X3, Sparkles, Truck, Wrench, Package, 
  Leaf, Puzzle, Monitor, FileText, Palette 
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Grid3X3, Sparkles, Truck, Wrench, Package,
  Leaf, Puzzle, Monitor, FileText, Palette
};

interface CategoryBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryBar({ selectedCategory, onCategoryChange }: CategoryBarProps) {
  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const Icon = iconMap[category.icon];
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{category.name}</span>
                <span className={`text-xs ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
