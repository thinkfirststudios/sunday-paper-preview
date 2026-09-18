/* ============================================================
   SUNDAY PAPER — storefront prototype
   ------------------------------------------------------------
   EVERYTHING THE CLIENT NEEDS TO EDIT IS IN THIS FIRST BLOCK:
     1. DROP        — countdown target for the locked page
     2. IMAGES      — editorial / campaign photo slots
     3. PRODUCTS    — the line sheet (names, prices, colorways,
                      sizes, product photo slots, copy)
   To drop in a real photo: put the file in assets/photos/ and set
   that slot's `src`. Nothing else changes — the layout already
   reserves the right aspect ratio.
   ============================================================ */

/* ---- 1. DROP ------------------------------------------------ */
const DROP = {
  label: 'Issue 01 Drops',
  // [confirm] real drop date. Demo value = 12 days out at 7:00pm local.
  date: (() => { const d = new Date(); d.setDate(d.getDate() + 12); d.setHours(19, 0, 0, 0); return d; })()
};

/* ---- 2. IMAGES (editorial slots) ----------------------------
   Slots with a `src` are filled with the client's own photography.
   Slots with an empty `src` still render as a captioned placeholder
   block — the caption is the shot we still need from them.         */
const IMAGES = {
  campaignHero: {
    id: 'campaign-hero',
    caption: 'Campaign / front page hero — full rack, all five colorways',
    ratio: '3/1',
    px: '2400 × 800',
    src: 'assets/photos/campaign-hero.jpg'
  },
  leadStory: {
    id: 'lead-story',
    caption: "Product — good part hoodie front + back / grey",
    ratio: '21/9',
    px: '2400 × 1029',
    src: 'assets/photos/good-part-hoodie-grey-pair-wide.jpg'
  },
  aboutPortrait: {
    id: 'about-portrait',
    caption: 'Portrait / studio — founder or press shot',
    ratio: '4/5',
    px: '1200 × 1500',
    src: ''
  },
  lockedCampaign: {
    id: 'drop-campaign',
    caption: 'Campaign / locked drop — vertical',
    ratio: '4/5',
    px: '1080 × 1350',
    src: 'assets/photos/drop-campaign.jpg'
  }
};

/* ---- 3. PRODUCTS (the line sheet) --------------------------- */
const SIZES_APPAREL = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const SHIPPING_COPY = 'Orders ship in 2–4 business days from [confirm: city, state]. Tracking is emailed as soon as the label prints. Free shipping over $100 [confirm]. Returns accepted within 30 days, unworn, tags on [confirm].';

