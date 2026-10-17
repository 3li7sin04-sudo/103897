// --- Persistent Storage Helpers ---
const STORAGE_KEYS = {
  postpaid: 'batelco_postpaid_pkgs_v4',
  standalone: 'batelco_standalone_pkgs_v3',
  bundles: 'batelco_bundles_master_v5',
  lang: 'batelco_lang_v1'
};

const DEFAULT_PKG_CAPS = [
  { key: '0', new: 400, mid: 500, existing: 600, label: 'Staff Package (Free Rental)' },
  { key: '10.5', new: 200, mid: 300, existing: 300, label: 'Basic Int BD10.5' },
  { key: '11', new: 200, mid: 300, existing: 300, label: 'Basic Int BD11' },
  { key: '12.5', new: 400, mid: 500, existing: 550, label: 'Extra Int BD12.5' },
  { key: '15', new: 400, mid: 500, existing: 550, label: 'Extra Plus BD15' },
  { key: '22', new: 400, mid: 600, existing: 700, label: 'Extra Max BD22' }
];

const DEFAULT_SA_PKG_CAPS = [
  { key: '16', new: 800, mid: 800, existing: 800, label: '16 BD' },
  { key: '18.5', new: 800, mid: 800, existing: 800, label: '18.5 BD' },
  { key: '30', new: 1000, mid: 1000, existing: 1000, label: '30 BD' },
  { key: '44', new: 1000, mid: 1000, existing: 1000, label: '44 BD' },
  { key: '110', new: Infinity, mid: Infinity, existing: Infinity, label: '110 BD' }
];

