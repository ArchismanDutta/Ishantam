# Ishantam homepage redesign

The homepage uses a traditional temple-invitation direction: ivory paper, vermilion booking buttons, restrained borders and compact typography. All canonical English/Hindi content and prices remain in the unchanged `data/content.ts` and `data/ishantam.ts` files. The Shiva/mandala door entry is retained.

Hindi is the default in both server-rendered markup and client state. Language choices made after this update are remembered under `ishantam-locale-v2`. A full-screen button makes a double-click anywhere on the entry open the homepage; a single click does not dismiss it. Enter/Space and Escape work too. Focus and scrolling are restored on exit. The automatic transition and replay remain available.

The hero explicitly presents Mangal Bhat Puja & Mangal Dosha Shanti Puja, the existing starting price and all three package prices, plus the booking and WhatsApp actions. Its original temple photograph and caption are retained below the banner. The rest of the page uses smaller headings, clear package choices, compact ceremony/ritual sections, faint existing Ganesha and Shiva/Nandi background images, and a more legible registration form.

Hero artwork: `public/images/mangalnath-puja-art.webp`, 1024×1536, generated with the built-in Image Generation tool and optimized as WebP. The original is retained in the tool's generated-images folder. This is a traditional-style devotional illustration, not a photograph of the temple or its idol. The source is imported in `Hero.tsx` so Next emits a versioned asset URL. Full generation prompt: `docs/mangalnath-banner-prompt.txt`.

The Shiva/Mangalnath iconography follows the [District Ujjain description of Mangalnath](https://ujjain.nic.in/en/tourist-place/mangalnath/). No temple affiliation or visitor statistics were added. The existing `artwork/source-png` assets have corresponding local WebP versions; Shiva/Nandi and Ganesha are used at approximately 4.5% opacity as background decoration.

Verification: TypeScript and production build passed; desktop Chrome confirmed the banner image loads and the layout is visible. A 375-pixel mobile preview was inspected and the mobile banner was subsequently tightened to place artwork beside the price/action. Package and form functionality are retained; no real booking, message or payment was submitted. WhatsApp still depends on the project's existing empty `brand.whatsappNumber` configuration, and no booking endpoint was added as part of this visual change.