const PRODUCTS = [
  {
    id: 'good-part-hoodie',
    name: "Don't Leave Before The Good Part Hoodie",
    price: 88,
    category: 'hoodies',
    isNew: true,
    /* Heather grey leads because it is the colorway that has been shot.
       The other four still render as captioned placeholders — that doubles
       as the shot list for the rest of the drop. */
    colorways: [
      { name: 'Heather Grey', hex: '#9a9a97' },
      { name: 'Royal Blue', hex: '#1d3faa' },
      { name: 'Burgundy', hex: '#6b1f2b' },
      { name: 'Black', hex: '#141414' },
      { name: 'Orange', hex: '#d4571f' }
    ],
    sizes: SIZES_APPAREL.map(s => ({ label: s, soldOut: s === 'L' })),
    images: [
      { id: 'good-part-hoodie-front', caption: 'Product — good part hoodie front / {color}', ratio: '3/4', px: '1600 × 2133', src: '' },
      { id: 'good-part-hoodie-back', caption: 'Product — good part hoodie back / {color}', ratio: '3/4', px: '1600 × 2133', src: '' },
      { id: 'good-part-hoodie-detail', caption: 'Detail — back print crop / {color}', ratio: '3/2', px: '1600 × 1066', src: '' }
    ],
    /* real photography, per colorway, in the same order as `images` */
    photos: {
      'Heather Grey': [
        'assets/photos/good-part-hoodie-grey-front.jpg',
        'assets/photos/good-part-hoodie-grey-back.jpg',
        'assets/photos/good-part-hoodie-grey-detail.jpg'
      ]
    },
    description: 'Heavyweight fleece hoodie carrying the first issue front and back. Front print small on the chest, the full story printed large across the back.',
    fit: 'Unisex, relaxed. Model wears M [confirm]. Weight and blend to be confirmed with the supplier [confirm].'
  },
  {
    id: 'varsity-hoodie',
    name: 'Sunday Paper Varsity Hoodie',
    price: 84,
    category: 'hoodies',
    isNew: true,
    colorways: [{ name: 'Heather Grey', hex: '#9a9a97' }],
    sizes: SIZES_APPAREL.map(s => ({ label: s, soldOut: s === 'M' })),
    images: [
      { id: 'varsity-hoodie-front', caption: 'Product — varsity hoodie front / {color}', ratio: '3/4', px: '1600 × 2133', src: '' },
      { id: 'varsity-hoodie-back', caption: 'Product — varsity hoodie back / {color}', ratio: '3/4', px: '1600 × 2133', src: '' },
      { id: 'varsity-hoodie-detail', caption: 'Detail — chest print crop / {color}', ratio: '3/2', px: '1600 × 1066', src: '' }
    ],
    photos: {
      'Heather Grey': [
        'assets/photos/varsity-hoodie-front.jpg',
        'assets/photos/varsity-hoodie-back.jpg',
        'assets/photos/varsity-hoodie-detail.jpg'
      ]
    },
    description: 'Heather grey fleece with the arched varsity wordmark printed in forest green across the chest.',
    fit: 'Unisex, relaxed. Model wears M [confirm].'
  },
  {
    id: 'sunday-paper-cap',
    name: 'Sunday Paper Cap',
    price: 38,
    category: 'headwear',
    isNew: true,
    colorways: [{ name: 'Black', hex: '#141414' }],
    sizes: [{ label: 'One Size', soldOut: false }],
    images: [
      { id: 'cap-front', caption: 'Product — cap front / white varsity', ratio: '3/4', px: '1600 × 2133', src: '' },
      { id: 'cap-back', caption: 'Product — cap back / good news script', ratio: '3/4', px: '1600 × 2133', src: '' },
      { id: 'cap-detail', caption: 'Detail — embroidery crop', ratio: '3/2', px: '1600 × 1066', src: '' }
    ],
    photos: {
      'Black': [
        'assets/photos/cap-front.jpg',
        'assets/photos/cap-back.jpg',
        'assets/photos/cap-detail.jpg'
      ]
    },
    description: 'Black six-panel with the varsity wordmark on the front and the good news script on the back.',
    fit: 'One size, adjustable strap [confirm].'
  },
  {
    id: 'varsity-tee',
    name: 'Varsity Tee',
    price: 42,
    category: 'tees',
    isNew: true,
    colorways: [
      { name: 'Vintage White', hex: '#efece1' },
      { name: 'Black', hex: '#141414' },
      { name: 'Heather Grey', hex: '#9a9a97' },
      { name: 'Forest Green', hex: '#1f4033' },
      { name: 'Burgundy', hex: '#6b1f2b' },
      { name: 'Sand', hex: '#cdc3ab' }
    ],
    sizes: SIZES_APPAREL.map(s => ({ label: s, soldOut: false })),
    images: [
      { id: 'varsity-tee-front', caption: 'Product — varsity tee front / {color}', ratio: '3/4', px: '1600 × 2133', src: '' },
      { id: 'varsity-tee-back', caption: 'Product — varsity tee back / {color}', ratio: '3/4', px: '1600 × 2133', src: '' },
      { id: 'varsity-tee-detail', caption: 'Detail — print crop / {color}', ratio: '3/4', px: '1600 × 2133', src: '' }
    ],
    description: 'Mid-weight cotton tee with the arched varsity wordmark on the chest.',
    fit: 'Unisex, true to size. Model wears M [confirm].'
  },
  {
    id: 'good-news-tee',
    name: 'Good News Tee',
    price: 36,
    compareAt: 42,
    flag: 'Sale',
    category: 'tees',
    isNew: false,
    colorways: [
      { name: 'Vintage White', hex: '#efece1' },
      { name: 'Heather Grey', hex: '#9a9a97' },
      { name: 'Black', hex: '#141414' }
    ],
    sizes: SIZES_APPAREL.map(s => ({ label: s, soldOut: s === 'XS' })),
    images: [
      { id: 'good-news-tee-front', caption: 'Product — good news tee front / {color}', ratio: '3/4', px: '1600 × 2133', src: '' },
      { id: 'good-news-tee-back', caption: 'Product — good news tee back / {color}', ratio: '3/4', px: '1600 × 2133', src: '' },
      { id: 'good-news-tee-detail', caption: 'Detail — script crop / {color}', ratio: '3/4', px: '1600 × 2133', src: '' }
    ],
    description: 'The good news script printed small on the left chest. Nothing else.',
    fit: 'Unisex, true to size. Model wears M [confirm].'
  },
  {
    id: 'good-news-beanie',
    name: 'Good News Beanie',
    price: 32,
    category: 'headwear',
    isNew: false,
    colorways: [
      { name: 'Forest Green', hex: '#1f4033' },
      { name: 'Black', hex: '#141414' }
    ],
    sizes: [{ label: 'One Size', soldOut: false }],
    images: [
      { id: 'beanie-front', caption: 'Product — beanie front / {color}', ratio: '3/4', px: '1600 × 2133', src: '' },
      { id: 'beanie-back', caption: 'Product — beanie back / {color}', ratio: '3/4', px: '1600 × 2133', src: '' },
      { id: 'beanie-detail', caption: 'Detail — cuff embroidery crop / {color}', ratio: '3/4', px: '1600 × 2133', src: '' }
    ],
    description: 'Ribbed cuffed beanie with the good news script embroidered on the cuff.',
    fit: 'One size [confirm].'
  }
];

/* ---- static page copy --------------------------------------- */
const INFO_PAGES = {
  help: {
    kicker: 'Classifieds',
    title: 'Help',
    body: `<p>Short answers. If yours is not here, write to us and a person will reply.</p>
      <h2>Sizing</h2><p>Everything is unisex and cut relaxed. If you are between sizes, take the smaller one for tees and the larger one for fleece.</p>
      <h2>Order changes</h2><p>We can change an address or cancel an order until the label prints. After that it ships.</p>
      <h2>Restocks</h2><p>Issues are printed once. When a size sells out it is usually gone. Subscribe and you get the next issue first.</p>
      <h2>Wholesale and press</h2><p>Write to us with the details. <em>[confirm: email address]</em></p>`
  },
  shipping: {
    kicker: 'Classifieds',
    title: 'Orders & Shipping',
    body: `<p>Orders ship in 2–4 business days from <em>[confirm: city, state]</em>. You get tracking by email as soon as the label prints.</p>
      <h2>Rates</h2><p>Standard shipping <em>[confirm: rate]</em>. Free over $100 <em>[confirm]</em>. Expedited at checkout <em>[confirm]</em>.</p>
      <h2>International</h2><p><em>[confirm: which countries we ship to, and who pays duties]</em></p>
      <h2>Drops</h2><p>Drop orders ship together once the issue closes. The date is posted on the drop page.</p>`
  },
  returns: {
    kicker: 'Classifieds',
    title: 'Returns',
    body: `<p>30 days, unworn, tags on <em>[confirm]</em>. Start a return by email and we send a label.</p>
      <h2>Exchanges</h2><p>Swap a size while the issue is in stock. If it is gone we refund.</p>
      <h2>Faulty</h2><p>If a print cracks early or a seam gives, tell us. We replace it.</p>
      <h2>Refunds</h2><p>Back to the original payment method within 5–10 business days of delivery to us <em>[confirm]</em>.</p>`
  },
  contact: {
    kicker: 'Classifieds',
    title: 'Contact',
    body: `<p>One inbox, checked daily.</p>
      <h2>Email</h2><p><em>[confirm: hello@sundaypaper.co]</em></p>
      <h2>Instagram</h2><p><a class="text-link" href="https://instagram.com/sundaypaper_clo" target="_blank" rel="noopener">@sundaypaper_clo</a></p>
      <h2>TikTok</h2><p><a class="text-link" href="https://tiktok.com/@sundaypaper_co" target="_blank" rel="noopener">@sundaypaper_co</a></p>
      <h2>Mail</h2><p><em>[confirm: business mailing address]</em></p>`
  },
  terms: {
    kicker: 'Fine Print',
    title: 'Terms',
    body: `<p><em>[confirm: final terms of service to be supplied by the client or their counsel before launch.]</em></p>
      <p>Placeholder outline: use of the site, orders and pricing, payment, shipping and risk of loss, returns, intellectual property in the prints and wordmark, limitation of liability, governing law.</p>`
  },
  privacy: {
    kicker: 'Fine Print',
    title: 'Privacy',
    body: `<p><em>[confirm: final privacy policy to be supplied by the client before launch.]</em></p>
      <p>Placeholder outline: what we collect at checkout and signup, how email and SMS consent works, analytics, cookies, who processes payments, how to unsubscribe, how to ask us to delete your data.</p>`
  }
};

