// FAQ content for the page's FAQ section. Classic script (not a module) so it
// loads over file:// like the other data/*.js files. Each item's `a` is an array
// of paragraphs: a plain string, or {parts:[...]} where each part is {text} or {em}.
// Franchise-specific items first, then the generic items every list shares
// (data/common-faq.js, owned by kit) — see that file for the sync rationale.
// Every entry needs a stable, hand-picked `id` (kebab-case) for its pilcrow
// anchor — see common-faq.js for why it can't be derived from the question.
// schema: faq.schema.json
window.FAQ_ITEMS = [
  {
    id: "play-in-order",
    q: "Do I need to play the franchise in order?",
    a: ["No. You can play the Final Fantasy franchise in any order, and only the internal order of each series is important. For example Final Fantasy II and Final Fantasy XVI are not related story wise in any way, and only share some common elements belonging to most Final Fantasy series."],
  },
  {
    id: "side-stories",
    q: "Why isn't every side story or spin-off listed separately?",
    a: [
      { parts: [
        { text: "Some appearances are folded into our " },
        { em: "Other" },
        { text: " series entry instead of getting their own line, when we've judged the story not noteworthy enough on its own — the Chocobo titles especially." },
      ] },
    ],
  },
  ...window.FAQ_ITEMS_COMMON,
];
