# Sacred walk: production handoff

Current direction: the user replaced the Brahma/walking-film brief with the exact Shiva-and-mandala section from `j/Jyotirling/client/src/components/home/HeroSection.jsx`. The opening in `components/ishantam/TempleEntry.tsx` now reveals those original PNG assets on a dark background, with warm backlight and rays, the original 40-second mandala rotation, 6-second Shiva float and 3-second glow. It holds, then fades into the existing Ishantam homepage after approximately 9.6 seconds. It runs on each page load and supports replay, pause, Escape, keyboard focus restoration and reduced motion.

Original assets are copied byte-for-byte into `public/images/jyotirling/`; no generated replacement artwork or walking video is used for this entry. Desktop Chrome visual inspection confirmed the composition and automatic transition back to the website. TypeScript, the production build and focused ESLint checks passed. Mobile framing is implemented in CSS but was not visually verified in this pass.

The remaining document records the earlier film brief for historical context; it is superseded by the Shiva/mandala direction above.

## Approved story

User confirmed Brahma as the opening creator figure on 27 October 2026. The closed doors are the first visual. They open over four seconds onto Brahma, who begins a slow forward walk. Each subsequent footfall changes the figure into another deity without resetting the gait or camera. No lineup, slideshow, floating cutout, duplicate body, or camera whip.

The ten forms below are a curated selection associated with Ujjain temples, not a verified popularity ranking. Some are distinct forms of the same deity. Brahma is the prologue, not one of the ten.

| Film time | Figure | Ujjain association |
| --- | --- | --- |
| 0.0 | Brahma | Creator prologue |
| 2.4 | Mahakaleshwar | Mahakaleshwar Jyotirlinga |
| 4.8 | Kal Bhairav | Kal Bhairav Mandir |
| 7.2 | Maa Harsiddhi | Harsiddhi Shaktipeeth |
| 9.6 | Maa Gadkalika | Gadkalika Mandir |
| 12.0 | Mangalnath | Mangalnath Mandir; depict the Shiva form, not a generic Mars warrior |
| 14.4 | Gopal Krishna | Dwarkadhish Gopal Mandir |
| 16.8 | Shri Rama | Rama–Janardana Mandir |
| 19.2 | Janardana Vishnu | Rama–Janardana Mandir |
| 21.6 | Shri Hanuman | Hanuman shrine at Gadkalika Mandir |
| 24.0 | Shani Dev | Navagraha Mandir, Triveni |

Source: [District Ujjain, Places of Interest](https://ujjain.nic.in/en/places-of-interest/), [Ujjain Smart City, Religious Attraction](https://ujjainsmartcity.com/en/religious-attraction/). These support temple associations, not visitor rankings. The walking transformations are an artistic sequence, not a claim that scriptures prescribe this order or these transformations.

## Film brief

Use `public/images/brahma-sanctuary.webp` as the opening reference. Generate genuine subject motion: alternating weight-bearing feet, heel lift and toe-off, knee flexion, subtle pelvis/shoulder counter-rotation, trailing garments and hair, stable contact shadows. Keep both feet visible. Start with Brahma standing, then walking straight toward the lens, camera tracking backward at his speed. Maintain the same framing, stone sanctuary, lens, horizon, lighting direction, head scale and floor-contact plane throughout. No scaling a still image to simulate walking.

Live-action mythological cinema, respectful and dignified, natural skin and heavy woven cloth, worn stone, brass oil lamps, warm backlight and cool dark shadows. Preserve recognizable iconography, coherent faces, hands and deity-specific attributes. Review each form before acceptance, especially Brahma's faces and arms, Shiva's attributes, and the goddess transitions. Avoid horror imagery and invented temple-specific claims.

Build matched transition shots using the prior accepted last frame as the next start reference. On each footfall, transition from the outgoing form to the next, preserving the same planted foot, forward momentum and silhouette alignment. Alternate left/right footfalls. Do not restart a walk cycle at each cut. If multi-shot generation fails continuity, generate and edit individual transition pairs; do not present an unreviewed long generation as finished.

Target: 27.6-second, 24 fps, 1920×1080 master; H.264 MP4 with `yuv420p` and fast-start metadata, muted (no spoken narrative), modest web bitrate. The first frame must match the poster. Film time zero begins after the web doors finish opening. If accepted footfalls differ from the proposed times, update `sacredChapters` to actual frame times. The final form holds before the website fades in. A portrait master can be added later; the current mobile player contains the entire wide frame to preserve feet and attributes.

## Integration

1. Generate and visually review the film using a connected video service. Runway was discovered but not connected during implementation.
2. Save the reviewed master as `public/videos/sacred-walk.mp4`.
3. Add reviewed film playback to `components/ishantam/TempleEntry.tsx`, using `/videos/sacred-walk.mp4`. Do not enable it before the file exists.
4. Implement chapter times at the verified footfalls above. Derive the chapter and progress from the actual video playhead, so buffering and pauses cannot advance the labels.
5. Test normal playback, autoplay rejection, buffering, invalid media, pause/resume, hidden-tab behavior, Escape, keyboard focus, replay, reduced motion, desktop and portrait framing. Run `npm run typecheck` and `npm run build`.

The restored opening pauses when the tab is hidden, includes immediate website entry, restores page focus and scrolling, and can replay from the homepage. It has no session-based skip. Reduced motion presents the doorway without animation and lets the visitor enter manually. The film playback path still needs implementation and validation when the footage exists.

## Opening image provenance

Generated with the built-in Image Generation tool. Source copied and optimized to `public/images/brahma-sanctuary.webp` (1672×940, approximately 302 KB). Full generation prompt is recorded in `docs/brahma-image-prompt.txt`. This is concept artwork, not a photograph of a real temple or a video.
