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

    function loadGoogleAnalytics() {
        if (loaded) {
            return;
        }
        loaded = true;

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", measurementId, { anonymize_ip: true });

        var script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
        document.head.appendChild(script);
    }

    function maybeLoadFromConsent() {
        try {
            if (localStorage.getItem("erpac_cookie_consent") === "accepted") {
                loadGoogleAnalytics();
            }
        } catch (e) {
            return;
        }
    }

    window.addEventListener("erpac:cookie-consent", function (event) {
        if (event.detail && event.detail.value === "accepted") {
            loadGoogleAnalytics();
        }
    });

    maybeLoadFromConsent();
})();
