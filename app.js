// --- Persistent Storage Helpers ---
const STORAGE_KEYS = {
  postpaid: 'batelco_postpaid_pkgs_v1',
  standalone: 'batelco_standalone_pkgs_v1',
  bundles: 'batelco_bundles_v1'
};

// Default Initial Data
const DEFAULT_PKG_CAPS = [
  { key: '10.5', new: 200, existing: 300, label: 'Basic Int BD10.5' },
  { key: '11', new: 400, existing: 500, label: 'Basic Int BD11' },
  { key: '12.5', new: 400, existing: 500, label: 'Extra Int BD12.5' },
  { key: '15', new: 400, existing: 600, label: 'Extra Plus BD15' },
  { key: '22', new: 400, existing: 600, label: 'Extra Max BD22' }
];

const DEFAULT_SA_PKG_CAPS = [
  { key: '16', new: 800, existing: 800, label: '16 BD' },
  { key: '18.5', new: 800, existing: 800, label: '18.5 BD' },
  { key: '30', new: 1000, existing: 1000, label: '30 BD' },
  { key: '44', new: 1000, existing: 1000, label: '44 BD' },
  { key: '110', new: Infinity, existing: Infinity, label: '110 BD' }
];

const DEFAULT_BUNDLES = {
  "Summer Cash iPhone 17 Pro Max 256GB + Silicone Case": 486.112,
  "Summer Inst 12M iPhone 17 Pro Max 256GB + Silicone Case": 486.112,
  "Summer Inst 18M iPhone 17 Pro Max 256GB + Silicone Case": 486.112,
  "Summer Inst 24M iPhone 17 Pro Max 256GB + Silicone Case": 486.112,
  "Summer One Plan Max Rental iPhone 17 Pro Max 256GB + Silicone Case": 86.112,
  "Summer One Plan Max 2 - iPhone 17 Pro Max 256GB + Silicone Case": 186.112,
  "Summer One Plan Plus Rental iPhone 17 Pro Max 256GB + Silicone Case": 186.112,
  "Summer One Plan Plus 2 - iPhone 17 Pro Max 256GB + Silicone Case": 286.112,
  "EGB 24M iPhone 17 Pro Max 256GB": 480.872,
  "Cash iPhone 17 Pro Max 256GB": 480.872,
  "Inst 24M iPhone 17 Pro Max 256GB": 465.58
};

// Load saved data or fallback to defaults
let PKG_CAPS = JSON.parse(localStorage.getItem(STORAGE_KEYS.postpaid)) || DEFAULT_PKG_CAPS;
let SA_PKG_CAPS = JSON.parse(localStorage.getItem(STORAGE_KEYS.standalone)) || DEFAULT_SA_PKG_CAPS;
let BUNDLES_DATA = JSON.parse(localStorage.getItem(STORAGE_KEYS.bundles)) || DEFAULT_BUNDLES;

// Handle Infinity serialization issue in JSON
function fixInfinity(list) {
  return list.map(p => ({
    ...p,
    new: p.new === null || p.new === 'Infinity' ? Infinity : p.new,
    existing: p.existing === null || p.existing === 'Infinity' ? Infinity : p.existing
  }));
}
PKG_CAPS = fixInfinity(PKG_CAPS);
SA_PKG_CAPS = fixInfinity(SA_PKG_CAPS);

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEYS.postpaid, JSON.stringify(PKG_CAPS));
  localStorage.setItem(STORAGE_KEYS.standalone, JSON.stringify(SA_PKG_CAPS));
  localStorage.setItem(STORAGE_KEYS.bundles, JSON.stringify(BUNDLES_DATA));
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

