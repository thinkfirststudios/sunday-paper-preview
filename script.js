/* =========================================================
   Sunday Paper — v2 storefront
   ---------------------------------------------------------
   PRODUCTS is the line sheet. Replace it with the client's
   final one; nothing else in this file needs to change.

   Every image is one `src`. Leave it '' and the slot renders
   a grey placeholder with a caption at the right proportions.
   Prices are placeholders. [confirm]
   ========================================================= */

const PRODUCTS = [
  {
    id: 'good-part-hoodie',
    name: "Don't Leave Before The Good Part Hoodie",
    short: 'Hoodie',                           // used in placeholder captions
    price: 80,                                 // placeholder [confirm]
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colorways: [
      { id: 'royal-blue',   name: 'Royal Blue',   swatch: '#1f4fd6', soldOut: [],
        images: { front: '', back: '', detail: '' } },
      { id: 'burgundy',     name: 'Burgundy',     swatch: '#8e1b2f', soldOut: [],
        images: { front: '', back: '', detail: '' } },
      { id: 'black',        name: 'Black',        swatch: '#111111', soldOut: [],
        images: { front: '', back: '', detail: '' } },
      // XXL marked sold out only to demo the struck-through state. [confirm]
      { id: 'orange',       name: 'Orange',       swatch: '#d9621e', soldOut: ['XXL'],
        images: { front: '', back: '', detail: '' } },
      { id: 'heather-grey', name: 'Heather Grey', swatch: '#9a9a97', soldOut: [],
        images: {
          front:  'assets/photos/good-part-hoodie-grey-front.jpg',
          back:   'assets/photos/good-part-hoodie-grey-back.jpg',
          detail: 'assets/photos/good-part-hoodie-grey-detail.jpg'
        } }
    ]
  },
  {
    id: 'cap',
    name: 'Sunday Paper Cap',
    short: 'Cap',
    price: 35,                                 // placeholder [confirm]
    sizes: ['One Size'],
    colorways: [
      { id: 'black', name: 'Black', swatch: '#111111', soldOut: [],
        images: {
          front:  'assets/photos/cap-front.jpg',
          back:   'assets/photos/cap-back.jpg',
          detail: 'assets/photos/cap-detail.jpg'
        } }
    ]
  }
];

const DROP_TITLE = "Don't Leave Before The Good Part";
const SPLASH_SRC = 'assets/photos/drop-campaign.jpg';   // '' for the placeholder

const VIEWS = ['front', 'back', 'detail'];


/* ---------------------------------------------------------
   Helpers
   --------------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

const money = (n) => '$' + n.toLocaleString('en-US');

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FADE_MS = 300;

function findProduct(pid) { return PRODUCTS.find((p) => p.id === pid); }
function findColorway(p, cid) { return p && (p.colorways.find((c) => c.id === cid) || p.colorways[0]); }

function tileTitle(p, c) { return `${p.name} - ${c.name}`; }

/* One image slot: grey block + caption, with the photo layered on top if there is one. */
function media({ id, caption, src, alt = '', cover = false }) {
  const cls = ['slot', cover && 'slot--cover', src && 'has-img'].filter(Boolean).join(' ');
  const img = src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : '';
  const role = src ? '' : ` role="img" aria-label="${esc(`Photo placeholder: ${caption}`)}"`;
  return `<div class="${cls}" data-slot="${id}"${role}><span class="slot__cap">${esc(caption)}</span>${img}</div>`;
}

/* Product slots are 4:5. Detail shots are close crops, so they fill the tile. */
function slot(p, c, view, { cover = view === 'detail' } = {}) {
  return media({
    id: `${p.id}--${c.id}--${view}`,
    caption: `${p.short} / ${c.name} — ${view} — 4:5`,
    src: c.images[view],
    alt: `${tileTitle(p, c)}, ${view}`,
    cover
  });
}

/* A broken photo falls back to its placeholder instead of an empty box. */
document.addEventListener('error', (e) => {
  const img = e.target;
  if (img.tagName !== 'IMG') return;
  const box = img.closest('.slot');
  if (!box) return;
  box.classList.remove('has-img');
  img.remove();
}, true);


/* ---------------------------------------------------------
   Storage (per-browser convenience only)
   --------------------------------------------------------- */
const CART_KEY = 'sp-cart-v2';

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const items = raw ? JSON.parse(raw) : [];
    return Array.isArray(items) ? items.filter((i) => findProduct(i.pid)) : [];
  } catch (err) { return []; }
}
function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (err) { /* private mode */ }
}