/* ============================================================
   BELOW THIS LINE: behaviour. No content lives here.
   ============================================================ */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const money = n => '$' + n;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const product = id => PRODUCTS.find(p => p.id === id);
const ratioLabel = r => String(r).replace('/', ':');

/* ---------- image slots ---------- */
function imgSlot(img, opts = {}) {
  const ratio = img.ratio || '3/4';
  const color = opts.color ? String(opts.color) : '';
  const caption = String(img.caption || '').replace('{color}', color || 'colorway');
  const text = `${caption} — ${ratioLabel(ratio)}`;
  if (img.src) {
    return `<div class="image-slot" style="--ratio:${ratio}" data-slot="${img.id}">
      <img src="${esc(img.src)}" alt="${esc(opts.alt || caption)}" loading="${opts.eager ? 'eager' : 'lazy'}">
    </div>`;
  }
  return `<div class="image-slot" style="--ratio:${ratio}" data-slot="${img.id}" role="img" aria-label="${esc(text)}">
    <span class="image-slot__cap">${esc(text)}</span>
  </div>`;
}

/* Returns image `i` for a product in a given colorway. If that colorway has
   been photographed, the real file is used; otherwise the slot falls back to
   its captioned placeholder. */
function productImage(p, i, color) {
  const base = p.images[i];
  if (!base) return null;
  const shot = p.photos && p.photos[color] && p.photos[color][i];
  return shot ? Object.assign({}, base, { src: shot }) : base;
}

/* ---------- state ---------- */
const state = {
  cart: [],
  wishlist: new Set(),
  filters: { category: 'all', colors: new Set(), sort: 'featured' },
  pdp: {}
};

/* ============================================================
   TILE
   ============================================================ */
function tile(p) {
  const flag = p.flag
    ? `<span class="tile__flag tile__flag--sale">${esc(p.flag)}</span>`
    : (p.isNew ? `<span class="tile__flag">New</span>` : '');
  const shown = p.colorways.slice(0, 5);
  const extra = p.colorways.length - shown.length;
  const swatches = shown.map(c => `<span class="swatch" style="background:${c.hex}" title="${esc(c.name)}"></span>`).join('') +
    (extra > 0 ? `<span class="swatch swatch--more">+${extra}</span>` : '');
  const dots = p.images.map((_, i) => `<button class="tile__dot${i === 0 ? ' is-on' : ''}" data-action="dot" data-i="${i}" aria-label="View image ${i + 1}"></button>`).join('');
  const starred = state.wishlist.has(p.id);
  const price = p.compareAt
    ? `${money(p.price)} <s style="opacity:.5">${money(p.compareAt)}</s>`
    : money(p.price);

  return `<article class="tile" data-id="${p.id}">
    <div class="tile__media" data-media>
      ${flag}
      <button class="tile__star" data-action="star" aria-pressed="${starred}" aria-label="Save ${esc(p.name)}">
        <svg viewBox="0 0 20 20" aria-hidden="true"><polygon points="10,2 12.4,7.4 18,8.1 13.9,12 15,17.6 10,14.8 5,17.6 6.1,12 2,8.1 7.6,7.4"></polygon></svg>
      </button>
      <a href="#/product/${p.id}" aria-label="${esc(p.name)}" data-slot-host>${imgSlot(productImage(p, 0, p.colorways[0].name), { color: p.colorways[0].name, alt: p.name })}</a>
      <button class="tile__add" data-action="quick-add" aria-label="Quick add ${esc(p.name)}">+</button>
      <div class="tile__dots">${dots}</div>
    </div>
    <a class="tile__name" href="#/product/${p.id}">${esc(p.name)}</a>
    <p class="tile__price">${price}</p>
    <div class="tile__swatches">${swatches}</div>
  </article>`;
}

/* `extras` are non-product tiles (e.g. the classified ad) appended after the products */
function grid(list, extras = []) {
  if (!list.length && !extras.length) return `<p class="grid-empty">Nothing in this section yet. <a class="text-link" href="#/shop">See everything</a></p>`;
  /* pad the last row so the column rules close cleanly — 4-up on desktop,
     2-up on phones (the extra desktop-only fillers hide under 860px) */
  const count = list.length + extras.length;
  const need4 = (4 - (count % 4)) % 4;
  const need2 = (2 - (count % 2)) % 2;
  let fillers = '';
  for (let i = 0; i < need4; i++) {
    fillers += `<div class="tile tile--filler${i < need2 ? '' : ' tile--filler-desktop'}" aria-hidden="true"></div>`;
  }
  return `<div class="grid">${list.map(tile).join('')}${extras.join('')}${fillers}</div>`;
}

/* Wire-service tape: the brand's own lines, running once across the page. */
function wire() {
  const lines = ['The content you consume matters', 'Spread good news', 'Keep going',
    'Issue 01', 'Take the road less traveled', "Your story isn't over", "Don't leave before the good part"];
  const run = lines.map(l => `<span>${esc(l)}</span><span class="wire__dot" aria-hidden="true">■</span>`).join('');
  return `<div class="wire" role="presentation">
    <div class="wire__label">Wire</div>
    <div class="wire__window"><div class="wire__track">
      <div class="wire__run">${run}</div><div class="wire__run" aria-hidden="true">${run}</div>
    </div></div>
  </div>`;
}

