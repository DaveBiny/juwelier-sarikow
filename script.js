const defaultProducts = [
  {
    id: "ring-aurora",
    name: "Ring Aurora",
    brand: "Sarikow Diamonds",
    category: "Schmuck",
    price: 4290,
    description: "Gelbgold mit brillantem Mittelstein, fein poliert und klassisch gefasst.",
    specs: "Material: 750 Gelbgold\nStein: Brillant\nFassung: Krappenfassung\nVerfuegbarkeit: auf Anfrage",
    image: "assets/optimized/full/01rueschpartnerringe02-fda5387e-transparent.webp",
    thumb: "assets/optimized/thumbs/01rueschpartnerringe02-fda5387e-transparent.webp"
  },
  {
    id: "ring-selene",
    name: "Ring Selene",
    brand: "Sarikow Diamonds",
    category: "Anlässe",
    price: 8960,
    description: "Elegante Fassung fuer Verlobung, Jubilaeum und bleibende Erinnerungen.",
    specs: "Material: Platin\nStein: Diamant\nAnlass: Verlobung\nVerfuegbarkeit: auf Anfrage",
    image: "assets/optimized/full/03451-paar-k-w-200-rg-a35f9e1e-transparent.webp",
    thumb: "assets/optimized/thumbs/03451-paar-k-w-200-rg-a35f9e1e-transparent.webp"
  },
  {
    id: "creolen-livia",
    name: "Creolen Livia",
    brand: "Linea Oro",
    category: "Schmuck",
    price: 2350,
    description: "Feine Creolen mit warmem Goldton und zeitloser Silhouette.",
    specs: "Material: 750 Gelbgold\nOberflaeche: poliert\nVerschluss: Steckverschluss\nVerfuegbarkeit: lagernd auf Anfrage",
    image: "assets/optimized/full/1-1-4258ab30-transparent.webp",
    thumb: "assets/optimized/thumbs/1-1-4258ab30-transparent.webp"
  },
  {
    id: "chronograph-nova",
    name: "Classics Index Automatic",
    brand: "Frederique Constant",
    category: "Uhren",
    price: 5750,
    description: "Mechanische Uhr mit klarem Zifferblatt, poliertem Gehaeuse und Lederband.",
    specs: "Gehaeuse: Edelstahl\nUhrwerk: Automatik\nArmband: Leder\nWasserdichtheit: 5 bar",
    image: "assets/optimized/full/fc303nn5b6b-1b248377.webp",
    thumb: "assets/optimized/thumbs/fc303nn5b6b-1b248377.webp"
  },
  {
    id: "tennisarmband-etoile",
    name: "Tennisarmband Etoile",
    brand: "Valere",
    category: "Schmuck",
    price: 11750,
    description: "Brillanten in harmonischer Linie, sicher gefasst und sehr angenehm zu tragen.",
    specs: "Material: Weissgold\nSteine: Brillanten\nVerschluss: Kastenschloss\nVerfuegbarkeit: auf Anfrage",
    image: "assets/optimized/full/23-30330-46a8d213-transparent.webp",
    thumb: "assets/optimized/thumbs/23-30330-46a8d213-transparent.webp"
  },
  {
    id: "collier-marina",
    name: "Collier Marina",
    brand: "Maison Lune",
    category: "Anlässe",
    price: 3290,
    description: "Zarte Kette mit glaenzendem Anhaenger fuer festliche und persoenliche Momente.",
    specs: "Material: Rosegold\nLaenge: 42 cm\nAnhaenger: poliert\nVerfuegbarkeit: auf Anfrage",
    image: "assets/optimized/full/021433-1500-ad7d82e3-transparent.webp",
    thumb: "assets/optimized/thumbs/021433-1500-ad7d82e3-transparent.webp"
  },
  {
    id: "automatik-orion",
    name: "G-Shock Analoguhr",
    brand: "G-Shock",
    category: "Uhren",
    price: 6420,
    description: "Zeitmesser mit fein gearbeiteter Luenette und ruhiger Praesenz am Handgelenk.",
    specs: "Gehaeuse: Edelstahl\nUhrwerk: Automatik\nArmband: Edelstahl\nZifferblatt: Blau",
    image: "assets/optimized/full/awg-m100a-1aer-316b2306-transparent.webp",
    thumb: "assets/optimized/thumbs/awg-m100a-1aer-316b2306-transparent.webp"
  },
  {
    id: "ohrringe-perla",
    name: "Ohrringe Perla",
    brand: "Aurielle",
    category: "Schmuck",
    price: 1890,
    description: "Klassische Form mit sanftem Schimmer und dezentem Auftritt.",
    specs: "Material: 585 Gelbgold\nStein: Perlmutt\nVerschluss: Steckverschluss\nVerfuegbarkeit: auf Anfrage",
    image: "assets/optimized/full/1-3-e52ca634-transparent.webp",
    thumb: "assets/optimized/thumbs/1-3-e52ca634-transparent.webp"
  }
];

const storageKey = "juwelier-products";
const sessionKey = "juwelier-admin";
const wishlistKey = "juwelier-wishlist";
const inquiryEndpoint = "https://formsubmit.co/ajax/office@sarikow.com";
const visibleCount = {};
const catalogState = {
  brand: "all",
  openCategory: "auto"
};
const adminState = {
  category: "custom",
  brand: "all",
  query: "",
  selected: new Set()
};
const watchBrandOrder = ["Frederique Constant", "Citizen", "Zeppelin", "Boss", "G-Shock", "Edifice", "Tommy Hilfiger", "Jack Lemens", "Casio"];
const categoryBrandOptions = {
  Schmuck: ["Sarikow Diamonds", "Linea Oro", "Valere", "Ruesch", "Aurielle", "C & C", "Guess"],
  Uhren: watchBrandOrder,
  Anlässe: ["Sarikow Diamonds", "Maison Lune", "Ruesch", "Valere", "Linea Oro"]
};
const removedWatchBrands = ["diesel", "armani", "emporio armani", "lee cooper", "michael kors", "michel herbelin"];

function normalizeFilter(value) {
  return String(value || "").trim().toLowerCase();
}