let cart = loadCart();


/* ---------------------------------------------------------
   Views
   --------------------------------------------------------- */
const view = $('#view');

function allTiles() {
  return PRODUCTS.flatMap((p) => p.colorways.map((c) => ({ p, c })));
}

function tileHTML({ p, c }) {
  return `
    <li>
      <a class="tile" href="#/product/${p.id}/${c.id}">
        <div class="tile__media" aria-hidden="true">${slot(p, c, 'front', { cover: false })}${slot(p, c, 'back', { cover: false })}</div>
        <p class="tile__name">${esc(tileTitle(p, c))}</p>
        <p class="tile__price">${money(p.price)}</p>
      </a>
    </li>`;
}

function renderShop() {
  document.title = 'Sunday Paper';
  view.innerHTML = `
    <div class="fade-in">
      <h1 class="collection__title">${esc(DROP_TITLE)}</h1>
      <div class="wrap"><ul class="grid">${allTiles().map(tileHTML).join('')}</ul></div>
    </div>`;
}

/* product page state survives a colorway switch */
let pdp = { pid: null, size: null };

function renderProduct(pid, cid) {
  const p = findProduct(pid);
  if (!p) return renderShop();
  const c = findColorway(p, cid);

  if (pdp.pid !== p.id) pdp = { pid: p.id, size: null };
  if (p.sizes.length === 1) pdp.size = p.sizes[0];
  if (c.soldOut.includes(pdp.size)) pdp.size = null;

  document.title = `${tileTitle(p, c)} — Sunday Paper`;

  const swatches = p.colorways.map((cw) => {
    const light = ['#ffffff', '#f1f1f1'].includes(cw.swatch.toLowerCase());
    return `<button type="button" class="swatch${light ? ' swatch--light' : ''}" data-cw="${cw.id}"
      aria-pressed="${cw.id === c.id}" aria-label="${esc(cw.name)}" title="${esc(cw.name)}"
      style="--c:${cw.swatch}"><span></span></button>`;
  }).join('');

  const sizes = p.sizes.map((s) => {
    const out = c.soldOut.includes(s);
    return `<button type="button" class="size" data-size="${esc(s)}" aria-pressed="${s === pdp.size}"
      ${out ? `disabled aria-label="${esc(s)}, sold out"` : ''}>${esc(s)}</button>`;
  }).join('');

  view.innerHTML = `
    <div class="wrap product fade-in">
      <div class="product__media">${VIEWS.map((v) => slot(p, c, v)).join('')}</div>

      <div class="panel">
        <h1 class="panel__name">${esc(p.name)}</h1>
        <p class="panel__price">${money(p.price)}</p>

        <div class="panel__group">
          <p class="panel__label">Colorway <b>${esc(c.name)}</b></p>
          <div class="swatches">${swatches}</div>
        </div>

        <div class="panel__group">
          <p class="panel__label">Size <b id="sizeChosen">${esc(pdp.size || '')}</b></p>
          <div class="sizes">${sizes}</div>
        </div>

        <button class="btn" id="addBtn" type="button">Add to cart</button>
        <p class="panel__msg" id="addMsg" role="status"></p>

        <details class="acc">
          <summary>Details</summary>
          <div class="acc__body">
            <p><span class="confirm">Confirm</span></p>
            <p>Fabric, weight, fit and care instructions from the line sheet.</p>
          </div>
        </details>
        <details class="acc">
          <summary>Size guide</summary>
          <div class="acc__body">
            <p><span class="confirm">Confirm</span></p>
            <p>Chest and length measurements for each size from the line sheet.</p>
          </div>
        </details>
      </div>
    </div>`;

  $$('.swatch', view).forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.cw === c.id) return;
    history.replaceState(null, '', `#/product/${p.id}/${b.dataset.cw}`);
    renderProduct(p.id, b.dataset.cw);
    const again = $(`.swatch[data-cw="${b.dataset.cw}"]`, view);
    if (again) again.focus();
  }));

  $$('.size', view).forEach((b) => b.addEventListener('click', () => {
    pdp.size = b.dataset.size;
    $$('.size', view).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    $('#sizeChosen').textContent = pdp.size;
    $('#addMsg').textContent = '';
  }));

  $('#addBtn').addEventListener('click', () => {
    if (!pdp.size) { $('#addMsg').textContent = 'Select a size.'; return; }
    addToCart(p.id, c.id, pdp.size);
    $('#addMsg').textContent = '';
    openCart();
  });
}