const hasPhotos = p => !!(p.photos && Object.keys(p.photos).length);

/* A house ad set like a newspaper classified. Fills the front-page row when fewer than
   four products have been photographed, and points at the real early-access signup. */
function classifiedTile() {
  return `<article class="tile tile--ad">
    <a class="tile__ad" href="locked.html">
      <p class="kicker">Classified</p>
      <p class="block-head tile__ad-head">Get the<br>next issue<br>first.</p>
      <p class="tile__ad-rule"></p>
      <p class="tile__ad-copy">Early access by email or text, one hour before each drop.</p>
      <span class="text-link">Sign up</span>
    </a>
    <p class="tile__name">Early Access</p>
    <p class="tile__price">Free</p>
  </article>`;
}

/* ============================================================
   VIEWS
   ============================================================ */
function viewHome() {
  const hoodie = product('good-part-hoodie');
  const colorNames = hoodie.colorways.map(c => c.name).join(' · ');
  const subLines = ['More people to meet', 'More places to see', 'More stories to tell', 'More love to give', 'More life to live', "Your story isn't over"];

  return `
  <section class="masthead">
    <div class="wrap">
      <div class="masthead__rule"></div>
      <h1 class="masthead__word">Sunday Paper</h1>
      <div class="masthead__rule"></div>
      <p class="masthead__tag">The content you consume matters</p>
    </div>
  </section>

  <section class="campaign press">
    ${imgSlot(IMAGES.campaignHero, { eager: true, alt: 'The first drop in all five colorways' })}
    <p class="rack__cap">The first drop in five colorways — ${esc(colorNames)}</p>
  </section>
  <div class="campaign__link"><a class="text-link" href="#/product/good-part-hoodie">Shop the first drop</a></div>

  <section class="lead">
    <div class="lead__media press">${imgSlot(IMAGES.leadStory, { color: 'Heather Grey' })}</div>
    <div class="lead__body">
      <div class="lead__col">
        <p class="kicker lead__kicker">Front Page — Issue 01</p>
        <h2 class="block-head lead__head">Don't Leave<br>Before The<br>Good Part</h2>
      </div>
      <div class="lead__col">
        <ul class="lead__list">${subLines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
        <p class="block-head lead__keep">Keep Going</p>
        <p class="lead__signoff">Spread Good News</p>
        <p><a class="text-link" href="#/product/good-part-hoodie">Buy the hoodie — ${money(hoodie.price)}</a></p>
      </div>
    </div>
  </section>

  <section class="wrap section">
    <div class="section-front"><span>New Issue</span></div>
    ${(() => {
      const shot = PRODUCTS.filter(p => p.isNew && hasPhotos(p)).slice(0, 4);
      return grid(shot, shot.length < 4 ? [classifiedTile()] : []);
    })()}
    <p style="text-align:center;padding-top:34px"><a class="text-link" href="#/shop">Shop all</a></p>
  </section>

  ${wire()}

  <section class="editorial">
    <div class="editorial__inner">
      <p class="kicker editorial__kicker">Editorial</p>
      <p class="block-head editorial__head"><span class="ln">Good news</span><span class="ln">still exists.</span><span class="ln">Spread it.</span></p>
    </div>
  </section>`;
}

const CATEGORY_COPY = {
  all: { title: 'Shop All', blurb: 'Everything in print right now.' },
  new: { title: 'New Issue', blurb: 'The first drop, front to back.' },
  hoodies: { title: 'Hoodies', blurb: 'Heavyweight fleece. Printed front and back.' },
  tees: { title: 'Tees', blurb: 'Mid-weight cotton. Printed to be worn out.' },
  headwear: { title: 'Headwear', blurb: 'Caps and beanies, varsity front, script back.' }
};

