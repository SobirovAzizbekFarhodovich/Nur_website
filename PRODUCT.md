# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People in Uzbekistan who hear about Noorain (from Telegram, friends, a mosque circle) and land on noorain.uz to understand what the app is before installing it. A broad Muslim audience of every age, including older people who are not confident with smartphones, reading Uzbek (Latin or Cyrillic), Russian or English, mostly on a phone.

Secondary: Google Play reviewers and careful users who need the privacy policy, terms and account-deletion instructions.

## Product Purpose

noorain.uz is the public home of the Noorain Android app (نورين, "two lights"): it explains what the app does, earns trust, and moves visitors to the Noorain Telegram channel, which is where release news and download links live while the app is not yet on Google Play. It also hosts the legal pages the store requires.

## Positioning

A lock-screen-first Quran companion in the user's own language: an ayah with its translation reaches the user on the lock screen every hour without opening the app. Behind it sits an Islamic AI assistant whose answers are grounded in a curated library of Quran, hadith and dua sources, and a recitation checker that follows the reader word by word, recognises which ayah they are reciting, and marks skipped words, wrong words and harakat slips.

## Operating Context

- The app's most used features are the AI assistant, the lock-screen ayah wallpaper and recitation (tilovat) checking. Also: offline Quran reader (Uzbek Latin/Cyrillic bundled, Russian/English downloadable), translator's footnotes (Shaykh Muhammad Sodiq Muhammad Yusuf, QuranEnc), bookmarks, reminders, memorization mode, daily goal and streak, spaced review.
- Sign-in with internet is required on first use; afterwards reading, search, bookmarks, wallpaper and reminders work offline. AI chat and recitation need the server.
- Primary call to action: join the Noorain Telegram channel. The app is not on Google Play or the App Store yet; no store badges or direct APK download on the site.
- Site languages: Uzbek Latin (default), Uzbek Cyrillic, Russian, English, with a language switcher.
- Pages: landing, privacy policy (/privacy), terms of use (/terms), account deletion (/delete-account).

## Capabilities and Constraints

- Existing codebase: Vite + React 19 with plain CSS (src/index.css); originally generated with Figma Make. Deployed as static files by nginx on the Noorain server (`deploy/deploy-website.sh` in the app repo) at noorain.uz / www.noorain.uz; the API lives at api.noorain.uz.
- Must load fast on mid-range Android phones over mobile data.
- Open decision: the Telegram channel URL (kept in one config constant until the owner provides it).
- Data facts for the legal pages: account (name, email, chosen language), AI chat questions sent to the server for answers, recitation audio streamed to the server for checking and not stored, recitation history (per-ayah word counts) backed up to the account, recitation recordings stored only when the user sends a "wrong result" report with consent, lock-screen wallpaper rendered on the device. Account deletion removes the account and its data (cascade).

## Brand Commitments

- Name: **Noorain** (نورين, "two lights"). The old "Islamic AI" name on the current site is retired.
- Religious respect: Quran text is never decorated, cropped or shown carelessly; no imagery of living beings.
- The app's visual world (deep green, gold, geometric ornament, executed at full craft; craft bar Muslim Pro, Quran.com, Tarteel, Hidoyat/Quranify) is the owner's standing preference; the app repo's DESIGN.md and brand/ hold it. The site must feel like the same product.
- Owner's reference for the site's level of craft: tarteel.ai.
- Standing preference (owner, 2026-10-15): the site looks like the category's best product pages, tarteel.ai and apple.com: light, clean, large type, cinematic hero and highlight cards. Noorain green and gold are accents, not the ground. Organise it by features and what the user gains, not by times of day.

## Evidence on Hand

- Brand and logo assets: /home/sobirov/quran_reminder/v0-quran-lock-screen/brand/ and the app's DESIGN.md, `.impeccable/design.json`.
- Real app screenshots can be captured from the owner's phone (debug build) on request.
- Lock-screen background images in the app repo (`app/src/main/res/drawable-nodpi/bg_local_*.png`).
- No user testimonials, ratings, download counts, scholar endorsements or press exist; none may be invented.

## Product Principles

1. The ayah comes first: show the Quran with dignity, not as decoration.
2. Say what the app really does, in plain words, in the visitor's language.
3. One obvious next step: the Telegram channel.
4. Trust through honesty: AI answers cite sources and are not fatwas; data handling is stated plainly.
5. Light and fast on an ordinary phone.

## Accessibility & Inclusion

Older visitors are a core audience: readable type sizes, strong contrast, large tap targets, no information carried by color alone, and motion that respects `prefers-reduced-motion`.
