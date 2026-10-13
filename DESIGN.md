---
name: Noorain (noorain.uz)
description: The Noorain app's world of mosque green, antique gold and warm paper, set on a page whose ground is the colour of the hour.
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
  label-sm:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.04em"
  time:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.02em"
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
---

# Design System: Noorain (noorain.uz)

## Overview

**Creative North Star: "One Day Under the Sky"**

The site is the Noorain app's world (mosque green, antique gold, warm paper, the eight-point star) carried onto the open web, with one addition the app does not have: the page ground is a sky. The landing page is a single day; each hour paints the whole viewport in its own gradient (dawn indigo into amber, misty morning green, pale midday mist, dusk brown-gold, star-flecked mosque-green night) and the layers cross-fade as the visitor scrolls. Nothing is boxed on that sky. Headings, prose and the gold pill sit directly on it, and the only object is the near-black phone, which holds the app's real screens and lock-screen renderer.

Density is low and the voice is calm: one heading, one paragraph and at most one action per hour, a 34rem text column, and a lot of sky. Type is the app's pairing, PT Serif for headings and Golos Text for everything else, with Amiri Quran reserved for scripture. Ornament is limited to the eight-point star and gold hairlines.

The legal pages are the Read mode of the same world: the app's green band (with the logo mark tiled faintly down its right edge) over a paper page, a 46rem column, and green as the selected state.

**Key Characteristics:**
- The ground is the hour: full-bleed sky gradients, cross-faded, never a flat dark hero.
- One object on the sky: the phone, sticky on desktop, inline under each hour on mobile.
- Gold is a hairline, a star, a time and one pill; green is a band and a selected state.
- PT Serif headings at -0.02em, Golos Text body, Amiri Quran only for the Quran.
- The eight-point star is the only ornament, and the only marker on the time rail.

## Colors

The app's palette, plus a family of hour skies that exist only as gradients.

### Primary
- **Antique Gold** (gold): the one filled action on dark grounds (the Telegram pill), the selected language segment, the skip link, the rail and strip star, and the mic frame inside the phone.
- **Gold Light** (gold-light): gold on dark: active time, text links, header Telegram outline, focus ring, lock-screen reference line, button hover fill. Its translucent forms (12-40% alpha) are the site's hairlines.
- **Gold Ink** (gold-ink): gold on light grounds: the active rail time on the noon sky, legal list markers, the ayah-end mark in the recitation demo.
- **Gold Pale** (gold-pale): text selection and the current-word highlight in the recitation demo.

### Secondary
- **Mosque Green** (green) and **Mosque Green Deep** (green-deep): the legal band gradient (green to green-deep), the selected legal tab, link colour and focus colour on paper, the in-phone status bar and app band; green-deep is the text colour on every gold fill.

### Neutral
- **Night** (night) / **Night Deep** (night-deep): the base ground behind the skies and FAQ; night-deep is the footer.
- **Header Night** (header-night): the solid header and mobile hour strip (the scrolled header uses it at 97% with a 16px blur).
- **Text on Sky** (text-on-sky) / **Muted on Sky** (muted-on-sky): headings and supporting prose on every dark sky.
- **Day Ink** (day-ink) / **Day Muted** (day-muted): the same two roles while the pale noon sky is showing.
- **Paper** (paper), **Paper Raised** (paper-raised), **Hairline** (hairline), **Ink** (ink), **Ink Muted** (ink-muted): the legal pages and the app screens inside the phone.

### Semantic (inside the phone only)
- **Success** (success) and **Harakat Amber** (harakat): correct words and harakat slips in the recitation demo, always paired with a legend dot and a count, never colour alone.

