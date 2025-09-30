import React from 'react';
import { Upload, Grid3x3 as Grid3X3, Camera, Sparkles, TrendingUp, Palette, Zap } from 'lucide-react';

const Dashboard = () => {
  const features = [
    {
      icon: Upload,
      title: 'Image Analysis',
      description: 'Upload kolam images and analyze their geometric patterns, symmetry, and mathematical principles.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Grid3X3,
      title: 'Interactive Board',
      description: 'Create your own kolam designs on a dot grid with AI-powered enhancement suggestions.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Camera,
      title: 'Live Camera',
      description: 'Capture kolam patterns in real-time and get instant mathematical analysis.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Sparkles,
      title: 'AI Enhancement',
      description: 'Use AI prompts to enhance and modify your kolam patterns with intelligent suggestions.',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const stats = [
    { label: 'Patterns Analyzed', value: '1,247', icon: TrendingUp },
    { label: 'Kolams Created', value: '892', icon: Palette },
    { label: 'AI Enhancements', value: '2,156', icon: Zap },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">KolamNET</span>
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Discover the mathematical beauty and geometric principles behind traditional kolam art. 
            Analyze, create, and enhance kolam patterns with cutting-edge AI technology.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-purple-200">{stat.label}</p>
                  </div>
                  <Icon className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-purple-200 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-2xl p-8 border border-orange-500/30">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Explore Kolam Art?</h2>
            <p className="text-purple-200 mb-6">
              Start by uploading an image, creating on the interactive board, or using the camera to analyze patterns in real-time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-pink-600 transition-all flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Image
              </button>
              <button className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center border border-white/20">
                <Grid3X3 className="w-5 h-5 mr-2" />
                Create Kolam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;