window.__VSS_ENV = window.__VSS_ENV || {};
window.__VSS_ENV.VECTORMBE_API_KEY = "";
// Points all production builds (nginx + Cloudflare Pages) at the live backend.
// Dev mode always uses the Vite proxy (/api) and ignores this value.
window.__VSS_ENV.VITE_VECTORMBE_API_URL = "https://vectormbe.vectorstreamsystems.com/api";