// --- Master Bundles Array ---
const DEFAULT_BUNDLES_ARRAY = [
  { name: "BTA 1M STF iPhone 18 Pro 256GB", price: 467.000 },
  { name: "EGB 24M iPhone 18 Pro 256GB-B", price: 566.000 },
  { name: "EGB 24M iPhone 18 Pro 256GB-A", price: 467.000 },
  { name: "DDS Inst 24M iPhone 18 Pro 256GB + Apple Watch Ultra 4", price: 941.000 },
  { name: "EGB 12M iPhone 18 Pro 256GB-B", price: 566.000 },
  { name: "EGB 18M iPhone 18 Pro 256GB-B", price: 566.000 },
  { name: "EGB BTA iPhone 18 Pro 256GB", price: 566.000 },
  { name: "Cash iPhone 18 Pro 256GB TechWoven Case", price: 588.000 },
  { name: "Inst 12M iPhone 18 Pro 256GB TechWoven Case", price: 588.000 },
  { name: "Inst 18M iPhone 18 Pro 256GB TechWoven Case", price: 588.000 },
  { name: "Inst 24M iPhone 18 Pro 256GB TechWoven Case", price: 588.000 },
  { name: "One Plan Max 2 - Inst 24M iPhone 18 Pro 256GB TechWoven Case", price: 288.000 },
  { name: "One Plan Max - Inst 24M iPhone 18 Pro 256GB TechWoven Case", price: 188.000 },
  { name: "One Plan Plus 2 - Inst 24M iPhone 18 Pro 256GB TechWoven Case", price: 388.000 },
  { name: "One Plan Plus - Inst 24M iPhone 18 Pro 256GB TechWoven Case", price: 288.000 },
  { name: "Inst 12M STF iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 18M STF iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 24M STF iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 12M CEM iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 18M CEM iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 24M CEM iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 12M CEM-22 iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 18M CEM-22 iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 24M CEM-22 iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 12M ULT iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 18M ULT iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 24M ULT iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 12M ULTM iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 18M ULTM iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Inst 24M ULTM iPhone 18 Pro 256GB TechWoven Case", price: 489.000 },
  { name: "Cash iPhone 18 Pro 256GB Silicone Case", price: 588.000 },
  { name: "Inst 12M iPhone 18 Pro 256GB Silicone Case", price: 588.000 },
  { name: "Inst 18M iPhone 18 Pro 256GB Silicone Case", price: 588.000 },
  { name: "Inst 24M iPhone 18 Pro 256GB Silicone Case", price: 588.000 },
  { name: "One Plan Max 2 - Inst 24M iPhone 18 Pro 256GB Silicone Case", price: 288.000 },
  { name: "One Plan Max - Inst 24M iPhone 18 Pro 256GB Silicone Case", price: 188.000 },
  { name: "One Plan Plus 2 - Inst 24M iPhone 18 Pro 256GB Silicone Case", price: 388.000 },
  { name: "One Plan Plus - Inst 24M iPhone 18 Pro 256GB Silicone Case", price: 288.000 },
  { name: "Inst 12M STF iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 18M STF iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 24M STF iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 12M CEM iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 18M CEM iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 24M CEM iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 12M CEM-22 iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 18M CEM-22 iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 24M CEM-22 iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 12M ULT iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 18M ULT iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 24M ULT iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 12M ULTM iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 18M ULTM iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 24M ULTM iPhone 18 Pro 256GB Silicone Case", price: 489.000 },
  { name: "Inst 12M ULT iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 18M ULT iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 24M ULT iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 12M ULT iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "Inst 18M ULT iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "Inst 24M ULT iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "BTA 1M 3 iPhone 18 Pro Max 256GB - 4 iPhone 18 Pro 256GB", price: 4103.000 },
  { name: "Inst 12M ULT iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Inst 18M ULT iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Inst 24M ULT iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Cash iPhone 18 Pro 256GB", price: 566.000 },
  { name: "Inst 12M iPhone 18 Pro 256GB", price: 566.000 },
  { name: "Inst 18M iPhone 18 Pro 256GB", price: 566.000 },
  { name: "Inst 24M iPhone 18 Pro 256GB", price: 566.000 },
  { name: "One Plan Max 2 - Inst 24M iPhone 18 Pro 256GB", price: 266.000 },
  { name: "One Plan Max - Inst 24M iPhone 18 Pro 256GB", price: 166.000 },
  { name: "One Plan Plus 2 - Inst 24M iPhone 18 Pro 256GB", price: 366.000 },
  { name: "One Plan Plus - Inst 24M iPhone 18 Pro 256GB", price: 266.000 },
  { name: "Inst 12M STF iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 18M STF iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 24M STF iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 12M CEM iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 18M CEM iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 24M CEM iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 12M CEM-22 iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 18M CEM-22 iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 24M CEM-22 iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 12M ULTM iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 18M ULTM iPhone 18 Pro 256GB", price: 467.000 },
  { name: "Inst 24M ULTM iPhone 18 Pro 256GB", price: 467.000 },
  { name: "DDS Inst 24M STF iPhone 18 Pro 256GB TechWoven Case", price: 1236.000 },
  { name: "Cash iPhone 18 Pro 256GB Infinity", price: 588.000 },
  { name: "Inst 12M iPhone 18 Pro 256GB Infinity", price: 588.000 },
  { name: "Inst 18M iPhone 18 Pro 256GB Infinity", price: 588.000 },
  { name: "Inst 24M iPhone 18 Pro 256GB Infinity", price: 588.000 },
  { name: "One Plan Max 2 - Inst 24M iPhone 18 Pro 256GB Infinity", price: 288.000 },
  { name: "One Plan Max - Inst 24M iPhone 18 Pro 256GB Infinity", price: 188.000 },
  { name: "One Plan Plus 2 - Inst 24M iPhone 18 Pro 256GB Infinity", price: 388.000 },
  { name: "One Plan Plus - Inst 24M iPhone 18 Pro 256GB Infinity", price: 288.000 },
  { name: "Inst 12M STF iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "Inst 18M STF iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "Inst 24M STF iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "Inst 12M CEM iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "Inst 18M CEM iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "Inst 24M CEM iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "Inst 12M CEM-22 iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "Inst 18M CEM-22 iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "Inst 24M CEM-22 iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "Inst 12M ULTM iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "Inst 18M ULTM iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "Inst 24M ULTM iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "DDS Inst 24M iPhone 18 Pro 256GB Infinity", price: 489.000 },
  { name: "DDS DP Inst 24M iPhone 18 Pro 256GB Infinity", price: 203.000 },
  { name: "DDS BTA TWO iPhone 18 Pro 256GB Infinity", price: 978.000 },
  { name: "Cash iPhone 18 Pro 256GB Clear Case", price: 588.000 },
  { name: "Inst 12M iPhone 18 Pro 256GB Clear Case", price: 588.000 },
  { name: "Inst 18M iPhone 18 Pro 256GB Clear Case", price: 588.000 },
  { name: "Inst 24M iPhone 18 Pro 256GB Clear Case", price: 588.000 },
  { name: "One Plan Max 2 - Inst 24M iPhone 18 Pro 256GB Clear Case", price: 288.000 },
  { name: "One Plan Max - Inst 24M iPhone 18 Pro 256GB Clear Case", price: 188.000 },
  { name: "One Plan Plus 2 - Inst 24M iPhone 18 Pro 256GB Clear Case", price: 388.000 },
  { name: "One Plan Plus - Inst 24M iPhone 18 Pro 256GB Clear Case", price: 288.000 },
  { name: "Inst 12M STF iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Inst 18M STF iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Inst 24M STF iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Inst 12M CEM iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Inst 18M CEM iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Inst 24M CEM iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Inst 12M CEM-22 iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Inst 18M CEM-22 iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Inst 24M CEM-22 iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Inst 12M ULTM iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Inst 18M ULTM iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "Inst 24M ULTM iPhone 18 Pro 256GB Clear Case", price: 489.000 },
  { name: "EGB 18M iPhone 18 Pro Max 256GB-B", price: 613.000 },
  { name: "BTA 1M 3 iPhone 18 Pro Max 256GB - 4 iPhone 18 Pro 256GB", price: 4103.000 },
  { name: "Cash iPhone 18 Pro Max 256GB", price: 613.000 },
  { name: "DDS Inst 24M STF iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "BTA 1M STF iPhone 18 Pro Max 256GB", price: 505.000 },
  { name: "EGB 24M iPhone 18 Pro Max 256GB-A", price: 505.000 },
  { name: "EGB 12M iPhone 18 Pro Max 256GB-A", price: 505.000 },
  { name: "EGB 18M iPhone 18 Pro Max 256GB-A", price: 505.000 },
  { name: "EGB 24M iPhone 18 Pro Max 256GB-B", price: 613.000 },
  { name: "EGB 12M iPhone 18 Pro Max 256GB-B", price: 613.000 },
  { name: "DDS One Plan Plus - Inst 24M iPhone 18 Pro Max 256GB Infinity", price: 33.500 },
  { name: "Cash iPhone 18 Pro Max 256GB TechWoven Case", price: 635.000 },
  { name: "Inst 12M iPhone 18 Pro Max 256GB TechWoven Case", price: 635.000 },
  { name: "Inst 18M iPhone 18 Pro Max 256GB TechWoven Case", price: 635.000 },
  { name: "Inst 24M iPhone 18 Pro Max 256GB TechWoven Case", price: 635.000 },
  { name: "One Plan Max 2 - Inst 24M iPhone 18 Pro Max 256GB TechWoven Case", price: 335.000 },
  { name: "One Plan Max - Inst 24M iPhone 18 Pro Max 256GB TechWoven Case", price: 235.000 },
  { name: "One Plan Plus 2 - Inst 24M iPhone 18 Pro Max 256GB TechWoven Case", price: 435.000 },
  { name: "One Plan Plus - Inst 24M iPhone 18 Pro Max 256GB TechWoven Case", price: 335.000 },
  { name: "Inst 12M STF iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 18M STF iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 24M STF iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 12M CEM iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 18M CEM iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 24M CEM iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 12M CEM-22 iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 18M CEM-22 iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 24M CEM-22 iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 12M ULT iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 18M ULT iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 24M ULT iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 12M ULTM iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 18M ULTM iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Inst 24M ULTM iPhone 18 Pro Max 256GB TechWoven Case", price: 527.000 },
  { name: "Cash iPhone 18 Pro Max 256GB Clear Case", price: 635.000 },
  { name: "Inst 12M iPhone 18 Pro Max 256GB Clear Case", price: 635.000 },
  { name: "Inst 18M iPhone 18 Pro Max 256GB Clear Case", price: 635.000 },
  { name: "Inst 24M iPhone 18 Pro Max 256GB Clear Case", price: 635.000 },
  { name: "One Plan Max 2 - Inst 24M iPhone 18 Pro Max 256GB Clear Case", price: 335.000 },
  { name: "One Plan Max - Inst 24M iPhone 18 Pro Max 256GB Clear Case", price: 235.000 },
  { name: "One Plan Plus 2 - Inst 24M iPhone 18 Pro Max 256GB Clear Case", price: 435.000 },
  { name: "One Plan Plus - Inst 24M iPhone 18 Pro Max 256GB Clear Case", price: 335.000 },
  { name: "Inst 12M STF iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Inst 18M STF iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Inst 24M STF iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Inst 12M CEM iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Inst 18M CEM iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Inst 24M CEM iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Inst 12M CEM-22 iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Inst 18M CEM-22 iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Inst 24M CEM-22 iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Inst 12M ULTM iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Inst 18M ULTM iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Inst 24M ULTM iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Cash iPhone 18 Pro Max 256GB Silicone Case", price: 635.000 },
  { name: "Inst 12M iPhone 18 Pro Max 256GB Silicone Case", price: 635.000 },
  { name: "Inst 18M iPhone 18 Pro Max 256GB Silicone Case", price: 635.000 },
  { name: "Inst 24M iPhone 18 Pro Max 256GB Silicone Case", price: 635.000 },
  { name: "One Plan Max 2 - Inst 24M iPhone 18 Pro Max 256GB Silicone Case", price: 335.000 },
  { name: "One Plan Max - Inst 24M iPhone 18 Pro Max 256GB Silicone Case", price: 235.000 },
  { name: "One Plan Plus 2 - Inst 24M iPhone 18 Pro Max 256GB Silicone Case", price: 435.000 },
  { name: "One Plan Plus - Inst 24M iPhone 18 Pro Max 256GB Silicone Case", price: 335.000 },
  { name: "Inst 12M STF iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 18M STF iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 24M STF iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 12M CEM iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 18M CEM iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 24M CEM iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 12M CEM-22 iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 18M CEM-22 iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 24M CEM-22 iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 12M ULT iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 18M ULT iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 24M ULT iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 12M ULTM iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 12M ULT iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 18M ULT iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 24M ULT iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 18M ULTM iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 24M ULTM iPhone 18 Pro Max 256GB Silicone Case", price: 527.000 },
  { name: "Inst 12M ULT iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Inst 18M ULT iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "Inst 24M ULT iPhone 18 Pro Max 256GB Clear Case", price: 527.000 },
  { name: "DDS Inst 12M iPhone 18 Pro Max 256GB TechWoven Case", price: 4023.500 },
  { name: "Inst 12M STF iPhone 18 Pro Max 256GB", price: 505.000 },
  { name: "Inst 18M STF iPhone 18 Pro Max 256GB", price: 505.000 },
  { name: "Inst 24M STF iPhone 18 Pro Max 256GB", price: 505.000 },
  { name: "Inst 24M STF iPhone 18 Pro Max 256GB + AirPods 5", price: 569.000 },
  { name: "Cash iPhone 18 Pro Max 256GB Infinity", price: 635.000 },
  { name: "Inst 12M iPhone 18 Pro Max 256GB Infinity", price: 635.000 },
  { name: "Inst 18M iPhone 18 Pro Max 256GB Infinity", price: 635.000 },
  { name: "Inst 24M iPhone 18 Pro Max 256GB Infinity", price: 635.000 },
  { name: "One Plan Max 2 - Inst 24M iPhone 18 Pro Max 256GB Infinity", price: 335.000 },
  { name: "One Plan Max - Inst 24M iPhone 18 Pro Max 256GB Infinity", price: 235.000 },
  { name: "One Plan Plus 2 - Inst 24M iPhone 18 Pro Max 256GB Infinity", price: 435.000 },
  { name: "One Plan Plus - Inst 24M iPhone 18 Pro Max 256GB Infinity", price: 335.000 },
  { name: "Inst 12M STF iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 18M STF iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 24M STF iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 12M CEM iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 18M CEM iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 24M CEM iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 12M CEM-22 iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 18M CEM-22 iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 24M CEM-22 iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 12M ULTM iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 18M ULTM iPhone 18 Pro Max 256GB Infinity", price: 527.000 },
  { name: "Inst 24M ULTM iPhone 18 Pro Max 256GB Infinity", price: 527.000 }
];

const DEFAULT_BUNDLES = {};
DEFAULT_BUNDLES_ARRAY.forEach(item => {
  DEFAULT_BUNDLES[item.name] = item.price;
});

// --- Translations ---
const I18N = {
  en: {
    appTitle: "Batelco Device Calculator",
    adminControl: "Admin Control",
    adminTitle: "Admin Controls: Packages & Device Bundles",
    addUpdatePackage: "Add / Update Package",
    targetTab: "Target Tab",
    tabPostpaid: "Postpaid",
    tabStandalone: "Standalone",
    pkgName: "Package Name / Value",
    cap0to6: "0–6 Months Cap (BD)",
    cap6to12: "6–12 Months Cap (BD)",
    cap12plus: "12+ Months Cap (BD)",
    savePackage: "Save Package",
    removePackage: "Remove Package",
    selectPkgToRemove: "Select Package to Remove",
    deletePackage: "Delete Package",
    addUpdateBundle: "Add / Update Device Bundle",
    bundleName: "Bundle Name",
    devicePrice: "Device Price (BD)",
    saveBundle: "Save Bundle",
    removeBundle: "Remove Device Bundle",
    selectBundleToRemove: "Select Bundle to Remove",
    tenureLabel: "Network Tenure / Age",
    tenure0to6: "0 to 6 Months",
    tenure6to12: "6 to 12 Months",
    tenure12plus: "12+ Months",
    segmentLabel: "Customer Segment",
    segmentMass: "Mass & High Consumer",
    segmentYouth: "Youth",
    packageLabel: "Package",
    saPackageLabel: "Standalone Package",
    riskLabel: "Risk",
    noRisk: "No Risk",
    lowRisk: "Low Risk",
    medRisk: "Medium Risk",
    highRisk: "High Risk",
    lowRisk1: "Low Risk (1 Mo)",
    medRisk2: "Medium Risk (2 Mo)",
    highRisk3: "High Risk (3 Mo)",
    termLabel: "Term (Months)",
    insuranceLabel: "Insurance Plan",
    insNone: "None",
    insDevice: "Device Insure",
    insInt: "Device Insure International",
    insVip: "Device Insure VIP",
    bundleLabel: "Device Bundle",
    searchBundle: "Search bundle...",
    deviceAmountLabel: "Device Amount (BD)",
    appleCharge: "Apple Monthly (+BD 1.100)",
    regFee: "Registration Fee (+BD 5.500)",
    resetBtn: "Reset",
    printBtn: "Print Quotation",
    lblCap: "Device Cap",
    lblGap: "More Than Cap",
    lblDeviceMonthly: "Device Monthly",
    lblInsMonthly: "Insurance Monthly",
    lblRiskDP: "Risk Down Payment",
    lblVat: "Device VAT",
    lblInsVat: "Insurance VAT",
    lblTotalUpfront: "Total Upfront",
    lblTotalMonthly: "Total Monthly",
    lblTotalMonthlyRental: "Total Monthly Included Rental Charges",
    signature: "Created by Ali Husain Ahmed 103879",
    selectPackage: "Select Package...",
    clientNamePlaceholder: "Customer Full Name (Optional)",
    clientMobilePlaceholder: "Mobile Number (Optional)",
    clientCprPlaceholder: "CPR / ID Number (Optional)"
  },
  ar: {
    appTitle: "حاسبة أجهزة بتلكو",
    adminControl: "لوحة التحكم",
    adminTitle: "لوحة التحكم: الباقات وحزم الأجهزة",
    addUpdatePackage: "إضافة / تحديث باقة",
    targetTab: "القسم المستهدف",
    tabPostpaid: "آجل الدفع (Postpaid)",
    tabStandalone: "باقات مستقلة (Standalone)",
    pkgName: "اسم / قيمة الباقة",
    cap0to6: "سقف 0-6 أشهر (د.ب)",
    cap6to12: "سقف 6-12 شهر (د.ب)",
    cap12plus: "سقف +12 شهر (د.ب)",
    savePackage: "حفظ الباقة",
    removePackage: "حذف باقة",
    selectPkgToRemove: "اختر الباقة للحذف",
    deletePackage: "حذف الباقة",
    addUpdateBundle: "إضافة / تحديث حزمة جهاز",
    bundleName: "اسم الحزمة",
    devicePrice: "سعر الجهاز (د.ب)",
    saveBundle: "حفظ الحزمة",
    removeBundle: "حذف حزمة جهاز",
    selectBundleToRemove: "اختر الحزمة للحذف",
    tenureLabel: "مدة الاشتراك في الشبكة",
    tenure0to6: "من 0 إلى 6 أشهر",
    tenure6to12: "من 6 إلى 12 شهرًا",
    tenure12plus: "+12 شهرًا (سنة فأكثر)",
    segmentLabel: "فئة المشترك",
    segmentMass: "المستهلكين العاليين والجدد (Mass & High)",
    segmentYouth: "الشباب (Youth)",
    packageLabel: "الباقة",
    saPackageLabel: "الباقة المستقلة",
    riskLabel: "نسبة المخاطرة (Risk)",
    noRisk: "بدون مخاطرة",
    lowRisk: "مخاطرة منخفضة",
    medRisk: "مخاطرة متوسطة",
    highRisk: "مخاطرة عالية",
    lowRisk1: "مخاطرة منخفضة (شهر)",
    medRisk2: "مخاطرة متوسطة (شهريين)",
    highRisk3: "مخاطرة عالية (3 أشهر)",
    termLabel: "مدة العقد (أشهر)",
    insuranceLabel: "خطة التأمين",
    insNone: "بدون تأمين",
    insDevice: "تأمين الجهاز",
    insInt: "تأمين الجهاز الدولي",
    insVip: "تأمين الجهاز VIP",
    bundleLabel: "حزمة الجهاز",
    searchBundle: "ابحث عن حزمة...",
    deviceAmountLabel: "مبلغ الجهاز (د.ب)",
    appleCharge: "رسوم أبل الشهرية (+1.100 د.ب)",
    regFee: "رسوم التسجيل (+5.500 د.ب)",
    resetBtn: "إعادة ضبط",
    printBtn: "طباعة عرض السعر",
    lblCap: "سقف الجهاز (Cap)",
    lblGap: "المبلغ الفائض عن السقف",
    lblDeviceMonthly: "قسط الجهاز الشهري",
    lblInsMonthly: "قسط التأمين الشهري",
    lblRiskDP: "الدفعة الأولى للمخاطرة",
    lblVat: "القيمة المضافة للجهاز",
    lblInsVat: "القيمة المضافة للتأمين",
    lblTotalUpfront: "إجمالي الدفع المقدم",
    lblTotalMonthly: "إجمالي القسط الشهري",
    lblTotalMonthlyRental: "إجمالي الشهر شامل إيجار الباقة",
    signature: "تم التطوير بواسطة علي حسين أحمد 103879",
    selectPackage: "اختر الباقة...",
    clientNamePlaceholder: "اسم العميل الكامل (اختياري)",
    clientMobilePlaceholder: "رقم الجوال (اختياري)",
    clientCprPlaceholder: "رقم الشخصي / CPR (اختياري)"
  }
};

let currentLang = localStorage.getItem(STORAGE_KEYS.lang) || 'en';
let PKG_CAPS = JSON.parse(localStorage.getItem(STORAGE_KEYS.postpaid)) || DEFAULT_PKG_CAPS;
let SA_PKG_CAPS = JSON.parse(localStorage.getItem(STORAGE_KEYS.standalone)) || DEFAULT_SA_PKG_CAPS;
let BUNDLES_DATA = JSON.parse(localStorage.getItem(STORAGE_KEYS.bundles)) || DEFAULT_BUNDLES;
localStorage.setItem(STORAGE_KEYS.bundles, JSON.stringify(BUNDLES_DATA));

function fixInfinity(list) {
  return list.map(p => ({
    ...p,
    new: p.new === null || p.new === 'Infinity' ? Infinity : p.new,
    mid: p.mid === null || p.mid === 'Infinity' ? Infinity : (p.mid || p.new),
    existing: p.existing === null || p.existing === 'Infinity' ? Infinity : p.existing
  }));
}
PKG_CAPS = fixInfinity(PKG_CAPS);
SA_PKG_CAPS = fixInfinity(SA_PKG_CAPS);

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEYS.postpaid, JSON.stringify(PKG_CAPS));
  localStorage.setItem(STORAGE_KEYS.standalone, JSON.stringify(SA_PKG_CAPS));
  localStorage.setItem(STORAGE_KEYS.bundles, JSON.stringify(BUNDLES_DATA));
  localStorage.setItem(STORAGE_KEYS.lang, currentLang);
}

const INSURANCE_VAT_PLANS = {
  device: { 12: 3.90, 18: 5.85, 24: 7.80 },
  international: { 12: 5.10, 18: 7.65, 24: 10.20 },
  vip: { 12: 6.30, 18: 9.45, 24: 12.60 }
};

const INSURANCE_MONTHLY_RATES = {
  device: 3.25,
  international: 4.25,
  vip: 5.25
};

let tomSelectInstance = null;

const elements = {
  customer: document.getElementById('customer'),
  segment: document.getElementById('segment'),
  package: document.getElementById('package'),
  risk: document.getElementById('risk'),
  term: document.getElementById('term'),
  insurance: document.getElementById('insurance'),
  appleCharges: document.getElementById('appleCharges'),
  regFeeCheck: document.getElementById('regFeeCheck'),
  deviceInput: document.getElementById('device'),
  deviceBundleSelect: document.getElementById('deviceBundle'),

  // Optional client info elements
  clientName: document.getElementById('clientName'),
  clientMobile: document.getElementById('clientMobile'),
  clientCpr: document.getElementById('clientCpr'),
  printClientName: document.getElementById('printClientName'),
  printClientMobile: document.getElementById('printClientMobile'),
  printClientCpr: document.getElementById('printClientCpr'),

  cap: document.getElementById('cap'),
  gap: document.getElementById('gap'),
  deviceMonthly: document.getElementById('deviceMonthly'),
  insuranceAmount: document.getElementById('insuranceAmount'),
  monthly: document.getElementById('monthly'),
  monthlyWithRental: document.getElementById('monthlyWithRental'),
  riskDP: document.getElementById('riskDP'),
  vat: document.getElementById('vat'),
  insuranceVat: document.getElementById('insuranceVat'),
  total: document.getElementById('total'),
  resetBtn: document.getElementById('resetBtn'),
  printQuoteBtn: document.getElementById('printQuoteBtn'),

  sa_customer: document.getElementById('sa_customer'),
  sa_package: document.getElementById('sa_package'),
  sa_risk: document.getElementById('sa_risk'),
  sa_term: document.getElementById('sa_term'),
  sa_insurance: document.getElementById('sa_insurance'),
  sa_deviceInput: document.getElementById('sa_device'),
  sa_regFeeCheck: document.getElementById('sa_regFeeCheck'),
  sa_cap: document.getElementById('sa_cap'),
  sa_gap: document.getElementById('sa_gap'),
  sa_deviceMonthly: document.getElementById('sa_deviceMonthly'),
  sa_insuranceAmount: document.getElementById('sa_insuranceAmount'),
  sa_monthly: document.getElementById('sa_monthly'),
  sa_monthlyWithRental: document.getElementById('sa_monthlyWithRental'),
  sa_riskDP: document.getElementById('sa_riskDP'),
  sa_vat: document.getElementById('sa_vat'),
  sa_insuranceVat: document.getElementById('sa_insuranceVat'),
  sa_total: document.getElementById('sa_total'),
  sa_resetBtn: document.getElementById('sa_resetBtn'),
  sa_printQuoteBtn: document.getElementById('sa_printQuoteBtn'),

  adminToggleBtn: document.getElementById('adminToggleBtn'),
  langToggleBtn: document.getElementById('langToggleBtn'),
  adminPanel: document.getElementById('adminPanel'),
  adminPkgType: document.getElementById('adminPkgType'),
  adminPkgName: document.getElementById('adminPkgName'),
  adminNewCap: document.getElementById('adminNewCap'),
  adminMidCap: document.getElementById('adminMidCap'),
  adminExistingCap: document.getElementById('adminExistingCap'),
  addPackageBtn: document.getElementById('addPackageBtn'),
  
  adminRemovePkgType: document.getElementById('adminRemovePkgType'),
  adminRemovePkgSelect: document.getElementById('adminRemovePkgSelect'),
  removePackageBtn: document.getElementById('removePackageBtn'),

  adminBundleName: document.getElementById('adminBundleName'),
  adminBundlePrice: document.getElementById('adminBundlePrice'),
  addBundleBtn: document.getElementById('addBundleBtn'),

  adminRemoveBundleSelect: document.getElementById('adminRemoveBundleSelect'),
  removeBundleBtn: document.getElementById('removeBundleBtn')
};

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  elements.langToggleBtn.textContent = lang === 'ar' ? 'English' : 'العربية';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang] && I18N[lang][key]) {
      el.textContent = I18N[lang][key];
    }
  });

  if (elements.clientName) elements.clientName.placeholder = I18N[lang].clientNamePlaceholder;
  if (elements.clientMobile) elements.clientMobile.placeholder = I18N[lang].clientMobilePlaceholder;
  if (elements.clientCpr) elements.clientCpr.placeholder = I18N[lang].clientCprPlaceholder;

  saveToLocalStorage();
  updatePackageDropdowns();
}

