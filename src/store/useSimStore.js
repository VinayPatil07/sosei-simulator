import { create } from 'zustand';

const useSimStore = create((set) => ({
  creatorViews: 120000,
  viewerConversion: 0.25,
  creatorShare: 20,
  itemPrice: 8,
  purchaseTendency: 3,
  subPrice: 5,
  subConversion: 2,
  dataValue: 0.05,
  monthlyInfra: 500,
  gamemodeMultiplier: 1.2,
  staffDevBudget: 2500,
  setLever: (key, value) => set({ [key]: value }),
}));

export default useSimStore;