function renderAbout() {
  document.title = 'About — Sunday Paper';
  view.innerHTML = `
    <article class="page fade-in">
      <h1 class="page__title">The content you consume matters</h1>
      <p><span class="confirm">Placeholder — copy from Sunday Paper</span></p>
      <p>Two or three short paragraphs from the client go here: who is behind the label, why it exists, and what the first drop means.</p>
    </article>`;
}

const INFO = {
  shipping: { title: 'Shipping', body: 'Rates, processing time and where we ship.' },
  returns:  { title: 'Returns',  body: 'The return window, condition and how to start a return.' },
  contact:  { title: 'Contact',  body: 'Support email to be added. Until then, message us on <a href="https://instagram.com/sundaypaper_clo" target="_blank" rel="noopener">Instagram @sundaypaper_clo</a> or <a href="https://tiktok.com/@sundaypaper_co" target="_blank" rel="noopener">TikTok @sundaypaper_co</a>.' },
  terms:    { title: 'Terms',    body: 'Drafted from how the store actually works once checkout is chosen, then reviewed by Sunday Paper before launch.' },
  privacy:  { title: 'Privacy',  body: 'Drafted from the real checkout, email and analytics providers once they are chosen, then reviewed before launch.' }
};

function renderInfo(key) {
  const page = INFO[key];
  if (!page) return renderShop();
  document.title = `${page.title} — Sunday Paper`;
  view.innerHTML = `
    <article class="page fade-in">
      <h1 class="page__title">${page.title}</h1>
      <p><span class="confirm">Confirm</span></p>
      <p>${page.body}</p>
    </article>`;
}


/* ---------------------------------------------------------
   Router
   --------------------------------------------------------- */
function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const [section, a, b] = parts;

  if (section === 'product') renderProduct(a, b);
  else if (section === 'about') renderAbout();
  else if (section === 'info') renderInfo(a);
  else renderShop();

  const current = section === 'about' ? 'about' : (section === 'info' ? '' : 'shop');
  $$('[data-nav]').forEach((l) => {
    if (l.dataset.nav === current) l.setAttribute('aria-current', 'page');
    else l.removeAttribute('aria-current');
  });
}

window.addEventListener('hashchange', () => {
  closeSearch(false);
  closeCart(false);
  route();
  window.scrollTo(0, 0);
  view.focus({ preventScroll: true });
});


/* ---------------------------------------------------------
   Splash
   --------------------------------------------------------- */
const splash = $('#splash');
const site = $('#site');

function showSplash() {
  $('#splashMedia').innerHTML = media({
    id: 'splash--campaign',
    caption: 'Splash — Campaign — Fullscreen',
    src: SPLASH_SRC,
    cover: true
  });

  splash.hidden = false;
  site.inert = true;
  document.body.classList.add('is-locked');
}

function leaveSplash() {
  history.replaceState(null, '', '#/shop');
  route();
  splash.classList.add('is-leaving');
  site.inert = false;
  document.body.classList.remove('is-locked');
  window.setTimeout(() => {
    splash.hidden = true;
    $('#splashMedia').innerHTML = '';
    view.focus({ preventScroll: true });
  }, reducedMotion() ? 0 : FADE_MS);
}

$('#splashShop').addEventListener('click', leaveSplash);


/* ---------------------------------------------------------
   Search
   --------------------------------------------------------- */
const search = $('#search');
const searchInput = $('#searchInput');
const searchToggle = $('#searchToggle');

function openSearch() {
  search.hidden = false;
  searchToggle.setAttribute('aria-expanded', 'true');
  searchInput.focus();
}
function closeSearch(returnFocus = true) {
  if (search.hidden) return;
  search.hidden = true;
  searchInput.value = '';
  $('#searchResults').innerHTML = '';
  searchToggle.setAttribute('aria-expanded', 'false');
  if (returnFocus) searchToggle.focus();
}

searchToggle.addEventListener('click', () => (search.hidden ? openSearch() : closeSearch()));
$('#searchClose').addEventListener('click', () => closeSearch());