function syncClientInfoForPrint() {
  const nameVal = elements.clientName ? elements.clientName.value.trim() : '';
  const mobileVal = elements.clientMobile ? elements.clientMobile.value.trim() : '';
  const cprVal = elements.clientCpr ? elements.clientCpr.value.trim() : '';
  const detailsBox = document.getElementById('printClientDetailsBox');
  
  if (!nameVal && !mobileVal && !cprVal) {
    if (detailsBox) detailsBox.style.display = 'none';
  } else {
    if (detailsBox) detailsBox.style.display = 'block';
    if (elements.printClientName) elements.printClientName.textContent = nameVal || '-';
    if (elements.printClientMobile) elements.printClientMobile.textContent = mobileVal || '-';
    if (elements.printClientCpr) elements.printClientCpr.textContent = cprVal || '-';
  }
}

function getDynamicCap(selectedPkgKey, tenure, segment) {
  if (!selectedPkgKey) return 0;
  const pkgVal = parseFloat(selectedPkgKey) || 0;

  if (selectedPkgKey === '0' || pkgVal === 0) {
    if (tenure === 'new') return 400;
    if (tenure === 'mid') return 500;
    return 600;
  }
  if (pkgVal === 11 || pkgVal === 10.5) {
    if (tenure === 'new') return 200;
    return 300;
  }
  if (pkgVal === 12.5 || pkgVal === 15) {
    if (tenure === 'new') return 400;
    if (tenure === 'mid') return 500;
    return 550;
  }
  if (pkgVal === 22) {
    if (segment === 'youth') {
      if (tenure === 'new') return 400;
      if (tenure === 'mid') return 500;
      return 600;
    } else {
      if (tenure === 'new') return 400;
      if (tenure === 'mid') return 600;
      return 700;
    }
  }

  const pkgObj = findPkg(selectedPkgKey, 'postpaid');
  if (pkgObj) {
    if (tenure === 'new') return pkgObj.new ?? 400;
    if (tenure === 'mid') return pkgObj.mid ?? pkgObj.new ?? 500;
    return pkgObj.existing ?? 550;
  }
  return 0;
}

