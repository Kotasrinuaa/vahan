import { parse } from 'csv-parse/sync';
import { DashboardFilters } from '@/store/dashboardState';

export interface VahanRecord {
  year: number;
  month: number;
  state: string;
  rto: string;
  vehicle_class: string;
  fuel: string;
  value: number;
}

export interface StatCard {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export async function parseVahanData(): Promise<VahanRecord[]> {
  try {
    const response = await fetch('/data/vahan.csv');
    const csvText = await response.text();
    
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
    });

    return records.map((record: any) => ({
      year: parseInt(record.year) || 0,
      month: parseInt(record.month) || 0,
      state: record.state || '',
      rto: record.rto || '',
      vehicle_class: record.vehicle_class || '',
      fuel: record.fuel || '',
      value: parseInt(record.value) || 0,
    }));
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
}

export function generateInsights(data: VahanRecord[]): string[] {
  const insights: string[] = [];
  
  // Check if data is empty
  if (data.length === 0) {
    insights.push("No data available for analysis");
    return insights;
  }
  
  // Total registrations
  const totalRegistrations = data.reduce((sum, record) => sum + record.value, 0);
  
  // State-wise analysis
  const stateData = data.reduce((acc, record) => {
    acc[record.state] = (acc[record.state] || 0) + record.value;
    return acc;
  }, {} as Record<string, number>);
  
  const topState = Object.entries(stateData).sort(([,a], [,b]) => b - a)[0];
  
  // Fuel type analysis
  const fuelData = data.reduce((acc, record) => {
    acc[record.fuel] = (acc[record.fuel] || 0) + record.value;
    return acc;
  }, {} as Record<string, number>);
  
  const electricRegistrations = fuelData['ELECTRIC'] || 0;
  const electricPercentage = totalRegistrations > 0 ? ((electricRegistrations / totalRegistrations) * 100).toFixed(1) : '0.0';
  
  // Vehicle class analysis
  const vehicleClassData = data.reduce((acc, record) => {
    acc[record.vehicle_class] = (acc[record.vehicle_class] || 0) + record.value;
    return acc;
  }, {} as Record<string, number>);
  
  const topVehicleClass = Object.entries(vehicleClassData).sort(([,a], [,b]) => b - a)[0];
  
  // Year-over-year growth
  const yearlyData = data.reduce((acc, record) => {
    acc[record.year] = (acc[record.year] || 0) + record.value;
    return acc;
  }, {} as Record<number, number>);
  
  const years = Object.keys(yearlyData).map(Number).sort();
  if (years.length >= 2) {
    const latestYear = years[years.length - 1];
    const previousYear = years[years.length - 2];
    const growth = ((yearlyData[latestYear] - yearlyData[previousYear]) / yearlyData[previousYear] * 100).toFixed(1);
    
    insights.push(`Vehicle registrations ${parseFloat(growth) > 0 ? 'increased' : 'decreased'} by ${Math.abs(parseFloat(growth))}% from ${previousYear} to ${latestYear}`);
  }
  
  // Add insights only if we have valid data
  if (topState) {
    insights.push(`${topState[0]} leads in vehicle registrations with ${topState[1].toLocaleString()} vehicles`);
  }
  
  insights.push(`Electric vehicles account for ${electricPercentage}% of total registrations`);
  
  if (topVehicleClass) {
    insights.push(`${topVehicleClass[0]} is the most popular vehicle class with ${topVehicleClass[1].toLocaleString()} registrations`);
  }
  
  // Monthly trends
  const monthlyData = data.reduce((acc, record) => {
    const key = `${record.year}-${record.month.toString().padStart(2, '0')}`;
    acc[key] = (acc[key] || 0) + record.value;
    return acc;
  }, {} as Record<string, number>);
  
  const peakMonth = Object.entries(monthlyData).sort(([,a], [,b]) => b - a)[0];
  if (peakMonth) {
    insights.push(`Peak registration month was ${peakMonth[0]} with ${peakMonth[1].toLocaleString()} vehicles`);
  }
  
  return insights;
}

export function filterData(data: VahanRecord[], filters: DashboardFilters): VahanRecord[] {
  return data.filter((record) => {
    // Year filter
    if (filters.years.length > 0 && !filters.years.includes(record.year)) {
      return false;
    }

    // Month filter
    if (filters.months.length > 0 && !filters.months.includes(record.month)) {
      return false;
    }

    // State filter
    if (filters.states.length > 0 && !filters.states.includes(record.state)) {
      return false;
    }

    // Fuel type filter
    if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(record.fuel)) {
      return false;
    }

    // Vehicle class filter
    if (filters.vehicleClasses.length > 0 && !filters.vehicleClasses.includes(record.vehicle_class)) {
      return false;
    }

    // Electric vs Non-Electric filter
    if (filters.electricOnly !== null) {
      const isElectric = record.fuel === 'ELECTRIC';
      if (filters.electricOnly && !isElectric) {
        return false;
      }
      if (!filters.electricOnly && isElectric) {
        return false;
      }
    }

    return true;
  });
}

