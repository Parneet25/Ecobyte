/**
 * EcoByte - Sustainable Digital Technology Platform
 * Theme: "Digital Technology Increasing Energy Consumption and Environmental Footprint"
 * Core Engine: Empirical Calculation Models, Dynamic Chart.js Visualization,
 * Interactive Particles Canvas, Dynamic Recommendations, SVG Gauge, and Fact Explorer.
 */

// =============================================================================
// 1. DATA MODELS & SCIENTIFIC CONSTANTS
// =============================================================================
const EMISSION_FACTORS = {
  // Grid carbon intensity: Global average ~436g CO2e/kWh (IEA World Energy Outlook)
  GRID_CO2_PER_KWH: 0.436, 

  // Operational Power Ratings (in kW)
  POWER_SMARTPHONE: 0.005,    // 5 Watts avg active & charging
  POWER_LAPTOP: 0.045,        // 45 Watts avg productivity ultrabook
  POWER_DESKTOP: 0.120,       // 120 Watts desktop + display
  POWER_TABLET: 0.012,        // 12 Watts active screen
  POWER_GAMING: 0.160,        // 160 Watts gaming console/rig

  // Network & Cloud overhead per hour/unit
  KWH_PER_HOUR_VIDEO: 0.038,  // IEA streaming benchmark (device + network + data center)
  KWH_PER_HOUR_MUSIC: 0.005,  // Audio stream compression (~256kbps)
  KWH_PER_HOUR_BROWSING: 0.012,// General web browsing data transfer
  KWH_PER_HOUR_VIDEOCALL: 0.065,// Bi-directional video encode & low-latency routing
  KWH_PER_GB_MONTH_CLOUD: 0.001,// Active cloud storage redundant storage & cooling

  // AI Inference Workload (Joule 2023 / Luccioni et al. 2023)
  KWH_PER_AI_QUERY: 0.004,    // ~4 Wh per large language model inference query

  // Upstream Embodied Carbon (Manufacturing) in kg CO2e
  EMBODIED_SMARTPHONE: 65,    // ~65 kg CO2e to produce a smartphone
  EMBODIED_LAPTOP: 250,       // ~250 kg CO2e to produce a laptop

  // Real-world equivalency multipliers
  KM_PER_KG_CO2: 4.12,        // Average passenger gasoline car km per kg CO2e (EPA)
  TREE_KG_CO2_YEAR: 21.77,    // Average carbon sequestered by 1 mature tree per year (EPA)
  PHONE_BATTERY_KWH: 0.012,   // ~12 Wh per phone full charge
  LED_WATT_HOURS: 0.010,      // 10W LED bulb consumes 0.010 kWh per hour
  BENCHMARK_ANNUAL_KG: 380    // Global average individual digital footprint in kg CO2e
};

// Presets data
const PRESETS = {
  student: {
    laptop: 7,
    smartphone: 5.5,
    tablet: 2,
    gaming: 1.5,
    video: 3.5,
    music: 2.5,
    browsing: 4,
    calls: 5,
    cloud: 25,
    ai: 20,
    phoneReplace: 3,
    laptopReplace: 4
  },
  casual: {
    laptop: 2.5,
    smartphone: 3.5,
    tablet: 0.5,
    gaming: 0,
    video: 1.5,
    music: 1,
    browsing: 2,
    calls: 1,
    cloud: 10,
    ai: 3,
    phoneReplace: 4,
    laptopReplace: 5
  },
  gamer: {
    laptop: 8,
    smartphone: 6,
    tablet: 1,
    gaming: 4.5,
    video: 5,
    music: 4,
    browsing: 5,
    calls: 4,
    cloud: 75,
    ai: 35,
    phoneReplace: 2,
    laptopReplace: 2
  },
  minimalist: {
    laptop: 3,
    smartphone: 2,
    tablet: 0,
    gaming: 0,
    video: 0.8,
    music: 1,
    browsing: 1.5,
    calls: 1,
    cloud: 5,
    ai: 2,
    phoneReplace: 5,
    laptopReplace: 6
  }
};