function formatBD(amount) {
  if (!isFinite(amount)) return currentLang === 'ar' ? "بدون سقف" : "No Cap";
  return `BD ${Number(amount).toFixed(2)}`;
}

function findPkg(pkgKey, type = 'postpaid') {
  const list = type === 'postpaid' ? PKG_CAPS : SA_PKG_CAPS;
  return list.find(p => p.key === pkgKey);
}

function calculateTotal() {
  syncClientInfoForPrint();
  const deviceVal = parseFloat(elements.deviceInput.value) || 0;
  const termVal = Number(elements.term.value);
  const riskMonths = Number(elements.risk.value); 
  const tenure = elements.customer.value; 
  const segment = elements.segment ? elements.segment.value : 'mass';
  const selectedPkgKey = elements.package.value;
  
  const packageRentalFee = selectedPkgKey === '0' ? 0 : (selectedPkgKey ? (parseFloat(selectedPkgKey) || 0) : 0);
  const insuranceType = elements.insurance.value;
  const addAppleCharges = elements.appleCharges ? elements.appleCharges.checked : false;
  const addRegFee = elements.regFeeCheck ? elements.regFeeCheck.checked : false;

  const cap = selectedPkgKey ? getDynamicCap(selectedPkgKey, tenure, segment) : 0;
  const gap = Math.max(0, deviceVal - cap);

  let insuranceVat = 0;
  let insuranceMonthly = 0;
  if (insuranceType !== '0') {
    if (INSURANCE_VAT_PLANS[insuranceType]) insuranceVat = INSURANCE_VAT_PLANS[insuranceType][termVal] || 0;
    if (INSURANCE_MONTHLY_RATES[insuranceType]) insuranceMonthly = INSURANCE_MONTHLY_RATES[insuranceType];
  }

  const amountToFinance = selectedPkgKey ? Math.min(deviceVal, cap) : deviceVal;
  const baseDeviceMonthly = termVal > 0 ? amountToFinance / termVal : 0;
  let deviceMonthly = baseDeviceMonthly + (addAppleCharges ? 1.100 : 0);

  const vat = deviceVal * 0.10;
  const riskDP = baseDeviceMonthly * riskMonths;
  const regFee = addRegFee ? 5.500 : 0;

  elements.cap.textContent = selectedPkgKey ? formatBD(cap) : "BD 0.00";
  elements.gap.textContent = selectedPkgKey ? formatBD(gap) : "BD 0.00";
  elements.deviceMonthly.textContent = formatBD(deviceMonthly);
  elements.insuranceAmount.textContent = formatBD(insuranceMonthly);
  elements.riskDP.textContent = formatBD(riskDP);
  elements.vat.textContent = formatBD(vat);
  elements.insuranceVat.textContent = formatBD(insuranceVat);
  elements.total.textContent = formatBD(insuranceVat + vat + riskDP + (selectedPkgKey ? gap : 0));
  elements.monthly.textContent = formatBD(deviceMonthly + insuranceMonthly + regFee);
  elements.monthlyWithRental.textContent = formatBD(deviceMonthly + insuranceMonthly + regFee + packageRentalFee);
}

