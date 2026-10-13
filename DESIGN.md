---
name: Noorain (noorain.uz)
description: The Noorain app's world of mosque green, antique gold and warm paper, set on a page whose ground is a living sky that keeps the hour.
colors:
  green: "#0E3B2E"
  green-deep: "#082A20"
  night: "#07211A"
  night-deep: "#041611"
  header-night: "#051812"
  gold: "#C9A646"
  gold-light: "#E6CC7E"
  gold-pale: "#F3E6BF"
  gold-ink: "#8E6F1C"
  paper: "#F6F2E8"
  paper-raised: "#FFFDF8"
  hairline: "#DCCFAE"
  ink: "#1B2620"
  ink-muted: "#55615A"
  text-on-sky: "#F3EEDF"
  muted-on-sky: "#C9DCD2"
  day-ink: "#14211B"
  day-muted: "#3B4A42"
  success: "#2E7D5B"
  harakat: "#C77A1F"
  white: "#FFFFFF"
  black: "#000000"
  lock-ground: "#0B1210"
typography:
  display:
    fontFamily: "PT Serif, Georgia, serif"
    fontSize: "clamp(2.5rem, 1.5rem + 3.4vw, 4.375rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "PT Serif, Georgia, serif"
    fontSize: "clamp(2.125rem, 1.4rem + 2.4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  headline-section:
    fontFamily: "PT Serif, Georgia, serif"
    fontSize: "clamp(2rem, 1.4rem + 2vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline-legal:
    fontFamily: "PT Serif, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.6rem + 2.4vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "PT Serif, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.3
  title-legal:
    fontFamily: "PT Serif, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  lede:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-legal:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  note:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1
  label-lg:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1
  label-lg-narrow:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
  label-sm:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.04em"
  lede-legal:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.65
  fine:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
  time:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.02em"
    fontFeature: "tnum"
  time-sm:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1
    fontFeature: "tnum"
  caption:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    letterSpacing: "0.02em"
  quran:
    fontFamily: "Amiri Quran, Amiri, serif"
    fontWeight: 400
    lineHeight: 2
rounded:
  full: "999px"
  device: "48px"
  device-screen: "38px"
  focus: "6px"
  card-in-phone: "6cqi"
  word: "4px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  gutter: "clamp(16px, 5vw, 64px)"
  section-y: "clamp(72px, 10vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.green-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.gold-light}"
    textColor: "{colors.green-deep}"
  button-primary-big:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.green-deep}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: "0 34px"
    height: "64px"
  button-outline-header:
    textColor: "{colors.gold-light}"
    rounded: "{rounded.full}"
    padding: "0 16px"
    height: "40px"
  text-link:
    textColor: "{colors.gold-light}"
    typography: "{typography.label}"
    height: "56px"
  lang-segment:
    textColor: "{colors.muted-on-sky}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    height: "34px"
  lang-segment-selected:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.green-deep}"
  legal-tab:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  legal-tab-current:
    backgroundColor: "{colors.green}"
    textColor: "{colors.paper-raised}"
  phone:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.device}"
    padding: "10px"
  lock-screen:
    backgroundColor: "{colors.lock-ground}"
    textColor: "{colors.white}"
    rounded: "{rounded.device-screen}"
  phone-statusbar:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
  recite-card:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card-in-phone}"
    padding: "4cqi 4.5cqi 3cqi"
  recite-word-current:
    backgroundColor: "{colors.gold-pale}"
    textColor: "{colors.ink}"
    rounded: "{rounded.word}"
---


# Design System: Noorain (noorain.uz)

## Overview

**Creative North Star: "One Day Under the Sky"**

The site is the Noorain app's world (mosque green, antique gold, warm paper, the eight-point star) carried onto the open web, with one addition the app does not have: the page ground is a sky. The landing page is a single day, and the sky is alive: a canvas drawn from the scroll position, its colours interpolating between six hour keys (dawn indigo into amber, misty morning green, pale midday mist, gold dusk, mosque-green night, late night). A sun climbs out from behind a low ridge, crosses the open gap between the copy and the phone, and sets on the far ridge with its rim lit; after dusk a crescent moon rises in the same gap, stars come out and twinkle, and the app's eight-point star lattice glows faintly over the night. Nothing is boxed on that sky. Headings, prose and the gold pill sit directly on it, and the only object is the near-black phone, which holds the app's real screens and lock-screen renderer and catches the light of the hour on its rim.