searchInput.addEventListener('input', () => {
  const words = searchInput.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const out = $('#searchResults');
  if (!words.length) { out.innerHTML = ''; return; }
  const hits = allTiles().filter(({ p, c }) => {
    const hay = `${p.name} ${c.name} ${p.short}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
  out.innerHTML = hits.length
    ? `<ul class="grid">${hits.map(tileHTML).join('')}</ul>`
    : '<p class="empty">No results</p>';
});


/* ---------------------------------------------------------
   Cart
   --------------------------------------------------------- */
const cartEl = $('#cart');
const scrim = $('#scrim');
const cartToggle = $('#cartToggle');

function addToCart(pid, cid, size) {
  const line = cart.find((i) => i.pid === pid && i.cid === cid && i.size === size);
  if (line) line.qty += 1;
  else cart.push({ pid, cid, size, qty: 1 });
  saveCart();
  renderCart();
}

function renderCart() {
  const count = cart.reduce((n, i) => n + i.qty, 0);
  $('#cartCount').textContent = count;
  $('#cartCountDrawer').textContent = count;

  let subtotal = 0;
  const lines = cart.map((item, idx) => {
    const p = findProduct(item.pid);
    const c = findColorway(p, item.cid);
    subtotal += p.price * item.qty;
    return `
      <div class="line">
        <a href="#/product/${p.id}/${c.id}" aria-hidden="true" tabindex="-1">${slot(p, c, 'front', { cover: false })}</a>
        <div>
          <p class="line__name">${esc(p.name)}</p>
          <p class="line__meta">${esc(c.name)} / ${esc(item.size)}</p>
          <div class="line__row">
            <div class="qty">
              <button type="button" data-dec="${idx}" aria-label="Decrease quantity">−</button>
              <span aria-label="Quantity">${item.qty}</span>
              <button type="button" data-inc="${idx}" aria-label="Increase quantity">+</button>
            </div>
            <span>${money(p.price * item.qty)}</span>
          </div>
          <button type="button" class="text-btn line__remove" data-remove="${idx}">Remove</button>
        </div>
      </div>`;
  }).join('');

  $('#cartItems').innerHTML = lines || '<p class="empty">Your cart is empty</p>';
  $('#cartSubtotal').textContent = money(subtotal);
  $('#checkoutMsg').textContent = '';
}

$('#cartItems').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const { inc, dec, remove } = btn.dataset;
  if (inc !== undefined) cart[inc].qty += 1;
  if (dec !== undefined) { cart[dec].qty -= 1; if (cart[dec].qty < 1) cart.splice(dec, 1); }
  if (remove !== undefined) cart.splice(remove, 1);
  saveCart();
  renderCart();
  const again = inc !== undefined ? $(`[data-inc="${inc}"]`) : (dec !== undefined ? $(`[data-dec="${dec}"]`) : null);
  (again || $('#cartClose')).focus();
});

function openCart() {
  closeSearch(false);
  scrim.hidden = false;
  cartEl.inert = false;
  cartEl.setAttribute('aria-hidden', 'false');
  site.inert = true;
  document.body.classList.add('is-locked');
  cartToggle.setAttribute('aria-expanded', 'true');
  requestAnimationFrame(() => {
    scrim.classList.add('is-open');
    cartEl.classList.add('is-open');
  });
  $('#cartClose').focus({ preventScroll: true });
}

function closeCart(returnFocus = true) {
  if (!cartEl.classList.contains('is-open')) return;
  scrim.classList.remove('is-open');
  cartEl.classList.remove('is-open');
  cartEl.setAttribute('aria-hidden', 'true');
  cartEl.inert = true;
  site.inert = false;
  document.body.classList.remove('is-locked');
  cartToggle.setAttribute('aria-expanded', 'false');
  window.setTimeout(() => { scrim.hidden = true; }, reducedMotion() ? 0 : FADE_MS);
  if (returnFocus) cartToggle.focus();
}

cartToggle.addEventListener('click', openCart);
$('#cartClose').addEventListener('click', () => closeCart());
scrim.addEventListener('click', () => closeCart());

$('#checkoutBtn').addEventListener('click', () => {
  $('#checkoutMsg').textContent = cart.length
    ? 'Checkout is not connected in this preview.'
    : 'Your cart is empty.';
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (cartEl.classList.contains('is-open')) closeCart();
  else if (!search.hidden) closeSearch();
});


/* ---------------------------------------------------------
   Email signup (no provider yet)
   --------------------------------------------------------- */
$('#signup').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = $('#signupEmail');
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
  $('#signupMsg').textContent = ok ? "Thanks. You're on the list." : 'Enter a valid email.';
  if (ok) input.value = '';
});


/* ---------------------------------------------------------
   Boot
   --------------------------------------------------------- */
renderCart();
route();

const bareEntry = !location.hash || location.hash === '#' || location.hash === '#/';
if (bareEntry) showSplash();
