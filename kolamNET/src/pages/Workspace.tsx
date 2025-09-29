import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, type User } from '../lib/mockSupabase';
import { LogOut, Upload, Camera, Grid3x3, Palette, BarChart3 } from 'lucide-react';

// Import Bolt-style components
import ImageAnalyzer from '../components/workspace/ImageAnalyzer';
import KolamCanvas from '../components/workspace/KolamCanvas';
import CameraCapture from '../components/workspace/CameraCapture';

type ActiveTab = 'dashboard' | 'analyzer' | 'board' | 'camera';

const Workspace = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setActiveTab('dashboard');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-100 via-crayon-orange-800/30 to-crayon-yellow-800/30 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-crayon-red-600 to-crayon-orange-600 rounded-full mb-6">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to KolamNET</h2>
            <p className="text-pastel-yellow mb-8 max-w-md mx-auto">
              Choose a tool from the navigation above to start analyzing, creating, or capturing kolam patterns.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <button
                onClick={() => setActiveTab('analyzer')}
                className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-700 hover:scale-105 hover:rotate-1 shadow-2xl hover:shadow-3xl group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-crayon-orange-400/5 via-transparent to-crayon-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Upload className="w-12 h-12 text-crayon-orange-400 mx-auto mb-4 drop-shadow-lg relative z-10" />
                <h3 className="text-white font-bold mb-3 text-lg relative z-10">Image Analyzer</h3>
                <p className="text-crayon-orange-200 text-base relative z-10">Upload and analyze kolam patterns</p>
              </button>
              <button
                onClick={() => setActiveTab('board')}
                className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-700 hover:scale-105 hover:rotate-1 shadow-2xl hover:shadow-3xl group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-crayon-yellow-400/5 via-transparent to-crayon-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Grid3x3 className="w-12 h-12 text-crayon-yellow-400 mx-auto mb-4 drop-shadow-lg relative z-10" />
                <h3 className="text-white font-bold mb-3 text-lg relative z-10">Kolam Board</h3>
                <p className="text-crayon-orange-200 text-base relative z-10">Create patterns on dot grid</p>
              </button>
              <button
                onClick={() => setActiveTab('camera')}
                className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-700 hover:scale-105 hover:rotate-1 shadow-2xl hover:shadow-3xl group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-crayon-orange-400/5 via-transparent to-crayon-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Camera className="w-12 h-12 text-crayon-orange-300 mx-auto mb-4 drop-shadow-lg relative z-10" />
                <h3 className="text-white font-bold mb-3 text-lg relative z-10">Camera Analyzer</h3>
                <p className="text-crayon-orange-200 text-base relative z-10">Capture live kolam patterns</p>
              </button>
            </div>
          </div>
        );
      case 'analyzer':
        return <ImageAnalyzer />;
      case 'board':
        return <KolamCanvas />;
      case 'camera':
        return <CameraCapture />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-100 via-crayon-orange-800/30 to-crayon-yellow-800/30">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-2xl border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-crayon-orange-400 to-crayon-yellow-400 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-500">
                <Palette className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">KolamNET</h1>
                <p className="text-sm text-crayon-orange-200">{user.email}</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex space-x-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'analyzer', label: 'Analyzer', icon: Upload },
                { id: 'board', label: 'Board', icon: Grid3x3 },
                { id: 'camera', label: 'Camera', icon: Camera },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as ActiveTab)}
                    className={`px-6 py-3 rounded-2xl text-base font-medium flex items-center space-x-3 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-xl border ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-crayon-orange-600 to-crayon-red-600 text-white border-white/40'
                        : 'text-crayon-orange-200 hover:text-white hover:bg-white/10 border-white/20 hover:border-white/40'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-crayon-red-400/80 to-crayon-orange-400/80 hover:from-crayon-red-500/90 hover:to-crayon-orange-500/90 text-white rounded-2xl transition-all duration-500 backdrop-blur-xl border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl hover:scale-105 hover:rotate-1"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveComponent()}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white/10 via-white/5 to-white/10 backdrop-blur-2xl border-t border-white/30 shadow-2xl">
        <div className="grid grid-cols-4 h-20">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'analyzer', label: 'Analyzer', icon: Upload },
            { id: 'board', label: 'Board', icon: Grid3x3 },
            { id: 'camera', label: 'Camera', icon: Camera },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex flex-col items-center justify-center space-y-2 transition-all duration-500 hover:scale-110 ${
                  activeTab === tab.id
                    ? 'text-crayon-orange-400 bg-white/10 rounded-2xl m-2 shadow-lg'
                    : 'text-crayon-orange-200 hover:text-white hover:bg-white/5 rounded-2xl m-2'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
