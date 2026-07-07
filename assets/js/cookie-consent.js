(function () {
    var STORAGE_KEY = "erpac_cookie_consent";
    var COOKIE_DAYS = 183;
    var path = window.location.pathname;
    var inSub = path.includes("/services/") || path.includes("/entreprise/") || path.includes("/legal/");
    var legalHref = inSub ? "../legal/mentions-legales.html#cookies" : "legal/mentions-legales.html#cookies";

    function readCookie(name) {
        var match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
        return match ? decodeURIComponent(match[1]) : null;
    }

    function writeCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
    }

    function getConsent() {
        var fromCookie = readCookie(STORAGE_KEY);
        if (fromCookie === "accepted" || fromCookie === "rejected") {
            return fromCookie;
        }

        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }

        return null;
    }

    function setConsent(value) {
        writeCookie(STORAGE_KEY, value, COOKIE_DAYS);
        try {
            localStorage.setItem(STORAGE_KEY, value);
        } catch (e) {
            return;
        }
        if (typeof window.erpacUpdateGaConsent === "function") {
            window.erpacUpdateGaConsent(value);
        }
        window.dispatchEvent(new CustomEvent("erpac:cookie-consent", { detail: { value: value } }));
    }

    function closePopup(overlay) {
        overlay.classList.add("cookie-popup--hidden");
        document.body.classList.remove("cookie-popup-open");
        window.setTimeout(function () {
            overlay.remove();
        }, 300);
    }

    function showPopup() {
        if (getConsent()) {
            return;
        }

        document.body.classList.add("cookie-popup-open");

        var overlay = document.createElement("div");
        overlay.className = "cookie-popup";
        overlay.setAttribute("role", "presentation");
        overlay.innerHTML =
            '<div class="cookie-popup__dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-popup-title" aria-describedby="cookie-popup-desc">' +
            '<h2 id="cookie-popup-title" class="cookie-popup__title">Gestion des cookies</h2>' +
            '<p id="cookie-popup-desc" class="cookie-popup__text">Ce site utilise des cookies de mesure d\'audience via Google Analytics pour comprendre la fréquentation et améliorer nos contenus. Ces cookies ne sont déposés qu\'avec votre accord.</p>' +
            '<p class="cookie-popup__text">Vous pouvez accepter ou refuser les cookies analytiques. Votre choix est conservé pendant 6 mois sur cet appareil.</p>' +
            '<p class="cookie-popup__text"><a href="' + legalHref + '">En savoir plus dans nos mentions légales</a></p>' +
            '<div class="cookie-popup__actions">' +
            '<button type="button" class="btn btn-ghost cookie-popup__reject">Refuser</button>' +
            '<button type="button" class="btn btn-primary cookie-popup__accept">Accepter</button>' +
            "</div></div>";

        document.body.appendChild(overlay);

        var acceptBtn = overlay.querySelector(".cookie-popup__accept");
        var rejectBtn = overlay.querySelector(".cookie-popup__reject");

        acceptBtn.addEventListener("click", function () {
            setConsent("accepted");
            closePopup(overlay);
        });

        rejectBtn.addEventListener("click", function () {
            setConsent("rejected");
            closePopup(overlay);
        });

        window.setTimeout(function () {
            acceptBtn.focus();
        }, 50);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", showPopup);
    } else {
        showPopup();
    }
})();
