/* ============ Ronald Design — Configurador Producto ============ */

const state = {
  color: 'negro',
  size: 20,
  basePrice: 25,
  printStyle: 'uv',
  printExtra: 0,
  customDesign: false,
  qty: 1,
  designSrc: null,
  designType: null, // 'upload' | 'stock' | 'custom'
};

const fmt = (n) => `$${n.toFixed(2)}`;

// ---- Swatches color ----
document.querySelectorAll('.swatch').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.swatch').forEach(b => {
      b.classList.remove('border-brand-cyan', 'ring-4', 'ring-brand-cyan/20', 'selected');
      b.classList.add('border-white/20');
    });
    btn.classList.add('border-brand-cyan', 'ring-4', 'ring-brand-cyan/20');
    btn.classList.remove('border-white/20');
    state.color = btn.dataset.color;
    document.getElementById('colorNombre').textContent = state.color.charAt(0).toUpperCase() + state.color.slice(1);
    document.getElementById('resumenColor').textContent = state.color;

    // Cambiar tinte del tumbler base segun color (overlay simple)
    const base = document.getElementById('tumblerBase');
    if (base) {
      if (state.color === 'holografico') {
        base.style.filter = 'hue-rotate(180deg) saturate(1.5) brightness(1.1)';
      } else if (state.color === 'blanco') {
        base.style.filter = 'brightness(1.3) saturate(0.4)';
      } else if (state.color === 'plata') {
        base.style.filter = 'grayscale(0.7) brightness(1.1)';
      } else if (state.color === 'cyan') {
        base.style.filter = 'hue-rotate(140deg) saturate(1.3)';
      } else if (state.color === 'rosa') {
        base.style.filter = 'hue-rotate(300deg) saturate(1.4)';
      } else {
        base.style.filter = 'brightness(0.7)';
      }
    }
    recalc();
  });
});

// ---- Tamaños ----
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(b => {
      b.classList.remove('border-brand-cyan', 'bg-brand-cyan/5', 'selected');
      b.classList.add('border-white/10');
    });
    btn.classList.add('border-brand-cyan', 'bg-brand-cyan/5');
    btn.classList.remove('border-white/10');
    state.size = parseInt(btn.dataset.size);
    state.basePrice = parseFloat(btn.dataset.price);
    document.getElementById('resumenTamano').textContent = state.size + 'oz';
    recalc();
  });
});

// ---- Tabs diseño ----
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('border-brand-cyan', 'text-brand-cyan');
      b.classList.add('border-transparent', 'text-white/50');
    });
    btn.classList.add('border-brand-cyan', 'text-brand-cyan');
    btn.classList.remove('border-transparent', 'text-white/50');

    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    document.getElementById('tab-' + btn.dataset.tab).classList.remove('hidden');

    // Toggle custom
    state.customDesign = btn.dataset.tab === 'custom';
    state.designType = btn.dataset.tab;
    document.getElementById('resumenCustomRow').style.display = state.customDesign ? 'flex' : 'none';
    recalc();
  });
});

// ---- Upload archivo ----
const fileInput = document.getElementById('fileUpload');
const fileLabel = fileInput ? fileInput.closest('label') : null;
if (fileInput) {
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const nameEl = document.getElementById('fileName');
    nameEl.querySelector('span').textContent = file.name;
    nameEl.classList.remove('hidden');

    // Preview
    const reader = new FileReader();
    reader.onload = (ev) => applyDesignPreview(ev.target.result);
    reader.readAsDataURL(file);
  });

  // Drag & drop
  ['dragenter', 'dragover'].forEach(evt =>
    fileLabel.addEventListener(evt, (e) => { e.preventDefault(); fileLabel.classList.add('dragover'); })
  );
  ['dragleave', 'drop'].forEach(evt =>
    fileLabel.addEventListener(evt, (e) => { e.preventDefault(); fileLabel.classList.remove('dragover'); })
  );
  fileLabel.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (!file) return;
    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event('change'));
  });
}

// ---- Stock imagenes ----
document.querySelectorAll('.stock-img').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.stock-img').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const img = btn.querySelector('img');
    applyDesignPreview(img.src);
  });
});