// --- DOM Cache ---
const elements = {
  customer: document.getElementById('customer'),
  package: document.getElementById('package'),
  risk: document.getElementById('risk'),
  term: document.getElementById('term'),
  insurance: document.getElementById('insurance'),
  appleCharges: document.getElementById('appleCharges'),
  regFeeCheck: document.getElementById('regFeeCheck'),
  deviceInput: document.getElementById('device'),
  deviceBundleSelect: document.getElementById('deviceBundle'),
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

  adminToggleBtn: document.getElementById('adminToggleBtn'),
  adminPanel: document.getElementById('adminPanel'),
  adminPkgType: document.getElementById('adminPkgType'),
  adminPkgName: document.getElementById('adminPkgName'),
  adminNewCap: document.getElementById('adminNewCap'),
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

// --- Helper Functions ---
function formatBD(amount) {
  if (!isFinite(amount)) return "No Cap";
  return `BD ${Number(amount).toFixed(2)}`;
}

function findPkg(pkgKey, type = 'postpaid') {
  const list = type === 'postpaid' ? PKG_CAPS : SA_PKG_CAPS;
  return list.find(p => p.key === pkgKey);
}

// --- Main Calculation Logic (Postpaid) ---
function calculateTotal() {
  const deviceVal = parseFloat(elements.deviceInput.value) || 0;
  const termVal = Number(elements.term.value);
  const riskMonths = Number(elements.risk.value); 
  const customerType = elements.customer.value;
  const selectedPkgKey = elements.package.value;
  const packageRentalFee = parseFloat(selectedPkgKey) || 0;
  const insuranceType = elements.insurance.value;
  const addAppleCharges = elements.appleCharges ? elements.appleCharges.checked : false;
  const addRegFee = elements.regFeeCheck ? elements.regFeeCheck.checked : false;

  const pkgObj = findPkg(selectedPkgKey, 'postpaid');
  const cap = pkgObj ? pkgObj[customerType] : 0;
  const gap = Math.max(0, deviceVal - cap);

  let insuranceVat = 0;
  let insuranceMonthly = 0;

  if (insuranceType !== '0') {
    if (INSURANCE_VAT_PLANS[insuranceType]) {
      insuranceVat = INSURANCE_VAT_PLANS[insuranceType][termVal] || 0;
    }
    if (INSURANCE_MONTHLY_RATES[insuranceType]) {
      insuranceMonthly = INSURANCE_MONTHLY_RATES[insuranceType];
    }
  }

  const amountToFinance = Math.min(deviceVal, cap);
  const baseDeviceMonthly = termVal > 0 ? amountToFinance / termVal : 0;
  
  let deviceMonthly = baseDeviceMonthly;
  if (addAppleCharges) {
    deviceMonthly += 1.100;
  }

  const vat = deviceVal * 0.10;
  const riskDP = baseDeviceMonthly * riskMonths;
  const regFee = addRegFee ? 5.500 : 0;

  const totalUpfront = insuranceVat + vat + riskDP + gap;
  const totalMonthly = deviceMonthly + insuranceMonthly + regFee;
  const totalMonthlyWithRental = totalMonthly + packageRentalFee;

  elements.cap.textContent = formatBD(cap);
  elements.gap.textContent = formatBD(gap);
  elements.deviceMonthly.textContent = formatBD(deviceMonthly);
  elements.insuranceAmount.textContent = formatBD(insuranceMonthly);
  elements.riskDP.textContent = formatBD(riskDP);
  elements.vat.textContent = formatBD(vat);
  elements.insuranceVat.textContent = formatBD(insuranceVat);
  elements.total.textContent = formatBD(totalUpfront);
  elements.monthly.textContent = formatBD(totalMonthly);
  elements.monthlyWithRental.textContent = formatBD(totalMonthlyWithRental);
}

// --- Main Calculation Logic (Standalone) ---
function calculateStandaloneTotal() {
  const deviceVal = parseFloat(elements.sa_deviceInput.value) || 0;
  const termVal = Number(elements.sa_term.value);
  const riskMonths = Number(elements.sa_risk.value);
  const customerType = elements.sa_customer.value;
  const selectedPkgKey = elements.sa_package.value;
  const packageRentalFee = parseFloat(selectedPkgKey) || 0;
  const insuranceType = elements.sa_insurance.value;
  const addRegFee = elements.sa_regFeeCheck ? elements.sa_regFeeCheck.checked : false;

  const pkgObj = findPkg(selectedPkgKey, 'standalone');
  const cap = pkgObj ? pkgObj[customerType] : Infinity;
  const gap = isFinite(cap) ? Math.max(0, deviceVal - cap) : 0;

  let insuranceVat = 0;
  let insuranceMonthly = 0;

  if (insuranceType !== '0') {
    if (INSURANCE_VAT_PLANS[insuranceType]) {
      insuranceVat = INSURANCE_VAT_PLANS[insuranceType][termVal] || 0;
    }
    if (INSURANCE_MONTHLY_RATES[insuranceType]) {
      insuranceMonthly = INSURANCE_MONTHLY_RATES[insuranceType];
    }
  }

  const amountToFinance = isFinite(cap) ? Math.min(deviceVal, cap) : deviceVal;
  const deviceMonthly = termVal > 0 ? amountToFinance / termVal : 0;
  
  const vat = deviceVal * 0.10;
  const riskDP = deviceMonthly * riskMonths;
  const regFee = addRegFee ? 5.500 : 0;
  
  const totalUpfront = insuranceVat + vat + riskDP + gap;
  const totalMonthly = deviceMonthly + insuranceMonthly + regFee;
  const totalMonthlyWithRental = totalMonthly + packageRentalFee;

  elements.sa_cap.textContent = formatBD(cap);
  elements.sa_gap.textContent = formatBD(gap);
  elements.sa_deviceMonthly.textContent = formatBD(deviceMonthly);
  elements.sa_insuranceAmount.textContent = formatBD(insuranceMonthly);
  elements.sa_riskDP.textContent = formatBD(riskDP);
  elements.sa_vat.textContent = formatBD(vat);
  elements.sa_insuranceVat.textContent = formatBD(insuranceVat);
  elements.sa_total.textContent = formatBD(totalUpfront);
  elements.sa_monthly.textContent = formatBD(totalMonthly);
  elements.sa_monthlyWithRental.textContent = formatBD(totalMonthlyWithRental);
}

// --- Initialize TomSelect & Admin Dropdowns ---
function initTomSelect() {
  if (!elements.deviceBundleSelect) return;

  const options = Object.entries(BUNDLES_DATA).map(([name, price]) => ({
    value: price,
    text: name,
    price: price
  }));

  if (tomSelectInstance) {
    tomSelectInstance.destroy();
  }

  tomSelectInstance = new TomSelect('#deviceBundle', {
    options: options,
    valueField: 'value',
    labelField: 'text',
    searchField: 'text',
    placeholder: 'Search bundle...',
    maxOptions: null,
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
      if (val) {
        elements.deviceInput.value = val;
        calculateTotal();
      }
    }
  });

  const removeBundleSelect = elements.adminRemoveBundleSelect;
  removeBundleSelect.innerHTML = '';
  Object.keys(BUNDLES_DATA).forEach(bundleName => {
    const opt = document.createElement('option');
    opt.value = bundleName;
    opt.textContent = bundleName;
    removeBundleSelect.appendChild(opt);
  });
}

