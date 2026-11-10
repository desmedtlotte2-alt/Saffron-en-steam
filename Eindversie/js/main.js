/* Saffron & Steam · landingspagina
   ---------------------------------------------------------------
   MAILERLITE KOPPELEN
   1. Maak in MailerLite een embedded form (Forms > Embedded forms) met de velden
      Name (voornaam) en Email, en zet double opt-in aan.
   2. Kies bij het insluiten voor "HTML code" en kopieer de waarde van het
      action-attribuut van het <form>-element. Die ziet er zo uit:
      https://assets.mailerlite.com/jsonp/123456/forms/987654321/subscribe
   3. Plak die URL hieronder tussen de aanhalingstekens.
   Zolang de URL leeg is, werkt het formulier in demomodus: het controleert
   de velden en toont de succesmelding, maar verstuurt niets.
   --------------------------------------------------------------- */
const MAILERLITE_ACTION = "https://assets.mailerlite.com/jsonp/2742627/forms/203749878338159877/subscribe";
/* Gekoppeld op 10/11/2026 aan het MailerLite-formulier "Newsletter sign-up Saffron & Steam".
   Leeg maken ("") zet het formulier terug in demomodus. */

/* Telt een bezoek aan het formulier in MailerLite (Visitors / Conversion in Forms > Overview),
   zoals de originele embedcode van MailerLite dat ook doet. */
if (MAILERLITE_ACTION) {
  fetch(MAILERLITE_ACTION.replace(/\/subscribe$/, "/takel")).catch(() => {});
}

document.documentElement.classList.add("js");

/* ---------- Navigatie: schaduw bij scrollen ---------- */
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- Scroll-reveal ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-in"));
}

/* ---------- Video: pauzeknop + stil bij "minder beweging" ---------- */
document.querySelectorAll("[data-video-toggle]").forEach((btn) => {
  const video = btn.parentElement.querySelector("video");
  const sync = () => {
    btn.classList.toggle("is-paused", video.paused);
    btn.setAttribute("aria-label", video.paused ? "Video afspelen" : "Video pauzeren");
    btn.firstElementChild.textContent = video.paused ? "▶" : "❚❚";
  };
  btn.addEventListener("click", () => { video.paused ? video.play() : video.pause(); });
  video.addEventListener("play", sync);
  video.addEventListener("pause", sync);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { video.removeAttribute("autoplay"); video.pause(); }
  sync();
});

/* ---------- Privacybeleid ---------- */
const privacy = document.getElementById("privacy");
document.querySelectorAll("[data-open-privacy]").forEach((btn) =>
  btn.addEventListener("click", () => privacy.showModal())
);
privacy.addEventListener("click", (e) => { if (e.target === privacy) privacy.close(); });

/* ---------- Nieuwsbriefformulier ---------- */
const form = document.getElementById("signup");
const success = document.getElementById("signup-success");
const fail = document.getElementById("signup-fail");
const fields = {
  name: { input: form.querySelector("#f-name"), error: form.querySelector("#e-name"),
          valid: (i) => i.value.trim().length > 0 },
  email: { input: form.querySelector("#f-email"), error: form.querySelector("#e-email"),
           valid: (i) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(i.value.trim()) },
  optin: { input: form.querySelector("#f-optin"), error: form.querySelector("#e-optin"),
           valid: (i) => i.checked },
};

function check(key) {
  const f = fields[key];
  const ok = f.valid(f.input);
  f.error.hidden = ok;
  f.input.setAttribute("aria-invalid", ok ? "false" : "true");
  return ok;
}
Object.keys(fields).forEach((key) => {
  const ev = key === "optin" ? "change" : "input";   // fout verdwijnt al tijdens het typen, zodat de layout niet verspringt bij het klikken
  fields[key].input.addEventListener(ev, () => {
    if (fields[key].input.getAttribute("aria-invalid") !== null) check(key);
  });
});

function showSuccess() {
  form.hidden = true;
  fail.hidden = true;
  success.hidden = false;
  success.focus();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const results = Object.keys(fields).map(check);
  if (results.includes(false)) {
    const firstBad = Object.values(fields).find((f) => f.input.getAttribute("aria-invalid") === "true");
    firstBad.input.focus();
    return;
  }

  if (!MAILERLITE_ACTION) { showSuccess(); return; }   // demomodus

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = "Even geduld…";
  try {
    const data = new FormData(form);
    // De opt-in gaat mee als verplicht MailerLite-veld fields[intresses_saffron_steam][]
    let res;
    try {
      res = await fetch(MAILERLITE_ACTION, { method: "POST", body: data });
    } catch (corsErr) {
      // Lukt het antwoord lezen niet (CORS), stuur dan zonder antwoord te lezen.
      // De inschrijving komt zo toch aan; MailerLite voegt een adres nooit dubbel toe.
      await fetch(MAILERLITE_ACTION, { method: "POST", body: data, mode: "no-cors" });
      showSuccess();
      return;
    }
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false) throw new Error("MailerLite gaf een fout");
    showSuccess();
  } catch (err) {
    fail.hidden = false;
    button.disabled = false;
    button.textContent = "Word lid";
  }
});

/* ---------- Instagram-links: plaatshouders (fictief merk, geen echt account) ---------- */
document.querySelectorAll("[data-placeholder-link]").forEach((a) => {
  a.setAttribute("title", "Voorbeeldlink: Saffron & Steam is een fictief merk");
  a.addEventListener("click", (e) => e.preventDefault());
});
