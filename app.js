// Capstone: Interactive Product Inventory & Analytics Dashboard
// ---------------------------------------------------------------------------
// Concepts demonstrated (see SUBMISSION_CHECKLIST.md for the full mapping):
//  variables (var/let/const) · prompt() + Number() · arrays of objects ·
//  if...else · switch · for/while loops with break & continue ·
//  regular + arrow functions · function/block scope · forEach/filter/map/reduce
// ---------------------------------------------------------------------------

const STORAGE_KEY = "inventoryDashboard.v1";
const CATEGORIES = ["Budget", "Standard", "Premium"];
const CATEGORY_COLORS = { Budget: "var(--budget)", Standard: "var(--standard)", Premium: "var(--premium)" };

// Pre-existing items required by the brief.
const initialInventory = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 }
];

// ---------- Small helpers (arrow functions) ----------
const $ = (id) => document.getElementById(id);
const formatMoney = (amount) => (Number.isInteger(amount) ? String(amount) : amount.toFixed(2));
const money = (amount) => "$" + formatMoney(amount);
const listText = (values) => "[" + values.map((v) => `"${v}"`).join(", ") + "]"; // ["A", "B"] style
const cleanCopy = (list) => list.map((item) => ({ name: item.name, price: item.price }));

function loadInventory() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.every((p) => p && typeof p.name === "string" && Number.isFinite(p.price))) {
      return saved;
    }
  } catch (error) { /* storage unavailable or corrupted: fall back to defaults */ }
  return cleanCopy(initialInventory);
}

function saveInventory() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory)); } catch (error) { /* ignore */ }
}

// ---------- Application state (single source of truth) ----------
let inventory = loadInventory();
const view = { query: "", sort: "added", category: "All" };
const settings = { taxRate: 0.08, discountRate: 0.05, affordableLimit: 200 };

// ---------- Business logic ----------

// Dynamic categories: Budget < $50, Standard < $200, Premium >= $200. Uses switch.
function getCategory(price) {
  if (price < 0 || !Number.isFinite(price)) {
    return "Invalid";
  }
  let category; // block/function scoped, never leaks out
  switch (true) {
    case price < 50:  category = "Budget";   break;
    case price < 200: category = "Standard"; break;
    default:          category = "Premium";
  }
  return category;
}

// Validates raw text from an input box or prompt(). Returns { ok, error, product }.
function validateProduct(rawName, rawPrice) {
  const name = (rawName ?? "").trim();
  const priceText = (rawPrice ?? "").trim();

  if (name === "") {
    return { ok: false, error: "Please enter a product name.", field: "name" };
  } else if (name.length > 40) {
    return { ok: false, error: "Product name must be 40 characters or fewer.", field: "name" };
  } else if (priceText === "") {
    return { ok: false, error: "Please enter a price.", field: "price" };
  }

  const price = Number(priceText); // explicit conversion: input is always a string
  if (!Number.isFinite(price)) {
    return { ok: false, error: "Price must be a number, e.g. 150.", field: "price" };
  } else if (price < 0) {
    return { ok: false, error: "Price cannot be negative.", field: "price" };
  } else if (price > 1000000) {
    return { ok: false, error: "Price is unrealistically large.", field: "price" };
  }

  // Loop with continue/break: look for a duplicate name.
  let duplicate = false;
  for (const existing of inventory) {
    if (typeof existing.name !== "string") {
      continue; // skip malformed record
    }
    if (existing.name.toLowerCase() === name.toLowerCase()) {
      duplicate = true;
      break; // found one, no need to keep looking
    }
  }
  if (duplicate) {
    return { ok: false, error: `"${name}" is already in the inventory.`, field: "name" };
  }

  return { ok: true, product: { name, price: Math.round(price * 100) / 100 } };
}

// Function-scoped financial helper: rates are parameters, not globals.
function calculateFinancials(items, taxRate = 0, discountRate = 0) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const discount = subtotal * discountRate;
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * taxRate;
  return { subtotal, discount, tax, total: taxableAmount + tax };
}

// while loop with continue + break: first product under the limit.
function findFirstAffordable(items, limit) {
  let index = 0;
  while (index < items.length) {
    const item = items[index];
    index++;
    if (!item || typeof item.name !== "string" || !Number.isFinite(item.price)) {
      continue;
    }
    if (item.price < limit) {
      return item;
    }
  }
  return null;
}

// Derived data used by both the page and the console report.
function analyse(items) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const affordable = items.filter((item) => item.price < settings.affordableLimit).map((item) => item.name);
  const report = items.map((item) => `${item.name.toUpperCase()}: ${money(item.price)}`);
  const priciest = items.reduce((best, item) => (best === null || item.price > best.price ? item : best), null);
  return { total, affordable, report, priciest, average: items.length ? total / items.length : 0 };
}