function filteredProducts() {
  const f = state.filters;
  let list = PRODUCTS.slice();
  if (f.category === 'new') list = list.filter(p => p.isNew);
  else if (f.category !== 'all') list = list.filter(p => p.category === f.category);
  if (f.colors.size) list = list.filter(p => p.colorways.some(c => f.colors.has(c.name)));
  if (f.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  if (f.sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  if (f.sort === 'newest') list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  return list;
}

function viewCollection() {
  const meta = CATEGORY_COPY[state.filters.category] || CATEGORY_COPY.all;
  const list = filteredProducts();
  const allColors = [...new Set(PRODUCTS.flatMap(p => p.colorways.map(c => c.name)))];
  const cats = ['all', 'new', 'hoodies', 'tees', 'headwear'];
  const sorts = [['featured', 'Featured'], ['newest', 'Newest'], ['price-asc', 'Price: low to high'], ['price-desc', 'Price: high to low']];

  const opt = (checked, action, value, label) =>
    `<button class="dropdown__opt" role="checkbox" aria-checked="${checked}" data-action="${action}" data-value="${esc(value)}">
      <span class="dropdown__box"></span>${esc(label)}
    </button>`;

  return `
  <div class="filter-bar">
    <div class="filter-bar__inner">
      <div class="dropdown" data-dropdown>
        <button class="dropdown__btn" data-action="dropdown" aria-expanded="false">Filter
          <svg viewBox="0 0 10 10" aria-hidden="true"><polyline points="1,3 5,7 9,3"></polyline></svg>
        </button>
        <div class="dropdown__panel" hidden>
          <div class="dropdown__group">
            <p class="kicker" style="margin-bottom:8px">Section</p>
            ${cats.map(c => opt(state.filters.category === c, 'set-category', c, CATEGORY_COPY[c].title)).join('')}
          </div>
          <div class="dropdown__group">
            <p class="kicker" style="margin-bottom:8px">Colorway</p>
            ${allColors.map(c => opt(state.filters.colors.has(c), 'toggle-color', c, c)).join('')}
          </div>
          <div class="dropdown__clear"><button class="text-btn" data-action="clear-filters">Clear all</button></div>
        </div>
      </div>

      <div class="dropdown" data-dropdown>
        <button class="dropdown__btn" data-action="dropdown" aria-expanded="false">Sort
          <svg viewBox="0 0 10 10" aria-hidden="true"><polyline points="1,3 5,7 9,3"></polyline></svg>
        </button>
        <div class="dropdown__panel" hidden>
          ${sorts.map(([v, l]) => opt(state.filters.sort === v, 'set-sort', v, l)).join('')}
        </div>
      </div>

      <span class="label filter-bar__count">${list.length} item${list.length === 1 ? '' : 's'}</span>
    </div>
  </div>

  <div class="wrap">
    <div class="collection-head">
      <p class="kicker">Issue 01</p>
      <h1 class="block-head stamp">${esc(meta.title)}</h1>
      <p class="measure">${esc(meta.blurb)}</p>
    </div>
    <div class="section-front"><span>The Classifieds</span></div>
    ${grid(list)}
  </div>
  <div style="height:70px"></div>`;
}

function viewProduct(id) {
  const p = product(id);
  if (!p) return viewNotFound();
  const sel = state.pdp[p.id] || (state.pdp[p.id] = { color: p.colorways[0].name, size: null });
  const also = PRODUCTS.filter(x => x.id !== p.id).slice(0, 4);

  const swatches = p.colorways.map(c => `
    <button class="pdp__swatch" style="background:${c.hex}" data-action="set-color" data-value="${esc(c.name)}"
      aria-pressed="${sel.color === c.name}" aria-label="${esc(c.name)}" title="${esc(c.name)}"></button>`).join('');

  const sizes = p.sizes.map(s => `
    <button class="pdp__size" data-action="set-size" data-value="${esc(s.label)}"
      aria-pressed="${sel.size === s.label}" ${s.soldOut ? 'disabled aria-label="' + esc(s.label) + ' sold out"' : ''}>${esc(s.label)}</button>`).join('');
  const sizeGridClass = p.sizes.length === 1 ? 'pdp__sizes pdp__sizes--single' : 'pdp__sizes';

  const acc = [
    ['Description', p.description],
    ['Size & Fit', p.fit],
    ['Shipping & Returns', SHIPPING_COPY]
  ].map(([title, body], i) => `
    <div class="acc__item">
      <button class="acc__btn" data-action="acc" aria-expanded="${i === 0}">${title}<span class="acc__sign">${i === 0 ? '−' : '+'}</span></button>
      <div class="acc__body" ${i === 0 ? '' : 'hidden'}>${body.replace(/\[confirm([^\]]*)\]/g, '<em style="font-style:normal;color:var(--forest)">[confirm$1]</em>')}</div>
    </div>`).join('');

  return `
  <div class="pdp" data-pdp="${p.id}">
    <div class="pdp__media">
      ${p.images.map((_, i) => imgSlot(productImage(p, i, sel.color), { color: sel.color, alt: p.name })).join('')}
    </div>
    <div class="pdp__panel-wrap">
      <div class="pdp__panel">
        <p class="kicker pdp__kicker">Issue 01 — Front Page</p>
        <h1 class="pdp__name">${esc(p.name)}</h1>
        <p class="pdp__price">${money(p.price)}${p.compareAt ? ` <s style="opacity:.5">${money(p.compareAt)}</s>` : ''} <span style="opacity:.6">[confirm]</span></p>

        <div class="pdp__block">
          <div class="pdp__block-label"><span class="label">Colorway</span><span class="label" data-color-label>${esc(sel.color)}</span></div>
          <div class="pdp__swatches">${swatches}</div>
        </div>

        <div class="pdp__block">
          <div class="pdp__block-label"><span class="label">Size</span><a class="text-btn" href="#/info/help">Size guide</a></div>
          <div class="${sizeGridClass}">${sizes}</div>
          <p class="pdp__note" data-size-note>${p.sizes.length === 1 ? 'One size fits most [confirm]' : 'Select a size'}</p>
        </div>

        <button class="btn btn--solid" data-action="add-to-bag">Add to bag</button>
        <div class="acc">${acc}</div>
      </div>
    </div>
  </div>

  <div class="wrap section pdp__also">
    <div class="section-front"><span>Also In This Issue</span></div>
    ${grid(also)}
  </div>`;
}

function viewAbout() {
  return `
  <article class="opinion">
    <p class="kicker">Opinion</p>
    <h1 class="block-head opinion__head stamp">A Paper For<br>The Good Part</h1>
    <div class="opinion__dateline">
      <span class="dateline-text">Sunday Paper</span>
      <span class="dateline-text">Vol. 1 — No. 1</span>
      <span class="dateline-text">Founded [confirm: year, city]</span>
    </div>

    <div class="opinion__cols">
      <p>Every morning the news arrives and almost all of it is bad. Fear travels further and faster than anything else, so fear is what gets printed. Social media runs the same engine with better lighting. What you see there is chosen, staged and sold, and it is not a record of anybody's actual life.</p>
      <p>We are not here to argue any of that down. We just think it is worth naming out loud, because what you read all day becomes what you think about, and what you think about becomes what you do next.</p>
      <p>So we started printing something else. Sunday Paper is a paper that runs on cotton and fleece instead of newsprint, and it carries one story: the good part. Keep going. Your story isn't over. There are more people to meet and more places to see. That is the whole editorial policy.</p>
      <p>Sunday is the day the thick paper lands, the one nobody finishes. Ours is short on purpose. One issue at a time, a few pieces in each, made to be worn until the print cracks and then worn some more.</p>
      <p>Take the road less traveled is an old line and it is still the right one. It is not advice about travel. It is about choosing what gets your attention, which is the one thing nobody can take from you without you handing it over.</p>
      <p>If you wear one of these and somebody reads it across a parking lot, that is our whole distribution model. Spread good news.</p>
    </div>

    <p class="pullquote stamp">The content you consume matters</p>

    <figure>
      ${imgSlot(IMAGES.aboutPortrait, { alt: 'Sunday Paper' })}
      <figcaption>Portrait or studio shot — caption to be written with the client <em style="font-style:normal;color:var(--forest)">[confirm]</em></figcaption>
    </figure>

    <p style="margin-top:34px"><a class="text-link" href="#/shop">Back to the shop</a></p>
  </article>`;
}

function viewInfo(key) {
  const page = INFO_PAGES[key];
  if (!page) return viewNotFound();
  const body = page.body.replace(/<em>/g, '<em style="font-style:normal;color:var(--forest)">');
  return `<article class="info">
    <p class="kicker">${esc(page.kicker)}</p>
    <h1>${esc(page.title)}</h1>
    ${body}
    <hr>
    <p><a class="text-link" href="#/shop">Back to the shop</a></p>
  </article>`;
}

function viewNotFound() {
  return `<article class="info">
    <p class="kicker">Correction</p>
    <h1>This page is not in print</h1>
    <p>The link you followed does not lead anywhere. Try the front page or the shop.</p>
    <hr>
    <p><a class="text-link" href="#/">Front page</a></p>
  </article>`;
}

/* ============================================================
   MOTION — one-time print/press effects. Everything is gated behind
   the `motion` class on <html>, which is only added when JS runs and
   the visitor has not asked for reduced motion. Elements are hidden
   only once they are registered with the observer, so anything that
   misses registration simply shows as normal.
   ============================================================ */
const MOTION = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  && 'IntersectionObserver' in window;
if (MOTION) document.documentElement.classList.add('motion');

const REVEAL = '.stamp, .press, .section-front, .grid, .lead__body, .editorial__head';
let revealObserver = null;
function initReveals(root = document) {
  if (!MOTION) return;
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        revealObserver.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  }
  root.querySelectorAll(REVEAL).forEach(el => {
    if (el.classList.contains('rv')) return;
    el.classList.add('rv');
    revealObserver.observe(el);
  });
}

/* ============================================================
   ROUTER
   ============================================================ */
function route() {
  const view = $('#view');
  if (!view) return;
  const path = (location.hash.replace(/^#/, '') || '/').split('/').filter(Boolean);
  let html;

  if (!path.length) html = viewHome();
  else if (path[0] === 'shop') {
    const cat = path[1] || 'all';
    state.filters.category = CATEGORY_COPY[cat] ? cat : 'all';
    html = viewCollection();
  }
  else if (path[0] === 'product') html = viewProduct(path[1]);
  else if (path[0] === 'about') html = viewAbout();
  else if (path[0] === 'info') html = viewInfo(path[1]);
  else html = viewNotFound();

  view.innerHTML = html;
  initReveals(view);
  markActiveNav();
  closePanels();
  window.scrollTo(0, 0);
}

function markActiveNav() {
  const hash = location.hash || '#/';
  $$('.nav a, .mobile-nav a').forEach(a => {
    a.classList.toggle('is-active', a.getAttribute('href') === hash);
  });
}

function refreshCollection() {
  const view = $('#view');
  if (!view || !$('.filter-bar', view)) return;
  view.innerHTML = viewCollection();
  initReveals(view);
  /* a filter or sort change should only re-deal the grid, not replay the heading */
  view.querySelectorAll('.stamp, .section-front').forEach(el => el.classList.add('is-in'));
}

/* ============================================================
   CART
   ============================================================ */
function addToCart(id, color, size, qty = 1) {
  const p = product(id);
  if (!p) return;
  const key = `${id}|${color}|${size}`;
  const line = state.cart.find(l => l.key === key);
  if (line) line.qty += qty;
  else state.cart.push({ key, id, color, size, qty });
  renderCart();
  openDrawer();
}

function renderCart() {
  const box = $('#cartItems');
  if (!box) return;
  const count = state.cart.reduce((n, l) => n + l.qty, 0);
  const subtotal = state.cart.reduce((n, l) => n + l.qty * product(l.id).price, 0);

  $('#cartCount').textContent = count;
  $('#drawerCount').textContent = count;
  $('#cartSubtotal').textContent = money(subtotal);

  if (!state.cart.length) {
    box.innerHTML = `<p class="drawer__empty">Your bag is empty. <a class="text-link" href="#/shop">Read the new issue</a></p>`;
    $('#checkoutBtn').disabled = true;
    return;
  }
  $('#checkoutBtn').disabled = false;

  box.innerHTML = state.cart.map(l => {
    const p = product(l.id);
    return `<div class="cart-item" data-key="${esc(l.key)}">
      ${imgSlot(productImage(p, 0, l.color), { color: l.color, alt: p.name })}
      <div>
        <a class="cart-item__name" href="#/product/${p.id}">${esc(p.name)}</a>
        <p class="cart-item__meta">${esc(l.color)} / ${esc(l.size)}</p>
        <div class="cart-item__row">
          <div class="qty">
            <button data-action="qty" data-step="-1" aria-label="Decrease quantity">−</button>
            <span>${l.qty}</span>
            <button data-action="qty" data-step="1" aria-label="Increase quantity">+</button>
          </div>
          <span class="cart-item__price">${money(p.price * l.qty)}</span>
        </div>
        <button class="cart-item__remove" data-action="remove">Remove</button>
      </div>
    </div>`;
  }).join('');
}

/* ============================================================
   PANELS
   ============================================================ */
function setScrim(on) {
  const scrim = $('#scrim');
  if (!scrim) return;
  if (on) { scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add('is-open')); }
  else { scrim.classList.remove('is-open'); setTimeout(() => { scrim.hidden = true; }, 160); }
}
function openDrawer() {
  const d = $('#cartDrawer');
  d.classList.add('is-open');
  d.setAttribute('aria-hidden', 'false');
  $('#cartToggle').setAttribute('aria-expanded', 'true');
  setScrim(true);
}
function closePanels() {
  const d = $('#cartDrawer');
  if (!d) return;
  d.classList.remove('is-open');
  d.setAttribute('aria-hidden', 'true');
  ['#searchOverlay'].forEach(s => {
    const el = $(s);
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
  });
  const mob = $('#mobileNav');
  if (mob) mob.hidden = true;
  ['#cartToggle', '#searchToggle', '#menuToggle'].forEach(s => $(s).setAttribute('aria-expanded', 'false'));
  setScrim(false);
  closeDropdowns();
}
function toggleOverlay(sel, btnSel) {
  const el = $(sel);
  const open = el.classList.contains('is-open');
  closePanels();
  if (!open) {
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    $(btnSel).setAttribute('aria-expanded', 'true');
    setScrim(true);
    const input = el.querySelector('input');
    if (input) setTimeout(() => input.focus(), 60);
  }
}
function closeDropdowns() {
  $$('[data-dropdown]').forEach(d => {
    d.querySelector('.dropdown__panel').hidden = true;
    d.querySelector('.dropdown__btn').setAttribute('aria-expanded', 'false');
  });
}

/* ============================================================
   FORMS
   ============================================================ */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
function showMsg(el, text, ok) {
  el.className = 'form-msg ' + (ok ? 'form-msg--ok' : 'form-msg--err');
  el.innerHTML = ok ? `<span class="script">good news</span><span>${esc(text)}</span>` : esc(text);
}

function wireNewsletter() {
  const form = $('#newsletterForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#newsletterEmail');
    const msg = $('#newsletterMsg');
    if (!EMAIL_RE.test(input.value.trim())) {
      input.classList.add('is-error');
      showMsg(msg, 'Enter a valid email address', false);
      return;
    }
    input.classList.remove('is-error');
    form.hidden = true;
    showMsg(msg, "You're on the list. The next issue reaches you first.", true);
  });
}


