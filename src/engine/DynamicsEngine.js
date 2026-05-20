/**
 * SOSEI MEDIA - SYSTEM DYNAMICS ENGINE V5.1
 * BuiltByBit benchmarks: Network ~$40/CCU, Box gamemode ~$58/CCU @ ~$10k/mo gross B2C.
 */

export const MAX_CCU_CAP = 1000;
export const CCU_PER_BACKEND_INSTANCE = 70;
export const MAX_BACKEND_INSTANCES = 15;
export const FULL_SCALE_INFRA_COST = 427;

/** MAU pool for subs + B2B (CCU-anchored shop drives BuiltByBit B2C) */
const BASE_MAU_MULTIPLIER = 32;

const MINNOW_PCT = 0.70;
const DOLPHIN_PCT = 0.20;
const WHALE_PCT = 0.10;

const NETWORK_STACK_COST = 107;
const DEDICATED_BOX_COST = 160;
const BASE_MONTHLY_CHURN = 0.24;

const FUNNEL = {
  uniqueReachRatio: 0.38,
  serverPageCtr: 0.032,
  trialCompletion: 0.36,
  trialToRegularAtBaseline: 0.14,
  baselineConversionSlider: 0.3,
  viralCoeff: 0.022,
  maturityHalfLifeMonths: 9,
};

/** BuiltByBit Server A (0.8) → ~$40/CCU shop; Server B (1.5) → ~$60/CCU shop */
const GAMEMODE_MIN = 0.8;
const GAMEMODE_MAX = 1.5;
const SHOP_PER_CCU_SURVIVAL = 40;
const SHOP_PER_CCU_BOX = 60;

export const builtByBitShopPerCcu = (gamemodeMultiplier) => {
  const t = (gamemodeMultiplier - GAMEMODE_MIN) / (GAMEMODE_MAX - GAMEMODE_MIN);
  return SHOP_PER_CCU_SURVIVAL + t * (SHOP_PER_CCU_BOX - SHOP_PER_CCU_SURVIVAL);
};

export const calculateRequiredInfra = (ccu) => {
  const instances = Math.min(
    Math.max(1, Math.ceil(ccu / CCU_PER_BACKEND_INSTANCE)),
    MAX_BACKEND_INSTANCES,
  );

  let computeCost = 0;
  if (instances <= 7) {
    computeCost = DEDICATED_BOX_COST * (instances / 7);
  } else {
    const box2Shards = Math.min(instances - 7, 8);
    computeCost = DEDICATED_BOX_COST + DEDICATED_BOX_COST * (box2Shards / 8);
  }

  return Math.round(NETWORK_STACK_COST + computeCost);
};

export const calculateSoftCeiling = (month) => {
  const asymptote = 520;
  const floor = 60;
  return Math.round(floor + asymptote * (1 - Math.exp(-month / 18)));
};

const networkMaturity = (month) => 0.2 + 0.8 * (1 - Math.exp(-month / FUNNEL.maturityHalfLifeMonths));

const creatorAcquisition = (levers, month, seasonality, motivationMulti, creatorFatigue) => {
  const uniqueReach = levers.creatorViews * FUNNEL.uniqueReachRatio;
  const pageClicks = uniqueReach * FUNNEL.serverPageCtr;
  const trials = pageClicks * FUNNEL.trialCompletion;
  const stickiness =
    FUNNEL.trialToRegularAtBaseline * (levers.viewerConversion / FUNNEL.baselineConversionSlider);

  let newPlayers = trials * stickiness * motivationMulti * creatorFatigue * seasonality;
  newPlayers *= networkMaturity(month);
  return newPlayers;
};

/** Gacha whale uplift on top of BuiltByBit CCU anchor (70/20/10 minnow/dolphin/whale curve) */
const whaleSpendUplift = (levers) => {
  const priceFactor = Math.min(1.35, levers.itemPrice / 8);
  const convFactor = Math.min(1.25, levers.purchaseTendency / 3);
  const whaleCurve = MINNOW_PCT * 1 + DOLPHIN_PCT * 5 + WHALE_PCT * 35;
  const neutralCurve = MINNOW_PCT * 1 + DOLPHIN_PCT * 5 + WHALE_PCT * 35;
  return 0.9 + (whaleCurve / neutralCurve - 1) * 0.05 + 0.08 * (priceFactor - 1) + 0.06 * (convFactor - 1);
};