function calculateStandaloneTotal() {
  syncClientInfoForPrint();
  const deviceVal = parseFloat(elements.sa_deviceInput.value) || 0;
  const termVal = Number(elements.sa_term.value);
  const riskMonths = Number(elements.sa_risk.value);
  const tenure = elements.sa_customer.value;
  const selectedPkgKey = elements.sa_package.value;
  const packageRentalFee = selectedPkgKey ? (parseFloat(selectedPkgKey) || 0) : 0;
  const insuranceType = elements.sa_insurance.value;
  const addRegFee = elements.sa_regFeeCheck ? elements.sa_regFeeCheck.checked : false;

  const pkgObj = findPkg(selectedPkgKey, 'standalone');
  let cap = Infinity;
  if (pkgObj) {
    if (tenure === 'new') cap = pkgObj.new;
    else if (tenure === 'mid') cap = pkgObj.mid ?? pkgObj.new;
    else cap = pkgObj.existing;
  }

  const gap = selectedPkgKey && isFinite(cap) ? Math.max(0, deviceVal - cap) : 0;
  let insuranceVat = 0, insuranceMonthly = 0;
  if (insuranceType !== '0') {
    if (INSURANCE_VAT_PLANS[insuranceType]) insuranceVat = INSURANCE_VAT_PLANS[insuranceType][termVal] || 0;
    if (INSURANCE_MONTHLY_RATES[insuranceType]) insuranceMonthly = INSURANCE_MONTHLY_RATES[insuranceType];
  }

  const amountToFinance = selectedPkgKey ? (isFinite(cap) ? Math.min(deviceVal, cap) : deviceVal) : deviceVal;
  const deviceMonthly = termVal > 0 ? amountToFinance / termVal : 0;
  const vat = deviceVal * 0.10;
  const riskDP = deviceMonthly * riskMonths;
  const regFee = addRegFee ? 5.500 : 0;
  
  elements.sa_cap.textContent = selectedPkgKey ? formatBD(cap) : "BD 0.00";
  elements.sa_gap.textContent = selectedPkgKey ? formatBD(gap) : "BD 0.00";
  elements.sa_deviceMonthly.textContent = formatBD(deviceMonthly);
  elements.sa_insuranceAmount.textContent = formatBD(insuranceMonthly);
  elements.sa_riskDP.textContent = formatBD(riskDP);
  elements.sa_vat.textContent = formatBD(vat);
  elements.sa_insuranceVat.textContent = formatBD(insuranceVat);
  elements.sa_total.textContent = formatBD(insuranceVat + vat + riskDP + (selectedPkgKey ? gap : 0));
  elements.sa_monthly.textContent = formatBD(deviceMonthly + insuranceMonthly + regFee);
  elements.sa_monthlyWithRental.textContent = formatBD(deviceMonthly + insuranceMonthly + regFee + packageRentalFee);
}

