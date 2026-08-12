const $ = id => document.getElementById(id);

const searchInput = $("searchInput");
const categoryFilter = $("categoryFilter");
const maxPriceFilter = $("maxPriceFilter");
const discountFilter = $("discountFilter");
const discountValue = $("discountValue");
const storeFilter = $("storeFilter");
const favoriteOnlyFilter = $("favoriteOnlyFilter");
const sortSelect = $("sortSelect");
const offerGrid = $("offerGrid");
const emptyState = $("emptyState");
const resultsTitle = $("resultsTitle");
const resultsSummary = $("resultsSummary");
const compareArea = $("compareArea");
const storeButtons = $("storeButtons");
const dataFeedback = $("dataFeedback");

let offers = loadOffers();
let favorites = new Set(JSON.parse(localStorage.getItem("ofertaradar-favorites") || "[]"));
let compareIds = [];

function cloneDemo() {
  return DEMO_OFFERS.map(item => ({...item, colors:[...item.colors]}));
}

function loadOffers() {
  try {
    const saved = localStorage.getItem("ofertaradar-catalog");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {}
  return cloneDemo();
}

function normalize(text) {
  return String(text || "").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
}

function money(value) {
  return new Intl.NumberFormat("es-CL", {
    style:"currency", currency:"CLP", maximumFractionDigits:0
  }).format(value);
}

function discountOf(o) {
  if (!o.originalPrice || o.originalPrice <= o.price) return 0;
  return Math.round((1 - o.price / o.originalPrice) * 100);
}

function savingOf(o) {
  return Math.max(0, (o.originalPrice || o.price) - o.price);
}

function escapeHtml(text) {
  return String(text).replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;");
}

function slugify(q) {
  return normalize(q).replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

function setupFilters() {
  const categories = [...new Set(offers.map(o => o.category))].sort();
  const stores = [...new Set(offers.map(o => o.store))].sort();

  categoryFilter.innerHTML = `<option value="all">Todas</option>` +
    categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");

  storeFilter.innerHTML = `<option value="all">Todas</option>` +
    stores.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("");
}

function renderStoreButtons() {
  const q = searchInput.value.trim() || "ofertas";
  const enc = encodeURIComponent(q);
  const slug = slugify(q) || "ofertas";

  const stores = [
    {name:"Mercado Libre", icon:"🟡", url:`https://listado.mercadolibre.cl/${slug}`},
    {name:"Falabella", icon:"🟢", url:`https://www.falabella.com/falabella-cl/search?Ntt=${enc}`},
    {name:"Ripley", icon:"🔴", url:`https://simple.ripley.cl/search?term=${enc}&type=catalog`},
    {name:"Paris", icon:"🔵", url:`https://www.paris.cl/search?q=${enc}`}
  ];

  storeButtons.innerHTML = stores.map(s =>
    `<a class="store-link" href="${s.url}" target="_blank" rel="noopener noreferrer">${s.icon} ${s.name} ↗</a>`
  ).join("");
}

function filteredOffers() {
  const query = normalize(searchInput.value);
  const category = categoryFilter.value;
  const maxPrice = Number(maxPriceFilter.value);
  const minDiscount = Number(discountFilter.value);
  const store = storeFilter.value;

  let list = offers.filter(o => {
    const haystack = normalize(`${o.name} ${o.brand} ${o.category} ${o.store}`);
    const queryOk = !query || haystack.includes(query) ||
      query.split(/\s+/).every(term => haystack.includes(term));
    const categoryOk = category === "all" || o.category === category;
    const priceOk = !maxPrice || o.price <= maxPrice;
    const discountOk = discountOf(o) >= minDiscount;
    const storeOk = store === "all" || o.store === store;
    const favOk = !favoriteOnlyFilter.checked || favorites.has(o.id);
    return queryOk && categoryOk && priceOk && discountOk && storeOk && favOk;
  });

  const sort = sortSelect.value;
  list.sort((a,b) => {
    if (sort === "priceAsc") return a.price - b.price;
    if (sort === "priceDesc") return b.price - a.price;
    if (sort === "saving") return savingOf(b) - savingOf(a);
    if (sort === "name") return a.name.localeCompare(b.name, "es");
    return discountOf(b) - discountOf(a) || savingOf(b) - savingOf(a);
  });

  return list;
}

function render() {
  const list = filteredOffers();
  const query = searchInput.value.trim();

  resultsTitle.textContent = query ? `Resultados para “${query}”` : "Ofertas destacadas";
  resultsSummary.textContent = `${list.length} oferta${list.length === 1 ? "" : "s"} en el catálogo`;
  $("favoriteCount").textContent = favorites.size;
  emptyState.classList.toggle("hidden", list.length > 0);
  offerGrid.classList.toggle("hidden", list.length === 0);

  offerGrid.innerHTML = list.map(o => {
    const discount = discountOf(o);
    return `
      <article class="offer-card">
        <div class="offer-image" style="--a:${o.colors?.[0] || "#334155"};--b:${o.colors?.[1] || "#111827"}">
          <span>${escapeHtml(o.emoji || "🏷️")}</span>
          <span class="discount-badge">${discount ? `-${discount}%` : "Oferta"}</span>
          <button class="favorite-btn" data-favorite="${o.id}" aria-label="Guardar favorito">
            ${favorites.has(o.id) ? "♥" : "♡"}
          </button>
        </div>
        <div class="offer-body">
          <span class="offer-store">${escapeHtml(o.store)}</span>
          <h3>${escapeHtml(o.name)}</h3>
          <p class="offer-brand">${escapeHtml(o.brand)} · ${escapeHtml(o.category)}</p>
          <div class="price-row">
            <strong class="current-price">${money(o.price)}</strong>
            ${o.originalPrice > o.price ? `<span class="original-price">${money(o.originalPrice)}</span>` : ""}
          </div>
          ${savingOf(o) ? `<div class="saving">Ahorras ${money(savingOf(o))}</div>` : ""}
          <div class="card-actions">
            <button class="card-btn ${compareIds.includes(o.id) ? "active" : ""}" data-compare="${o.id}">
              ${compareIds.includes(o.id) ? "✓ Comparando" : "⇄ Comparar"}
            </button>
            <button class="card-btn" data-search-store="${escapeHtml(o.name)}">⌕ Buscar online</button>
          </div>
        </div>
      </article>`;
  }).join("");

  updateHeroStat();
  renderCompare();
  renderStoreButtons();
}

function updateHeroStat() {
  const discounts = offers.map(discountOf);
  $("heroDiscount").textContent = discounts.length ? `${Math.max(...discounts)}%` : "—";
}

offerGrid.addEventListener("click", event => {
  const favBtn = event.target.closest("[data-favorite]");
  if (favBtn) {
    const id = Number(favBtn.dataset.favorite);
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    localStorage.setItem("ofertaradar-favorites", JSON.stringify([...favorites]));
    render();
    return;
  }

  const compareBtn = event.target.closest("[data-compare]");
  if (compareBtn) {
    const id = Number(compareBtn.dataset.compare);
    if (compareIds.includes(id)) {
      compareIds = compareIds.filter(x => x !== id);
    } else if (compareIds.length < 3) {
      compareIds.push(id);
    } else {
      dataFeedback.textContent = "Puedes comparar hasta 3 ofertas a la vez.";
    }
    render();
    return;
  }

  const webBtn = event.target.closest("[data-search-store]");
  if (webBtn) {
    searchInput.value = webBtn.dataset.searchStore;
    renderStoreButtons();
    $("externalSearch").scrollIntoView({behavior:"smooth", block:"center"});
  }
});

function renderCompare() {
  const selected = compareIds.map(id => offers.find(o => o.id === id)).filter(Boolean);
  if (!selected.length) {
    compareArea.innerHTML = `<p class="compare-empty">Selecciona “Comparar” en alguna tarjeta para agregarla aquí.</p>`;
    return;
  }

  compareArea.innerHTML = selected.map(o => `
    <article class="compare-card">
      <div class="compare-card__top">
        <h3>${escapeHtml(o.name)}</h3>
        <button data-remove-compare="${o.id}">×</button>
      </div>
      <p>${escapeHtml(o.store)} · ${escapeHtml(o.brand)}</p>
      <strong>${money(o.price)}</strong>
      <p>Descuento: ${discountOf(o)}% · Ahorro: ${money(savingOf(o))}</p>
    </article>
  `).join("");
}

compareArea.addEventListener("click", event => {
  const btn = event.target.closest("[data-remove-compare]");
  if (!btn) return;
  compareIds = compareIds.filter(id => id !== Number(btn.dataset.removeCompare));
  render();
});

$("clearCompareBtn").addEventListener("click", () => { compareIds = []; render(); });

function executeSearch() {
  render();
  renderStoreButtons();
  document.querySelector(".results").scrollIntoView({behavior:"smooth", block:"start"});
}

$("searchBtn").addEventListener("click", executeSearch);
searchInput.addEventListener("keydown", e => { if (e.key === "Enter") executeSearch(); });

document.querySelectorAll("[data-query]").forEach(btn => {
  btn.addEventListener("click", () => {
    searchInput.value = btn.dataset.query;
    executeSearch();
  });
});

[categoryFilter,maxPriceFilter,storeFilter,favoriteOnlyFilter,sortSelect].forEach(el => {
  el.addEventListener("change", render);
});

discountFilter.addEventListener("input", () => {
  discountValue.textContent = `${discountFilter.value}%`;
  render();
});

$("clearFiltersBtn").addEventListener("click", () => {
  categoryFilter.value = "all";
  maxPriceFilter.value = "0";
  discountFilter.value = "0";
  discountValue.textContent = "0%";
  storeFilter.value = "all";
  favoriteOnlyFilter.checked = false;
  render();
});

$("favoritesNavBtn").addEventListener("click", () => {
  favoriteOnlyFilter.checked = !favoriteOnlyFilter.checked;
  render();
  document.querySelector(".results").scrollIntoView({behavior:"smooth"});
});

$("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("light");
  const light = document.body.classList.contains("light");
  $("themeBtn").textContent = light ? "🌙" : "☀️";
  localStorage.setItem("ofertaradar-theme", light ? "light" : "dark");
});
if (localStorage.getItem("ofertaradar-theme") === "light") {
  document.body.classList.add("light");
  $("themeBtn").textContent = "🌙";
}

$("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(offers,null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ofertas.json";
  a.click();
  URL.revokeObjectURL(url);
  dataFeedback.textContent = "Catálogo exportado.";
});