// In-Depth Information for The 6 Problem Cards
const PROBLEM_DETAILS = {
  device: {
    title: "Device Energy & Thermal Power Draw",
    icon: "📱",
    stat: "Global consumer electronics consume hundreds of terawatt-hours annually.",
    content: `
      <p>Personal computing hardware—ranging from ultrabooks and OLED smartphones to gaming consoles—requires continuous electricity for screen backlights, processor clock cycles, memory caches, and thermal dissipation fans.</p>
      <div class="modal-stat-banner">
        <strong>Key Research Finding:</strong> Standby power or "phantom load" from plugged-in chargers and idle peripherals accounts for up to 5–10% of residential electronic energy consumption.
      </div>
      <p>While silicon efficiency (measured in operations per watt) has improved dramatically via micro-architecture shrinking, the sheer volume of personal devices per household and constant multi-tasking has steadily driven up aggregate daily energy demand.</p>
      <p><strong>Primary Solution:</strong> Aggressive display sleep intervals (3–5 minutes), system power-saving profiles, and disconnecting chargers when batteries reach full capacity.</p>
    `
  },
  cloud: {
    title: "Cloud Infrastructure & Hyperscale Data Centers",
    icon: "☁️",
    stat: "Data centers consumed ~460 TWh of electricity in 2022 (IEA).",
    content: `
      <p>Every photo saved to cloud storage, every sync operation, and every web server response is powered by massive hyperscale data centers that operate 24 hours a day, 365 days a year.</p>
      <div class="modal-stat-banner">
        <strong>Cooling & Power Usage Effectiveness (PUE):</strong> For every kilowatt delivered to computing servers, an additional 0.2 to 0.6 kW is often consumed by HVAC industrial chillers and cooling pumps alone.
      </div>
      <p>Driven by cloud migration, AI acceleration, and digital services, the International Energy Agency (IEA) projects that global data center electricity consumption could double to over 800–1,000 TWh by 2026—comparable to the entire electricity demand of Japan.</p>
      <p><strong>Primary Solution:</strong> Periodic cloud storage hygiene (deleting duplicate photos, unneeded video archives, and stale backups) directly reduces continuous multi-region disk spinning and cooling requirements.</p>
    `
  },
  streaming: {
    title: "High-Definition & 4K Video Streaming",
    icon: "🎬",
    stat: "Video streaming accounts for ~60% of all global downstream internet traffic.",
    content: `
      <p>Video is data-intensive. Transmitting video files requires intensive real-time transcoding on origin servers, caching at edge Content Delivery Networks (CDNs), routing across optical fiber trunk lines, and decoding by on-device GPU silicon.</p>
      <div class="modal-stat-banner">
        <strong>Bandwidth Escalation:</strong> 4K UHD video consumes 15–25 Mbps (approx. 7–11 GB per hour), compared to 3–5 Mbps for standard 1080p Full HD—a 400% surge in raw data transmission.
      </div>
      <p>On small smartphone screens (5 to 6.7 inches), the human eye cannot discern individual pixels between 1080p and 4K, meaning the extra gigabytes and network power are entirely wasted.</p>
      <p><strong>Primary Solution:</strong> Streaming at 1080p or 720p on phones, disabling auto-play video feeds, and using Wi-Fi rather than cellular 4G/5G for large downloads.</p>
    `
  },
  ai: {
    title: "AI Workloads & Computational Expansion",
    icon: "🤖",
    stat: "Generating a single AI response can use 5x to 10x more energy than a traditional web query.",
    content: `
      <p>Generative Artificial Intelligence relies on massive transformer neural networks running across high-density clusters of specialized GPUs (e.g. H100s/A100s) that draw between 400 and 700 Watts per chip.</p>
      <div class="modal-stat-banner">
        <strong>Inference Scale:</strong> According to a 2023 study published in Joule (de Vries), a single complex multi-modal prompt consumes between 3 to 9 Watt-hours of electricity, alongside intensive evaporative cooling water.
      </div>
      <p>When millions of users submit iterative, repetitive prompts or generate high-resolution AI imagery, the cumulative computational load on electrical grids increases exponentially.</p>
      <p><strong>Primary Solution:</strong> Prompt intentionally: formulate clear, focused queries in a single interaction rather than dozens of trial-and-error re-generations.</p>
    `
  },
  ewaste: {
    title: "Electronic Waste & Rare Earth Depletion",
    icon: "🗑️",
    stat: "62 million metric tonnes of e-waste generated worldwide in 2022 (UNITAR/ITU).",
    content: `
      <p>Electronic waste is currently the fastest-growing solid municipal waste stream on Earth, expanding five times faster than documented formal recycling capacity.</p>
      <div class="modal-stat-banner">
        <strong>Embodied Carbon Burden:</strong> Up to 75–80% of a personal device's entire lifetime carbon footprint occurs in semiconductor fabrication and mining—before you even unbox the device.
      </div>
      <p>Discarded smartphones and laptops contain hazardous compounds like lead, mercury, and flame retardants, as well as critical strategic minerals (lithium, cobalt, neodymium, gold). When devices are discarded prematurely after only 1–2 years, this enormous manufacturing energy is wasted.</p>
      <p><strong>Primary Solution:</strong> Extending personal device lifespans to 4–5+ years through battery replacements, software maintenance, and right-to-repair practices.</p>
    `
  },
  network: {
    title: "Network Infrastructure & Transmission Systems",
    icon: "⚡",
    stat: "Data transmission networks consume ~260–340 TWh globally each year.",
    content: `
      <p>Connecting the user to the cloud requires an unbroken physical chain of home Wi-Fi routers, neighborhood street cabinets, 4G/5G cell towers, and undersea transoceanic fiber-optic cables.</p>
      <div class="modal-stat-banner">
        <strong>Mobile vs. Fixed Broadband:</strong> Transmitting data over 4G/5G cellular radio networks requires approximately 2 to 4 times more energy per gigabyte than fixed fiber-optic broadband Wi-Fi.
      </div>
      <p>Cellular base station radio units emit high-frequency electromagnetic signals that must operate continuously regardless of whether users are actively transmitting packets.</p>
      <p><strong>Primary Solution:</strong> Prioritize home or campus Wi-Fi networks over cellular data when downloading heavy files, and power down inactive secondary Wi-Fi repeaters.</p>
    `
  }
};

// Lifecycle Stages Data
const LIFECYCLE_STAGES = [
  {
    name: "Device Manufacturing",
    icon: "🏭",
    headline: "Embodied Energy & Semiconductor Fabrication",
    narrative: "Before a single kilowatt-hour is drawn from your home outlet, enormous energy is consumed extracting rare earth elements, purifying silicon wafers in ultra-clean cleanrooms, and shipping hardware globally.",
    metricValue: "70% – 80%",
    metricLabel: "of a laptop's total lifetime emissions occur during manufacturing",
    details: [
      "Lithium, cobalt, copper, and gold extraction requires high thermal processing.",
      "Silicon wafer photolithography requires immense electrical power and chemical inputs.",
      "Frequent device replacement is the single largest multiplier of digital footprint."
    ]
  },
  {
    name: "Internet Networks",
    icon: "📡",
    headline: "Data Routing & Base Station Transmission",
    narrative: "Data packets travel through fiber-optic backbones, undersea cables, and wireless base stations. Cellular 4G/5G radio frequencies require continuous RF amplification to overcome atmospheric attenuation.",
    metricValue: "~300 TWh",
    metricLabel: "consumed annually by global data transmission networks (IEA)",
    details: [
      "Cellular 4G/5G transmission consumes up to 3x more energy than fixed fiber broadband.",
      "Core optical switches and routers require 24/7 dedicated cooling systems.",
      "High data transfer volumes force telecommunication providers to deploy additional dense transmitters."
    ]
  },
  {
    name: "Data Centers",
    icon: "🏢",
    headline: "Hyperscale Compute, Storage & Industrial Chillers",
    narrative: "Server racks process cloud computations, databases, and generative AI inferences. High server density generates tremendous heat that must be continuously extracted using evaporative chillers.",
    metricValue: "1.2 – 1.6",
    metricLabel: "Average Power Usage Effectiveness (PUE) ratio across modern facilities",
    details: [
      "Cooling infrastructure accounts for 30–40% of total data center power usage.",
      "Generative AI accelerators (GPUs) draw upwards of 700 Watts per card under load.",
      "Global data center power demand could reach 1,000 TWh by 2026 (comparable to Japan)."
    ]
  },
  {
    name: "User Activity",
    icon: "💻",
    headline: "Active End-User Screen Time & Workloads",
    narrative: "Direct device consumption: screen backlights, GPU rendering for games and video decoding, processor cycles for productivity suites, and local background synchronization apps.",
    metricValue: "5W – 180W",
    metricLabel: "Range of active power consumption from smartphones up to gaming rigs",
    details: [
      "OLED screens consume significantly less energy when dark mode is enabled.",
      "Unmanaged background tabs and auto-refresh applications drain battery and wall power.",
      "Standby phantom drain quietly consumes power even when devices appear asleep."
    ]
  },
  {
    name: "E-Waste Disposal",
    icon: "♻️",
    headline: "End-of-Life Disposal, Toxic Leachate & Recycling",
    narrative: "When consumer electronics are discarded prematurely, they enter waste streams where hazardous heavy metals (lead, mercury, cadmium) threaten soil and groundwater if not formally recycled.",
    metricValue: "62 Million",
    metricLabel: "Metric tonnes of e-waste generated worldwide in 2022 (UNITAR)",
    details: [
      "Only 22.3% of global e-waste is formally collected and recycled responsibly.",
      "Billions of dollars in recoverable rare minerals are permanently lost annually.",
      "Extending device lifespan by just 1 year reduces global hardware footprint by over 20%."
    ]
  }
];

