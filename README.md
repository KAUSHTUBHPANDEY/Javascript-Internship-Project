# JavaScript Assignments & Capstone Project

**Live demo:** https://YOUR-USERNAME.github.io/javascript-internship-project/
**Repository:** https://github.com/YOUR-USERNAME/javascript-internship-project

> Replace `YOUR-USERNAME` with your GitHub username after publishing.


This package implements all six assignments and the capstone mini project described in the supplied PDF, including the stated expected-output examples.

## Contents
- `assignments/assignment-1-variables.html` + `.js`
- `assignments/assignment-2-operators-input.html` + `.js`
- `assignments/assignment-3-conditionals.html` + `.js`
- `assignments/assignment-4-loops.html` + `.js`
- `assignments/assignment-5-functions-scope.html` + `.js`
- `assignments/assignment-6-arrays-objects.html` + `.js`
- `capstone/index.html` + `styles.css` + `app.js` — Interactive Product Inventory & Analytics Dashboard (full on-page UI)
- `SUBMISSION_CHECKLIST.md` — requirement-by-requirement coverage

## Run it
1. Extract the ZIP.
2. Open any assignment `.html` file in Chrome, Firefox, Safari, or Edge.
3. Open Developer Tools → Console (Chrome/Safari: View → Developer → JavaScript Console; Safari may require enabling the Develop menu first).
4. Read the console output. Assignment 2 uses browser `prompt()` dialogs.
5. For the capstone, open `capstone/index.html`. It is a complete on-page dashboard: add products with a validated form (or the classic `prompt()` flow via **Add via prompt()**), and watch the KPI cards, category-badged table, charts, tax/discount calculator and reports update live. The same report is also printed to the Console exactly as the PDF specifies. Try the **Fill sample (Monitor, 150)** button to reproduce the PDF scenario.

No npm install, build step, API key, or external dependency is required. The files use plain HTML and JavaScript.

## Notes
- Each assignment is independent and can be run on its own.
- The examples intentionally use the sample data and values shown in the PDF so the expected output can be compared directly.
- Assignment 5 demonstrates the requested `ReferenceError` safely using `try...catch`, so the page continues running after printing the error.
- Assignment 4 includes the multiplication table through 5 × 5, finds 12 as the first number greater than 10 divisible by 6, and demonstrates `continue` in a `do...while` loop.
- Capstone price categories are dynamic: Budget is below $50, Standard is $50–$199.99, and Premium is $200 or above. The included sample run (`Monitor`, $150) matches the PDF's expected output.

## Capstone extras (beyond the brief)
- Live KPI cards, price bar chart, and category breakdown bar
- Search, category filter chips and sorting
- Inline validation with clear messages (empty, non-numeric, negative, duplicate name)
- Adjustable tax %, discount %, and "affordable" limit
- Remove items, reset, CSV export, and data saved in the browser (localStorage)
- Safe DOM building (`textContent`, no `innerHTML`), keyboard and screen-reader friendly, responsive, reduced-motion aware
