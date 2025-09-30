import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Grid3x3, Camera, Upload, ArrowRight } from "lucide-react";
import { supabase } from "../lib/mockSupabase";
import heroKolam from "../assets/hero-kolam.jpg";

const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session) {
                    navigate("/workspace");
                }
            }).catch((error) => {
                console.log("Supabase auth check failed:", error);
                // Continue without auth - just show landing page
            });
        } catch (error) {
            console.log("Supabase initialization failed:", error);
            // Continue without auth - just show landing page
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-50 via-dark-100 to-dark-200">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-crayon-orange-900/5 via-crayon-yellow-900/5 to-transparent" />
                <div className="container mx-auto px-4 py-20 relative">
                    <div className="text-center space-y-8 max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 backdrop-blur-xl shadow-2xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-700 hover:scale-105 hover:shadow-3xl group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-crayon-orange-400/80 via-crayon-yellow-400/80 to-crayon-orange-500/80 backdrop-blur-sm flex items-center justify-center shadow-2xl animate-pulse group-hover:animate-spin transition-all duration-1000">
                                <Sparkles className="w-7 h-7 text-white drop-shadow-lg" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-white via-crayon-orange-300 to-crayon-yellow-300 bg-clip-text text-transparent drop-shadow-sm">
                                kolamNET
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg">
                            Analyze & Create{" "}
                            <span className="bg-gradient-to-r from-crayon-orange-400 to-crayon-yellow-400 bg-clip-text text-transparent">
                                Sacred Geometry
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Discover the mathematical beauty behind traditional kolam art. Analyze patterns,
                            understand geometry, and create your own designs with AI-powered tools.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                            <button
                                onClick={() => navigate("/auth")}
                                className="bg-gradient-to-br from-crayon-orange-600 via-crayon-red-600 to-crayon-orange-700 backdrop-blur-xl text-white text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110 hover:rotate-1 hover:from-crayon-orange-700 hover:to-crayon-red-700 flex items-center gap-3 justify-center font-bold border border-white/20 hover:border-white/40 group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <span className="relative z-10">Get Started</span>
                                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                            <button
                                onClick={() => navigate("/auth")}
                                className="border-2 border-white/30 text-white bg-white/5 backdrop-blur-xl text-lg px-10 py-6 rounded-2xl hover:bg-white/15 hover:border-white/50 transition-all duration-700 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 hover:-rotate-1 group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-crayon-orange-400/10 to-crayon-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <span className="relative z-10">Learn More</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-16 max-w-5xl mx-auto">
                        <img
                            src={heroKolam}
                            alt="Beautiful kolam pattern"
                            className="w-full h-auto"
                            style={{
                                filter: 'drop-shadow(0 0 30px rgba(255, 145, 103, 0.3)) drop-shadow(0 0 60px rgba(255, 235, 153, 0.2))'
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative bg-gradient-to-b from-transparent via-black/20 to-black/60">
                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">
                            Everything You Need to{" "}
                            <span className="bg-gradient-to-r from-crayon-orange-400 to-crayon-yellow-400 bg-clip-text text-transparent">
                                Master Kolam
                            </span>
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Powerful tools to analyze, create, and understand the sacred geometry of kolam art
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="group">
                            <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 hover:rotate-1 h-full border border-white/20 hover:border-white/40 group overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-crayon-orange-400/5 via-transparent to-crayon-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-crayon-orange-400/80 via-crayon-yellow-400/80 to-crayon-orange-500/80 backdrop-blur-sm flex items-center justify-center mb-8 shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 relative z-10">
                                    <Upload className="w-8 h-8 text-white drop-shadow-lg" />
                                </div>
                                <h3 className="text-2xl font-bold mb-6 text-white relative z-10 group-hover:text-crayon-orange-200 transition-colors duration-500">Analyze Patterns</h3>
                                <p className="text-gray-300 leading-relaxed relative z-10 group-hover:text-gray-200 transition-colors duration-500">
                                    Upload kolam images and get detailed analysis of geometry, symmetry, and
                                    mathematical principles. Select specific regions for focused insights.
                                </p>
                            </div>
                        </div>

                        <div className="group">
                            <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 hover:-rotate-1 h-full border border-white/20 hover:border-white/40 group overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-crayon-yellow-400/5 via-transparent to-crayon-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-crayon-yellow-400/80 via-crayon-orange-400/80 to-crayon-yellow-500/80 backdrop-blur-sm flex items-center justify-center mb-8 shadow-2xl group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700 relative z-10">
                                    <Grid3x3 className="w-8 h-8 text-white drop-shadow-lg" />
                                </div>
                                <h3 className="text-2xl font-bold mb-6 text-white relative z-10 group-hover:text-crayon-yellow-200 transition-colors duration-500">Create Designs</h3>
                                <p className="text-gray-300 leading-relaxed relative z-10 group-hover:text-gray-200 transition-colors duration-500">
                                    Draw on an interactive dot grid board. Choose colors, get AI suggestions, and
                                    enhance your patterns with intelligent prompts.
                                </p>
                            </div>
                        </div>

                        <div className="group">
                            <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 hover:rotate-1 h-full border border-white/20 hover:border-white/40 group overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-crayon-orange-400/5 via-transparent to-crayon-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-crayon-orange-400/80 via-crayon-yellow-400/80 to-crayon-orange-500/80 backdrop-blur-sm flex items-center justify-center mb-8 shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 relative z-10">
                                    <Camera className="w-8 h-8 text-white drop-shadow-lg" />
                                </div>
                                <h3 className="text-2xl font-bold mb-6 text-white relative z-10 group-hover:text-crayon-orange-200 transition-colors duration-500">Capture & Copy</h3>
                                <p className="text-gray-300 leading-relaxed relative z-10 group-hover:text-gray-200 transition-colors duration-500">
                                    Use your camera to capture real kolam designs. AI analyzes the pattern and
                                    recreates an exact digital copy for you to study.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-5xl mx-auto text-center space-y-10 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] p-16 shadow-3xl relative overflow-hidden border border-white/20 hover:border-white/30 transition-all duration-700 hover:scale-105 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-crayon-orange-400/5 via-transparent via-transparent to-crayon-yellow-400/5 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white drop-shadow-lg">
                            Ready to Explore{" "}
                            <span className="bg-gradient-to-r from-crayon-orange-300 via-crayon-yellow-300 to-crayon-orange-400 bg-clip-text text-transparent animate-pulse">
                                Kolam Art?
                            </span>
                        </h2>
                        <p className="text-2xl text-gray-200 mb-12 leading-relaxed">
                            Join kolamNET and start your journey into the mathematical beauty of sacred geometry
                        </p>
                        <button
                            onClick={() => navigate("/auth")}
                            className="bg-gradient-to-br from-crayon-orange-600 via-crayon-red-600 to-crayon-orange-700 backdrop-blur-xl text-white text-xl px-12 py-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110 hover:rotate-1 hover:from-crayon-orange-700 hover:to-crayon-red-700 flex items-center gap-4 justify-center mx-auto font-bold border border-white/30 hover:border-white/50 group/btn overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700"></div>
                            <span className="relative z-10">Start Creating</span>
                            <ArrowRight className="w-6 h-6 relative z-10 group-hover/btn:translate-x-2 transition-transform duration-500" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/20 py-12 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-300 text-lg font-medium">&copy; 2025 kolamNET. Preserving and analyzing traditional art through technology.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;