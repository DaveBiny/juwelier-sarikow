const defaultProducts = [
  {
    id: "ring-aurora",
    name: "Ring Aurora",
    brand: "Sarikow Diamonds",
    category: "Schmuck",
    price: 4290,
    description: "Gelbgold mit brillantem Mittelstein, fein poliert und klassisch gefasst.",
    specs: "Material: 750 Gelbgold\nStein: Brillant\nFassung: Krappenfassung\nVerfuegbarkeit: auf Anfrage",
    image: "assets/optimized/full/01rueschpartnerringe02-fda5387e.jpg",
    thumb: "assets/optimized/thumbs/01rueschpartnerringe02-fda5387e.jpg"
  },
  {
    id: "ring-selene",
    name: "Ring Selene",
    brand: "Sarikow Diamonds",
    category: "Anlässe",
    price: 8960,
    description: "Elegante Fassung fuer Verlobung, Jubilaeum und bleibende Erinnerungen.",
    specs: "Material: Platin\nStein: Diamant\nAnlass: Verlobung\nVerfuegbarkeit: auf Anfrage",
    image: "assets/optimized/full/03451-paar-k-w-200-rg-a35f9e1e.jpg",
    thumb: "assets/optimized/thumbs/03451-paar-k-w-200-rg-a35f9e1e.jpg"
  },
  {
    id: "creolen-livia",
    name: "Creolen Livia",
    brand: "Linea Oro",
    category: "Schmuck",
    price: 2350,
    description: "Feine Creolen mit warmem Goldton und zeitloser Silhouette.",
    specs: "Material: 750 Gelbgold\nOberflaeche: poliert\nVerschluss: Steckverschluss\nVerfuegbarkeit: lagernd auf Anfrage",
    image: "assets/optimized/full/1-1-4258ab30.jpg",
    thumb: "assets/optimized/thumbs/1-1-4258ab30.jpg"
  },
  {
    id: "chronograph-nova",
    name: "Chronograph Nova",
    brand: "Chrona",
    category: "Uhren",
    price: 5750,
    description: "Mechanische Uhr mit klarem Zifferblatt, poliertem Gehaeuse und Lederband.",
    specs: "Gehaeuse: Edelstahl\nUhrwerk: Automatik\nArmband: Leder\nWasserdichtheit: 5 bar",
    image: "assets/optimized/full/fc-200s1s36b3-88970a24.jpg",
    thumb: "assets/optimized/thumbs/fc-200s1s36b3-88970a24.jpg"
  },
  {
    id: "tennisarmband-etoile",
    name: "Tennisarmband Etoile",
    brand: "Valere",
    category: "Schmuck",
    price: 11750,
    description: "Brillanten in harmonischer Linie, sicher gefasst und sehr angenehm zu tragen.",
    specs: "Material: Weissgold\nSteine: Brillanten\nVerschluss: Kastenschloss\nVerfuegbarkeit: auf Anfrage",
    image: "assets/optimized/full/23-30330-46a8d213.jpg",
    thumb: "assets/optimized/thumbs/23-30330-46a8d213.jpg"
  },
  {
    id: "collier-marina",
    name: "Collier Marina",
    brand: "Maison Lune",
    category: "Anlässe",
    price: 3290,
    description: "Zarte Kette mit glaenzendem Anhaenger fuer festliche und persoenliche Momente.",
    specs: "Material: Rosegold\nLaenge: 42 cm\nAnhaenger: poliert\nVerfuegbarkeit: auf Anfrage",
    image: "assets/optimized/full/021433-1500-ad7d82e3.jpg",
    thumb: "assets/optimized/thumbs/021433-1500-ad7d82e3.jpg"
  },
  {
    id: "automatik-orion",
    name: "Automatik Orion",
    brand: "Nordstern",
    category: "Uhren",
    price: 6420,
    description: "Zeitmesser mit fein gearbeiteter Luenette und ruhiger Praesenz am Handgelenk.",
    specs: "Gehaeuse: Edelstahl\nUhrwerk: Automatik\nArmband: Edelstahl\nZifferblatt: Blau",
    image: "assets/optimized/full/awg-m100a-1aer-316b2306.jpg",
    thumb: "assets/optimized/thumbs/awg-m100a-1aer-316b2306.jpg"
  },
  {
    id: "ohrringe-perla",
    name: "Ohrringe Perla",
    brand: "Aurielle",
    category: "Schmuck",
    price: 1890,
    description: "Klassische Form mit sanftem Schimmer und dezentem Auftritt.",
    specs: "Material: 585 Gelbgold\nStein: Perlmutt\nVerschluss: Steckverschluss\nVerfuegbarkeit: auf Anfrage",
    image: "assets/optimized/full/1-3-e52ca634.jpg",
    thumb: "assets/optimized/thumbs/1-3-e52ca634.jpg"
  }
];

