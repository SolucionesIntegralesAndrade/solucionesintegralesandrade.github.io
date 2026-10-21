/*! Andrade Solutions · Sumale a tu tienda (POS + CRM + ERP) · demo interactiva, JS vanilla sin dependencias.
   Contrato de montaje: ver /_comun/README.md */
(function () {
'use strict';
if (window.__SX_BOOT) return;
window.__SX_BOOT = 1;
var doc = document;
var FAST = !!window.__SX_FAST;
var REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
var SCRIPT = doc.currentScript;

/* ---------- config compartida (window.ANDRADE) ---------- */
var DEF_CFG = { email: 'solucionesintegralesandradee@gmail.com', whatsapp: '', instagram: '', nombre: 'Andrade Solutions', ciudad: 'La Plata, Argentina' };
function withConfig(cb) {
  if (window.ANDRADE) { cb(); return; }
  if (window.__ANDRADE_Q) { window.__ANDRADE_Q.push(cb); return; }
  var q = window.__ANDRADE_Q = [cb];
  var base = '/_comun/';
  try { if (SCRIPT && SCRIPT.src) base = SCRIPT.src.replace(/[^\/?#]*([?#].*)?$/, ''); } catch (e) {}
  var s = doc.createElement('script');
  s.src = base + 'config.js'; s.async = true;
  var done = function () {
    if (!window.ANDRADE) { window.ANDRADE = {}; for (var k in DEF_CFG) window.ANDRADE[k] = DEF_CFG[k]; }
    var l = q; window.__ANDRADE_Q = null;
    l.forEach(function (f) { try { f(); } catch (e) { console.error(e); } });
  };
  s.onload = done; s.onerror = done;
  doc.head.appendChild(s);
}

/* ---------- utilidades ---------- */
function h(t, a) {
  var m = t.split('.'), el = doc.createElement(m[0] || 'div'), i = 1, post = {};
  if (m.length > 1) el.className = m.slice(1).join(' ');
  if (a && typeof a === 'object' && !a.nodeType && !Array.isArray(a)) {
    i = 2;
    for (var k in a) {
      var v = a[k];
      if (v == null || v === false) continue;
      if (k === 'on') { for (var e in v) el.addEventListener(e, v[e]); }
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'value' || k === 'checked') post[k] = v;
      else el.setAttribute(k, v === true ? '' : v);
    }
  }
  (function add(list) {
    for (var j = 0; j < list.length; j++) {
      var c = list[j];
      if (c == null || c === false) continue;
      if (Array.isArray(c)) add(c);
      else el.appendChild(c.nodeType ? c : doc.createTextNode(String(c)));
    }
  })(Array.prototype.slice.call(arguments, i));
  if ('value' in post) el.value = post.value;
  if ('checked' in post) el.checked = !!post.checked;
  return el;
}
var PATHS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>', plus: '<path d="M12 5v14M5 12h14"/>', minus: '<path d="M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>', check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>', left: '<path d="M15 5l-7 7 7 7"/>', right: '<path d="M9 5l7 7-7 7"/>',
  cart: '<path d="M3 4h2l2.2 10.2a1 1 0 001 .8h8.6a1 1 0 001-.8L19 8H6"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
  scan: '<path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M4 12h16"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/>',
  box: '<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  bell: '<path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 004 0"/>', clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
  file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
  truck: '<path d="M2 6h11v10H2zM13 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.2"/>', cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/>',
  qr: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>',
  bank: '<path d="M3 10l9-6 9 6zM5 10v8M10 10v8M14 10v8M19 10v8M3 20h18"/>', lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  download: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>', undo: '<path d="M9 7L4 12l5 5"/><path d="M4 12h10a6 6 0 010 8"/>', pause: '<path d="M8 5v14M16 5v14"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>', phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9L3.5 9.7l5.9-.8z"/>',
  gift: '<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M12 9v11M3 9h18M12 9c-3-.5-4-5-1-5 2 0 1 5 1 5zM12 9c3-.5 4-5 1-5-2 0-1 5-1 5z"/>',
  grid: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
  link: '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3A4 4 0 0011 18.7l1-1"/>',
  play: '<path d="M7 4.5l12 7.5-12 7.5z"/>', shop: '<path d="M4 9l1.5-5h13L20 9M4 9h16v11H4z"/><path d="M4 9a3 3 0 006 0 3 3 0 006 0 3 3 0 004 0"/>',
  alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>', arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', sound: '<path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 010 6"/>'
};
function ico(n) {
  return h('span.sx-ico', { 'aria-hidden': 'true', html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (PATHS[n] || '') + '</svg>' });
}
function fmt(n) {
  n = Math.round(n || 0);
  var s = String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (n < 0 ? '-' : '') + '$ ' + s;
}
function num(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function pad(n, l) { n = String(n); while (n.length < l) n = '0' + n; return n; }
function hash(s) { var x = 2166136261; for (var i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }
function rng(seed) { var a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }
var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
var DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
function dateAgo(n) { var d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - n); return d; }
function dmy(d) { return pad(d.getDate(), 2) + '/' + pad(d.getMonth() + 1, 2); }
function when(ago) { return ago <= 0 ? 'Hoy' : ago === 1 ? 'Ayer' : ago < 30 ? 'Hace ' + ago + ' días' : ago < 60 ? 'Hace ' + Math.round(ago / 7) + ' semanas' : 'Hace ' + Math.round(ago / 30) + ' meses'; }
function hm(d) { return pad(d.getHours(), 2) + ':' + pad(d.getMinutes(), 2); }
function initials(n) { return n.split(/\s+/).slice(0, 2).map(function (x) { return x.charAt(0); }).join('').toUpperCase(); }
function sleep(ms) { return new Promise(function (r) { setTimeout(r, FAST ? 4 : ms); }); }
function cleanEl(el) { while (el.firstChild) el.removeChild(el.firstChild); }
function download(name, text, mime) {
  var blob = new Blob(['﻿' + text], { type: mime || 'text/csv;charset=utf-8' });
  var url = (window.URL || window.webkitURL).createObjectURL(blob);
  var a = h('a', { href: url, download: name, style: 'display:none' });
  doc.body.appendChild(a); a.click();
  setTimeout(function () { a.remove(); try { URL.revokeObjectURL(url); } catch (e) {} }, 800);
}
function csv(rows) {
  return rows.map(function (r) { return r.map(function (c) { c = String(c == null ? '' : c); return /[;"\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c; }).join(';'); }).join('\r\n');
}
/* color de texto sobre el acento (contraste) */
function onColor(css) {
  var m = String(css).trim(), r, g, b;
  var x = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(m);
  if (x) { var s = x[1]; if (s.length === 3) s = s.replace(/./g, '$&$&'); r = parseInt(s.substr(0, 2), 16); g = parseInt(s.substr(2, 2), 16); b = parseInt(s.substr(4, 2), 16); }
  else { var y = /rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/.exec(m); if (!y) return '#fff'; r = +y[1]; g = +y[2]; b = +y[3]; }
  function lin(c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
  var L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return L > 0.42 ? '#141210' : '#ffffff';
}

/* ---------- datos ficticios por rubro ---------- */
var BR = ['La Plata Centro', 'City Bell', 'Depósito'];
var STAGES = ['Nueva consulta', 'Cotizada', 'Reservada', 'Vendida', 'Postventa'];
var CHANNELS = ['Instagram', 'WhatsApp', 'Tienda online', 'Local'];
var RUBROS = {
  deco: {
    pre: 'DEC', scale: 1, vol: 1, word: 'tu casa de deco',
    cats: ['Textiles', 'Aromas', 'Mesa', 'Luz y objetos'],
    sup: ['Telar del Sur', 'Cerería Norte', 'Taller Arcilla', 'Casa Lumen'],
    prefs: ['Le gustan los tonos tierra', 'Prefiere lino y algodón', 'Estilo nórdico: blancos y maderas', 'Compra regalos para casamientos', 'Decora un departamento chico'],
    problems: ['Vendés un almohadón que ya no tenés', 'Las consultas de Instagram se pierden entre mensajes', 'No sabés qué producto te deja plata de verdad'],
    products: [
      ['Almohadón lino Brisa', 'Textiles', 9800, 18900, ['40×40', '50×50'], 0, 3], ['Manta tejida Sierras', 'Textiles', 24500, 46900, ['Crudo', 'Terracota', 'Gris'], 0, 2],
      ['Vela de soja Higo', 'Aromas', 6200, 12900, ['180 g', '300 g'], 1, 4], ['Difusor de varillas Bosque', 'Aromas', 8900, 17500, ['100 ml', '250 ml'], 1, 3],
      ['Jarrón cerámica Duna', 'Mesa', 15800, 31500, ['Chico', 'Mediano', 'Grande'], 2, 2], ['Set de 4 tazas Arena', 'Mesa', 19900, 38900, ['Único'], 2, 2],
      ['Bandeja de mimbre Delta', 'Mesa', 7400, 14800, ['Único'], 3, 3], ['Velador Lumen', 'Luz y objetos', 28900, 54900, ['Blanco', 'Negro'], 3, 2],
      ['Guirnalda LED cálida', 'Luz y objetos', 5600, 11800, ['3 m', '5 m'], 3, 4], ['Cortina de lino Alba', 'Textiles', 31000, 58900, ['1,40 × 2,20 m', '2,80 × 2,20 m'], 0, 2],
      ['Platos de postre Ágata (x6)', 'Mesa', 16900, 32900, ['Único'], 2, 2], ['Espejo redondo Luna', 'Luz y objetos', 22000, 42500, ['50 cm', '70 cm'], 3, 2]
    ]
  },
  joyeria: {
    pre: 'JOY', scale: 8, vol: 0.28, word: 'tu joyería',
    cats: ['Anillos', 'Aros', 'Cadenas y dijes', 'Plata 925'],
    sup: ['Taller Orfebre Sur', 'Fundición Los Tilos', 'Plateros del Plata'],
    prefs: ['Anillo talle 14', 'Solo oro amarillo', 'Prefiere diseños finos y delicados', 'Compra para aniversarios', 'Plata 925 para uso diario'],
    problems: ['Una pieza de oro vendida dos veces o perdida en el stock', 'Cotizaciones por WhatsApp que nadie retoma', 'No sabés cuánto capital tenés parado en la vitrina'],
    products: [
      ['Anillo solitario Aurora oro 18k', 'Anillos', 210000, 368000, ['12', '14', '16', '18'], 0, 1], ['Alianza clásica oro 18k (par)', 'Anillos', 390000, 640000, ['Talle 10 a 14', 'Talle 15 a 19'], 0, 1],
      ['Aros argolla Lune oro 18k', 'Aros', 92000, 164000, ['15 mm', '20 mm'], 0, 2], ['Aros perla cultivada oro 18k', 'Aros', 78000, 139000, ['Único'], 1, 2],
      ['Cadena veneciana oro 18k', 'Cadenas y dijes', 185000, 319000, ['40 cm', '45 cm', '50 cm'], 1, 1], ['Dije letra oro 18k', 'Cadenas y dijes', 46000, 84000, ['A', 'L', 'M', 'S'], 1, 2],
      ['Pulsera eslabones oro 18k', 'Cadenas y dijes', 240000, 412000, ['17 cm', '19 cm'], 0, 1], ['Medalla Virgen oro 18k', 'Cadenas y dijes', 58000, 98000, ['Chica', 'Mediana'], 1, 2],
      ['Aros gota plata 925', 'Plata 925', 16000, 34500, ['Único'], 2, 3], ['Anillo trama plata 925', 'Plata 925', 14500, 31000, ['14', '16', '18'], 2, 3],
      ['Cadena cordón plata 925', 'Plata 925', 22000, 45900, ['45 cm', '50 cm'], 2, 2], ['Tobillera Sol oro 18k', 'Cadenas y dijes', 65000, 112000, ['Único'], 0, 1]
    ]
  },
  belleza: {
    pre: 'BEL', scale: 1, vol: 1.1, word: 'tu tienda de belleza',
    cats: ['Rostro', 'Cuerpo', 'Cabello', 'Maquillaje'],
    sup: ['Laboratorios Verde Claro', 'Esencias del Plata', 'Cosmética Aura'],
    prefs: ['Piel mixta, sensible al perfume', 'Prefiere productos veganos', 'Piel seca, busca hidratación', 'Cabello teñido', 'Compra sets de regalo'],
    problems: ['Productos que se agotan o se vencen sin que te enteres', 'Clientas que compraron una vez y no volvieron', 'Una caja que no cierra al final del día'],
    products: [
      ['Sérum vitamina C', 'Rostro', 9200, 21900, ['30 ml', '50 ml'], 0, 3], ['Crema hidratante Alba', 'Rostro', 7800, 18500, ['50 g', '100 g'], 0, 3],
      ['Limpiador en gel Rocío', 'Rostro', 5400, 13200, ['150 ml', '250 ml'], 0, 3], ['Protector solar FPS 50', 'Rostro', 8600, 19800, ['50 ml'], 0, 4],
      ['Aceite corporal Almendra', 'Cuerpo', 6900, 16500, ['120 ml', '250 ml'], 1, 3], ['Exfoliante de café', 'Cuerpo', 4800, 11900, ['200 g'], 1, 3],
      ['Shampoo sólido Argán', 'Cabello', 5100, 12800, ['Único'], 1, 4], ['Máscara capilar Karité', 'Cabello', 7300, 17400, ['250 g', '500 g'], 1, 2],
      ['Labial mate Bordó', 'Maquillaje', 4300, 10900, ['Bordó', 'Rosa té', 'Nude'], 2, 4], ['Base fluida Satén', 'Maquillaje', 9800, 23400, ['Tono 1', 'Tono 2', 'Tono 3', 'Tono 4'], 2, 3],
      ['Máscara de pestañas Volumen', 'Maquillaje', 5600, 13900, ['Negro'], 2, 3], ['Set de regalo Ritual', 'Cuerpo', 16500, 34900, ['Único'], 1, 2]
    ]
  },
  lenceria: {
    pre: 'LEN', scale: 1, vol: 1.2, word: 'tu lencería',
    cats: ['Corpiños', 'Bombachas', 'Conjuntos', 'Pijamas'],
    sup: ['Textil Berazategui', 'Encajes Palermo', 'Moda Íntima Sur'],
    prefs: ['Talle de corpiño 90', 'Prefiere algodón y sin aro', 'Colores: negro y bordó', 'Talle M en bombachas', 'Busca conjuntos para regalar'],
    problems: ['Talles que se agotan y no te enterás', 'Clientas que no vuelven porque nadie las recontacta', 'Ventas del local y de Instagram anotadas en cuadernos distintos'],
    products: [
      ['Corpiño push up Ofelia', 'Corpiños', 9800, 22900, ['85', '90', '95', '100'], 0, 3], ['Corpiño sin aro algodón', 'Corpiños', 7600, 17900, ['S', 'M', 'L'], 0, 3],
      ['Bralette de encaje Luna', 'Corpiños', 8200, 19400, ['S', 'M', 'L'], 1, 3], ['Bombacha tiro alto', 'Bombachas', 3200, 7900, ['S', 'M', 'L', 'XL'], 0, 6],
      ['Culotte microfibra', 'Bombachas', 2800, 6900, ['S', 'M', 'L', 'XL'], 0, 6], ['Tanga de encaje', 'Bombachas', 2600, 6400, ['S', 'M', 'L'], 1, 5],
      ['Conjunto encaje bordó', 'Conjuntos', 16800, 38900, ['85 / M', '90 / M', '90 / L'], 1, 2], ['Conjunto algodón Nube', 'Conjuntos', 12400, 28900, ['S', 'M', 'L'], 0, 3],
      ['Body de tul Aurora', 'Conjuntos', 14200, 32900, ['S', 'M', 'L'], 1, 2], ['Pijama de satén 2 piezas', 'Pijamas', 17800, 41500, ['S', 'M', 'L', 'XL'], 2, 2],
      ['Camisón corto modal', 'Pijamas', 9400, 21900, ['S', 'M', 'L'], 2, 3], ['Robe de seda Lila', 'Pijamas', 21500, 47900, ['Único'], 2, 2]
    ]
  },
  moda: {
    pre: 'MOD', scale: 1, vol: 0.9, word: 'tu tienda de moda',
    cats: ['Vestidos', 'Tops', 'Pantalones', 'Accesorios'],
    sup: ['Taller Costura Sur', 'Textiles del Plata', 'Cuero y Cía'],
    prefs: ['Talle M, colores neutros', 'Talle 40 en pantalones', 'Le gusta el lino y los tonos tierra', 'Talle S, vestidos midi', 'Prendas versátiles para la oficina'],
    problems: ['Talles y colores descuadrados entre el local e Instagram', 'Consultas por Instagram sin seguimiento', 'No saber qué prendas dejan margen y cuáles quedan colgadas'],
    products: [
      ['Vestido de lino Marea', 'Vestidos', 24800, 52900, ['S', 'M', 'L'], 0, 2], ['Vestido camisero Alma', 'Vestidos', 22500, 48900, ['S', 'M', 'L', 'XL'], 0, 2],
      ['Vestido midi satén Noche', 'Vestidos', 31000, 66900, ['S', 'M', 'L'], 0, 2], ['Blusa de crepe Ola', 'Tops', 11800, 26900, ['S', 'M', 'L'], 1, 3],
      ['Top de punto Brisa', 'Tops', 7400, 16900, ['S', 'M', 'L'], 1, 4], ['Remera de algodón Básica', 'Tops', 5600, 12900, ['S', 'M', 'L', 'XL'], 1, 5],
      ['Pantalón sastrero Lía', 'Pantalones', 20400, 44900, ['38', '40', '42', '44'], 1, 3], ['Jean recto Delta', 'Pantalones', 19400, 42500, ['36', '38', '40', '42'], 1, 3],
      ['Palazzo de lino Sol', 'Pantalones', 17600, 38900, ['S', 'M', 'L'], 0, 2], ['Cinturón de cuero Ojal', 'Accesorios', 7900, 18500, ['Negro', 'Camel'], 2, 3],
      ['Cartera bandolera Cuna', 'Accesorios', 21900, 49800, ['Único'], 2, 2], ['Pañuelo de seda Trama', 'Accesorios', 6100, 14800, ['Único'], 2, 3]
    ]
  }
};
var CUST_SEED = [
  ['Valentina Ríos', 'vip', 12], ['Camila Duarte', 'freq', 4], ['Lucía Ferrero', 'nueva', 200], ['Agustina Paz', 'inact', 33], ['Martina Sosa', 'freq', 25],
  ['Julieta Lanzi', 'inact', 75], ['Sofía Bianchi', 'vip', 9], ['Micaela Acosta', 'nueva', 58], ['Florencia Gómez', 'freq', 140], ['Romina Álvarez', 'inact', 18],
  ['Carolina Techera', 'freq', 90], ['Paula Iturralde', 'nueva', 3], ['Nadia Cabrera', 'inact', 250], ['Belén Molina', 'vip', 60], ['Estudio Nómade SRL', 'ri', 100]
];
var SELLERS = ['Sol', 'Cami', 'Lu'];
var PAYS = { ef: 'Efectivo', tj: 'Tarjeta', tr: 'Transferencia', qr: 'Mercado Pago (QR)' };
var COMMENTS = ['Me atendieron súper bien y llegó rapidísimo.', 'Hermosa la presentación, volvería a comprar.', 'Todo perfecto, me avisaron cuando estuvo listo.', 'Muy lindo todo, solo tardó un poco el envío.', 'Me encantó, ya se lo recomendé a mi hermana.', 'Buena calidad y atención por WhatsApp.', 'No tenían mi talle pero me avisaron cuando entró.'];

/* =====================================================================
   Una instancia de la suite: estado único en memoria + 4 módulos
   ===================================================================== */
function create(host, cfg) {
  var rk = host.getAttribute('data-rubro'); if (!RUBROS[rk]) rk = 'moda';
  var R = RUBROS[rk];
  var marca = host.getAttribute('data-marca') || 'Tu tienda';
  /* Todo vive en un Shadow DOM: el CSS de la página anfitriona no entra ni el nuestro sale */
  var sh = host.shadowRoot || host.attachShadow({ mode: 'open' });
  cleanEl(sh);
  var root = h('div.sx');
  var rnd = rng(hash(rk + 'sx2'));
  var S = {
    rk: rk, P: [], C: [], deals: [], tasks: [], sales: [], hist: [], kardex: [], po: [], AP: [], invoices: [], camps: [], nps: [], orders: [],
    autos: [
      { k: 'post', t: '3 días después de la compra', a: 'Pedir una reseña por WhatsApp', on: true, runs: 38 },
      { k: 'bday', t: 'El día del cumpleaños', a: 'Enviar saludo con cupón de 15%', on: true, runs: 12 },
      { k: 'back', t: '45 días sin comprar', a: 'Mandar "te extrañamos" con beneficio', on: false, runs: 0 },
      { k: 'lead', t: 'Consulta sin respuesta por 2 horas', a: 'Avisar al equipo y reprogramar seguimiento', on: true, runs: 21 },
      { k: 'stock', t: 'Stock por debajo del mínimo', a: 'Sugerir orden de compra al proveedor', on: true, runs: 7 }
    ],
    alerted: {}, seq: 1240, poSeq: 11, invSeq: { A: 40, B: 311, C: 95 }, id: 100,
    cond: 'ri', role: 'duena', br: 0, tab: 'caja',
    cart: { lines: [], cust: null, seller: 0, gd: { t: '%', v: 0 }, note: '', credit: 0 },
    held: [],
    caja: { open: true, opening: 20000, sess: 1, moves: [], closed: null },
    scale: R.scale, marca: marca
  };
  var mods = {};
  var live = h('div.sx-toasts', { 'aria-live': 'polite', role: 'status' });

  /* ---------- helpers de estado ---------- */
  function nid() { return ++S.id; }
  function stockAt(p, b) { return p.vars.reduce(function (s, v) { return s + v.st[b]; }, 0); }
  function stockTot(p) { return p.vars.reduce(function (s, v) { return s + v.st[0] + v.st[1] + v.st[2]; }, 0); }
  function resTot(p) { return p.vars.reduce(function (s, v) { return s + v.res[0] + v.res[1] + v.res[2]; }, 0); }
  function availTot(p) { return stockTot(p) - resTot(p); }
  function availV(v, b) { return v.st[b] - v.res[b]; }
  function isLow(p) { return availTot(p) <= p.min; }
  function autoOn(k) { return S.autos.filter(function (a) { return a.k === k; })[0].on; }
  function autoRun(k) { S.autos.filter(function (a) { return a.k === k; })[0].runs++; }
  function custById(id) { return S.C.filter(function (c) { return c.id === id; })[0] || null; }
  function ltv(c) { return c.purch.reduce(function (s, x) { return s + x.total; }, 0); }
  function lastAgo(c) { var m = 9999; c.purch.forEach(function (x) { if (x.total > 0 && x.ago < m) m = x.ago; }); return m; }
  function firstAgo(c) { var m = -1; c.purch.forEach(function (x) { if (x.total > 0 && x.ago > m) m = x.ago; }); return m; }
  function nBuys(c) { return c.purch.filter(function (x) { return x.total > 0; }).length; }
  function segOf(c, seg) {
    if (seg === 'todas') return true;
    if (seg === 'vip') return c.tags.indexOf('VIP') > -1;
    if (seg === 'nuevas') return firstAgo(c) >= 0 && firstAgo(c) <= 30;
    if (seg === 'frecuentes') return nBuys(c) >= 3 && lastAgo(c) <= 45;
    if (seg === 'inactivas') return lastAgo(c) > 60;
    if (seg === 'cumple') return c.bday <= 30;
    return true;
  }
  function bdayLabel(c) { var d = new Date(); d.setDate(d.getDate() + c.bday); return d.getDate() + ' de ' + MESES[d.getMonth()]; }
  function can(sec) {
    var r = S.role;
    if (r === 'duena') return true;
    if (r === 'vendedora') return sec === 'panel' || sec === 'inventario' || sec === 'integraciones';
    return sec === 'panel' || sec === 'facturacion' || sec === 'cuentas' || sec === 'reportes';
  }
  function seeCost() { return S.role !== 'vendedora'; }

  /* ---------- estadísticas (derivadas del historial único) ---------- */
  function range(days, off) {
    var rev = 0, cost = 0, units = 0, tickets = 0, past = 0;
    for (var d = off; d < off + days && d < S.hist.length; d++) {
      for (var i = 0; i < S.P.length; i++) { var u = S.hist[d][i]; if (!u) continue; rev += u * S.P[i].price; cost += u * S.P[i].cost; units += u; if (d > 0) past += u; }
    }
    if (off === 0) tickets = Math.round(past / 1.55) + todaySales().length;
    else tickets = Math.round(units / 1.55);
    return { rev: rev, cost: cost, units: units, tickets: Math.max(tickets, units ? 1 : 0), margin: rev - cost };
  }
  function todaySales() { return S.sales.filter(function (s) { return s.ago === 0 && !s.void; }); }
  function dayRev(d) { var r = 0; for (var i = 0; i < S.P.length; i++) r += S.hist[d][i] * S.P[i].price; return r; }
  function unitsBy(days) { return S.P.map(function (p, i) { var u = 0; for (var d = 0; d < days; d++) u += S.hist[d][i]; return u; }); }
  function immobilized() {
    var u = unitsBy(31), v = 0;
    S.P.forEach(function (p, i) { if (!u[i]) v += p.cost * stockTot(p); });
    return v;
  }
  function valuation() { return S.P.reduce(function (s, p) { return s + p.cost * stockTot(p); }, 0); }

  /* ---------- operaciones de negocio (todas pasan por acá) ---------- */
  var topics = {};
  function emit() {
    if (S.onView) S.onView();
    Object.keys(mods).forEach(function (k) { var m = mods[k]; if (k === S.tab) m.refresh(); else m.dirty = true; });
  }
  function kard(p, vi, br, q, why) { S.kardex.unshift({ ts: new Date(), pid: p.id, vn: p.vars[vi].n, br: br, q: q, why: why }); if (S.kardex.length > 60) S.kardex.pop(); }
  function invType(sale) { if (S.cond === 'mono') return 'C'; var c = sale.cust != null ? custById(sale.cust) : null; return c && c.ri ? 'A' : 'B'; }

  function sell(o) {
    var ago = o.ago || 0, ts = ago ? dateAgo(ago) : new Date();
    var gross = 0, cost = 0, lineDisc = 0, items = [];
    o.lines.forEach(function (l) {
      var p = S.P[l.pid], v = p.vars[l.vi], sub = p.price * l.q, d = Math.min(sub, Math.round(l.dAmt || 0));
      gross += sub; lineDisc += d; cost += p.cost * l.q;
      items.push({ pid: l.pid, vi: l.vi, name: p.name, vn: v.n, q: l.q, price: p.price, disc: d });
      if (!ago) {
        v.st[o.branch] = Math.max(0, v.st[o.branch] - l.q);
        S.hist[0][l.pid] += l.q;
        kard(p, l.vi, o.branch, -l.q, 'Venta');
      }
    });
    var total = Math.max(0, Math.round(gross - lineDisc - (o.gdisc || 0) - (o.credit || 0)));
    var sale = {
      id: ++S.seq, ago: ago, ts: ts, items: items, gross: gross, lineDisc: lineDisc, gdisc: Math.round(o.gdisc || 0), credit: o.credit || 0, total: total,
      cost: cost, pays: o.pays || [{ m: 'ef', amt: total }], cust: o.cust == null ? null : o.cust, seller: o.seller || 0, branch: o.branch, ch: o.ch || 'Local',
      note: o.note || '', sess: S.caja.sess, inv: null, ret: 0, live: !o.seed
    };
    S.sales.unshift(sale);
    if (!o.seed) {
      crmAfterSale(sale);
      items.forEach(function (it) { var p = S.P[it.pid]; if (isLow(p) && !S.alerted[p.id]) { S.alerted[p.id] = true; sale.alerts = (sale.alerts || []).concat(p.id); if (autoOn('stock')) autoRun('stock'); } });
      emit();
    }
    return sale;
  }
  function crmAfterSale(sale) {
    var c = sale.cust != null ? custById(sale.cust) : null; if (!c) return;
    var names = sale.items.map(function (i) { return i.name; }).join(', ');
    c.purch.unshift({ ago: 0, ts: sale.ts, total: sale.total, items: names, sale: sale.id });
    c.tl.unshift({ ago: 0, ts: sale.ts, type: 'compra', text: 'Compra por ' + sale.ch + ': ' + names + ' · ' + fmt(sale.total) });
    var pids = sale.items.map(function (i) { return i.pid; });
    var d = S.deals.filter(function (x) { return x.cust === c.id && x.stage < 3 && pids.indexOf(x.pid) > -1; })[0] || S.deals.filter(function (x) { return x.cust === c.id && x.stage < 3; })[0];
    if (d) { d.stage = 3; d.days = 0; d.sold = true; d.amt = sale.total; }
    else { d = { id: nid(), cust: c.id, pid: pids[0], amt: sale.total, stage: 3, ch: sale.ch, days: 0, sold: true }; S.deals.push(d); }
    sale.moved = d;
    if (autoOn('post')) {
      autoRun('post'); d.tag = 'Reseña en 3 días';
      S.tasks.push({ id: nid(), text: 'Pedir reseña a ' + c.name.split(' ')[0] + ' (postventa automática)', due: 3, cust: c.id, done: false, auto: true });
      sale.autoTask = true;
    }
  }
  function issue(sale, tipo) {
    if (sale.inv) return sale.inv;
    tipo = tipo || invType(sale);
    S.invSeq[tipo]++;
    var c = sale.cust != null ? custById(sale.cust) : null;
    var inv = { id: nid(), tipo: tipo, no: '0001-' + pad(S.invSeq[tipo], 8), sale: sale.id, total: sale.total, ts: new Date(), who: c ? c.name : 'Consumidor final', cae: pad(Math.floor(Math.random() * 1e10), 10) + '4' };
    S.invoices.unshift(inv); sale.inv = inv; return inv;
  }
  function refund(sale, picks, why, mode) {
    var amt = 0, names = [];
    picks.forEach(function (pk) {
      var it = sale.items[pk.i], p = S.P[it.pid], v = p.vars[it.vi];
      var unit = Math.round((it.price * it.q - it.disc) / it.q);
      amt += unit * pk.q; names.push(pk.q + '× ' + it.name);
      v.st[sale.branch] += pk.q; it.ret = (it.ret || 0) + pk.q;
      if (sale.ago === 0) S.hist[0][it.pid] = Math.max(0, S.hist[0][it.pid] - pk.q); else S.hist[0][it.pid] = Math.max(0, S.hist[0][it.pid]);
      kard(p, it.vi, sale.branch, pk.q, 'Devolución · ' + why);
    });
    sale.ret += amt;
    var rec = { id: nid(), sale: sale.id, amt: amt, mode: mode, why: why, ts: new Date(), sess: S.caja.sess, text: names.join(', ') };
    (S.refunds = S.refunds || []).unshift(rec);
    var c = sale.cust != null ? custById(sale.cust) : null;
    if (c) { c.purch.unshift({ ago: 0, ts: rec.ts, total: -amt, items: 'Devolución: ' + rec.text, sale: sale.id }); c.tl.unshift({ ago: 0, ts: rec.ts, type: 'nota', text: (mode === 'cambio' ? 'Cambio' : 'Devolución') + ': ' + rec.text + ' (' + why + ')' }); }
    if (mode === 'cambio') S.cart.credit += amt;
    emit();
    return rec;
  }
  function adjust(p, vi, br, delta, why) {
    var v = p.vars[vi]; v.st[br] = Math.max(0, v.st[br] + delta);
    kard(p, vi, br, delta, 'Ajuste · ' + why);
    if (!isLow(p)) S.alerted[p.id] = false;
    emit();
  }
  function transfer(p, vi, from, to, q) {
    var v = p.vars[vi]; q = Math.min(q, availV(v, from)); if (q <= 0) return 0;
    v.st[from] -= q; v.st[to] += q;
    kard(p, vi, from, -q, 'Transferencia a ' + BR[to]); kard(p, vi, to, q, 'Transferencia desde ' + BR[from]);
    emit(); return q;
  }
  function suggestPO() {
    var pending = {};
    S.po.forEach(function (o) { if (o.status === 'Pendiente') o.lines.forEach(function (l) { pending[l.pid] = true; }); });
    var groups = {};
    S.P.forEach(function (p) {
      if (!isLow(p) || pending[p.id]) return;
      var need = Math.max(p.min * 2 + 1 - availTot(p), 1), order = p.vars.map(function (v, i) { return i; }).sort(function (a, b) { return (p.vars[a].st[0] + p.vars[a].st[1] + p.vars[a].st[2]) - (p.vars[b].st[0] + p.vars[b].st[1] + p.vars[b].st[2]); });
      var q = {}, k = 0;
      while (need > 0) { var vi = order[k % order.length]; q[vi] = (q[vi] || 0) + 1; need--; k++; }
      (groups[p.sup] = groups[p.sup] || []).push.apply(groups[p.sup], Object.keys(q).map(function (vi) { return { pid: p.id, vi: +vi, q: q[vi] }; }));
    });
    return Object.keys(groups).map(function (s) { return { sup: +s, lines: groups[s] }; });
  }
  function poTotal(lines) { return lines.reduce(function (s, l) { return s + S.P[l.pid].cost * l.q; }, 0); }
  function createPO(sup, lines) {
    lines = lines.filter(function (l) { return l.q > 0; }); if (!lines.length) return null;
    var po = { id: nid(), no: 'OC-' + pad(++S.poSeq, 4), sup: sup, lines: lines, status: 'Pendiente', ts: new Date(), total: poTotal(lines) };
    S.po.unshift(po); emit(); return po;
  }
  function receivePO(po) {
    if (po.status !== 'Pendiente') return;
    po.lines.forEach(function (l) { var p = S.P[l.pid]; p.vars[l.vi].st[2] += l.q; kard(p, l.vi, 2, l.q, 'Recepción ' + po.no); if (!isLow(p)) S.alerted[p.id] = false; });
    po.status = 'Recibida'; po.rts = new Date();
    S.AP.unshift({ id: nid(), sup: po.sup, concept: po.no + ' · mercadería recibida', amt: po.total, due: 15, paid: false });
    emit();
  }
  function moveDeal(d, stage) {
    if (stage < 0 || stage > 4 || stage === d.stage) return false;
    if (stage >= 3 && !d.sold) {
      var p = S.P[d.pid], bi = -1, vi = -1;
      for (var b = 0; b < 3 && vi < 0; b++) for (var i = 0; i < p.vars.length; i++) if (availV(p.vars[i], b) > 0) { vi = i; bi = b; break; }
      if (vi < 0) { toast('No se puede marcar como vendida: ' + p.name + ' no tiene stock. Te sugerimos armar una orden de compra.', 'warn'); return false; }
      var sale = sell({ lines: [{ pid: p.id, vi: vi, q: 1 }], cust: d.cust, seller: 0, branch: bi, ch: d.ch, pays: [{ m: 'tr', amt: p.price }] });
      d.sold = true; d.amt = p.price; d.stage = stage; d.days = 0;
      toast('Venta registrada desde el pipeline: se descontó el stock y se actualizó la ficha.', 'ok');
      emit(); return true;
    }
    d.stage = stage; d.days = 0;
    var c = custById(d.cust);
    if (c) c.tl.unshift({ ago: 0, ts: new Date(), type: 'whatsapp', text: 'Consulta movida a "' + STAGES[stage] + '"' });
    emit(); return true;
  }
  function addNps(n) {
    for (var i = 0; i < n; i++) { var r = Math.random(); S.nps.unshift({ s: r < 0.66 ? 9 + Math.floor(Math.random() * 2) : r < 0.88 ? 7 + Math.floor(Math.random() * 2) : 3 + Math.floor(Math.random() * 4), t: COMMENTS[Math.floor(Math.random() * COMMENTS.length)], ago: 0, who: S.C[Math.floor(Math.random() * (S.C.length - 1))].name.split(' ')[0] }); }
  }

  /* ---------- semillas ---------- */
  function seed() {
    S.P = R.products.map(function (r, i) {
      var gold = R.scale > 1;
      var p = { id: i, sku: R.pre + '-' + pad(101 + i, 4), ean: '779' + pad(Math.floor(rnd() * 1e10), 10), name: r[0], cat: r[1], cost: r[2], price: r[3], sup: r[5], min: r[6], vars: [] };
      r[4].forEach(function (vn) { p.vars.push({ n: vn, st: [Math.floor(rnd() * (gold ? 3 : 7)), Math.floor(rnd() * (gold ? 2 : 5)), Math.floor(rnd() * (gold ? 3 : 9))], res: [0, 0, 0] }); });
      return p;
    });
    S.P.forEach(function (p, i) {
      if (i === 2 || i === 7) { p.vars.forEach(function (v) { v.st = [0, 0, 0]; }); p.vars[0].st[0] = p.min; return; }
      if (p.vars[0].st[0] < 2) p.vars[0].st[0] = 2;
      if (i === S.P.length - 1) p.vars[0].st[2] += 3;
      var t = stockTot(p); if (t <= p.min) p.vars[0].st[2] += p.min + 2 - t;
    });
    var dead = S.P.length - 1, wts = S.P.map(function () { return 0.25 + rnd() * 0.55; }), dow0 = new Date().getDay();
    for (var d = 0; d < 180; d++) S.hist.push(S.P.map(function () { return 0; }));
    for (d = 179; d >= 1; d--) {
      var dw = ((dow0 - d) % 7 + 7) % 7, f = (dw === 6 || dw === 0) ? 1.35 : dw === 1 ? 0.8 : 1, g = 0.8 + 0.3 * (1 - d / 180);
      S.P.forEach(function (p, i) { var w = wts[i] * R.vol * f * g; if (i === dead && d < 45) w = 0; if (rnd() < w) S.hist[d][i] = rnd() < 0.22 ? 2 : 1; });
    }
    /* clientas */
    CUST_SEED.forEach(function (cs, i) {
      var prof = cs[1], n, last, gap = 14 + Math.floor(rnd() * 30);
      if (prof === 'vip') { n = 7 + Math.floor(rnd() * 4); last = 2 + Math.floor(rnd() * 10); }
      else if (prof === 'freq') { n = 3 + Math.floor(rnd() * 4); last = 3 + Math.floor(rnd() * 28); }
      else if (prof === 'nueva') { n = 1; last = 1 + Math.floor(rnd() * 20); }
      else if (prof === 'inact') { n = 2 + Math.floor(rnd() * 3); last = 65 + Math.floor(rnd() * 90); }
      else { n = 3; last = 20; }
      var c = { id: i + 1, name: cs[0], ri: prof === 'ri', phone: '+54 9 221 ' + (400 + Math.floor(rnd() * 500)) + '-' + (1000 + Math.floor(rnd() * 8999)), bday: cs[2],
        tags: prof === 'vip' ? ['VIP', 'Instagram'] : prof === 'freq' ? ['Frecuente'] : prof === 'nueva' ? ['Nueva'] : prof === 'inact' ? ['Reactivar'] : ['Empresa', 'Factura A'],
        pref: R.prefs[i % R.prefs.length], purch: [], tl: [], notes: '' };
      if (c.ri) c.pref = 'Compra por mayor para proyectos. Pide factura A.';
      for (var k = 0; k < n; k++) {
        var ago = last + k * gap + Math.floor(rnd() * 8), cnt = 1 + Math.floor(rnd() * 2), tot = 0, nm = [];
        for (var j = 0; j < cnt; j++) { var p = S.P[Math.floor(rnd() * S.P.length)]; tot += p.price; nm.push(p.name); }
        if (c.ri) tot *= 3;
        c.purch.push({ ago: ago, total: tot, items: nm.join(', '), sale: null });
        c.tl.push({ ago: ago, ts: null, type: 'compra', text: 'Compra: ' + nm.join(', ') + ' · ' + fmt(tot) });
      }
      c.tl.push({ ago: last + 1, ts: null, type: 'whatsapp', text: 'Consultó por WhatsApp por disponibilidad de ' + S.P[(i * 5) % S.P.length].name });
      if (i % 3 === 0) c.tl.push({ ago: last + 9, ts: null, type: 'nota', text: 'Prefiere que la contacten por la tarde.' });
      c.tl.sort(function (a, b) { return a.ago - b.ago; });
      S.C.push(c);
    });
    [[2, 4, 0, 'Instagram'], [7, 1, 0, 'WhatsApp'], [5, 6, 1, 'WhatsApp'], [9, 9, 1, 'Instagram'], [3, 0, 2, 'WhatsApp'], [10, 10, 2, 'Local'], [1, 2, 3, 'Instagram'], [6, 5, 4, 'Tienda online']].forEach(function (a) {
      var p = S.P[a[1] % S.P.length];
      S.deals.push({ id: nid(), cust: S.C[a[0]].id, pid: p.id, amt: p.price, stage: a[2], ch: a[3], days: Math.floor(rnd() * 6), sold: a[2] >= 3 });
    });
    S.tasks.push({ id: nid(), text: 'Llamar a ' + S.C[4].name.split(' ')[0] + ' por la reserva', due: 0, cust: S.C[4].id, done: false },
      { id: nid(), text: 'Responder la cotización de ' + S.C[2].name.split(' ')[0], due: 1, cust: S.C[2].id, done: false },
      { id: nid(), text: 'Avisar a ' + S.C[10].name.split(' ')[0] + ' que llegó su pedido', due: -1, cust: S.C[10].id, done: false },
      { id: nid(), text: 'Enviar saludo de cumpleaños a ' + S.C[11].name.split(' ')[0], due: 3, cust: S.C[11].id, done: false });
    /* ventas de hoy y de los últimos días (para caja y facturación) */
    var nToday = R.scale > 1 ? 2 : 5, keys = ['ef', 'tj', 'tr', 'qr', 'ef'];
    for (var s = 0; s < nToday + 3; s++) {
      var ago = s < nToday ? 0 : s - nToday + 1, cnt2 = 1 + Math.floor(rnd() * 2), lines = [];
      for (var q = 0; q < cnt2; q++) { var pp = S.P[Math.floor(rnd() * S.P.length)]; lines.push({ pid: pp.id, vi: Math.floor(rnd() * pp.vars.length), q: 1 }); }
      var tot2 = lines.reduce(function (a, l) { return a + S.P[l.lid || l.pid].price; }, 0);
      var sale = sell({ lines: lines, seller: s % 3, branch: 0, ch: s % 4 === 3 ? 'Instagram' : 'Local', pays: [{ m: keys[s % keys.length], amt: tot2, cuotas: keys[s % 5] === 'tj' ? 3 : 1 }], seed: true, ago: ago, cust: s === 1 ? 2 : null });
      if (s % 3 === 0) issue(sale);
    }
    S.AP.push({ id: nid(), sup: 0, concept: 'OC-0009 · mercadería recibida', amt: Math.round(R.scale * 118000), due: 6, paid: false },
      { id: nid(), sup: 1, concept: 'OC-0008 · mercadería recibida', amt: Math.round(R.scale * 84000), due: -2, paid: false },
      { id: nid(), sup: 2, concept: 'OC-0007 · mercadería recibida', amt: Math.round(R.scale * 96000), due: -20, paid: true });
    S.arPend = Math.round(range(3, 0).rev * 0.34);
    var o1 = S.P[3];
    S.orders.push({ id: nid(), ch: 'Tienda online', cust: S.C[7].id, lines: [{ pid: o1.id, vi: 0, q: 1 }], state: 'reservado', br: 0, total: o1.price, n: 4021 });
    o1.vars[0].res[0] = 1;
    S.nps = [];
    var sc = [10, 10, 9, 10, 9, 8, 10, 9, 10, 7, 9, 10, 10, 8, 9, 6, 10, 9, 5, 10, 9, 10];
    sc.forEach(function (x, i) { S.nps.push({ s: x, t: COMMENTS[i % COMMENTS.length], ago: i * 2, who: S.C[i % (S.C.length - 1)].name.split(' ')[0] }); });
    S.camps.push({ id: nid(), name: 'Novedades de temporada', seg: 'frecuentes', n: 4, when: 'Enviada hace 9 días', text: '', resp: 2 });
  }

  /* ---------- infraestructura de UI ---------- */
  function toast(msg, kind) {
    var t = h('div.sx-toast' + (kind ? ' sx-t-' + kind : ''), ico(kind === 'warn' ? 'alert' : 'check'), h('span', msg));
    live.appendChild(t);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, FAST ? 30 : 4200);
  }
  function beep(f, d) {
    if (S.mute) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      S.ac = S.ac || new AC();
      var o = S.ac.createOscillator(), g = S.ac.createGain();
      o.type = 'sine'; o.frequency.value = f || 1040; g.gain.value = 0.05;
      o.connect(g); g.connect(S.ac.destination); o.start(); o.stop(S.ac.currentTime + (d || 0.09));
    } catch (e) {}
  }
  function openModal(title, body, o) {
    o = o || {};
    var prev = sh.activeElement;
    var ov = h('div.sx-ov');
    var box = h('div.sx-modal' + (o.wide ? ' sx-wide' : ''), { role: 'dialog', 'aria-modal': 'true', 'aria-label': title, tabindex: '-1' },
      h('div.sx-mh', h('h3', title), h('button.sx-x', { type: 'button', 'aria-label': 'Cerrar', on: { click: close } }, ico('x'))),
      h('div.sx-mb', body));
    ov.appendChild(box);
    function close() { if (!ov.parentNode) return; ov.remove(); if (prev && prev.focus && root.contains(prev)) prev.focus(); if (o.onClose) o.onClose(); }
    ov.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); close(); return; }
      if (e.key === 'Tab') {
        var f = [].slice.call(box.querySelectorAll('button:not([disabled]),input:not([disabled]),select,textarea,a[href],[tabindex="0"]')).filter(function (x) { return x.getClientRects().length > 0 || x === sh.activeElement || FAST; });
        if (!f.length) return;
        var a = f[0], z = f[f.length - 1];
        if (e.shiftKey && (sh.activeElement === a || sh.activeElement === box)) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && sh.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    });
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) close(); });
    (root.querySelector('.sx-app') || root).appendChild(ov);
    var f0 = box.querySelector('[data-autofocus],input:not([type=hidden]),select,textarea,.sx-mb button'); (f0 || box).focus();
    return { close: close, box: box, ov: ov };
  }
  function modalOpen() { return !!root.querySelector('.sx-ov'); }
  function redraw(box, fn) {
    var a = sh.activeElement, key = a && box.contains(a) && a.getAttribute && a.getAttribute('data-fk'), s = null, e = null, ks = {};
    if (key && a.selectionStart != null) { try { s = a.selectionStart; e = a.selectionEnd; } catch (x) {} }
    [].forEach.call(box.querySelectorAll('[data-ks]'), function (n) { ks[n.getAttribute('data-ks')] = [n.scrollLeft, n.scrollTop]; });
    cleanEl(box); fn(box);
    [].forEach.call(box.querySelectorAll('[data-ks]'), function (n) { var v = ks[n.getAttribute('data-ks')]; if (v) { n.scrollLeft = v[0]; n.scrollTop = v[1]; } });
    if (key) { var n = box.querySelector('[data-fk="' + key + '"]'); if (n) { try { n.focus({ preventScroll: true }); if (s != null) n.setSelectionRange(s, e); } catch (x) {} } }
  }
  function tabsBar(items, cur, onPick, o) {
    var bar = h('div.sx-tabs' + (o.cls ? ' ' + o.cls : ''), { role: 'tablist', 'aria-label': o.label });
    items.forEach(function (it) {
      bar.appendChild(h('button.sx-tab', {
        type: 'button', role: 'tab', id: o.id + '-' + it.k, 'data-k': it.k, 'aria-selected': it.k === cur ? 'true' : 'false', tabindex: it.k === cur ? '0' : '-1',
        'aria-controls': it.controls || o.panel || null, 'aria-disabled': it.locked ? 'true' : null, title: it.locked ? 'Tu rol no tiene acceso a esta sección' : null,
        on: { click: function () { if (it.locked) { toast('Con el rol "' + roleName() + '" esta sección está bloqueada. Así se cuidan los datos sensibles.', 'warn'); return; } onPick(it.k); } }
      }, ico(it.locked ? 'lock' : it.icon), h('span', it.label), it.sub ? h('small.sx-tsub', it.sub) : null, it.count != null ? h('em.sx-cnt', String(it.count)) : null));
    });
    bar.addEventListener('keydown', function (e) {
      var k = e.key; if (k !== 'ArrowRight' && k !== 'ArrowLeft' && k !== 'Home' && k !== 'End') return;
      var bs = [].slice.call(bar.querySelectorAll('.sx-tab')), i = bs.indexOf(sh.activeElement); if (i < 0) return;
      e.preventDefault();
      i = k === 'Home' ? 0 : k === 'End' ? bs.length - 1 : (i + (k === 'ArrowRight' ? 1 : -1) + bs.length) % bs.length;
      bs[i].focus(); bs[i].click();
    });
    bar.sel = function (k) { [].forEach.call(bar.children, function (b) { var on = b.getAttribute('data-k') === k; b.setAttribute('aria-selected', on ? 'true' : 'false'); b.setAttribute('tabindex', on ? '0' : '-1'); }); if (S.onView) S.onView(); };
    return bar;
  }
  function roleName() { return { duena: 'Dueña', vendedora: 'Vendedora', contadora: 'Contadora' }[S.role]; }
  function field(label, ctrl, cls) { return h('label.sx-field' + (cls ? ' ' + cls : ''), h('span', label), ctrl); }
  function btn(label, fn, cls, icon, attrs) {
    var a = { type: 'button', on: { click: fn } }; if (attrs) for (var k in attrs) a[k] = attrs[k];
    return h('button.sx-btn' + (cls ? ' ' + cls : ''), a, icon ? ico(icon) : null, label ? h('span', label) : null);
  }
  function badge(t, kind) { return h('span.sx-bd' + (kind ? ' sx-bd-' + kind : ''), t); }
  function empty(t, sub) { return h('div.sx-empty', h('strong', t), sub ? h('span', sub) : null); }
  function swatch(p, size) {
    var hs = hash(p.name) % 5, mix = [22, 32, 42, 28, 52][hs];
    return h('span.sx-sw' + (size ? ' ' + size : ''), { style: '--m:' + mix + '%;--ang:' + (hs * 37 + 20) + 'deg', 'aria-hidden': 'true' }, h('b', p.name.charAt(0)));
  }
  function goto(mod, sub) {
    if (S.openFs) S.openFs();
    selectTab(mod);
    if (sub && mods[mod].setView) mods[mod].setView(sub);
    var app = S.openFs ? null : root.querySelector('.sx-app'); if (app && app.scrollIntoView) { var r = app.getBoundingClientRect(); if (r.top < 0 || r.top > 140) app.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' }); }
    var bd = root.querySelector('.sx-body'); if (bd) bd.scrollTop = 0;
  }
  function scrollInBody(el) {
    var bd = root.querySelector('.sx-body'); if (!bd || !el) return;
    var top = el.getBoundingClientRect().top - bd.getBoundingClientRect().top + bd.scrollTop - 8;
    try { bd.scrollTo({ top: top, behavior: REDUCED ? 'auto' : 'smooth' }); } catch (e) { bd.scrollTop = top; }
  }
  var selectTab = function () {};

  /* =====================================================================
     CAJA (POS)
     ===================================================================== */
  function lineSub(l) { return S.P[l.pid].price * l.q; }
  function lineDisc(l) { var s = lineSub(l); return Math.max(0, Math.min(s, l.d.t === '%' ? Math.round(s * l.d.v / 100) : Math.round(l.d.v))); }
  function cartTotals() {
    var c = S.cart, gross = 0, ld = 0;
    c.lines.forEach(function (l) { gross += lineSub(l); ld += lineDisc(l); });
    var base = gross - ld;
    var gd = Math.max(0, Math.min(base, c.gd.t === '%' ? Math.round(base * c.gd.v / 100) : Math.round(c.gd.v)));
    var credit = Math.min(c.credit, base - gd);
    var total = Math.max(0, base - gd - credit);
    return { gross: gross, ld: ld, gd: gd, credit: credit, total: total, iva: Math.round(total - total / 1.21), neto: Math.round(total / 1.21), n: c.lines.reduce(function (s, l) { return s + l.q; }, 0) };
  }
  function cajaSales() { return S.sales.filter(function (s) { return s.sess === S.caja.sess && s.ago === 0 && !s.void; }); }
  function cajaRefunds() { return (S.refunds || []).filter(function (r) { return r.sess === S.caja.sess; }); }
  function cajaSummary() {
    var by = { ef: 0, tj: 0, tr: 0, qr: 0 }, tot = 0, ss = cajaSales();
    ss.forEach(function (s) { s.pays.forEach(function (p) { by[p.m] += p.amt; }); tot += s.total; });
    var mv = S.caja.moves.reduce(function (a, m) { return a + m.amt; }, 0);
    var rf = cajaRefunds(), rfEf = rf.filter(function (r) { return r.mode === 'efectivo'; }).reduce(function (a, r) { return a + r.amt; }, 0);
    return { by: by, tot: tot, n: ss.length, mv: mv, rf: rf.reduce(function (a, r) { return a + r.amt; }, 0), rfEf: rfEf, expected: S.caja.opening + by.ef + mv - rfEf };
  }
  var pos = { q: '', cat: 'Todas', msg: '', flash: null, msgKind: '' };
  var P_ = { bar: null, grid: null, cart: null, mini: null, msg: null };

  function addToCart(pid, vi, q) {
    q = q || 1;
    if (!S.caja.open) { toast('La caja está cerrada. Abrila para empezar a vender.', 'warn'); return false; }
    var p = S.P[pid], v = p.vars[vi], line = S.cart.lines.filter(function (l) { return l.pid === pid && l.vi === vi; })[0];
    var have = line ? line.q : 0;
    if (have + q > availV(v, S.br)) {
      var other = v.st.reduce(function (s, x, b) { return b === S.br ? s : s + availV(v, b); }, 0);
      toast(availV(v, S.br) <= 0 ? 'Sin stock de ' + p.name + ' (' + v.n + ') en ' + BR[S.br] + (other ? '. Hay ' + other + ' en otra sucursal: pedí una transferencia desde Gestión.' : '.') : 'Solo quedan ' + availV(v, S.br) + ' de ' + p.name + ' (' + v.n + ').', 'warn');
      beep(220, 0.18); return false;
    }
    if (line) line.q += q; else S.cart.lines.push({ pid: pid, vi: vi, q: q, d: { t: '%', v: 0 }, open: false });
    pos.flash = pid; beep(1040, 0.07);
    setTimeout(function () { pos.flash = null; var t = root.querySelector('.sx-tile.flash'); if (t) t.classList.remove('flash'); }, 700);
    drawCart(); drawGrid(); drawMini();
    return true;
  }
  function pickVariant(p) {
    if (p.vars.length === 1) { addToCart(p.id, 0, 1); return; }
    var body = h('div.sx-var', h('p.sx-mut', 'Elegí la opción. El stock es el de ' + BR[S.br] + '.'));
    var list = h('div.sx-var-list'); var m;
    p.vars.forEach(function (v, i) {
      var a = availV(v, S.br), other = v.st.reduce(function (s, x, b) { return b === S.br ? s : s + availV(v, b); }, 0);
      list.appendChild(h('button.sx-chip-lg', { type: 'button', disabled: a <= 0 ? true : null, on: { click: function () { if (addToCart(p.id, i, 1)) m.close(); } } },
        h('strong', v.n), h('small', a > 0 ? a + ' en stock' : (other ? 'Sin stock acá, ' + other + ' en otras sucursales' : 'Agotado'))));
    });
    body.appendChild(list);
    m = openModal(p.name, body);
  }
  function drawBar() {
    var sm = cajaSummary();
    redraw(P_.bar, function (b) {
      b.appendChild(h('div.sx-cstat', h('i.sx-dot' + (S.caja.open ? ' on' : '')), h('div', h('strong', S.caja.open ? 'Caja abierta' : 'Caja cerrada'),
        h('small', S.caja.open ? 'Efectivo esperado ' + fmt(sm.expected) + ' · ' + sm.n + ' ventas hoy' : 'Abrila para cobrar'))));
      var acts = h('div.sx-bar-acts');
      acts.appendChild(h('label.sx-sel', h('span.sx-vh', 'Sucursal'), ico('shop'), h('select', { 'data-fk': 'br', on: { change: function (e) { S.br = +e.target.value; S.cart.lines = []; drawAll(); } } }, BR.slice(0, 2).map(function (n, i) { return h('option', { value: i, selected: S.br === i ? true : null }, n); }))));
      if (S.caja.open) {
        acts.appendChild(btn('Movimiento', openMove, 'sx-ghost sm', 'cash'));
        acts.appendChild(btn('Devolución', openReturn, 'sx-ghost sm', 'undo', { 'aria-keyshortcuts': 'F7' }));
        acts.appendChild(btn('Cerrar caja', openClose, 'sx-ghost sm', 'lock'));
      } else acts.appendChild(btn('Abrir caja', openOpen, 'sx-solid sm', 'cash'));
      acts.appendChild(h('button.sx-btn.sx-ghost.sm.sx-icn', { type: 'button', 'aria-pressed': S.mute ? 'false' : 'true', 'aria-label': 'Sonido del escáner', title: 'Sonido del escáner', on: { click: function () { S.mute = !S.mute; drawBar(); } } }, ico('sound'), h('span', S.mute ? 'Silencio' : 'Sonido')));
      b.appendChild(acts);
      if (S.held.length) {
        var hl = h('div.sx-held', { role: 'group', 'aria-label': 'Ventas en espera' }, h('span', 'En espera:'));
        S.held.forEach(function (x, i) { hl.appendChild(btn(x.cust != null ? custById(x.cust).name.split(' ')[0] + ' · ' + x.lines.length + ' ítem' : x.lines.length + ' ítem' + (x.lines.length > 1 ? 's' : ''), function () { resumeHeld(i); }, 'sx-chip', 'pause')); });
        b.appendChild(hl);
      }
    });
  }
  function drawGrid() {
    redraw(P_.grid, function (g) {
      var q = pos.q.trim().toLowerCase(), list = S.P.filter(function (p) { return (pos.cat === 'Todas' || p.cat === pos.cat) && (!q || (p.name + ' ' + p.sku + ' ' + p.ean).toLowerCase().indexOf(q) > -1); });
      if (!list.length) { g.appendChild(empty('No encontramos ese producto', 'Probá con otro nombre, o escaneá el código.')); return; }
      list.forEach(function (p) {
        var a = stockAt(p, S.br) - p.vars.reduce(function (s, v) { return s + v.res[S.br]; }, 0), inCart = S.cart.lines.filter(function (l) { return l.pid === p.id; }).reduce(function (s, l) { return s + l.q; }, 0);
        g.appendChild(h('button.sx-tile' + (a <= 0 ? ' out' : '') + (pos.flash === p.id ? ' flash' : ''), { type: 'button', 'data-pid': p.id, 'aria-label': p.name + ', ' + fmt(p.price) + ', ' + (a > 0 ? a + ' en stock' : 'sin stock en esta sucursal'), on: { click: function () { pickVariant(p); } } },
          swatch(p), inCart ? h('span.sx-inc', '×' + inCart) : null,
          h('span.sx-tn', p.name), h('span.sx-tp', fmt(p.price)),
          h('span.sx-ts', h('i' + (a <= 0 ? '.bad' : a <= p.min ? '.warn' : '.ok')), a > 0 ? a + ' en stock' : 'Sin stock acá', p.vars.length > 1 ? ' · ' + p.vars.length + ' opciones' : '')));
      });
    });
  }
  function drawMini() {
    var t = cartTotals();
    redraw(P_.mini, function (m) {
      m.appendChild(h('div', h('small', t.n + (t.n === 1 ? ' ítem' : ' ítems')), h('strong', fmt(t.total))));
      m.appendChild(btn('Ver carrito', function () { var c = root.querySelector('.sx-cart'); scrollInBody(c); }, 'sx-ghost sm', 'cart'));
      m.appendChild(btn('Cobrar', openPay, 'sx-solid', null, { disabled: t.n ? null : true }));
    });
  }
  function setLineQty(l, q) {
    q = Math.round(+q); if (!(q > 0)) { S.cart.lines.splice(S.cart.lines.indexOf(l), 1); return; }
    var v = S.P[l.pid].vars[l.vi], av = availV(v, S.br);
    if (q > av) { toast('Solo quedan ' + av + ' de ' + S.P[l.pid].name + ' (' + v.n + ') en ' + BR[S.br] + '.', 'warn'); q = av; }
    l.q = Math.max(1, q);
  }
  function drawCart() {
    var c = S.cart, t = cartTotals(), cu = c.cust != null ? custById(c.cust) : null;
    redraw(P_.cart, function (box) {
      box.appendChild(h('div.sx-cart-h', h('h3', 'Venta actual'), h('span.sx-mut', t.n + (t.n === 1 ? ' ítem' : ' ítems'))));
      /* clienta y vendedora */
      var dl = h('datalist', { id: 'sx-dl-' + rk }, S.C.map(function (x) { return h('option', { value: x.name }); }));
      box.appendChild(h('div.sx-cust',
        field('Clienta', h('input', { type: 'text', list: 'sx-dl-' + rk, placeholder: 'Buscar clienta del CRM…', value: cu ? cu.name : '', 'data-fk': 'cust', autocomplete: 'off', on: { change: function (e) { var m = S.C.filter(function (x) { return x.name.toLowerCase() === e.target.value.trim().toLowerCase(); })[0]; c.cust = m ? m.id : null; if (e.target.value && !m) toast('No está en el CRM. En la venta real la podés crear en el momento.', 'warn'); drawCart(); } } }), 'grow'), dl,
        field('Vendedora', h('select', { 'data-fk': 'seller', on: { change: function (e) { c.seller = +e.target.value; } } }, SELLERS.map(function (n, i) { return h('option', { value: i, selected: c.seller === i ? true : null }, n); })))));
      if (cu) box.appendChild(h('div.sx-cinfo', h('b.sx-av', initials(cu.name)), h('div', h('strong', cu.name), h('small', ltvLine(cu))), btn(null, function () { c.cust = null; drawCart(); }, 'sx-ghost sx-icn sm', 'x', { 'aria-label': 'Quitar clienta' })));
      /* líneas */
      var ls = h('div.sx-lines');
      if (!c.lines.length) ls.appendChild(empty('El carrito está vacío', 'Tocá un producto, escaneá un código o apretá F8 para escanear.'));
      c.lines.forEach(function (l, idx) {
        var p = S.P[l.pid], v = p.vars[l.vi], d = lineDisc(l), k = l.pid + '-' + l.vi;
        ls.appendChild(h('div.sx-line',
          h('div.sx-ln-top', swatch(p, 'xs'), h('div.sx-ln-n', h('strong', p.name), h('small', (p.vars.length > 1 ? v.n + ' · ' : '') + fmt(p.price) + ' c/u')),
            h('div.sx-ln-t', d ? h('s', fmt(lineSub(l))) : null, h('b', fmt(lineSub(l) - d))),
            btn(null, function () { c.lines.splice(idx, 1); drawCart(); drawGrid(); drawMini(); }, 'sx-ghost sx-icn sm', 'x', { 'aria-label': 'Quitar ' + p.name })),
          h('div.sx-ln-bot',
            h('div.sx-qty', { role: 'group', 'aria-label': 'Cantidad de ' + p.name },
              btn(null, function () { setLineQty(l, l.q - 1); drawCart(); drawGrid(); drawMini(); }, 'sx-ghost sx-icn sm', 'minus', { 'aria-label': 'Menos', 'data-fk': 'm' + k }),
              h('input', { type: 'number', min: '1', value: l.q, 'aria-label': 'Cantidad', 'data-fk': 'q' + k, on: { change: function (e) { setLineQty(l, e.target.value); drawCart(); drawGrid(); drawMini(); } } }),
              btn(null, function () { setLineQty(l, l.q + 1); drawCart(); drawGrid(); drawMini(); }, 'sx-ghost sx-icn sm', 'plus', { 'aria-label': 'Más', 'data-fk': 'p' + k })),
            h('details.sx-dto', { open: l.open || l.d.v > 0 ? true : null, on: { toggle: function (e) { l.open = e.target.open; } } }, h('summary', ico('tag'), h('span', l.d.v > 0 ? 'Descuento ' + (l.d.t === '%' ? l.d.v + '%' : fmt(l.d.v)) : 'Descuento')),
              h('div.sx-dto-b', h('input', { type: 'number', min: '0', value: l.d.v || '', placeholder: '0', 'aria-label': 'Descuento del ítem', 'data-fk': 'd' + k, on: { change: function (e) { l.d.v = Math.max(0, +e.target.value || 0); drawCart(); drawMini(); } } }), segToggle(l.d.t, function (tp) { l.d.t = tp; drawCart(); drawMini(); }))))));
      });
      box.appendChild(ls);
      /* descuento general y nota */
      box.appendChild(h('div.sx-gd', field('Descuento general', h('div.sx-dto-b', h('input', { type: 'number', min: '0', value: c.gd.v || '', placeholder: '0', 'data-fk': 'gd', on: { change: function (e) { c.gd.v = Math.max(0, +e.target.value || 0); drawCart(); drawMini(); } } }), segToggle(c.gd.t, function (tp) { c.gd.t = tp; drawCart(); drawMini(); }))),
        field('Nota', h('input', { type: 'text', placeholder: 'Ej: es un regalo, envolver', value: c.note, 'data-fk': 'note', on: { change: function (e) { c.note = e.target.value; } } }), 'grow')));
      /* totales */
      var tt = h('dl.sx-tot');
      tt.appendChild(row('Subtotal', fmt(t.gross)));
      if (t.ld) tt.appendChild(row('Descuentos por ítem', '-' + fmt(t.ld).replace('$ ', '$ ')));
      if (t.gd) tt.appendChild(row('Descuento general', '-' + fmt(t.gd)));
      if (t.credit) tt.appendChild(row('Crédito por cambio', '-' + fmt(t.credit)));
      if (S.cond === 'ri') tt.appendChild(row('IVA 21% incluido', fmt(t.iva), 'mut'));
      box.appendChild(tt);
      box.appendChild(h('div.sx-total', h('span', 'Total'), h('strong', { 'aria-live': 'polite' }, fmt(t.total))));
      box.appendChild(h('div.sx-cart-acts',
        btn('En espera', holdCart, 'sx-ghost', 'pause', { disabled: c.lines.length ? null : true, 'aria-keyshortcuts': 'F6' }),
        btn('Vaciar', function () { S.cart.lines = []; S.cart.gd.v = 0; S.cart.credit = 0; drawCart(); drawGrid(); drawMini(); }, 'sx-ghost', 'x', { disabled: c.lines.length ? null : true }),
        btn('Cobrar  ·  F4', openPay, 'sx-solid big', 'check', { disabled: c.lines.length ? null : true, 'aria-keyshortcuts': 'F4' })));
    });
  }
  function row(a, b, cls) { return h('div' + (cls ? '.' + cls : ''), h('dt', a), h('dd', b)); }
  function segToggle(cur, on) {
    return h('div.sx-seg', { role: 'group', 'aria-label': 'Tipo de descuento' }, ['%', '$'].map(function (tp) { return h('button', { type: 'button', 'aria-pressed': cur === tp ? 'true' : 'false', on: { click: function () { on(tp); } } }, tp); }));
  }
  function ltvLine(c) {
    var la = lastAgo(c);
    return (c.tags.indexOf('VIP') > -1 ? 'VIP · ' : '') + nBuys(c) + ' compras · ' + fmt(ltv(c)) + ' en total · última: ' + when(la).toLowerCase() + ' · ' + c.pref;
  }
  function holdCart() {
    if (!S.cart.lines.length) return;
    S.held.push({ lines: S.cart.lines, cust: S.cart.cust, seller: S.cart.seller, gd: S.cart.gd, note: S.cart.note });
    S.cart = { lines: [], cust: null, seller: S.cart.seller, gd: { t: '%', v: 0 }, note: '', credit: 0 };
    toast('Venta puesta en espera. Atendé a la siguiente clienta y retomala cuando quieras.', 'ok'); drawAll();
  }
  function resumeHeld(i) {
    var x = S.held.splice(i, 1)[0];
    if (S.cart.lines.length) S.held.push({ lines: S.cart.lines, cust: S.cart.cust, seller: S.cart.seller, gd: S.cart.gd, note: S.cart.note });
    S.cart = { lines: x.lines, cust: x.cust, seller: x.seller, gd: x.gd, note: x.note, credit: 0 };
    drawAll();
  }
  function drawAll() { drawBar(); drawGrid(); drawCart(); drawMini(); }

  /* ---- escáner simulado ---- */
  function setMsg(t, kind) {
    pos.msg = t; pos.msgKind = kind || '';
    if (P_.msg) { P_.msg.textContent = t; P_.msg.className = 'sx-scan-msg ' + (kind || ''); }
  }
  function scanCode(code) {
    code = String(code || '').trim(); if (!code) return;
    var p = S.P.filter(function (x) { return x.ean === code || x.sku.toLowerCase() === code.toLowerCase(); })[0];
    if (!p) { setMsg('Código ' + code + ' no encontrado', 'bad'); beep(220, 0.2); return; }
    var vi = -1; p.vars.forEach(function (v, i) { if (vi < 0 && availV(v, S.br) > 0) vi = i; });
    if (vi < 0) { setMsg(p.name + ': sin stock en ' + BR[S.br], 'bad'); beep(220, 0.2); return; }
    if (addToCart(p.id, vi, 1)) setMsg('Escaneado: ' + p.name + (p.vars.length > 1 ? ' (' + p.vars[vi].n + ')' : ''), 'ok');
  }
  function scanRandom() {
    var pool = S.P.filter(function (p) { return p.vars.some(function (v) { return availV(v, S.br) > 0; }); });
    if (!pool.length) { setMsg('No hay stock para escanear en esta sucursal', 'bad'); return; }
    var p = pool[Math.floor(Math.random() * pool.length)], ok = p.vars.map(function (v, i) { return i; }).filter(function (i) { return availV(p.vars[i], S.br) > 0; }), vi = ok[Math.floor(Math.random() * ok.length)];
    var inp = root.querySelector('.sx-scan input'); if (inp) inp.value = p.ean;
    if (addToCart(p.id, vi, 1)) setMsg('Escaneado: ' + p.name + (p.vars.length > 1 ? ' (' + p.vars[vi].n + ')' : ''), 'ok');
  }

  /* ---- cobro ---- */
  function openPay() {
    if (!S.caja.open) { toast('La caja está cerrada. Abrila para cobrar.', 'warn'); return; }
    if (!S.cart.lines.length) { toast('Sumá al menos un producto.', 'warn'); return; }
    var t = cartTotals(), pays = [], body = h('div.sx-pay'), m;
    function paid() { return pays.reduce(function (s, p) { return s + p.amt; }, 0); }
    function okAll() { return pays.length && paid() === t.total && pays.every(function (p) { return p.m === 'ef' ? p.rec >= p.amt : p.m === 'tj' ? true : p.ok; }); }
    function fill(b) {
      var pend = t.total - paid();
      b.appendChild(h('div.sx-pay-tot', h('span', 'Total a cobrar'), h('strong', fmt(t.total))));
      var add = h('div.sx-pay-add', { role: 'group', 'aria-label': 'Agregar medio de pago' });
      [['ef', 'cash'], ['tj', 'card'], ['tr', 'bank'], ['qr', 'qr']].forEach(function (a) {
        add.appendChild(btn(PAYS[a[0]], function () {
          if (pend <= 0) { toast('Ya está cubierto el total. Cambiá el importe de algún medio para dividirlo.', 'warn'); return; }
          pays.push({ m: a[0], amt: pend, rec: pend, cuotas: 1, ok: false }); draw();
        }, 'sx-ghost', a[1]));
      });
      b.appendChild(add);
      if (!pays.length) b.appendChild(h('p.sx-mut', 'Elegí cómo paga. Podés dividir el pago entre varios medios (por ejemplo, mitad efectivo y mitad transferencia).'));
      pays.forEach(function (p, i) {
        var r = h('div.sx-prow', h('div.sx-prow-h', ico({ ef: 'cash', tj: 'card', tr: 'bank', qr: 'qr' }[p.m]), h('strong', PAYS[p.m]), btn(null, function () { pays.splice(i, 1); draw(); }, 'sx-ghost sx-icn sm', 'x', { 'aria-label': 'Quitar ' + PAYS[p.m] })),
          h('div.sx-prow-b', field('Importe', h('input', { type: 'number', min: '1', value: p.amt, 'data-fk': 'pa' + i, on: { change: function (e) { p.amt = Math.max(0, Math.round(+e.target.value || 0)); if (p.m === 'ef') p.rec = Math.max(p.rec, p.amt); draw(); } } }))));
        var bd = r.lastChild;
        if (p.m === 'ef') {
          bd.appendChild(field('Recibe', h('input', { type: 'number', min: '0', value: p.rec, 'data-fk': 'pr' + i, on: { change: function (e) { p.rec = Math.round(+e.target.value || 0); draw(); } } })));
          bd.appendChild(h('div.sx-vuelto', h('small', 'Vuelto'), h('strong', p.rec >= p.amt ? fmt(p.rec - p.amt) : 'Falta ' + fmt(p.amt - p.rec))));
        } else if (p.m === 'tj') {
          bd.appendChild(field('Cuotas', h('select', { 'data-fk': 'pc' + i, on: { change: function (e) { p.cuotas = +e.target.value; draw(); } } }, [1, 3, 6, 12].map(function (n) { return h('option', { value: n, selected: p.cuotas === n ? true : null }, n === 1 ? '1 pago' : n + ' cuotas'); }))));
          bd.appendChild(h('div.sx-vuelto', h('small', p.cuotas + (p.cuotas === 1 ? ' pago de' : ' cuotas de')), h('strong', fmt(p.amt / p.cuotas))));
        } else if (p.m === 'tr') {
          bd.appendChild(h('div.sx-alias', h('small', 'Alias para transferir'), h('strong', 'demo.' + rk + '.andrade')));
          bd.appendChild(h('label.sx-chk', h('input', { type: 'checkbox', checked: p.ok ? true : null, on: { change: function (e) { p.ok = e.target.checked; draw(); } } }), h('span', 'Ya llegó la transferencia')));
        } else {
          bd.appendChild(h('div.sx-qrbox', qrSvg(p.amt), h('div', p.ok ? h('strong.sx-okt', 'Pago acreditado') : h('small', 'Esperando que escanee el QR…'),
            p.ok ? null : btn('Simular pago recibido', function () { p.ok = true; beep(1320, 0.12); draw(); }, 'sx-ghost sm', 'check'))));
        }
        b.appendChild(r);
      });
      var fin = h('div.sx-pay-end', h('div', pend > 0 ? h('strong.sx-warnt', 'Falta cobrar ' + fmt(pend)) : pend < 0 ? h('strong.sx-badt', 'Los medios superan el total en ' + fmt(-pend)) : h('strong.sx-okt', 'Total cubierto')),
        btn('Confirmar cobro', confirm, 'sx-solid big', 'check', { disabled: okAll() ? null : true }));
      b.appendChild(fin);
    }
    function draw() { redraw(body, fill); }
    function confirm() {
      if (!okAll()) return;
      var sale = sell({
        lines: S.cart.lines.map(function (l) { return { pid: l.pid, vi: l.vi, q: l.q, dAmt: lineDisc(l) }; }), cust: S.cart.cust, seller: S.cart.seller, branch: S.br, ch: 'Local',
        pays: pays.map(function (p) { return { m: p.m, amt: p.amt, rec: p.rec, cuotas: p.cuotas }; }), gdisc: t.gd, credit: t.credit, note: S.cart.note
      });
      S.cart = { lines: [], cust: null, seller: S.cart.seller, gd: { t: '%', v: 0 }, note: '', credit: S.cart.credit - t.credit };
      m.close(); showTicket(sale);
    }
    m = openModal('Cobrar', body, { wide: true });
    pays.push({ m: 'ef', amt: t.total, rec: t.total, cuotas: 1, ok: false }); pays.length = 0; draw();
  }
  function qrSvg(seedN) {
    var r = rng(seedN + 7), n = 21, cells = '';
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
      var finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
      if (finder) continue;
      if (r() > 0.52) cells += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
    }
    function fnd(x, y) { return '<path fill-rule="evenodd" d="M' + x + ' ' + y + 'h7v7h-7zM' + (x + 1) + ' ' + (y + 1) + 'v5h5v-5z"/><rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3"/>'; }
    return h('span.sx-qr', { role: 'img', 'aria-label': 'Código QR de Mercado Pago de demostración', html: '<svg viewBox="-1 -1 23 23" fill="currentColor" shape-rendering="crispEdges">' + cells + fnd(0, 0) + fnd(14, 0) + fnd(0, 14) + '</svg>' });
  }
  function showTicket(sale) {
    var c = sale.cust != null ? custById(sale.cust) : null, body = h('div.sx-tk-wrap'), m;
    var paper = h('div.sx-ticket');
    paper.appendChild(h('div.sx-tk-h', h('strong', marca), h('small', 'Comprobante de demostración · sin validez fiscal')));
    paper.appendChild(h('div.sx-tk-meta', h('span', 'Ticket 0001-' + pad(sale.id, 8)), h('span', dmy(sale.ts) + ' ' + hm(sale.ts)), h('span', BR[sale.branch] + ' · atendió ' + SELLERS[sale.seller]), h('span', c ? 'Clienta: ' + c.name : 'Consumidor final')));
    var tb = h('div.sx-tk-items');
    sale.items.forEach(function (it) { tb.appendChild(h('div', h('span', it.q + ' × ' + it.name + (S.P[it.pid].vars.length > 1 ? ' (' + it.vn + ')' : '')), h('b', fmt(it.price * it.q - it.disc)))); });
    paper.appendChild(tb);
    var tt = h('dl.sx-tk-tot');
    if (sale.gdisc || sale.lineDisc || sale.credit) tt.appendChild(row('Subtotal', fmt(sale.gross)));
    if (sale.lineDisc) tt.appendChild(row('Descuentos', '-' + fmt(sale.lineDisc)));
    if (sale.gdisc) tt.appendChild(row('Descuento general', '-' + fmt(sale.gdisc)));
    if (sale.credit) tt.appendChild(row('Crédito por cambio', '-' + fmt(sale.credit)));
    tt.appendChild(row('TOTAL', fmt(sale.total), 'big'));
    if (S.cond === 'ri') tt.appendChild(row('Neto gravado / IVA 21%', fmt(sale.total / 1.21) + ' / ' + fmt(sale.total - sale.total / 1.21)));
    sale.pays.forEach(function (p) { tt.appendChild(row(PAYS[p.m] + (p.m === 'tj' && p.cuotas > 1 ? ' (' + p.cuotas + ' cuotas)' : ''), fmt(p.amt))); if (p.m === 'ef' && p.rec > p.amt) tt.appendChild(row('Vuelto', fmt(p.rec - p.amt))); });
    paper.appendChild(tt);
    if (sale.note) paper.appendChild(h('p.sx-tk-note', 'Nota: ' + sale.note));
    var invLine = h('p.sx-tk-inv', sale.inv ? 'Factura ' + sale.inv.tipo + ' ' + sale.inv.no : 'Sin factura emitida');
    paper.appendChild(invLine);
    paper.appendChild(h('p.sx-tk-foot', 'Gracias por tu compra. Cambios dentro de los 15 días con este ticket.'));
    body.appendChild(paper);
    var side = h('div.sx-tk-side');
    side.appendChild(h('div.sx-okmark', ico('check'), h('div', h('strong', 'Venta cobrada'), h('small', 'El stock ya se descontó' + (c ? ' y la ficha de ' + c.name.split(' ')[0] + ' se actualizó.' : '.')))));
    var chat = h('div.sx-chatprev', { 'aria-live': 'polite' });
    var phone = h('input', { type: 'tel', value: c ? c.phone : '', placeholder: '+54 9 221 …', 'aria-label': 'WhatsApp de la clienta' });
    side.appendChild(field('Enviar ticket por WhatsApp', phone));
    side.appendChild(btn('Enviar por WhatsApp', function () {
      if (!phone.value.trim()) { toast('Poné el número de la clienta.', 'warn'); return; }
      cleanEl(chat); chat.appendChild(h('div.sx-bubble', { 'data-t': 'Ahora' }, 'Hola' + (c ? ' ' + c.name.split(' ')[0] : '') + '! Gracias por tu compra en ' + marca + '. Acá está tu comprobante: ' + fmt(sale.total) + ' (' + sale.items.length + (sale.items.length > 1 ? ' productos' : ' producto') + '). Cualquier cambio, escribinos por acá.'));
      if (c) c.tl.unshift({ ago: 0, ts: new Date(), type: 'whatsapp', text: 'Se envió el comprobante por WhatsApp (' + fmt(sale.total) + ')' });
      toast('Comprobante listo para ' + phone.value + ' (simulado en esta demo).', 'ok');
    }, 'sx-ghost', 'chat'));
    side.appendChild(chat);
    side.appendChild(btn('Emitir factura ' + invType(sale), function () { var inv = issue(sale); invLine.textContent = 'Factura ' + inv.tipo + ' ' + inv.no; emit(); toast('Factura ' + inv.tipo + ' ' + inv.no + ' emitida (ficticia).', 'ok'); }, 'sx-ghost', 'file'));
    side.appendChild(btn('Nueva venta', function () { m.close(); var s = root.querySelector('.sx-pos-search input'); if (s) s.focus(); }, 'sx-solid', 'plus'));
    body.appendChild(side);
    m = openModal('Comprobante', body, { wide: true });
    if (sale.alerts && sale.alerts.length) {
      var names = sale.alerts.map(function (id) { return S.P[id].name; }).join(', ');
      setTimeout(function () { toast('Stock mínimo: ' + names + '. Te sugerimos una orden de compra en Gestión > Compras.', 'warn'); }, 500);
    }
  }

  /* ---- devoluciones, movimientos y arqueo ---- */
  function openReturn() {
    var list = S.sales.filter(function (s) { return !s.void && s.ago <= 3; }).slice(0, 8), body = h('div.sx-ret'), m, sel = { sale: null, picks: {}, why: 'Talle / medida', mode: 'efectivo' };
    function fill(b) {
      if (!sel.sale) {
        b.appendChild(h('p.sx-mut', 'Elegí la venta del ticket que trae la clienta.'));
        var l = h('div.sx-rlist');
        list.forEach(function (s) { l.appendChild(h('button.sx-rsale', { type: 'button', on: { click: function () { sel.sale = s; draw(); } } }, h('strong', '0001-' + pad(s.id, 8)), h('span', when(s.ago) + ' ' + hm(s.ts) + ' · ' + s.items.length + ' ítem' + (s.items.length > 1 ? 's' : '') + (s.cust != null ? ' · ' + custById(s.cust).name.split(' ')[0] : '')), h('b', fmt(s.total)))); });
        b.appendChild(l); return;
      }
      var s = sel.sale;
      b.appendChild(h('div.sx-ret-h', h('strong', 'Ticket 0001-' + pad(s.id, 8)), btn('Cambiar', function () { sel.sale = null; sel.picks = {}; draw(); }, 'sx-ghost sm')));
      s.items.forEach(function (it, i) {
        var max = it.q - (it.ret || 0);
        b.appendChild(h('div.sx-rit', h('span', it.name + (S.P[it.pid].vars.length > 1 ? ' (' + it.vn + ')' : '')), max <= 0 ? badge('Ya devuelto') :
          h('label.sx-field.sm', h('span.sx-vh', 'Cantidad a devolver'), h('select', { 'data-fk': 'r' + i, on: { change: function (e) { sel.picks[i] = +e.target.value; draw(); } } }, [0].concat(Array.apply(null, Array(max)).map(function (_, k) { return k + 1; })).map(function (n) { return h('option', { value: n, selected: (sel.picks[i] || 0) === n ? true : null }, n === 0 ? 'No' : n + (n === 1 ? ' unidad' : ' unidades')); })))));
      });
      b.appendChild(h('div.sx-row2', field('Motivo', h('select', { on: { change: function (e) { sel.why = e.target.value; } } }, ['Talle / medida', 'Falla de producto', 'Cambió de opinión', 'No era lo que esperaba'].map(function (x) { return h('option', { selected: sel.why === x ? true : null }, x); }))),
        field('Qué hace la clienta', h('select', { on: { change: function (e) { sel.mode = e.target.value; draw(); } } }, [['efectivo', 'Se le devuelve la plata (efectivo)'], ['cambio', 'Se lleva otra cosa (crédito por cambio)']].map(function (x) { return h('option', { value: x[0], selected: sel.mode === x[0] ? true : null }, x[1]); })))));
      var picks = Object.keys(sel.picks).filter(function (k) { return sel.picks[k] > 0; }).map(function (k) { return { i: +k, q: sel.picks[k] }; });
      var amt = picks.reduce(function (a, pk) { var it = s.items[pk.i]; return a + Math.round((it.price * it.q - it.disc) / it.q) * pk.q; }, 0);
      b.appendChild(h('div.sx-pay-end', h('div', h('small', sel.mode === 'cambio' ? 'Crédito a favor' : 'A devolver'), h('strong', fmt(amt))), btn(sel.mode === 'cambio' ? 'Registrar cambio' : 'Registrar devolución', function () {
        refund(s, picks, sel.why, sel.mode); m.close();
        toast(sel.mode === 'cambio' ? 'Cambio registrado: ' + fmt(amt) + ' de crédito en el carrito. El stock volvió.' : 'Devolución registrada: salen ' + fmt(amt) + ' de la caja y el stock volvió.', 'ok');
      }, 'sx-solid', 'undo', { disabled: picks.length ? null : true })));
    }
    function draw() { redraw(body, fill); }
    m = openModal('Devolución o cambio', body); draw();
  }
  function openMove() {
    var body = h('div'), m, tp = 'in';
    var amt = h('input', { type: 'number', min: '1', placeholder: '0', 'data-autofocus': '' }), why = h('input', { type: 'text', placeholder: 'Ej: pago al delivery, cambio chico' });
    var seg = h('div.sx-seg', { role: 'group', 'aria-label': 'Tipo de movimiento' });
    [['in', 'Ingreso'], ['out', 'Egreso']].forEach(function (a) { seg.appendChild(h('button', { type: 'button', 'aria-pressed': a[0] === tp ? 'true' : 'false', on: { click: function () { tp = a[0]; [].forEach.call(seg.children, function (x) { x.setAttribute('aria-pressed', x === this ? 'true' : 'false'); }, this); } } }, a[1])); });
    seg.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; [].forEach.call(seg.children, function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); });
    body.appendChild(h('p.sx-mut', 'Registrá plata que entra o sale de la caja fuera de una venta. El arqueo queda ordenado.'));
    body.appendChild(seg); body.appendChild(field('Importe', amt)); body.appendChild(field('Motivo', why));
    body.appendChild(btn('Registrar', function () {
      var v = Math.round(+amt.value); if (!(v > 0)) { toast('Poné un importe.', 'warn'); return; }
      S.caja.moves.push({ amt: tp === 'in' ? v : -v, why: why.value || (tp === 'in' ? 'Ingreso' : 'Egreso') }); m.close(); emit(); toast('Movimiento registrado.', 'ok');
    }, 'sx-solid', 'check'));
    m = openModal('Movimiento de caja', body);
  }
  function openOpen() {
    var body = h('div'), m, inp = h('input', { type: 'number', min: '0', value: 20000, 'data-autofocus': '' });
    body.appendChild(h('p.sx-mut', 'Contá el efectivo inicial (el cambio con el que arrancás el día).')); body.appendChild(field('Efectivo inicial', inp));
    body.appendChild(btn('Abrir caja', function () { S.caja = { open: true, opening: Math.max(0, Math.round(+inp.value || 0)), sess: S.caja.sess + 1, moves: [], closed: S.caja.closed }; m.close(); emit(); toast('Caja abierta. A vender.', 'ok'); }, 'sx-solid', 'cash'));
    m = openModal('Abrir caja', body);
  }
  function openClose() {
    var sm = cajaSummary(), body = h('div.sx-close'), m;
    var dl = h('dl.sx-tot');
    dl.appendChild(row('Efectivo inicial', fmt(S.caja.opening)));
    dl.appendChild(row('Ventas en efectivo', fmt(sm.by.ef)));
    if (sm.mv) dl.appendChild(row('Ingresos / egresos', fmt(sm.mv)));
    if (sm.rfEf) dl.appendChild(row('Devoluciones en efectivo', '-' + fmt(sm.rfEf)));
    dl.appendChild(row('Efectivo esperado', fmt(sm.expected), 'big'));
    body.appendChild(h('p.sx-mut', 'Resumen del día · ' + sm.n + ' ventas por ' + fmt(sm.tot)));
    var mix = h('div.sx-mix'); ['ef', 'tj', 'tr', 'qr'].forEach(function (k) { mix.appendChild(h('div', h('small', PAYS[k]), h('strong', fmt(sm.by[k])))); }); body.appendChild(mix);
    body.appendChild(dl);
    var inp = h('input', { type: 'number', min: '0', placeholder: 'Contá los billetes y escribilo', 'data-autofocus': '' }), diff = h('div.sx-diff', { 'aria-live': 'polite' }, 'Ingresá el efectivo contado para ver la diferencia.');
    inp.addEventListener('input', function () {
      var d = Math.round(+inp.value || 0) - sm.expected;
      diff.className = 'sx-diff ' + (d === 0 ? 'ok' : 'bad');
      diff.textContent = inp.value === '' ? 'Ingresá el efectivo contado para ver la diferencia.' : d === 0 ? 'Caja perfecta: coincide con lo esperado.' : d > 0 ? 'Sobran ' + fmt(d) : 'Faltan ' + fmt(-d);
    });
    body.appendChild(field('Efectivo contado', inp)); body.appendChild(diff);
    body.appendChild(btn('Cerrar caja', function () {
      if (inp.value === '') { toast('Contá el efectivo para cerrar con arqueo.', 'warn'); return; }
      var d = Math.round(+inp.value) - sm.expected;
      S.caja.open = false; S.caja.closed = { diff: d, tot: sm.tot, n: sm.n, ts: new Date() }; m.close(); S.cart.lines = []; emit();
      toast(d === 0 ? 'Caja cerrada sin diferencias.' : 'Caja cerrada con ' + (d > 0 ? 'sobrante' : 'faltante') + ' de ' + fmt(Math.abs(d)) + '. Queda registrado.', d === 0 ? 'ok' : 'warn');
    }, 'sx-solid', 'lock'));
    m = openModal('Cierre de caja', body);
  }

  mods.caja = {
    dirty: true,
    build: function () {
      var el = h('div.sx-pos');
      P_.bar = h('div.sx-pos-bar'); P_.grid = h('div.sx-grid', { role: 'list-ish' }); P_.grid.removeAttribute('role'); P_.cart = h('aside.sx-cart', { 'aria-label': 'Carrito' }); P_.mini = h('div.sx-minibar');
      P_.msg = h('div.sx-scan-msg', { role: 'status', 'aria-live': 'polite' });
      var search = h('label.sx-pos-search', h('span.sx-vh', 'Buscar producto'), ico('search'), h('input', { type: 'search', placeholder: 'Buscar por nombre o código  ·  F2', 'aria-keyshortcuts': 'F2', 'data-fk': 'q', on: { input: function (e) { pos.q = e.target.value; drawGrid(); } } }));
      var scan = h('form.sx-scan', { on: { submit: function (e) { e.preventDefault(); var i = e.target.querySelector('input'); scanCode(i.value); i.value = ''; } } },
        h('label', h('span.sx-vh', 'Código de barras'), ico('scan'), h('input', { type: 'text', placeholder: 'Código de barras o SKU', inputmode: 'numeric', autocomplete: 'off', 'data-fk': 'scan' })),
        btn('Escanear  ·  F8', scanRandom, 'sx-ghost', 'scan', { 'aria-keyshortcuts': 'F8' }));
      var cats = h('div.sx-cats', { role: 'group', 'aria-label': 'Categorías', 'data-ks': 'cats' });
      ['Todas'].concat(R.cats).forEach(function (c) { cats.appendChild(h('button.sx-chip', { type: 'button', 'aria-pressed': pos.cat === c ? 'true' : 'false', on: { click: function () { pos.cat = c; [].forEach.call(cats.children, function (x) { x.setAttribute('aria-pressed', x.textContent === c ? 'true' : 'false'); }); drawGrid(); } } }, c)); });
      var left = h('div.sx-pos-left', h('div.sx-pos-tools', search, scan), P_.msg, cats, P_.grid);
      el.appendChild(P_.bar); el.appendChild(h('div.sx-pos-main', left, P_.cart)); el.appendChild(P_.mini);
      this.el = el;
    },
    refresh: function () { this.dirty = false; drawAll(); },
    openReturn: function () { openReturn(); }, openOpen: function () { openOpen(); }, openClose: function () { openClose(); }
  };
  function onKey(e) {
    if (S.tab !== 'caja' || modalOpen()) return;
    var k = e.key; if (!/^F(2|4|6|7|8)$/.test(k)) return;
    var a = sh.activeElement;
    var ha = doc.activeElement;
    if (!(a || ha === host || !ha || ha === doc.body)) return;
    if (!a && (ha === doc.body || !ha)) { var r = host.getBoundingClientRect(); if (r.bottom < 0 || r.top > (window.innerHeight || 800)) return; }
    e.preventDefault();
    if (k === 'F2') { var s = root.querySelector('.sx-pos-search input'); if (s) { s.focus(); s.select(); } }
    else if (k === 'F4') openPay();
    else if (k === 'F6') holdCart();
    else if (k === 'F7') { if (S.caja.open) openReturn(); }
    else if (k === 'F8') scanRandom();
  }

  /* =====================================================================
     CLIENTAS (CRM)
     ===================================================================== */
  var crm = { view: 'clientas', seg: 'todas', q: '', sel: null, camp: { tpl: 0, seg: 'inactivas', pid: 0, when: 'ahora', text: null }, nav: null, box: null };
  var SEGS = [['todas', 'Todas'], ['nuevas', 'Nuevas'], ['frecuentes', 'Frecuentes'], ['inactivas', 'Inactivas +60 días'], ['vip', 'VIP'], ['cumple', 'Cumpleaños del mes']];
  var TPL = [
    { n: 'Novedades', t: 'Hola {nombre}! Llegaron novedades a {marca} y pensé en vos: {producto}. ¿Querés que te lo reserve?' },
    { n: 'Te extrañamos', t: 'Hola {nombre}, hace mucho que no te vemos por {marca}. Tenemos un beneficio para tu próxima compra: 10% off hasta el viernes. ¿Te cuento?' },
    { n: 'Cumpleaños', t: 'Feliz cumple {nombre}! En {marca} te regalamos un cupón del 15% para vos, válido todo el mes.' },
    { n: 'Volvió el stock', t: 'Hola {nombre}! Volvió el stock de {producto}. Te aviso a vos primero, ¿te lo guardo?' }
  ];
  function nps() {
    var n = S.nps.length, p = S.nps.filter(function (x) { return x.s >= 9; }).length, d = S.nps.filter(function (x) { return x.s <= 6; }).length;
    return { n: n, p: pct(p, n), d: pct(d, n), pa: 100 - pct(p, n) - pct(d, n), score: pct(p, n) - pct(d, n) };
  }
  function dueLabel(t) { return t.due < 0 ? 'Vencida hace ' + (-t.due) + (t.due === -1 ? ' día' : ' días') : t.due === 0 ? 'Hoy' : t.due === 1 ? 'Mañana' : 'En ' + t.due + ' días'; }
  function vars(text, c, p) { return text.replace(/\{nombre\}/g, c ? c.name.split(' ')[0] : 'Sofi').replace(/\{producto\}/g, p ? p.name : 'nuestra novedad').replace(/\{marca\}/g, marca); }
  function isWide() { return !window.matchMedia || window.matchMedia('(min-width: 980px)').matches; }

  function crmCounts() {
    var open = S.deals.filter(function (d) { return d.stage < 3; }).length, tk = S.tasks.filter(function (t) { return !t.done; }).length;
    var map = { clientas: S.C.length, pipeline: open, tareas: tk, opiniones: nps().score };
    [].forEach.call(crm.nav.querySelectorAll('.sx-tab'), function (b) { var k = b.getAttribute('data-k'), e = b.querySelector('.sx-cnt'); if (e && map[k] != null) e.textContent = String(map[k]); });
  }
  function drawCrm() {
    redraw(crm.box, function (b) { ({ clientas: vClientas, pipeline: vPipeline, tareas: vTareas, campanas: vCampanas, automat: vAutomat, opiniones: vOpiniones })[crm.view](b); });
    crm.box.setAttribute('aria-labelledby', 'sx-ct-' + rk + '-' + crm.view);
    crmCounts();
  }

  /* ---- Clientas ---- */
  function vClientas(b) {
    var chips = h('div.sx-cats', { role: 'group', 'aria-label': 'Segmentos', 'data-ks': 'segs' });
    SEGS.forEach(function (s) {
      var n = S.C.filter(function (c) { return segOf(c, s[0]); }).length;
      chips.appendChild(h('button.sx-chip', { type: 'button', 'aria-pressed': crm.seg === s[0] ? 'true' : 'false', on: { click: function () { crm.seg = s[0]; drawCrm(); } } }, s[1], h('em', String(n))));
    });
    b.appendChild(h('div.sx-vh-row', chips, h('label.sx-pos-search', h('span.sx-vh', 'Buscar clienta'), ico('search'), h('input', { type: 'search', placeholder: 'Buscar clienta…', value: crm.q, 'data-fk': 'cq', on: { input: function (e) { crm.q = e.target.value; drawCrm(); } } }))));
    var q = crm.q.trim().toLowerCase();
    var list = S.C.filter(function (c) { return segOf(c, crm.seg) && (!q || c.name.toLowerCase().indexOf(q) > -1); }).sort(function (a, b2) { return ltv(b2) - ltv(a); });
    var lst = h('div.sx-clist', { role: 'list' });
    if (!list.length) lst.appendChild(empty('Nadie en este segmento', 'Cuando alguien cumpla las condiciones, aparece sola.'));
    list.forEach(function (c) {
      var la = lastAgo(c);
      lst.appendChild(h('button.sx-crow', { type: 'button', role: 'listitem', 'aria-current': crm.sel === c.id && isWide() ? 'true' : null, on: { click: function () { showDetail(c); } } },
        h('b.sx-av', initials(c.name)), h('span.sx-cr-n', h('strong', c.name), h('small', (c.tags[0] || '') + (c.tags[0] ? ' · ' : '') + (la < 9999 ? 'última compra: ' + when(la).toLowerCase() : 'sin compras'))),
        h('span.sx-cr-v', h('b', fmt(ltv(c))), h('small', nBuys(c) + ' compras')), la > 60 && la < 9999 ? badge('+60 días', 'warn') : null));
    });
    var wrap = h('div.sx-split', lst);
    if (isWide()) { var cur = custById(crm.sel) || list[0] || null; wrap.appendChild(h('div.sx-cdet', cur ? detailNode(cur, drawCrm) : empty('Elegí una clienta'))); }
    b.appendChild(wrap);
  }
  function showDetail(c) {
    crm.sel = c.id;
    if (isWide() && crm.view === 'clientas') { drawCrm(); return; }
    var body = h('div'), m;
    function draw() { redraw(body, function (bb) { bb.appendChild(detailNode(c, draw)); }); }
    m = openModal(c.name, body, { wide: true }); draw();
  }
  function detailNode(c, rerender) {
    var d = h('div.sx-det'), la = lastAgo(c), nb = nBuys(c);
    d.appendChild(h('div.sx-det-h', h('b.sx-av.lg', initials(c.name)), h('div', h('h3', c.name), h('small', c.phone + (c.ri ? ' · Responsable Inscripto' : '')))));
    d.appendChild(h('div.sx-det-act', btn('WhatsApp', function () { composeWa(c, rerender); }, 'sx-solid sm', 'chat'), btn('Tarea', function () { addTaskPrompt(c, rerender); }, 'sx-ghost sm', 'clock'), btn('Nueva consulta', function () { newDeal(c, rerender); }, 'sx-ghost sm', 'plus')));
    d.appendChild(h('div.sx-kpis4', kpi('Valor de vida', fmt(ltv(c)), 'big'), kpi('Compras', String(nb)), kpi('Ticket prom.', nb ? fmt(ltv(c) / nb) : '-'), kpi('Última compra', la < 9999 ? when(la) : '-')));
    var bd = c.bday;
    d.appendChild(h('p.sx-bday', ico('gift'), 'Cumple el ' + bdayLabel(c), bd <= 7 ? badge(bd === 0 ? 'Es hoy' : 'En ' + bd + ' días', 'ok') : h('small.sx-mut', ' (en ' + bd + ' días)')));
    var tg = h('div.sx-tags'); c.tags.forEach(function (t, i) { tg.appendChild(h('span.sx-tag', t, h('button', { type: 'button', 'aria-label': 'Quitar etiqueta ' + t, on: { click: function () { c.tags.splice(i, 1); emit(); rerender(); } } }, ico('x')))); });
    var ti = h('input', { type: 'text', placeholder: 'Nueva etiqueta', 'aria-label': 'Nueva etiqueta', 'data-fk': 'tag' + c.id });
    var addTag = function () { var v = ti.value.trim(); if (v && c.tags.indexOf(v) < 0) { c.tags.push(v); emit(); rerender(); } };
    ti.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); addTag(); } });
    d.appendChild(h('div.sx-block', h('h4', 'Etiquetas'), tg, h('div.sx-inl', ti, btn('Agregar', addTag, 'sx-ghost sm', 'plus'))));
    d.appendChild(h('div.sx-block', h('h4', 'Talles y preferencias'), h('input', { type: 'text', value: c.pref, 'aria-label': 'Preferencias', 'data-fk': 'pref' + c.id, on: { change: function (e) { c.pref = e.target.value; toast('Preferencias guardadas.', 'ok'); } } })));
    var ni = h('input', { type: 'text', placeholder: 'Escribí una nota y apretá Enter', 'aria-label': 'Nueva nota', 'data-fk': 'nota' + c.id });
    var addNote = function () { var v = ni.value.trim(); if (!v) return; c.tl.unshift({ ago: 0, ts: new Date(), type: 'nota', text: v }); rerender(); };
    ni.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); addNote(); } });
    d.appendChild(h('div.sx-block', h('h4', 'Notas'), h('div.sx-inl', ni, btn('Guardar', addNote, 'sx-ghost sm', 'plus'))));
    var tl = h('ol.sx-tl');
    c.tl.slice(0, 12).forEach(function (e) { tl.appendChild(h('li.sx-tl-' + e.type, h('i', ico(e.type === 'compra' ? 'bag2' : e.type === 'whatsapp' ? 'chat' : e.type === 'campana' ? 'spark' : 'file')), h('div', h('span', e.text), h('small', when(e.ago) + (e.ts ? ' · ' + hm(e.ts) : ''))))); });
    d.appendChild(h('div.sx-block', h('h4', 'Historial'), tl));
    return d;
  }
  PATHS.bag2 = '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 016 0v2"/>';
  function kpi(l, v, cls) { return h('div.sx-kpi' + (cls ? '.' + cls : ''), h('small', l), h('strong', v)); }
  function composeWa(c, rerender) {
    var body = h('div'), m, ta = h('textarea', { rows: '4', 'aria-label': 'Mensaje', 'data-autofocus': '' }, 'Hola ' + c.name.split(' ')[0] + '! ');
    body.appendChild(h('p.sx-mut', 'Se manda desde el WhatsApp del negocio y queda guardado en el historial de la clienta.'));
    body.appendChild(ta);
    body.appendChild(btn('Enviar mensaje', function () { var t = ta.value.trim(); if (!t) return; c.tl.unshift({ ago: 0, ts: new Date(), type: 'whatsapp', text: 'Mensaje enviado: "' + t + '"' }); m.close(); emit(); if (rerender) rerender(); toast('Mensaje enviado a ' + c.name.split(' ')[0] + ' (simulado) y guardado en su historial.', 'ok'); }, 'sx-solid', 'chat'));
    m = openModal('Escribirle a ' + c.name.split(' ')[0], body);
  }
  function addTaskPrompt(c, rerender) {
    var body = h('div'), m, tx = h('input', { type: 'text', value: 'Llamar a ' + c.name.split(' ')[0], 'data-autofocus': '' }), wh = h('select', null, [['0', 'Hoy'], ['1', 'Mañana'], ['3', 'En 3 días'], ['7', 'En una semana']].map(function (x) { return h('option', { value: x[0] }, x[1]); }));
    body.appendChild(field('Recordatorio', tx)); body.appendChild(field('Cuándo', wh));
    body.appendChild(btn('Crear tarea', function () { if (!tx.value.trim()) return; S.tasks.push({ id: nid(), text: tx.value.trim(), due: +wh.value, cust: c.id, done: false }); m.close(); emit(); toast('Tarea creada: te la mostramos en "Tareas".', 'ok'); }, 'sx-solid', 'check'));
    m = openModal('Nueva tarea', body);
  }
  function newDeal(c, rerender) {
    var body = h('div'), m, ps = h('select', { 'data-autofocus': '' }, S.P.map(function (p) { return h('option', { value: p.id }, p.name); })), ch = h('select', null, CHANNELS.map(function (x) { return h('option', x); }));
    body.appendChild(field('Producto consultado', ps)); body.appendChild(field('Canal', ch));
    body.appendChild(btn('Crear consulta', function () { var p = S.P[+ps.value]; S.deals.push({ id: nid(), cust: c.id, pid: p.id, amt: p.price, stage: 0, ch: ch.value, days: 0, sold: false }); c.tl.unshift({ ago: 0, ts: new Date(), type: 'whatsapp', text: 'Nueva consulta por ' + p.name + ' (' + ch.value + ')' }); m.close(); emit(); toast('Consulta creada en el pipeline: "Nueva consulta".', 'ok'); }, 'sx-solid', 'check'));
    m = openModal('Nueva consulta de ' + c.name.split(' ')[0], body);
  }

  /* ---- Pipeline ---- */
  function vPipeline(b) {
    var open = S.deals.filter(function (d) { return d.stage < 3; }), sum = open.reduce(function (s, d) { return s + d.amt; }, 0), won = S.deals.filter(function (d) { return d.stage >= 3; }).reduce(function (s, d) { return s + d.amt; }, 0);
    b.appendChild(h('div.sx-vh-row', h('div.sx-kpis4.sm', kpi('En juego', fmt(sum)), kpi('Consultas abiertas', String(open.length)), kpi('Vendido', fmt(won))),
      btn('Nueva consulta', function () { var m; var cs = h('select', { 'data-autofocus': '' }, S.C.map(function (c) { return h('option', { value: c.id }, c.name); })); var bd = h('div'); bd.appendChild(cs); var wrapC = field('Clienta', cs); bd = h('div', wrapC); var ps = h('select', null, S.P.map(function (p) { return h('option', { value: p.id }, p.name); })), ch = h('select', null, CHANNELS.map(function (x) { return h('option', x); })); bd.appendChild(field('Producto', ps)); bd.appendChild(field('Canal', ch)); bd.appendChild(btn('Crear', function () { var p = S.P[+ps.value]; S.deals.push({ id: nid(), cust: +cs.value, pid: p.id, amt: p.price, stage: 0, ch: ch.value, days: 0, sold: false }); m.close(); emit(); toast('Consulta agregada a "Nueva consulta".', 'ok'); }, 'sx-solid', 'check')); m = openModal('Nueva consulta', bd); }, 'sx-solid', 'plus')));
    b.appendChild(h('p.sx-hint', 'Arrastrá las tarjetas entre columnas o usá las flechas de cada una (sirve con teclado y en el celu). Al pasar a "Vendida" se registra la venta y se descuenta el stock.'));
    var board = h('div.sx-board', { 'data-ks': 'board', role: 'group', 'aria-label': 'Pipeline de consultas' });
    STAGES.forEach(function (name, si) {
      var ds = S.deals.filter(function (d) { return d.stage === si; }), col = h('section.sx-col', { 'aria-label': name + ', ' + ds.length + ' tarjetas', 'data-stage': si });
      col.appendChild(h('header', h('strong', name), h('em', String(ds.length)), h('small', fmt(ds.reduce(function (s, d) { return s + d.amt; }, 0)))));
      var lane = h('div.sx-lane');
      if (!ds.length) lane.appendChild(h('p.sx-lane-e', 'Soltá una tarjeta acá'));
      ds.forEach(function (d) {
        var c = custById(d.cust), p = S.P[d.pid];
        var card = h('article.sx-dcard', { draggable: 'true', 'data-id': d.id, tabindex: '0', 'aria-label': (c ? c.name : '') + ', ' + p.name + ', ' + name },
          h('div.sx-dc-t', h('strong', c ? c.name : 'Sin nombre'), badge(d.ch)),
          h('p', p.name), h('div.sx-dc-b', h('b', fmt(d.amt)), h('small', d.days ? d.days + (d.days === 1 ? ' día' : ' días') + ' en esta etapa' : 'Recién movida')),
          d.tag ? h('p.sx-dc-tag', ico('spark'), d.tag) : null,
          h('div.sx-dc-m', btn(null, function () { moveDeal(d, d.stage - 1); }, 'sx-ghost sx-icn sm', 'left', { 'aria-label': 'Mover a ' + (STAGES[si - 1] || ''), disabled: si === 0 ? true : null }),
            btn(null, function () { if (c) showDetail(c); }, 'sx-ghost sm', null, { 'aria-label': 'Ver ficha de ' + (c ? c.name : '') }),
            btn(null, function () { moveDeal(d, d.stage + 1); }, 'sx-ghost sx-icn sm', 'right', { 'aria-label': 'Mover a ' + (STAGES[si + 1] || ''), disabled: si === 4 ? true : null })));
        card.lastChild.children[1].appendChild(ico('user')); card.lastChild.children[1].appendChild(h('span', 'Ficha'));
        card.addEventListener('dragstart', function (e) { try { e.dataTransfer.setData('text/plain', String(d.id)); e.dataTransfer.effectAllowed = 'move'; } catch (x) {} card.classList.add('drag'); });
        card.addEventListener('dragend', function () { card.classList.remove('drag'); });
        lane.appendChild(card);
      });
      col.addEventListener('dragover', function (e) { e.preventDefault(); col.classList.add('over'); });
      col.addEventListener('dragleave', function (e) { if (!col.contains(e.relatedTarget)) col.classList.remove('over'); });
      col.addEventListener('drop', function (e) {
        e.preventDefault(); col.classList.remove('over');
        var id = +(e.dataTransfer && e.dataTransfer.getData('text/plain')); var d2 = S.deals.filter(function (x) { return x.id === id; })[0];
        if (d2 && moveDeal(d2, si)) toast((custById(d2.cust) || { name: '' }).name.split(' ')[0] + ' pasó a "' + name + '".', 'ok');
      });
      col.appendChild(lane); board.appendChild(col);
    });
    b.appendChild(board);
  }

  /* ---- Tareas ---- */
  function vTareas(b) {
    var tx = h('input', { type: 'text', placeholder: 'Ej: llamar el jueves a Camila por el pedido', 'aria-label': 'Nueva tarea', 'data-fk': 'tt' }), wh = h('select', { 'aria-label': 'Vence' }, [['0', 'Hoy'], ['1', 'Mañana'], ['3', 'En 3 días'], ['7', 'En una semana']].map(function (x) { return h('option', { value: x[0] }, x[1]); }));
    var add = function () { if (!tx.value.trim()) return; S.tasks.push({ id: nid(), text: tx.value.trim(), due: +wh.value, cust: null, done: false }); emit(); };
    tx.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); add(); } });
    b.appendChild(h('div.sx-inl.sx-taskadd', tx, wh, btn('Agregar', add, 'sx-solid', 'plus')));
    var groups = [['Vencidas', function (t) { return !t.done && t.due < 0; }], ['Para hoy', function (t) { return !t.done && t.due === 0; }], ['Próximas', function (t) { return !t.done && t.due > 0; }], ['Hechas', function (t) { return t.done; }]];
    groups.forEach(function (g) {
      var ts = S.tasks.filter(g[1]).sort(function (a, c) { return a.due - c.due; }); if (!ts.length) return;
      var ul = h('ul.sx-tasks'); ts.forEach(function (t) {
        var c = t.cust ? custById(t.cust) : null;
        ul.appendChild(h('li' + (t.done ? '.done' : ''), h('button.sx-check', { type: 'button', role: 'checkbox', 'aria-checked': t.done ? 'true' : 'false', 'aria-label': (t.done ? 'Desmarcar: ' : 'Marcar como hecha: ') + t.text, on: { click: function () { t.done = !t.done; if (t.done) toast('Tarea hecha.', 'ok'); emit(); } } }, ico('check')),
          h('span.sx-task-t', t.text, t.auto ? badge('Automática', 'ok') : null), c ? btn(c.name.split(' ')[0], function () { showDetail(c); }, 'sx-chip', 'user') : null, h('small' + (t.due < 0 && !t.done ? '.bad' : ''), t.done ? 'Hecha' : dueLabel(t))));
      });
      b.appendChild(h('section.sx-tgrp', h('h4', g[0] + ' (' + ts.length + ')'), ul));
    });
  }

  /* ---- Campañas de WhatsApp ---- */
  function vCampanas(b) {
    var cp = crm.camp, targets = S.C.filter(function (c) { return segOf(c, cp.seg); }), sample = targets[0] || null;
    if (cp.text == null) cp.text = TPL[cp.tpl].t;
    var left = h('div.sx-camp-f');
    left.appendChild(h('h4', '1. Elegí un mensaje'));
    var tp = h('div.sx-cats', { role: 'group', 'aria-label': 'Plantillas' });
    TPL.forEach(function (t, i) { tp.appendChild(h('button.sx-chip', { type: 'button', 'aria-pressed': cp.tpl === i ? 'true' : 'false', on: { click: function () { cp.tpl = i; cp.text = t.t; if (i === 1) cp.seg = 'inactivas'; if (i === 2) cp.seg = 'cumple'; drawCrm(); } } }, t.n)); });
    left.appendChild(tp);
    left.appendChild(field('Mensaje (usá {nombre}, {producto}, {marca})', h('textarea', { rows: '4', 'data-fk': 'ctx', on: { input: function (e) { cp.text = e.target.value; var pv = crm.box.querySelector('.sx-bubble'); if (pv) pv.textContent = vars(cp.text, sample, S.P[cp.pid]); } } }, cp.text)));
    left.appendChild(h('h4', '2. A quiénes'));
    left.appendChild(h('div.sx-row2', field('Segmento', h('select', { 'data-fk': 'cseg', on: { change: function (e) { cp.seg = e.target.value; drawCrm(); } } }, SEGS.map(function (s) { return h('option', { value: s[0], selected: cp.seg === s[0] ? true : null }, s[1]); }))),
      field('Producto', h('select', { 'data-fk': 'cprod', on: { change: function (e) { cp.pid = +e.target.value; drawCrm(); } } }, S.P.map(function (p) { return h('option', { value: p.id, selected: cp.pid === p.id ? true : null }, p.name); })))));
    left.appendChild(h('p.sx-reach', ico('chat'), h('span', 'Le llega a ', h('strong', targets.length + (targets.length === 1 ? ' clienta' : ' clientas')), targets.length ? ': ' + targets.slice(0, 4).map(function (c) { return c.name.split(' ')[0]; }).join(', ') + (targets.length > 4 ? ' y ' + (targets.length - 4) + ' más' : '') : '. Elegí otro segmento.')));
    left.appendChild(h('h4', '3. Cuándo'));
    var wh = h('div.sx-cats', { role: 'group', 'aria-label': 'Programación' });
    [['ahora', 'Enviar ahora'], ['man', 'Mañana 10:00'], ['vie', 'Viernes 18:00']].forEach(function (x) { wh.appendChild(h('button.sx-chip', { type: 'button', 'aria-pressed': cp.when === x[0] ? 'true' : 'false', on: { click: function () { cp.when = x[0]; drawCrm(); } } }, x[1])); });
    left.appendChild(wh);
    left.appendChild(btn(cp.when === 'ahora' ? 'Enviar a ' + targets.length : 'Programar para ' + targets.length, function () {
      if (!targets.length) { toast('No hay clientas en ese segmento.', 'warn'); return; }
      var whenTxt = { ahora: 'Enviada hoy ' + hm(new Date()), man: 'Programada para mañana 10:00', vie: 'Programada para el viernes 18:00' }[cp.when];
      S.camps.unshift({ id: nid(), name: TPL[cp.tpl].n, seg: cp.seg, n: targets.length, when: whenTxt, text: cp.text, resp: Math.max(1, Math.round(targets.length * 0.3)), now: cp.when === 'ahora' });
      if (cp.when === 'ahora') targets.forEach(function (c) { c.tl.unshift({ ago: 0, ts: new Date(), type: 'campana', text: 'Campaña "' + TPL[cp.tpl].n + '" enviada por WhatsApp' }); });
      toast(cp.when === 'ahora' ? 'Campaña enviada a ' + targets.length + ' (simulado). Queda en el historial de cada clienta.' : 'Campaña programada. Sale sola a la hora elegida.', 'ok'); emit();
    }, 'sx-solid big', 'chat', { disabled: targets.length ? null : true }));
    var right = h('div.sx-camp-p', h('h4', 'Así lo recibe ' + (sample ? sample.name.split(' ')[0] : 'la clienta')),
      h('div.sx-phone', h('div.sx-phone-h', h('b.sx-av', initials(marca)), h('div', h('strong', marca), h('small', 'en línea'))), h('div.sx-phone-b', h('div.sx-bubble', { 'data-t': hm(new Date()) }, vars(cp.text, sample, S.P[cp.pid])))),
      h('p.sx-hint', 'En la versión real sale por la API oficial de WhatsApp Business. Acá es una simulación.'));
    b.appendChild(h('div.sx-camp', left, right));
    var hist = h('div.sx-block', h('h4', 'Campañas anteriores'));
    var ul = h('ul.sx-camps'); S.camps.forEach(function (c) { ul.appendChild(h('li', h('strong', c.name), h('span', c.n + ' clientas · ' + (SEGS.filter(function (s) { return s[0] === c.seg; })[0] || ['', ''])[1]), h('small', c.when + (c.now === false ? '' : ' · ~82% leyó · ' + c.resp + ' respondieron')))); });
    hist.appendChild(ul); b.appendChild(hist);
  }

  /* ---- Automatizaciones ---- */
  function vAutomat(b) {
    b.appendChild(h('p.sx-hint', 'Cosas que el sistema hace solo, sin que nadie se acuerde. Prendé y apagá cada una: lo que activás acá se aplica de verdad en la demo (probalo cobrando una venta en Caja con una clienta cargada).'));
    var g = h('div.sx-autos');
    S.autos.forEach(function (a) {
      g.appendChild(h('div.sx-auto' + (a.on ? ' on' : ''), h('div.sx-auto-t', h('small', 'Cuando'), h('strong', a.t)), h('div.sx-auto-a', ico('arrow'), h('div', h('small', 'Entonces'), h('strong', a.a))),
        h('div.sx-auto-f', h('small', 'Se ejecutó ' + a.runs + ' veces'), h('button.sx-toggle', { type: 'button', role: 'switch', 'aria-checked': a.on ? 'true' : 'false', 'aria-label': a.t + ': ' + a.a, on: { click: function () { a.on = !a.on; toast(a.on ? 'Automatización activada.' : 'Automatización pausada.', a.on ? 'ok' : 'warn'); drawCrm(); } } }, h('i')))));
    });
    b.appendChild(g);
  }

  /* ---- Opiniones (NPS) ---- */
  function vOpiniones(b) {
    var n = nps();
    b.appendChild(h('div.sx-nps',
      h('div.sx-nps-s', h('small', 'Satisfacción (NPS)'), h('strong', String(n.score)), h('small', n.n + ' respuestas'),
        h('div.sx-bar3', { role: 'img', 'aria-label': n.p + '% promotoras, ' + n.pa + '% neutras, ' + n.d + '% detractoras' }, h('i.p', { style: 'width:' + n.p + '%' }), h('i.n', { style: 'width:' + n.pa + '%' }), h('i.d', { style: 'width:' + n.d + '%' })),
        h('div.sx-leg', h('span', h('i.p'), 'Promotoras ' + n.p + '%'), h('span', h('i.n'), 'Neutras ' + n.pa + '%'), h('span', h('i.d'), 'Detractoras ' + n.d + '%'))),
      h('div.sx-nps-q', h('h4', 'Encuesta que reciben por WhatsApp'), h('div.sx-phone', h('div.sx-phone-b', h('div.sx-bubble', { 'data-t': hm(new Date()) }, 'Hola! Gracias por comprar en ' + marca + '. Del 0 al 10, ¿qué tan probable es que nos recomiendes a una amiga?'))),
        btn('Mandar encuesta a las compras de la semana', function () { addNps(5); toast('Encuesta enviada. Entraron 5 respuestas nuevas (simulado).', 'ok'); emit(); }, 'sx-solid', 'star'))));
    var ul = h('ul.sx-revs'); S.nps.slice(0, 8).forEach(function (r) { ul.appendChild(h('li', h('b.sx-score ' + (r.s >= 9 ? 'p' : r.s >= 7 ? 'n' : 'd'), String(r.s)), h('div', h('strong', r.who), h('span', r.t)), h('small', when(r.ago)))); });
    b.appendChild(h('div.sx-block', h('h4', 'Últimas opiniones'), ul));
  }

  mods.crm = {
    dirty: true,
    build: function () {
      var el = h('div.sx-crm'), items = [['clientas', 'Clientas', 'user'], ['pipeline', 'Consultas', 'chat'], ['tareas', 'Tareas', 'clock'], ['campanas', 'Campañas', 'spark'], ['automat', 'Automatizaciones', 'zap'], ['opiniones', 'Opiniones', 'star']];
      PATHS.zap = '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>';
      crm.nav = tabsBar(items.map(function (i) { return { k: i[0], label: i[1], icon: i[2], count: ['clientas', 'pipeline', 'tareas'].indexOf(i[0]) > -1 ? 0 : null }; }), crm.view, function (k) { crm.view = k; crm.nav.sel(k); drawCrm(); }, { label: 'Secciones del CRM', id: 'sx-ct-' + rk, cls: 'sub', panel: 'sx-crm-box-' + rk });
      crm.box = h('div.sx-view', { id: 'sx-crm-box-' + rk, role: 'tabpanel' });
      el.appendChild(crm.nav); el.appendChild(crm.box); this.el = el;
    },
    refresh: function () { this.dirty = false; drawCrm(); },
    getView: function () { return crm.view; },
    setView: function (v) { crm.view = v; crm.nav.sel(v); drawCrm(); }
  };

  /* =====================================================================
     GESTIÓN (ERP)
     ===================================================================== */
  var erp = { view: 'panel', period: 30, br: 'all', low: false, q: '', open: {}, rep: 'top', repP: 30, nav: null, box: null, roleBar: null, navHost: null };
  var ERP_TABS = [['panel', 'Panel', 'chart'], ['inventario', 'Inventario', 'box'], ['compras', 'Compras', 'truck'], ['facturacion', 'Facturación', 'file'], ['cuentas', 'Cuentas', 'bank'], ['reportes', 'Reportes', 'download'], ['integraciones', 'Canales', 'link']];
  var ROLE_TXT = { duena: 'Ve todo: ventas, costos, márgenes, compras y cuentas.', vendedora: 'Ve el panel básico, el stock sin costos y los pedidos. No ve márgenes, compras ni cuentas.', contadora: 'Ve facturación, cuentas, reportes y el panel. No toca stock ni compras.' };
  var CH_ON = { 'Tienda online': true, 'Instagram': true, 'Mercado Libre': false, 'Tiendanube': false };

  function svgNode(html, cls, label) { return h('span.' + cls, { role: 'img', 'aria-label': label, html: html }); }
  function barChart(data, hlLast) {
    var W = 640, H = 220, pl = 6, pb = 24, pt = 14, n = data.length, max = Math.max.apply(null, data.map(function (d) { return d.v; }).concat([1])), bw = (W - pl * 2) / n, s = '';
    for (var g = 1; g <= 3; g++) { var y = pt + (H - pt - pb) * (1 - g / 3); s += '<line x1="0" x2="' + W + '" y1="' + y.toFixed(1) + '" y2="' + y.toFixed(1) + '" class="g"/><text x="0" y="' + (y - 3).toFixed(1) + '" class="t">' + shortMoney(max * g / 3) + '</text>'; }
    data.forEach(function (d, i) {
      var bh = Math.max(2, (H - pt - pb) * d.v / max), x = pl + i * bw + bw * 0.14, w = bw * 0.72;
      s += '<rect x="' + x.toFixed(1) + '" y="' + (H - pb - bh).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="' + Math.min(5, w / 2).toFixed(1) + '"' + (hlLast && i === n - 1 ? ' class="hl"' : '') + '><title>' + d.l + ': ' + fmt(d.v) + '</title></rect>';
      if (n <= 14 || i % Math.ceil(n / 8) === 0 || i === n - 1) s += '<text x="' + (x + w / 2).toFixed(1) + '" y="' + (H - 7) + '" class="t c">' + d.l + '</text>';
    });
    var top = data.reduce(function (a, b) { return b.v > a.v ? b : a; }, data[0]);
    return svgNode('<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none">' + s + '</svg>', 'sx-chart', 'Gráfico de barras de ventas. El mejor período fue ' + top.l + ' con ' + fmt(top.v) + '.');
  }
  function shortMoney(v) { return v >= 1e6 ? '$' + (v / 1e6).toFixed(1).replace('.', ',') + ' M' : v >= 1e3 ? '$' + Math.round(v / 1e3) + ' mil' : '$' + Math.round(v); }
  function donut(parts) {
    var tot = parts.reduce(function (s, p) { return s + p.v; }, 0) || 1, off = 0, s = '', R_ = 15.9155;
    parts.forEach(function (p, i) { var d = p.v / tot * 100; s += '<circle r="' + R_ + '" cx="21" cy="21" fill="none" stroke-width="5.5" class="d' + i + '" stroke-dasharray="' + Math.max(0, d - 0.8).toFixed(2) + ' ' + (100 - Math.max(0, d - 0.8)).toFixed(2) + '" stroke-dashoffset="' + (25 - off).toFixed(2) + '"><title>' + p.l + ': ' + fmt(p.v) + '</title></circle>'; off += d; });
    return svgNode('<svg viewBox="0 0 42 42">' + s + '</svg>', 'sx-donut', 'Ventas por categoría: ' + parts.map(function (p) { return p.l + ' ' + pct(p.v, tot) + '%'; }).join(', '));
  }
  function spark(vals) {
    var W = 100, H = 28, max = Math.max.apply(null, vals.concat([1])), pts = vals.map(function (v, i) { return (i / Math.max(1, vals.length - 1) * W).toFixed(1) + ',' + (H - 3 - (H - 6) * v / max).toFixed(1); }).join(' ');
    return svgNode('<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none"><polyline points="' + pts + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>', 'sx-spark', 'Tendencia');
  }
  function delta(a, b) { if (!b) return null; var d = Math.round((a - b) / b * 100); return h('span.sx-delta ' + (d >= 0 ? 'up' : 'dn'), (d >= 0 ? '+' : '') + d + '% vs. período anterior'); }
  function periodLabel(p) { return p === 1 ? 'hoy' : 'últimos ' + p + ' días'; }
  function periodSeg(cur, on) {
    var seg = h('div.sx-seg', { role: 'group', 'aria-label': 'Período' });
    [[1, 'Hoy'], [7, '7 días'], [30, '30 días'], [90, '90 días']].forEach(function (x) { seg.appendChild(h('button', { type: 'button', 'aria-pressed': cur === x[0] ? 'true' : 'false', 'data-fk': 'per' + x[0], on: { click: function () { on(x[0]); } } }, x[1])); });
    return seg;
  }
  function dayLabel(d) { var dt = dateAgo(d); return DIAS[dt.getDay()] + ' ' + dt.getDate(); }

  /* ---- Panel ---- */
  function vPanel(b) {
    var p = erp.period, cur = range(p, 0), prev = p <= 90 ? range(p, p) : null;
    b.appendChild(h('div.sx-vh-row', h('h3.sx-h3', 'Cómo viene ' + marca), periodSeg(p, function (x) { erp.period = x; drawErp(); })));
    var series = []; for (var d = Math.min(p === 1 ? 13 : p, 29); d >= 0; d--) series.push(dayRev(d));
    var k = h('div.sx-kpis');
    k.appendChild(h('div.sx-kcard', h('small', 'Ventas ' + periodLabel(p)), h('strong', fmt(cur.rev)), delta(cur.rev, prev && prev.rev), spark(series)));
    k.appendChild(h('div.sx-kcard', h('small', 'Ticket promedio'), h('strong', fmt(cur.rev / Math.max(1, cur.tickets))), h('span.sx-mut', cur.tickets + ' ventas'), prev ? delta(cur.rev / Math.max(1, cur.tickets), prev.rev / Math.max(1, prev.tickets)) : null));
    k.appendChild(seeCost() ? h('div.sx-kcard', h('small', 'Margen bruto'), h('strong', pct(cur.margin, cur.rev) + '%'), h('span.sx-mut', fmt(cur.margin) + ' de ganancia')) : lockedCard('Margen bruto'));
    k.appendChild(seeCost() ? h('div.sx-kcard', h('small', 'Stock inmovilizado'), h('strong', fmt(immobilized())), h('span.sx-mut', 'Sin ventas hace 30 días')) : lockedCard('Stock inmovilizado'));
    b.appendChild(k);
    var n = p === 90 ? 13 : p === 1 ? 14 : p, data = [];
    if (p === 90) for (var w = 12; w >= 0; w--) { var s = 0; for (var q = 0; q < 7; q++) s += dayRev(w * 7 + q); data.push({ l: 'S-' + w, v: s }); data[data.length - 1].l = w === 0 ? 'Esta sem.' : 'Hace ' + w + ' sem.'; }
    else for (var i = n - 1; i >= 0; i--) data.push({ l: p === 30 ? String(dateAgo(i).getDate()) : dayLabel(i), v: dayRev(i) });
    var cats = R.cats.map(function (c) { var v = 0; S.P.forEach(function (pp, ix) { if (pp.cat === c) for (var dd = 0; dd < p; dd++) v += S.hist[dd][ix] * pp.price; }); return { l: c, v: v }; });
    var tot = cats.reduce(function (s2, c) { return s2 + c.v; }, 0);
    var leg = h('ul.sx-leg2'); cats.forEach(function (c, i2) { leg.appendChild(h('li', h('i.c' + i2), h('span', c.l), h('b', pct(c.v, tot) + '%'), h('small', fmt(c.v)))); });
    b.appendChild(h('div.sx-grid2', h('div.sx-card', h('h4', 'Ventas por ' + (p === 90 ? 'semana' : 'día')), barChart(data, p === 1)), h('div.sx-card', h('h4', 'Ventas por categoría'), h('div.sx-donutw', donut(cats), leg))));
    /* alertas y top */
    var low = S.P.filter(isLow), ap = S.AP.filter(function (a) { return !a.paid && a.due <= 7; }), ords = S.orders.filter(function (o) { return o.state !== 'facturado'; });
    var al = h('ul.sx-alerts');
    low.slice(0, 4).forEach(function (pp) { al.appendChild(h('li.warn', ico('alert'), h('span', h('strong', pp.name), ' · quedan ' + availTot(pp) + ' (mínimo ' + pp.min + ')'), can('compras') ? btn('Reponer', function () { goto('erp', 'compras'); }, 'sx-chip') : null)); });
    if (can('cuentas') && ap.length) al.appendChild(h('li.bad', ico('clock'), h('span', h('strong', ap.length + (ap.length === 1 ? ' pago' : ' pagos') + ' a proveedores'), ' vencen en la semana'), btn('Ver', function () { goto('erp', 'cuentas'); }, 'sx-chip')));
    if (ords.length) al.appendChild(h('li', ico('truck'), h('span', h('strong', ords.length + (ords.length === 1 ? ' pedido' : ' pedidos') + ' online'), ' esperando facturar y despachar'), btn('Ver', function () { goto('erp', 'integraciones'); }, 'sx-chip')));
    if (!al.children.length) al.appendChild(h('li', ico('check'), h('span', 'Todo en orden por ahora.')));
    var u = unitsBy(p), top = S.P.map(function (pp, i3) { return { p: pp, u: u[i3] }; }).sort(function (a, c) { return c.u - a.u; }).slice(0, 5), tl = h('ol.sx-top');
    top.forEach(function (t) { tl.appendChild(h('li', swatch(t.p, 'xs'), h('span', t.p.name), h('b', t.u + ' u.'))); });
    b.appendChild(h('div.sx-grid2', h('div.sx-card', h('h4', 'Para atender hoy'), al), h('div.sx-card', h('h4', 'Lo que más se vende'), tl)));
  }
  function lockedCard(l) { return h('div.sx-kcard.locked', h('small', l), h('strong', ico('lock')), h('span.sx-mut', 'Visible solo para la dueña')); }

  /* ---- Inventario ---- */
  function vInventario(b) {
    var brs = erp.br === 'all' ? null : +erp.br;
    var lowN = S.P.filter(isLow).length, resN = S.P.reduce(function (s, p) { return s + resTot(p); }, 0);
    var tb = h('div.sx-invbar',
      field('Sucursal', h('select', { 'data-fk': 'ibr', on: { change: function (e) { erp.br = e.target.value; drawErp(); } } }, [h('option', { value: 'all', selected: erp.br === 'all' ? true : null }, 'Todas')].concat(BR.map(function (n, i) { return h('option', { value: i, selected: erp.br === String(i) ? true : null }, n); })))),
      h('label.sx-pos-search', h('span.sx-vh', 'Buscar'), ico('search'), h('input', { type: 'search', placeholder: 'Buscar producto o SKU', value: erp.q, 'data-fk': 'iq', on: { input: function (e) { erp.q = e.target.value; drawErp(); } } })),
      h('label.sx-chk', h('input', { type: 'checkbox', checked: erp.low ? true : null, 'data-fk': 'ilow', on: { change: function (e) { erp.low = e.target.checked; drawErp(); } } }), h('span', 'Solo bajo mínimo')));
    b.appendChild(tb);
    var kp = h('div.sx-kpis4.sm', kpi('Productos', String(S.P.length)), kpi('Bajo el mínimo', String(lowN)), kpi('Reservado para pedidos', String(resN)));
    if (seeCost()) kp.appendChild(kpi('Valorizado a costo', fmt(valuation())));
    b.appendChild(kp);
    var q = erp.q.trim().toLowerCase(), list = S.P.filter(function (p) { return (!erp.low || isLow(p)) && (!q || (p.name + ' ' + p.sku).toLowerCase().indexOf(q) > -1); });
    var t = h('table.sx-tbl'), th = h('tr', h('th', 'Producto'), h('th', 'Stock'), h('th', 'Mínimo'), h('th', 'Estado'));
    if (seeCost()) th.appendChild(h('th', 'Valor a costo'));
    th.appendChild(h('th', h('span.sx-vh', 'Acciones')));
    t.appendChild(h('thead', th));
    var tbd = h('tbody');
    list.forEach(function (p) {
      var st = brs == null ? availTot(p) : stockAt(p, brs) - p.vars.reduce(function (s, v) { return s + v.res[brs]; }, 0), low = isLow(p);
      var stTxt = brs == null ? p.vars.reduce(function (s, v) { return s; }, 0) : null;
      var open = !!erp.open[p.id];
      var tr = h('tr' + (low ? '.low' : ''),
        h('td', { 'data-l': 'Producto' }, h('div.sx-prod', swatch(p, 'xs'), h('div', h('strong', p.name), h('small', p.sku + ' · ' + p.cat)))),
        h('td', { 'data-l': 'Stock' }, h('div.sx-stk', h('b', String(st)), brs == null ? h('small', BR.map(function (n, i) { return stockAt(p, i); }).join(' · ') + ' (Centro · City Bell · Depósito)') : null, resTot(p) ? h('small', resTot(p) + ' reservadas') : null)),
        h('td', { 'data-l': 'Mínimo' }, String(p.min)),
        h('td', { 'data-l': 'Estado' }, st <= 0 ? badge('Agotado', 'bad') : low ? badge('Reponer', 'warn') : badge('Bien', 'ok')));
      if (seeCost()) tr.appendChild(h('td', { 'data-l': 'Valor' }, fmt(p.cost * stockTot(p))));
      var act = h('td.sx-acts', btn(open ? 'Ocultar' : p.vars.length + ' variantes', function () { erp.open[p.id] = !open; drawErp(); }, 'sx-chip', null, { 'aria-expanded': open ? 'true' : 'false', 'data-fk': 'ex' + p.id }));
      if (S.role === 'duena') act.appendChild(btn('Ajustar', function () { adjustModal(p); }, 'sx-chip', 'gear'));
      if (S.role !== 'contadora') act.appendChild(btn('Transferir', function () { transferModal(p); }, 'sx-chip', 'truck'));
      tr.appendChild(act); tbd.appendChild(tr);
      if (open) {
        var inner = h('div.sx-vgrid');
        p.vars.forEach(function (v) { inner.appendChild(h('div.sx-vcell', h('strong', v.n), h('span', BR.map(function (n, i) { return h('small', n + ': ' + v.st[i] + (v.res[i] ? ' (' + v.res[i] + ' res.)' : '')); })))); });
        tbd.appendChild(h('tr.sx-sub', h('td', { colspan: seeCost() ? '6' : '5' }, inner)));
      }
    });
    t.appendChild(tbd);
    b.appendChild(list.length ? h('div.sx-tw', t) : empty('Ningún producto coincide', 'Probá sacando el filtro.'));
    var kd = h('ul.sx-kard'); S.kardex.slice(0, 7).forEach(function (k2) { kd.appendChild(h('li', h('b' + (k2.q > 0 ? '.up' : '.dn'), (k2.q > 0 ? '+' : '') + k2.q), h('span', S.P[k2.pid].name + (S.P[k2.pid].vars.length > 1 ? ' (' + k2.vn + ')' : '')), h('small', k2.why + ' · ' + BR[k2.br] + ' · ' + hm(k2.ts)))); });
    b.appendChild(h('div.sx-card', h('h4', 'Últimos movimientos de stock'), kd));
  }
  function adjustModal(p) {
    var body = h('div'), m;
    var vs = h('select', { 'data-autofocus': '' }, p.vars.map(function (v, i) { return h('option', { value: i }, v.n); })), br = h('select', null, BR.map(function (n, i) { return h('option', { value: i }, n); })), dl = h('input', { type: 'number', value: '1', 'aria-describedby': 'sx-adj-h' }), why = h('select', null, ['Conteo de inventario', 'Rotura', 'Merma', 'Error de carga', 'Pérdida'].map(function (x) { return h('option', x); }));
    body.appendChild(h('p.sx-mut', { id: 'sx-adj-h' }, 'Poné un número positivo para sumar y negativo para restar. Queda registrado quién y por qué.'));
    body.appendChild(h('div.sx-row2', field('Variante', vs), field('Sucursal', br))); body.appendChild(h('div.sx-row2', field('Cantidad (+ / -)', dl), field('Motivo', why)));
    body.appendChild(btn('Guardar ajuste', function () { var d = Math.round(+dl.value); if (!d) { toast('Poné una cantidad distinta de cero.', 'warn'); return; } adjust(p, +vs.value, +br.value, d, why.value); m.close(); toast('Stock ajustado: ' + (d > 0 ? '+' : '') + d + ' (' + why.value + ').', 'ok'); }, 'sx-solid', 'check'));
    m = openModal('Ajustar stock · ' + p.name, body);
  }
  function transferModal(p) {
    var body = h('div'), m;
    var vs = h('select', { 'data-autofocus': '' }, p.vars.map(function (v, i) { return h('option', { value: i }, v.n); })), fr = h('select', null, BR.map(function (n, i) { return h('option', { value: i, selected: i === 2 ? true : null }, n); })), to = h('select', null, BR.map(function (n, i) { return h('option', { value: i, selected: i === 0 ? true : null }, n); })), q = h('input', { type: 'number', min: '1', value: '1' });
    body.appendChild(h('p.sx-mut', 'Mové mercadería entre sucursales y depósito. El stock de cada lugar se actualiza en el momento.'));
    body.appendChild(field('Variante', vs)); body.appendChild(h('div.sx-row2', field('Desde', fr), field('Hacia', to))); body.appendChild(field('Cantidad', q));
    body.appendChild(btn('Transferir', function () {
      if (fr.value === to.value) { toast('Elegí sucursales distintas.', 'warn'); return; }
      var done = transfer(p, +vs.value, +fr.value, +to.value, Math.max(1, Math.round(+q.value)));
      if (!done) { toast('No hay stock disponible en ' + BR[+fr.value] + ' para mover.', 'warn'); return; }
      m.close(); toast('Se movieron ' + done + ' de ' + BR[+fr.value] + ' a ' + BR[+to.value] + '.', 'ok');
    }, 'sx-solid', 'truck'));
    m = openModal('Transferir · ' + p.name, body);
  }

  /* ---- Compras ---- */
  function vCompras(b) {
    var sug = suggestPO();
    b.appendChild(h('p.sx-hint', 'El sistema mira qué está por debajo del mínimo y arma solo la orden para cada proveedor. Vos revisás las cantidades y listo.'));
    var wrap = h('div.sx-sugs');
    if (!sug.length) wrap.appendChild(h('div.sx-card', empty('Nada para reponer', 'Todo el stock está por encima del mínimo. Cuando algo baje, la orden aparece sola.')));
    sug.forEach(function (g) {
      var lines = g.lines.map(function (l) { return { pid: l.pid, vi: l.vi, q: l.q }; }), card = h('div.sx-card.sx-po'), totEl = h('strong', fmt(poTotal(lines)));
      var tb = h('table.sx-tbl.sm', h('thead', h('tr', h('th', 'Producto'), h('th', 'Cantidad'), h('th', 'Costo unit.'), h('th', 'Subtotal'))));
      var tbd = h('tbody');
      lines.forEach(function (l, i) {
        var p = S.P[l.pid], sub = h('td', { 'data-l': 'Subtotal' }, fmt(p.cost * l.q));
        tbd.appendChild(h('tr', h('td', { 'data-l': 'Producto' }, p.name + (p.vars.length > 1 ? ' (' + p.vars[l.vi].n + ')' : '')), h('td', { 'data-l': 'Cantidad' }, h('input', { type: 'number', min: '0', value: l.q, 'aria-label': 'Cantidad de ' + p.name, 'data-fk': 'po' + g.sup + '-' + i, on: { change: function (e) { l.q = Math.max(0, Math.round(+e.target.value || 0)); sub.textContent = fmt(p.cost * l.q); totEl.textContent = fmt(poTotal(lines)); } } })), h('td', { 'data-l': 'Costo unit.' }, fmt(p.cost)), sub));
      });
      tb.appendChild(tbd);
      card.appendChild(h('div.sx-po-h', h('div', h('small', 'Orden sugerida para'), h('h4', R.sup[g.sup])), badge('Sugerida', 'warn')));
      card.appendChild(h('div.sx-tw', tb));
      card.appendChild(h('div.sx-pay-end', h('div', h('small', 'Total de la orden'), totEl), btn('Crear orden de compra', function () { var po = createPO(g.sup, lines); if (po) toast('Orden ' + po.no + ' creada para ' + R.sup[g.sup] + '.', 'ok'); }, 'sx-solid', 'truck')));
      wrap.appendChild(card);
    });
    b.appendChild(wrap);
    var ul = h('ul.sx-pos-list');
    if (!S.po.length) ul.appendChild(h('li', h('span.sx-mut', 'Todavía no hay órdenes. Creá la primera desde las sugeridas.')));
    S.po.forEach(function (po) {
      ul.appendChild(h('li', h('div', h('strong', po.no + ' · ' + R.sup[po.sup]), h('small', po.lines.reduce(function (s, l) { return s + l.q; }, 0) + ' unidades · ' + fmt(po.total) + ' · ' + (po.status === 'Pendiente' ? 'creada ' + hm(po.ts) : 'recibida ' + hm(po.rts)))), badge(po.status, po.status === 'Recibida' ? 'ok' : 'warn'),
        po.status === 'Pendiente' ? btn('Recibir mercadería', function () { receivePO(po); toast('Mercadería recibida: el stock subió y quedó la cuenta a pagar a ' + R.sup[po.sup] + '.', 'ok'); }, 'sx-ghost sm', 'check') : null));
    });
    b.appendChild(h('div.sx-card', h('h4', 'Órdenes de compra'), ul));
  }

  /* ---- Facturación ---- */
  function vFacturacion(b) {
    b.appendChild(h('div.sx-vh-row', h('div', h('h3.sx-h3', 'Facturación'), h('p.sx-mut', 'Comprobantes ficticios de demostración, sin validez fiscal. En la versión real se conecta con ARCA (ex AFIP).')),
      field('Condición de la tienda', h('select', { 'data-fk': 'cond', on: { change: function (e) { S.cond = e.target.value; emit(); toast(S.cond === 'ri' ? 'Responsable Inscripto: factura A o B con IVA discriminado.' : 'Monotributo: factura C, sin IVA discriminado.', 'ok'); } } }, [['ri', 'Responsable Inscripto (A y B)'], ['mono', 'Monotributista (C)']].map(function (x) { return h('option', { value: x[0], selected: S.cond === x[0] ? true : null }, x[1]); })))));
    var pend = S.sales.filter(function (s) { return !s.inv && !s.void; }).slice(0, 8), ul = h('ul.sx-pos-list');
    if (!pend.length) ul.appendChild(h('li', h('span.sx-mut', 'No hay ventas sin facturar.')));
    pend.forEach(function (s) {
      var c = s.cust != null ? custById(s.cust) : null, tp = invType(s);
      ul.appendChild(h('li', h('div', h('strong', 'Venta 0001-' + pad(s.id, 8)), h('small', when(s.ago) + ' ' + hm(s.ts) + ' · ' + (c ? c.name : 'Consumidor final') + ' · ' + s.ch)), h('b', fmt(s.total)), btn('Facturar ' + tp, function () { var inv = issue(s, tp); emit(); toast('Factura ' + inv.tipo + ' ' + inv.no + ' emitida.', 'ok'); }, 'sx-ghost sm', 'file')));
    });
    b.appendChild(h('div.sx-card', h('h4', 'Ventas sin facturar'), ul));
    var t = h('table.sx-tbl', h('thead', h('tr', h('th', 'Tipo'), h('th', 'Número'), h('th', 'Fecha'), h('th', 'Cliente'), h('th', 'Total'), h('th', h('span.sx-vh', 'Ver'))))), tb = h('tbody');
    S.invoices.slice(0, 12).forEach(function (inv) {
      tb.appendChild(h('tr', h('td', { 'data-l': 'Tipo' }, badge('Factura ' + inv.tipo, inv.tipo === 'A' ? 'ok' : '')), h('td', { 'data-l': 'Número' }, inv.no), h('td', { 'data-l': 'Fecha' }, dmy(inv.ts)), h('td', { 'data-l': 'Cliente' }, inv.who), h('td', { 'data-l': 'Total' }, fmt(inv.total)), h('td.sx-acts', btn('Ver', function () { invoiceModal(inv); }, 'sx-chip', 'file'))));
    });
    t.appendChild(tb);
    b.appendChild(h('div.sx-card', h('h4', 'Comprobantes emitidos'), h('div.sx-tw', t)));
  }
  function invoiceModal(inv) {
    var sale = S.sales.filter(function (s) { return s.id === inv.sale; })[0], paper = h('div.sx-ticket.inv');
    paper.appendChild(h('div.sx-tk-h', h('strong', marca), h('small', 'Documento de demostración · sin validez fiscal')));
    paper.appendChild(h('div.sx-inv-t', h('b.sx-inv-l', inv.tipo), h('div', h('strong', 'FACTURA ' + inv.tipo), h('small', 'N° ' + inv.no), h('small', dmy(inv.ts)))));
    paper.appendChild(h('p.sx-tk-meta', 'Cliente: ' + inv.who));
    var it = h('div.sx-tk-items'); (sale ? sale.items : []).forEach(function (x) { it.appendChild(h('div', h('span', x.q + ' × ' + x.name), h('b', fmt(x.price * x.q - x.disc)))); }); paper.appendChild(it);
    var tt = h('dl.sx-tk-tot'); if (inv.tipo !== 'C') { tt.appendChild(row('Neto gravado', fmt(inv.total / 1.21))); tt.appendChild(row('IVA 21%', fmt(inv.total - inv.total / 1.21))); }
    tt.appendChild(row('TOTAL', fmt(inv.total), 'big')); paper.appendChild(tt);
    paper.appendChild(h('p.sx-tk-foot', 'CAE (ficticio): ' + inv.cae));
    openModal('Factura ' + inv.tipo + ' ' + inv.no, paper);
  }

  /* ---- Cuentas y proveedores ---- */
  function vCuentas(b) {
    var cobrado = range(30, 0).rev, aCobrar = S.arPend + S.sales.filter(function (s) { return s.live; }).reduce(function (a, s) { return a + s.pays.filter(function (p) { return p.m === 'tj' || p.m === 'qr'; }).reduce(function (x, p) { return x + p.amt; }, 0); }, 0);
    var aPagar = S.AP.filter(function (a) { return !a.paid; }).reduce(function (s, a) { return s + a.amt; }, 0), pagado = S.AP.filter(function (a) { return a.paid; }).reduce(function (s, a) { return s + a.amt; }, 0);
    b.appendChild(h('div.sx-kpis', kcard('Cobrado (30 días)', fmt(cobrado), 'ok'), kcard('A cobrar', fmt(aCobrar), '', 'Tarjetas y Mercado Pago por acreditar'), kcard('A pagar', fmt(aPagar), 'bad', 'A proveedores'), kcard('Pagado', fmt(pagado), '', 'Este mes')));
    var ul = h('ul.sx-pos-list');
    S.AP.slice().sort(function (a, c) { return (a.paid - c.paid) || (a.due - c.due); }).forEach(function (a) {
      ul.appendChild(h('li', h('div', h('strong', R.sup[a.sup]), h('small', a.concept)), h('b', fmt(a.amt)), a.paid ? badge('Pagada', 'ok') : badge(a.due < 0 ? 'Vencida hace ' + (-a.due) + ' d' : 'Vence en ' + a.due + ' d', a.due < 0 ? 'bad' : a.due <= 7 ? 'warn' : ''),
        a.paid || S.role === 'vendedora' ? null : btn('Marcar pagada', function () { a.paid = true; emit(); toast('Pago registrado a ' + R.sup[a.sup] + '.', 'ok'); }, 'sx-ghost sm', 'check')));
    });
    b.appendChild(h('div.sx-card', h('h4', 'Cuentas a pagar'), ul));
    var t = h('table.sx-tbl', h('thead', h('tr', h('th', 'Proveedor'), h('th', 'Contacto'), h('th', 'Plazo'), h('th', 'Productos'), h('th', 'Saldo')))), tb = h('tbody');
    R.sup.forEach(function (n, i) {
      var saldo = S.AP.filter(function (a) { return a.sup === i && !a.paid; }).reduce(function (s, a) { return s + a.amt; }, 0);
      tb.appendChild(h('tr', h('td', { 'data-l': 'Proveedor' }, h('strong', n)), h('td', { 'data-l': 'Contacto' }, 'ventas@' + n.toLowerCase().replace(/[^a-z]/g, '') + '.demo'), h('td', { 'data-l': 'Plazo' }, [15, 30, 7, 21][i % 4] + ' días'), h('td', { 'data-l': 'Productos' }, String(S.P.filter(function (p) { return p.sup === i; }).length)), h('td', { 'data-l': 'Saldo' }, saldo ? fmt(saldo) : 'Al día')));
    });
    t.appendChild(tb); b.appendChild(h('div.sx-card', h('h4', 'Proveedores'), h('div.sx-tw', t)));
  }
  function kcard(l, v, cls, sub) { return h('div.sx-kcard' + (cls ? '.' + cls : ''), h('small', l), h('strong', v), sub ? h('span.sx-mut', sub) : null); }

  /* ---- Reportes ---- */
  function reportRows() {
    var p = erp.repP, u = unitsBy(p), rows = S.P.map(function (pp, i) { return { p: pp, u: u[i], rev: u[i] * pp.price, cost: u[i] * pp.cost }; });
    if (erp.rep === 'top') { rows.sort(function (a, c) { return c.u - a.u; }); return { head: ['#', 'Producto', 'SKU', 'Unidades', 'Ventas'], rows: rows.map(function (r, i) { return [i + 1, r.p.name, r.p.sku, r.u, r.rev]; }) }; }
    if (erp.rep === 'margen') { rows.sort(function (a, c) { return (c.p.price - c.p.cost) / c.p.price - (a.p.price - a.p.cost) / a.p.price; }); return { head: ['Producto', 'Costo', 'Precio', 'Margen $', 'Margen %', 'Ganancia del período'], rows: rows.map(function (r) { return [r.p.name, r.p.cost, r.p.price, r.p.price - r.p.cost, Math.round((r.p.price - r.p.cost) / r.p.price * 100) + '%', r.rev - r.cost]; }) }; }
    rows.sort(function (a, c) { return c.rev - a.rev; });
    var tot = rows.reduce(function (s, r) { return s + r.rev; }, 0) || 1, acc = 0;
    return { head: ['Producto', 'Ventas', '% del total', '% acumulado', 'Clase'], rows: rows.map(function (r) { acc += r.rev; var a = acc / tot; return [r.p.name, r.rev, Math.round(r.rev / tot * 100) + '%', Math.round(a * 100) + '%', (acc - r.rev) / tot < 0.8 ? 'A' : (acc - r.rev) / tot < 0.95 ? 'B' : 'C']; }) };
  }
  function vReportes(b) {
    var rep = reportRows(), money = { top: [4], margen: [1, 2, 3, 5], abc: [1] }[erp.rep];
    var rs = h('div.sx-cats', { role: 'group', 'aria-label': 'Tipo de reporte' });
    [['top', 'Más vendidos'], ['margen', 'Margen por producto'], ['abc', 'Curva ABC']].forEach(function (x) { rs.appendChild(h('button.sx-chip', { type: 'button', 'aria-pressed': erp.rep === x[0] ? 'true' : 'false', on: { click: function () { erp.rep = x[0]; drawErp(); } } }, x[1])); });
    b.appendChild(h('div.sx-vh-row', rs, periodSeg(erp.repP, function (x) { erp.repP = x; drawErp(); })));
    b.appendChild(h('div.sx-vh-row', h('p.sx-hint', { style: 'margin:0' }, erp.rep === 'abc' ? 'Clase A: el 20% de productos que trae el 80% de las ventas. Esos nunca pueden faltar.' : erp.rep === 'margen' ? 'Qué producto te deja más por cada peso vendido, para decidir qué empujar.' : 'Lo que más sale en ' + periodLabel(erp.repP) + '.'),
      btn('Exportar CSV', function () { var out = [rep.head].concat(rep.rows); download('reporte-' + erp.rep + '-' + marca.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.csv', csv(out)); toast('Descargaste el reporte en CSV: se abre directo en Excel.', 'ok'); }, 'sx-solid', 'download')));
    var t = h('table.sx-tbl'); t.appendChild(h('thead', h('tr', rep.head.map(function (x) { return h('th', x); })))); var tb = h('tbody');
    rep.rows.forEach(function (r) { tb.appendChild(h('tr', r.map(function (c, i) { return h('td', { 'data-l': rep.head[i] }, erp.rep === 'abc' && i === 4 ? badge('Clase ' + c, c === 'A' ? 'ok' : c === 'B' ? 'warn' : '') : money.indexOf(i) > -1 ? fmt(c) : String(c)); }))); });
    t.appendChild(tb); b.appendChild(h('div.sx-tw', t));
  }

  /* ---- Canales ---- */
  function vCanales(b) {
    b.appendChild(h('p.sx-hint', 'Todos tus canales de venta cargan en el mismo stock. Un pedido entra, el sistema reserva la mercadería para que no la vendas dos veces y después se factura.'));
    var g = h('div.sx-chs');
    Object.keys(CH_ON).forEach(function (n) {
      g.appendChild(h('div.sx-ch' + (CH_ON[n] ? ' on' : ''), h('div', h('strong', n), h('small', CH_ON[n] ? 'Conectado · stock, precios y pedidos sincronizados' : 'Desconectado')),
        h('button.sx-toggle', { type: 'button', role: 'switch', 'aria-checked': CH_ON[n] ? 'true' : 'false', 'aria-label': n, on: { click: function () { CH_ON[n] = !CH_ON[n]; drawErp(); } } }, h('i'))));
    });
    b.appendChild(g);
    b.appendChild(h('div.sx-vh-row', h('h4.sx-h3', 'Pedidos de los canales'), btn('Simular pedido entrante', newOrder, 'sx-solid', 'plus')));
    var ul = h('ul.sx-orders');
    if (!S.orders.length) ul.appendChild(h('li', h('span.sx-mut', 'Todavía no entró ningún pedido.')));
    S.orders.forEach(function (o) {
      var c = custById(o.cust), p = S.P[o.lines[0].pid], st = ['nuevo', 'reservado', 'facturado'].indexOf(o.state);
      var steps = h('ol.sx-steps', ['Pedido recibido', 'Stock reservado', 'Facturado y despachado'].map(function (x, i) { return h('li' + (i <= st ? '.done' : ''), h('i', i <= st ? ico('check') : null), x); }));
      ul.appendChild(h('li', h('div.sx-o-h', h('strong', '#' + o.n + ' · ' + o.ch), h('span', (c ? c.name : '') + ' · ' + p.name + (p.vars.length > 1 ? ' (' + p.vars[o.lines[0].vi].n + ')' : '') + ' · ' + fmt(o.total))), steps,
        o.state !== 'facturado' ? btn('Facturar y despachar', function () { shipOrder(o); }, 'sx-ghost sm', 'file', { disabled: S.role === 'contadora' || S.role === 'duena' || S.role === 'vendedora' ? null : true }) : badge('Listo', 'ok')));
    });
    b.appendChild(ul);
  }
  var orderN = 4021;
  function newOrder() {
    var on = Object.keys(CH_ON).filter(function (k) { return CH_ON[k]; });
    if (!on.length) { toast('Conectá al menos un canal.', 'warn'); return; }
    var pool = S.P.filter(function (p) { return availTot(p) > 0; });
    if (!pool.length) { toast('No hay stock para reservar.', 'warn'); return; }
    var p = pool[Math.floor(Math.random() * pool.length)], best = null;
    p.vars.forEach(function (v, vi) { for (var br = 0; br < 3; br++) if (availV(v, br) > 0 && (!best || availV(v, br) > availV(p.vars[best.vi], best.br))) best = { vi: vi, br: br }; });
    p.vars[best.vi].res[best.br]++;
    var c = S.C[Math.floor(Math.random() * (S.C.length - 1))];
    S.orders.unshift({ id: nid(), ch: on[Math.floor(Math.random() * on.length)], cust: c.id, lines: [{ pid: p.id, vi: best.vi, q: 1 }], state: 'reservado', br: best.br, total: p.price, n: ++orderN });
    toast('Entró un pedido de ' + c.name.split(' ')[0] + ': el stock de ' + p.name + ' quedó reservado.', 'ok'); emit();
  }
  function shipOrder(o) {
    var l = o.lines[0], v = S.P[l.pid].vars[l.vi]; v.res[o.br] = Math.max(0, v.res[o.br] - l.q);
    var sale = sell({ lines: [{ pid: l.pid, vi: l.vi, q: l.q }], cust: o.cust, seller: 0, branch: o.br, ch: o.ch, pays: [{ m: 'qr', amt: o.total }] });
    var inv = issue(sale); o.state = 'facturado'; emit(); toast('Pedido #' + o.n + ' facturado (' + inv.tipo + ' ' + inv.no + '), stock descontado y clienta actualizada.', 'ok');
  }

  /* ---- shell del ERP ---- */
  function drawErp() {
    if (!can(erp.view)) { erp.view = ERP_TABS.filter(function (t) { return can(t[0]); })[0][0]; buildNav(); }
    redraw(erp.box, function (b) { ({ panel: vPanel, inventario: vInventario, compras: vCompras, facturacion: vFacturacion, cuentas: vCuentas, reportes: vReportes, integraciones: vCanales })[erp.view](b); });
    erp.box.setAttribute('aria-labelledby', 'sx-et-' + rk + '-' + erp.view);
  }
  function buildNav() {
    var nav = tabsBar(ERP_TABS.map(function (t) { return { k: t[0], label: t[1], icon: t[2], locked: !can(t[0]) }; }), erp.view, function (k) { erp.view = k; erp.nav.sel(k); drawErp(); }, { label: 'Secciones de gestión', id: 'sx-et-' + rk, cls: 'sub', panel: 'sx-erp-box-' + rk });
    if (erp.nav && erp.nav.parentNode) erp.nav.parentNode.replaceChild(nav, erp.nav);
    erp.nav = nav;
  }
  mods.erp = {
    dirty: true,
    build: function () {
      var el = h('div.sx-erp');
      var rb = h('div.sx-rolebar'), seg = h('div.sx-seg', { role: 'group', 'aria-label': 'Ver como' });
      [['duena', 'Dueña'], ['vendedora', 'Vendedora'], ['contadora', 'Contadora']].forEach(function (r) {
        seg.appendChild(h('button', { type: 'button', 'aria-pressed': S.role === r[0] ? 'true' : 'false', 'data-role': r[0], on: { click: function () {
          S.role = r[0]; [].forEach.call(seg.children, function (x) { x.setAttribute('aria-pressed', x === this ? 'true' : 'false'); }, this);
          roleTxt.textContent = ROLE_TXT[S.role]; buildNav(); emit(); toast('Ahora ves la gestión como ' + roleName().toLowerCase() + '.', 'ok');
        } } }, r[1]));
      });
      var roleTxt = h('p.sx-mut', { 'aria-live': 'polite' }, ROLE_TXT[S.role]);
      rb.appendChild(h('div.sx-rb-l', h('strong', 'Ver como'), seg)); rb.appendChild(roleTxt);
      erp.nav = h('div'); el.appendChild(rb); el.appendChild(erp.nav);
      erp.box = h('div.sx-view', { id: 'sx-erp-box-' + rk, role: 'tabpanel' }); el.appendChild(erp.box);
      buildNav(); this.el = el;
    },
    refresh: function () { this.dirty = false; drawErp(); },
    getView: function () { return erp.view; },
    setView: function (v) { if (!can(v)) return; erp.view = v; erp.nav.sel(v); drawErp(); }
  };

  /* =====================================================================
     TODO CONECTADO (la demo estrella)
     ===================================================================== */
  var flow = { running: false, step: -1, ctx: null, el: null, nodes: [], tiles: {}, stage: null, log: null, after: null, btn: null, status: null, done: false };
  var FSTEPS = [['Pedido', 'shop'], ['Caja', 'cart'], ['Stock', 'box'], ['Clienta', 'user'], ['Reporte', 'chart']];
  function metrics() {
    var units = 0; S.P.forEach(function (p) { units += availTot(p); });
    var cs = {}; S.C.forEach(function (c) { if (c.purch.some(function (x) { return x.ago === 0 && x.total > 0; })) cs[c.id] = 1; });
    var td = range(1, 0);
    return { units: units, low: S.P.filter(isLow).length, cust: Object.keys(cs).length, rev: td.rev, tick: td.rev / Math.max(1, td.tickets), n: td.tickets, margin: td.margin };
  }
  function countUp(el, from, to, f, ms) {
    if (REDUCED || FAST || from === to) { el.textContent = f(to); return; }
    var t0 = null;
    function tick(t) { if (t0 === null) t0 = t; var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3); el.textContent = f(from + (to - from) * e); if (k < 1) requestAnimationFrame(tick); else el.textContent = f(to); }
    requestAnimationFrame(tick);
  }
  function ba(label, a, b2) { return h('div.sx-ba', h('small', label), h('span', h('s', String(a)), ico('arrow'), h('strong', String(b2)))); }
  function tileOf(k, label, val, f) { var v = h('strong', f(val)); flow.tiles[k] = { el: v, val: val, f: f }; return h('div.sx-tile2', h('small', label), v); }
  function setTile(k, to) { var t = flow.tiles[k]; if (!t) return; var el = t.el.parentNode; countUp(t.el, t.val, to, t.f, 900); t.val = to; if (el) { el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); } }
  function setNode(i, state) { if (flow.nodes[i]) flow.nodes[i].setAttribute('data-state', state); }
  function showStage(i, title, text, rows, extra) {
    redraw(flow.stage, function (s) {
      s.appendChild(h('div.sx-st-h', h('b', String(i + 1)), h('div', h('small', 'Paso ' + (i + 1) + ' de 5 · ' + FSTEPS[i][0]), h('h4', title))));
      s.appendChild(h('p', text));
      if (rows && rows.length) s.appendChild(h('div.sx-bas', rows));
      if (extra) s.appendChild(extra);
    });
    flow.log.appendChild(h('li', h('b', FSTEPS[i][0]), h('span', title)));
    flow.status.textContent = 'Paso ' + (i + 1) + ': ' + title;
  }
  function pickCtx() {
    var cands = S.C.filter(function (c) { return !c.ri; });
    var c = cands[Math.floor(Math.random() * cands.length)];
    var ps = S.P.filter(function (p) { return p.vars.some(function (v) { return availV(v, 0) > 0; }); });
    var near = ps.filter(function (p) { var d = availTot(p) - p.min; return d >= 1 && d <= 1; });
    var p = (near.length ? near : ps)[Math.floor(Math.random() * (near.length ? near.length : ps.length))];
    var vis = p.vars.map(function (v, i) { return i; }).filter(function (i) { return availV(p.vars[i], 0) > 0; });
    return { c: c, p: p, vi: vis[Math.floor(Math.random() * vis.length)], ch: ['Instagram', 'Tienda online', 'WhatsApp'][Math.floor(Math.random() * 3)] };
  }
  async function runFlow() {
    if (flow.running) return;
    if (!S.caja.open) { S.caja = { open: true, opening: 20000, sess: S.caja.sess + 1, moves: [], closed: S.caja.closed }; toast('Abrimos la caja para la simulación.', 'ok'); }
    flow.running = true; flow.done = false; flow.btn.disabled = true; flow.btn.querySelector('span').textContent = 'Simulando…';
    cleanEl(flow.log); cleanEl(flow.after); flow.nodes.forEach(function (n, i) { setNode(i, 'idle'); });
    var cx = pickCtx(), c = cx.c, p = cx.p, v = p.vars[cx.vi], first = c.name.split(' ')[0];
    var b0 = metrics(), stB = availTot(p), ltvB = ltv(c), lastB = lastAgo(c);
    var vname = p.vars.length > 1 ? ' (' + v.n + ')' : '';
    /* 1 pedido */
    setNode(0, 'active');
    showStage(0, first + ' pide por ' + cx.ch, first + ' escribió por ' + cx.ch + ' y pidió ' + p.name + vname + '. El pedido entra solo al sistema: nadie tiene que copiarlo de un chat a un cuaderno.', [ba('Producto', 'Consulta', p.name + vname), ba('Importe', '-', fmt(p.price))]);
    await sleep(1500); setNode(0, 'done');
    /* 2 caja */
    setNode(1, 'active');
    var sale = sell({ lines: [{ pid: p.id, vi: cx.vi, q: 1 }], cust: c.id, seller: 0, branch: 0, ch: cx.ch, pays: [{ m: 'qr', amt: p.price }] });
    var inv = issue(sale);
    var aft = metrics();
    showStage(1, 'Se cobra con Mercado Pago', 'La caja cobra ' + fmt(sale.total) + ' con QR y emite el comprobante ' + inv.tipo + ' ' + inv.no + ' (ficticio). Entra al arqueo del día automáticamente.', [ba('Cobrado', '$ 0', fmt(sale.total)), ba('Comprobante', 'Sin emitir', 'Factura ' + inv.tipo)]);
    await sleep(1500); setNode(1, 'done');
    /* 3 stock */
    setNode(2, 'active');
    var stA = availTot(p), alert3 = isLow(p), sug = null;
    if (alert3) { sug = suggestPO().filter(function (g) { return g.sup === p.sup; })[0]; }
    var extra = null;
    if (alert3 && sug) {
      var qty = sug.lines.reduce(function (s, l) { return s + l.q; }, 0);
      extra = h('div.sx-alertbox', ico('alert'), h('div', h('strong', 'Stock en el mínimo'), h('p', 'Quedan ' + stA + ' de ' + p.name + ' (mínimo ' + p.min + '). Te sugerimos pedir ' + qty + ' a ' + R.sup[p.sup] + '.')),
        btn('Generar orden de compra', function (e) { var po = createPO(sug.sup, sug.lines); if (po) { toast('Orden ' + po.no + ' creada. Está en Gestión > Compras para recibirla.', 'ok'); e.currentTarget.disabled = true; e.currentTarget.querySelector('span').textContent = 'Orden creada: ' + po.no; } }, 'sx-solid sm', 'truck'));
    }
    showStage(2, alert3 ? 'El stock baja y salta la alerta' : 'El stock se descuenta solo', 'Se vendió 1 unidad' + vname + ': el stock se actualiza en el local, en Instagram y en la tienda online a la vez. Nadie vuelve a vender algo que no tiene.', [ba('Stock de ' + p.name, stB + ' u.', stA + ' u.'), ba('Estado', stB > p.min ? 'Bien' : 'Reponer', alert3 ? 'Reponer' : 'Bien')], extra);
    setTile('units', aft.units); setTile('low', aft.low);
    await sleep(1700); setNode(2, 'done');
    /* 4 clienta */
    setNode(3, 'active');
    var rows4 = [ba('Valor de vida de ' + first, fmt(ltvB), fmt(ltv(c))), ba('Última compra', lastB < 9999 ? when(lastB) : 'Nunca', 'Hoy'), ba('Consulta en el pipeline', 'Abierta', 'Vendida')];
    if (sale.autoTask) rows4.push(ba('Postventa automática', 'Sin programar', 'Reseña en 3 días'));
    showStage(3, 'La ficha de ' + first + ' se actualiza', 'La compra se suma al historial de ' + c.name + ', su consulta pasa a "Vendida"' + (sale.autoTask ? ' y se programa solo el pedido de reseña por WhatsApp.' : '.'), rows4);
    setTile('cust', aft.cust);
    await sleep(1700); setNode(3, 'done');
    /* 5 reporte */
    setNode(4, 'active');
    var a2 = metrics(), mg = sale.total - sale.cost;
    showStage(4, 'Tus números se mueven en vivo', 'El panel ya cuenta esta venta: ventas del día, ticket promedio y margen. Sin planillas, sin cargar nada a mano.', [ba('Ventas de hoy', fmt(b0.rev), fmt(a2.rev)), ba('Ticket promedio', fmt(b0.tick), fmt(a2.tick)), ba('Ganancia de esta venta', '-', fmt(mg) + ' (' + pct(mg, sale.total) + '%)')]);
    setTile('rev', a2.rev);
    await sleep(1400); setNode(4, 'done');
    /* cierre */
    flow.after.appendChild(h('p.sx-after-t', h('strong', 'Listo: una sola venta, cinco lugares actualizados.'), ' Mirá dónde quedó cada cosa:'));
    flow.after.appendChild(h('div.sx-after',
      btn('Stock en Gestión', function () { erp.view = 'inventario'; erp.q = p.name; erp.low = false; goto('erp', 'inventario'); }, 'sx-ghost', 'box'),
      btn('Ficha de ' + first, function () { crm.view = 'clientas'; crm.seg = 'todas'; crm.q = ''; crm.sel = c.id; goto('crm', 'clientas'); }, 'sx-ghost', 'user'),
      btn('Panel de ventas', function () { erp.period = 1; goto('erp', 'panel'); }, 'sx-ghost', 'chart'),
      btn('Cierre de caja', function () { goto('caja'); setTimeout(openClose, 60); }, 'sx-ghost', 'lock')));
    flow.running = false; flow.done = true; flow.btn.disabled = false; flow.btn.querySelector('span').textContent = 'Simular otra venta';
    flow.status.textContent = 'Simulación terminada.';
    emit();
  }
  function drawFlowTiles() {
    var m = metrics(); flow.tiles = {};
    cleanEl(flow.tilesBox);
    flow.tilesBox.appendChild(tileOf('units', 'Unidades en stock', m.units, num));
    flow.tilesBox.appendChild(tileOf('low', 'Productos bajo el mínimo', m.low, String));
    flow.tilesBox.appendChild(tileOf('cust', 'Clientas que compraron hoy', m.cust, String));
    flow.tilesBox.appendChild(tileOf('rev', 'Ventas de hoy', m.rev, fmt));
  }
  mods.flujo = {
    dirty: true,
    build: function () {
      var el = h('div.sx-flow');
      el.appendChild(h('div.sx-flow-h', h('h3', 'Una venta, y todo se entera'), h('p', 'Este es el corazón del sistema: una sola fuente de información. Apretá el botón y mirá cómo un pedido recorre la caja, el stock, la clienta y los reportes. Nadie carga nada dos veces.')));
      var nodes = h('ol.sx-nodes', { 'aria-label': 'Recorrido de una venta' });
      FSTEPS.forEach(function (s, i) { var li = h('li.sx-node', { 'data-state': 'idle' }, h('i', ico(s[1])), h('span', s[0])); flow.nodes[i] = li; nodes.appendChild(li); });
      flow.btn = btn('Simular una venta', runFlow, 'sx-solid big', 'play');
      flow.status = h('p.sx-vh', { role: 'status', 'aria-live': 'polite' });
      flow.stage = h('div.sx-stage', { 'aria-label': 'Detalle del paso' });
      flow.stage.appendChild(h('div.sx-stage-idle', ico('spark'), h('p', 'Apretá "Simular una venta" y seguí el recorrido paso a paso. Después andá a Caja, Clientas o Gestión: vas a ver los cambios en cada lugar.')));
      flow.tilesBox = h('div.sx-tiles2');
      flow.log = h('ol.sx-flog', { 'aria-label': 'Registro de lo que pasó' });
      flow.after = h('div.sx-afterw');
      el.appendChild(nodes); el.appendChild(h('div.sx-flow-c', flow.btn, flow.status));
      el.appendChild(h('div.sx-flow-g', flow.stage, h('div', flow.tilesBox, flow.log)));
      el.appendChild(flow.after);
      this.el = el; drawFlowTiles();
    },
    refresh: function () { this.dirty = false; if (flow.running) return; drawFlowTiles(); }
  };

  /* =====================================================================
     Armado de la sección
     ===================================================================== */
  var SOLVE = [
    ['Stock descuadrado', 'Cada venta (local, Instagram o tienda online) descuenta de un único stock. Alertas de mínimo y orden de compra armada sola.', 'Inventario en vivo', 'erp', 'inventario', 'box'],
    ['Ventas perdidas por WhatsApp', 'Cada consulta es una tarjeta en un tablero: cotizada, reservada, vendida. Con recordatorios para que ninguna se enfríe.', 'Tablero de consultas', 'crm', 'pipeline', 'chat'],
    ['Caja desordenada', 'Apertura y cierre con arqueo, pagos divididos, devoluciones y comprobantes. Al final del día cierra al peso.', 'Caja con arqueo', 'caja', null, 'cart'],
    ['Clientas que no vuelven', 'Segmentos (nuevas, VIP, inactivas), campañas de WhatsApp y automatizaciones de cumpleaños y postventa.', 'Campañas y seguimiento', 'crm', 'campanas', 'spark'],
    ['No saber qué vendés ni cuánto ganás', 'Panel con ventas, margen y stock parado. Reportes de más vendidos y curva ABC que se bajan a Excel.', 'Panel de números', 'erp', 'panel', 'chart'],
    ['Facturas, proveedores y papeles', 'Comprobantes A, B o C, cuentas a pagar, proveedores y permisos distintos para dueña, vendedora y contadora.', 'Facturación y cuentas', 'erp', 'facturacion', 'file']
  ];
  function assemble() {
    var CSS_URL = '/_comun/sistemas.css'; try { if (SCRIPT && SCRIPT.src) CSS_URL = SCRIPT.src.replace(/[^\/?#]*([?#].*)?$/, '') + 'sistemas.css'; } catch (e) {}
    var MOB = window.__SX_MOBILE != null ? !!window.__SX_MOBILE : !!(window.matchMedia && window.matchMedia('(max-width:700px)').matches);
    var page = MOB ? h('div.sx.sx-page') : root;
    if (MOB) root.classList.add('sx-m');
    function mountCss(into, el) {
      var l = h('link', { rel: 'stylesheet', href: CSS_URL });
      into.appendChild(l); into.appendChild(el);
      var shown = function () { el.style.visibility = ''; };
      if (!FAST) { el.style.visibility = 'hidden'; l.addEventListener('load', shown); l.addEventListener('error', shown); setTimeout(shown, 2500); }
    }
    mountCss(sh, page);
    host.setAttribute('data-sx-ready', '1');
    if (!host.hasAttribute('aria-label') && !host.hasAttribute('aria-labelledby')) host.setAttribute('aria-label', 'Sumale a tu tienda: demo de caja, clientas y gestión');
    var ac = ''; try { ac = (host.style.getPropertyValue('--sx-accent') || getComputedStyle(host).getPropertyValue('--sx-accent') || '').trim(); } catch (e) {}
    root.style.setProperty('--sx-on', onColor(ac || '#a8613f')); page.style.setProperty('--sx-on', onColor(ac || '#a8613f'));
    var wrap = h('div.sx-wrap');
    var chips = h('ul.sx-probs'); R.problems.forEach(function (t, i) { chips.appendChild(h('li', h('span.sx-pn', pad(i + 1, 2)), h('p', t))); });
    wrap.appendChild(h('header.sx-head',
      h('div.sx-eyebrow', h('span', 'Sumale a tu tienda'), h('em', 'Opcional · se activa solo si lo querés')),
      h('h2', { id: 'sx-h-' + rk }, 'Tu tienda, tu caja, tus clientas y tu gestión en un solo lugar'),
      h('p.sx-lead', 'Probalo vos: es una tienda de ejemplo (' + marca + ') y cada botón funciona de verdad.'),
      chips));
    var tabs = [['caja', 'Caja', 'POS', 'cart'], ['crm', 'Clientas', 'CRM', 'user'], ['erp', 'Gestión', 'ERP', 'chart'], ['flujo', MOB ? 'Conectado' : 'Todo conectado', '', 'link']];
    var TITLES = { caja: 'Caja · POS', crm: 'Clientas · CRM', erp: 'Gestión · ERP', flujo: 'Todo conectado' };
    var bar = tabsBar(tabs.map(function (t) { return { k: t[0], label: t[1], sub: t[2], icon: t[3], controls: 'sx-p-' + t[0] + '-' + rk }; }), S.tab, function (k) { selectTab(k); }, { label: 'Módulos del sistema', id: 'sx-mt-' + rk, cls: 'main', panel: null });
    var reset = btn('Reiniciar', function () { var was = fsOpen; if (host.__sxOff) host.__sxOff(); create(host, cfg); if (was && host.__sxFs) host.__sxFs.open(); }, 'sx-ghost sm sx-reset', 'undo', { title: 'Vuelve la demo al estado inicial', 'aria-label': 'Reiniciar datos de ejemplo' });
    var closeBtn = MOB ? h('button.sx-btn.sx-ghost.sx-icn.sx-close', { type: 'button', 'aria-label': 'Cerrar y volver a la página', on: { click: function () { closeFs(); } } }, ico('x')) : null;
    var body = h('div.sx-body');
    var panels = {};
    tabs.forEach(function (t) { panels[t[0]] = h('div.sx-panel', { id: 'sx-p-' + t[0] + '-' + rk, role: 'tabpanel', 'aria-labelledby': 'sx-mt-' + rk + '-' + t[0], hidden: t[0] === S.tab ? null : true }); body.appendChild(panels[t[0]]); });
    var title = h('strong.sx-wt', TITLES[S.tab]);
    var sub = h('nav.sx-subnav', { 'aria-label': 'Pantallas del módulo' });
    var sig = '';
    function subItems(k) {
      if (k === 'caja') return [
        { k: 'venta', label: 'Venta', icon: 'cart', on: true, run: function () { var i = root.querySelector('.sx-pos-search input'); if (i) i.focus(); } },
        S.caja.open ? { k: 'dev', label: 'Devoluciones', icon: 'undo', run: function () { mods.caja.openReturn(); } } : { k: 'abrir', label: 'Abrir caja', icon: 'cash', run: function () { mods.caja.openOpen(); } },
        S.caja.open ? { k: 'cierre', label: 'Cierre de caja', icon: 'lock', run: function () { mods.caja.openClose(); } } : null
      ].filter(Boolean);
      if (k === 'crm') return [['clientas', 'Clientas', 'user'], ['pipeline', 'Pipeline', 'chat'], ['tareas', 'Tareas', 'clock'], ['campanas', 'Campañas', 'spark'], ['automat', 'Automatizaciones', 'zap'], ['opiniones', 'Opiniones', 'star']].map(function (x) { return { k: x[0], label: x[1], icon: x[2], on: mods.crm.getView() === x[0], run: function () { mods.crm.setView(x[0]); } }; });
      if (k === 'erp') return [['panel', 'Panel', 'chart'], ['inventario', 'Inventario', 'box'], ['compras', 'Compras', 'truck'], ['facturacion', 'Facturas', 'file'], ['cuentas', 'Cuentas', 'bank'], ['reportes', 'Reportes', 'download'], ['integraciones', 'Canales', 'link']].map(function (x) { return { k: x[0], label: x[1], icon: x[2], locked: !can(x[0]), on: mods.erp.getView() === x[0], run: function () { if (!can(x[0])) { toast('Con el rol "' + roleName() + '" esta sección está bloqueada.', 'warn'); return; } mods.erp.setView(x[0]); } }; }).concat([{ k: 'roles', label: 'Roles', icon: 'lock', run: function () { selectTab('erp'); var r = root.querySelector('.sx-rolebar'); scrollInBody(r); var b = r && r.querySelector('button'); if (b) b.focus(); } }]);
      return [];
    }
    function drawSide(force) {
      var k = S.tab, v = k === 'crm' ? mods.crm.getView() : k === 'erp' ? mods.erp.getView() : '';
      var sg = [k, v, S.role, S.caja.open].join('|'); if (sg === sig && !force) return; sig = sg;
      title.textContent = TITLES[k];
      cleanEl(sub);
      var it = subItems(k); if (!it.length) return;
      sub.appendChild(h('small', 'Pantallas'));
      it.forEach(function (x) { sub.appendChild(h('button.sx-sbtn', { type: 'button', 'aria-current': x.on ? 'page' : null, 'aria-disabled': x.locked ? 'true' : null, on: { click: function () { x.run(); drawSide(true); } } }, ico(x.locked ? 'lock' : x.icon), h('span', x.label))); });
    }
    var winEl = h('div.sx-win', h('div.sx-app', MOB ? { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Sistema de ejemplo: caja, clientas y gestión' } : null,
      h('aside.sx-side', h('div.sx-brand', h('i'), h('span', marca)), bar, sub),
      h('div.sx-apptop', h('span.sx-dots', { 'aria-hidden': 'true' }, h('i'), h('i'), h('i')), title, h('span.sx-demo', 'Datos de ejemplo'), reset, closeBtn),
      body, live));
    selectTab = function (k) {
      if (!mods[k]) return;
      S.tab = k; bar.sel(k);
      Object.keys(panels).forEach(function (x) { if (x === k) panels[x].removeAttribute('hidden'); else panels[x].setAttribute('hidden', ''); });
      if (!mods[k].el) { mods[k].build(); panels[k].appendChild(mods[k].el); mods[k].dirty = true; }
      if (mods[k].dirty) mods[k].refresh();
      body.scrollTop = 0; drawSide(true);
    };
    S.onView = function () { drawSide(); };
    /* qué resolvemos */
    var grid = h('div.sx-solves'), solvesEl;
    SOLVE.forEach(function (s) {
      grid.appendChild(h('article.sx-solve', h('i', ico(s[5])), h('div', h('h4', s[0]), h('p', s[1]), btn('Probar: ' + s[2], function () { goto(s[3], s[4]); }, 'sx-chip', 'arrow'))));
    });
    wrap.appendChild(solvesEl = h('section.sx-solves-w', { 'aria-labelledby': 'sx-solve-h-' + rk }, h('div.sx-solves-h', h('h3', { id: 'sx-solve-h-' + rk }, 'Qué problemas resolvemos')), grid,
      h('div.sx-cta', h('div', h('h3', '¿Cuál de estos te quita el sueño?'), h('p', 'Contanos qué te complica y te mostramos cómo se resuelve.')), h('a.sx-btn.sx-solid.big', { href: '#contacto' }, h('span', 'Contanos qué te complica'), ico('arrow')))));
    /* ---- pantalla completa en celular ---- */
    var fsOpen = false, fsHost = null, fsPrev = null, pushed = false, lockSaved = null, entryBtn = null;
    function onPop() { if (fsOpen) { pushed = false; closeFs(true); } }
    function onEsc(e) { if (fsOpen && e.key === 'Escape' && !modalOpen()) { e.preventDefault(); closeFs(); } }
    function openFs() {
      if (fsOpen) return; fsOpen = true; fsPrev = entryBtn || sh.activeElement;
      fsHost = doc.createElement('div'); fsHost.setAttribute('data-sx-fs', ''); fsHost.setAttribute('style', (host.getAttribute('style') || '') + ';position:fixed;inset:0;z-index:2147483600;display:block;height:100%;');
      var fsh = fsHost.attachShadow({ mode: 'open' }); mountCss(fsh, root);
      doc.body.appendChild(fsHost);
      lockSaved = [doc.documentElement.style.overflow, doc.body.style.overflow]; doc.documentElement.style.overflow = 'hidden'; doc.body.style.overflow = 'hidden';
      try { history.pushState({ sx: 1 }, ''); pushed = true; } catch (e) {}
      window.addEventListener('popstate', onPop); doc.addEventListener('keydown', onEsc);
      var t = root.querySelector('.sx-tab[aria-selected=true]'); if (t) t.focus();
    }
    function closeFs(fromPop) {
      if (!fsOpen) return; fsOpen = false;
      window.removeEventListener('popstate', onPop); doc.removeEventListener('keydown', onEsc);
      if (fsHost && fsHost.parentNode) fsHost.parentNode.removeChild(fsHost); fsHost = null;
      if (lockSaved) { doc.documentElement.style.overflow = lockSaved[0]; doc.body.style.overflow = lockSaved[1]; lockSaved = null; }
      if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
      var p = fsPrev; fsPrev = null; if (p && p.focus) { try { p.focus(); } catch (e) {} }
    }
    host.__sxFs = { open: openFs, close: closeFs, isOpen: function () { return fsOpen; } };
    if (MOB) S.openFs = openFs;
    var mq = window.matchMedia && window.__SX_MOBILE == null ? window.matchMedia('(max-width:700px)') : null;
    if (mq && mq.addEventListener) { var onMq = function () { if (mq.matches !== MOB) { host.__sxOff(); create(host, cfg); } }; mq.addEventListener('change', onMq); host.__sxMq = function () { mq.removeEventListener('change', onMq); }; }
    if (!MOB) { wrap.insertBefore(winEl, solvesEl); root.appendChild(wrap); }
    else {
      root.appendChild(winEl);
      entryBtn = btn('Explorar el sistema', function () { openFs(); }, 'sx-solid big sx-explore', 'arrow');
      var entry = h('div.sx-entry', h('div.sx-ent-ico', ico('phone')), h('h3', 'Probalo en tu celular'), h('p', 'Caja, clientas y gestión de ' + marca + ' en pantalla completa. Tocá, cobrá, mové consultas: todo funciona.'), entryBtn,
        h('ul.sx-ent-mods', ['Caja', 'Clientas', 'Gestión', 'Todo conectado'].map(function (x) { return h('li', x); })), h('small', 'Datos de ejemplo · se cierra con la X o el botón atrás'));
      wrap.insertBefore(entry, solvesEl); page.appendChild(wrap);
    }
    selectTab('caja');
  }
  seed();
  assemble();
  doc.addEventListener('keydown', onKey);
  host.__sxOff = function () { doc.removeEventListener('keydown', onKey); if (host.__sxFs) host.__sxFs.close(true); if (host.__sxMq) host.__sxMq(); };
  host.__sx = { state: S, goto: goto, sell: sell, root: root, sh: sh };
}

/* ---------- montaje ---------- */
function boot() {
  var nodes = doc.querySelectorAll('[data-sistemas]');
  if (!nodes.length) return;
  withConfig(function () {
    [].forEach.call(nodes, function (n) { if (!n.getAttribute('data-sx-ready')) create(n, window.ANDRADE); });
  });
}
window.AndradeSistemas = { mount: function (el) { withConfig(function () { create(el, window.ANDRADE); }); } };
if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
})();
