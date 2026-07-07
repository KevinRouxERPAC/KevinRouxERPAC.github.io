(function () {
    var STORAGE_KEY = "erpac_cookie_consent";
    var path = window.location.pathname;
    var inSub = path.includes("/services/") || path.includes("/entreprise/") || path.includes("/legal/");
    var legalHref = inSub ? "../legal/mentions-legales.html#cookies" : "legal/mentions-legales.html#cookies";

    function getConsent() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function setConsent(value) {
        try {
            localStorage.setItem(STORAGE_KEY, value);
        } catch (e) {
            return;
        }
        window.dispatchEvent(new CustomEvent("erpac:cookie-consent", { detail: { value: value } }));
    }

    function hideBanner(banner) {
        banner.classList.add("cookie-banner--hidden");
        window.setTimeout(function () {
            banner.remove();
        }, 350);
    }

    if (getConsent()) {
        return;
    }

    var banner = document.createElement("aside");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Gestion des cookies");
    banner.innerHTML =
        '<div class="cookie-banner__inner">' +
        '<p class="cookie-banner__text">Ce site utilise des cookies de mesure d\'audience (Google Analytics) uniquement avec votre accord. " +
        '<a href="' + legalHref + '">En savoir plus</a></p>' +
        '<div class="cookie-banner__actions">' +
        '<button type="button" class="btn btn-ghost cookie-banner__reject">Refuser</button>' +
        '<button type="button" class="btn btn-primary cookie-banner__accept">Accepter</button>' +
        "</div></div>";

    document.body.appendChild(banner);

    banner.querySelector(".cookie-banner__accept").addEventListener("click", function () {
        setConsent("accepted");
        hideBanner(banner);
    });

    banner.querySelector(".cookie-banner__reject").addEventListener("click", function () {
        setConsent("rejected");
        hideBanner(banner);
    });
})();