function updatePackageDropdowns() {
  const pkgSelect = elements.package;
  const currentPkg = pkgSelect.value;
  pkgSelect.innerHTML = '';
  
  PKG_CAPS.sort((a, b) => parseFloat(a.key) - parseFloat(b.key));
  PKG_CAPS.forEach(pkg => {
    const opt = document.createElement('option');
    opt.value = pkg.key;
    opt.textContent = pkg.label;
    pkgSelect.appendChild(opt);
  });
  if (currentPkg && PKG_CAPS.some(p => p.key === currentPkg)) {
    pkgSelect.value = currentPkg;
  } else if (PKG_CAPS.length > 0) {
    pkgSelect.value = PKG_CAPS[0].key;
  }

  const saPkgSelect = elements.sa_package;
  const currentSaPkg = saPkgSelect.value;
  saPkgSelect.innerHTML = '';
  
  SA_PKG_CAPS.sort((a, b) => parseFloat(a.key) - parseFloat(b.key));
  SA_PKG_CAPS.forEach(pkg => {
    const opt = document.createElement('option');
    opt.value = pkg.key;
    opt.textContent = pkg.label;
    saPkgSelect.appendChild(opt);
  });
  if (currentSaPkg && SA_PKG_CAPS.some(p => p.key === currentSaPkg)) {
    saPkgSelect.value = currentSaPkg;
  } else if (SA_PKG_CAPS.length > 0) {
    saPkgSelect.value = SA_PKG_CAPS[0].key;
  }

  updateAdminRemovePackageDropdown();
}

