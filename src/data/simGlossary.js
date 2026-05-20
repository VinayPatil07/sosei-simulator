/**
 * Glossary, lever tooltips, methodology, and cited sources for the SOSEI simulator.
 */

export const LEVER_TIPS = {
  creatorViews: {
    title: 'Monthly Active Views',
    body: 'Total video impressions across creator partners in a month. The engine does not treat every view as a new player—it runs a funnel (unique reach → click → trial → retained CCU).',
  },
  viewerConversion: {
    title: 'Viewer Conversion Rate',
    body: 'Scales how many trial players become regular concurrent players. Baseline 0.3% matches conservative Minecraft creator traffic; higher values model stronger CTAs and server appeal.',
  },
  creatorShare: {
    title: 'Creator Rev Share',
    body: 'Percent of B2C shop revenue paid to creators. Higher share increases creator motivation (more promotion) but reduces net margin and is modeled as a direct monthly expense.',
  },
  gamemodeMultiplier: {
    title: 'Gamemode Aggressiveness',
    body: '0.8× = chill Survival/Network (~$40 gross B2C per CCU). 1.5× = aggressive Box/P2W (~$60/CCU). Calibrated from BuiltByBit marketplace comps; also multiplies shop revenue.',
  },
  itemPrice: {
    title: 'Avg Cart Value',
    body: 'Average rank/crate/cosmetic price. Feeds the 70/20/10 minnow–dolphin–whale spend curve (gacha-style stratification).',
  },
  purchaseTendency: {
    title: 'F2P Conversion Rate',
    body: 'Percent of MAU who make any shop purchase in a month. Industry F2P benchmarks typically run 2–5%; slider tunes intensity on top of the CCU revenue anchor.',
  },
  subPrice: {
    title: 'VIP Sub Price',
    body: 'Monthly subscription price (ranks, perks, battle pass style). Revenue = subscribers × price; subscribers derived from MAU × sub conversion %.',
  },
  subConversion: {
    title: 'Sub Conversion Rate',
    body: 'Percent of monthly active users (MAU) who hold a paid VIP subscription.',
  },
  dataValue: {
    title: 'Value Per Enriched Profile',
    body: 'B2B data licensing value per MAU profile sold to MarTech/enterprise buyers. Scales with MAU, churn freshness, and volume premium past 4k–8k MAU.',
  },
  monthlyInfra: {
    title: 'Infra Budget /mo',
    body: 'Maximum monthly spend on bare-metal + network stack. Required cost rises with shards (CCU ÷ 70); under-funding increases lag and churn.',
  },
  staffDevBudget: {
    title: 'Staff & Development Budget',
    body: 'Fixed monthly OpEx for community managers, plugin developers, and admins—persistent every month, separate from one-time legal/admin fees.',
  },
};

export const KPI_TIPS = {
  serverHealth: {
    title: 'Server Health',
    body: 'Compares required infra cost vs your budget at Month 24. Above 100% means lag risk and modeled purchase penalties.',
  },
  b2cPerCcu: {
    title: 'B2C Gross / CCU',
    body: 'Total B2C revenue (shop + subs) divided by concurrent users. BuiltByBit comps cluster around $40–$60/CCU depending on gamemode.',
  },
  staffOpex: {
    title: 'Staff OpEx',
    body: 'Your Staff & Development slider value—charged every month in the expense stack.',
  },
  netMargin: {
    title: 'Net Margin %',
    body: '(Gross revenue − total expenses) ÷ gross revenue. Reflects creator payouts, Tebex fees, infra, admin, and staff.',
  },
  grossRev: {
    title: 'Gross Revenue',
    body: 'Total monthly revenue: B2C shop + VIP subs + B2B data licensing before any operating expenses.',
  },
  ccu: {
    title: 'CCU (Concurrent Users)',
    body: 'Players online at peak simultaneously. Hardware shards target ~60–80 CCU per Fabric backend for 20 TPS.',
  },
  mau: {
    title: 'MAU (Monthly Active Users)',
    body: 'Unique players in a month. Modeled as CCU × 32 (rotating F2P population—roughly 30–35× is common on modded networks).',
  },
};

