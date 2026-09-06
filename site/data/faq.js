// FAQ content for the page's FAQ section. Classic script (not a module) so it
// loads over file:// like the other data/*.js files. Each item's `a` is an array
// of paragraphs: a plain string, or {parts:[...]} where each part is {text} or {em}.
window.FAQ_ITEMS = [
  {
    q: "Do I need to play the franchise in order?",
    a: ["No. You can play the Final Fantasy franchise in any order, and only the internal order of each series is important. For example Final Fantasy II and Final Fantasy XVI are not related story wise in any way, and only share some common elements belonging to most Final Fantasy series."],
  },
  {
    q: "Which version should I play?",
    a: [
      "We've tried to only list releases that have significant differences, to better help you choose. We tend to recommend one or two releases prominently as working for the most people and put the others behind a other versions toggle.",
      "The platforms you already own is a good start. MacOS and most Linux distributions now have abstractions layers like Proton that can play most Windows games without problem. Console emulation is at best a legal grey area we cannot promote.",
      "Even if a bit less convenient at times, we recommend owning outright instead of licenses. That means physical media over digital; and GOG or direct from publisher instead of gaming services like Steam or Epic. Last would be digital services tied directly to console hardware, which tend to be terminated after a few years; and game streaming services whose titles may come and go. Good questions to ask yourself on if you actually own something is \"Can I resell it? Can I transfer my license? Can I use the product if the purchase platform is terminated?\".",
    ],
  },
  {
    q: "Why doesn't the language list always match?",
    a: ["Some platforms drop a language or two for the same release depending on the market they target. Verify languages for your chosen platform — our list is a guideline, not a guarantee."],
  },
  {
    q: "What language should I experience something in?",
    a: ["Either the language in which you can best enjoy it (usually your native tongue), the language it was originally produced in (if you're sufficiently proficient), or a mixture of both when subtitles are appropriate. One trick: if you find the voices grating, switch the audio to a language you don't understand — reading subtitles often lets you fill in your own characterization. Any of these can be the right answer."],
  },
  {
    q: "How do I read something if it's not available in any languages I am familiar with?",
    a: ["If you're able to obtain a digital copy of the text, you may be able to generate a rudimentary machine translation using offline local-only AI (like in Firefox) or online services (like DeepL or Google Translate). Be aware it won't be very accurate, especially in translating culture or expressions, but sometimes it is better than nothing, and it has the advantage of being able to translate into dozens if not hundreds of languages. When able, translate from a source language similar in grammar to your target language."],
  },
  {
    q: "Why is a Final Fantasy title missing?",
    a: [
      { parts: [
        { text: "It may have come out after the last update of this list, check last updated at the bottom of the page and if so, please submit it! Another reason may be that its story was deemed not noteworthy enough to warant its own entry in thsi list, and you can find the series representing it in our " },
        { em: "Other" },
        { text: " series. The Chocobo titles especially." },
      ] },
    ],
  },
  {
    q: "Why are only digital downloads marked as terminated?",
    a: ["When official means of obtaining digital downloads are terminated, there is no other legal recourse. For physical media (e.g. cartridge, CD, or DVD) you can still legally obtain them on the reseller market as a used copy."],
  },
  {
    q: "Why are some physical releases marked for multiple platforms?",
    a: ["If a platform has a compatibility layer to play media from an older platform, we will mark that platform with a note in the tooltip. The idea is to know what games you can play on what platforms, not which release it is (that's what the version title is for!)"],
  },
  {
    q: "Why is a specific release missing?",
    a: ["When release content is mostly identical (minor differences aside) we generally roll them into a single entry in our list (combining platforms), using the original release date only. Our list is meant to be a play order, not a detailed accounting of every release made, so only information that is important when choosing which release to play is generally included."],
  },
];