// Did You Know Facts Database
const DID_YOU_KNOW_FACTS = [
  {
    topic: "DATA CENTERS",
    title: "Global Data Centers Match Entire Nations in Power Demand",
    desc: "Global data centers consumed approximately 460 TWh of electricity in 2022. By 2026, the International Energy Agency projects this could surge past 800–1,000 TWh, equivalent to the entire electrical consumption of Japan.",
    source: "IEA Electricity 2024 Report"
  },
  {
    topic: "EMBODIED EMISSIONS",
    title: "The Biggest Impact Happens Before You Open the Box",
    desc: "Up to 75% to 80% of a laptop’s lifetime carbon emissions occur during raw material extraction, semiconductor silicon wafer purification, and overseas assembly—long before you ever turn on the display.",
    source: "IEEE / European Commission Environmental Studies"
  },
  {
    topic: "AI COMPUTING",
    title: "AI Inference Requires Exponentially Higher Energy",
    desc: "Generating a single generative AI response or photorealistic image can consume 5 to 10 times more electrical energy than a standard keyword search, due to parallel matrix calculations across high-wattage GPUs.",
    source: "Joule (de Vries, 2023) / Luccioni et al. 2023"
  },
  {
    topic: "VIDEO STREAMING",
    title: "4K Video Streams Quadruple Data Transmission",
    desc: "Streaming high-definition video in 4K requires 15–25 Mbps compared to just 3–5 Mbps for standard 1080p Full HD. On mobile screens under 7 inches, this 400% surge in network power produces virtually zero visible difference.",
    source: "IEA Analysis & Telecommunication Benchmarks"
  },
  {
    topic: "E-WASTE SURGE",
    title: "E-Waste is Growing 5x Faster Than Documented Recycling",
    desc: "The world generated a record 62 million metric tonnes of e-waste in 2022. Less than a quarter (22.3%) was formally collected and recycled, resulting in \$62 billion worth of recoverable critical minerals lost.",
    source: "UN Global E-waste Monitor 2024 (UNITAR / ITU)"
  },
  {
    topic: "INTERNET NETWORKS",
    title: "Cellular Networks Consume Up to 3x More Energy Than Wi-Fi",
    desc: "Downloading data over 4G/5G mobile towers consumes significantly more electrical energy per gigabyte transferred than fixed-line broadband Wi-Fi, due to RF amplification and atmospheric signal loss.",
    source: "ITU-T Environmental & Energy Efficiency Guidelines"
  }
];

// Global Application State
let appState = {
  inputs: { ...PRESETS.student },
  calculated: null,
  activeFactIndex: 0,
  breakdownChart: null,
  pledgedSavingsKg: 0,
  activePledges: new Set()
};

