/* Botón "ver en celular": abre la misma página dentro de un marco de teléfono. */
(function () {
  if (/[?&]celu=1/.test(location.search)) { document.documentElement.classList.add('en-celu'); return; }
  var css = '.vc-btn{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;border:1px solid currentColor;background:transparent;color:inherit;cursor:pointer;opacity:.85;transition:opacity .2s,transform .2s,background .2s;padding:0;flex:none}.vc-btn:hover{opacity:1;transform:translateY(-1px)}.vc-btn:focus-visible{outline:2px solid currentColor;outline-offset:3px}.vc-btn[aria-pressed=true]{background:currentColor}.vc-btn[aria-pressed=true] svg{filter:invert(1)}.vc-btn svg{width:18px;height:18px}.vc-btn--fijo{position:fixed;right:16px;bottom:16px;z-index:2147483000;background:#111;color:#fff;border-color:#fff}'
  + '.vc-ov{position:fixed;inset:0;z-index:2147483001;display:none;align-items:center;justify-content:center;background:rgba(10,10,12,.78);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}.vc-ov.on{display:flex}'
  + '.vc-tel{position:relative;width:calc(390px + 24px);height:calc(844px + 24px);border-radius:56px;background:#0b0b0d;padding:12px;box-shadow:0 0 0 2px #2a2a2e,0 40px 120px rgba(0,0,0,.6);transform-origin:center}.vc-tel iframe{width:390px;height:844px;border:0;border-radius:44px;background:#fff;display:block}.vc-tel:before{content:"";position:absolute;top:22px;left:50%;transform:translateX(-50%);width:110px;height:28px;border-radius:20px;background:#0b0b0d;z-index:2;pointer-events:none}'
  + '.vc-x{position:fixed;top:14px;right:18px;z-index:2147483002;border:1px solid rgba(255,255,255,.5);background:rgba(0,0,0,.4);color:#fff;border-radius:99px;padding:10px 16px;font:500 14px/1 system-ui,sans-serif;cursor:pointer}.vc-x:hover{background:rgba(255,255,255,.15)}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var ico = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.4"/><path d="M11 18.6h2"/></svg>';
  var ov = document.createElement('div'); ov.className = 'vc-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'Vista en celular');
  ov.innerHTML = '<button class="vc-x" type="button">Cerrar vista celular ✕</button><div class="vc-tel"><iframe title="Vista en celular" loading="lazy"></iframe></div>';
  var tel = ov.querySelector('.vc-tel'), fr = ov.querySelector('iframe'), btns = [];
  function fit() { var s = Math.min(1, (innerHeight - 24) / 868, (innerWidth - 24) / 414); tel.style.transform = 'scale(' + s + ')'; }
  function set(on) {
    if (on) { fr.src = location.pathname + '?celu=1' + location.hash; fit(); } else { fr.removeAttribute('src'); }
    ov.classList.toggle('on', on); document.documentElement.style.overflow = on ? 'hidden' : '';
    btns.forEach(function (b) { b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
  }
  addEventListener('resize', fit);
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && ov.classList.contains('on')) set(false); });
  ov.addEventListener('click', function (e) { if (e.target === ov) set(false); });
  ov.querySelector('.vc-x').addEventListener('click', function () { set(false); });
  function mk(fijo) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'vc-btn' + (fijo ? ' vc-btn--fijo' : '');
    b.setAttribute('aria-label', 'Ver cómo se ve en celular'); b.setAttribute('aria-pressed', 'false'); b.title = 'Ver en celular'; b.innerHTML = ico;
    b.addEventListener('click', function () { set(!ov.classList.contains('on')); }); btns.push(b); return b;
  }
  function init() {
    document.body.appendChild(ov);
    var ig = document.querySelector('[data-vista-celu], header [aria-label*="nstagram"], nav [aria-label*="nstagram"], header [data-wa="ig"], nav [data-wa="ig"], header a[href*="instagram.com"], nav a[href*="instagram.com"]');
    if (ig && ig.parentNode) { ig.parentNode.insertBefore(mk(false), ig); }
    else { document.body.appendChild(mk(true)); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
