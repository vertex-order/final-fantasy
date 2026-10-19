<!-- sources/final-fantasy-xi-aloha-iroha-2015.md (markdown) -->

# Final Fantasy XI ~Aloha Iroha~

## Author

Tomokichi -- By (entry `by`; bare name: the same person is listed as writer and artist, so no `written`/`illustrated` split)
- https://breezewiki.com/finalfantasy/wiki/Aloha_Iroha#External_links: Writer Tomokichi (友吉?), Artist Tomokichi (友吉?) -- pasted by user 2026-10-16
  - the wiki itself marks the kanji reading with a question mark, so only the romanization is used
  - the page not read by me

## Sources

playonline.com (Publisher, official; the Square Enix PlayOnline Vana'diel Project pages)
- https://www.playonline.com/ff11us/vanaproj/detail/manga.html?lng=en&rgn=us&manga=iroha_1 -- EN language link*, free* -- from the user (2026-10-16), the page not read by me: the official English comic
- https://www.playonline.com/ff11us/vanaproj/detail/manga.html?lng=ja&rgn=jp&manga=iroha_1 -- JA language link*, free* -- from the user (2026-10-16), the page not read by me: the first issue of the official Japanese comic (the earlier link, https://www.playonline.com/ff11us/vanaproj/detail/manga.html?lng=en&rgn=jp&manga=iroha_1, was the English-interface page for the Japanese region, replaced by this one)
- PlayOnline's site files, read by curl 2026-10-16 (https://www.playonline.com/ff11/vanaproj/i18n/manga.xml, /ff11/vanaproj/view/manga.html, /ff11/vanaproj/script/manga.js, and the per-region /conf/bootstrap.xml files) -- languages*, issues* -- the page is a client-side template, so the pages themselves are an empty shell
  - its configuration shows **only two languages**: ja (REGION jp, /ff11/vanaproj) and en (REGION us, /ff11us/vanaproj; REGION eu, /ff11eu/vanaproj, is also English, the only difference being the date format 25.12.15 against 12/25/15)
  - the title text exists in `jp` and a default English form only (いろはでござる / Aloha Iroha) and the images are served from `img/ja/` and `img/en/` (`img/fr/` and `img/de/` return 404; /ff11fr/ and /ff11de/ redirect)
  - so no other language is offered
  - the file also lists **20 issues** (`iroha_1` to `iroha_20`, issue 20 with 8 strips and the others 4), dated weekly with the final one on 12.25 (12/25/15), whose page says "Final Episode"
  - "Speech bubbles go from right to left" is the English page's caution
- Both are linked from the Fandom wiki page's External links (per the user), the page the `book` row points at
  - the comic is free to read on PlayOnline, so the entry has the `Free` tag
  - EN is therefore an official edition, not a fan translation, and no `fan-translation` row is needed

breezewiki.com (Information)
- https://breezewiki.com/finalfantasy/wiki/Aloha_Iroha#External_links -- dates*, venue, title -- pasted by user 2026-10-16 (the page not read by me): "Aloha Iroha, known as IROHA de GOZARU in Japan, is a series of four-panel manga based on Final Fantasy XI and follows the story of Iroha, the main heroine of Rhapsodies of Vana'diel. It was drawn by Tomokichi and published on PlayOnline's Final Fantasy XI official site from August 11, 2015 to December 25, 2015" (the entry's `titleDate` start and end, so about 20 weekly issues, agreeing with the 20 issues)
  - the Japanese title いろはでござる ("de gozaru", an archaic samurai-style copula) is the final words of the manga, and the English version titles its last strip "Aloha Iroha" instead
- https://breezewiki.com/finalfantasy/wiki/Aloha_Iroha — titleUrl — shallow: URL from the entry data, not read
- https://breezewiki.com/finalfantasy/wiki/Aloha_Iroha#External_links — manga platform link — shallow: URL from the entry data, not read

tokyo otaku mode (Information; Otapedia, English)
- https://otakumode.com/otapedia/games/final_fantasy/manga -- credits, dates, description -- accessed 2026-10-17
  - (fetched by me; the page lists 8 manga, this entry's section is "Aloha Iroha")
  - a 20-chapter adventure manga about Iroha, the heroine of Rhapsodies of Vana'diel, by Tomokichi, released on PlayOnline's FFXI site from 2015-08-11 to 2015-12-25
  - agrees with the entry (length, credit and dates)
  - also notes the heroine speaks an archaic honorific Japanese
  - no new fact

## Decisions
- The platform is the browser icon (`globe`, named Webcomic), not `book` (user, 2026-10-16): it is a free web comic, not a physical book
  - the link stays the Fandom page that lists the official PlayOnline pages (user, 2026-10-16): two web rows with a language suffix would only repeat what the language links do, and a wiki page can come to list translations or other official languages later
  - the wiki page also lists both the EN and JA links, so if Square moves the PlayOnline pages (as it has when redoing its sites) the wiki can be updated and still work while our direct language links break
- `Free` tag and the JA and EN language links to the official PlayOnline pages added (user, 2026-10-16)
- `helpWanted` removed (user, 2026-10-16)
- The `…?` (unknown further languages) removed from the languages (user, 2026-10-16)
- `length` is `20 issues` (user, 2026-10-16): each issue is 4 vertical strips, so pages are not a useful measure
  - first set as `20p` from the English first issue (https://www.playonline.com/ff11us/vanaproj/detail/manga.html?lng=en&rgn=us&manga=iroha_1), then changed
  - I have not read the pages, so the count of 20 is the user's and whether it is the series total was not checked
- The JA and EN language links go to the first issue of each version (user, 2026-10-16)
