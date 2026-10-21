/*! Andrade Solutions · bloque de contacto. Monta en <section id="contacto" data-contacto>. Ver README.md */
(function () {
'use strict';
if (window.__SXC_BOOT) return; window.__SXC_BOOT = 1;
var doc = document, SCRIPT = doc.currentScript;
var DEF = { email: 'solucionesintegralesandradee@gmail.com', whatsapp: '', instagram: '', nombre: 'Andrade Solutions', ciudad: 'La Plata, Argentina' };
function base() { var b = '/_comun/'; try { if (SCRIPT && SCRIPT.src) b = SCRIPT.src.replace(/[^\/?#]*([?#].*)?$/, ''); } catch (e) {} return b; }
function withConfig(cb) {
  if (window.ANDRADE) { cb(); return; }
  if (window.__ANDRADE_Q) { window.__ANDRADE_Q.push(cb); return; }
  var q = window.__ANDRADE_Q = [cb], s = doc.createElement('script');
  s.src = base() + 'config.js'; s.async = true;
  var done = function () { if (!window.ANDRADE) { window.ANDRADE = {}; for (var k in DEF) window.ANDRADE[k] = DEF[k]; } var l = q; window.__ANDRADE_Q = null; l.forEach(function (f) { try { f(); } catch (e) { console.error(e); } }); };
  s.onload = done; s.onerror = done; doc.head.appendChild(s);
}
function h(t, a) {
  var m = t.split('.'), el = doc.createElement(m[0]), i = 1;
  if (m.length > 1) el.className = m.slice(1).join(' ');
  if (a && typeof a === 'object' && !a.nodeType && !Array.isArray(a)) { i = 2; for (var k in a) { if (a[k] == null || a[k] === false) continue; if (k === 'on') { for (var e in a.on) el.addEventListener(e, a.on[e]); } else if (k === 'html') el.innerHTML = a[k]; else el.setAttribute(k, a[k] === true ? '' : a[k]); } }
  (function add(l) { for (var j = 0; j < l.length; j++) { var c = l[j]; if (c == null || c === false) continue; if (Array.isArray(c)) add(c); else el.appendChild(c.nodeType ? c : doc.createTextNode(String(c))); } })(Array.prototype.slice.call(arguments, i));
  return el;
}
var RUBROS = [['deco', 'Deco y hogar'], ['joyeria', 'Joyería de oro'], ['belleza', 'Belleza y cosmética'], ['lenceria', 'Lencería'], ['moda', 'Moda e indumentaria'], ['otro', 'Otro rubro']];
var QUIERO = ['Una web para vender', 'Caja y stock en un solo lugar', 'Seguimiento de clientas por WhatsApp', 'Reportes y facturación', 'Ordenar todo lo que hago hoy'];
var ICON = { mail: '<path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/>', wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-3.8-1z"/>', ig: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><path d="M16.8 7.2h.01"/>' };
function ico(n) { return h('span.sxc-ico', { 'aria-hidden': 'true', html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + ICON[n] + '</svg>' }); }
function mount(el, C) {
  var rub = ''; var s = doc.querySelector('[data-sistemas][data-rubro]'); if (s) rub = s.getAttribute('data-rubro') || '';
  var sh = el.shadowRoot || el.attachShadow({ mode: 'open' }); while (sh.firstChild) sh.removeChild(sh.firstChild);
  var rootEl = h('div.sxc'); el.setAttribute('data-sxc-ready', '1');
  if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) el.setAttribute('aria-label', 'Contacto');
  var lk = h('link', { rel: 'stylesheet', href: base() + 'contacto.css' }); sh.appendChild(lk); sh.appendChild(rootEl);
  if (!window.__SX_FAST) { rootEl.style.visibility = 'hidden'; var shown = function () { rootEl.style.visibility = ''; }; lk.addEventListener('load', shown); lk.addEventListener('error', shown); setTimeout(shown, 2500); }
  var wa = String(C.whatsapp || '').replace(/\D/g, '');
  var nombre = h('input', { type: 'text', id: 'sxc-n', name: 'nombre', autocomplete: 'name', required: true }),
    rubro = h('select', { id: 'sxc-r', name: 'rubro' }, RUBROS.map(function (r) { return h('option', { value: r[1], selected: r[0] === rub ? true : null }, r[1]); })),
    msg = h('textarea', { id: 'sxc-m', name: 'mensaje', rows: '4', required: true, placeholder: 'Ej: vendo por Instagram y el stock nunca coincide con lo que tengo' }),
    err = h('p.sxc-err', { role: 'alert' }), ok = h('p.sxc-ok', { role: 'status' });
  var checks = h('fieldset.sxc-fs', h('legend', 'Qué te gustaría resolver (opcional)'), QUIERO.map(function (q, i) { return h('label.sxc-chk', h('input', { type: 'checkbox', value: q }), h('span', q)); }));
  function texto() {
    var q = [].map.call(checks.querySelectorAll('input:checked'), function (x) { return x.value; });
    return 'Hola ' + C.nombre + '! Soy ' + nombre.value.trim() + ' y tengo una tienda de ' + rubro.value.toLowerCase() + '.\n\n' + msg.value.trim() + (q.length ? '\n\nMe interesa: ' + q.join(', ') + '.' : '') + '\n\nVi la demo en su web.';
  }
  function valid() {
    err.textContent = '';
    if (!nombre.value.trim()) { err.textContent = 'Decinos cómo te llamás así te respondemos por tu nombre.'; nombre.focus(); return false; }
    if (!msg.value.trim()) { err.textContent = 'Contanos en una línea qué te complica. Con eso alcanza.'; msg.focus(); return false; }
    return true;
  }
  var form = h('form.sxc-form', { novalidate: true, on: { submit: function (e) {
    e.preventDefault(); if (!valid()) return;
    var url = 'mailto:' + C.email + '?subject=' + encodeURIComponent('Consulta desde la web: ' + rubro.value) + '&body=' + encodeURIComponent(texto());
    ok.textContent = 'Se abrió tu correo con el mensaje armado. Solo falta que lo envíes.'; el.__sxcLast = url;
    try { window.location.href = url; } catch (x) {}
  } } },
    h('label.sxc-f', h('span', 'Tu nombre'), nombre), h('label.sxc-f', h('span', 'Tu rubro'), rubro), h('label.sxc-f', h('span', 'Contanos qué te complica'), msg), checks,
    err, ok,
    h('div.sxc-acts', h('button.sxc-btn.solid', { type: 'submit' }, ico('mail'), h('span', 'Enviar por email')),
      wa ? h('button.sxc-btn', { type: 'button', on: { click: function () { if (!valid()) return; window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(texto()), '_blank', 'noopener'); } } }, ico('wa'), h('span', 'Escribir por WhatsApp')) : null));
  var left = h('div.sxc-l',
    h('p.sxc-eye', C.nombre + ' · ' + C.ciudad),
    h('h2', { id: 'sxc-h' }, 'Contanos qué te complica y te mostramos cómo se resuelve'),
    h('p.sxc-lead', 'Webs que venden, caja, stock, clientas y gestión en un mismo lugar. Hablamos de tu negocio, sin tecnicismos, y te mostramos el camino más simple.'),
    h('ul.sxc-ways',
      h('li', ico('mail'), h('div', h('small', 'Escribinos'), h('a', { href: 'mailto:' + C.email }, C.email))),
      wa ? h('li', ico('wa'), h('div', h('small', 'WhatsApp'), h('a', { href: 'https://wa.me/' + wa + '?text=' + encodeURIComponent('Hola ' + C.nombre + '! Vi la demo y quiero contarles mi negocio.'), target: '_blank', rel: 'noopener' }, 'Abrir chat'))) : null,
      C.instagram ? h('li', ico('ig'), h('div', h('small', 'Instagram'), h('a', { href: /^https?:/.test(C.instagram) ? C.instagram : 'https://instagram.com/' + String(C.instagram).replace(/^@/, ''), target: '_blank', rel: 'noopener' }, '@' + String(C.instagram).replace(/^.*\//, '').replace(/^@/, '')))) : null),
    h('p.sxc-fine', 'Respondemos en el día. Cada proyecto se arma a medida de tu tienda.'));
  rootEl.appendChild(h('div.sxc-w', left, h('div.sxc-r', form)));
}
function boot() {
  var n = doc.querySelectorAll('[data-contacto]'); if (!n.length) return;
  withConfig(function () { [].forEach.call(n, function (el) { if (!el.getAttribute('data-sxc-ready')) mount(el, window.ANDRADE); }); });
}
if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
})();
