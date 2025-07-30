import Link from 'next/link';
import { Car, BarChart3, TrendingUp, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
              <Car className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Vahan Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Comprehensive vehicle registration analytics for India. Explore trends, insights, and patterns in vehicle registrations across states, fuel types, and vehicle classes.
          </p>
          <Link 
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            View Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105">
            <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg w-fit mb-4">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
            <p className="text-gray-400">
              Track vehicle registration trends across different states, months, and vehicle categories with interactive visualizations.
            </p>
          </div>

          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:scale-105">
            <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg w-fit mb-4">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Fuel Type Insights</h3>
            <p className="text-gray-400">
              Analyze the shift towards electric vehicles and other fuel types with comprehensive breakdowns and trend analysis.
            </p>
          </div>

          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105">
            <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg w-fit mb-4">
              <Car className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Vehicle Classification</h3>
            <p className="text-gray-400">
              Explore registration patterns across different vehicle classes from motorcycles to commercial vehicles.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Data sourced from Vahan database • Updated regularly • Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}