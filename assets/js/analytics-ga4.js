/* Google Analytics 4 — chargé uniquement après consentement explicite (conformité CNIL).
   Tant que le cookie de consentement ne vaut pas "accepted", aucune requête
   n'est envoyée vers les serveurs de Google. */
(function () {
    var meta = document.querySelector('meta[name="ga-measurement-id"]');
    if (!meta) {
        return;
    }

    var measurementId = (meta.content || "").trim();
    if (!/^G-[A-Z0-9]{6,}$/.test(measurementId) || measurementId === "G-XXXXXXXXXX") {
        return;
    }

    var loaded = false;

    function readConsent() {
        var match = document.cookie.match(/(?:^|; )erpac_cookie_consent=([^;]*)/);
        return match ? decodeURIComponent(match[1]) : null;
    }

    function loadGa() {
        if (loaded) {
            return;
        }
        loaded = true;

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };

        window.gtag("consent", "default", {
            analytics_storage: "granted",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
        });

        window.gtag("js", new Date());
        // Durée de vie des cookies _ga limitée à 13 mois (recommandation CNIL)
        window.gtag("config", measurementId, { cookie_expires: 33696000 });

        var script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
        document.head.appendChild(script);
    }

    window.erpacUpdateGaConsent = function (value) {
        if (value === "accepted") {
            loadGa();
        } else if (loaded) {
            window.gtag("consent", "update", { analytics_storage: "denied" });
        }
    };

    if (readConsent() === "accepted") {
        loadGa();
    }

    window.addEventListener("erpac:cookie-consent", function (event) {
        if (event.detail && event.detail.value) {
            window.erpacUpdateGaConsent(event.detail.value);
        }
    });
})();