const storageKey = "juwelier-products";
const sessionKey = "juwelier-admin";
const wishlistKey = "juwelier-wishlist";
const visibleCount = {};
const catalogState = {
  brand: "all"
};

function normalizeFilter(value) {
  return String(value || "").trim().toLowerCase();
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
  if (imported.length) {
    const importedIds = new Set(imported.map((product) => product.id));
    const customProducts = Array.isArray(saved)
      ? saved.filter((product) => !importedIds.has(product.id) && !defaultProducts.some((item) => item.id === product.id))
      : [];
    const merged = [...imported, ...customProducts].map((product) => ({ specs: "", ...product }));
    writeJson(storageKey, merged);
    return merged;
  }
  if (Array.isArray(saved) && saved.length) {
    return saved.map((product) => ({ specs: "", ...product }));
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
    const inBrand = catalogState.brand === "all" || normalizeFilter(product.brand) === normalizeFilter(catalogState.brand);
    const haystack = `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
    return inCategory && inBrand && haystack.includes(query);
  });
}

function activeCategoryForGrid(category = "all") {
  return categoryFilter?.value || category;
}

function productCard(product) {
  return `
    <article class="product-card">
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
  const brands = Object.keys(grouped).sort((a, b) => grouped[b].length - grouped[a].length || a.localeCompare(b, "de"));

  grid.innerHTML = brands
    .map((brand) => {
      const brandItems = grouped[brand].slice(0, 8);
      return `
        <section class="brand-product-section">
          <div class="brand-product-head">
            <div>
              <p>${category === "all" ? "Marke" : category}</p>
              <h3>${brand}</h3>
              <span>${grouped[brand].length} Produkte</span>
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

function renderProducts() {
  document.querySelectorAll("[data-product-grid]").forEach((grid) => {
    const category = grid.dataset.category || "all";
    const key = `${activeCategoryForGrid(category)}-${catalogState.brand}-${grid.dataset.limit || "auto"}`;
    const defaultLimit = Number(grid.dataset.limit || 24);
    const shown = visibleCount[key] || defaultLimit;
    const allItems = filteredProducts(category);
    const items = allItems.slice(0, shown);
    const groupedMode = grid.dataset.groupByBrand === "true" && catalogState.brand === "all" && !searchInput?.value.trim();
    if (groupedMode) {
      renderBrandGroups(grid, activeCategoryForGrid(category), allItems);
    } else {
      grid.innerHTML = items.map(productCard).join("");
    }
    if (!items.length) grid.innerHTML = `<p>Keine Produkte gefunden.</p>`;
    const existingButton = grid.nextElementSibling?.matches?.("[data-load-more]") ? grid.nextElementSibling : null;
    if (existingButton) existingButton.remove();
    if (!groupedMode && allItems.length > shown) {
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
      return inCategory && product[key] === value;
    }).length;
    return acc;
  }, {});
}

function renderCatalogFilters() {
  const target = document.querySelector("[data-catalog-filters]");
  if (!target) return;
  const currentPageCategory = pageCategory();
  const selectedCategory = activeCategory();
  const categories = ["all", "Schmuck", "Uhren", "Anlässe"];
  const categoryCounts = countsFor(categories.filter((category) => category !== "all"), "category");
  categoryCounts.all = products.length;
  const brandCategory = selectedCategory === "all" ? "all" : selectedCategory;
  const brandBase = products.filter((product) => brandCategory === "all" || product.category === brandCategory);
  const brands = [...new Set(brandBase.map((product) => product.brand))].sort((a, b) => a.localeCompare(b, "de"));
  const visibleBrands = brands.slice(0, 18);
  const brandCounts = countsFor(visibleBrands, "brand", brandCategory);

  target.innerHTML = `
    <div class="filter-block">
      <h3>Kategorien</h3>
      <div class="filter-list">
        ${categories
          .map(
            (category) => `
              <button class="${selectedCategory === category ? "active" : ""}" type="button" data-filter-category="${category}">
                <span>${category === "all" ? "Alle" : category}</span>
                <small>${categoryCounts[category] || 0}</small>
              </button>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="filter-block">
      <h3>Marken</h3>
      <div class="filter-list">
        <button class="${catalogState.brand === "all" ? "active" : ""}" type="button" data-filter-brand="all">
          <span>Alle Marken</span>
          <small>${brandBase.length}</small>
        </button>
        ${visibleBrands
          .map(
            (brand) => `
              <button class="${normalizeFilter(catalogState.brand) === normalizeFilter(brand) ? "active" : ""}" type="button" data-filter-brand="${encodeURIComponent(brand)}">
                <span>${brand}</span>
                <small>${brandCounts[brand] || 0}</small>
              </button>
            `
          )
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
      <div class="product-detail-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-detail-copy">
      <p>${product.brand}</p>
      <h1>${product.name}</h1>
      <span class="detail-price">${formatPrice(product.price)}</span>
      <p>${product.description}</p>
      <div class="detail-actions">
        <button class="button dark" type="button" data-inquiry="${product.id}">Anfrage</button>
        <a class="button ghost" href="kontakt.html">Terminvereinbarung</a>
      </div>
      <dl class="spec-list">${specs}</dl>
    </div>
  `;
}

function renderAdminProducts() {
  if (!adminProducts) return;
  adminProducts.innerHTML = products
    .map(
      (product) => `
        <article class="admin-product-row">
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
    .join("");
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
  if (isLoggedIn) renderAdminProducts();
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.size) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function saveProduct(event) {
  event.preventDefault();
  const data = new FormData(productForm);
  const existingId = data.get("id");
  const current = products.find((product) => product.id === existingId);
  const uploadedImage = await fileToDataUrl(data.get("image"));

  const product = {
    id: existingId || `p-${Date.now()}`,
    name: data.get("name").trim(),
    brand: data.get("brand").trim(),
    category: data.get("category"),
    price: Number(data.get("price")),
    description: data.get("description").trim(),
    specs: data.get("specs")?.trim() || current?.specs || "",
    image: uploadedImage || current?.image || defaultProducts[0].image
  };

  products = existingId
    ? products.map((item) => (item.id === existingId ? product : item))
    : [product, ...products];

  writeJson(storageKey, products);
  productForm.reset();
  productForm.elements.id.value = "";
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
  productForm.elements.brand.value = product.brand;
  productForm.elements.category.value = product.category;
  productForm.elements.price.value = product.price;
  productForm.elements.description.value = product.description || "";
  if (productForm.elements.specs) productForm.elements.specs.value = product.specs || "";
  productMessage.textContent = "Produkt ist bereit zur Bearbeitung.";
  productForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteProduct(id) {
  products = products.filter((product) => product.id !== id);
  wishlist = wishlist.filter((productId) => productId !== id);
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
            <label>
              Ihr Name
              <input name="name" required>
            </label>
            <label>
              Ihre E-Mail-Adresse
              <input name="email" type="email" required>
            </label>
            <label>
              Ihre Nachricht
              <textarea name="message" rows="4"></textarea>
            </label>
            <button class="button dark" type="submit">Anfrage vorbereiten</button>
            <output id="inquiryMessage" role="status"></output>
          </form>
        </div>
      </dialog>
    `
  );
}

function openInquiry(productId) {
  ensureInquiryDialog();
  const product = products.find((item) => item.id === productId);
  const dialog = document.querySelector("#inquiryDialog");
  const title = document.querySelector("#inquiryTitle");
  const message = document.querySelector("#inquiryForm textarea");
  title.textContent = product ? `Anfrage zu ${product.name}` : "Produktanfrage";
  message.value = product
    ? `Ich interessiere mich fuer ${product.brand} ${product.name}. Bitte kontaktieren Sie mich.`
    : "";
  dialog.showModal();
}

function wireEvents() {
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
    const valid = data.get("username") === "admin" && data.get("password") === "atelier2026";
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

  document.body.addEventListener("click", (event) => {
    const target = event.target.closest("[data-inquiry], [data-wishlist], [data-filter-category], [data-filter-brand], [data-close-inquiry], [data-history-back]");
    if (!target) return;
    const inquiryId = target.dataset.inquiry;
    const wishId = target.dataset.wishlist;
    const filterCategory = target.dataset.filterCategory;
    const filterBrand = target.dataset.filterBrand ? decodeURIComponent(target.dataset.filterBrand) : undefined;
    if (inquiryId) openInquiry(inquiryId);
    if (filterCategory) {
      const currentPageCategory = pageCategory();
      if (currentPageCategory !== "all" && filterCategory !== currentPageCategory) {
        const targetPage = filterCategory === "Uhren" ? "uhren.html#katalog" : filterCategory === "Anlässe" ? "anlaesse.html#katalog" : filterCategory === "Schmuck" ? "schmuck.html#katalog" : "index.html#katalog";
        window.location.href = targetPage;
        return;
      }
      if (categoryFilter) categoryFilter.value = filterCategory;
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
    if (target.matches("[data-history-back]")) {
      if (window.history.length > 1) window.history.back();
      else window.location.href = "index.html";
    }
  });

  document.body.addEventListener("submit", (event) => {
    if (event.target.id === "inquiryForm") {
      event.preventDefault();
      document.querySelector("#inquiryMessage").textContent =
        "Danke. In der Live-Version wird diese Anfrage per E-Mail versendet.";
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
    event.currentTarget.reset();
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