// =============================================================================
// 2. BACKGROUND PARTICLES CANVAS
// =============================================================================
function initParticlesCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 70);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.12 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// =============================================================================
// 3. CORE CALCULATION ENGINE
// =============================================================================
function calculateFootprint(inputs) {
  // 1. Device Operational Daily kWh
  const kwhLaptop = inputs.laptop * EMISSION_FACTORS.POWER_LAPTOP;
  const kwhSmartphone = inputs.smartphone * EMISSION_FACTORS.POWER_SMARTPHONE;
  const kwhTablet = inputs.tablet * EMISSION_FACTORS.POWER_TABLET;
  const kwhGaming = inputs.gaming * EMISSION_FACTORS.POWER_GAMING;
  const kwhDevicesDaily = kwhLaptop + kwhSmartphone + kwhTablet + kwhGaming;

  // 2. Network & Streaming Daily kWh
  const kwhVideo = inputs.video * EMISSION_FACTORS.KWH_PER_HOUR_VIDEO;
  const kwhMusic = inputs.music * EMISSION_FACTORS.KWH_PER_HOUR_MUSIC;
  const kwhBrowsing = inputs.browsing * EMISSION_FACTORS.KWH_PER_HOUR_BROWSING;
  const kwhCalls = (inputs.calls / 7) * EMISSION_FACTORS.KWH_PER_HOUR_VIDEOCALL;
  const kwhStreamingDaily = kwhVideo + kwhMusic;
  const kwhInternetDaily = kwhBrowsing + kwhCalls;

  // 3. Cloud & AI Workloads Daily kWh
  const kwhCloudDaily = (inputs.cloud * EMISSION_FACTORS.KWH_PER_GB_MONTH_CLOUD) / 30;
  const kwhAiDaily = inputs.ai * EMISSION_FACTORS.KWH_PER_AI_QUERY;

  // Total Operational Daily & Annual kWh
  const totalDailyKwh = kwhDevicesDaily + kwhStreamingDaily + kwhInternetDaily + kwhCloudDaily + kwhAiDaily;
  const totalAnnualKwh = totalDailyKwh * 365;

  // 4. Operational Carbon Emissions (kg CO2e)
  const annualOperationalCo2Kg = totalAnnualKwh * EMISSION_FACTORS.GRID_CO2_PER_KWH;

  // 5. Embodied Carbon Amortization (Annual kg CO2e)
  const phoneYears = Math.max(inputs.phoneReplace, 1);
  const laptopYears = Math.max(inputs.laptopReplace, 1);
  const annualEmbodiedPhone = EMISSION_FACTORS.EMBODIED_SMARTPHONE / phoneYears;
  const annualEmbodiedLaptop = EMISSION_FACTORS.EMBODIED_LAPTOP / laptopYears;
  const totalAnnualEmbodiedKg = annualEmbodiedPhone + annualEmbodiedLaptop;

  // Total Annual Digital Carbon Footprint
  const totalAnnualCo2Kg = annualOperationalCo2Kg + totalAnnualEmbodiedKg;

  // 6. Category Percentages for Dynamic Chart Breakdown
  // Grouping into intuitive categories:
  const catStreaming = (kwhStreamingDaily * 365 * EMISSION_FACTORS.GRID_CO2_PER_KWH);
  const catLaptopPc = (kwhLaptop * 365 * EMISSION_FACTORS.GRID_CO2_PER_KWH) + annualEmbodiedLaptop;
  const catPhone = (kwhSmartphone * 365 * EMISSION_FACTORS.GRID_CO2_PER_KWH) + annualEmbodiedPhone;
  const catCloud = (kwhCloudDaily * 365 * EMISSION_FACTORS.GRID_CO2_PER_KWH);
  const catAi = (kwhAiDaily * 365 * EMISSION_FACTORS.GRID_CO2_PER_KWH);
  const catOther = ((kwhTablet + kwhGaming + kwhInternetDaily) * 365 * EMISSION_FACTORS.GRID_CO2_PER_KWH);

  const totalCatSum = catStreaming + catLaptopPc + catPhone + catCloud + catAi + catOther;

  const pctStreaming = Math.round((catStreaming / totalCatSum) * 100);
  const pctLaptopPc = Math.round((catLaptopPc / totalCatSum) * 100);
  const pctCloud = Math.round((catCloud / totalCatSum) * 100);
  const pctPhone = Math.round((catPhone / totalCatSum) * 100);
  const pctAi = Math.round((catAi / totalCatSum) * 100);
  const pctOther = Math.max(0, 100 - (pctStreaming + pctLaptopPc + pctCloud + pctPhone + pctAi));

  // Determine Largest Contributor
  const contributors = [
    { name: "Video & Music Streaming", value: catStreaming, pct: pctStreaming },
    { name: "Laptop & PC Computing", value: catLaptopPc, pct: pctLaptopPc },
    { name: "Cloud Storage & Sync", value: catCloud, pct: pctCloud },
    { name: "Smartphone Lifecycle", value: catPhone, pct: pctPhone },
    { name: "AI Queries & Workloads", value: catAi, pct: pctAi },
    { name: "Gaming & Internet Network", value: catOther, pct: pctOther }
  ].sort((a, b) => b.value - a.value);

  // 7. EcoByte Digital Sustainability Score (0 - 100)
  // Base 100 with penalties for wasteful habits
  let score = 100;
  // Penalty for short device lifespans
  if (inputs.phoneReplace <= 1) score -= 18;
  else if (inputs.phoneReplace <= 2) score -= 10;
  if (inputs.laptopReplace <= 2) score -= 16;
  else if (inputs.laptopReplace <= 3) score -= 8;

  // Penalty for high video streaming
  if (inputs.video > 4) score -= 14;
  else if (inputs.video > 2) score -= 6;

  // Penalty for high gaming/high-draw compute
  if (inputs.gaming > 3) score -= 12;
  else if (inputs.gaming > 1.5) score -= 6;

  // Penalty for high cloud storage
  if (inputs.cloud > 50) score -= 10;
  else if (inputs.cloud > 25) score -= 5;

  // Penalty for high AI prompt counts
  if (inputs.ai > 30) score -= 8;
  else if (inputs.ai > 15) score -= 4;

  score = Math.max(15, Math.min(98, score));

  // 8. Impact Level Categorization
  let impactCategory = "Moderate";
  let impactMessage = "You have some opportunities to reduce your digital footprint.";
  let badgeClass = "badge-moderate";

  if (totalDailyKwh < 0.70 && totalAnnualCo2Kg < 280) {
    impactCategory = "Low";
    impactMessage = "Great job! Your digital habits are relatively efficient.";
    badgeClass = "badge-low";
  } else if (totalDailyKwh > 1.80 || totalAnnualCo2Kg > 520) {
    impactCategory = "High";
    impactMessage = "Your digital habits have several high-impact areas that you can improve.";
    badgeClass = "badge-high";
  }

  // 9. Real-World Equivalencies
  const carKm = Math.round(totalAnnualCo2Kg * EMISSION_FACTORS.KM_PER_KG_CO2);
  const treesNeeded = (totalAnnualCo2Kg / EMISSION_FACTORS.TREE_KG_CO2_YEAR).toFixed(1);
  const phoneChargesDaily = Math.round(totalDailyKwh / EMISSION_FACTORS.PHONE_BATTERY_KWH);
  const ledHoursDaily = Math.round(totalDailyKwh / EMISSION_FACTORS.LED_WATT_HOURS);

  return {
    totalDailyKwh: totalDailyKwh.toFixed(2),
    totalAnnualKwh: totalAnnualKwh.toFixed(1),
    totalAnnualCo2Kg: Math.round(totalAnnualCo2Kg),
    impactCategory,
    impactMessage,
    badgeClass,
    score,
    percentages: {
      streaming: pctStreaming,
      laptop: pctLaptopPc,
      cloud: pctCloud,
      phone: pctPhone,
      ai: pctAi,
      other: pctOther
    },
    largestContributor: contributors[0],
    equivalencies: {
      carKm,
      treesNeeded,
      phoneChargesDaily,
      ledHoursDaily
    }
  };
}

