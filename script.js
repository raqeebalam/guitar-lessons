(function () {
  var cfg = window.SITE_CONFIG || {};

  // WhatsApp links with prefilled message
  document.querySelectorAll(".js-whatsapp").forEach(function (a) {
    var msg = a.getAttribute("data-msg") || "";
    a.href = "https://wa.me/" + cfg.whatsapp + "?text=" + encodeURIComponent(msg);
    a.target = "_blank";
    a.rel = "noopener";
  });

  document.querySelectorAll(".js-email").forEach(function (a) {
    a.href = "mailto:" + cfg.email;
    a.textContent = cfg.email;
  });

  document.querySelectorAll(".js-city").forEach(function (el) {
    el.textContent = cfg.city;
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Region toggle (Pakistan / International)
  function setRegion(region) {
    document.querySelectorAll("[data-pk][data-intl]").forEach(function (el) {
      el.textContent = el.getAttribute("data-" + region);
    });
    document.querySelectorAll(".toggle-btn").forEach(function (b) {
      var on = b.getAttribute("data-region") === region;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    try { localStorage.setItem("region", region); } catch (e) {}
  }

  document.querySelectorAll(".toggle-btn").forEach(function (b) {
    b.addEventListener("click", function () { setRegion(b.getAttribute("data-region")); });
  });

  var initial = null;
  try { initial = localStorage.getItem("region"); } catch (e) {}
  if (!initial) {
    if (cfg.defaultRegion === "auto") {
      var tz = "";
      try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
      initial = tz === "Asia/Karachi" ? "pk" : "intl";
    } else {
      initial = cfg.defaultRegion || "pk";
    }
  }
  setRegion(initial);
})();