function applyDesignPreview(src) {
  const preview = document.getElementById('designPreview');
  const img = document.getElementById('designImg');
  img.src = src;
  preview.style.opacity = '1';
}

// ---- Print style ----
document.querySelectorAll('.print-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.print-btn').forEach(b => {
      b.classList.remove('border-brand-cyan', 'bg-brand-cyan/5', 'selected');
      b.classList.add('border-white/10');
    });
    btn.classList.add('border-brand-cyan', 'bg-brand-cyan/5');
    btn.classList.remove('border-white/10');
    state.printStyle = btn.dataset.print;
    state.printExtra = parseFloat(btn.dataset.extra);
    const nombres = { uv: 'UV Full Color', vinilo: 'Vinilo', glitter: 'Glitter' };
    document.getElementById('resumenPrint').textContent = nombres[state.printStyle];
    recalc();
  });
});

// ---- Cantidad ----
const qtyInput = document.getElementById('qtyInput');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');

function setQty(v) {
  v = Math.max(1, Math.min(999, parseInt(v) || 1));
  qtyInput.value = v;
  state.qty = v;
  document.getElementById('resumenQty').textContent = v;
  recalc();
}
if (qtyMinus) qtyMinus.addEventListener('click', () => setQty(state.qty - 1));
if (qtyPlus) qtyPlus.addEventListener('click', () => setQty(state.qty + 1));
if (qtyInput) qtyInput.addEventListener('input', (e) => setQty(e.target.value));

// ---- Cálculo ----
function recalc() {
  const baseLine = state.basePrice;
  const printLine = state.printExtra;
  const customLine = state.customDesign ? 15 : 0;
  const unit = baseLine + printLine + customLine;
  const subtotal = unit * state.qty;

  let descPct = 0;
  if (state.qty >= 50) descPct = 0.20;
  else if (state.qty >= 10) descPct = 0.10;
  const desc = subtotal * descPct;
  const total = subtotal - desc;

  document.getElementById('precioActual').textContent = fmt(unit);
  document.getElementById('resumenBase').textContent = fmt(baseLine);
  document.getElementById('resumenExtra').textContent = (printLine >= 0 ? '+' : '') + fmt(printLine);
  document.getElementById('resumenSubtotal').textContent = fmt(subtotal);

  const descRow = document.getElementById('resumenDescRow');
  if (descPct > 0) {
    descRow.style.display = 'flex';
    document.getElementById('resumenDesc').textContent = '-' + fmt(desc);
  } else {
    descRow.style.display = 'none';
  }

  document.getElementById('resumenTotal').textContent = fmt(total);
}

// ---- Tabs descripción inferior ----
document.querySelectorAll('.info-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.info-tab').forEach(b => {
      b.classList.remove('border-brand-cyan', 'text-brand-cyan');
      b.classList.add('border-transparent', 'text-white/50');
    });
    btn.classList.add('border-brand-cyan', 'text-brand-cyan');
    btn.classList.remove('border-transparent', 'text-white/50');
    document.querySelectorAll('.info-content').forEach(c => c.classList.add('hidden'));
    document.getElementById('info-' + btn.dataset.info).classList.remove('hidden');
  });
});

// ---- Thumbnails preview ----
document.querySelectorAll('.thumb-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.thumb-btn').forEach(b => {
      b.classList.remove('border-brand-cyan', 'opacity-100');
      b.classList.add('border-white/10', 'opacity-60');
    });
    btn.classList.add('border-brand-cyan', 'opacity-100');
    btn.classList.remove('border-white/10', 'opacity-60');
    const newSrc = btn.querySelector('img').src.replace('w=200', 'w=600');
    document.getElementById('tumblerBase').src = newSrc;
  });
});

// ---- Agregar al carrito ----
const addBtn = document.getElementById('addToCart');
if (addBtn) {
  addBtn.addEventListener('click', () => {
    const cart = window.RDCart.get();
    cart.push({
      product: 'Tumbler 20oz UV Print',
      color: state.color,
      size: state.size,
      print: state.printStyle,
      custom: state.customDesign,
      qty: state.qty,
      price: parseFloat(document.getElementById('resumenTotal').textContent.replace('$','')),
    });
    window.RDCart.set(cart);
    window.showToast('✓ Agregado al carrito');
  });
}

// Init
recalc();
