// Rotta Curadoria — Cookie Consent Banner (LGPD + GDPR)
// Include this script on every page: <script src="/js/cookie-consent.js"></script>
(function() {
  // Skip if already consented
  try {
    if (localStorage.getItem('rotta_cookie_consent')) return;
  } catch(e) { return; }

  // Detect language/region for appropriate text
  var lang = (navigator.language || navigator.userLanguage || 'pt').toLowerCase();
  var isEU = /^(de|fr|it|es|nl|pl|pt-pt|sv|da|fi|el|cs|hu|ro|bg|hr|sk|sl|lt|lv|et|mt|ga)/.test(lang);

  var texts = {
    pt: {
      title: 'Sua privacidade importa',
      body: 'Usamos cookies e armazenamento local para personalizar sua experiencia (como o resultado do quiz) e melhorar nosso site. Seus dados pessoais (nome, WhatsApp, email) sao usados apenas para contato sobre viagens.',
      accept: 'Aceitar',
      reject: 'Apenas essenciais',
      lgpd: 'Em conformidade com a LGPD (Lei 13.709/2018)'
    },
    en: {
      title: 'Your privacy matters',
      body: 'We use cookies and local storage to personalize your experience (like quiz results) and improve our site. Your personal data (name, WhatsApp, email) is only used to contact you about travel experiences.',
      accept: 'Accept all',
      reject: 'Essential only',
      lgpd: 'GDPR & LGPD compliant'
    }
  };

  var t = (lang.startsWith('pt') || lang.startsWith('pt-br')) ? texts.pt : texts.en;
  var complianceText = isEU ? 'GDPR & LGPD compliant' : t.lgpd;

  // Styles
  var style = document.createElement('style');
  style.textContent =
    '#cookieConsent{position:fixed;bottom:0;left:0;right:0;z-index:99999;' +
    'background:rgba(14,14,14,.97);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);' +
    'border-top:1px solid rgba(197,165,114,.2);padding:20px 24px;' +
    'transform:translateY(100%);animation:ccSlideUp .5s ease .5s forwards}' +
    '@keyframes ccSlideUp{to{transform:translateY(0)}}' +
    '.cc-inner{max-width:1080px;margin:0 auto;display:flex;align-items:center;gap:24px;flex-wrap:wrap}' +
    '.cc-text{flex:1;min-width:280px}' +
    '.cc-title{font-family:"Playfair Display",serif;color:#C5A572;font-size:1rem;display:block;margin-bottom:6px}' +
    '.cc-body{font-family:"Inter",Arial,sans-serif;font-size:13px;color:#ccc;line-height:1.6;margin:0}' +
    '.cc-compliance{font-family:"Inter",Arial,sans-serif;font-size:11px;color:#666;margin-top:6px}' +
    '.cc-actions{display:flex;gap:10px;flex-shrink:0}' +
    '.cc-btn{font-family:"Inter",Arial,sans-serif;font-size:13px;font-weight:600;padding:10px 22px;' +
    'border-radius:50px;cursor:pointer;border:none;transition:all .2s;letter-spacing:.02em}' +
    '.cc-accept{background:#C5A572;color:#0E0E0E}' +
    '.cc-accept:hover{background:#D4B87F;transform:translateY(-1px)}' +
    '.cc-reject{background:transparent;color:#999;border:1px solid rgba(153,153,153,.3)}' +
    '.cc-reject:hover{border-color:#C5A572;color:#C5A572}' +
    '@media(max-width:600px){.cc-inner{flex-direction:column;text-align:center}' +
    '.cc-actions{width:100%;justify-content:center}}';

  // Build banner using safe DOM methods
  function createBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookieConsent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', t.title);

    var inner = document.createElement('div');
    inner.className = 'cc-inner';

    var textDiv = document.createElement('div');
    textDiv.className = 'cc-text';

    var titleEl = document.createElement('strong');
    titleEl.className = 'cc-title';
    titleEl.textContent = t.title;

    var bodyEl = document.createElement('p');
    bodyEl.className = 'cc-body';
    bodyEl.textContent = t.body;

    var compEl = document.createElement('p');
    compEl.className = 'cc-compliance';
    compEl.textContent = complianceText;

    textDiv.appendChild(titleEl);
    textDiv.appendChild(bodyEl);
    textDiv.appendChild(compEl);

    var actionsDiv = document.createElement('div');
    actionsDiv.className = 'cc-actions';

    var acceptBtn = document.createElement('button');
    acceptBtn.className = 'cc-btn cc-accept';
    acceptBtn.textContent = t.accept;
    acceptBtn.addEventListener('click', function() { handleConsent(banner, 'full'); });

    var rejectBtn = document.createElement('button');
    rejectBtn.className = 'cc-btn cc-reject';
    rejectBtn.textContent = t.reject;
    rejectBtn.addEventListener('click', function() { handleConsent(banner, 'essential'); });

    actionsDiv.appendChild(acceptBtn);
    actionsDiv.appendChild(rejectBtn);

    inner.appendChild(textDiv);
    inner.appendChild(actionsDiv);
    banner.appendChild(inner);

    return banner;
  }

  // Handle consent
  function handleConsent(banner, level) {
    try {
      localStorage.setItem('rotta_cookie_consent', JSON.stringify({
        level: level,
        timestamp: new Date().toISOString(),
        version: '1.0'
      }));
    } catch(e) {}

    // If essential only, clear persona personalization
    if (level === 'essential') {
      try { localStorage.removeItem('rotta_persona'); } catch(e) {}
    }

    // Remove banner with animation
    banner.style.animation = 'none';
    banner.style.transform = 'translateY(0)';
    banner.style.transition = 'transform .4s ease, opacity .4s ease';
    setTimeout(function() {
      banner.style.transform = 'translateY(100%)';
      banner.style.opacity = '0';
      setTimeout(function() { banner.remove(); }, 400);
    }, 10);
  }

  // Wait for DOM
  function init() {
    document.head.appendChild(style);
    document.body.appendChild(createBanner());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
