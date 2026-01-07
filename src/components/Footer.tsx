'use client';

import { Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-xl font-semibold">Taskify</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Christchurch&apos;s trusted marketplace for getting things done.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Discover */}
          <div>
            <h4 className="font-semibold mb-4">Discover</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/tasks" className="hover:text-purple-400 transition-colors">Browse Tasks</Link></li>
              <li><Link href="/how-it-works" className="hover:text-purple-400 transition-colors">How it Works</Link></li>
              <li><Link href="/become-tasker" className="hover:text-purple-400 transition-colors">Become a Tasker</Link></li>
              <li><Link href="/post-task" className="hover:text-purple-400 transition-colors">Post a Task</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/tasks?category=cleaning" className="hover:text-purple-400 transition-colors">Cleaning</Link></li>
              <li><Link href="/tasks?category=handyman" className="hover:text-purple-400 transition-colors">Handyman</Link></li>
              <li><Link href="/tasks?category=delivery" className="hover:text-purple-400 transition-colors">Delivery</Link></li>
              <li><Link href="/tasks?category=gardening" className="hover:text-purple-400 transition-colors">Gardening</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold mb-4">Christchurch</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">CBD</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Riccarton</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Papanui</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Sumner</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Help Centre</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
              <li><Link href="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2026 Taskify. Made with ❤️ in Christchurch, New Zealand.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
