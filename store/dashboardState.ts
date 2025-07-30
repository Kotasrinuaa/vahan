import { create } from 'zustand';

export interface DashboardFilters {
  years: number[];
  months: number[];
  states: string[];
  fuelTypes: string[];
  vehicleClasses: string[];
  electricOnly: boolean | null; // null = all, true = electric only, false = non-electric only
}

interface DashboardState {
  filters: DashboardFilters;
  setFilters: (filters: Partial<DashboardFilters>) => void;
  resetFilters: () => void;
}

const initialFilters: DashboardFilters = {
  years: [],
  months: [],
  states: [],
  fuelTypes: [],
  vehicleClasses: [],
  electricOnly: null,
};

export const useDashboardStore = create<DashboardState>((set) => ({
  filters: initialFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}));