// =============================================================================
// 4. UI UPDATE & RENDERING FUNCTIONS
// =============================================================================
function updateResultsDashboard(result) {
  // Update Big Metric Displays
  const dailyKwhElem = document.getElementById('metricDailyKwh');
  const annualKwhElem = document.getElementById('metricAnnualKwh');
  const annualCo2Elem = document.getElementById('metricAnnualCo2');
  const impactBadgeElem = document.getElementById('impactBadge');
  const impactNarrativeElem = document.getElementById('impactNarrative');

  if (dailyKwhElem) dailyKwhElem.textContent = result.totalDailyKwh;
  if (annualKwhElem) annualKwhElem.textContent = result.totalAnnualKwh;
  if (annualCo2Elem) annualCo2Elem.textContent = `${result.totalAnnualCo2Kg} kg`;

  if (impactBadgeElem) {
    impactBadgeElem.textContent = `${result.impactCategory.toUpperCase()} IMPACT`;
    impactBadgeElem.className = `impact-category-badge ${result.badgeClass}`;
  }

  if (impactNarrativeElem) {
    impactNarrativeElem.innerHTML = `
      <strong>${result.impactCategory} Impact:</strong> ${result.impactMessage}
      Your calculated footprint totals approximately <strong>${result.totalAnnualCo2Kg} kg CO₂e/year</strong> across operational electricity and hardware manufacturing amortization.
    `;
  }

  // Update Benchmark Comparison Bar
  const userBenchmarkBar = document.getElementById('benchmarkUserBar');
  const benchmarkUserText = document.getElementById('benchmarkUserText');
  if (userBenchmarkBar && benchmarkUserText) {
    const ratio = (result.totalAnnualCo2Kg / EMISSION_FACTORS.BENCHMARK_ANNUAL_KG) * 50;
    const clampedPct = Math.min(100, Math.max(8, ratio));
    userBenchmarkBar.style.width = `${clampedPct}%`;
    benchmarkUserText.textContent = `You: ${result.totalAnnualCo2Kg} kg CO₂e/yr (${result.totalAnnualCo2Kg < EMISSION_FACTORS.BENCHMARK_ANNUAL_KG ? 'Below' : 'Above'} benchmark)`;
  }

  // Update Equivalencies
  const eqCharges = document.getElementById('equivCharges');
  const eqLed = document.getElementById('equivLed');
  const eqCar = document.getElementById('equivCar');
  const eqTrees = document.getElementById('equivTrees');

  if (eqCharges) eqCharges.textContent = `~${result.equivalencies.phoneChargesDaily}`;
  if (eqLed) eqLed.textContent = `~${result.equivalencies.ledHoursDaily} hrs`;
  if (eqCar) eqCar.textContent = `~${result.equivalencies.carKm} km`;
  if (eqTrees) eqTrees.textContent = `${result.equivalencies.treesNeeded} trees`;

  // Update Largest Factor Banner
  const highestFactorElem = document.getElementById('highestFactorName');
  if (highestFactorElem) {
    highestFactorElem.textContent = `${result.largestContributor.name} (~${result.largestContributor.pct}%)`;
  }

  // Update Donut Breakdown Chart
  updateBreakdownChart(result.percentages);

  // Update Score Gauge
  updateScoreGauge(result.score);

  // Update Personalized Recommendations Engine
  generateRecommendations(appState.inputs, result);
}

// Chart.js Donut Rendering
function updateBreakdownChart(percentages) {
  const canvas = document.getElementById('breakdownCanvas');
  if (!canvas) return;

  const dataValues = [
    percentages.streaming,
    percentages.laptop,
    percentages.cloud,
    percentages.phone,
    percentages.ai,
    percentages.other
  ];

  const labels = [
    `Streaming (${percentages.streaming}%)`,
    `Laptop & PC (${percentages.laptop}%)`,
    `Cloud Storage (${percentages.cloud}%)`,
    `Smartphone (${percentages.phone}%)`,
    `AI Usage (${percentages.ai}%)`,
    `Other & Network (${percentages.other}%)`
  ];

  const colors = [
    '#06b6d4', // Cyan
    '#10b981', // Emerald
    '#3b82f6', // Blue
    '#8b5cf6', // Purple
    '#f59e0b', // Amber
    '#64748b'  // Slate
  ];

  // Update Legend List in DOM
  const legendContainer = document.getElementById('chartLegendList');
  if (legendContainer) {
    legendContainer.innerHTML = labels.map((label, idx) => `
      <div class="legend-item">
        <div class="legend-left">
          <span class="legend-dot" style="background-color: ${colors[idx]};"></span>
          <span class="legend-name">${label.split(' (')[0]}</span>
        </div>
        <span class="legend-percent">${label.match(/\((.*?)\)/)[1]}</span>
      </div>
    `).join('');
  }

  // Check if Chart.js is loaded
  if (typeof Chart === 'undefined') return;

  if (appState.breakdownChart) {
    appState.breakdownChart.data.datasets[0].data = dataValues;
    appState.breakdownChart.update();
  } else {
    appState.breakdownChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: dataValues,
          backgroundColor: colors,
          borderColor: '#0f172a',
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#fff',
            bodyColor: '#94a3b8',
            borderColor: 'rgba(16, 185, 129, 0.3)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: function(context) {
                return ` ${context.label}`;
              }
            }
          }
        }
      }
    });
  }
}

// Animated Score Gauge
function updateScoreGauge(score) {
  const numberElem = document.getElementById('gaugeScoreNumber');
  const fillPath = document.getElementById('gaugeFillPath');
  const ratingBadge = document.getElementById('gaugeRatingBadge');
  const breakdownBars = document.querySelectorAll('.factor-bar');

  if (numberElem) {
    let currentVal = 0;
    const duration = 1200;
    const stepTime = 20;
    const increment = score / (duration / stepTime);
    const counterInterval = setInterval(() => {
      currentVal += increment;
      if (currentVal >= score) {
        numberElem.textContent = Math.round(score);
        clearInterval(counterInterval);
      } else {
        numberElem.textContent = Math.round(currentVal);
      }
    }, stepTime);
  }

  // Arc length is ~283 in SVG path
  if (fillPath) {
    const maxOffset = 283;
    const targetOffset = maxOffset - (maxOffset * (score / 100));
    fillPath.style.strokeDashoffset = targetOffset;
  }

  if (ratingBadge) {
    if (score >= 80) {
      ratingBadge.textContent = "Excellent";
      ratingBadge.className = "gauge-rating-badge badge-low";
    } else if (score >= 50) {
      ratingBadge.textContent = "Good";
      ratingBadge.className = "gauge-rating-badge badge-moderate";
    } else {
      ratingBadge.textContent = "Needs Improvement";
      ratingBadge.className = "gauge-rating-badge badge-high";
    }
  }

  // Update factor breakdown bars
  if (breakdownBars && breakdownBars.length >= 4) {
    const inputs = appState.inputs;
    const longevityScore = Math.min(100, Math.round(((inputs.phoneReplace + inputs.laptopReplace) / 9) * 100));
    const streamingScore = Math.max(20, Math.round(100 - (inputs.video * 14)));
    const cloudScore = Math.max(25, Math.round(100 - (inputs.cloud * 0.8)));
    const aiScore = Math.max(25, Math.round(100 - (inputs.ai * 1.5)));

    breakdownBars[0].style.width = `${longevityScore}%`;
    breakdownBars[1].style.width = `${streamingScore}%`;
    breakdownBars[2].style.width = `${cloudScore}%`;
    breakdownBars[3].style.width = `${aiScore}%`;

    const grades = document.querySelectorAll('.factor-grade');
    if (grades.length >= 4) {
      grades[0].textContent = `${longevityScore}/100`;
      grades[1].textContent = `${streamingScore}/100`;
      grades[2].textContent = `${cloudScore}/100`;
      grades[3].textContent = `${aiScore}/100`;
    }
  }
}

