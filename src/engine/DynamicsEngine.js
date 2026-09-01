/**
 * SOSEI MEDIA - ENTERPRISE SYSTEM DYNAMICS ENGINE V6.0
 * Fully itemized mathematical model. Calculates precise purchase volumes 
 * for 7 Subscription Tiers, 6 Crate Types, 5 Claim Block Tiers, and Battlepasses.
 */

// --- GLOBAL CONSTANTS & INFRASTRUCTURE ---
export const MAX_CCU_CAP = 1000;
export const CCU_PER_BACKEND_INSTANCE = 70;
export const MAX_BACKEND_INSTANCES = 15;
const BASE_MAU_MULTIPLIER = 32; // 1 CCU slot = ~32 rotating unique MAU per month
const BASE_MONTHLY_CHURN = 0.24;
const SYSTEM_OVERHEAD_FACTOR = 0.50; // 50% gross erosion for plugins, ad-hoc expenses, and maintenance

// --- CATALOG PRICING ---
const CATALOG = {
  ranks: {
    tier1: 4.99, tier2: 9.99, tier3: 19.99, tier4: 34.99, 
    tier5: 54.99, tier6: 89.99, tier7: 149.99
  },
  battlepass: 10.00,
  crates: {
    common: 1.99, uncommon: 4.99, rare: 9.99, epic: 14.99, mythic: 24.99, trail: 3.99
  },
  claimBlocks: {
    pkg1k: 4.99, pkg2k5: 9.99, pkg7k5: 24.99, pkg17k: 49.99, pkg45k: 99.99
  }
};

// --- HELPER FUNCTIONS ---
export const calculateRequiredInfra = (ccu) => {
  const instances = Math.min(Math.max(1, Math.ceil(ccu / CCU_PER_BACKEND_INSTANCE)), MAX_BACKEND_INSTANCES);
  return Math.round(107 + (160 * (instances / 7))); // Base proxy + node costs
};