$("importInput").addEventListener("change", async event => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    validateCatalog(parsed);
    offers = parsed.map((o,i) => ({
      ...o,
      id: Number(o.id) || Date.now()+i,
      colors: Array.isArray(o.colors) ? o.colors : ["#334155","#111827"]
    }));
    localStorage.setItem("ofertaradar-catalog", JSON.stringify(offers));
    compareIds = [];
    setupFilters();
    render();
    dataFeedback.textContent = `Catálogo importado: ${offers.length} ofertas.`;
  } catch (err) {
    dataFeedback.textContent = `No se pudo importar: ${err.message}`;
  } finally {
    event.target.value = "";
  }
});

function validateCatalog(data) {
  if (!Array.isArray(data) || !data.length) throw new Error("el archivo debe contener una lista de ofertas.");
  const required = ["name","brand","category","store","price","originalPrice"];
  data.forEach((o,index) => {
    required.forEach(k => {
      if (o[k] === undefined || o[k] === null || o[k] === "") {
        throw new Error(`falta “${k}” en la oferta ${index+1}.`);
      }
    });
    if (!Number.isFinite(Number(o.price)) || !Number.isFinite(Number(o.originalPrice))) {
      throw new Error(`precio inválido en la oferta ${index+1}.`);
    }
  });
}

$("restoreBtn").addEventListener("click", () => {
  offers = cloneDemo();
  localStorage.removeItem("ofertaradar-catalog");
  compareIds = [];
  setupFilters();
  render();
  dataFeedback.textContent = "Catálogo de demostración restaurado.";
});

function cloneDemo() {
  return DEMO_OFFERS.map(o => ({...o, colors:[...(o.colors || [])]}));
}

setupFilters();
renderStoreButtons();
render();