// =============================================================================
// 5. PERSONALIZED RECOMMENDATIONS GENERATOR
// =============================================================================
function generateRecommendations(inputs, result) {
  const container = document.getElementById('recommendationsGrid');
  if (!container) return;

  const recs = [];

  // Streaming rule
  if (inputs.video >= 2.5) {
    recs.push({
      id: 'rec_stream',
      category: 'Streaming',
      title: 'Optimize Video Streaming Resolution',
      action: 'Lower video quality from 4K/1440p down to 1080p or 720p on smartphones and laptops when screen sizes do not benefit from extra pixels.',
      benefit: 'Saves up to 45 kg CO₂e / year',
      savedKg: 45,
      diff: 'Easy',
      diffClass: 'diff-easy'
    });
  }

  // Cloud rule
  if (inputs.cloud >= 15) {
    recs.push({
      id: 'rec_cloud',
      category: 'Cloud Storage',
      title: 'Clean Unused Cloud Storage & Backups',
      action: 'Delete duplicate camera rolls, redundant video caches, and obsolete system image backups stored across multi-region server farms.',
      benefit: 'Saves up to 18 kg CO₂e / year',
      savedKg: 18,
      diff: 'Easy',
      diffClass: 'diff-easy'
    });
  }

  // Device usage / Power saving rule
  if (inputs.laptop >= 5 || inputs.gaming >= 1.5) {
    recs.push({
      id: 'rec_power',
      category: 'Device Settings',
      title: 'Activate Eco Mode & 5-Min Display Sleep',
      action: 'Enable OS energy-saver settings, adjust monitor timeouts to 5 minutes, and eliminate standby drain by shutting down power strips overnight.',
      benefit: 'Saves up to 35 kg CO₂e / year',
      savedKg: 35,
      diff: 'Easy',
      diffClass: 'diff-easy'
    });
  }

  // Device Replacement / Longevity rule
  if (inputs.phoneReplace <= 2 || inputs.laptopReplace <= 3) {
    recs.push({
      id: 'rec_longevity',
      category: 'Hardware Lifecycle',
      title: 'Extend Device Lifespan Through Repair',
      action: 'Keep smartphones and laptops for 4+ years. Replace batteries and clean thermal cooling vents rather than purchasing premature replacements.',
      benefit: 'Saves up to 90 kg CO₂e / year',
      savedKg: 90,
      diff: 'Moderate',
      diffClass: 'diff-med'
    });
  }

  // AI Usage rule
  if (inputs.ai >= 10) {
    recs.push({
      id: 'rec_ai',
      category: 'AI & Computing',
      title: 'Prompt Intentionally & Avoid Redundant Generations',
      action: 'Craft structured, precise prompts in a single request. Avoid repetitive generations and batch queries to minimize high-wattage GPU server passes.',
      benefit: 'Saves up to 15 kg CO₂e / year',
      savedKg: 15,
      diff: 'Easy',
      diffClass: 'diff-easy'
    });
  }

  // Fallback tip for universal habit
  recs.push({
    id: 'rec_wifi',
    category: 'Network Habit',
    title: 'Download Heavy Files via Wi-Fi Over Mobile Data',
    action: 'Cellular 4G/5G transmissions require up to 3x more energy than fixed fiber broadband Wi-Fi. Schedule large software updates on local Wi-Fi.',
    benefit: 'Saves up to 22 kg CO₂e / year',
    savedKg: 22,
    diff: 'Easy',
    diffClass: 'diff-easy'
  });

  // Render cards
  container.innerHTML = recs.map(rec => {
    const isChecked = appState.activePledges.has(rec.id);
    return `
      <div class="rec-card glass-card ${isChecked ? 'pledged' : ''}" id="card_${rec.id}">
        <div>
          <div class="rec-top-row">
            <span class="rec-category-tag">${rec.category}</span>
            <span class="rec-difficulty ${rec.diffClass}">${rec.diff}</span>
          </div>
          <h3 class="rec-title">${rec.title}</h3>
          <p class="rec-action">${rec.action}</p>
        </div>
        <div>
          <div class="rec-benefit-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            ${rec.benefit}
          </div>
          <label class="rec-pledge-toggle">
            <input type="checkbox" class="pledge-check" data-id="${rec.id}" data-kg="${rec.savedKg}" ${isChecked ? 'checked' : ''}>
            <span>I pledge to adopt this habit</span>
          </label>
        </div>
      </div>
    `;
  }).join('');

  // Attach pledge event listeners
  container.querySelectorAll('.pledge-check').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const id = e.target.dataset.id;
      const kg = parseFloat(e.target.dataset.kg);
      const card = document.getElementById(`card_${id}`);

      if (e.target.checked) {
        appState.activePledges.add(id);
        if (card) card.classList.add('pledged');
        showToast("Great choice! Habit added to your savings tracker.", "🌱");
      } else {
        appState.activePledges.delete(id);
        if (card) card.classList.remove('pledged');
      }
      updateCumulativePledgeSavings();
    });
  });

  updateCumulativePledgeSavings();
}