// ---------- Console report (matches the assignment PDF exactly) ----------
function printConsoleReport(addedProduct) {
  console.log("--- Initializing Inventory System ---");
  if (addedProduct) {
    console.log(`[Prompt executed: User adds "${addedProduct.name}" at "${money(addedProduct.price)}"]`);
  }
  const first = findFirstAffordable(inventory, settings.affordableLimit);
  if (first) {
    console.log(`First affordable product found: ${first.name}`);
  }

  console.log("");
  console.log("--- Processing Inventory Roster (forEach) ---");
  inventory.forEach((item) => {
    console.log(`* Item: ${item.name} (${money(item.price)}) -> Category: ${getCategory(item.price)}`);
  });

  const stats = analyse(inventory);
  console.log("");
  console.log("--- Financial Analytics ---");
  console.log(`Total Inventory Value: ${money(stats.total)}`);
  console.log(`Filtered Affordable Items (Under $${settings.affordableLimit}): ${listText(stats.affordable)}`);
  console.log(`Formatted Report List: ${listText(stats.report)}`);

  const fin = calculateFinancials(inventory, settings.taxRate, settings.discountRate);
  console.log("");
  console.log(`--- Optional Tax / Discount Calculation (${settings.taxRate * 100}% tax, ${settings.discountRate * 100}% discount) ---`);
  console.log(`Subtotal: ${money(fin.subtotal)}`);
  console.log(`Discount: ${money(fin.discount)}`);
  console.log(`Tax: ${money(fin.tax)}`);
  console.log(`Total after discount and tax: ${money(fin.total)}`);
}

// ---------- Rendering ----------
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text; // textContent => no HTML injection
  return node;
}

function visibleItems() {
  const q = view.query.trim().toLowerCase();
  const list = inventory
    .filter((item) => item.name.toLowerCase().includes(q))
    .filter((item) => view.category === "All" || getCategory(item.price) === view.category);

  switch (view.sort) {
    case "name":      list.sort((a, b) => a.name.localeCompare(b.name)); break;
    case "priceAsc":  list.sort((a, b) => a.price - b.price); break;
    case "priceDesc": list.sort((a, b) => b.price - a.price); break;
    default: break; // "added": keep insertion order
  }
  return list;
}

function renderTable() {
  const body = $("tableBody");
  body.replaceChildren();
  const items = visibleItems();

  items.forEach((item) => {
    const category = getCategory(item.price);
    const row = el("tr");
    row.appendChild(el("td", "", item.name));
    const catCell = el("td");
    catCell.appendChild(el("span", `badge ${category}`, category));
    row.appendChild(catCell);
    row.appendChild(el("td", "num", money(item.price)));

    const actions = el("td", "num");
    const remove = el("button", "x", "✕");
    remove.type = "button";
    remove.setAttribute("aria-label", `Remove ${item.name}`);
    remove.addEventListener("click", () => removeProduct(item.name));
    actions.appendChild(remove);
    row.appendChild(actions);
    body.appendChild(row);
  });

  $("emptyMsg").hidden = items.length > 0;
}

function renderChips() {
  const chips = $("chips");
  chips.replaceChildren();
  ["All", ...CATEGORIES].forEach((name) => {
    const count = name === "All" ? inventory.length : inventory.filter((i) => getCategory(i.price) === name).length;
    const chip = el("button", "chip", `${name} (${count})`);
    chip.type = "button";
    chip.setAttribute("aria-pressed", String(view.category === name));
    chip.addEventListener("click", () => { view.category = name; renderTable(); renderChips(); });
    chips.appendChild(chip);
  });
}

function renderKpis() {
  const stats = analyse(inventory);
  $("kpiTotal").textContent = money(stats.total);
  $("kpiCount").textContent = String(inventory.length);
  $("kpiAvg").textContent = money(Math.round(stats.average * 100) / 100);
  $("kpiMax").textContent = stats.priciest ? `${stats.priciest.name} · ${money(stats.priciest.price)}` : "—";
}

function renderFinancials() {
  const fin = calculateFinancials(inventory, settings.taxRate, settings.discountRate);
  const box = $("financials");
  box.replaceChildren();
  [
    ["Subtotal", money(fin.subtotal)],
    [`Discount (${settings.discountRate * 100}%)`, "−" + money(Math.round(fin.discount * 100) / 100)],
    [`Tax (${settings.taxRate * 100}%)`, money(Math.round(fin.tax * 100) / 100)],
    ["Total payable", money(Math.round(fin.total * 100) / 100)]
  ].forEach(([label, value], i, all) => {
    const row = el("div", i === all.length - 1 ? "grand" : "");
    row.appendChild(el("dt", "", label));
    row.appendChild(el("dd", "", value));
    box.appendChild(row);
  });
}

