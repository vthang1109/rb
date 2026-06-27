/* nav.js — inject navbar vào bất kỳ trang nào
   Dùng: <link rel="stylesheet" href="base.css"> trước, sau đó <script src="nav.js"></script> */
(function () {

  const CSS = `
    body { padding-top: var(--nav-h, 52px) !important; }

    #_nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 9000;
      height: var(--nav-h, 52px);
      background: rgba(4,20,40,0.92);
      border-bottom: 1px solid rgba(56,189,248,0.15);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex; align-items: center;
      padding: 0 12px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.4);
    }

    /* placeholder trái để title căn giữa */
    ._nav-ph { width: 40px; flex-shrink: 0; }

    #_nav-title {
      flex: 1; text-align: center;
      color: var(--blue-mid); font-size: 17px; font-weight: 800;
      letter-spacing: .5px; pointer-events: none;
      text-shadow: 0 0 16px rgba(56,189,248,0.4);
    }

    /* hamburger bên PHẢI */
    #_hamburger {
      flex-shrink: 0;
      background: none; border: none; cursor: pointer;
      width: 40px; height: 40px;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 5px; padding: 0;
      border-radius: 10px;
      transition: background .15s;
    }
    #_hamburger:active { background: rgba(56,189,248,0.12); }
    #_hamburger span {
      display: block; width: 22px; height: 2px;
      background: var(--blue-mid);
      border-radius: 2px;
      pointer-events: none;
      transition: background .2s;
      box-shadow: 0 0 6px rgba(56,189,248,0.5);
    }

    /* FLOATING MENU — xuất hiện bên phải */
    #_menu {
      position: fixed;
      top: calc(var(--nav-h, 52px) + 6px);
      right: 10px;
      z-index: 9100;
      background: rgba(4,20,40,0.97);
      border: 1px solid rgba(56,189,248,0.2);
      border-radius: 14px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      min-width: 160px;
      overflow: hidden;
      display: none;
      transform-origin: top right;
      backdrop-filter: blur(16px);
    }
    #_menu.open {
      display: block;
      animation: _mIn .16s ease;
    }
    @keyframes _mIn {
      from { opacity:0; transform:scale(.88) translateY(-4px); }
      to   { opacity:1; transform:scale(1)   translateY(0); }
    }
    ._mi {
      display: block; width: 100%;
      padding: 13px 16px;
      background: none; border: none;
      border-bottom: 1px solid rgba(56,189,248,0.08);
      text-align: left; font-size: 14px; font-weight: 600;
      color: var(--text); cursor: pointer;
      font-family: inherit;
      transition: background .12s, color .12s;
    }
    ._mi:last-child { border-bottom: none; }
    ._mi:active, ._mi:hover { background: rgba(56,189,248,0.1); color: var(--blue-mid); }

    /* backdrop */
    #_bd {
      display: none; position: fixed; inset: 0; z-index: 9050;
    }
    #_bd.open { display: block; }
  `;

  const st = document.createElement('style');
  st.textContent = CSS;
  document.head.appendChild(st);

  const getMeta = (n, fb) => {
    const el = document.querySelector(`meta[name="${n}"]`);
    return el ? el.content : fb;
  };
  const title    = getMeta('nav-title', 'VTWorld');
  const backHref = getMeta('nav-back',  null);
  const homeHref = getMeta('nav-home',  'home.html');

  /* placeholder trái | title giữa | hamburger phải */
  const nav = document.createElement('nav');
  nav.id = '_nav';
  nav.innerHTML = `
    <div class="_nav-ph"></div>
    <div id="_nav-title">${title}</div>
    <button id="_hamburger" type="button">
      <span></span><span></span><span></span>
    </button>
  `;

  const bd = document.createElement('div');
  bd.id = '_bd';

  const menu = document.createElement('div');
  menu.id = '_menu';
  menu.innerHTML = `
    <button class="_mi" type="button">🏠 Trang chủ</button>
    <button class="_mi" type="button">← Trở lại</button>
  `;

  document.body.insertBefore(menu, document.body.firstChild);
  document.body.insertBefore(bd,   document.body.firstChild);
  document.body.insertBefore(nav,  document.body.firstChild);

  document.getElementById('_hamburger').addEventListener('click', function(e) {
    e.stopPropagation();
    const open = menu.classList.toggle('open');
    bd.classList.toggle('open', open);
  });

  bd.addEventListener('click', close);

  const items = menu.querySelectorAll('._mi');
  items[0].addEventListener('click', function() { close(); location.href = homeHref; });
  items[1].addEventListener('click', function() { close(); if (backHref) location.href = backHref; else history.back(); });

  function close() {
    menu.classList.remove('open');
    bd.classList.remove('open');
  }

})();