function updateCumulativePledgeSavings() {
  const savingsNumElem = document.getElementById('potentialSavingsNum');
  const savingsPctElem = document.getElementById('potentialSavingsPct');
  if (!savingsNumElem) return;

  let totalSavedKg = 0;
  document.querySelectorAll('.pledge-check:checked').forEach(chk => {
    totalSavedKg += parseFloat(chk.dataset.kg || 0);
  });

  savingsNumElem.textContent = `${totalSavedKg} kg`;

  if (savingsPctElem && appState.calculated) {
    const currentFootprint = appState.calculated.totalAnnualCo2Kg;
    const pct = currentFootprint > 0 ? Math.min(65, Math.round((totalSavedKg / currentFootprint) * 100)) : 0;
    savingsPctElem.textContent = `(~${pct}% reduction in annual footprint)`;
  }
}

// =============================================================================
// 6. LIFECYCLE STEPPER INTERACTION
// =============================================================================
function initLifecycleStepper() {
  const nodes = document.querySelectorAll('.lifecycle-node');
  const stageTitle = document.getElementById('stageTitle');
  const stageIcon = document.getElementById('stageIcon');
  const stageNarrative = document.getElementById('stageNarrative');
  const stageMetricsList = document.getElementById('stageMetricsList');
  const widgetStatVal = document.getElementById('widgetStatValue');
  const widgetStatLabel = document.getElementById('widgetStatNote');

  function renderStage(index) {
    nodes.forEach((n, idx) => {
      n.classList.toggle('active', idx === index);
    });

    const data = LIFECYCLE_STAGES[index];
    if (!data) return;

    if (stageTitle) stageTitle.textContent = data.headline;
    if (stageIcon) stageIcon.textContent = data.icon;
    if (stageNarrative) stageNarrative.textContent = data.narrative;
    if (widgetStatVal) widgetStatVal.textContent = data.metricValue;
    if (widgetStatLabel) widgetStatLabel.textContent = data.metricLabel;

    if (stageMetricsList) {
      stageMetricsList.innerHTML = data.details.map(detail => `
        <li class="stage-metric-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${detail}</span>
        </li>
      `).join('');
    }
  }

  nodes.forEach((node, index) => {
    node.addEventListener('click', () => renderStage(index));
  });

  // Render initial stage (Device Manufacturing)
  renderStage(0);
}

// =============================================================================
// 7. DID YOU KNOW FACT EXPLORER
// =============================================================================
function initFactExplorer() {
  const titleElem = document.getElementById('factTitle');
  const descElem = document.getElementById('factDesc');
  const badgeElem = document.getElementById('factTopicBadge');
  const citationElem = document.getElementById('factCitation');
  const counterElem = document.getElementById('factCounter');
  const nextBtn = document.getElementById('btnNextFact');
  const bodyElem = document.getElementById('factCardBody');

  function showFact(index) {
    const fact = DID_YOU_KNOW_FACTS[index];
    if (!fact) return;

    if (bodyElem) {
      bodyElem.style.opacity = '0';
      setTimeout(() => {
        if (titleElem) titleElem.textContent = fact.title;
        if (descElem) descElem.textContent = fact.desc;
        if (badgeElem) badgeElem.textContent = fact.topic;
        if (citationElem) citationElem.textContent = `Reference: ${fact.source}`;
        if (counterElem) counterElem.textContent = `${index + 1} / ${DID_YOU_KNOW_FACTS.length}`;
        bodyElem.style.opacity = '1';
      }, 180);
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      appState.activeFactIndex = (appState.activeFactIndex + 1) % DID_YOU_KNOW_FACTS.length;
      showFact(appState.activeFactIndex);
    });
  }

  showFact(0);
}

// =============================================================================
// 8. BEFORE VS AFTER SIMULATOR
// =============================================================================
function initBeforeAfterSimulator() {
  const slider = document.getElementById('simStreamingSlider');
  const sliderVal = document.getElementById('simStreamingVal');
  const simKwhElem = document.getElementById('simAfterKwh');
  const simCo2Elem = document.getElementById('simAfterCo2');
  const simPercentElem = document.getElementById('simSavingsPercent');

  function recalculateSim() {
    if (!slider) return;
    const hours = parseFloat(slider.value);
    if (sliderVal) sliderVal.textContent = `${hours.toFixed(1)} hrs/day`;

    // Baseline: 4.5 hrs 4K video (0.05 kWh/hr) + 7 hrs laptop + 40GB cloud = ~1.22 kWh/day
    const baselineDailyKwh = 1.25;
    const baselineAnnualCo2 = Math.round(baselineDailyKwh * 365 * EMISSION_FACTORS.GRID_CO2_PER_KWH + 70);

    // Optimized: hours in 1080p (0.025 kWh/hr) + laptop power save + cloud clean
    const optimizedStreamingKwh = hours * 0.025;
    const optimizedOtherKwh = 0.52; // With sleep mode & cleaned cloud
    const newDailyKwh = (optimizedStreamingKwh + optimizedOtherKwh).toFixed(2);
    const newAnnualCo2 = Math.round(newDailyKwh * 365 * EMISSION_FACTORS.GRID_CO2_PER_KWH + 45);

    const savedPct = Math.round(((baselineAnnualCo2 - newAnnualCo2) / baselineAnnualCo2) * 100);

    if (simKwhElem) simKwhElem.textContent = `${newDailyKwh} kWh/day`;
    if (simCo2Elem) simCo2Elem.textContent = `${newAnnualCo2} kg CO₂e / yr`;
    if (simPercentElem) simPercentElem.textContent = `-${savedPct}% Energy`;
  }

  if (slider) {
    slider.addEventListener('input', recalculateSim);
    recalculateSim();
  }
}

