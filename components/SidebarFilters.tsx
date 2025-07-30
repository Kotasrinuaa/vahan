'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X, RotateCcw } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardState';
import { VahanRecord, getUniqueValues } from '@/utils/vahanUtils';

interface SidebarFiltersProps {
  data: VahanRecord[];
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function SidebarFilters({ data }: SidebarFiltersProps) {
  const { filters, setFilters, resetFilters } = useDashboardStore();
  const [searchState, setSearchState] = useState('');
  const [uniqueValues, setUniqueValues] = useState({
    years: [] as number[],
    months: [] as number[],
    states: [] as string[],
    fuelTypes: [] as string[],
    vehicleClasses: [] as string[],
  });

  useEffect(() => {
    if (data.length > 0) {
      setUniqueValues(getUniqueValues(data));
    }
  }, [data]);

  const filteredStates = uniqueValues.states.filter(state =>
    state.toLowerCase().includes(searchState.toLowerCase())
  );

  const handleYearChange = (year: number, checked: boolean) => {
    const newYears = checked
      ? [...filters.years, year]
      : filters.years.filter(y => y !== year);
    setFilters({ years: newYears });
  };

  const handleMonthChange = (month: number) => {
    const newMonths = filters.months.includes(month)
      ? filters.months.filter(m => m !== month)
      : [...filters.months, month];
    setFilters({ months: newMonths });
  };

  const handleStateChange = (state: string, checked: boolean) => {
    const newStates = checked
      ? [...filters.states, state]
      : filters.states.filter(s => s !== state);
    setFilters({ states: newStates });
  };

  const handleFuelTypeChange = (fuel: string, checked: boolean) => {
    const newFuelTypes = checked
      ? [...filters.fuelTypes, fuel]
      : filters.fuelTypes.filter(f => f !== fuel);
    setFilters({ fuelTypes: newFuelTypes });
  };

  const handleVehicleClassChange = (vehicleClass: string, checked: boolean) => {
    const newVehicleClasses = checked
      ? [...filters.vehicleClasses, vehicleClass]
      : filters.vehicleClasses.filter(v => v !== vehicleClass);
    setFilters({ vehicleClasses: newVehicleClasses });
  };

  const handleElectricToggle = (value: boolean | null) => {
    setFilters({ electricOnly: value });
  };

  return (
    <div className="w-80 h-screen bg-black border-r border-gray-800 overflow-y-auto sticky top-0">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-purple-400 mr-2" />
            <h2 className="text-lg font-semibold text-white">Filters</h2>
          </div>
          <button
            onClick={resetFilters}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Year Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wide">Year</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {uniqueValues.years.map(year => (
              <label key={year} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.years.includes(year)}
                  onChange={(e) => handleYearChange(year, e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors">
                  {year}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Month Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wide">Month</h3>
          <div className="grid grid-cols-2 gap-2">
            {uniqueValues.months.map(month => (
              <button
                key={month}
                onClick={() => handleMonthChange(month)}
                className={`p-2 text-xs rounded-lg border transition-all duration-200 ${
                  filters.months.includes(month)
                    ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600'
                }`}
              >
                {monthNames[month - 1]?.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* State Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wide">State</h3>
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search states..."
              value={searchState}
              onChange={(e) => setSearchState(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {searchState && (
              <button
                onClick={() => setSearchState('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {filteredStates.map(state => (
              <label key={state} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.states.includes(state)}
                  onChange={(e) => handleStateChange(state, e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors">
                  {state}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Electric vs Non-Electric Toggle */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wide">Electric Filter</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleElectricToggle(null)}
              className={`px-3 py-2 text-xs rounded-lg border transition-all duration-200 ${
                filters.electricOnly === null
                  ? 'bg-gray-600 border-gray-500 text-white shadow-lg'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleElectricToggle(true)}
              className={`px-3 py-2 text-xs rounded-lg border transition-all duration-200 ${
                filters.electricOnly === true
                  ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-500/25'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Electric
            </button>
            <button
              onClick={() => handleElectricToggle(false)}
              className={`px-3 py-2 text-xs rounded-lg border transition-all duration-200 ${
                filters.electricOnly === false
                  ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-500/25'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Non-Electric
            </button>
          </div>
        </div>

        {/* Fuel Type Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wide">Fuel Type</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {uniqueValues.fuelTypes.map(fuel => (
              <label key={fuel} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.fuelTypes.includes(fuel)}
                  onChange={(e) => handleFuelTypeChange(fuel, e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors">
                  {fuel}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Vehicle Class Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wide">Vehicle Class</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {uniqueValues.vehicleClasses.map(vehicleClass => (
              <label key={vehicleClass} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.vehicleClasses.includes(vehicleClass)}
                  onChange={(e) => handleVehicleClassChange(vehicleClass, e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors">
                  {vehicleClass}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}