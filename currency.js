// Currency conversion utilities
export const convertToINR = (amount) => {
  // Conversion rate (can be updated dynamically)
  const conversionRate = 83.12; // 1 USD = 83.12 INR (approximate)
  
  return {
    inr: (amount * conversionRate).toFixed(2),
    formatted: `₹${(amount * conversionRate).toFixed(2)}`
  };
};

export const formatCurrency = (amount, currency = 'USD') => {
  if (currency === 'INR') {
    return `₹${amount.toFixed(2)}`;
  }
  return `$${amount.toFixed(2)}`;
};

export const getCurrencySymbol = (currency = 'USD') => {
  return currency === 'INR' ? '₹' : '$';
};
