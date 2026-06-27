/* bottom-nav.js — inject thanh nav dưới vào bất kỳ trang nào
   Dùng: <script src="bottom-nav.js"></script> cuối body
   Config qua <meta name="bn-active" content="home"> để highlight tab
   Các giá trị: home | game | chat | shop | profile
*/
(function () {

  const CSS = `
    body { padding-bottom: calc(64px + env(safe-area-inset-bottom)) !important; }

    #_bnav {
      position: fixed; bottom: 0; left: 0; right: 0;
      height: 64px;
      background: rgba(4,20,40,0.95);
      border-top: 1px solid rgba(56,189,248,0.12);
      display: flex; align-items: stretch;
      z-index: 8000;
      padding-bottom: env(safe-area-inset-bottom);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    ._bn-item {
      flex: 1; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 3px; border: none; background: none;
      cursor: pointer; padding: 8px 0;
      font-family: 'Nunito', 'Segoe UI', sans-serif;
      transition: background .12s;
    }
    ._bn-item:active { background: rgba(56,189,248,0.08); }
    ._bn-icon  { width: 24px; height: 24px; color: rgba(125,209,252,0.45); transition: color .15s; }
    ._bn-label { font-size: 10px; font-weight: 700; color: rgba(125,209,252,0.45); transition: color .15s; }
    ._bn-item.active ._bn-icon,
    ._bn-item.active ._bn-label { color: #38bdf8; }
    ._bn-item.active { background: rgba(56,189,248,0.06); }
  `;

  const TABS = [
    {
      key: 'home', label: 'Trang chủ', href: 'home.html',
      icon: `<svg class="_bn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`
    },
    {
      key: 'game', label: 'Game', href: 'games.html',
      icon: `<svg class="_bn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="3"/><path d="M6 12h4M8 10v4M15 12h.01M17 12h.01"/></svg>`
    },
    {
      key: 'chat', label: 'Chat', href: 'chat.html',
      icon: `<svg class="_bn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
    },
    {
      key: 'shop', label: 'Shop', href: 'shop.html',
      icon: `<svg class="_bn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`
    },
    {
      key: 'profile', label: 'Tài khoản', href: 'profile.html',
      icon: `<svg class="_bn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
    },
  ];

  const getMeta = n => { const el = document.querySelector(`meta[name="${n}"]`); return el ? el.content : ''; };
  const activeKey = getMeta('bn-active') || 'home';

  const st = document.createElement('style');
  st.textContent = CSS;
  document.head.appendChild(st);

  const nav = document.createElement('nav');
  nav.id = '_bnav';
  nav.innerHTML = TABS.map(t => `
    <button class="_bn-item${t.key === activeKey ? ' active' : ''}" onclick="location.href='${t.href}'">
      ${t.icon}
      <span class="_bn-label">${t.label}</span>
    </button>
  `).join('');

  document.body.appendChild(nav);

})();