const calculateB2cRevenue = (levers, currentCcu, currentMau, lagStorePenalty) => {
  const perCcuAnchor = builtByBitShopPerCcu(levers.gamemodeMultiplier);
  const spendIntensity = 0.92 + (levers.purchaseTendency / 10) * 0.06 + (levers.itemPrice / 12) * 0.04;

  let shopRev =
    currentCcu * perCcuAnchor * spendIntensity * whaleSpendUplift(levers) * lagStorePenalty;
  shopRev *= levers.gamemodeMultiplier;

  const subscribers = currentMau * (levers.subConversion / 100) * lagStorePenalty;
  const subRev = subscribers * levers.subPrice;

  const b2cRev = shopRev + subRev;
  const b2cPerCcu = currentCcu > 0 ? b2cRev / currentCcu : 0;

  return { shopRev, subRev, b2cRev, b2cPerCcu };
};

export const calculateSimulation = (levers) => {
  let currentCcu = 42;
  let data = [];
  let cumulativeGross = 0;
  let cumulativeExp = 0;
  let creatorFatigue = 1.0;

  for (let month = 1; month <= 24; month++) {
    let seasonality = 1.0;
    const calendarMonth = month % 12 || 12;
    if ([6, 7, 8].includes(calendarMonth)) seasonality = 1.22;
    else if ([12].includes(calendarMonth)) seasonality = 1.15;
    else if ([9, 10, 1].includes(calendarMonth)) seasonality = 0.88;

    const motivationMulti = Math.max(0.65, 0.75 + (levers.creatorShare - 15) * 0.012);
    creatorFatigue = Math.max(0.45, creatorFatigue - 0.012);
    if (levers.creatorShare > 28) creatorFatigue += 0.006;

    const fromCreators = creatorAcquisition(levers, month, seasonality, motivationMulti, creatorFatigue);
    const fromOrganic =
      currentCcu * FUNNEL.viralCoeff * seasonality * networkMaturity(month) * Math.min(1, currentCcu / 200);

    const newAcquisitions = fromCreators + fromOrganic;
    const softCeiling = calculateSoftCeiling(month);

    const backendInstances = Math.min(
      Math.max(1, Math.ceil(currentCcu / CCU_PER_BACKEND_INSTANCE)),
      MAX_BACKEND_INSTANCES,
    );
    const requiredInfraCost = calculateRequiredInfra(currentCcu);
    const actualInfraSpend = Math.min(requiredInfraCost, levers.monthlyInfra);
    const serverLoad = requiredInfraCost / levers.monthlyInfra;

    let churnRate = BASE_MONTHLY_CHURN;
    if (serverLoad > 0.9 && serverLoad <= 1.1) churnRate += 0.18;
    if (serverLoad > 1.1) churnRate += 0.42;
    if (currentCcu > softCeiling * 0.92) churnRate += 0.06;
    churnRate -= levers.creatorShare * 0.0012;
    churnRate = Math.max(0.14, Math.min(churnRate, 0.55));

    const churned = currentCcu * churnRate;
    let projectedCcu = currentCcu - churned + newAcquisitions;
    projectedCcu = Math.min(projectedCcu, softCeiling, MAX_CCU_CAP);
    projectedCcu = Math.max(projectedCcu, currentCcu * 0.55);
    currentCcu = projectedCcu;

    const currentMau = Math.round(currentCcu * BASE_MAU_MULTIPLIER);
    const lagStorePenalty = serverLoad > 0.95 ? 0.35 : 1.0;

    const { shopRev, subRev, b2cRev, b2cPerCcu } = calculateB2cRevenue(
      levers,
      currentCcu,
      currentMau,
      lagStorePenalty,
    );

    const dataFreshnessMulti = 1 + churnRate * 0.35;
    const scalePremium = currentMau > 8000 ? 1.4 : currentMau > 4000 ? 1.2 : 1.0;
    const b2bRev = currentMau * levers.dataValue * dataFreshnessMulti * scalePremium;

    const grossRev = b2cRev + b2bRev;
    const creatorPayout = b2cRev * (levers.creatorShare / 100);
    const paymentProcessing = grossRev * 0.05;
    const fixedAdmin = month === 1 ? 5000 : 500;
    const staffOpex = levers.staffDevBudget;

    const expenses =
      actualInfraSpend + creatorPayout + paymentProcessing + fixedAdmin + staffOpex;

    const net = grossRev - expenses;
    const netMargin = grossRev > 0 ? (net / grossRev) * 100 : 0;

    cumulativeGross += grossRev;
    cumulativeExp += expenses;

    data.push({
      month,
      ccu: Math.round(currentCcu),
      mau: currentMau,
      newAcquisitions: Math.round(newAcquisitions),
      churned: Math.round(churned),
      softCeiling,
      backendInstances,
      requiredInfraCost,
      infraSpend: actualInfraSpend,
      shopRev,
      subRev,
      b2cRev,
      b2cPerCcu,
      b2bRev,
      grossRev,
      staffOpex,
      fixedAdmin,
      expenses,
      net,
      netMargin,
      serverLoad: serverLoad * 100,
      churnRate: churnRate * 100,
    });
  }

  return { data, cumulativeGross, cumulativeExp };
};