Density is low and the voice is calm: one heading, one paragraph and at most one action per hour, a 34rem text column, and a lot of sky. The story holds still while an hour's text is being read and moves only between hours: the clock runs minute by minute, the incoming screen wipes up over the outgoing one, and the rail star travels with the scroll. Type is the app's pairing, PT Serif for headings and Golos Text for everything else, with Amiri Quran reserved for scripture. Ornament is limited to the eight-point star and gold hairlines.

The legal pages are the Read mode of the same world: the app's green band (with the logo mark tiled faintly down its right edge) over a paper page, a 46rem column, and green as the selected state.

**Key Characteristics:**
- The ground is the hour: a living, full-bleed sky drawn from the scroll position, never a flat dark hero.
- The sun and moon keep to open sky: their path is measured from the layout, so they never pass behind the phone, the rail or the copy.
- The story holds on each hour while its text is read, and moves only in the gaps between hours.
- One object on the sky: the phone, sticky on desktop, inline under each hour on mobile; its rim takes the hour's light.
- Gold is a hairline, a star, a time and one pill; green is a band and a selected state.
- PT Serif headings at -0.02em, Golos Text body, Amiri Quran only for the Quran.
- The eight-point star is the only ornament: the rail marker, and at night a faint lattice in the sky.

## Colors

The app's palette, plus six hour keys that exist only inside the sky canvas.

### Primary
- **Antique Gold** (gold): the one filled action on dark grounds (the Telegram pill), the selected language segment, the skip link, the rail and strip star, and the mic frame inside the phone.
- **Gold Light** (gold-light): gold on dark: active time, text links, header Telegram outline, focus ring, lock-screen reference line, button hover fill, and the stroke of the night sky's star lattice. Its translucent forms (12-40% alpha) are the site's hairlines.
- **Gold Ink** (gold-ink): gold on light grounds: the active rail time under a pale sky, legal list markers, the ayah-end mark in the recitation demo.
- **Gold Pale** (gold-pale): text selection, the current-word highlight in the recitation demo, and the crescent moon and its halo.

### Secondary
- **Mosque Green** (green) and **Mosque Green Deep** (green-deep): the legal band gradient (green to green-deep), the selected legal tab, link colour and focus colour on paper, the in-phone status bar and app band; green-deep is the text colour on every gold fill.

### Neutral
- **Night** (night) / **Night Deep** (night-deep): the ground under the sky canvas and behind the FAQ; night-deep is the footer.
- **Header Night** (header-night): the solid header and mobile hour strip (the scrolled header uses it at 97% with a 16px blur).
- **Text on Sky** (text-on-sky) / **Muted on Sky** (muted-on-sky): headings and supporting prose on every dark sky; text-on-sky is also the colour of the sky's stars.
- **Day Ink** (day-ink) / **Day Muted** (day-muted): the same two roles while the sky is pale.
- **Paper** (paper), **Paper Raised** (paper-raised), **Hairline** (hairline), **Ink** (ink), **Ink Muted** (ink-muted): the legal pages and the app screens inside the phone.