function populateRemoveBundleDropdown() {
  const removeBundleSelect = elements.adminRemoveBundleSelect;
  if (!removeBundleSelect) return;
  
  removeBundleSelect.innerHTML = '<option value="" disabled selected>Select Bundle to Remove</option>';
  Object.keys(BUNDLES_DATA).sort().forEach(bundleName => {
    const opt = document.createElement('option');
    opt.value = bundleName;
    opt.textContent = `${bundleName} (BD ${Number(BUNDLES_DATA[bundleName]).toFixed(3)})`;
    removeBundleSelect.appendChild(opt);
  });
}

function initTomSelect() {
  if (!elements.deviceBundleSelect) return;

  const options = Object.entries(BUNDLES_DATA).map(([name, price]) => ({
    value: name,
    text: name,
    price: price
  }));

  if (tomSelectInstance) tomSelectInstance.destroy();

  tomSelectInstance = new TomSelect('#deviceBundle', {
    options: options,
    valueField: 'value',
    labelField: 'text',
    searchField: 'text',
    placeholder: I18N[currentLang].searchBundle,
    maxOptions: 50,
    shouldLoad: function(query) {
      return query.length > 0; // Hides dropdown items until typing search query
    },
    render: {
      option: function(data, escape) {
        return `<div class="bundle-option">
                  <span>${escape(data.text)}</span>
                  <span class="bundle-price">BD ${Number(data.price).toFixed(3)}</span>
                </div>`;
      },
      item: function(data, escape) {
        return `<div>${escape(data.text)}</div>`;
      }
    },
    onChange: function(val) {
      if (val && BUNDLES_DATA[val] !== undefined) {
        elements.deviceInput.value = BUNDLES_DATA[val];
        calculateTotal();
      }
    }
  });

  populateRemoveBundleDropdown();
}

