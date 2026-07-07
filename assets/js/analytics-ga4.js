(function () {
    var meta = document.querySelector('meta[name="ga-measurement-id"]');
    if (!meta) {
        return;
    }

    var measurementId = (meta.content || "").trim();
    if (!/^G-[A-Z0-9]{6,}$/.test(measurementId) || measurementId === "G-XXXXXXXXXX") {
        return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
        window.dataLayer.push(arguments);
    };

    window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        wait_for_update: 500
    });

    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });

    function readConsent() {
        var match = document.cookie.match(/(?:^|; )erpac_cookie_consent=([^;]*)/);
        if (match) {
            return decodeURIComponent(match[1]);
        }
        try {
            return localStorage.getItem("erpac_cookie_consent");
        } catch (e) {
            return null;
        }
    }

    function applyStoredConsent() {
        var consent = readConsent();
        if (consent === "accepted") {
            window.gtag("consent", "update", { analytics_storage: "granted" });
        } else if (consent === "rejected") {
            window.gtag("consent", "update", { analytics_storage: "denied" });
        }
    }

    window.erpacUpdateGaConsent = function (value) {
        if (value === "accepted") {
            window.gtag("consent", "update", { analytics_storage: "granted" });
            return;
        }
        window.gtag("consent", "update", { analytics_storage: "denied" });
    };

    applyStoredConsent();

    window.addEventListener("erpac:cookie-consent", function (event) {
        if (event.detail && event.detail.value) {
            window.erpacUpdateGaConsent(event.detail.value);
        }
    });
})();