export const calculateSimulation = (levers) => {
  let currentCcu = 42; // Day 1 baseline
  let data = [];
  let cumulativeGross = 0;
  let cumulativeExp = 0;
  let creatorFatigue = 1.0;

  for (let month = 1; month <= 24; month++) {
    // ---------------------------------------------------------
    // 1. SEASONALITY & ACQUISITION PHYSICS
    // ---------------------------------------------------------
    let seasonality = 1.0;
    const calendarMonth = month % 12 || 12;
    if ([6, 7, 8].includes(calendarMonth)) seasonality = 1.25; // Summer Surge
    else if ([12].includes(calendarMonth)) seasonality = 1.15; // Winter Holidays
    else if ([9, 10, 1].includes(calendarMonth)) seasonality = 0.85; // School slump

    const motivationMulti = Math.max(0.5, 0.75 + (levers.creatorShare - 15) * 0.015);
    creatorFatigue = Math.max(0.40, creatorFatigue - 0.015);
    if (levers.creatorShare > 30) creatorFatigue += 0.008; // High pay slows fatigue

    const fromCreators = (levers.creatorViews * 0.38 * 0.032 * 0.36) * 
                         (levers.viewerConversion / 0.3) * motivationMulti * creatorFatigue * seasonality;
    const fromOrganic = currentCcu * 0.025 * seasonality * Math.min(1, currentCcu / 250);
    
    // ---------------------------------------------------------
    // 2. INFRASTRUCTURE & CHURN (SERVER LOAD)
    // ---------------------------------------------------------
    const requiredInfraCost = calculateRequiredInfra(currentCcu);
    const serverLoad = requiredInfraCost / levers.monthlyInfra;
    
    let churnRate = BASE_MONTHLY_CHURN - (levers.creatorShare * 0.0015);
    if (serverLoad > 0.9) churnRate += 0.15; // Lag begins
    if (serverLoad > 1.1) churnRate += 0.45; // Catastrophic lag
    churnRate = Math.max(0.10, Math.min(churnRate, 0.65));

    currentCcu = Math.min(MAX_CCU_CAP, Math.max(currentCcu * 0.50, currentCcu - (currentCcu * churnRate) + fromCreators + fromOrganic));
    const currentMau = Math.round(currentCcu * BASE_MAU_MULTIPLIER);
    const lagStorePenalty = serverLoad > 0.95 ? 0.4 : 1.0; // Players don't buy if lagging

    // ---------------------------------------------------------
    // 3. ITEMIZED B2C MONETIZATION MODEL
    // ---------------------------------------------------------
    const activeSubs = currentMau * (levers.subConversion / 100) * lagStorePenalty;
    const activeBuyers = currentMau * (levers.purchaseTendency / 100) * lagStorePenalty;

    // A. RANK SUBSCRIPTIONS (Exponential Tier Decay)
    // Tiers 1-4 are Minnows/Dolphins. Tiers 5-7 are Whales.
    const whaleShift = levers.whaleCatcherEnabled ? 0.02 : 0; // Shifts 2% to top tier if enabled
    const rankVols = {
      t1: activeSubs * 0.40,
      t2: activeSubs * 0.25,
      t3: activeSubs * 0.15,
      t4: activeSubs * 0.10,
      t5: activeSubs * (0.05 - whaleShift/2),
      t6: activeSubs * 0.03,
      t7: activeSubs * (0.02 + whaleShift)
    };
    const rankRev = (rankVols.t1 * CATALOG.ranks.tier1) + (rankVols.t2 * CATALOG.ranks.tier2) +
                    (rankVols.t3 * CATALOG.ranks.tier3) + (rankVols.t4 * CATALOG.ranks.tier4) +
                    (rankVols.t5 * CATALOG.ranks.tier5) + (rankVols.t6 * CATALOG.ranks.tier6) +
                    (rankVols.t7 * CATALOG.ranks.tier7);

    // B. SEASONAL BATTLEPASS
    // Assumes roughly 60% of generic active buyers will grab the high-value $10 pass
    const bpVol = activeBuyers * 0.60;
    const battlepassRev = bpVol * CATALOG.battlepass;

    // C. GACHA & COSMETIC CRATES
    // High gamemodeMultiplier (Box/P2W) increases key velocity exponentially
    const whaleUplift = levers.whaleCatcherEnabled ? 1.8 : 1.0;
    const totalKeysBought = activeBuyers * 3.5 * levers.gamemodeMultiplier * whaleUplift;
    
    const crateVols = {
      common: totalKeysBought * 0.40,
      uncommon: totalKeysBought * 0.25,
      rare: totalKeysBought * 0.15,
      epic: totalKeysBought * 0.10,
      mythic: totalKeysBought * 0.05,
      trail: totalKeysBought * 0.05
    };
    const crateRev = (crateVols.common * CATALOG.crates.common) + (crateVols.uncommon * CATALOG.crates.uncommon) +
                     (crateVols.rare * CATALOG.crates.rare) + (crateVols.epic * CATALOG.crates.epic) +
                     (crateVols.mythic * CATALOG.crates.mythic) + (crateVols.trail * CATALOG.crates.trail);

    // D. CLAIM BLOCKS (Real Estate/Utility)
    // Small niche of builders (approx 15% of buyers) purchase territory protection
    const claimBuyers = activeBuyers * 0.15;
    const claimVols = {
      pkg1k: claimBuyers * 0.45,
      pkg2k5: claimBuyers * 0.30,
      pkg7k5: claimBuyers * 0.15,
      pkg17k: claimBuyers * 0.08,
      pkg45k: claimBuyers * 0.02
    };
    const claimRev = (claimVols.pkg1k * CATALOG.claimBlocks.pkg1k) + (claimVols.pkg2k5 * CATALOG.claimBlocks.pkg2k5) +
                     (claimVols.pkg7k5 * CATALOG.claimBlocks.pkg7k5) + (claimVols.pkg17k * CATALOG.claimBlocks.pkg17k) +
                     (claimVols.pkg45k * CATALOG.claimBlocks.pkg45k);

    // ---------------------------------------------------------
    // 4. B2B ENTERPRISE DATA MODEL
    // ---------------------------------------------------------
    const dataFreshnessMulti = 1 + (churnRate * 0.25); // New users entering = fresh data
    const scalePremium = currentMau > 10000 ? 1.4 : currentMau > 5000 ? 1.2 : 1.0;
    const b2bRev = currentMau * levers.dataValue * dataFreshnessMulti * scalePremium;
    
    const grossRev = rankRev + battlepassRev + crateRev + claimRev + b2bRev;

    // ---------------------------------------------------------
    // 5. EXPENSES & EBITDA (Including Hidden Costs)
    // ---------------------------------------------------------
    const creatorPayout = (rankRev + battlepassRev + crateRev + claimRev) * (levers.creatorShare / 100);
    const paymentProcessing = grossRev * 0.05; // 5% Tebex/Stripe/PayPal
    const actualInfraSpend = Math.min(requiredInfraCost, levers.monthlyInfra);
    const fixedAdmin = month === 1 ? 5000 : 500; // LLC, Domains, initial art commissions
    
    // Core constraint: The 50% systemic overhead representing staff, premium plugins, marketing, and taxes
    const totalExpenses = actualInfraSpend + creatorPayout + paymentProcessing + fixedAdmin + levers.staffDevBudget + (grossRev * SYSTEM_OVERHEAD_FACTOR);
    
    const net = grossRev - totalExpenses;
    const netMargin = grossRev > 0 ? (net / grossRev) * 100 : 0;

    cumulativeGross += grossRev;
    cumulativeExp += totalExpenses;

    // Push highly detailed itemized payload for tooltips
    data.push({
      month,
      ccu: Math.round(currentCcu),
      mau: Math.round(currentMau),
      serverLoad: serverLoad * 100,
      churnRate: churnRate * 100,
      
      // Detailed Revenue Streams
      rankRev,
      battlepassRev,
      crateRev,
      claimRev,
      b2bRev,
      grossRev,
      
      // Itemized Volume (For UI Tooltips)
      vols: {
        subs: rankVols,
        battlepass: bpVol,
        crates: crateVols,
        claims: claimVols
      },

      // Expense Breakdown
      expenses: {
        creatorPayout,
        infra: actualInfraSpend,
        staff: levers.staffDevBudget,
        admin: fixedAdmin,
        overhead: (grossRev * SYSTEM_OVERHEAD_FACTOR),
        total: totalExpenses
      },

      net,
      netMargin,
    });
  }

  return { data, cumulativeGross, cumulativeExp };
};