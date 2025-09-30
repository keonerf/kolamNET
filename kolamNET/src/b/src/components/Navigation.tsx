import React from 'react';
import { User } from '@supabase/supabase-js';
import { Palette, Upload, Grid3x3 as Grid3X3, Camera, LogOut, User as UserIcon } from 'lucide-react';

type ActiveTab = 'dashboard' | 'analyzer' | 'board' | 'camera';

interface NavigationProps {
  user: User;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onSignOut: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, activeTab, setActiveTab, onSignOut }) => {
  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: Palette },
    { id: 'analyzer' as ActiveTab, label: 'Image Analyzer', icon: Upload },
    { id: 'board' as ActiveTab, label: 'Kolam Board', icon: Grid3X3 },
    { id: 'camera' as ActiveTab, label: 'Camera', icon: Camera },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center">
              <Palette className="w-8 h-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-white">KolamNET</span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center ${
                      activeTab === item.id
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-white/70">
              <UserIcon className="w-4 h-4 mr-2" />
              <span className="text-sm">{user.email}</span>
            </div>
            <button
              onClick={onSignOut}
              className="text-white/70 hover:text-white p-2 rounded-md hover:bg-white/10 transition-all"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all flex items-center ${
                  activeTab === item.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;