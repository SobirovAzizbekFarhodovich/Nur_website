---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Surface: noorain.uz landing (+ /privacy, /terms, /delete-account)

Mode: Persuade (landing); legal pages are Read.
Audience: Uzbek Muslims of every age arriving from Telegram, friends or a mosque circle, mostly on an Android phone. Job: understand what Noorain does in seconds and join @noorain_uz (the app is not on Google Play yet).
Proof on hand: real app screenshots (AI answer with citation, reader with translator's footnote), the app's own lock-screen wallpapers, real QuranEnc / server translations in 4 languages. Recitation demo is an authored, labelled sample (no audio test allowed).
Constraints: 4 languages (uz Latin default, uz Cyrillic, ru, en); no store badges, no invented numbers or testimonials; no imagery of living beings; Quran text never cropped or decorated; light on mid-range phones; prefers-reduced-motion respected.

## Direction contract

THESIS: The page is one day with Noorain: scrolling moves the clock from dawn to night, and every hour a new ayah reaches the lock screen. It refuses the category default of a dark hero + feature-card grid + store badges.

OWN-WORLD: The sky is the surface. The page ground is drenched in the colour of the hour (dawn indigo to amber, misty morning green, midday mist, gold dusk, mosque-green night), cross-fading as the day advances. On it: the app's own landscape wallpapers inside a near-black phone, PT Serif display, Golos Text body, Amiri Quran for Arabic, antique-gold hairlines and the eight-point star as the only ornament. Buttons are full pills (gold on dark sky, mosque green on light).

STORY: The visitor understands that an ayah with its translation appears on their lock screen every hour without opening the app; that behind it are an AI assistant that cites Quran/hadith/dua sources, a recitation checker that follows them word by word, and an offline reader with the translator's notes. They believe it because they see the real screens. They join the Telegram channel.

FIRST VIEWPORT: Dawn sky (05:12). Left column (desktop): H1 "Oyat har soatda qulf ekraningizda" in PT Serif ~64px, one sentence of support, gold Telegram pill as primary action with a quiet "Qanday ishlaydi" text link. Right: a 300px-wide phone, its lock screen showing the dawn wallpaper, clock 05:12 and 94:5 in Arabic + translation; to its right a thin gold time rail (05:12 → 21:30) with a star marker. Header: mark + Noorain wordmark, language switch, small Telegram link. Mobile: heading, CTA, then the phone, centred.

FORM: Sticky-device scroll story ("one day"), card 2 of the first surface round (the user picked it after seeing previews); seed key 5dbc42a0.

SIGNATURE INTERACTION (v1, kept as design-v1 on port 5181): As the visitor scrolls, the phone stays put, the clock rolls to the next hour, the wallpaper and the page sky cross-fade to that hour, and the rail's star slides down. Five hours: 05:12 lock (94:5), 09:00 lock (2:152), 13:00 AI answer screenshot, 18:40 recitation demo (Fatiha words lighting up), 21:30 reader screenshot; the day closes at night on the lock screen (13:28) with the Telegram call.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance


## v2 amendment (owner asked to strengthen the design "like Tarteel"; chose Living sky + Smooth transitions)

LIVING SKY: the ground is a canvas drawn from the scroll position p (0 = 05:12 … 5 = 22:30), not six stepped CSS layers. Colours interpolate between the six hour keys; the sun keeps to open sky: below the left ridge at 05:12, risen above the copy by 09:00, at its apex in the gap between the copy and the phone at 13:00, and touching the far ridge in that same gap at 18:40 (the ridge's rim lit), gone by 19:30; after dusk a crescent moon rises in that gap. Positions come from the measured layout, so they never pass behind the phone or the rail, stars fade in and twinkle, and the app's eight-point star lattice glows at 5% at night. Two soft ridges ground sunrise and sunset. On phones the sun and moon draw at 35% so text over them stays legible. Text flips to ink when the sky's mid colour passes the WCAG crossover (luminance 0.19).

SMOOTH TRANSITIONS: the story holds on an hour while that scene's text is fully on screen, and moves only in the gaps between scenes (owner: the phone must not blur while its text is being read). In each gap the incoming screen is wiped in from the bottom edge over the solid outgoing one (feathered 6% seam, 30–70% of the gap; no blur, no scale), so every pixel shows one screen, the clock and status-bar time run minute by minute (digits change like a real clock, no roll), reduced motion snaps screens and holds the clock, the rail star and the mobile hour-strip star are bound to p, and the phone's rim and shadow catch the hour's light (--sky-glow).