function escapeAttribute(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function canonicalWatchBrand(value) {
  const normalized = normalizeFilter(value);
  return watchBrandOrder.find((brand) => normalizeFilter(brand) === normalized) || String(value || "").trim();
}

function normalizeCategoryName(category, brand) {
  const normalized = normalizeFilter(category);
  if (normalized === "uhren" || normalized === "uhr" || watchBrandOrder.some((item) => normalizeFilter(item) === normalized)) return "Uhren";
  if (normalized === "anlässe" || normalized === "anlaesse" || normalized === "anlass") return "Anlässe";
  if (normalized === "schmuck") return "Schmuck";
  if (watchBrandOrder.some((item) => normalizeFilter(item) === normalizeFilter(brand))) return "Uhren";
  return category || "Schmuck";
}

function normalizeProduct(product) {
  const category = normalizeCategoryName(product?.category, product?.brand);
  const brand = category === "Uhren" ? canonicalWatchBrand(product?.brand) : String(product?.brand || "").trim();
  return { specs: "", ...product, brand, category };
}

function isCustomProduct(product) {
  return String(product?.id || "").startsWith("p-");
}

function adminFilteredProducts() {
  const query = normalizeFilter(adminState.query);
  const selectedBrand = normalizeFilter(adminState.brand);
  return products.filter((product) => {
    const inCategory = adminState.category === "all"
      || (adminState.category === "custom" ? isCustomProduct(product) : product.category === adminState.category);
    const inBrand = adminState.brand === "all" || normalizeFilter(product.brand) === selectedBrand;
    const haystack = normalizeFilter(`${product.name} ${product.brand} ${product.category} ${product.description}`);
    return inCategory && inBrand && (!query || haystack.includes(query));
  });
}

function brandOptionsForCategory(category) {
  const base = categoryBrandOptions[category] || [];
  const existing = products
    .filter((product) => product.category === category)
    .map((product) => product.brand)
    .filter(Boolean);
  const merged = [...base, ...existing];
  return [...new Map(merged.map((brand) => [normalizeFilter(brand), brand])).values()];
}

function adminBrandOptions() {
  const scope = products.filter((product) => {
    if (adminState.category === "all") return true;
    if (adminState.category === "custom") return isCustomProduct(product);
    return product.category === adminState.category;
  });
  return [...new Map(scope.map((product) => product.brand).filter(Boolean).map((brand) => [normalizeFilter(brand), brand])).values()]
    .sort((a, b) => a.localeCompare(b, "de"));
}

const productForm = document.querySelector("#productForm");
const adminProducts = document.querySelector("#adminProducts");
const loginForm = document.querySelector("#loginForm");
const loginMessage = document.querySelector("#loginMessage");
const productMessage = document.querySelector("#productMessage");
const adminDialog = document.querySelector("#adminDialog");
const loginView = document.querySelector("[data-login-view]");
const adminView = document.querySelector("[data-admin-view]");
const searchInput = document.querySelector("#productSearch");
const categoryFilter = document.querySelector("#categoryFilter");
const nav = document.querySelector(".main-nav");
const businessHours = {
  default: { start: "09:00", end: "18:30" },
  saturday: { start: "09:00", end: "13:00" }
};

let products = loadProducts();
let wishlist = readJson(wishlistKey, []);
let currentSlide = 0;

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadProducts() {
  const imported = Array.isArray(window.sarikowImportedProducts) ? window.sarikowImportedProducts : [];
  document.documentElement.dataset.importedProducts = String(imported.length);
  const saved = readJson(storageKey, null);
  const cleanProduct = (product) => ({ specs: "", ...product });
  const isRemovedWatchBrand = (product) => {
    const brand = normalizeFilter(product?.brand);
    return product?.category === "Uhren" && removedWatchBrands.some((removedBrand) => brand.includes(removedBrand));
  };
  if (imported.length) {
    const importedIds = new Set(imported.map((product) => product.id));
    const customProducts = Array.isArray(saved)
      ? saved.filter((product) => !isRemovedWatchBrand(product) && !importedIds.has(product.id) && !defaultProducts.some((item) => item.id === product.id))
      : [];
    const merged = [...customProducts, ...imported].filter((product) => !isRemovedWatchBrand(product)).map(cleanProduct).map(normalizeProduct);
    writeJson(storageKey, merged);
    return merged;
  }
  if (Array.isArray(saved) && saved.length) {
    const cleanedSaved = saved.filter((product) => !isRemovedWatchBrand(product)).map(cleanProduct).map(normalizeProduct);
    writeJson(storageKey, cleanedSaved);
    return cleanedSaved;
  }
  writeJson(storageKey, defaultProducts);
  return defaultProducts;
}

function formatPrice(value) {
  if (!Number(value)) return "Preis auf Anfrage";
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

function productUrl(product) {
  return `produkt.html?id=${encodeURIComponent(product.id)}`;
}

function filteredProducts(category = "all") {
  const query = searchInput?.value.trim().toLowerCase() || "";
  const activeCategory = activeCategoryForGrid(category);

  return products.filter((product) => {
    const inCategory = activeCategory === "all" || product.category === activeCategory;
    const normalizedBrand = normalizeFilter(product.brand);
    const selectedBrand = normalizeFilter(catalogState.brand);
    const inBrand = catalogState.brand === "all" || normalizedBrand === selectedBrand || normalizeFilter(product.category) === selectedBrand;
    const haystack = `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
    return inCategory && inBrand && haystack.includes(query);
  });
}

function activeCategoryForGrid(category = "all") {
  return categoryFilter?.value || category;
}

function productCard(product) {
  const isWatch = product.category === "Uhren";
  const imageSource = product.thumb || product.image || "";
  const needsBackgroundBlend = isWatch && !String(imageSource).includes("transparent");
  return `
    <article class="product-card${isWatch ? " is-watch" : ""}${needsBackgroundBlend ? " needs-background-blend" : ""}">
      <button class="wishlist" type="button" aria-label="Zur Wunschliste" data-wishlist="${product.id}">
        ${wishlist.includes(product.id) ? "♥" : "♡"}
      </button>
      <a href="${productUrl(product)}">
        <img src="${product.thumb || product.image}" alt="${product.name}" loading="lazy">
      </a>
      <div class="product-info">
        <small>${product.brand}</small>
        <h3><a href="${productUrl(product)}">${product.name}</a></h3>
        <span class="price">${formatPrice(product.price)}</span>
        <div class="product-actions">
          <a class="button ghost" href="${productUrl(product)}">Details</a>
          <button class="button dark" type="button" data-inquiry="${product.id}">Anfrage</button>
        </div>
      </div>
    </article>
  `;
}

function renderBrandGroups(grid, category, items) {
  const grouped = [...items].reduce((acc, product) => {
    if (!acc[product.brand]) acc[product.brand] = [];
    acc[product.brand].push(product);
    return acc;
  }, {});
  const brands = category === "Uhren"
    ? [
        ...watchBrandOrder.filter((brand) => Object.keys(grouped).some((item) => normalizeFilter(item) === normalizeFilter(brand))),
        ...Object.keys(grouped).filter((brand) => !watchBrandOrder.some((item) => normalizeFilter(item) === normalizeFilter(brand))).sort((a, b) => a.localeCompare(b, "de"))
      ]
    : Object.keys(grouped).sort((a, b) => grouped[b].length - grouped[a].length || a.localeCompare(b, "de"));

  grid.innerHTML = brands
    .map((brand) => {
      const brandKey = Object.keys(grouped).find((item) => normalizeFilter(item) === normalizeFilter(brand)) || brand;
      const brandItems = grouped[brandKey].slice(0, 8);
      return `
        <section class="brand-product-section">
          <div class="brand-product-head">
            <div>
              <p>${category === "all" ? "Marke" : category}</p>
              <h3>${brand}</h3>
              <span>${grouped[brandKey].length} Produkte</span>
            </div>
            <button class="button ghost" type="button" data-filter-brand="${encodeURIComponent(brand)}">Alle anzeigen</button>
          </div>
          <div class="product-grid brand-product-grid">
            ${brandItems.map(productCard).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function renderSelectedBrandGroup(grid, category, items) {
  const brand = catalogState.brand;
  grid.innerHTML = `
    <section class="brand-product-section selected-brand-section">
      <div class="brand-product-head">
        <div>
          <p>${category === "all" ? "Marke" : category}</p>
          <h3>${brand}</h3>
          <span>${items.length} Produkte</span>
        </div>
        <button class="button ghost" type="button" data-filter-brand="all">Alle Marken</button>
      </div>
      <div class="product-grid brand-product-grid">
        ${items.map(productCard).join("")}
      </div>
    </section>
  `;
}

function renderProducts() {
  document.querySelectorAll("[data-product-grid]").forEach((grid) => {
    const category = grid.dataset.category || "all";
    const key = `${activeCategoryForGrid(category)}-${catalogState.brand}-${grid.dataset.limit || "auto"}`;
    const defaultLimit = Number(grid.dataset.limit || 24);
    const shown = visibleCount[key] || defaultLimit;
    const allItems = filteredProducts(category);
    const items = allItems.slice(0, shown);
    const catalogGrid = grid.dataset.groupByBrand === "true";
    const groupedMode = catalogGrid && catalogState.brand === "all" && !searchInput?.value.trim();
    const selectedBrandMode = catalogGrid && catalogState.brand !== "all" && !searchInput?.value.trim();
    if (groupedMode) {
      renderBrandGroups(grid, activeCategoryForGrid(category), allItems);
    } else if (selectedBrandMode) {
      renderSelectedBrandGroup(grid, activeCategoryForGrid(category), items);
    } else {
      grid.innerHTML = items.map(productCard).join("");
    }
    if (!items.length) grid.innerHTML = `<p>Keine Produkte gefunden.</p>`;
    const existingButton = grid.nextElementSibling?.matches?.("[data-load-more]") ? grid.nextElementSibling : null;
    if (existingButton) existingButton.remove();
    if (!groupedMode && !selectedBrandMode && allItems.length > shown) {
      const button = document.createElement("button");
      button.className = "button ghost load-more";
      button.type = "button";
      button.dataset.loadMore = key;
      button.textContent = `Mehr anzeigen (${allItems.length - shown})`;
      button.addEventListener("click", () => {
        visibleCount[key] = shown + 24;
        renderProducts();
      });
      grid.insertAdjacentElement("afterend", button);
    }
  });
  renderCatalogFilters();
}

function pageCategory() {
  const grid = document.querySelector("[data-product-grid]");
  return grid?.dataset.category || "all";
}

function activeCategory() {
  return categoryFilter?.value || pageCategory();
}

function countsFor(values, key, category = "all") {
  return values.reduce((acc, value) => {
    acc[value] = products.filter((product) => {
      const inCategory = category === "all" || product.category === category;
      const matches = key === "brand"
        ? normalizeFilter(product[key]) === normalizeFilter(value)
        : product[key] === value;
      return inCategory && matches;
    }).length;
    return acc;
  }, {});
}

function renderCatalogFilters() {
  const target = document.querySelector("[data-catalog-filters]");
  if (!target) return;
  const selectedCategory = activeCategory();
  const openCategory = catalogState.openCategory === "auto" ? selectedCategory : catalogState.openCategory;
  const categories = ["all", "Schmuck", "Uhren", "Anlässe"];
  const categoryCounts = countsFor(categories.filter((category) => category !== "all"), "category");
  categoryCounts.all = products.length;
  const brandsForCategory = (category) => {
    const brandCategory = category === "all" ? "all" : category;
    const brandBase = products.filter((product) => brandCategory === "all" || product.category === brandCategory);
    const productBrands = [...new Set(brandBase.map((product) => product.brand))].sort((a, b) => a.localeCompare(b, "de"));
    const brands = brandCategory === "Uhren"
      ? [...watchBrandOrder, ...productBrands.filter((brand) => !watchBrandOrder.some((item) => normalizeFilter(item) === normalizeFilter(brand)))]
      : productBrands;
    return {
      brandBase,
      brands: brands.slice(0, 24),
      brandCounts: countsFor(brands.slice(0, 24), "brand", brandCategory)
    };
  };

  target.innerHTML = `
    <div class="filter-block">
      <h3>Kategorien</h3>
      <div class="filter-list">
        ${categories
          .map((category) => {
            const isActive = selectedCategory === category;
            const isOpen = openCategory === category;
            const brandData = isOpen ? brandsForCategory(category) : null;
            return `
              <div class="filter-category-group">
                <button class="${isActive ? "active" : ""}" type="button" data-filter-category="${category}" aria-expanded="${isOpen ? "true" : "false"}">
                  <span>${category === "all" ? "Alle" : category}</span>
                  <small>${categoryCounts[category] || 0}</small>
                </button>
                ${
                  isOpen && brandData
                    ? `
                      <div class="filter-sublist">
                        <button class="${catalogState.brand === "all" ? "active" : ""}" type="button" data-filter-brand="all">
                          <span>Alle Marken</span>
                          <small>${brandData.brandBase.length}</small>
                        </button>
                        ${brandData.brands
                          .map(
                            (brand) => `
                              <button class="${normalizeFilter(catalogState.brand) === normalizeFilter(brand) ? "active" : ""}" type="button" data-filter-brand="${encodeURIComponent(brand)}">
                                <span>${brand}</span>
                                <small>${brandData.brandCounts[brand] || 0}</small>
                              </button>
                            `
                          )
                          .join("")}
                      </div>
                    `
                    : ""
                }
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderWishlist() {
  const target = document.querySelector("#wishlistProducts");
  if (!target) return;
  const items = products.filter((product) => wishlist.includes(product.id));
  target.innerHTML = items.length
    ? items.map(productCard).join("")
    : `<p>Ihre Wunschliste ist aktuell leer.</p>`;
}

function renderProductDetail() {
  const target = document.querySelector("#productDetail");
  if (!target) return;
  const params = new URLSearchParams(window.location.search);
  const product = products.find((item) => item.id === params.get("id")) || products[0];
  const specs = (product.specs || "")
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(":");
      return `<dt>${label}</dt><dd>${rest.join(":").trim()}</dd>`;
    })
    .join("");

  document.title = `${product.name} | Juwelier Sarikow`;
  const categoryPage = product.category === "Uhren" ? "uhren.html" : product.category === "Anlässe" ? "anlaesse.html" : "schmuck.html";
  const categoryProducts = products.filter((item) => item.category === product.category);
  const index = Math.max(0, categoryProducts.findIndex((item) => item.id === product.id));
  const previous = categoryProducts[(index - 1 + categoryProducts.length) % categoryProducts.length];
  const next = categoryProducts[(index + 1) % categoryProducts.length];
  target.innerHTML = `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Startseite</a>
      <a href="${categoryPage}">${product.category}</a>
      <span>${product.name}</span>
    </nav>
    <div class="detail-nav">
      <button class="text-button back-link" type="button" data-history-back>Zurück</button>
      <div>
        <a href="${productUrl(previous)}">Vorheriges Produkt</a>
        <a href="${productUrl(next)}">Nächstes Produkt</a>
      </div>
    </div>
      <div class="product-detail-image${product.category === "Uhren" && !String(product.image || "").includes("transparent") ? " needs-background-blend" : ""}">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-detail-copy">
      <p>${product.brand}</p>
      <h1>${product.name}</h1>
      <span class="detail-price">${formatPrice(product.price)}</span>
      <p>${product.description}</p>
      <div class="detail-actions">
        <button class="button dark" type="button" data-inquiry="${product.id}">Anfrage</button>
        <button class="button ghost" type="button" data-appointment>Terminvereinbarung</button>
      </div>
      <dl class="spec-list">${specs}</dl>
    </div>
  `;
}

function renderAdminProducts() {
  if (!adminProducts) return;
  renderAdminBrandFilter();
  const adminItems = adminFilteredProducts();
  const visibleIds = new Set(adminItems.map((product) => product.id));
  adminState.selected.forEach((id) => {
    if (!products.some((product) => product.id === id)) adminState.selected.delete(id);
  });
  adminProducts.innerHTML = adminItems
    .map(
      (product) => `
        <article class="admin-product-row ${adminState.selected.has(product.id) ? "selected" : ""}">
          <label class="admin-select-product" aria-label="${product.name} auswählen">
            <input type="checkbox" data-admin-select-product="${product.id}" ${adminState.selected.has(product.id) ? "checked" : ""}>
          </label>
          <img src="${product.image}" alt="${product.name}">
          <div>
            <strong>${product.name}</strong><br>
            <span>${product.brand} · ${product.category} · ${formatPrice(product.price)}</span>
          </div>
          <div class="row-actions">
            <button type="button" data-edit="${product.id}">Bearbeiten</button>
            <button type="button" data-delete="${product.id}">Löschen</button>
          </div>
        </article>
      `
    )
    .join("") || `<p>Keine Produkte in dieser Kategorie.</p>`;
  document.querySelectorAll("[data-admin-category]").forEach((button) => {
    button.classList.toggle("active", button.dataset.adminCategory === adminState.category);
  });
  const count = document.querySelector("[data-admin-result-count]");
  if (count) count.textContent = `${adminItems.length} Produkte`;
  const selectedCount = document.querySelector("[data-admin-selected-count]");
  if (selectedCount) selectedCount.textContent = `${[...adminState.selected].filter((id) => visibleIds.has(id)).length} ausgewählt`;
}

function renderAdminBrandFilter() {
  const select = document.querySelector("[data-admin-brand-filter]");
  if (!select) return;
  const options = adminBrandOptions();
  if (adminState.brand !== "all" && !options.some((brand) => normalizeFilter(brand) === normalizeFilter(adminState.brand))) {
    adminState.brand = "all";
  }
  const current = adminState.brand;
  select.innerHTML = [
    `<option value="all">Alle Marken</option>`,
    ...options.map((brand) => `<option value="${escapeAttribute(brand)}">${escapeAttribute(brand)}</option>`)
  ].join("");
  select.value = current;
}

function updateWishlistCounter() {
  document.querySelectorAll("[data-wishlist-count]").forEach((item) => {
    item.textContent = wishlist.length;
  });
}

function showAdminState() {
  if (!loginView || !adminView) return;
  const isLoggedIn = localStorage.getItem(sessionKey) === "true";
  loginView.hidden = isLoggedIn;
  adminView.hidden = !isLoggedIn;
  if (isLoggedIn) {
    updateBrandSelect();
    renderAdminProducts();
  }
}

function updateBrandSelect(selectedBrand = "") {
  if (!productForm?.elements.brand) return;
  const category = normalizeCategoryName(productForm.elements.category?.value || "Schmuck", selectedBrand);
  const select = productForm.elements.brand;
  const options = brandOptionsForCategory(category);
  const normalizedSelected = normalizeFilter(selectedBrand || select.value);
  const matchingBrand = options.find((brand) => normalizeFilter(brand) === normalizedSelected);
  select.innerHTML = [
    `<option value="">Marke auswählen</option>`,
    ...options.map((brand) => `<option value="${escapeAttribute(brand)}">${escapeAttribute(brand)}</option>`),
    `<option value="__custom">Eigene Marke...</option>`
  ].join("");
  select.value = matchingBrand || (selectedBrand ? "__custom" : "");
  syncCustomBrandField(matchingBrand ? "" : selectedBrand);
}

function syncCustomBrandField(customValue = "") {
  if (!productForm?.elements.brand || !productForm.elements.customBrand) return;
  const isCustom = productForm.elements.brand.value === "__custom";
  productForm.elements.customBrand.hidden = !isCustom;
  productForm.elements.customBrand.required = isCustom;
  if (!isCustom) productForm.elements.customBrand.value = "";
  else if (customValue) productForm.elements.customBrand.value = customValue;
}

function syncProductCategoryPicker() {
  if (!productForm?.elements.category) return;
  document.querySelectorAll("[data-product-category-choice]").forEach((item) => {
    item.classList.toggle("active", item.dataset.productCategoryChoice === productForm.elements.category.value);
  });
}

function imageFromFile(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.size) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function stripWhiteBackground(sourceCanvas) {
  const context = sourceCanvas.getContext("2d", { willReadFrequently: true });
  const { width, height } = sourceCanvas;
  const imageData = context.getImageData(0, 0, width, height);
  const { data } = imageData;
  const edgeSamples = [];
  const sampleStep = Math.max(2, Math.floor(Math.min(width, height) / 34));
  const addSample = (x, y) => {
    const offset = (y * width + x) * 4;
    const a = data[offset + 3];
    if (a < 12) return;
    edgeSamples.push([data[offset], data[offset + 1], data[offset + 2]]);
  };
  for (let x = 0; x < width; x += sampleStep) {
    addSample(x, 0);
    addSample(x, height - 1);
  }
  for (let y = 0; y < height; y += sampleStep) {
    addSample(0, y);
    addSample(width - 1, y);
  }
  const colorDistance = (r, g, b, color) => {
    const dr = r - color[0];
    const dg = g - color[1];
    const db = b - color[2];
    return Math.sqrt(dr * dr * 0.9 + dg * dg + db * db * 0.8);
  };
  const backgroundDistance = (r, g, b) => {
    if (!edgeSamples.length) return 255;
    let distance = 255;
    for (const color of edgeSamples) {
      distance = Math.min(distance, colorDistance(r, g, b, color));
      if (distance < 16) break;
    }
    return distance;
  };
  const isLowDetailBackground = (index) => {
    const offset = index * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    return spread < 34 && Math.max(r, g, b) > 178;
  };
  const seen = new Uint8Array(width * height);
  const queue = [];
  const isBackground = (index) => {
    const offset = index * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const a = data[offset + 3];
    if (a < 12) return true;
    const distance = backgroundDistance(r, g, b);
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    const lightNeutral = Math.max(r, g, b) > 210 && spread < 62;
    return distance < 68 || lightNeutral || (isLowDetailBackground(index) && distance < 96);
  };
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const index = y * width + x;
    if (seen[index] || !isBackground(index)) return;
    seen[index] = 1;
    queue.push(index);
  };
  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const index = queue[cursor];
    const x = index % width;
    const y = Math.floor(index / width);
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
  for (let index = 0; index < seen.length; index += 1) {
    const offset = index * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const distance = backgroundDistance(r, g, b);
    if (seen[index]) {
      data[offset + 3] = 0;
    }
  }
  context.putImageData(imageData, 0, 0);
  return sourceCanvas;
}

function trimTransparentCanvas(canvas) {
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const { width, height } = canvas;
  const imageData = context.getImageData(0, 0, width, height);
  const { data } = imageData;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] > 8) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }
  if (minX > maxX || minY > maxY) return canvas;
  const trimmed = document.createElement("canvas");
  trimmed.width = maxX - minX + 1;
  trimmed.height = maxY - minY + 1;
  trimmed.getContext("2d").drawImage(canvas, minX, minY, trimmed.width, trimmed.height, 0, 0, trimmed.width, trimmed.height);
  return trimmed;
}

function transparentPixelRatio(canvas) {
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;
  let transparent = 0;
  for (let index = 3; index < data.length; index += 4) {
    if (data[index] < 24) transparent += 1;
  }
  return transparent / (canvas.width * canvas.height);
}

function brightPixelRatio(canvas, startX, endX) {
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const width = canvas.width;
  const height = canvas.height;
  const imageData = context.getImageData(0, 0, width, height);
  const { data } = imageData;
  let bright = 0;
  let total = 0;
  for (let y = 0; y < height; y += 2) {
    for (let x = startX; x < endX; x += 2) {
      const offset = (y * width + x) * 4;
      const brightness = (data[offset] + data[offset + 1] + data[offset + 2]) / 3;
      const spread = Math.max(data[offset], data[offset + 1], data[offset + 2]) - Math.min(data[offset], data[offset + 1], data[offset + 2]);
      if (brightness > 168 && spread < 78) bright += 1;
      total += 1;
    }
  }
  return total ? bright / total : 0;
}

function focusWatchPosterCanvas(canvas, category) {
  if (category !== "Uhren") return canvas;
  const ratio = transparentPixelRatio(canvas);
  if (ratio > 0.08) return canvas;
  const { width, height } = canvas;
  const aspect = width / height;
  if (aspect < 0.74 || aspect > 1.42) return canvas;
  const leftBright = brightPixelRatio(canvas, 0, Math.floor(width * 0.38));
  const rightBright = brightPixelRatio(canvas, Math.floor(width * 0.62), width);
  const hasPosterText = leftBright > 0.035 && leftBright > rightBright * 1.25;
  if (!hasPosterText) return canvas;

  const crop = document.createElement("canvas");
  const sx = Math.round(width * 0.27);
  const sy = Math.round(height * 0.07);
  const sw = Math.round(width * 0.66);
  const sh = Math.round(height * 0.91);
  crop.width = sw;
  crop.height = sh;
  crop.getContext("2d").drawImage(canvas, sx, sy, sw, sh, 0, 0, sw, sh);
  stripWhiteBackground(crop);
  return crop;
}

function fitProductCanvas(sourceCanvas, size) {
  const trimmed = trimTransparentCanvas(sourceCanvas);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  const maxSide = size * 0.76;
  const scale = maxSide / Math.max(trimmed.width, trimmed.height);
  const width = Math.max(1, Math.round(trimmed.width * scale));
  const height = Math.max(1, Math.round(trimmed.height * scale));
  context.clearRect(0, 0, size, size);
  context.drawImage(trimmed, (size - width) / 2, (size - height) / 2, width, height);
  return canvas;
}

async function fileToProductImages(file, category) {
  const image = await imageFromFile(file);
  if (!image) return null;
  const workMax = 900;
  const scale = Math.min(1, workMax / Math.max(image.naturalWidth, image.naturalHeight));
  const workCanvas = document.createElement("canvas");
  workCanvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  workCanvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  workCanvas.getContext("2d").drawImage(image, 0, 0, workCanvas.width, workCanvas.height);
  stripWhiteBackground(workCanvas);
  const productCanvas = focusWatchPosterCanvas(workCanvas, category);
  return {
    image: fitProductCanvas(productCanvas, 1200).toDataURL("image/webp", 0.86),
    thumb: fitProductCanvas(productCanvas, 520).toDataURL("image/webp", 0.82)
  };
}

async function saveProduct(event) {
  event.preventDefault();
  const data = new FormData(productForm);
  const existingId = data.get("id");
  const current = products.find((product) => product.id === existingId);
  const submittedBrand = data.get("brand") === "__custom" ? data.get("customBrand") : data.get("brand");
  const category = normalizeCategoryName(data.get("category"), submittedBrand);
  if (!String(submittedBrand || "").trim()) {
    productMessage.textContent = "Bitte eine Marke auswählen.";
    return;
  }
  let uploadedImages = null;
  if (data.get("image")?.size) {
    productMessage.textContent = "Bild wird freigestellt und optimiert ...";
    try {
      uploadedImages = await fileToProductImages(data.get("image"), category);
    } catch (error) {
      productMessage.textContent = "Bild konnte nicht verarbeitet werden. Bitte ein JPG, PNG oder WebP verwenden.";
      return;
    }
  }

  const product = {
    id: existingId || `p-${Date.now()}`,
    name: data.get("name").trim(),
    brand: category === "Uhren" ? canonicalWatchBrand(submittedBrand).trim() : submittedBrand.trim(),
    category,
    price: Number(data.get("price")),
    description: data.get("description").trim(),
    specs: data.get("specs")?.trim() || current?.specs || "",
    image: uploadedImages?.image || current?.image || defaultProducts[0].image,
    thumb: uploadedImages?.thumb || current?.thumb || current?.image || defaultProducts[0].thumb || defaultProducts[0].image
  };

  products = existingId
    ? products.map((item) => (item.id === existingId ? product : item))
    : [product, ...products];

  writeJson(storageKey, products);
  productForm.reset();
  productForm.elements.id.value = "";
  updateBrandSelect();
  syncProductCategoryPicker();
  productMessage.textContent = "Produkt wurde gespeichert.";
  renderProducts();
  renderWishlist();
  renderAdminProducts();
}

function editProduct(id) {
  const product = products.find((item) => item.id === id);
  if (!product || !productForm) return;
  productForm.elements.id.value = product.id;
  productForm.elements.name.value = product.name;
  productForm.elements.category.value = product.category;
  updateBrandSelect(product.brand);
  productForm.elements.price.value = product.price;
  productForm.elements.description.value = product.description || "";
  if (productForm.elements.specs) productForm.elements.specs.value = product.specs || "";
  productMessage.textContent = "Produkt ist bereit zur Bearbeitung.";
  productForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteProduct(id) {
  products = products.filter((product) => product.id !== id);
  wishlist = wishlist.filter((productId) => productId !== id);
  adminState.selected.delete(id);
  writeJson(storageKey, products);
  writeJson(wishlistKey, wishlist);
  renderProducts();
  renderWishlist();
  renderAdminProducts();
  updateWishlistCounter();
}

function ensureInquiryDialog() {
  if (document.querySelector("#inquiryDialog")) return;
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <dialog class="admin-dialog inquiry-dialog" id="inquiryDialog">
        <div class="admin-shell">
          <button class="close-button" type="button" aria-label="Anfrage schließen" data-close-inquiry>×</button>
          <p>Produktanfrage</p>
          <h2 id="inquiryTitle">Anfrage senden</h2>
          <form class="admin-form" id="inquiryForm">
            <input type="hidden" name="_subject" value="Neue Produktanfrage über sarikow.com">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="Produkt" id="inquiryProductField">
            <label>
              Ihr Name
              <input name="name" required>
            </label>
            <label>
              Ihre Telefonnummer
              <input name="phone" type="tel" required>
            </label>
            <label>
              Ihre E-Mail-Adresse
              <input name="email" type="email" required>
            </label>
            <label>
              Ihre Nachricht
              <textarea name="message" rows="4"></textarea>
            </label>
            <button class="button dark" type="submit">Anfrage senden</button>
            <output id="inquiryMessage" role="status"></output>
          </form>
        </div>
      </dialog>
    `
  );
}

function ensureAppointmentDialog() {
  if (document.querySelector("#appointmentDialog")) return;
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <dialog class="admin-dialog appointment-dialog" id="appointmentDialog">
        <div class="admin-shell">
          <button class="close-button" type="button" aria-label="Termin schließen" data-close-appointment>×</button>
          <p>Terminvereinbarung</p>
          <h2>Termin im Geschäft anfragen</h2>
          <form class="admin-form" id="appointmentForm">
            <input type="hidden" name="_subject" value="Neue Terminvereinbarung über sarikow.com">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="Terminzeit" id="appointmentTimeField" required>
            <label>
              Datum
              <input name="date" id="appointmentDate" type="date" required>
            </label>
            <div class="time-slot-panel">
              <span>Uhrzeit auswählen</span>
              <div class="time-slots" id="appointmentSlots"></div>
            </div>
            <div class="field-row">
              <label>
                Ihr Name
                <input name="name" required>
              </label>
              <label>
                Telefonnummer
                <input name="phone" type="tel" required>
              </label>
            </div>
            <label>
              E-Mail-Adresse
              <input name="email" type="email">
            </label>
            <label>
              Nachricht
              <textarea name="message" rows="3" placeholder="Wunsch, Produkt oder Anlass"></textarea>
            </label>
            <button class="button dark" type="submit">Termin anfragen</button>
            <output id="appointmentMessage" role="status"></output>
          </form>
        </div>
      </dialog>
    `
  );
  const dateInput = document.querySelector("#appointmentDate");
  const today = new Date();
  dateInput.min = formatDateInput(today);
  dateInput.value = formatDateInput(today);
  renderAppointmentSlots();
  dateInput.addEventListener("change", renderAppointmentSlots);
}

function openInquiry(productId) {
  ensureInquiryDialog();
  const product = products.find((item) => item.id === productId);
  const dialog = document.querySelector("#inquiryDialog");
  const title = document.querySelector("#inquiryTitle");
  const message = document.querySelector("#inquiryForm textarea");
  const productField = document.querySelector("#inquiryProductField");
  title.textContent = product ? `Anfrage zu ${product.name}` : "Produktanfrage";
  productField.value = product ? `${product.brand} ${product.name} (${formatPrice(product.price)})` : "Allgemeine Produktanfrage";
  message.value = product
    ? `Ich interessiere mich fuer ${product.brand} ${product.name}. Bitte kontaktieren Sie mich.`
    : "";
  dialog.showModal();
}

function formatDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function minutesFromTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function timeFromMinutes(totalMinutes) {
  return `${String(Math.floor(totalMinutes / 60)).padStart(2, "0")}:${String(totalMinutes % 60).padStart(2, "0")}`;
}

function renderAppointmentSlots() {
  const dateInput = document.querySelector("#appointmentDate");
  const slots = document.querySelector("#appointmentSlots");
  const timeField = document.querySelector("#appointmentTimeField");
  if (!dateInput || !slots || !timeField) return;
  const selectedDate = new Date(`${dateInput.value}T12:00:00`);
  const hours = selectedDate.getDay() === 6 ? businessHours.saturday : businessHours.default;
  const start = minutesFromTime(hours.start);
  const end = minutesFromTime(hours.end);
  const lastStart = end - 30;
  const now = new Date();
  const isToday = dateInput.value === formatDateInput(now);
  slots.innerHTML = "";
  timeField.value = "";
  for (let time = start; time <= lastStart; time += 30) {
    const label = timeFromMinutes(time);
    const slotDate = new Date(`${dateInput.value}T${label}:00`);
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.timeSlot = label;
    button.disabled = isToday && slotDate <= now;
    button.addEventListener("click", () => {
      slots.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      timeField.value = `${dateInput.value} ${label}`;
    });
    slots.append(button);
  }
}

function openAppointmentDialog() {
  ensureAppointmentDialog();
  document.querySelector("#appointmentDialog")?.showModal();
}

async function submitEmailForm(form, output, successText) {
  const formData = new FormData(form);
  output.textContent = "Wird gesendet ...";
  const response = await fetch(inquiryEndpoint, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData
  });
  if (!response.ok) throw new Error("Formular konnte nicht gesendet werden.");
  form.reset();
  output.textContent = successText;
}

