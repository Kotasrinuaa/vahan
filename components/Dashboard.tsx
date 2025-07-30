'use client';

import { useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Zap, Car, MapPin, Calendar } from 'lucide-react';

import StatCard from '@/components/StatCard';
import VehicleLineChart from '@/components/charts/LineChart';
import FuelAreaChart from '@/components/charts/AreaChart';
import VehicleBarChart from '@/components/charts/BarChart';
import FuelDonutChart from '@/components/charts/DonutChart';
import ElectricRingChart from '@/components/charts/RingChart';

import { useDashboardStore } from '@/store/dashboardState';
import {
  VahanRecord,
  filterData,
  generateInsights,
  getStatCards,
  getTimeSeriesData,
  getFuelTrendsData,
  getVehicleClassByStateData,
  getFuelDistributionData,
  getElectricVsNonElectricData
} from '@/utils/vahanUtils';

interface DashboardProps {
  data: VahanRecord[];
}

export default function Dashboard({ data }: DashboardProps) {
  const { filters } = useDashboardStore();

  const filteredData = useMemo(() => {
    return filterData(data, filters);
  }, [data, filters]);

  const insights = useMemo(() => {
    return generateInsights(filteredData);
  }, [filteredData]);

  const statCards = useMemo(() => {
    return getStatCards(filteredData);
  }, [filteredData]);

  const timeSeriesData = useMemo(() => {
    return getTimeSeriesData(filteredData);
  }, [filteredData]);

  const fuelTrendsData = useMemo(() => {
    return getFuelTrendsData(filteredData);
  }, [filteredData]);

  const vehicleClassData = useMemo(() => {
    return getVehicleClassByStateData(filteredData);
  }, [filteredData]);

  const fuelDistributionData = useMemo(() => {
    return getFuelDistributionData(filteredData);
  }, [filteredData]);

  const electricVsNonElectricData = useMemo(() => {
    return getElectricVsNonElectricData(filteredData);
  }, [filteredData]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.years.length > 0 ||
      filters.months.length > 0 ||
      filters.states.length > 0 ||
      filters.fuelTypes.length > 0 ||
      filters.vehicleClasses.length > 0 ||
      filters.electricOnly !== null
    );
  }, [filters]);

  if (filteredData.length === 0) {
    return (
      <div className="flex-1 bg-black text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl w-fit mx-auto mb-6">
              <Car className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">No Data Found</h2>
            <p className="text-gray-400 mb-6">
              No vehicle registration records match your current filter criteria.
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your filters to see more data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-black text-white overflow-y-auto">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg shadow-purple-500/25">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Vahan Analytics Dashboard
                </h1>
                <p className="text-gray-400">
                  {hasActiveFilters ? 'Filtered' : 'Complete'} Vehicle Registration Insights for India
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse" />
                  Filtered
                </Badge>
              )}
              <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                {filteredData.length.toLocaleString()} Records
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 border border-gray-700/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/25">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-purple-600 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/25">
              <TrendingUp className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => (
                <StatCard key={stat.title} stat={stat} index={index} />
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <VehicleLineChart 
                data={timeSeriesData} 
                title="Vehicle Registrations Over Time" 
              />
              <FuelAreaChart 
                data={fuelTrendsData} 
                title="Fuel Type Usage Trends" 
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <VehicleBarChart 
                data={vehicleClassData} 
                title="Vehicle Class Distribution by State" 
              />
              <FuelDonutChart 
                data={fuelDistributionData} 
                title="Fuel Type Distribution" 
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ElectricRingChart 
                data={electricVsNonElectricData} 
                title="Electric vs Non-Electric Registrations" 
              />
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3" />
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-200">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-blue-400 mr-3" />
                      <span className="text-gray-300">Total States</span>
                    </div>
                    <span className="text-white font-semibold">
                      {new Set(filteredData.map(r => r.state)).size}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-200">
                    <div className="flex items-center">
                      <Car className="w-5 h-5 text-green-400 mr-3" />
                      <span className="text-gray-300">Vehicle Classes</span>
                    </div>
                    <span className="text-white font-semibold">
                      {new Set(filteredData.map(r => r.vehicle_class)).size}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-200">
                    <div className="flex items-center">
                      <Zap className="w-5 h-5 text-yellow-400 mr-3" />
                      <span className="text-gray-300">Fuel Types</span>
                    </div>
                    <span className="text-white font-semibold">
                      {new Set(filteredData.map(r => r.fuel)).size}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-200">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-purple-400 mr-3" />
                      <span className="text-gray-300">Data Period</span>
                    </div>
                    <span className="text-white font-semibold">
                      {Math.min(...filteredData.map(r => r.year))} - {Math.max(...filteredData.map(r => r.year))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insights.map((insight, index) => (
                <Card key={index} className="bg-gray-900/30 border-gray-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:bg-gray-900/40">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <div className={`w-3 h-3 rounded-full mr-3 shadow-lg ${
                        index % 4 === 0 ? 'bg-purple-500 shadow-purple-500/50' :
                        index % 4 === 1 ? 'bg-blue-500 shadow-blue-500/50' :
                        index % 4 === 2 ? 'bg-green-500 shadow-green-500/50' : 'bg-orange-500 shadow-orange-500/50'
                      }`} />
                      Key Insight #{index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">{insight}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gray-900/30 border-gray-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-3 text-green-400" />
                  Data Summary
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {hasActiveFilters ? 'Filtered dataset' : 'Complete dataset'} overview of vehicle registration records
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-200">
                    <h4 className="font-semibold text-white mb-2">Total Records</h4>
                    <p className="text-2xl font-bold text-purple-400">{filteredData.length.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-200">
                    <h4 className="font-semibold text-white mb-2">Total Registrations</h4>
                    <p className="text-2xl font-bold text-blue-400">
                      {filteredData.reduce((sum, record) => sum + record.value, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-200">
                    <h4 className="font-semibold text-white mb-2">Coverage Period</h4>
                    <p className="text-2xl font-bold text-green-400">
                      {filteredData.length > 0 ? Math.max(...filteredData.map(r => r.year)) - Math.min(...filteredData.map(r => r.year)) + 1 : 0} Years
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}