// site/data/site.js -- owned by this repo, not vendored. Schema: docs/init-list.md (kit).
window.SITE_CONFIG = {
  name: "Final Fantasy",
  // Copied verbatim from the pre-migration hardcoded prefix -- this exact string
  // is already the localStorage key prefix in real visitors' browsers. Never change it.
  storagePrefix: "ffPlayOrder",
  tagline: [
    { text: "A recommended way to experience the Final Fantasy franchise, each series listing the mainline game alongside its prequels, sequels, remakes and spin-offs. Optional extras are marked — skip them and the series still holds together." }
  ],
  lastUpdated: "2026-08-01",
  entities: ["Square Enix"],
  noticeUrl: "https://github.com/vertex-order/final-fantasy/blob/main/NOTICE.md",
  discussionsUrl: "https://github.com/vertex-order/final-fantasy/discussions",
};
