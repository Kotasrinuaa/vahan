'use client';

import { useState, useEffect } from 'react';
import SidebarFilters from '@/components/SidebarFilters';
import Dashboard from '@/components/Dashboard';
import { VahanRecord, parseVahanData } from '@/utils/vahanUtils';

export default function DashboardPage() {
  const [data, setData] = useState<VahanRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const vahanData = await parseVahanData();
        setData(vahanData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4 shadow-lg shadow-purple-500/25"></div>
          <p className="text-gray-400">Loading vehicle registration data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <SidebarFilters data={data} />
      <Dashboard data={data} />
    </div>
  );
}