// =============================================================================
// 9. TIPS FILTER TABS
// =============================================================================
function initTipsFilter() {
  const filterButtons = document.querySelectorAll('.btn-filter');
  const tipCards = document.querySelectorAll('.tip-item-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      tipCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// =============================================================================
// 10. MODAL DIALOG SYSTEM (For Problem Deep Dives)
// =============================================================================
function initModalSystem() {
  const modal = document.getElementById('problemModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const title = document.getElementById('modalTitle');
  const icon = document.getElementById('modalIcon');
  const body = document.getElementById('modalBody');

  function openModal(key) {
    const data = PROBLEM_DETAILS[key];
    if (!data || !modal) return;

    if (title) title.textContent = data.title;
    if (icon) icon.textContent = data.icon;
    if (body) body.innerHTML = data.content;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-learn-more]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.dataset.learnMore;
      openModal(key);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

// =============================================================================
// 11. TOAST NOTIFICATIONS HELPER
// =============================================================================
function showToast(message, icon = "🌱") {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// =============================================================================
// 12. INPUT EVENT BINDINGS & PRESETS
// =============================================================================
function bindCalculatorInputs() {
  const form = document.getElementById('footprintForm');
  if (!form) return;

  // Map of input elements to value displays
  const inputMap = [
    { id: 'hoursLaptop', valId: 'valLaptop', suffix: 'hrs/day' },
    { id: 'hoursSmartphone', valId: 'valSmartphone', suffix: 'hrs/day' },
    { id: 'hoursTablet', valId: 'valTablet', suffix: 'hrs/day' },
    { id: 'hoursGaming', valId: 'valGaming', suffix: 'hrs/day' },
    { id: 'hoursVideo', valId: 'valVideo', suffix: 'hrs/day' },
    { id: 'hoursMusic', valId: 'valMusic', suffix: 'hrs/day' },
    { id: 'hoursBrowsing', valId: 'valBrowsing', suffix: 'hrs/day' },
    { id: 'callsWeek', valId: 'valCalls', suffix: 'calls/wk' },
    { id: 'gbCloud', valId: 'valCloud', suffix: 'GB active' },
    { id: 'dailyAi', valId: 'valAi', suffix: 'queries/day' }
  ];

  function syncDisplay(item) {
    const input = document.getElementById(item.id);
    const display = document.getElementById(item.valId);
    if (input && display) {
      display.textContent = `${input.value} ${item.suffix}`;
    }
  }

  inputMap.forEach(item => {
    const input = document.getElementById(item.id);
    if (input) {
      input.addEventListener('input', () => {
        syncDisplay(item);
        readFormAndRecalculate();
      });
      syncDisplay(item);
    }
  });

  const selectPhone = document.getElementById('selectPhoneReplace');
  const selectLaptop = document.getElementById('selectLaptopReplace');
  if (selectPhone) selectPhone.addEventListener('change', readFormAndRecalculate);
  if (selectLaptop) selectLaptop.addEventListener('change', readFormAndRecalculate);

  // Preset Buttons
  document.querySelectorAll('.btn-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const presetKey = btn.dataset.preset;
      const preset = PRESETS[presetKey];
      if (!preset) return;

      loadPresetIntoForm(preset);
      readFormAndRecalculate();
      showToast(`Loaded ${btn.textContent.trim()} preset profile`, "⚡");
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    readFormAndRecalculate();
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: 'smooth' });
    }
    showToast("Digital Footprint Calculated Successfully!", "⚡");
  });
}

function loadPresetIntoForm(p) {
  const fields = [
    { id: 'hoursLaptop', val: p.laptop },
    { id: 'hoursSmartphone', val: p.smartphone },
    { id: 'hoursTablet', val: p.tablet },
    { id: 'hoursGaming', val: p.gaming },
    { id: 'hoursVideo', val: p.video },
    { id: 'hoursMusic', val: p.music },
    { id: 'hoursBrowsing', val: p.browsing },
    { id: 'callsWeek', val: p.calls },
    { id: 'gbCloud', val: p.cloud },
    { id: 'dailyAi', val: p.ai }
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    if (el) {
      el.value = f.val;
      el.dispatchEvent(new Event('input'));
    }
  });

  const selectPhone = document.getElementById('selectPhoneReplace');
  const selectLaptop = document.getElementById('selectLaptopReplace');
  if (selectPhone) selectPhone.value = p.phoneReplace;
  if (selectLaptop) selectLaptop.value = p.laptopReplace;
}

function readFormAndRecalculate() {
  const getVal = (id, fallback) => {
    const el = document.getElementById(id);
    return el ? parseFloat(el.value) || 0 : fallback;
  };

  appState.inputs = {
    laptop: getVal('hoursLaptop', 6),
    smartphone: getVal('hoursSmartphone', 5),
    tablet: getVal('hoursTablet', 1),
    gaming: getVal('hoursGaming', 1.5),
    video: getVal('hoursVideo', 3.5),
    music: getVal('hoursMusic', 2),
    browsing: getVal('hoursBrowsing', 3.5),
    calls: getVal('callsWeek', 4),
    cloud: getVal('gbCloud', 20),
    ai: getVal('dailyAi', 15),
    phoneReplace: getVal('selectPhoneReplace', 3),
    laptopReplace: getVal('selectLaptopReplace', 4)
  };

  const results = calculateFootprint(appState.inputs);
  appState.calculated = results;
  updateResultsDashboard(results);
}

// =============================================================================
// 13. NAVBAR SCROLL & MOBILE MENU
// =============================================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll spy for active link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }
}

// =============================================================================
// 14. EXPORT REPORT / COPY SUMMARY
// =============================================================================
function initReportActions() {
  const copyBtn = document.getElementById('btnCopyReport');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (!appState.calculated) return;
      const c = appState.calculated;
      const summary = `
🌱 EcoByte Digital Footprint Report
Theme: Digital Technology Increasing Energy Consumption and Environmental Footprint
-------------------------------------------------------
• Estimated Daily Energy: ${c.totalDailyKwh} kWh / day
• Estimated Annual Energy: ${c.totalAnnualKwh} kWh / year
• Annual Carbon Footprint: ${c.totalAnnualCo2Kg} kg CO₂e / year
• Sustainability Score: ${c.score} / 100 (${c.impactCategory} Impact)
• Real-World Equivalents: ~${c.equivalencies.carKm} km driven in gasoline car | ${c.equivalencies.treesNeeded} trees needed to offset
• Largest Contributor: ${c.largestContributor.name} (~${c.largestContributor.pct}%)
-------------------------------------------------------
Calculated at: ${new Date().toLocaleDateString()}
Powered by EcoByte — Making digital life sustainable.
      `.trim();

      navigator.clipboard.writeText(summary).then(() => {
        showToast("Report copied to clipboard!", "📋");
      }).catch(() => {
        showToast("Failed to copy. Please manually copy.", "⚠️");
      });
    });
  }
}

// =============================================================================
// 15. INITIALIZATION ON DOM READY
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initParticlesCanvas();
  initNavbar();
  bindCalculatorInputs();
  initLifecycleStepper();
  initFactExplorer();
  initBeforeAfterSimulator();
  initTipsFilter();
  initModalSystem();
  initReportActions();

  // Initial calculation trigger
  readFormAndRecalculate();
});