function updatePackageDropdowns() {
  const pkgSelect = elements.package;
  const currentPkg = pkgSelect.value;
  pkgSelect.innerHTML = '';
  
  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = I18N[currentLang].selectPackage;
  defaultOpt.disabled = true;
  defaultOpt.selected = true;
  pkgSelect.appendChild(defaultOpt);

  PKG_CAPS.forEach(pkg => {
    const opt = document.createElement('option');
    opt.value = pkg.key;
    opt.textContent = pkg.label;
    pkgSelect.appendChild(opt);
  });
  if (currentPkg) pkgSelect.value = currentPkg;

  const saPkgSelect = elements.sa_package;
  const currentSaPkg = saPkgSelect.value;
  saPkgSelect.innerHTML = '';
  
  const defaultSaOpt = document.createElement('option');
  defaultSaOpt.value = '';
  defaultSaOpt.textContent = I18N[currentLang].selectPackage;
  defaultSaOpt.disabled = true;
  defaultSaOpt.selected = true;
  saPkgSelect.appendChild(defaultSaOpt);

  SA_PKG_CAPS.forEach(pkg => {
    const opt = document.createElement('option');
    opt.value = pkg.key;
    opt.textContent = pkg.label;
    saPkgSelect.appendChild(opt);
  });
  if (currentSaPkg) saPkgSelect.value = currentSaPkg;

  updateAdminRemovePackageDropdown();
}