export function getUniqueValues(data: VahanRecord[]) {
  return {
    years: Array.from(new Set(data.map(r => r.year))).sort((a, b) => a - b),
    months: Array.from(new Set(data.map(r => r.month))).sort((a, b) => a - b),
    states: Array.from(new Set(data.map(r => r.state))).sort(),
    fuelTypes: Array.from(new Set(data.map(r => r.fuel))).sort(),
    vehicleClasses: Array.from(new Set(data.map(r => r.vehicle_class))).sort(),
  };
}

export function getStatCards(data: VahanRecord[]): StatCard[] {
  const totalRegistrations = data.reduce((sum, record) => sum + record.value, 0);
  
  const fuelData = data.reduce((acc, record) => {
    acc[record.fuel] = (acc[record.fuel] || 0) + record.value;
    return acc;
  }, {} as Record<string, number>);
  
  const topFuel = Object.entries(fuelData).sort(([,a], [,b]) => b - a)[0];
  
  const vehicleClassData = data.reduce((acc, record) => {
    acc[record.vehicle_class] = (acc[record.vehicle_class] || 0) + record.value;
    return acc;
  }, {} as Record<string, number>);
  
  const topVehicleClass = Object.entries(vehicleClassData).sort(([,a], [,b]) => b - a)[0];
  
  const stateData = data.reduce((acc, record) => {
    acc[record.state] = (acc[record.state] || 0) + record.value;
    return acc;
  }, {} as Record<string, number>);
  
  const topState = Object.entries(stateData).sort(([,a], [,b]) => b - a)[0];
  
  return [
    {
      title: 'Total Registered Vehicles',
      value: totalRegistrations.toLocaleString(),
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Top Fuel Type',
      value: topFuel ? topFuel[0] : 'N/A',
      change: topFuel ? `${topFuel[1].toLocaleString()} vehicles` : 'No data',
      trend: 'up'
    },
    {
      title: 'Most Popular Vehicle Class',
      value: topVehicleClass ? topVehicleClass[0] : 'N/A',
      change: topVehicleClass && totalRegistrations > 0 ? `${((topVehicleClass[1] / totalRegistrations) * 100).toFixed(1)}% share` : 'No data',
      trend: 'up'
    },
    {
      title: 'Leading State',
      value: topState ? topState[0] : 'N/A',
      change: topState ? `${topState[1].toLocaleString()} registrations` : 'No data',
      trend: 'up'
    }
  ];
}

export function getTimeSeriesData(data: VahanRecord[]): ChartData[] {
  const monthlyData = data.reduce((acc, record) => {
    const key = `${record.year}-${record.month.toString().padStart(2, '0')}`;
    acc[key] = (acc[key] || 0) + record.value;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({
      name: date,
      value,
      date: new Date(date + '-01')
    }));
}

export function getFuelTrendsData(data: VahanRecord[]): ChartData[] {
  const fuelByMonth = data.reduce((acc, record) => {
    const key = `${record.year}-${record.month.toString().padStart(2, '0')}`;
    if (!acc[key]) acc[key] = {};
    acc[key][record.fuel] = (acc[key][record.fuel] || 0) + record.value;
    return acc;
  }, {} as Record<string, Record<string, number>>);
  
  const allFuels = Array.from(new Set(data.map(r => r.fuel)));
  
  return Object.entries(fuelByMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, fuels]) => {
      const result: ChartData = { name: date, value: 0 };
      allFuels.forEach(fuel => {
        result[fuel] = fuels[fuel] || 0;
        result.value += result[fuel];
      });
      return result;
    });
}

export function getVehicleClassByStateData(data: VahanRecord[]): ChartData[] {
  const stateClassData = data.reduce((acc, record) => {
    if (!acc[record.state]) acc[record.state] = {};
    acc[record.state][record.vehicle_class] = (acc[record.state][record.vehicle_class] || 0) + record.value;
    return acc;
  }, {} as Record<string, Record<string, number>>);
  
  const allClasses = [...new Set(data.map(r => r.vehicle_class))];
  
  return Object.entries(stateClassData).map(([state, classes]) => {
    const result: ChartData = { name: state, value: 0 };
    allClasses.forEach(vehicleClass => {
      result[vehicleClass] = classes[vehicleClass] || 0;
      result.value += result[vehicleClass];
    });
    return result;
  }).sort((a, b) => b.value - a.value).slice(0, 10);
}

export function getFuelDistributionData(data: VahanRecord[]): ChartData[] {
  const fuelData = data.reduce((acc, record) => {
    acc[record.fuel] = (acc[record.fuel] || 0) + record.value;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(fuelData).map(([fuel, value]) => ({
    name: fuel,
    value
  })).sort((a, b) => b.value - a.value);
}

export function getElectricVsNonElectricData(data: VahanRecord[]): ChartData[] {
  const electricCount = data
    .filter(record => record.fuel === 'ELECTRIC')
    .reduce((sum, record) => sum + record.value, 0);
  
  const totalCount = data.reduce((sum, record) => sum + record.value, 0);
  const nonElectricCount = totalCount - electricCount;
  
  return [
    { name: 'Electric', value: electricCount },
    { name: 'Non-Electric', value: nonElectricCount }
  ];
}