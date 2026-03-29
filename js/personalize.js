// Rotta Curadoria — Homepage Personalization
// Reads quiz persona from localStorage and applies subtle customization
(function() {
    var persona;
    try { persona = localStorage.getItem('rotta_persona'); } catch(e) { return; }
    if (!persona) return; // First-time visitor, show default

    var config = {
        carolina: {
            heroSubtitle: 'Roteiros sob medida pra quem viaja sozinha e quer viver cada destino do seu jeito.',
            highlightProduct: 'roteiro-express',
            ctaText: 'Descubra seu roteiro ideal',
            badge: 'Exploradora Aspiracional'
        },
        roberto: {
            heroSubtitle: 'Curadoria premium pra quem valoriza tempo e quer o melhor \u2014 sem complica\u00e7\u00e3o.',
            highlightProduct: 'rotta-surprise',
            ctaText: 'Fale com nosso curador',
            badge: 'Colecionador de Experi\u00eancias'
        },
        silvia: {
            heroSubtitle: 'Experi\u00eancias que reconectam casais e criam mem\u00f3rias que duram pra sempre.',
            highlightProduct: 'escapada-romantica',
            ctaText: 'Planeje sua escapada',
            badge: 'Casal Reconectando'
        },
        squad: {
            heroSubtitle: 'A viagem do grupo que finalmente vai sair do papel. A gente organiza tudo.',
            highlightProduct: 'rotta-crew',
            ctaText: 'Monte sua Crew',
            badge: 'Squad Aventureiro'
        },
        lucas: {
            heroSubtitle: 'Aventuras rom\u00e2nticas pra casais que querem explorar o mundo juntos.',
            highlightProduct: 'escapada-romantica',
            ctaText: 'Comece sua aventura',
            badge: 'Casal que Celebra'
        }
    };

    var c = config[persona];
    if (!c) return;

    // Wait for DOM
    document.addEventListener('DOMContentLoaded', function() {
        // 1. Change hero subtitle
        var subtitle = document.querySelector('.hero .subtitle');
        if (subtitle) subtitle.textContent = c.heroSubtitle;

        // 2. Add welcome badge with persona name
        var heroBadge = document.querySelector('.hero-badge');
        if (heroBadge) heroBadge.textContent = '\u2728 ' + c.badge;

        // 3. Highlight recommended product card
        var productCards = document.querySelectorAll('.product-card');
        for (var i = 0; i < productCards.length; i++) {
            var card = productCards[i];
            var text = card.textContent || '';
            var href = card.getAttribute('href') || '';
            // Match by card content or link
            if (href.indexOf(c.highlightProduct) !== -1 || text.toLowerCase().indexOf(c.highlightProduct.replace(/-/g, ' ')) !== -1) {
                card.style.borderColor = '#C5A572';
                card.style.boxShadow = '0 0 20px rgba(197,165,114,0.15)';
                // Add "Recomendado pra voc\u00ea" badge
                var badge = document.createElement('div');
                badge.style.cssText = 'position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#C5A572;color:#0E0E0E;font-size:10px;font-weight:600;letter-spacing:1.5px;padding:4px 16px;border-radius:100px;white-space:nowrap;z-index:2';
                badge.textContent = 'RECOMENDADO PRA VOC\u00ca';
                card.style.position = 'relative';
                card.insertBefore(badge, card.firstChild);
                break; // Only highlight one card
            }
        }

        // 4. Update main CTA text
        var heroCtaBtn = document.querySelector('.hero-cta');
        if (heroCtaBtn) heroCtaBtn.textContent = c.ctaText;
    });
})();