function wireEarlyAccess() {
  const form = $('#earlyForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#earlyEmail');
    const phone = $('#earlyPhone');
    const msg = $('#earlyMsg');
    const phoneDigits = phone.value.replace(/\D/g, '');
    email.classList.remove('is-error');
    phone.classList.remove('is-error');

    if (!EMAIL_RE.test(email.value.trim())) {
      email.classList.add('is-error');
      showMsg(msg, 'Enter a valid email address', false);
      return;
    }
    if (phone.value.trim() && phoneDigits.length < 10) {
      phone.classList.add('is-error');
      showMsg(msg, 'Enter a full phone number, or leave it blank', false);
      return;
    }
    form.hidden = true;
    showMsg(msg, 'You are on the early access list. The password lands one hour before the drop.', true);
  });

  const owner = $('#ownerLogin');
  if (owner) owner.addEventListener('click', e => {
    e.preventDefault();
    owner.textContent = 'Owner login connects to the store platform at launch [confirm]';
  });
}

/* ============================================================
   COUNTDOWN
   ============================================================ */
function startCountdown() {
  const box = $('#countdown');
  if (!box) return;
  const pad = n => String(Math.max(0, n)).padStart(2, '0');
  /* swap a numeral like hand-set type: only animate the ones that changed */
  const set = (sel, val) => {
    const el = $(sel);
    if (el.textContent === val) return;
    el.textContent = val;
    if (!MOTION) return;
    el.classList.remove('flip');
    void el.offsetWidth;
    el.classList.add('flip');
  };
  const tick = () => {
    const diff = DROP.date.getTime() - Date.now();
    const s = Math.max(0, Math.floor(diff / 1000));
    set('#cdDays', pad(Math.floor(s / 86400)));
    set('#cdHours', pad(Math.floor(s / 3600) % 24));
    set('#cdMins', pad(Math.floor(s / 60) % 60));
    set('#cdSecs', pad(s % 60));
  };
  tick();
  setInterval(tick, 1000);
}

