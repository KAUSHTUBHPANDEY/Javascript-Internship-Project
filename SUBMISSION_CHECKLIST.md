# Requirement-by-Requirement Submission Checklist

This checklist maps every explicit task and expected output in the supplied 4-page PDF to the included files.

## Assignment 1 — Variables, Data Types, and Console Operations
- [x] Declares values with `var`, `let`, and `const`.
- [x] Stores a name, age, employment status, and list of skills.
- [x] Uses `typeof` to check every value.
- [x] Logs the exact sample values: Alice, 25, true, and `["HTML", "CSS", "JavaScript"]`.
- [x] Logs the expected types: string, number, boolean, object.

## Assignment 2 — Operators, Expressions, and Input Handling
- [x] Uses `prompt()` to request bill amount and tip percentage.
- [x] Explicitly converts prompt strings with `Number()`.
- [x] Uses arithmetic and an assignment operator.
- [x] Prints subtotal, tip percentage, calculated tip, and total.
- [x] Default/cancel-safe handling and validation are included. Enter `100` and `15` to reproduce the PDF example.

## Assignment 3 — Conditional Logic Implementation
- [x] Uses `if...else` to evaluate a numeric test score.
- [x] Uses `switch` to determine a letter grade.
- [x] Uses a ternary operator to print Passed/Failed.
- [x] Default score is 85, reproducing `Score: 85`, `Grade: B`, `Status: Passed`.
- [x] Can optionally accept a score from a prompt.

## Assignment 4 — Loop Control Structures
- [x] `for` loop prints the multiplication table of 5 from 1 through 5.
- [x] `while` loop with `break` finds the first number greater than 10 divisible by 6 (12).
- [x] `do...while` loop demonstrates `continue` by skipping selected values.
- [x] Headings and sample output match the PDF.

## Assignment 5 — Function Architecture and Scope
- [x] Standard function accepts length/width parameters with defaults.
- [x] Arrow function accepts length/width parameters with defaults.
- [x] Standard function demonstrates default 5 × 4 = 20.
- [x] Arrow function demonstrates custom 10 × 3 = 30.
- [x] Demonstrates function scope and block scope.
- [x] Attempts access to `blockVar` outside its block and catches/logs the `ReferenceError`.

## Assignment 6 — Arrays, Objects, and Core Methods
- [x] Product objects have `name` and `price`.
- [x] `forEach()` prints every product.
- [x] `filter()` selects products priced below $50.
- [x] `map()` produces uppercase formatted name-price strings.
- [x] Uses the PDF sample products and prices.

## Capstone — Interactive Product Inventory & Analytics Dashboard
- [x] Prompts for a new product name and price (`prompt()` button) and also offers a validated on-page form.
- [x] Explicitly converts the price input using `Number()`.
- [x] Stores products as objects in an array alongside pre-existing items.
- [x] Uses `if...else` and `switch` for validation/category assignment.
- [x] Uses dynamic Budget / Standard / Premium thresholds.
- [x] Uses `for` and `while` loops plus `break` and `continue` to detect duplicates and find the first affordable item, skipping malformed records.
- [x] Uses regular functions and arrow functions.
- [x] Calculates inventory statistics and supports tax/discount parameters.
- [x] Demonstrates local scope for calculations.
- [x] Uses `forEach()`, `filter()`, and `map()` for the inventory sheet, affordable items, and report list.
- [x] Reproduces the PDF example with Laptop ($800), Mouse ($25), and Monitor ($150): total $975; affordable items Mouse and Monitor; formatted uppercase report list.

## Expected capstone example
Add `Monitor` at price `150`. The output should include:
- `* Item: Laptop ($800) -> Category: Premium`
- `* Item: Mouse ($25) -> Category: Budget`
- `* Item: Monitor ($150) -> Category: Standard`
- `Total Inventory Value: $975`
- `Filtered Affordable Items (Under $200): ["Mouse", "Monitor"]`
- `Formatted Report List: ["LAPTOP: $800", "MOUSE: $25", "MONITOR: $150"]`

## Bonus features implemented
- [x] Responsive dashboard UI (KPI cards, table, bar chart, category breakdown)
- [x] Search, filter, sort, remove, reset, CSV export, localStorage persistence
- [x] Input validation with accessible error messages
- [x] Console report identical to the PDF example (auto-printed on load and after each add)
