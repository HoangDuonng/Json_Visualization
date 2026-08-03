# Editorial Design Contract

Use this reference when implementing or reviewing public UI. It is a design contract, not a requirement to copy Amp's exact source, content, or branding.

## Direction

Build an editorial developer-tool interface with a calm, premium, technical voice:

- near-black primary text on a quiet light background;
- one restrained accent color used for actions and emphasis;
- muted metadata and secondary text;
- generous vertical rhythm;
- narrow reading measure for documentation and articles;
- clear alignment between eyebrow, heading, copy, metadata, and actions;
- thin dividers and subtle borders instead of card-heavy decoration;
- small, deliberate motion and crisp hover/focus states.

Avoid generic SaaS styling: purple gradients, excessive rounded cards, noisy dot grids, decorative glass panels, competing accent colors, oversized icon tiles, and arbitrary animation.

## Typography

Define the public type scale in one shared token location. Use the exact chosen family consistently; do not mix arbitrary Mantine sizes with page-local values.

Recommended roles:

| Role | Guidance |
| --- | --- |
| Display | Large, compact, confident; use sparingly for hero/page titles |
| Page title | Strong hierarchy with restrained line length |
| Section title | Clear but subordinate to the page title |
| Body | Comfortable reading size and line-height |
| Metadata | Small, muted, optionally uppercase with tracking |
| Code | `MONO_FONT_FAMILY` only |

Use fluid sizing where useful, but keep a small predictable scale. Keep prose around a readable measure rather than stretching text across the viewport.

The public typography must not leak into:

- Monaco and editor content;
- JSON/YAML/XML/CSV previews;
- code blocks and inline code;
- JsonDraw and graph labels;
- toolbar or canvas controls.

## Color roles

Use semantic variables rather than scattered hex values:

```css
--public-bg
--public-surface
--public-text
--public-text-muted
--public-text-subtle
--public-border
--public-accent
--public-accent-contrast
--public-code-bg
```

Choose the final values by inspecting the supplied Amp references and the current brand assets, then document them in the token file. Keep the palette intentionally small. Accent color should communicate action or emphasis, not fill every component.

## Layout

- Use one public container width and a small set of content widths.
- Use a narrow column for documentation, legal text, blog-like content, and explanatory copy.
- Use a wider column for product previews, comparison tables, and feature demonstrations.
- Establish a consistent section rhythm rather than independently choosing `py` per section.
- Make mobile a first-class composition: stack content intentionally, keep controls reachable, and preserve readable line lengths.
- Use page-specific composition when it improves the content; do not force every page into the homepage template.

## Component patterns

Prefer these reusable patterns where they fit:

- public navigation with restrained active/focus treatment;
- eyebrow/category + title + description;
- metadata line with date/category/format;
- editorial list row separated by rules;
- feature block with one visual and concise supporting copy;
- text link with directional affordance;
- quiet primary and secondary actions;
- code/JSON preview with explicitly scoped monospace styling;
- docs table of contents that remains readable on mobile.

## Content direction

Write for developers who want to understand and act quickly. Prefer concrete phrases such as “Transform raw data into a readable graph” over generic claims such as “The best solution for everyone.” Keep titles short, descriptions useful, and labels consistent across page families. Preserve factual claims and privacy/legal meaning.

## Review checklist

- Does the page read clearly without decorative effects?
- Is the first viewport useful and visually distinct from the old homepage?
- Is there one obvious primary action?
- Are metadata, headings, body, and code visually separated?
- Are borders, radii, shadows, and accents used consistently?
- Does the layout work at narrow mobile widths without horizontal overflow?
- Are focus states visible and contrast acceptable?
- Did public font rules avoid leaking into code/editor/canvas content?
