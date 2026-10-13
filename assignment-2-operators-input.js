// Assignment 2: Operators, Expressions, and Input Handling
const billInput = prompt("Enter bill amount (e.g., 100):", "100");
const tipInput = prompt("Enter tip percentage (e.g., 15):", "15");

const subtotal = Number(billInput);
const tipPercentage = Number(tipInput);

if (billInput === null || tipInput === null || billInput.trim() === "" || tipInput.trim() === "" ||
    !Number.isFinite(subtotal) || !Number.isFinite(tipPercentage) || subtotal < 0 || tipPercentage < 0) {
  console.log("Input cancelled or invalid. Please enter non-negative numeric values.");
} else {
  let calculatedTip = subtotal * (tipPercentage / 100);
  let totalAmount = subtotal;
  totalAmount += calculatedTip; // assignment operator
  console.log(`Subtotal: $${formatMoney(subtotal)}`);
  console.log(`Tip Percentage: ${tipPercentage}%`);
  console.log(`Calculated Tip: $${formatMoney(calculatedTip)}`);
  console.log(`Total Amount to Pay: $${formatMoney(totalAmount)}`);
}

function formatMoney(amount) {
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
}