function wireEvents() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<button class="back-to-top" type="button" aria-label="Nach oben" data-page-scroll-top>↑</button>`
  );
  const pageScrollTop = document.querySelector("[data-page-scroll-top]");
  const updatePageScrollTop = () => {
    pageScrollTop?.classList.toggle("visible", window.scrollY > 520);
  };
  updatePageScrollTop();
  window.addEventListener("scroll", updatePageScrollTop, { passive: true });
  pageScrollTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelectorAll("[data-open-admin]").forEach((button) => {
    button.addEventListener("click", () => {
      showAdminState();
      adminDialog?.showModal();
    });
  });

  document.querySelector("[data-close-admin]")?.addEventListener("click", () => adminDialog.close());
  document.querySelector("[data-logout]")?.addEventListener("click", () => {
    localStorage.removeItem(sessionKey);
    showAdminState();
  });

  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    const valid = normalizeFilter(data.get("username")) === "admin" && data.get("password") === "Michael.1959";
    if (!valid) {
      loginMessage.textContent = "Zugangsdaten stimmen nicht.";
      return;
    }
    localStorage.setItem(sessionKey, "true");
    loginForm.reset();
    loginMessage.textContent = "";
    showAdminState();
  });

  productForm?.addEventListener("submit", saveProduct);

  adminProducts?.addEventListener("click", (event) => {
    const editId = event.target.dataset.edit;
    const deleteId = event.target.dataset.delete;
    if (editId) editProduct(editId);
    if (deleteId) deleteProduct(deleteId);
  });

  adminProducts?.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-admin-select-product]");
    if (!checkbox) return;
    if (checkbox.checked) adminState.selected.add(checkbox.dataset.adminSelectProduct);
    else adminState.selected.delete(checkbox.dataset.adminSelectProduct);
    renderAdminProducts();
  });

  document.querySelector("[data-admin-category-tabs]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-admin-category]");
    if (!button) return;
    adminState.category = button.dataset.adminCategory;
    adminState.brand = "all";
    adminState.selected.clear();
    renderAdminProducts();
  });

  document.querySelector("#adminProductSearch")?.addEventListener("input", (event) => {
    adminState.query = event.target.value;
    adminState.selected.clear();
    renderAdminProducts();
  });

  document.querySelector("[data-admin-brand-filter]")?.addEventListener("change", (event) => {
    adminState.brand = event.target.value;
    adminState.selected.clear();
    renderAdminProducts();
  });

  document.querySelector("[data-admin-select-visible]")?.addEventListener("click", () => {
    adminFilteredProducts().forEach((product) => adminState.selected.add(product.id));
    renderAdminProducts();
  });

  document.querySelector("[data-admin-clear-selection]")?.addEventListener("click", () => {
    adminState.selected.clear();
    renderAdminProducts();
  });

  document.querySelector("[data-admin-delete-selected]")?.addEventListener("click", () => {
    const ids = [...adminState.selected].filter((id) => products.some((product) => product.id === id));
    if (!ids.length) {
      productMessage.textContent = "Keine Produkte ausgewählt.";
      return;
    }
    const ok = window.confirm(`${ids.length} ausgewählte Produkte wirklich löschen?`);
    if (!ok) return;
    products = products.filter((product) => !ids.includes(product.id));
    wishlist = wishlist.filter((productId) => !ids.includes(productId));
    adminState.selected.clear();
    writeJson(storageKey, products);
    writeJson(wishlistKey, wishlist);
    productMessage.textContent = `${ids.length} Produkte wurden gelöscht.`;
    renderProducts();
    renderWishlist();
    renderAdminProducts();
    updateWishlistCounter();
  });

  document.querySelector("[data-admin-scroll-top]")?.addEventListener("click", () => {
    const scrollTarget = document.querySelector("#adminProducts");
    scrollTarget?.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector(".admin-list-head")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelector(".admin-category-picker")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-product-category-choice]");
    if (!button || !productForm?.elements.category) return;
    productForm.elements.category.value = button.dataset.productCategoryChoice;
    updateBrandSelect();
    syncProductCategoryPicker();
  });

  productForm?.elements.category?.addEventListener("change", (event) => {
    updateBrandSelect();
    syncProductCategoryPicker();
  });

  productForm?.elements.brand?.addEventListener("change", () => {
    syncCustomBrandField();
  });

  document.body.addEventListener("click", (event) => {
    const target = event.target.closest("[data-inquiry], [data-wishlist], [data-filter-category], [data-filter-brand], [data-close-inquiry], [data-close-appointment], [data-history-back], [data-appointment]");
    const appointmentTrigger = event.target.closest("a, button, article");
    if (appointmentTrigger && !target && /termin/i.test(appointmentTrigger.textContent || "")) {
      event.preventDefault();
      openAppointmentDialog();
      return;
    }
    if (!target) return;
    const inquiryId = target.dataset.inquiry;
    const wishId = target.dataset.wishlist;
    const filterCategory = target.dataset.filterCategory;
    const filterBrand = target.dataset.filterBrand ? decodeURIComponent(target.dataset.filterBrand) : undefined;
    if (target.dataset.appointment !== undefined) {
      event.preventDefault();
      openAppointmentDialog();
    }
    if (inquiryId) openInquiry(inquiryId);
    if (filterCategory) {
      const currentPageCategory = pageCategory();
      if (currentPageCategory !== "all" && filterCategory !== currentPageCategory) {
        const targetPage = filterCategory === "Uhren" ? "uhren.html#katalog" : filterCategory === "Anlässe" ? "anlaesse.html#katalog" : filterCategory === "Schmuck" ? "schmuck.html#katalog" : "index.html#katalog";
        window.location.href = targetPage;
        return;
      }
      const currentCategory = activeCategory();
      const currentOpenCategory = catalogState.openCategory === "auto" ? currentCategory : catalogState.openCategory;
      if (filterCategory === currentCategory) {
        catalogState.openCategory = currentOpenCategory === filterCategory ? "" : filterCategory;
        renderCatalogFilters();
        return;
      }
      if (categoryFilter) categoryFilter.value = filterCategory;
      catalogState.openCategory = filterCategory;
      catalogState.brand = "all";
      Object.keys(visibleCount).forEach((key) => delete visibleCount[key]);
      renderProducts();
    }
    if (filterBrand) {
      catalogState.brand = filterBrand;
      Object.keys(visibleCount).forEach((key) => delete visibleCount[key]);
      renderProducts();
    }
    if (wishId) {
      wishlist = wishlist.includes(wishId)
        ? wishlist.filter((id) => id !== wishId)
        : [...wishlist, wishId];
      writeJson(wishlistKey, wishlist);
      renderProducts();
      renderWishlist();
      updateWishlistCounter();
    }
    if (target.matches("[data-close-inquiry]")) {
      document.querySelector("#inquiryDialog")?.close();
    }
    if (target.matches("[data-close-appointment]")) {
      document.querySelector("#appointmentDialog")?.close();
    }
    if (target.matches("[data-history-back]")) {
      if (window.history.length > 1) window.history.back();
      else window.location.href = "index.html";
    }
  });

  document.body.addEventListener("submit", (event) => {
    if (event.target.id === "inquiryForm") {
      event.preventDefault();
      submitEmailForm(event.target, document.querySelector("#inquiryMessage"), "Danke, Ihre Anfrage wurde gesendet.")
        .catch(() => {
          document.querySelector("#inquiryMessage").textContent = "Senden war nicht möglich. Bitte rufen Sie uns unter 01 5454176 an.";
        });
    }
    if (event.target.id === "appointmentForm") {
      event.preventDefault();
      const output = document.querySelector("#appointmentMessage");
      if (!document.querySelector("#appointmentTimeField")?.value) {
        output.textContent = "Bitte wählen Sie eine Uhrzeit aus.";
        return;
      }
      submitEmailForm(event.target, output, "Danke, Ihre Terminanfrage wurde gesendet.")
        .catch(() => {
          output.textContent = "Senden war nicht möglich. Bitte rufen Sie uns unter 01 5454176 an.";
        });
    }
  });

  searchInput?.addEventListener("input", renderProducts);
  categoryFilter?.addEventListener("change", () => {
    Object.keys(visibleCount).forEach((key) => delete visibleCount[key]);
    renderProducts();
  });

  document.querySelector("[data-scroll-search]")?.addEventListener("click", () => {
    document.querySelector("#katalog")?.scrollIntoView({ behavior: "smooth" });
    searchInput?.focus({ preventScroll: true });
  });

  document.querySelector(".menu-toggle")?.addEventListener("click", (event) => {
    const isOpen = nav.classList.toggle("open");
    event.currentTarget.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".hero-dots button").forEach((button) => {
    button.addEventListener("click", () => setSlide(Number(button.dataset.slide)));
  });

  document.querySelector(".newsletter-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.reset();
  });

  document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const output = event.currentTarget.querySelector("output") || document.createElement("output");
    if (!output.parentElement) event.currentTarget.append(output);
    submitEmailForm(event.currentTarget, output, "Danke, Ihre Nachricht wurde gesendet.")
      .catch(() => {
        output.textContent = "Senden war nicht möglich. Bitte rufen Sie uns unter 01 5454176 an.";
      });
  });
}

function setSlide(index) {
  const slides = document.querySelectorAll(".hero-slide");
  if (!slides.length) return;
  currentSlide = index;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentSlide);
  });
  document.querySelectorAll(".hero-dots button").forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === currentSlide);
  });
}

wireEvents();
ensureInquiryDialog();
renderProducts();
renderWishlist();
renderProductDetail();
renderAdminProducts();
updateWishlistCounter();

if (window.location.hash === "#admin" && adminDialog) {
  showAdminState();
  adminDialog.showModal();
}

if (document.querySelectorAll(".hero-slide").length) {
  setInterval(() => {
    const slideCount = document.querySelectorAll(".hero-slide").length;
    setSlide((currentSlide + 1) % slideCount);
  }, 6500);
}
