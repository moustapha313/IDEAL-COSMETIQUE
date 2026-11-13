const STORAGE_KEY = 'ideal-cosmetique-v1';
const pageNames = { dashboard: "Vue d'ensemble", pos: 'Point de vente', sales: 'Ventes', reports: 'Rapports', products: 'Produits', inventory: 'Stocks', clients: 'Clients', suppliers: 'Fournisseurs', settings: 'Paramètres' };
const today = new Date();
const dateKey = (offset = 0) => { const value = new Date(); value.setDate(value.getDate() + offset); return value.toISOString().slice(0, 10); };
const localDateKey = value => `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
const starterData = () => ({
  shop: { name: 'Ideal Cosmetique', city: 'Dakar', phone: '+221 77 000 00 00' },
  products: [
    { id: 'p1', name: 'Sérum éclat vitamine C', brand: 'The Ordinary', category: 'Visage', sku: 'VIS-001', qty: 12, price: 12500, cost: 7800, threshold: 5, supplier: 'Beauté Distribution' },
    { id: 'p2', name: 'Crème hydratante karité', brand: 'Nila', category: 'Corps', sku: 'COR-014', qty: 4, price: 8500, cost: 5100, threshold: 6, supplier: 'Sahel Cosmétique' },
    { id: 'p3', name: 'Huile de ricin pure', brand: 'Kalia Nature', category: 'Cheveux', sku: 'CHE-008', qty: 18, price: 6500, cost: 3600, threshold: 5, supplier: 'Sahel Cosmétique' },
    { id: 'p4', name: 'Écran solaire SPF 50', brand: 'La Roche-Posay', category: 'Visage', sku: 'VIS-023', qty: 2, price: 18000, cost: 12200, threshold: 5, supplier: 'Beauté Distribution' },
    { id: 'p5', name: 'Parfum Oud Dakar', brand: 'Maison Néroli', category: 'Parfum', sku: 'PAR-006', qty: 9, price: 24000, cost: 14500, threshold: 3, supplier: 'Parfums du Monde' },
    { id: 'p6', name: 'Gel nettoyant doux', brand: 'CeraVe', category: 'Visage', sku: 'VIS-011', qty: 0, price: 10500, cost: 6500, threshold: 4, supplier: 'Beauté Distribution' },
    { id: 'p7', name: 'Lait corps unifiant', brand: 'Nuhanciam', category: 'Corps', sku: 'COR-019', qty: 7, price: 15000, cost: 9200, threshold: 4, supplier: 'Beauté Distribution' },
    { id: 'p8', name: 'Beurre de karité brut', brand: 'Teranga Bio', category: 'Corps', sku: 'COR-031', qty: 16, price: 4500, cost: 2200, threshold: 5, supplier: 'Sahel Cosmétique' },
    { id: 'p9', name: 'Shampoing nourrissant', brand: 'Cantu', category: 'Cheveux', sku: 'CHE-015', qty: 3, price: 9500, cost: 5700, threshold: 4, supplier: 'Afro Beauty Pro' },
    { id: 'p10', name: 'Brume parfumée fleur d’oranger', brand: 'Yara', category: 'Parfum', sku: 'PAR-012', qty: 11, price: 7500, cost: 4200, threshold: 4, supplier: 'Parfums du Monde' }
  ],
  clients: [
    { id: 'c1', name: 'Aminata Diop', phone: '+221 77 234 56 78', email: 'aminata@example.sn', city: 'Dakar' },
    { id: 'c2', name: 'Fatou Ndiaye', phone: '+221 76 123 45 67', email: 'fatou@example.sn', city: 'Pikine' },
    { id: 'c3', name: 'Marième Fall', phone: '+221 70 345 67 89', email: 'marieme@example.sn', city: 'Dakar' },
    { id: 'c4', name: 'Ndeye Ba', phone: '+221 78 456 78 90', email: '', city: 'Thiès' }
  ],
  suppliers: [
    { id: 's1', name: 'Beauté Distribution', contact: 'Moussa Sy', phone: '+221 33 820 10 10', email: 'contact@beautedistribution.sn', city: 'Dakar' },
    { id: 's2', name: 'Sahel Cosmétique', contact: 'Awa Sarr', phone: '+221 77 110 22 33', email: 'ventes@sahelcosmetique.sn', city: 'Dakar' },
    { id: 's3', name: 'Parfums du Monde', contact: 'Ibrahima Kane', phone: '+221 76 220 11 00', email: 'pro@parfums.sn', city: 'Dakar' },
    { id: 's4', name: 'Afro Beauty Pro', contact: 'Khady Sow', phone: '+221 78 101 20 30', email: 'afrobeauty@example.sn', city: 'Thiès' }
  ],
  sales: [
    { id: 'V-2408', date: `${dateKey()}T10:42:00`, clientId: 'c1', items: [{ productId: 'p1', name: 'Sérum éclat vitamine C', qty: 1, price: 12500 }, { productId: 'p8', name: 'Beurre de karité brut', qty: 2, price: 4500 }], total: 21500, payment: 'Wave', status: 'Payée' },
    { id: 'V-2407', date: `${dateKey()}T09:18:00`, clientId: 'c2', items: [{ productId: 'p5', name: 'Parfum Oud Dakar', qty: 1, price: 24000 }], total: 24000, payment: 'Espèces', status: 'Payée' },
    { id: 'V-2406', date: `${dateKey(-1)}T16:05:00`, clientId: 'c3', items: [{ productId: 'p7', name: 'Lait corps unifiant', qty: 1, price: 15000 }, { productId: 'p3', name: 'Huile de ricin pure', qty: 1, price: 6500 }], total: 21500, payment: 'Orange Money', status: 'Payée' },
    { id: 'V-2405', date: `${dateKey(-1)}T12:31:00`, clientId: '', items: [{ productId: 'p10', name: 'Brume parfumée fleur d’oranger', qty: 2, price: 7500 }], total: 15000, payment: 'Espèces', status: 'Payée' },
    { id: 'V-2404', date: `${dateKey(-2)}T14:24:00`, clientId: 'c4', items: [{ productId: 'p2', name: 'Crème hydratante karité', qty: 1, price: 8500 }], total: 8500, payment: 'Wave', status: 'Payée' }
  ]
});
let state;
try { state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || starterData(); } catch { state = starterData(); }
let activeView = 'dashboard';
let searchTerm = '';
let cart = [];
let reportDate = localDateKey(new Date());
const root = document.querySelector('#view-root');
const dialog = document.querySelector('#app-dialog');
const dialogContent = document.querySelector('#dialog-content');
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const money = value => `${new Intl.NumberFormat('fr-FR').format(Number(value) || 0)} F CFA`;
const shortDate = value => new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
const shortTime = value => new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(new Date(value));
const initials = name => String(name || '?').split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase();
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const productById = id => state.products.find(product => product.id === id);
const clientName = id => state.clients.find(client => client.id === id)?.name || 'Client de passage';
const stockStatus = product => product.qty === 0 ? ['Rupture', 'status-out'] : product.qty <= product.threshold ? ['Stock bas', 'status-low'] : ['En stock', 'status-ok'];
const categoryIcon = category => ({ Visage: '✧', Corps: '◌', Cheveux: '⌁', Parfum: '♧', Maquillage: '✿', Accessoires: '◇' })[category] || '✧';
const filtered = list => list.filter(item => JSON.stringify(item).toLocaleLowerCase('fr').includes(searchTerm.toLocaleLowerCase('fr')));
function toast(message, error = false) { const node = document.createElement('div'); node.className = `toast${error ? ' error' : ''}`; node.textContent = message; document.querySelector('#toast-region').append(node); setTimeout(() => node.remove(), 3000); }
function setView(view) { activeView = view; document.querySelectorAll('.nav-item[data-view]').forEach(button => button.classList.toggle('active', button.dataset.view === view)); document.querySelector('#breadcrumb-current').textContent = pageNames[view]; render(); document.querySelector('#sidebar').classList.remove('open'); document.querySelector('.mobile-overlay')?.classList.remove('show'); }
function button(label, action, className = 'button', extra = '') { return `<button class="${className}" data-action="${action}" ${extra}>${label}</button>`; }
function heading(eyebrow, title, subtitle, actions = '') { return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${subtitle}</p></div><div class="heading-actions">${actions}</div></div>`; }
function emptyRow(text, colspan) { return `<tr><td colspan="${colspan}" class="table-empty">${text}</td></tr>`; }
function productCell(product) { return `<div class="product-cell"><span class="product-swatch">${categoryIcon(product.category)}</span><span class="product-name"><strong>${esc(product.name)}</strong><small>${esc(product.brand)} · ${esc(product.sku)}</small></span></div>`; }
function recentSalesRows(sales) { return sales.slice(0, 5).map(sale => `<tr><td><strong>${esc(sale.id)}</strong></td><td>${esc(clientName(sale.clientId))}</td><td>${shortTime(sale.date)}</td><td>${esc(sale.payment)}</td><td><strong>${money(sale.total)}</strong></td><td><span class="status status-paid">${esc(sale.status)}</span></td></tr>`).join('') || emptyRow('Aucune vente pour le moment.', 6); }
function salesTable(sales) { return `<div class="panel table-panel"><div class="table-scroll"><table><thead><tr><th>Référence</th><th>Client</th><th>Date</th><th>Paiement</th><th>Total</th><th>Statut</th></tr></thead><tbody>${sales.map(sale => `<tr><td><strong>${esc(sale.id)}</strong></td><td>${esc(clientName(sale.clientId))}</td><td>${shortDate(sale.date)} · ${shortTime(sale.date)}</td><td>${esc(sale.payment)}</td><td><strong>${money(sale.total)}</strong></td><td><span class="status status-paid">${esc(sale.status)}</span></td></tr>`).join('') || emptyRow('Aucune vente ne correspond à votre recherche.', 6)}</tbody></table></div></div>`; }
function metric(label, value, foot, symbol) { return `<article class="metric-card"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${symbol}</span></div><div class="metric-value">${value}</div><div class="metric-foot">${foot}</div></article>`; }
function dashboard() {
  const todaySales = state.sales.filter(sale => new Date(sale.date).toDateString() === today.toDateString());
  const dailyTotal = todaySales.reduce((sum, sale) => sum + sale.total, 0);
  const low = state.products.filter(product => product.qty <= product.threshold);
  const units = state.products.reduce((sum, product) => sum + product.qty, 0);
  const categories = [...new Set(state.products.map(product => product.category))].map(category => ({ category, count: state.products.filter(product => product.category === category).length }));
  const peak = Math.max(...categories.map(item => item.count), 1);
  const bars = Array.from({ length: 7 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - 6 + index); const total = state.sales.filter(sale => new Date(sale.date).toDateString() === date.toDateString()).reduce((sum, sale) => sum + sale.total, 0); return { day: new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(date), total }; });
  const max = Math.max(...bars.map(item => item.total), 1);
  const points = bars.map((item, index) => `${index * 100 / 6},${130 - (item.total / max) * 112}`).join(' ');
  const area = `0,145 ${points} 100,145`;
  return `${heading(new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(today).toUpperCase(), 'Bonjour, équipe ✨', 'Voici ce qui se passe dans votre boutique aujourd’hui.', button('＋ Nouvelle vente', 'go-pos', 'button button-primary'))}
    <div class="metrics-grid">${metric('Ventes du jour', money(dailyTotal), `<span class="positive">${todaySales.length} transaction${todaySales.length > 1 ? 's' : ''}</span> enregistrée${todaySales.length > 1 ? 's' : ''}`, '↗')}${metric('Articles en stock', new Intl.NumberFormat('fr-FR').format(units), `${state.products.length} références au catalogue`, '◇')}${metric('À réapprovisionner', low.length, low.length ? `<span class="negative">${low.filter(product => product.qty === 0).length} rupture${low.filter(product => product.qty === 0).length > 1 ? 's' : ''}</span> à traiter` : 'Tous les stocks sont suffisants', '▤')}${metric('Clients enregistrés', state.clients.length, 'Une clientèle qui grandit', '♧')}</div>
    <div class="dashboard-grid"><section class="panel chart-panel"><div class="panel-header"><div><div class="panel-title">Activité des ventes</div><div class="panel-subtitle">Chiffre d’affaires · 7 derniers jours</div></div><div class="chart-legend"><span><i class="legend-dot"></i>Ventes</span></div></div><div class="panel-body"><div class="chart-wrap"><svg viewBox="0 0 100 150" preserveAspectRatio="none" role="img" aria-label="Graphique des ventes de la semaine"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#6d9a76" stop-opacity=".24"/><stop offset="100%" stop-color="#6d9a76" stop-opacity="0"/></linearGradient></defs><line class="chart-gridline" x1="0" y1="20" x2="100" y2="20"/><line class="chart-gridline" x1="0" y1="58" x2="100" y2="58"/><line class="chart-gridline" x1="0" y1="96" x2="100" y2="96"/><line class="chart-gridline" x1="0" y1="134" x2="100" y2="134"/><polygon class="chart-area" points="${area}"/><polyline class="chart-line" points="${points}"/></svg></div><div class="chart-labels">${bars.map(item => `<span>${esc(item.day)}</span>`).join('')}</div></div></section>
    <div class="side-stack"><section class="panel quick-panel"><div class="panel-header"><div class="panel-title">Raccourcis</div></div><div class="panel-body"><button class="quick-action" data-action="go-pos"><span>＋</span><span>Encaisser une vente</span></button><button class="quick-action" data-action="add-product"><span>◇</span><span>Ajouter un produit</span></button><button class="quick-action" data-action="go-inventory"><span>▤</span><span>Voir les alertes</span></button><button class="quick-action" data-action="export-sales"><span>↓</span><span>Exporter les ventes</span></button></div></section>
    <section class="panel"><div class="panel-header"><div><div class="panel-title">Vos catégories</div><div class="panel-subtitle">Répartition du catalogue</div></div></div><div class="panel-body category-list">${categories.map(item => `<div class="category-row"><span>${esc(item.category)}</span><span>${item.count} réf.</span><div class="category-bar"><i style="width:${Math.max(8, item.count / peak * 100)}%"></i></div></div>`).join('')}</div></section></div></div>
    <div class="section-row"><h2>Dernières ventes</h2><button class="text-link" data-view="sales">Tout voir →</button></div><div class="panel table-panel"><div class="table-scroll"><table><thead><tr><th>Référence</th><th>Client</th><th>Heure</th><th>Paiement</th><th>Total</th><th>Statut</th></tr></thead><tbody>${recentSalesRows([...state.sales].sort((a, b) => new Date(b.date) - new Date(a.date)))}</tbody></table></div></div>`;
}
function productsPage() {
  const products = filtered(state.products);
  return `${heading('CATALOGUE', 'Vos produits', `${state.products.length} références · Gérez votre catalogue et vos prix.`, button('＋ Ajouter un produit', 'add-product', 'button button-primary'))}
    <div class="toolbar"><label class="toolbar-search"><span>⌕</span><input data-filter placeholder="Rechercher un produit, une marque, une référence…" value="${esc(searchTerm)}" /></label><select class="select-control" data-category-filter><option value="">Toutes les catégories</option>${[...new Set(state.products.map(product => product.category))].map(category => `<option>${esc(category)}</option>`).join('')}</select><span class="toolbar-spacer"></span>${button('↓ Exporter CSV', 'export-products', 'button')}</div>
    <div class="panel table-panel"><div class="table-scroll"><table><thead><tr><th>Produit</th><th>Catégorie</th><th>Prix de vente</th><th>Stock</th><th>État</th><th>Fournisseur</th><th></th></tr></thead><tbody>${products.map(product => { const [label, klass] = stockStatus(product); return `<tr><td>${productCell(product)}</td><td>${esc(product.category)}</td><td><strong>${money(product.price)}</strong></td><td>${product.qty} unités</td><td><span class="status ${klass}">${label}</span></td><td>${esc(product.supplier || '—')}</td><td><div class="table-actions"><button class="table-action" title="Modifier" aria-label="Modifier ${esc(product.name)}" data-action="edit-product" data-id="${product.id}">✎</button><button class="table-action" title="Supprimer" aria-label="Supprimer ${esc(product.name)}" data-action="delete-product" data-id="${product.id}">×</button></div></td></tr>`; }).join('') || emptyRow('Aucun produit trouvé.', 7)}</tbody></table></div></div>`;
}
function inventoryPage() {
  const products = filtered([...state.products].sort((a, b) => a.qty - a.threshold - (b.qty - b.threshold)));
  const alerts = state.products.filter(product => product.qty <= product.threshold).length;
  return `${heading('GESTION DES STOCKS', 'État du stock', `${alerts} référence${alerts > 1 ? 's' : ''} à surveiller · ${state.products.reduce((sum, product) => sum + product.qty, 0)} unités en réserve.`, button('↓ Exporter CSV', 'export-inventory', 'button'))}
    <div class="metrics-grid">${metric('Références', state.products.length, 'Produits suivis', '◇')}${metric('Stock disponible', state.products.reduce((sum, product) => sum + product.qty, 0), 'Unités toutes catégories', '▤')}${metric('Stock faible', alerts, 'Au seuil ou en dessous', '⚑')}${metric('Valeur du stock', money(state.products.reduce((sum, product) => sum + product.qty * product.cost, 0)), 'Au prix d’achat', '◈')}</div>
    <div class="toolbar"><label class="toolbar-search"><span>⌕</span><input data-filter placeholder="Rechercher une référence…" value="${esc(searchTerm)}" /></label><select class="select-control" data-stock-filter><option value="">Tous les états</option><option value="low">Stock faible</option><option value="out">Rupture</option><option value="ok">En stock</option></select></div>
    <div class="panel table-panel"><div class="table-scroll"><table><thead><tr><th>Produit</th><th>En stock</th><th>Seuil d’alerte</th><th>Niveau</th><th>État</th><th></th></tr></thead><tbody>${products.map(product => { const [label, klass] = stockStatus(product); const stateKey = product.qty === 0 ? 'out' : product.qty <= product.threshold ? 'low' : 'ok'; return `<tr data-stock-state="${stateKey}"><td>${productCell(product)}</td><td><strong>${product.qty}</strong> unités</td><td>${product.threshold} unités</td><td><div class="stock-row"><span class="stock-meter ${stateKey}"><i style="width:${Math.min(100, product.qty / Math.max(product.threshold * 2, 1) * 100)}%"></i></span><small>${product.qty} / ${Math.max(product.threshold * 2, product.qty)} u.</small></div></td><td><span class="status ${klass}">${label}</span></td><td>${button('Ajuster', 'adjust-stock', 'button button-small', `data-id="${product.id}"`)}</td></tr>`; }).join('') || emptyRow('Aucun produit trouvé.', 6)}</tbody></table></div></div>`;
}
function posPage() {
  const products = filtered(state.products.filter(product => product.qty > 0));
  const productGroups = new Map();
  products.forEach(product => {
    const category = String(product.category || '').trim() || 'Sans catégorie';
    if (!productGroups.has(category)) productGroups.set(category, []);
    productGroups.get(category).push(product);
  });
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);
  return `${heading('ENCAISSEMENT', 'Point de vente', 'Ajoutez des articles au panier, puis choisissez le moyen de paiement.')}
    <div class="pos-layout"><div><div class="toolbar"><label class="toolbar-search"><span>⌕</span><input data-filter placeholder="Chercher un produit…" value="${esc(searchTerm)}" /></label></div><div class="pos-products">${[...productGroups.entries()].sort(([a], [b]) => a.localeCompare(b, 'fr')).map(([category, items]) => `<section class="pos-category" aria-label="Catégorie ${esc(category)}"><div class="pos-category-heading"><span class="pos-product-art">${categoryIcon(category)}</span><h2>${esc(category)}</h2><span class="pos-category-count">${items.length} produit${items.length > 1 ? 's' : ''}</span></div><div class="pos-category-products">${items.map(product => `<button class="pos-product" data-action="cart-add" data-id="${product.id}"><span class="pos-product-top"><span class="pos-product-art">${categoryIcon(product.category)}</span><small>${product.qty} en stock</small></span><span><h3>${esc(product.name)}</h3><div class="pos-product-bottom"><strong>${money(product.price)}</strong><span>＋</span></div></span></button>`).join('')}</div></section>`).join('') || '<div class="panel table-empty">Aucun produit disponible à la vente.</div>'}</div></div>
    <aside class="panel cart-panel"><div class="panel-header"><div class="panel-title">Panier</div><span class="cart-count">${cart.reduce((sum, line) => sum + line.qty, 0)} article${cart.reduce((sum, line) => sum + line.qty, 0) > 1 ? 's' : ''}</span></div><div class="cart-client"><select id="cart-client"><option value="">Client de passage</option>${state.clients.map(client => `<option value="${client.id}">${esc(client.name)}</option>`).join('')}</select></div><div class="cart-items">${cart.length ? cart.map(line => `<div class="cart-line"><div><div class="cart-line-name">${esc(line.name)}</div><div class="cart-line-price">${money(line.price * line.qty)}</div></div><div class="qty-control"><button aria-label="Retirer une unité" data-action="cart-dec" data-id="${line.id}">−</button><span>${line.qty}</span><button aria-label="Ajouter une unité" data-action="cart-inc" data-id="${line.id}">+</button></div></div>`).join('') : '<div class="cart-empty">Votre panier est vide.<br>Choisissez un produit pour commencer.</div>'}</div><div class="cart-summary"><div class="summary-line"><span>Sous-total</span><span>${money(subtotal)}</span></div><div class="summary-line"><span>Remise</span><span>0 F CFA</span></div><div class="summary-line total"><span>Total à payer</span><span>${money(subtotal)}</span></div><div class="field" style="margin-top:10px"><label for="payment-method">Moyen de paiement</label><select id="payment-method" class="select-control" style="width:100%"><option>Espèces</option><option>Wave</option><option>Orange Money</option><option>Free Money</option><option>Carte bancaire</option></select></div>${button('Encaisser · ' + money(subtotal), 'complete-sale', 'button button-primary', cart.length ? '' : 'disabled')}</div></aside></div>`;
}
function salesPage() {
  const sales = filtered([...state.sales].sort((a, b) => new Date(b.date) - new Date(a.date)));
  const daySales = state.sales.filter(sale => new Date(sale.date).toDateString() === today.toDateString());
  return `${heading('ACTIVITÉ', 'Historique des ventes', `${state.sales.length} transactions enregistrées.`, button('↓ Exporter CSV', 'export-sales', 'button'))}<div class="metrics-grid">${metric('Ventes du jour', daySales.length, 'Transactions', '↗')}${metric('Chiffre du jour', money(daySales.reduce((sum, sale) => sum + sale.total, 0)), 'Ventes encaissées', '◈')}${metric('Panier moyen', money(state.sales.length ? Math.round(state.sales.reduce((sum, sale) => sum + sale.total, 0) / state.sales.length) : 0), 'Toutes périodes', '◉')}${metric('Moyens mobiles', state.sales.filter(sale => ['Wave', 'Orange Money', 'Free Money'].includes(sale.payment)).length, 'Wave, Orange Money, Free Money', '▣')}</div><div class="toolbar"><label class="toolbar-search"><span>⌕</span><input data-filter placeholder="Référence, client, paiement…" value="${esc(searchTerm)}" /></label><span class="toolbar-spacer"></span><span class="section-row" style="margin:0"><small>${sales.length} résultat${sales.length > 1 ? 's' : ''}</small></span></div>${salesTable(sales)}`;
}
function reportPage() {
  const sales = state.sales.filter(sale => localDateKey(new Date(sale.date)) === reportDate);
  const products = new Map();
  sales.forEach(sale => sale.items.forEach(item => {
    const product = productById(item.productId);
    const key = item.productId || item.name;
    const unitCost = item.cost != null && Number.isFinite(Number(item.cost)) ? Number(item.cost) : Number(product?.cost) || 0;
    const row = products.get(key) || { name: item.name, category: product?.category || '—', quantity: 0, revenue: 0, cost: 0 };
    row.quantity += Number(item.qty) || 0;
    row.revenue += (Number(item.price) || 0) * (Number(item.qty) || 0);
    row.cost += unitCost * (Number(item.qty) || 0);
    products.set(key, row);
  }));
  const rows = [...products.values()].sort((a, b) => b.revenue - a.revenue);
  const revenue = rows.reduce((sum, item) => sum + item.revenue, 0);
  const cost = rows.reduce((sum, item) => sum + item.cost, 0);
  const quantity = rows.reduce((sum, item) => sum + item.quantity, 0);
  return `${heading('ACTIVITÉ', 'Rapport journalier', 'Résumé des ventes et bénéfices par produit pour la date choisie.')}
    <div class="toolbar report-toolbar"><label class="report-date-label" for="report-date">Journée</label><input id="report-date" class="select-control report-date" type="date" value="${esc(reportDate)}" /></div>
    <div class="metrics-grid">${metric('Transactions', sales.length, 'Ventes enregistrées', '↗')}${metric('Articles vendus', quantity, 'Unités sur la journée', '◇')}${metric('Chiffre d’affaires', money(revenue), 'Total des ventes', '◈')}${metric('Bénéfice estimé', money(revenue - cost), 'Ventes moins coût d’achat', '＋')}</div>
    <div class="panel table-panel"><div class="panel-header"><div class="panel-title">Détail par produit</div><span class="cart-count">${rows.length} produit${rows.length > 1 ? 's' : ''}</span></div><div class="table-scroll"><table><thead><tr><th>Produit</th><th>Catégorie</th><th>Quantité vendue</th><th>Chiffre d’affaires</th><th>Coût d’achat</th><th>Bénéfice</th></tr></thead><tbody>${rows.map(item => `<tr><td><strong>${esc(item.name)}</strong></td><td>${esc(item.category)}</td><td>${item.quantity}</td><td>${money(item.revenue)}</td><td>${money(item.cost)}</td><td><strong>${money(item.revenue - item.cost)}</strong></td></tr>`).join('') || emptyRow('Aucune vente enregistrée pour cette journée.', 6)}</tbody>${rows.length ? `<tfoot><tr><th colspan="2">Total</th><th>${quantity}</th><th>${money(revenue)}</th><th>${money(cost)}</th><th>${money(revenue - cost)}</th></tr></tfoot>` : ''}</table></div></div>`;
}
function clientsPage() {
  const clients = filtered(state.clients);
  return `${heading('RELATION CLIENT', 'Vos clients', `${state.clients.length} client${state.clients.length > 1 ? 's' : ''} enregistré${state.clients.length > 1 ? 's' : ''}.`, button('＋ Ajouter un client', 'add-client', 'button button-primary'))}<div class="toolbar"><label class="toolbar-search"><span>⌕</span><input data-filter placeholder="Nom, téléphone, ville…" value="${esc(searchTerm)}" /></label></div><div class="panel table-panel"><div class="table-scroll"><table><thead><tr><th>Client</th><th>Téléphone</th><th>Ville</th><th>Achats</th><th>Total dépensé</th><th></th></tr></thead><tbody>${clients.map(client => { const purchases = state.sales.filter(sale => sale.clientId === client.id); return `<tr><td><div class="client-card"><span class="client-avatar">${esc(initials(client.name))}</span><span class="client-info"><strong>${esc(client.name)}</strong><small>${esc(client.email || 'Aucun e-mail')}</small></span></div></td><td>${esc(client.phone)}</td><td>${esc(client.city || '—')}</td><td>${purchases.length}</td><td><strong>${money(purchases.reduce((sum, sale) => sum + sale.total, 0))}</strong></td><td><div class="table-actions"><button class="table-action" title="Modifier" aria-label="Modifier ${esc(client.name)}" data-action="edit-client" data-id="${client.id}">✎</button><button class="table-action" title="Supprimer" aria-label="Supprimer ${esc(client.name)}" data-action="delete-client" data-id="${client.id}">×</button></div></td></tr>`; }).join('') || emptyRow('Aucun client trouvé.', 6)}</tbody></table></div></div>`;
}
function suppliersPage() {
  const suppliers = filtered(state.suppliers);
  return `${heading('APPROVISIONNEMENT', 'Fournisseurs', `${state.suppliers.length} partenaires enregistrés.`, button('＋ Ajouter un fournisseur', 'add-supplier', 'button button-primary'))}<div class="toolbar"><label class="toolbar-search"><span>⌕</span><input data-filter placeholder="Nom, contact, ville…" value="${esc(searchTerm)}" /></label></div><div class="panel table-panel"><div class="table-scroll"><table><thead><tr><th>Fournisseur</th><th>Contact</th><th>Téléphone</th><th>Ville</th><th>Produits liés</th><th></th></tr></thead><tbody>${suppliers.map(supplier => { const count = state.products.filter(product => product.supplier === supplier.name).length; return `<tr><td><div class="client-card"><span class="client-avatar">${esc(initials(supplier.name))}</span><span class="client-info"><strong>${esc(supplier.name)}</strong><small>${esc(supplier.email || 'Aucun e-mail')}</small></span></div></td><td>${esc(supplier.contact || '—')}</td><td>${esc(supplier.phone)}</td><td>${esc(supplier.city || '—')}</td><td>${count} référence${count > 1 ? 's' : ''}</td><td><div class="table-actions"><button class="table-action" title="Modifier" aria-label="Modifier ${esc(supplier.name)}" data-action="edit-supplier" data-id="${supplier.id}">✎</button><button class="table-action" title="Supprimer" aria-label="Supprimer ${esc(supplier.name)}" data-action="delete-supplier" data-id="${supplier.id}">×</button></div></td></tr>`; }).join('') || emptyRow('Aucun fournisseur trouvé.', 6)}</tbody></table></div></div>`;
}
function settingsPage() {
  return `${heading('VOTRE ESPACE', 'Paramètres', 'Personnalisez les informations de votre boutique et gérez vos données.')}
    <div class="settings-layout"><section class="panel"><div class="panel-header"><div><div class="panel-title">Informations de la boutique</div><div class="panel-subtitle">Affichées sur votre espace de gestion</div></div></div><div class="panel-body"><form id="settings-form" class="settings-form"><div class="field full"><label for="shop-name">Nom de la boutique</label><input id="shop-name" name="name" value="${esc(state.shop.name)}" required /></div><div class="field"><label for="shop-city">Ville</label><input id="shop-city" name="city" value="${esc(state.shop.city)}" /></div><div class="field"><label for="shop-phone">Téléphone</label><input id="shop-phone" name="phone" value="${esc(state.shop.phone)}" /></div><div class="field full"><label>Devise</label><input value="Franc CFA (XOF)" disabled /></div><div class="field full">${button('Enregistrer les informations', 'save-settings', 'button button-primary')}</div></form></div></section>
    <section class="panel"><div class="panel-header"><div><div class="panel-title">Sauvegarde et données</div><div class="panel-subtitle">Vos données restent sur cet appareil</div></div></div><div class="panel-body"><p class="settings-note">Les ventes, clients, produits et fournisseurs sont enregistrés dans le stockage local de ce navigateur. Exportez une sauvegarde régulièrement pour conserver une copie de vos données.</p><div class="heading-actions" style="margin-top:15px">${button('↓ Télécharger la sauvegarde', 'export-backup', 'button button-primary')}${button('↑ Restaurer une sauvegarde', 'import-backup', 'button')}</div><input id="backup-file" type="file" accept="application/json" hidden /><p class="settings-note" style="margin-top:24px">Commencer avec des données de démonstration ou repartir de zéro.</p>${button('Réinitialiser les données', 'reset-data', 'button button-danger')}</div></section></div>`;
}
function render() {
  const pages = { dashboard, products: productsPage, inventory: inventoryPage, pos: posPage, sales: salesPage, reports: reportPage, clients: clientsPage, suppliers: suppliersPage, settings: settingsPage };
  root.innerHTML = (pages[activeView] || dashboard)();
  document.querySelector('#sales-count').textContent = state.sales.length;
  document.title = `${pageNames[activeView]} | ${state.shop.name}`;
}
function field(name, label, value = '', type = 'text', options = null, required = false) {
  const requiredAttr = required ? 'required' : '';
  if (options) return `<div class="field"><label for="field-${name}">${label}</label><select id="field-${name}" name="${name}" ${requiredAttr}>${options.map(option => `<option value="${esc(option)}" ${option === value ? 'selected' : ''}>${esc(option)}</option>`).join('')}</select></div>`;
  return `<div class="field"><label for="field-${name}">${label}</label><input id="field-${name}" name="${name}" type="${type}" value="${esc(value)}" ${requiredAttr} ${type === 'number' ? 'min="0" step="1"' : ''} /></div>`;
}
function showDialog(title, subtitle, body, onSubmit, submitLabel = 'Enregistrer') {
  dialogContent.innerHTML = `<form id="dialog-form"><div class="dialog-head"><div><h2>${title}</h2><p>${subtitle}</p></div><button type="button" class="dialog-close" data-action="close-dialog" aria-label="Fermer">×</button></div><div class="dialog-body">${body}</div><div class="dialog-foot"><button type="button" class="button" data-action="close-dialog">Annuler</button><button class="button button-primary" type="submit">${submitLabel}</button></div></form>`;
  dialog.showModal();
  document.querySelector('#dialog-form').addEventListener('submit', event => { event.preventDefault(); const values = Object.fromEntries(new FormData(event.currentTarget).entries()); const result = onSubmit(values); if (result !== false) dialog.close(); });
}
function productDialog(product = null) {
  const isEdit = !!product;
  const supplierOptions = [...new Set([...state.suppliers.map(item => item.name), product?.supplier].filter(Boolean))];
  const body = `<div class="dialog-form">${field('name', 'Nom du produit', product?.name || '', 'text', null, true)}${field('brand', 'Marque', product?.brand || '')}${field('category', 'Catégorie', product?.category || 'Visage', 'text', ['Visage', 'Corps', 'Cheveux', 'Parfum', 'Maquillage', 'Accessoires'])}${field('sku', 'Référence / SKU', product?.sku || '', 'text', null, true)}${field('price', 'Prix de vente (FCFA)', product?.price ?? '', 'number', null, true)}${field('cost', 'Prix d’achat (FCFA)', product?.cost ?? '', 'number', null, true)}${field('qty', 'Quantité en stock', product?.qty ?? 0, 'number', null, true)}${field('threshold', 'Seuil d’alerte', product?.threshold ?? 5, 'number', null, true)}${field('supplier', 'Fournisseur', product?.supplier || '', 'text', supplierOptions.length ? supplierOptions : null)}</div>`;
  showDialog(isEdit ? 'Modifier le produit' : 'Nouveau produit', 'Complétez les informations de votre catalogue.', body, values => {
    const record = { ...values, price: Number(values.price), cost: Number(values.cost), qty: Number(values.qty), threshold: Number(values.threshold) };
    if (!record.name.trim() || !record.sku.trim() || record.price < 0 || record.qty < 0) { toast('Vérifiez les champs obligatoires.', true); return false; }
    if (state.products.some(item => item.sku.toLowerCase() === record.sku.toLowerCase() && item.id !== product?.id)) { toast('Cette référence existe déjà.', true); return false; }
    if (isEdit) Object.assign(product, record); else state.products.unshift({ id: crypto.randomUUID(), ...record });
    save(); render(); toast(isEdit ? 'Produit mis à jour.' : 'Produit ajouté au catalogue.');
  });
}
function simpleRecordDialog(type, record = null) {
  const configs = {
    client: { title: 'client', name: 'Nom complet', extra: `${field('phone', 'Téléphone', record?.phone || '', 'tel', null, true)}${field('city', 'Ville', record?.city || '')}${field('email', 'Adresse e-mail', record?.email || '', 'email')}` },
    supplier: { title: 'fournisseur', name: 'Nom de l’entreprise', extra: `${field('contact', 'Personne à contacter', record?.contact || '')}${field('phone', 'Téléphone', record?.phone || '', 'tel', null, true)}${field('city', 'Ville', record?.city || '')}${field('email', 'Adresse e-mail', record?.email || '', 'email')}` }
  };
  const config = configs[type];
  const body = `<div class="dialog-form">${field('name', config.name, record?.name || '', 'text', null, true)}${config.extra}</div>`;
  showDialog(`${record ? 'Modifier' : 'Ajouter un'} ${config.title}`, `Enregistrez les coordonnées du ${config.title}.`, body, values => {
    if (record) Object.assign(record, values); else state[type === 'client' ? 'clients' : 'suppliers'].unshift({ id: crypto.randomUUID(), ...values });
    save(); render(); toast(`${config.title[0].toUpperCase()}${config.title.slice(1)} ${record ? 'mis à jour' : 'ajouté'}${type === 'client' && !record ? 'e' : ''}.`);
  });
}
function adjustStock(product) {
  const body = `<div class="dialog-form">${field('name', 'Produit', product.name)}${field('qty', 'Stock actuel', product.qty, 'number')}${field('delta', 'Ajustement (+ réception / - perte)', '', 'number', null, true)}${field('note', 'Motif (facultatif)', '')}</div><p class="settings-note">La quantité finale ne peut pas être négative. Un nouvel approvisionnement augmente le stock disponible.</p>`;
  showDialog('Ajuster le stock', `${product.name} · ${product.qty} unité${product.qty > 1 ? 's' : ''} disponible${product.qty > 1 ? 's' : ''}.`, body, values => {
    const next = product.qty + Number(values.delta);
    if (!Number(values.delta) || next < 0) { toast('Ajustement invalide : vérifiez la quantité saisie.', true); return false; }
    product.qty = next; save(); render(); toast(`Stock mis à jour : ${product.qty} unité${product.qty > 1 ? 's' : ''}.`);
  }, 'Valider l’ajustement');
}
function exportCsv(filename, headers, rows) {
  const quote = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const csv = '\ufeff' + [headers, ...rows].map(row => row.map(quote).join(';')).join('\r\n');
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); link.download = filename; link.click(); URL.revokeObjectURL(link.href); toast('Export CSV téléchargé.');
}
function exportSales() { exportCsv('ideal-cosmetique-ventes.csv', ['Référence', 'Date', 'Client', 'Moyen de paiement', 'Total (FCFA)', 'Articles'], state.sales.map(sale => [sale.id, new Date(sale.date).toLocaleString('fr-FR'), clientName(sale.clientId), sale.payment, sale.total, sale.items.map(item => `${item.name} x${item.qty}`).join(', ')])); }
function handleAction(action, id) {
  const product = productById(id);
  const client = state.clients.find(item => item.id === id);
  const supplier = state.suppliers.find(item => item.id === id);
  switch (action) {
    case 'go-pos': searchTerm = ''; setView('pos'); break;
    case 'go-inventory': setView('inventory'); break;
    case 'add-product': productDialog(); break;
    case 'edit-product': productDialog(product); break;
    case 'delete-product': if (product && confirm(`Supprimer « ${product.name} » du catalogue ?`)) { state.products = state.products.filter(item => item.id !== id); save(); render(); toast('Produit supprimé.'); } break;
    case 'adjust-stock': if (product) adjustStock(product); break;
    case 'add-client': simpleRecordDialog('client'); break;
    case 'edit-client': simpleRecordDialog('client', client); break;
    case 'delete-client': if (client && confirm(`Supprimer le client « ${client.name} » ? Son historique de vente sera conservé.`)) { state.clients = state.clients.filter(item => item.id !== id); save(); render(); toast('Client supprimé.'); } break;
    case 'add-supplier': simpleRecordDialog('supplier'); break;
    case 'edit-supplier': simpleRecordDialog('supplier', supplier); break;
    case 'delete-supplier': if (supplier && confirm(`Supprimer « ${supplier.name} » ?`)) { state.suppliers = state.suppliers.filter(item => item.id !== id); save(); render(); toast('Fournisseur supprimé.'); } break;
    case 'cart-add': { const existing = cart.find(line => line.id === id); if (existing) existing.qty++; else cart.push({ id, name: product.name, price: product.price, qty: 1 }); render(); break; }
    case 'cart-inc': { const line = cart.find(item => item.id === id); if (line) line.qty++; render(); break; }
    case 'cart-dec': { const line = cart.find(item => item.id === id); if (line) { line.qty--; if (!line.qty) cart = cart.filter(item => item.id !== id); } render(); break; }
    case 'complete-sale': completeSale(); break;
    case 'export-sales': exportSales(); break;
    case 'export-products': exportCsv('ideal-cosmetique-produits.csv', ['SKU', 'Produit', 'Marque', 'Catégorie', 'Prix de vente (FCFA)', 'Prix d’achat (FCFA)', 'Stock', 'Seuil', 'Fournisseur'], state.products.map(item => [item.sku, item.name, item.brand, item.category, item.price, item.cost, item.qty, item.threshold, item.supplier])); break;
    case 'export-inventory': exportCsv('ideal-cosmetique-stocks.csv', ['SKU', 'Produit', 'Stock', 'Seuil', 'État'], state.products.map(item => [item.sku, item.name, item.qty, item.threshold, stockStatus(item)[0]])); break;
    case 'export-backup': downloadBackup(); break;
    case 'import-backup': document.querySelector('#backup-file').click(); break;
    case 'reset-data': if (confirm('Réinitialiser la boutique avec les données de démonstration ? Cette action remplace les données enregistrées sur cet appareil.')) { state = starterData(); cart = []; save(); render(); toast('Les données de démonstration sont réinitialisées.'); } break;
    case 'save-settings': document.querySelector('#settings-form').requestSubmit(); break;
    case 'close-dialog': dialog.close(); break;
  }
}
function completeSale() {
  if (!cart.length) return;
  const unavailable = cart.find(line => !productById(line.id) || productById(line.id).qty < line.qty);
  if (unavailable) { toast(`Stock insuffisant pour ${unavailable.name}.`, true); return; }
  const total = cart.reduce((sum, line) => sum + line.price * line.qty, 0);
  const sale = { id: `V-${Date.now().toString().slice(-6)}`, date: new Date().toISOString(), clientId: document.querySelector('#cart-client')?.value || '', items: cart.map(line => ({ productId: line.id, name: line.name, qty: line.qty, price: line.price, cost: productById(line.id).cost })), total, payment: document.querySelector('#payment-method')?.value || 'Espèces', status: 'Payée' };
  sale.items.forEach(line => { productById(line.productId).qty -= line.qty; });
  state.sales.unshift(sale); save(); cart = []; searchTerm = ''; setView('sales'); toast(`Vente ${sale.id} encaissée · ${money(total)}.`);
}
function downloadBackup() {
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })); link.download = `ideal-cosmetique-sauvegarde-${dateKey()}.json`; link.click(); URL.revokeObjectURL(link.href); toast('Sauvegarde téléchargée.');
}
document.addEventListener('click', event => {
  const viewButton = event.target.closest('[data-view]');
  if (viewButton) { searchTerm = ''; setView(viewButton.dataset.view); return; }
  const actionButton = event.target.closest('[data-action]');
  if (actionButton) handleAction(actionButton.dataset.action, actionButton.dataset.id);
});
document.addEventListener('input', event => {
  if (event.target.matches('[data-filter]')) { searchTerm = event.target.value; const start = event.target.selectionStart; render(); const field = root.querySelector('[data-filter]'); field?.focus(); field?.setSelectionRange(start, start); }
  if (event.target.id === 'global-search') { searchTerm = event.target.value; if (activeView !== 'products' && activeView !== 'clients' && activeView !== 'suppliers' && activeView !== 'sales' && activeView !== 'pos') setView('products'); else render(); }
});
document.addEventListener('change', event => {
  if (event.target.matches('[data-category-filter]')) { const category = event.target.value; root.querySelectorAll('tbody tr').forEach(row => { row.hidden = !!category && !row.innerText.includes(category); }); }
  if (event.target.matches('[data-stock-filter]')) { const filter = event.target.value; root.querySelectorAll('tbody tr[data-stock-state]').forEach(row => { row.hidden = !!filter && row.dataset.stockState !== filter; }); }
  if (event.target.id === 'report-date') { reportDate = event.target.value || localDateKey(new Date()); render(); }
  if (event.target.id === 'backup-file' && event.target.files[0]) { const file = event.target.files[0]; const reader = new FileReader(); reader.onload = () => { try { const backup = JSON.parse(reader.result); if (!backup.products || !backup.clients || !backup.sales || !backup.suppliers) throw new Error('Format invalide'); state = { ...starterData(), ...backup }; save(); render(); toast('Sauvegarde restaurée avec succès.'); } catch { toast('Ce fichier ne contient pas une sauvegarde valide.', true); } event.target.value = ''; }; reader.readAsText(file); }
});
document.addEventListener('submit', event => {
  if (event.target.id === 'settings-form') { event.preventDefault(); const values = Object.fromEntries(new FormData(event.target).entries()); state.shop = { ...state.shop, ...values }; save(); render(); toast('Informations de la boutique enregistrées.'); }
});
document.querySelector('#menu-toggle').addEventListener('click', () => { document.querySelector('#sidebar').classList.toggle('open'); document.querySelector('.mobile-overlay').classList.toggle('show'); });
const overlay = document.createElement('div'); overlay.className = 'mobile-overlay'; overlay.addEventListener('click', () => { document.querySelector('#sidebar').classList.remove('open'); overlay.classList.remove('show'); }); document.body.append(overlay);
document.addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); document.querySelector('#global-search').focus(); } if (event.key === 'Escape') document.querySelector('#sidebar').classList.remove('open'); });
render();