// One entry per series file, in display order. Add/remove a series by editing this list.
const SERIES_ORDER = [
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

export async function loadAllSeries() {
  const mods = await Promise.all(SERIES_ORDER.map(slug => import(`./series-${slug}.js`)));
  return mods.map(m => m.default);
}
