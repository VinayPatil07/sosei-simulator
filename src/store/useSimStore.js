import { create } from 'zustand';

export const useSimStore = create((set) => ({
  // Traffic & Acquisition Drivers
  creatorViews: 250000,
  viewerConversion: 0.3,
  creatorShare: 20,
  
  // Monetization Conversion Levers
  purchaseTendency: 3.5,     // General store conversion rate %
  subConversion: 2.2,        // Rank subscription conversion rate %
  gamemodeMultiplier: 1.2,    // 0.8 (Survival) to 1.5 (Box Server Economy)
  whaleCatcherEnabled: true,  // Toggles ultra-high-ticket optimization vectors
  
  // Corporate & Infrastructure Levers
  dataValue: 0.05,
  monthlyInfra: 2600,
  staffDevBudget: 2500,       // Fixed monthly budget for admins/developers
  
  setLever: (key, value) => set({ [key]: value }),
}));

export default useSimStore;
