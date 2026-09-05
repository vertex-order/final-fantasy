// One entry per series file, in display order. Add/remove a series by editing this list.
// Classic script (not an ES module) so it also loads over file:// — browsers block
// module/import and fetch on file://, but plain <script src> tags still work.
var SERIES_ORDER = [
  "I",
  "II",
  "III",
  "MQ",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "SW",
  "X",
  "FFU",
  "XI",
  "CC",
  "XII",
  "DFF",
  "XIII",
  "DM",
  "XIV",
  "TR",
  "EX",
  "BE",
  "WD",
  "XV",
  "XVI",
  "PB",
  "FAN",
  "Other",
  "AN"
];

// Each series-*.js assigns its object here as `window.__ffSeriesReg['<slug>'] = {...}`.
window.__ffSeriesReg = window.__ffSeriesReg || {};

// Resolve series-*.js against this file's own location (…/data/), captured now
// because document.currentScript is null inside the async callbacks below.
var _indexScript = document.currentScript;
var DATA_BASE = _indexScript
  ? _indexScript.src.replace(/[^/]*$/, "")
  : new URL("data/", document.baseURI).href;

function _loadSeries(slug) {
  return new Promise(function (resolve, reject) {
    if (window.__ffSeriesReg[slug]) return resolve();
    var el = document.createElement("script");
    el.src = DATA_BASE + "series-" + slug + ".js";
    el.onload = function () { resolve(); };
    el.onerror = function () { reject(new Error("failed to load series-" + slug + ".js")); };
    document.head.appendChild(el);
  });
}

window.loadAllSeries = function loadAllSeries() {
  return Promise.all(SERIES_ORDER.map(_loadSeries)).then(function () {
    return SERIES_ORDER.map(function (slug) { return window.__ffSeriesReg[slug]; });
  });
};