function updateAdminRemovePackageDropdown() {
  const type = elements.adminRemovePkgType.value;
  const selectEl = elements.adminRemovePkgSelect;
  selectEl.innerHTML = '';
  const targetList = type === 'postpaid' ? PKG_CAPS : SA_PKG_CAPS;
  targetList.forEach(pkg => {
    const opt = document.createElement('option');
    opt.value = pkg.key;
    opt.textContent = pkg.label;
    selectEl.appendChild(opt);
  });
}

function printQuotation() {
  syncClientInfoForPrint();
  window.print();
}

function setupEventListeners() {
  elements.langToggleBtn.addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'ar' : 'en');
  });

  elements.printQuoteBtn.addEventListener('click', printQuotation);
  if (elements.sa_printQuoteBtn) elements.sa_printQuoteBtn.addEventListener('click', printQuotation);

  elements.adminToggleBtn.addEventListener('click', () => {
    const isVisible = elements.adminPanel.style.display === 'block';
    elements.adminPanel.style.display = isVisible ? 'none' : 'block';
  });

  elements.adminRemovePkgType.addEventListener('change', updateAdminRemovePackageDropdown);

  elements.addBundleBtn.addEventListener('click', () => {
    const name = elements.adminBundleName.value.trim();
    const price = parseFloat(elements.adminBundlePrice.value);
    if (!name || isNaN(price)) return;

    BUNDLES_DATA[name] = price;
    saveToLocalStorage();
    initTomSelect();
    populateRemoveBundleDropdown();
    elements.adminBundleName.value = '';
    elements.adminBundlePrice.value = '';
  });

  elements.removeBundleBtn.addEventListener('click', () => {
    const bundleName = elements.adminRemoveBundleSelect.value;
    if (!bundleName) return;

    delete BUNDLES_DATA[bundleName];
    saveToLocalStorage();
    initTomSelect();
    populateRemoveBundleDropdown();
  });

  // Preset quick filter buttons click listener
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const term = btn.getAttribute('data-preset');
      if (tomSelectInstance) {
        tomSelectInstance.clear();
        tomSelectInstance.focus();
        tomSelectInstance.setTextboxValue(term);
        tomSelectInstance.refreshOptions(true);
        tomSelectInstance.open();
      }
    });
  });

  const handleReset = () => {
    elements.customer.value = 'existing';
    elements.segment.value = 'mass';
    elements.package.value = '';
    elements.risk.value = '0';
    elements.term.value = '24';
    elements.insurance.value = '0';
    elements.deviceInput.value = '';
    if (elements.clientName) elements.clientName.value = '';
    if (elements.clientMobile) elements.clientMobile.value = '';
    if (elements.clientCpr) elements.clientCpr.value = '';
    if (elements.appleCharges) elements.appleCharges.checked = false;
    if (elements.regFeeCheck) elements.regFeeCheck.checked = false;
    if (tomSelectInstance) tomSelectInstance.clear(true);
    calculateTotal();
  };

  if (elements.resetBtn) elements.resetBtn.addEventListener('click', handleReset);

  [elements.customer, elements.segment, elements.package, elements.risk, elements.term,
   elements.insurance, elements.appleCharges, elements.regFeeCheck, elements.deviceInput,
   elements.clientName, elements.clientMobile, elements.clientCpr].forEach(input => {
    if (input) {
      input.addEventListener('change', calculateTotal);
      input.addEventListener('input', calculateTotal);
    }
  });

  elements.deviceInput.addEventListener('input', () => {
    if (tomSelectInstance && tomSelectInstance.getValue()) tomSelectInstance.clear(true);
  });

  [elements.sa_customer, elements.sa_package, elements.sa_risk,
   elements.sa_term, elements.sa_insurance, elements.sa_regFeeCheck, elements.sa_deviceInput].forEach(input => {
    if (input) {
      input.addEventListener('change', calculateStandaloneTotal);
      input.addEventListener('input', calculateStandaloneTotal);
    }
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  saveToLocalStorage();
  applyLanguage(currentLang);
  setupEventListeners();
  initTomSelect();
  populateRemoveBundleDropdown();
  calculateTotal();
  calculateStandaloneTotal();
});