/* ============================================================
   SEARCH
   ============================================================ */
function wireSearch() {
  const input = $('#searchInput');
  if (!input) return;
  const results = $('#searchResults');
  const run = () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const hits = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.includes(q) ||
      p.colorways.some(c => c.name.toLowerCase().includes(q))
    );
    results.innerHTML = hits.length
      ? hits.map(p => `<a href="#/product/${p.id}"><span>${esc(p.name)}</span><span class="label">${money(p.price)}</span></a>`).join('')
      : `<p class="search-results__empty">Nothing in the archive for “${esc(input.value.trim())}”.</p>`;
  };
  input.addEventListener('input', run);
}

/* ============================================================
   EVENTS
   ============================================================ */
function wireEvents() {
  /* header buttons */
  const on = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('click', fn); };
  on('#cartToggle', () => {
    const open = $('#cartDrawer').classList.contains('is-open');
    if (open) closePanels(); else { closePanels(); openDrawer(); }
  });
  on('#cartClose', closePanels);
  on('#searchToggle', () => toggleOverlay('#searchOverlay', '#searchToggle'));
  on('#searchClose', closePanels);
  on('#scrim', closePanels);
  on('#menuToggle', () => {
    const mob = $('#mobileNav');
    const willOpen = mob.hidden;
    closePanels();
    mob.hidden = !willOpen;
    $('#menuToggle').setAttribute('aria-expanded', String(willOpen));
  });
  on('#checkoutBtn', () => {
    const btn = $('#checkoutBtn');
    btn.textContent = 'Checkout connects at launch [confirm]';
    setTimeout(() => { btn.textContent = 'Checkout'; }, 2600);
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanels(); });

  /* delegated clicks */
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');

    /* close dropdowns when clicking outside one */
    if (!e.target.closest('[data-dropdown]')) closeDropdowns();
    if (!el) return;
    const action = el.dataset.action;
    const tileEl = el.closest('.tile');
    const p = tileEl ? product(tileEl.dataset.id) : null;

    switch (action) {
      case 'star': {
        const on = el.getAttribute('aria-pressed') === 'true';
        el.setAttribute('aria-pressed', String(!on));
        if (on) state.wishlist.delete(p.id); else state.wishlist.add(p.id);
        break;
      }
      case 'quick-add': {
        const firstSize = p.sizes.find(s => !s.soldOut);
        addToCart(p.id, p.colorways[0].name, firstSize ? firstSize.label : 'One Size');
        break;
      }
      case 'dot': {
        setTileImage(tileEl, Number(el.dataset.i));
        break;
      }
      case 'dropdown': {
        const wrap = el.closest('[data-dropdown]');
        const panel = wrap.querySelector('.dropdown__panel');
        const isOpen = !panel.hidden;
        closeDropdowns();
        panel.hidden = isOpen;
        el.setAttribute('aria-expanded', String(!isOpen));
        break;
      }
      case 'set-category':
        state.filters.category = el.dataset.value;
        location.hash = el.dataset.value === 'all' ? '#/shop' : `#/shop/${el.dataset.value}`;
        refreshCollection();
        break;
      case 'toggle-color': {
        const v = el.dataset.value;
        if (state.filters.colors.has(v)) state.filters.colors.delete(v); else state.filters.colors.add(v);
        refreshCollection();
        break;
      }
      case 'set-sort':
        state.filters.sort = el.dataset.value;
        refreshCollection();
        break;
      case 'clear-filters':
        state.filters.colors.clear();
        state.filters.sort = 'featured';
        refreshCollection();
        break;

      /* PDP */
      case 'set-color': {
        const id = el.closest('[data-pdp]').dataset.pdp;
        state.pdp[id].color = el.dataset.value;
        $$('[data-action="set-color"]').forEach(b => b.setAttribute('aria-pressed', String(b === el)));
        const label = $('[data-color-label]');
        if (label) label.textContent = el.dataset.value;
        /* refresh the image-stack captions for the new colorway */
        const prod = product(id);
        $('.pdp__media').innerHTML = prod.images
          .map((_, i) => imgSlot(productImage(prod, i, el.dataset.value), { color: el.dataset.value, alt: prod.name })).join('');
        break;
      }
      case 'set-size': {
        const id = el.closest('[data-pdp]').dataset.pdp;
        state.pdp[id].size = el.dataset.value;
        $$('[data-action="set-size"]').forEach(b => b.setAttribute('aria-pressed', String(b === el)));
        $('[data-size-note]').textContent = `Size ${el.dataset.value} selected`;
        break;
      }
      case 'add-to-bag': {
        const id = el.closest('[data-pdp]').dataset.pdp;
        const sel = state.pdp[id];
        const prod = product(id);
        if (prod.sizes.length === 1) sel.size = prod.sizes[0].label;
        if (!sel.size) {
          const note = $('[data-size-note]');
          note.textContent = 'Choose a size first';
          note.style.color = '#8a2318';
          return;
        }
        addToCart(id, sel.color, sel.size);
        break;
      }
      case 'acc': {
        const body = el.nextElementSibling;
        const open = el.getAttribute('aria-expanded') === 'true';
        el.setAttribute('aria-expanded', String(!open));
        body.hidden = open;
        el.querySelector('.acc__sign').textContent = open ? '+' : '−';
        break;
      }

      /* cart */
      case 'qty': {
        const key = el.closest('.cart-item').dataset.key;
        const line = state.cart.find(l => l.key === key);
        line.qty += Number(el.dataset.step);
        if (line.qty < 1) state.cart = state.cart.filter(l => l.key !== key);
        renderCart();
        break;
      }
      case 'remove': {
        const key = el.closest('.cart-item').dataset.key;
        state.cart = state.cart.filter(l => l.key !== key);
        renderCart();
        break;
      }
    }
  });

  /* tile image swap on hover — second image on the tile, any image from its dot */
  document.addEventListener('mouseover', e => {
    const media = e.target.closest('.tile__media');
    if (!media) return;
    const dot = e.target.closest('.tile__dot');
    const i = dot ? Number(dot.dataset.i) : 1;
    if (media.dataset.shown === String(i)) return;
    media.dataset.shown = String(i);
    setTileImage(media.closest('.tile'), i);
  });
  document.addEventListener('mouseout', e => {
    const media = e.target.closest('.tile__media');
    if (!media || media.contains(e.relatedTarget)) return;
    media.dataset.shown = '0';
    setTileImage(media.closest('.tile'), 0);
  });
}

