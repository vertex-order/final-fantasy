// FAQ content for the page's FAQ section. Classic script (not a module) so it
// loads over file:// like the other data/*.js files. Each item's `a` is an array
// of paragraphs: a plain string, or {parts:[...]} where each part is {text} or {em}.
// Franchise-specific items first, then the generic items every list shares
// (data/common-faq.js, owned by kit) — see that file for the sync rationale.
window.FAQ_ITEMS = [
  {
    q: "Do I need to play the franchise in order?",
    a: ["No. You can play the Final Fantasy franchise in any order, and only the internal order of each series is important. For example Final Fantasy II and Final Fantasy XVI are not related story wise in any way, and only share some common elements belonging to most Final Fantasy series."],
  },
  {
    q: "Why is a Final Fantasy title missing?",
    a: [
      { parts: [
        { text: "It may have come out after the last update of this list, check last updated at the bottom of the page and if so, please submit it! Another reason may be that its story was deemed not noteworthy enough to warrant its own entry in this list, and you can find the series representing it in our " },
        { em: "Other" },
        { text: " series. The Chocobo titles especially." },
      ] },
    ],
  },
  ...window.FAQ_ITEMS_COMMON,
];