export const GLOSSARY_TERMS = [
  {
    term: 'CCU',
    definition: 'Concurrent users online at the same time (peak simultaneous players).',
    formula: 'Stock variable: CCUₘ = CCUₘ₋₁ − churned + new acquisitions (capped by discovery ceiling and 1,000 hardware max).',
    source: 'Minecraft server benchmarking; Velocity proxy architecture.',
  },
  {
    term: 'MAU',
    definition: 'Monthly active unique players—much larger than CCU because most F2P users do not play 24/7.',
    formula: 'MAU = CCU × 32',
    source: 'Typical modded-server rotation velocity (community ops estimates).',
  },
  {
    term: 'Discovery ceiling',
    definition: 'Soft cap on growth from brand awareness and listings—not hardware. Rises over ~18–24 months.',
    formula: 'ceiling(m) = 60 + 520 × (1 − e^(−m/18))',
    source: 'S-curve adoption common in online game growth models.',
  },
  {
    term: 'Backend shard',
    definition: 'One Fabric+Cobblemon instance behind a Velocity proxy (~60–80 CCU each at 20 TPS).',
    formula: 'shards = min(15, ⌈CCU / 70⌉)',
    source: 'Paper/Velocity performance guides; SOSEI bare-metal blueprint.',
  },
  {
    term: 'BuiltByBit anchor',
    definition: 'B2C shop revenue per CCU calibrated to marketplace server comps.',
    formula: 'shop/CCU from $40 (0.8×) to $60 (1.5×); shopRev = CCU × anchor × intensity × whale × lag × gamemode²',
    source: 'BuiltByBit listing observations: Network 250–300 CCU @ ~$10k–12k/mo; Box 140–200 CCU @ ~$10k/mo.',
  },
  {
    term: 'Whale curve',
    definition: '70% minnow (1× price), 20% dolphin (5×), 10% whale (35×)—models crate/gacha spend distribution.',
    formula: 'shop uplift from stratified average cart vs baseline $8',
    source: 'F2P monetization literature (whale/minnow segmentation).',
  },
  {
    term: 'Creator funnel',
    definition: 'Views convert through unique reach, server page CTR, trial completion, then stickiness.',
    formula: 'new = views × 0.38 × 0.032 × 0.36 × stickiness × motivation × fatigue × seasonality × maturity',
    source: 'Standard performance marketing funnel; Minecraft CTR benchmarks.',
  },
  {
    term: 'Churn',
    definition: 'Monthly logo churn—players who stop returning.',
    formula: 'Base 24% + lag penalties + discovery pressure − creator share bonus',
    source: 'F2P mobile/sandbox games often report 20–35% monthly churn.',
  },
  {
    term: 'Bare-metal infra',
    definition: 'Self-managed Ryzen dedicated servers + DDoS + backups—not per-GB panel hosting.',
    formula: 'required = $107 network + Box1 (≤7 shards) + Box2 (shards 8–15); spend = min(required, budget)',
    source: 'Hetzner/OVH bare-metal pricing; Pterodactyl deployment model.',
  },
  {
    term: 'Staff OpEx',
    definition: 'Ongoing payroll for CM, developers, admins—separate from $500/mo admin after launch month.',
    formula: 'expenses include staffDevBudget every month',
    source: 'BuiltByBit-scale networks run dedicated staff/dev teams.',
  },
  {
    term: 'Net profit',
    definition: 'Gross revenue minus all operating expenses.',
    formula: 'net = gross − (infra + creator payout + 5% processing + admin + staff)',
    source: 'Standard SaaS/game P&L; Tebex ~5% processing cited by platform.',
  },
];

export const METHODOLOGY_SECTIONS = [
  {
    id: 'acquisition',
    title: '1. Player acquisition (months 1–24)',
    body: `Each month applies Minecraft seasonality (summer +22%, holidays +15%, back-to-school −12%). New players enter through a creator marketing funnel—not raw views × percent. Organic word-of-mouth scales with current CCU and network maturity (Discord, listings, tools ramp over ~9 months). Creator fatigue slowly reduces efficiency unless rev share exceeds ~28%.`,
  },
  {
    id: 'retention',
    title: '2. Retention & CCU stock',
    body: `CCU is a stock: previous month minus churn plus new joins. Churn starts at 24%/month (F2P norm). Under-funded infra (required bare-metal cost > budget) adds lag penalties and extra churn. Hitting the discovery ceiling adds mild saturation churn.`,
  },
  {
    id: 'revenue',
    title: '3. Revenue (BuiltByBit-calibrated B2C + B2B)',
    body: `Shop revenue anchors to $40–$60 gross B2C per CCU from marketplace comps, scaled by gamemode multiplier and whale curve. Subscriptions add MAU-based recurring revenue. B2B sells enriched profiles per MAU with freshness and scale premiums.`,
  },
  {
    id: 'expenses',
    title: '4. Operating expenses',
    body: `Infra spends up to required shard cost capped by your budget. Creator share is % of B2C. Payment processing modeled at 5%. Month 1 admin/legal spike $5,000 then $500/mo. Staff & Development is a flat monthly OpEx from your slider.`,
  },
];

export const SOURCES = [
  {
    name: 'BuiltByBit',
    url: 'https://builtbybit.com/',
    note: 'Minecraft marketplace—Server A/B revenue & CCU benchmarks ($10k/mo @ 140–300 CCU).',
  },
  {
    name: 'Velocity (PaperMC)',
    url: 'https://papermc.io/software/velocity',
    note: 'Proxy layer routing players across backend shards without disconnects.',
  },
  {
    name: 'Pterodactyl Panel',
    url: 'https://pterodactyl.io/',
    note: 'Open-source game panel for bare-metal fleet management.',
  },
  {
    name: 'Hetzner Dedicated',
    url: 'https://www.hetzner.com/dedicated-rootserver',
    note: 'Reference class for Ryzen 9 / 128GB bare-metal (~$140–180/mo per node).',
  },
  {
    name: 'Tebex',
    url: 'https://www.tebex.io/',
    note: 'Minecraft webstore; ~5% platform fee used for payment processing model.',
  },
  {
    name: 'Newzoo / GameAnalytics (F2P benchmarks)',
    url: 'https://newzoo.com/',
    note: 'Industry context for 2–5% payer conversion and 20–35% monthly churn bands.',
  },
  {
    name: 'LiveRamp / data marketplace context',
    url: 'https://liveramp.com/',
    note: 'Enterprise identity & audience data pricing informs B2B $/profile slider range.',
  },
];