### Phone neutrals (inside the device only)
- **White** (white): lock-screen date, clock and translation, status-bar text, and the mic glyph: the app's own white on its own grounds. Translucent white is the phone's inner rim light (6% at rest, mixed toward the hour's glow).
- **Black** (black): the lock-screen shade, a vertical black wash at 32/12/42/50/25% that keeps the white text legible over any wallpaper; also the bezel's 2.5px inner ring (50%), the phone's drop shadows and the soft text shadows on the lock screen.
- **Lock Ground** (lock-ground): the lock screen's base under its wallpaper.

### Semantic (inside the phone only)
- **Success** (success) and **Harakat Amber** (harakat): correct words and harakat slips in the recitation demo, always paired with a legend dot and a count, never colour alone.

### Hour keys
The sky has six keys, one per hour, each a top/mid/low gradient plus a glow colour and strength (values in the sidecar): dawn (indigo to plum, amber glow), morning (teal-green, pale gold glow), midday mist (pale green-white, paper-white glow), gold dusk (brown to burnt orange, amber glow), night (near-black mosque green, faint gold), late night (deeper, with a stronger gold glow from below). Within each hour the colour eases (smoothstep 0.15-0.85) so it settles while a scene is read. The sun is warm through the morning (#FF9A4D to #FFD27A), near-white at noon (#FFF7E6) and warm again at dusk; the ridge rim it lights is #FFC27A.

### Named Rules
**The Sky Is the Surface Rule.** The landing page's ground is the living sky, full-bleed and fixed behind the story. No card, panel or section fill sits on it; the FAQ and footer return to flat night only after the day has ended.

**The Open Sky Rule.** The sun and moon travel only through sky that is empty: their path is computed from the measured gap between the copy and the phone, and where no gap exists (phones, narrow screens) they are drawn at 35% so text over them stays legible.

**The One Gold Fill Rule.** Gold fills exactly three things on a dark ground: the Telegram pill, the selected language segment and the skip link. Every other gold is a hairline, a star, a time or text. This deliberately relaxes the app's Gold Is a Line Rule for the site's single call to action.

**The Gold Keeps Its Contrast Rule.** On dark grounds gold text is gold-light; on paper or a pale sky it is gold-ink. Never antique gold as text on a light ground.

**The Luminance Flip Rule.** When the relative luminance of the sky's mid colour passes 0.19 (the WCAG crossover where dark text out-contrasts light), the page enters day: story text switches to day-ink and day-muted, rail times to ink at 72% with the active one in gold-ink, and the phone's drop turns green-tinted with a paper-white rim and glow. Below 0.19 it flips back. The flip is computed, never tied to a scene.

## Typography

**Display Font:** PT Serif (with Georgia, serif)
**Body Font:** Golos Text (with system-ui, sans-serif)
**Scripture Font:** Amiri Quran (with Amiri, serif)

**Character:** A bookish Cyrillic-capable serif for every heading, a clear humanist sans for everything read or tapped. Headings are bold, tight (-0.02em) and balanced; prose is pretty-wrapped and capped at 62ch.

### Hierarchy
- **Display**: the first hour's H1 only.
- **Headline**: each later hour's heading.
- **Headline-section**: the FAQ heading. **Headline-legal**: the legal page title in the band.
- **Title**: FAQ questions (PT Serif). **Title-legal**: legal section headings.
- **Lede**: the one paragraph under each hour's heading, muted, max 62ch. **Lede-legal**: the legal page's opening paragraph (19px, line-height 1.65).
- **Body / Body-legal**: base text (17px) and legal prose (line-height 1.7, max 68ch).
- **Note**: support lines under actions, footer tagline, updated date.
- **Fine**: the footer copyright line (14px).
- **Label / Label-sm**: button text; language segments with 0.04em tracking.
- **Label-lg**: the closing hour's big pill (19px), stepping down to **Label-lg-narrow** (16px) at 420px and below, where the pill goes full width and may wrap.
- **Time**: rail times, tabular numerals. **Time-sm**: the mobile hour strip (14px, muted-on-sky at 60%, gold-light when active).
- **Caption**: the line under the phone, 0.02em tracking.
- **Quran**: Arabic on the lock screen and in the recitation demo, line-height 2 (2.25 in the demo card), right-aligned.

### Named Rules
**The Untouched Scripture Rule.** Arabic is set only in Amiri Quran at weight 400: never bold, never letter-spaced, never truncated, never overlaid with ornament. A soft text shadow is allowed only where it sits on a wallpaper.

**The Subtitle-Below Rule.** A heading may be followed by a lede or note; nothing is set above it. No eyebrows or kickers.

**The Real Clock Rule.** Times on the phone change like a real clock: whole minutes, digits swapped in place, no roll or slide.

## Layout

The landing page is a two-column scroll story inside a 1240px container with gutter padding: a flexible text column (scene text max 34rem, the first hour 38rem) and an auto-width device column. Each hour is a scene at least one viewport tall (120px top, 80px bottom), vertically centred. The device column is sticky for the full viewport: the phone, its caption beneath, and the time rail (64px per hour) to its right with a single gold 1px gradient line and the star marker.

Inactive scenes dim their text to 38% opacity on desktop; the scene at the viewport's middle 4% band is the active hour.

**Scroll position as an hour.** The story is driven by one continuous value, p (0 = 05:12 … 5 = 22:30), exposed to CSS as `--p`. For each scene, the scroll range in which its text is fully on screen (below the header or hour strip) is measured; p holds on that hour's whole number throughout that range and moves only in the gaps between them, which are at least 120px. Everything time-bound reads p: the sky, the clock, the screen wipe, the rail star (`translateY(p × rail step)`) and the hour-strip star (`translateX(p × 100%)`).

**The sky's geometry.** The canvas is fixed full-viewport (device pixel ratio capped at 1.5). The horizon sits at 90% of the viewport height; two soft ridges (far at ~93%, near at ~98.5%) ground sunrise and sunset and melt into the mist at midday. The sun's disc radius is 3.4% of the shorter viewport side; on wide layouts its x-position is the gap between the right edge of the scene copy and the phone, kept one radius plus 16px clear of both. The star lattice is a 132px tile covering the top 75% of the sky.

Responsive behaviour:
- **Up to 1100px**: the rail becomes a fixed six-column hour strip under a 64px solid header (header-night with a gold hairline), the star sliding under the active time with p; the phone shrinks (--pw clamp 200-270px, rail step 56px).
- **Up to 900px**: single column; the sticky device is removed and each scene carries its own inline phone, centred below its text (--pw min(272px, 74vw); 240px in the first scene). No measured gap exists, so the sun and moon draw at 35% on a fixed path and stars do not twinkle. The header Telegram link collapses to a 40px icon circle; FAQ rows and footer stack.
- **Up to 420px**: buttons go full width; the large CTA wraps to a 60px minimum height.

The phone width (--pw) is derived from viewport height so the whole device fits on short laptop screens. The FAQ uses a 5fr/7fr question/answer grid at section-y padding; the footer is a two-column grid on night-deep. Legal pages use a 46rem column with 128px top padding in the band to clear the fixed header.

## Elevation & Depth

Flat by default. Separation comes from gold hairlines at low alpha (the header's 1px rule, FAQ row rules at 18%, the footer copyright rule at 12%) and from the sky changing behind the content. The sky itself has atmospheric depth (halo, horizon glow, two ridges) but no shadows. Only two objects cast shadows: the phone and the gold pill.

### Shadow Vocabulary
- **Phone** (exact value in the sidecar): a 1.5px inner rim of the hour's glow colour (`--sky-glow`, mixed in at `--sky-glow-a`, 25-70%) over 6% white, a 2.5px black inner ring at 50%, a soft side glow of the hour's light (-18px -10px 90px -40px), and the two-layer black drop (`0 40px 80px -30px` at 75%, `0 18px 36px -18px` at 60%).
- **Phone under a pale sky**: the rim becomes paper-white at 55%, a wide paper-white glow (`0 30px 120px -40px`, 90%) replaces the side glow, and the drop turns green-tinted (rgba(20,40,30,0.45/0.35)).
- **Pill rest** (`box-shadow: 0 10px 28px -14px rgba(0,0,0,0.7)`) and **pill hover** (`0 16px 32px -14px rgba(0,0,0,0.75)`, with a 1px lift).
- **Header rule** (`box-shadow: 0 1px 0 rgba(230,204,126,0.14)`): the solid header and hour strip.
- **Star glow** (`filter: drop-shadow(0 0 6px rgba(230,204,126,0.55))`): the rail star; 5px at 60% on the strip star.

### Named Rules
**The One Object Rule.** The phone is the only thing on the page with physical depth. Text and controls stay flat on the sky.

**The Hour's Light Rule.** The phone's rim and side glow are lit by the sky, never by a fixed colour: they read `--sky-glow` and `--sky-glow-a`, which the scroll loop sets from the current hour's glow key.

## Shapes

Every control is a full pill (999px): the CTA, the header Telegram link, the language switch and its segments, legal tabs, the skip link. The phone is a 48px-radius bezel around a 38px-radius screen at the app's real 1080:2412 aspect ratio. Focus rings are 2px gold-light with a 3px offset and a 6px radius (green on the legal page).

Inside the phone, shapes follow the app and scale with the device in container units: the recitation card is softly rounded (6cqi) with a hairline border and an inner gold ring, the "sample" badge is a pill, and each word in the recitation demo carries a small 4px radius so its highlight reads as a marked word rather than a block.

The second shape language is geometric: the eight-point star (two interlaced squares) is the rail marker, the hour-strip marker, the centre of the lock screen's gold rule, the recitation mic frame and, at night, the sky's lattice (one star per 132px cell with quarter stars at the corners, gold-light 0.8px stroke at 5%); the logo mark is the only other ornament, tiled at 7% on the legal band. The crescent moon is cut with a second disc so its bite shows the sky behind it.

## Components

### Buttons
- **Shape:** full pill (999px), Telegram glyph SVG at 1.25em with a 10px gap.
- **Primary:** antique gold with green-deep text, 56px tall, 28px side padding, Golos Text 600 at 17px; the closing hour uses the big variant (64px, 34px padding, label-lg).
- **Hover / Focus:** fill lightens to gold-light, lifts 1px, shadow deepens; 0.25s on the house ease. Gold-light focus ring.
- **Text link:** gold-light, underlined at 40% gold with a 6px offset, full underline on hover; sits beside the primary pill at the same 56px height.
- **Header link:** 40px outline pill (gold-light at 40% border), gold-light text, 12% gold wash on hover.

### Language switch
A 3px-padded pill track with a 28% gold border holding four 34px segments (UZ, ЎЗ, RU, EN). Unselected segments are muted-on-sky and brighten on hover; the selected one is filled gold with green-deep text and exposed through `aria-pressed`.

### Navigation
- **Header:** fixed, transparent over the dawn sky, turning header-night at 97% with a 16px blur and gold hairline after 24px of scroll (always solid at 1100px and below and on legal pages). Mark at 36px plus the PT Serif 700 wordmark at 1.5rem.
- **Time rail (desktop):** six tabular times, muted until active, gold-light when active; the star is bound to p and travels continuously with the scroll, resting on each time while its hour is held.
- **Hour strip (1100px and below):** the rail's small-screen form, six equal buttons in a 560px track with the star beneath, also bound to p.
- **Legal tabs:** paper-raised pills with a hairline border, gold border on hover, mosque green fill for the current page.

### The sky (signature component)
A fixed canvas behind the story, redrawn on scroll from p and never between scrolls except for the twinkle. Layers, back to front: the hour's three-stop gradient, the night star lattice, 220 seeded stars (0.6-1.5px, fading in after dusk and out at dawn, twinkling ±25%), the sun's halo and disc, the horizon glow, the crescent moon with a gold-pale halo, the far ridge (its rim lit #FFC27A as the sun touches it), and the near ridge. The twinkle loop runs only when stars are visible, the viewport is at least 900px, the story is on screen and the tab is visible. Under reduced motion the sky still follows the scroll but the stars hold still.

### The phone (signature component)
A near-black gradient bezel holding every hour's screen stacked. It shows the app's lock-screen renderer (wallpaper, black shade, date, a live minute clock, Arabic, a gold rule with the star, translation, gold-light reference), real app screenshots under a drawn green status bar showing the same live time, and a recitation demo in the app's own components. Screen internals size in container units (cqi) so the phone scales as one object. A caption sits 16px below it.

- **Hour change (desktop):** in the middle of each gap (30-70% of it, smoothstep), the incoming screen is pulled up from the bottom edge over the outgoing one, a mask wipe with a 6% feathered seam; each pixel shows one screen, with no blur and no scale. Under reduced motion screens snap at the gap's midpoint and the clock holds each scene's time.
- **Clock:** runs minute by minute through the gap from one hour's time to the next, in the lock screen and every status bar at once.

### FAQ rows
A definition list: PT Serif question beside a muted Golos answer (max 62ch), separated by 18% gold hairlines with 28px vertical padding.

### Legal band
Green to green-deep vertical gradient, logo mark tiled at 7% down the right edge, a gold-light back link with arrow, the legal headline, an updated note and a lede-legal opening paragraph.

## Do's and Don'ts

### Do:
- **Do** let the hour's sky be the page ground and set text directly on it.
- **Do** derive every time-bound thing (sky, clock, screens, rail and strip stars) from the one scroll value p, and hold it still while an hour's text is being read.
- **Do** keep the sun and moon in measured open sky, and draw them at 35% wherever text may cross them.
- **Do** flip text to day-ink by the sky's computed luminance (0.19), not by which scene is showing.
- **Do** keep the phone the only raised object, light its rim from `--sky-glow`, and show real app screens or the app's own renderer inside it.
- **Do** use gold-light for gold on dark and gold-ink for gold on paper or a pale sky.
- **Do** make every control a full pill and every ornament the eight-point star.
- **Do** keep one action per hour at most: the gold Telegram pill, optionally with one gold text link.
- **Do** set Arabic only in Amiri Quran at line-height 2, right-aligned, unbolded and untracked.
- **Do** use the house ease (cubic-bezier(0.16, 1, 0.3, 1)) for CSS transitions and smoothstep for scroll-bound motion, and let `prefers-reduced-motion` snap screens, hold the clock and still the stars.
- **Do** keep tap targets at least 40px (34px for language segments) and body text at 17px.

### Don't:
- **Don't** put cards, panels or a feature grid on the sky.
- **Don't** blur or scale a phone screen while its hour's text is on screen; screens change only in the gaps.
- **Don't** fill anything else with gold beyond the Telegram pill, the selected language and the skip link.
- **Don't** place eyebrows or kickers above headings.
- **Don't** add ornament beyond the eight-point star and the logo mark, or any imagery of living beings. The sky's own bodies (sun, moon, stars, ridges) are the ground, not ornament.
- **Don't** decorate, crop, bold, track or overlay ornament on Quran text.
- **Don't** use emoji or text glyphs as icons; icons are inline SVG at 1.25em.