function updateAdminRemovePackageDropdown() {
  const type = elements.adminRemovePkgType.value;
  const selectEl = elements.adminRemovePkgSelect;
  selectEl.innerHTML = '';

  const targetList = type === 'postpaid' ? PKG_CAPS : SA_PKG_CAPS;
  targetList.sort((a, b) => parseFloat(a.key) - parseFloat(b.key));
  targetList.forEach(pkg => {
    const opt = document.createElement('option');
    opt.value = pkg.key;
    opt.textContent = pkg.label;
    selectEl.appendChild(opt);
  });
}

// --- Event Listeners Setup ---
function setupEventListeners() {
  elements.adminToggleBtn.addEventListener('click', () => {
    const isVisible = elements.adminPanel.style.display === 'block';
    elements.adminPanel.style.display = isVisible ? 'none' : 'block';
  });

  elements.adminRemovePkgType.addEventListener('change', updateAdminRemovePackageDropdown);

  elements.addPackageBtn.addEventListener('click', () => {
    const type = elements.adminPkgType.value;
    const rawInput = elements.adminPkgName.value.trim();
    const names = rawInput.split(/,|\n/).map(n => n.trim()).filter(Boolean);
    const newCap = parseFloat(elements.adminNewCap.value);
    const existingCap = parseFloat(elements.adminExistingCap.value);

    if (names.length === 0 || isNaN(newCap) || isNaN(existingCap)) {
      alert("Please fill in valid package name(s) and cap values.");
      return;
    }

    const targetList = type === 'postpaid' ? PKG_CAPS : SA_PKG_CAPS;

    names.forEach(name => {
      const keyVal = name.replace(/[^0-9.]/g, '') || name;
      const customLabel = name; 

      const existingIndex = targetList.findIndex(p => p.key === keyVal || p.label === customLabel);

      if (existingIndex >= 0) {
        targetList[existingIndex] = { key: keyVal, new: newCap, existing: existingCap, label: customLabel };
      } else {
        targetList.push({ key: keyVal, new: newCap, existing: existingCap, label: customLabel });
      }
    });

    saveToLocalStorage();
    updatePackageDropdowns();
    alert(`Package(s) successfully added/updated and saved permanently!`);
    elements.adminPkgName.value = '';
    elements.adminNewCap.value = '';
    elements.adminExistingCap.value = '';
    calculateTotal();
    calculateStandaloneTotal();
  });

  elements.removePackageBtn.addEventListener('click', () => {
    const type = elements.adminRemovePkgType.value;
    const pkgKey = elements.adminRemovePkgSelect.value;

    if (!pkgKey) {
      alert("No package selected for removal.");
      return;
    }

    const targetList = type === 'postpaid' ? PKG_CAPS : SA_PKG_CAPS;
    if (targetList.length <= 1) {
      alert("Cannot remove all packages. At least one package must remain.");
      return;
    }

    const index = targetList.findIndex(p => p.key === pkgKey);
    let removedLabel = pkgKey;
    if (index >= 0) {
      removedLabel = targetList[index].label;
      targetList.splice(index, 1);
    }

    saveToLocalStorage();
    updatePackageDropdowns();
    alert(`Package "${removedLabel}" successfully removed!`);
    calculateTotal();
    calculateStandaloneTotal();
  });

  elements.addBundleBtn.addEventListener('click', () => {
    const name = elements.adminBundleName.value.trim();
    const price = parseFloat(elements.adminBundlePrice.value);

    if (!name || isNaN(price)) {
      alert("Please enter a valid bundle name and device price.");
      return;
    }

    BUNDLES_DATA[name] = price;
    saveToLocalStorage();
    initTomSelect();
    alert(`Device Bundle "${name}" successfully added!`);
    elements.adminBundleName.value = '';
    elements.adminBundlePrice.value = '';
  });

  elements.removeBundleBtn.addEventListener('click', () => {
    const bundleName = elements.adminRemoveBundleSelect.value;

    if (!bundleName) {
      alert("No bundle selected for removal.");
      return;
    }

    if (Object.keys(BUNDLES_DATA).length <= 1) {
      alert("Cannot remove all bundles. At least one bundle must remain.");
      return;
    }

    delete BUNDLES_DATA[bundleName];
    saveToLocalStorage();
    initTomSelect();
    alert(`Device Bundle "${bundleName}" successfully removed!`);
  });

  const postpaidInputs = [
    elements.customer, elements.package, elements.risk, elements.term,
    elements.insurance, elements.appleCharges, elements.regFeeCheck, elements.deviceInput
  ];

  postpaidInputs.forEach(input => {
    if (input) {
      input.addEventListener('change', calculateTotal);
      input.addEventListener('input', calculateTotal);
    }
  });

  elements.deviceInput.addEventListener('input', () => {
    if (tomSelectInstance && tomSelectInstance.getValue()) {
      tomSelectInstance.clear(true);
    }
  });

  elements.resetBtn.addEventListener('click', () => {
    elements.customer.value = 'existing';
    elements.package.value = PKG_CAPS[0] ? PKG_CAPS[0].key : '10.5';
    elements.risk.value = '0'; // Default to No Risk
    elements.term.value = '24';
    elements.insurance.value = '0';
    elements.deviceInput.value = '';
    if (elements.appleCharges) elements.appleCharges.checked = false;
    if (elements.regFeeCheck) elements.regFeeCheck.checked = false;
    if (tomSelectInstance) tomSelectInstance.clear(true);
    calculateTotal();
  });

  const saInputs = [
    elements.sa_customer, elements.sa_package, elements.sa_risk,
    elements.sa_term, elements.sa_insurance, elements.sa_regFeeCheck, elements.sa_deviceInput
  ];

  saInputs.forEach(input => {
    if (input) {
      input.addEventListener('change', calculateStandaloneTotal);
      input.addEventListener('input', calculateStandaloneTotal);
    }
  });

  elements.sa_resetBtn.addEventListener('click', () => {
    elements.sa_customer.value = 'existing';
    elements.sa_package.value = SA_PKG_CAPS[0] ? SA_PKG_CAPS[0].key : '16';
    elements.sa_risk.value = '0';
    elements.sa_term.value = '24';
    elements.sa_insurance.value = '0';
    elements.sa_deviceInput.value = '';
    if (elements.sa_regFeeCheck) elements.sa_regFeeCheck.checked = false;
    calculateStandaloneTotal();
  });

  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
  });
}

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  if (elements.insurance) elements.insurance.value = '0';
  if (elements.sa_insurance) elements.sa_insurance.value = '0';

  updatePackageDropdowns();

  if (PKG_CAPS.length > 0) elements.package.value = PKG_CAPS[0].key;
  if (SA_PKG_CAPS.length > 0) elements.sa_package.value = SA_PKG_CAPS[0].key;

  initTomSelect();
  setupEventListeners();
  calculateTotal();
  calculateStandaloneTotal();
});