function renderCharts() {
  const chart = $("chart");
  chart.replaceChildren();
  const max = inventory.reduce((m, item) => Math.max(m, item.price), 0) || 1;
  inventory.forEach((item) => {
    const category = getCategory(item.price);
    const bar = el("div", "bar");
    bar.appendChild(el("span", "nm", item.name));
    const track = el("div", "track");
    const fill = el("div", `fill ${category}`);
    fill.style.width = Math.max((item.price / max) * 100, 2) + "%";
    track.appendChild(fill);
    bar.appendChild(track);
    bar.appendChild(el("span", "num", money(item.price)));
    chart.appendChild(bar);
  });

  const breakdown = $("breakdown");
  breakdown.replaceChildren();
  const legend = $("legend");
  legend.replaceChildren();
  CATEGORIES.forEach((name) => {
    const count = inventory.filter((i) => getCategory(i.price) === name).length;
    const seg = el("span");
    seg.style.width = (inventory.length ? (count / inventory.length) * 100 : 0) + "%";
    seg.style.background = CATEGORY_COLORS[name];
    seg.title = `${name}: ${count}`;
    breakdown.appendChild(seg);

    const key = el("span", "", `${name}: ${count}`);
    const dot = el("i", "dot");
    dot.style.background = CATEGORY_COLORS[name];
    key.prepend(dot);
    legend.appendChild(key);
  });
}

function renderReports() {
  const stats = analyse(inventory);
  $("affordLabel").textContent = `Affordable items (under ${money(settings.affordableLimit)})`;
  const fill = (id, values) => {
    const list = $(id);
    list.replaceChildren();
    if (values.length === 0) { list.appendChild(el("li", "", "None")); return; }
    values.forEach((value) => list.appendChild(el("li", "", value)));
  };
  fill("affordList", stats.affordable);
  fill("reportList", stats.report);
}

function render() {
  renderKpis();
  renderChips();
  renderTable();
  renderFinancials();
  renderCharts();
  renderReports();
}

// ---------- User actions ----------
let toastTimer;
function toast(message) {
  const t = $("toast");
  t.textContent = message;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

function setFormMessage(text, ok = false) {
  const msg = $("formMsg");
  msg.textContent = text;
  msg.classList.toggle("ok", ok);
}

function addProduct(product) {
  inventory.push(product);
  saveInventory();
  render();
  printConsoleReport(product);
  toast(`Added ${product.name}`);
}

function removeProduct(name) {
  inventory = inventory.filter((item) => item.name !== name);
  saveInventory();
  render();
  toast(`Removed ${name}`);
}

function handleFormSubmit(event) {
  event.preventDefault();
  $("nameInput").classList.remove("bad");
  $("priceInput").classList.remove("bad");

  const result = validateProduct($("nameInput").value, $("priceInput").value);
  if (!result.ok) {
    setFormMessage(result.error);
    $(result.field === "name" ? "nameInput" : "priceInput").classList.add("bad");
    $(result.field === "name" ? "nameInput" : "priceInput").focus();
    return;
  }
  addProduct(result.product);
  setFormMessage(`"${result.product.name}" added as ${getCategory(result.product.price)}.`, true);
  $("productForm").reset();
  $("nameInput").focus();
}

// The classic prompt() flow required by the brief (cancel-safe).
function addViaPrompt() {
  const nameInput = prompt('Enter new product name (sample: "Monitor"):');
  if (nameInput === null) { toast("Cancelled"); return; }
  const priceInput = prompt("Enter new product price (sample: 150):");
  if (priceInput === null) { toast("Cancelled"); return; }

  const result = validateProduct(nameInput, priceInput);
  if (!result.ok) {
    console.log(result.error);
    toast(result.error);
    return;
  }
  addProduct(result.product);
}

function readPercent(id, fallback) {
  const value = Number($(id).value);
  return Number.isFinite(value) && value >= 0 && value <= 100 ? value / 100 : fallback;
}

function handleSettingsChange() {
  settings.taxRate = readPercent("taxInput", settings.taxRate);
  settings.discountRate = readPercent("discInput", settings.discountRate);
  const limit = Number($("limitInput").value);
  settings.affordableLimit = Number.isFinite(limit) && limit > 0 ? limit : settings.affordableLimit;
  renderFinancials();
  renderReports();
}

function downloadCsv() {
  const rows = ["Name,Price,Category", ...inventory.map((i) => `"${i.name.replace(/"/g, '""')}",${i.price},${getCategory(i.price)}`)];
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "inventory.csv";
  link.click();
  URL.revokeObjectURL(link.href);
  toast("CSV downloaded");
}

function resetInventory() {
  if (!confirm("Reset the inventory to the original Laptop and Mouse?")) return;
  inventory = cleanCopy(initialInventory);
  saveInventory();
  render();
  toast("Inventory reset");
}

// ---------- Wiring ----------
$("productForm").addEventListener("submit", handleFormSubmit);
$("sampleBtn").addEventListener("click", () => { $("nameInput").value = "Monitor"; $("priceInput").value = "150"; $("nameInput").focus(); });
$("promptBtn").addEventListener("click", addViaPrompt);
$("consoleBtn").addEventListener("click", () => { console.clear(); printConsoleReport(); toast("Report printed to console"); });
$("searchInput").addEventListener("input", (e) => { view.query = e.target.value; renderTable(); });
$("sortSelect").addEventListener("change", (e) => { view.sort = e.target.value; renderTable(); });
["taxInput", "discInput", "limitInput"].forEach((id) => $(id).addEventListener("input", handleSettingsChange));
$("csvBtn").addEventListener("click", downloadCsv);
$("resetBtn").addEventListener("click", resetInventory);

render();
printConsoleReport();
