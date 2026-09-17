// app.js - Updated Device Bundle & Pricing Logic

// --- Complete DEFAULT_BUNDLES Data Dictionary ---
const DEFAULT_BUNDLES = {
  // iPhone 18 Pro - 256GB
  "Cash iPhone 18 Pro 256GB": 568.0,
  "Inst 12M iPhone 18 Pro 256GB": 568.0,
  "Inst 18M iPhone 18 Pro 256GB": 568.0,
  "Inst 24M iPhone 18 Pro 256GB": 568.0,
  "One Plan Max 2 - iPhone 18 Pro 256GB": 288.0,
  "One Plan Max Rental - iPhone 18 Pro 256GB": 188.0,
  "One Plan Plus 2 - iPhone 18 Pro 256GB": 388.0,
  "One Plan Plus Rental - iPhone 18 Pro 256GB": 288.0,
  "Staff Freetime 12M - iPhone 18 Pro 256GB": 489.0,
  "Staff Freetime 18M - iPhone 18 Pro 256GB": 489.0,
  "Staff Freetime 24M - iPhone 18 Pro 256GB": 489.0,
  "Contracted Extra Max 12M - iPhone 18 Pro 256GB": 489.0,
  "Contracted Extra Max 18M - iPhone 18 Pro 256GB": 489.0,
  "Contracted Extra Max 24M - iPhone 18 Pro 256GB": 489.0,
  "Ultimate 12M - iPhone 18 Pro 256GB": 489.0,
  "Ultimate 18M - iPhone 18 Pro 256GB": 489.0,
  "Ultimate 24M - iPhone 18 Pro 256GB": 489.0,
  "Ultimate Max 12M - iPhone 18 Pro 256GB": 489.0,
  "Ultimate Max 18M - iPhone 18 Pro 256GB": 489.0,
  "Ultimate Max 24M - iPhone 18 Pro 256GB": 489.0,

  // iPhone 18 Pro - 512GB
  "Cash iPhone 18 Pro 512GB": 682.0,
  "Inst 12M iPhone 18 Pro 512GB": 682.0,
  "Inst 18M iPhone 18 Pro 512GB": 682.0,
  "Inst 24M iPhone 18 Pro 512GB": 682.0,
  "One Plan Max 2 - iPhone 18 Pro 512GB": 382.0,
  "One Plan Max Rental - iPhone 18 Pro 512GB": 282.0,
  "One Plan Plus 2 - iPhone 18 Pro 512GB": 482.0,
  "One Plan Plus Rental - iPhone 18 Pro 512GB": 382.0,
  "Staff Freetime 12M - iPhone 18 Pro 512GB": 566.0,
  "Staff Freetime 18M - iPhone 18 Pro 512GB": 566.0,
  "Staff Freetime 24M - iPhone 18 Pro 512GB": 566.0,
  "Contracted Extra Max 12M - iPhone 18 Pro 512GB": 566.0,
  "Contracted Extra Max 18M - iPhone 18 Pro 512GB": 566.0,
  "Contracted Extra Max 24M - iPhone 18 Pro 512GB": 566.0,
  "Ultimate 12M - iPhone 18 Pro 512GB": 566.0,
  "Ultimate 18M - iPhone 18 Pro 512GB": 566.0,
  "Ultimate 24M - iPhone 18 Pro 512GB": 566.0,
  "Ultimate Max 12M - iPhone 18 Pro 512GB": 566.0,
  "Ultimate Max 18M - iPhone 18 Pro 512GB": 566.0,
  "Ultimate Max 24M - iPhone 18 Pro 512GB": 566.0,

  // iPhone 18 Pro - 1TB
  "Cash iPhone 18 Pro 1TB": 870.0,
  "Inst 12M iPhone 18 Pro 1TB": 870.0,
  "Inst 18M iPhone 18 Pro 1TB": 870.0,
  "Inst 24M iPhone 18 Pro 1TB": 870.0,
  "One Plan Max 2 - iPhone 18 Pro 1TB": 570.0,
  "One Plan Max Rental - iPhone 18 Pro 1TB": 470.0,
  "One Plan Plus 2 - iPhone 18 Pro 1TB": 670.0,
  "One Plan Plus Rental - iPhone 18 Pro 1TB": 570.0,
  "Staff Freetime 12M - iPhone 18 Pro 1TB": 722.0,
  "Staff Freetime 18M - iPhone 18 Pro 1TB": 722.0,
  "Staff Freetime 24M - iPhone 18 Pro 1TB": 722.0,
  "Contracted Extra Max 12M - iPhone 18 Pro 1TB": 722.0,
  "Contracted Extra Max 18M - iPhone 18 Pro 1TB": 722.0,
  "Contracted Extra Max 24M - iPhone 18 Pro 1TB": 722.0,
  "Ultimate 12M - iPhone 18 Pro 1TB": 722.0,
  "Ultimate 18M - iPhone 18 Pro 1TB": 722.0,
  "Ultimate 24M - iPhone 18 Pro 1TB": 722.0,
  "Ultimate Max 12M - iPhone 18 Pro 1TB": 722.0,
  "Ultimate Max 18M - iPhone 18 Pro 1TB": 722.0,
  "Ultimate Max 24M - iPhone 18 Pro 1TB": 722.0,

  // iPhone 18 Pro - 2TB
  "Cash iPhone 18 Pro 2TB": 1153.0,
  "Inst 12M iPhone 18 Pro 2TB": 1153.0,
  "Inst 18M iPhone 18 Pro 2TB": 1153.0,
  "Inst 24M iPhone 18 Pro 2TB": 1153.0,
  "One Plan Max 2 - iPhone 18 Pro 2TB": 853.0,
  "One Plan Max Rental - iPhone 18 Pro 2TB": 753.0,
  "One Plan Plus 2 - iPhone 18 Pro 2TB": 953.0,
  "One Plan Plus Rental - iPhone 18 Pro 2TB": 853.0,
  "Staff Freetime 12M - iPhone 18 Pro 2TB": 965.0,
  "Staff Freetime 18M - iPhone 18 Pro 2TB": 965.0,
  "Staff Freetime 24M - iPhone 18 Pro 2TB": 965.0,
  "Contracted Extra Max 12M - iPhone 18 Pro 2TB": 965.0,
  "Contracted Extra Max 18M - iPhone 18 Pro 2TB": 965.0,
  "Contracted Extra Max 24M - iPhone 18 Pro 2TB": 965.0,
  "Ultimate 12M - iPhone 18 Pro 2TB": 965.0,
  "Ultimate 18M - iPhone 18 Pro 2TB": 965.0,
  "Ultimate 24M - iPhone 18 Pro 2TB": 965.0,
  "Ultimate Max 12M - iPhone 18 Pro 2TB": 965.0,
  "Ultimate Max 18M - iPhone 18 Pro 2TB": 965.0,
  "Ultimate Max 24M - iPhone 18 Pro 2TB": 965.0,

  // iPhone 18 Pro Max - 256GB
  "Cash iPhone 18 Pro Max 256GB": 635.0,
  "Inst 12M iPhone 18 Pro Max 256GB": 635.0,
  "Inst 18M iPhone 18 Pro Max 256GB": 635.0,
  "Inst 24M iPhone 18 Pro Max 256GB": 635.0,
  "One Plan Max 2 - iPhone 18 Pro Max 256GB": 335.0,
  "One Plan Max Rental - iPhone 18 Pro Max 256GB": 235.0,
  "One Plan Plus 2 - iPhone 18 Pro Max 256GB": 435.0,
  "One Plan Plus Rental - iPhone 18 Pro Max 256GB": 335.0,
  "Staff Freetime 12M - iPhone 18 Pro Max 256GB": 527.0,
  "Staff Freetime 18M - iPhone 18 Pro Max 256GB": 527.0,
  "Staff Freetime 24M - iPhone 18 Pro Max 256GB": 527.0,
  "Contracted Extra Max 12M - iPhone 18 Pro Max 256GB": 527.0,
  "Contracted Extra Max 18M - iPhone 18 Pro Max 256GB": 527.0,
  "Contracted Extra Max 24M - iPhone 18 Pro Max 256GB": 527.0,
  "Ultimate 12M - iPhone 18 Pro Max 256GB": 527.0,
  "Ultimate 18M - iPhone 18 Pro Max 256GB": 527.0,
  "Ultimate 24M - iPhone 18 Pro Max 256GB": 527.0,
  "Ultimate Max 12M - iPhone 18 Pro Max 256GB": 527.0,
  "Ultimate Max 18M - iPhone 18 Pro Max 256GB": 527.0,
  "Ultimate Max 24M - iPhone 18 Pro Max 256GB": 527.0,

  // iPhone 18 Pro Max - 512GB
  "Cash iPhone 18 Pro Max 512GB": 729.0,
  "Inst 12M iPhone 18 Pro Max 512GB": 729.0,
  "Inst 18M iPhone 18 Pro Max 512GB": 729.0,
  "Inst 24M iPhone 18 Pro Max 512GB": 729.0,
  "One Plan Max 2 - iPhone 18 Pro Max 512GB": 429.0,
  "One Plan Max Rental - iPhone 18 Pro Max 512GB": 329.0,
  "One Plan Plus 2 - iPhone 18 Pro Max 512GB": 529.0,
  "One Plan Plus Rental - iPhone 18 Pro Max 512GB": 429.0,
  "Staff Freetime 12M - iPhone 18 Pro Max 512GB": 605.0,
  "Staff Freetime 18M - iPhone 18 Pro Max 512GB": 605.0,
  "Staff Freetime 24M - iPhone 18 Pro Max 512GB": 605.0,
  "Contracted Extra Max 12M - iPhone 18 Pro Max 512GB": 605.0,
  "Contracted Extra Max 18M - iPhone 18 Pro Max 512GB": 605.0,
  "Contracted Extra Max 24M - iPhone 18 Pro Max 512GB": 605.0,
  "Ultimate 12M - iPhone 18 Pro Max 512GB": 605.0,
  "Ultimate 18M - iPhone 18 Pro Max 512GB": 605.0,
  "Ultimate 24M - iPhone 18 Pro Max 512GB": 605.0,
  "Ultimate Max 12M - iPhone 18 Pro Max 512GB": 605.0,
  "Ultimate Max 18M - iPhone 18 Pro Max 512GB": 605.0,
  "Ultimate Max 24M - iPhone 18 Pro Max 512GB": 605.0,

  // iPhone 18 Pro Max - 1TB
  "Cash iPhone 18 Pro Max 1TB": 917.0,
  "Inst 12M iPhone 18 Pro Max 1TB": 917.0,
  "Inst 18M iPhone 18 Pro Max 1TB": 917.0,
  "Inst 24M iPhone 18 Pro Max 1TB": 917.0,
  "One Plan Max 2 - iPhone 18 Pro Max 1TB": 617.0,
  "One Plan Max Rental - iPhone 18 Pro Max 1TB": 517.0,
  "One Plan Plus 2 - iPhone 18 Pro Max 1TB": 717.0,
  "One Plan Plus Rental - iPhone 18 Pro Max 1TB": 617.0,
  "Staff Freetime 12M - iPhone 18 Pro Max 1TB": 761.0,
  "Staff Freetime 18M - iPhone 18 Pro Max 1TB": 761.0,
  "Staff Freetime 24M - iPhone 18 Pro Max 1TB": 761.0,
  "Contracted Extra Max 12M - iPhone 18 Pro Max 1TB": 761.0,
  "Contracted Extra Max 18M - iPhone 18 Pro Max 1TB": 761.0,
  "Contracted Extra Max 24M - iPhone 18 Pro Max 1TB": 761.0,
  "Ultimate 12M - iPhone 18 Pro Max 1TB": 761.0,
  "Ultimate 18M - iPhone 18 Pro Max 1TB": 761.0,
  "Ultimate 24M - iPhone 18 Pro Max 1TB": 761.0,
  "Ultimate Max 12M - iPhone 18 Pro Max 1TB": 761.0,
  "Ultimate Max 18M - iPhone 18 Pro Max 1TB": 761.0,
  "Ultimate Max 24M - iPhone 18 Pro Max 1TB": 761.0,

  // iPhone 18 Pro Max - 2TB
  "Cash iPhone 18 Pro Max 2TB": 1200.0,
  "Inst 12M iPhone 18 Pro Max 2TB": 1200.0,
  "Inst 18M iPhone 18 Pro Max 2TB": 1200.0,
  "Inst 24M iPhone 18 Pro Max 2TB": 1200.0,
  "One Plan Max 2 - iPhone 18 Pro Max 2TB": 900.0,
  "One Plan Max Rental - iPhone 18 Pro Max 2TB": 800.0,
  "One Plan Plus 2 - iPhone 18 Pro Max 2TB": 1000.0,
  "One Plan Plus Rental - iPhone 18 Pro Max 2TB": 900.0,
  "Staff Freetime 12M - iPhone 18 Pro Max 2TB": 964.0,
  "Staff Freetime 18M - iPhone 18 Pro Max 2TB": 964.0,
  "Staff Freetime 24M - iPhone 18 Pro Max 2TB": 964.0,
  "Contracted Extra Max 12M - iPhone 18 Pro Max 2TB": 964.0,
  "Contracted Extra Max 18M - iPhone 18 Pro Max 2TB": 964.0,
  "Contracted Extra Max 24M - iPhone 18 Pro Max 2TB": 964.0,
  "Ultimate 12M - iPhone 18 Pro Max 2TB": 964.0,
  "Ultimate 18M - iPhone 18 Pro Max 2TB": 964.0,
  "Ultimate 24M - iPhone 18 Pro Max 2TB": 964.0,
  "Ultimate Max 12M - iPhone 18 Pro Max 2TB": 964.0,
  "Ultimate Max 18M - iPhone 18 Pro Max 2TB": 964.0,
  "Ultimate Max 24M - iPhone 18 Pro Max 2TB": 964.0
};

// --- Application Initializer & Auto-Calculation Handler ---
document.addEventListener('DOMContentLoaded', () => {
  const bundleSelect = document.getElementById('bundleSelect');
  const priceDisplay = document.getElementById('priceDisplay');

  // Load custom storage override if available
  const savedBundles = JSON.parse(localStorage.getItem('custom_bundles')) || DEFAULT_BUNDLES;

  // Populate selection UI dynamically
  if (bundleSelect) {
    bundleSelect.innerHTML = '<option value="">Select a Plan / Device Bundle</option>';
    Object.keys(savedBundles).forEach(bundleKey => {
      const option = document.createElement('option');
      option.value = bundleKey;
      option.textContent = `${bundleKey} — BD ${savedBundles[bundleKey].toFixed(2)}`;
      bundleSelect.appendChild(option);
    });

    bundleSelect.addEventListener('change', (e) => {
      const selectedKey = e.target.value;
      const price = savedBundles[selectedKey] || 0;
      if (priceDisplay) {
        priceDisplay.textContent = price > 0 ? `BD ${price.toFixed(2)}` : 'BD 0.00';
      }
    });
  }
});