### Hour skies
Each is a linear base plus a radial glow, defined in the sidecar: dawn (#0B1626 to #5E3536 with an amber glow low right), morning (#17372F to #355A4B with a faint gold glow top right), noon (#E7ECE6 to #C9D7CE with a paper-white glow), dusk (#1D1716 to #4D3018 with an amber glow low left), night (#03120D to #0A3022 with fifteen 1-1.4px stars), and late night (night plus a gold glow from below).

### Named Rules
**The Sky Is the Surface Rule.** The landing page's ground is the hour's gradient, full-bleed and cross-faded over 1.4s. No card, panel or section fill sits on the sky; the FAQ and footer return to flat night only after the day has ended.

**The One Gold Fill Rule.** Gold fills exactly three things on a dark ground: the Telegram pill, the selected language segment and the skip link. Every other gold is a hairline, a star, a time or text. This deliberately relaxes the app's Gold Is a Line Rule for the site's single call to action.

**The Gold Keeps Its Contrast Rule.** On dark grounds gold text is gold-light; on paper or the noon sky it is gold-ink. Never antique gold as text on a light ground.

**The Noon Flip Rule.** While the noon sky is active, story text switches to day-ink and day-muted and the rail's active time to gold-ink; the phone's shadow shifts to a green tint.

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
- **Lede**: the one paragraph under each hour's heading, muted, max 62ch.
- **Body / Body-legal**: base text (17px) and legal prose (line-height 1.7, max 68ch).
- **Note**: support lines under actions, footer tagline, updated date.
- **Label / Label-sm**: button text; language segments with 0.04em tracking.
- **Time**: rail and hour-strip times, tabular numerals.
- **Caption**: the line under the phone, 0.02em tracking.
- **Quran**: Arabic on the lock screen and in the recitation demo, line-height 2 (2.25 in the demo card), right-aligned.

### Named Rules
**The Untouched Scripture Rule.** Arabic is set only in Amiri Quran at weight 400: never bold, never letter-spaced, never truncated, never overlaid with ornament. A soft text shadow is allowed only where it sits on a wallpaper.

**The Subtitle-Below Rule.** A heading may be followed by a lede or note; nothing is set above it. No eyebrows or kickers.

## Layout

The landing page is a two-column scroll story inside a 1240px container with gutter padding: a flexible text column (scene text max 34rem, the first hour 38rem) and an auto-width device column. Each hour is a scene at least one viewport tall (120px top, 80px bottom), vertically centred. The device column is sticky for the full viewport: the phone, its caption beneath, and the time rail (64px per hour) to its right with a single gold 1px gradient line and the star marker.

Inactive scenes dim their text to 38% opacity on desktop; the scene at the viewport's middle 4% band is the active hour.

Responsive behaviour:
- **Up to 1100px**: the rail becomes a fixed six-column hour strip under a 64px solid header (header-night with a gold hairline), the star sliding under the active time; the phone shrinks (--pw clamp 200-270px, rail step 56px).
- **Up to 900px**: single column; the sticky device is removed and each scene carries its own inline phone, centred below its text (--pw min(272px, 74vw); 240px in the first scene). The header Telegram link collapses to a 40px icon circle; FAQ rows and footer stack.
- **Up to 420px**: buttons go full width; the large CTA wraps to a 60px minimum height.

The phone width (--pw) is derived from viewport height so the whole device fits on short laptop screens. The FAQ uses a 5fr/7fr question/answer grid at section-y padding; the footer is a two-column grid on night-deep. Legal pages use a 46rem column with 128px top padding in the band to clear the fixed header.

## Elevation & Depth

Flat by default. Separation comes from gold hairlines at low alpha (the header's 1px rule, FAQ row rules at 18%, the footer copyright rule at 12%) and from the sky changing behind the content. Only two objects cast shadows: the phone and the gold pill.

### Shadow Vocabulary
- **Phone** (`box-shadow: 0 0 0 1px rgba(255,255,255,0.09) inset, 0 0 0 2px rgba(0,0,0,0.5) inset, 0 40px 80px -30px rgba(0,0,0,0.75), 0 18px 36px -18px rgba(0,0,0,0.6)`): the device bezel and its drop; on the noon sky the drop is green-tinted (rgba(20,40,30,0.45/0.35)).
- **Pill rest** (`box-shadow: 0 10px 28px -14px rgba(0,0,0,0.7)`) and **pill hover** (`0 16px 32px -14px rgba(0,0,0,0.75)`, with a 1px lift).
- **Header rule** (`box-shadow: 0 1px 0 rgba(230,204,126,0.14)`): the solid header and hour strip.
- **Star glow** (`filter: drop-shadow(0 0 6px rgba(230,204,126,0.55))`): the rail and strip star only.

### Named Rules
**The One Object Rule.** The phone is the only thing on the page with physical depth. Text and controls stay flat on the sky.

## Shapes

Every control is a full pill (999px): the CTA, the header Telegram link, the language switch and its segments, legal tabs, the skip link. The phone is a 48px-radius bezel around a 38px-radius screen at the app's real 1080:2412 aspect ratio. Focus rings are 2px gold-light with a 3px offset and a 6px radius (green on the legal page).

The second shape language is geometric: the eight-point star (two interlaced squares) is the rail marker, the hour-strip marker, the centre of the lock screen's gold rule and the recitation mic frame; the logo mark is the only other ornament, tiled at 7% on the legal band.

## Components

### Buttons
- **Shape:** full pill (999px), Telegram glyph SVG at 1.25em with a 10px gap.
- **Primary:** antique gold with green-deep text, 56px tall, 28px side padding, Golos Text 600 at 17px; the closing hour uses the big variant (64px, 34px padding, 19px text).
- **Hover / Focus:** fill lightens to gold-light, lifts 1px, shadow deepens; 0.25s on the house ease. Gold-light focus ring.
- **Text link:** gold-light, underlined at 40% gold with a 6px offset, full underline on hover; sits beside the primary pill at the same 56px height.
- **Header link:** 40px outline pill (gold-light at 40% border), gold-light text, 12% gold wash on hover.

### Language switch
A 3px-padded pill track with a 28% gold border holding four 34px segments (UZ, ЎЗ, RU, EN). Unselected segments are muted-on-sky and brighten on hover; the selected one is filled gold with green-deep text and exposed through `aria-pressed`.

### Navigation
- **Header:** fixed, transparent over the dawn sky, turning header-night at 97% with a 16px blur and gold hairline after 24px of scroll (always solid at 1100px and below and on legal pages). Mark at 36px plus the PT Serif 700 wordmark at 1.5rem.
- **Time rail (desktop):** six tabular times, muted until active, gold-light when active, with the star sliding 0.9s between them.
- **Hour strip (1100px and below):** the rail's small-screen form, six equal buttons in a 560px track with the star beneath the active hour.
- **Legal tabs:** paper-raised pills with a hairline border, gold border on hover, mosque green fill for the current page.

### The phone (signature component)
A near-black gradient bezel holding stacked screens that cross-fade (opacity 0.7s, a 6px blur clearing, scale from 1.02). It shows the app's lock-screen renderer (wallpaper, shade gradient, date, clock whose digits roll in over 0.75s, Arabic, a gold rule with the star, translation, gold-light reference), real app screenshots under a drawn green status bar, and a recitation demo in the app's own components. Screen internals size in container units (cqi) so the phone scales as one object. A caption sits 16px below it.

### FAQ rows
A definition list: PT Serif question beside a muted Golos answer (max 62ch), separated by 18% gold hairlines with 28px vertical padding.

### Legal band
Green to green-deep vertical gradient, logo mark tiled at 7% down the right edge, a gold-light back link with arrow, the legal headline and an updated note.

## Do's and Don'ts

### Do:
- **Do** let the hour's sky be the page ground and set text directly on it.
- **Do** keep the phone the only raised object, and show real app screens or the app's own renderer inside it.
- **Do** use gold-light for gold on dark and gold-ink for gold on paper or the noon sky.
- **Do** make every control a full pill and every ornament the eight-point star.
- **Do** keep one action per hour at most: the gold Telegram pill, optionally with one gold text link.
- **Do** set Arabic only in Amiri Quran at line-height 2, right-aligned, unbolded and untracked.
- **Do** use the house ease (cubic-bezier(0.16, 1, 0.3, 1)) for every transition and let `prefers-reduced-motion` collapse them.
- **Do** keep tap targets at least 40px (34px for language segments) and body text at 17px.

### Don't:
- **Don't** put cards, panels or a feature grid on the sky.
- **Don't** fill anything else with gold beyond the Telegram pill, the selected language and the skip link.
- **Don't** place eyebrows or kickers above headings.
- **Don't** add ornament beyond the eight-point star and the logo mark, or any imagery of living beings.
- **Don't** decorate, crop, bold, track or overlay ornament on Quran text.
- **Don't** use emoji or text glyphs as icons; icons are inline SVG at 1.25em.
