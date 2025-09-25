/* =======================================================
   La Dosha Hotel — Cart Module (Cleaned & Simplified)
   ======================================================= */

const STORAGE_KEY = 'ladosha_cart_v2';

/* ---------- Core Storage ---------- */
const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  renderCart();
  updateCounts();
  updateMobileTotal();
};

/* ---------- Toast Notifications ---------- */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ---------- Cart Operations ---------- */
const addToCart = (id, name, price, qty = 1, opts = {}) => {
  qty = Number(qty) || 1;
  const cart = getCart();
  const sig = opts.signature || '';

  const found = cart.find(x => x.id === id && x.signature === sig);

  if (found) {
    found.qty += qty;
    if (opts.note) found.note = opts.note; // overwrite note if provided
  } else {
    cart.push({
      id,
      name,
      price,
      qty,
      signature: sig,
      note: opts.note || '',
      offer: opts.offer || '',
      img: opts.img || 'assets/images/placeholder.png'
    });
  }

  saveCart(cart);
  showToast(`✅ ${name} added to cart`);
};

const changeQty = (i, q) => {
  const cart = getCart();
  if (!cart[i]) return;
  cart[i].qty = Number(q) || 1;
  saveCart(cart);
};

const updateNote = (i, note) => {
  const cart = getCart();
  if (!cart[i]) return;
  cart[i].note = note;
  saveCart(cart);
};

const removeItem = (i) => {
  const cart = getCart();
  cart.splice(i, 1);
  saveCart(cart);
};

const clearCart = () => {
  localStorage.removeItem(STORAGE_KEY);
  renderCart();
  updateCounts();
  updateMobileTotal();
};

/* ---------- UI Rendering ---------- */
const renderCart = () => {
  const area = document.getElementById('cart-contents');
  const summary = document.getElementById('cart-summary');
  if (!area || !summary) return;

  const cart = getCart();
  if (cart.length === 0) {
    area.innerHTML = '<p>Your cart is empty.</p>';
    summary.innerHTML = '';
    updateMobileTotal();
    return;
  }

  area.innerHTML = cart.map((it, idx) => `
    <div class="cart-row" style="display:flex;align-items:flex-start;gap:16px;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #eee">
      <img src="${it.img}" alt="${it.name}" style="width:80px;height:80px;object-fit:cover;border-radius:8px"/>
      <div style="flex:1">
        <strong>${it.name}</strong>
        <div style="margin-top:6px">
          <label style="font-size:13px;color:#555">Note:</label>
          <input type="text" value="${it.note || ''}" 
                 placeholder="Add instructions..."
                 onchange="updateNote(${idx}, this.value)"
                 style="width:100%;padding:6px;border:1px solid #ccc;border-radius:6px;font-size:13px"/>
        </div>
        ${it.offer ? `<div style="font-size:13px;color:green">Offer: ${it.offer}</div>` : ''}
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
        <input type="number" min="1" value="${it.qty}" 
               onchange="changeQty(${idx},this.value)" 
               style="width:70px;text-align:center"/>
        <div style="font-size:14px">KES ${it.qty * it.price}</div>
        <button class="btn" onclick="removeItem(${idx})">Remove</button>
      </div>
    </div>
  `).join('');

  summary.innerHTML = `
    <p><strong>Total: KES ${getCartTotal()}</strong></p>
    <p>
      <a class="btn primary" href="checkout.html">Checkout</a>
      <button class="btn" onclick="clearCart()">Clear</button>
    </p>
  `;

  updateMobileTotal();
};

/* ---------- Totals & Counts ---------- */
const getCartTotal = () => 
  getCart().reduce((s, i) => s + (i.price * i.qty), 0);

const updateCounts = () => {
  const count = getCart().reduce((s, i) => s + i.qty, 0);
  ['cart-count', 'cart-count-2', 'cart-count-3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = count;
  });
};

const getCartItems = () => getCart();

/* ---------- Mobile Sticky Total ---------- */
const updateMobileTotal = () => {
  const el = document.getElementById('mobile-total');
  if (el) el.textContent = "KES " + getCartTotal();
};

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateCounts();
  updateMobileTotal();
});