/* Swaps the caption (or the <img> src, once real photos are in) in place —
   no node replacement, so hovering never flickers. */
function setTileImage(tileEl, i) {
  if (!tileEl) return;
  const p = product(tileEl.dataset.id);
  const color = p.colorways[0].name;
  const img = productImage(p, i, color) || productImage(p, 0, color);
  const slot = tileEl.querySelector('.image-slot');
  if (!slot) return;
  const caption = String(img.caption || '').replace('{color}', color);
  const text = `${caption} — ${ratioLabel(img.ratio || '3/4')}`;
  const imgEl = slot.querySelector('img');

  if (imgEl && img.src) { imgEl.src = img.src; imgEl.alt = p.name; }
  else if (!imgEl && !img.src) {
    const cap = slot.querySelector('.image-slot__cap');
    if (cap) cap.textContent = text;
    slot.setAttribute('aria-label', text);
  } else {
    /* photo <-> placeholder: rebuild the slot's contents, keeping the slot
       element itself so the hover handlers stay anchored */
    slot.innerHTML = img.src
      ? `<img src="${esc(img.src)}" alt="${esc(p.name)}">`
      : `<span class="image-slot__cap">${esc(text)}</span>`;
    slot.setAttribute('aria-label', img.src ? p.name : text);
  }
  slot.dataset.slot = img.id;
  $$('.tile__dot', tileEl).forEach((d, di) => d.classList.toggle('is-on', di === i));
}

/* ============================================================
   BOOT
   ============================================================ */
function boot() {
  const dl = $('#datelineDate');
  if (dl) {
    const narrow = window.matchMedia('(max-width:860px)');
    const setDate = () => {
      dl.textContent = new Date().toLocaleDateString('en-US', narrow.matches
        ? { month: 'short', day: 'numeric', year: 'numeric' }
        : { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    };
    setDate();
    narrow.addEventListener('change', setDate);
  }
  const yr = $('#yearNow');
  if (yr) yr.textContent = new Date().getFullYear();

  if (document.body.dataset.page === 'locked') {
    const slot = $('#lockedImage');
    if (slot) slot.innerHTML = imgSlot(IMAGES.lockedCampaign, { eager: true, alt: 'Sunday Paper campaign' });
    initReveals(document);
    startCountdown();
    wireEarlyAccess();
    return;
  }

  wireEvents();
  wireNewsletter();
  wireSearch();
  renderCart();
  window.addEventListener('hashchange', route);
  route();
}

document.addEventListener('DOMContentLoaded', boot);
