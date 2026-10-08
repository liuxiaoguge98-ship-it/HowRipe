# HowRipe — Product & Architecture Spec

## 1. Product

HowRipe is an English-language interactive website that teaches users how to choose ripe, good-quality fruit.

Initial fruits:

* Avocado
* Kiwi
* Pomegranate
* Persimmon

Core experience:

> Search → get the answer quickly → learn the visual/physical checks → reinforce them through an interactive quiz.

The site is a practical picking guide, not a general fruit encyclopedia.

---

## 2. MVP Scope

MVP includes:

* Homepage
* Individual fruit pages
* Static picking guides
* Interactive A/B quiz
* Nutrition snapshot
* FAQ
* Related-fruit internal links
* Responsive desktop/mobile experience
* SEO-friendly static content

MVP excludes:

* Authentication
* User accounts
* Database
* CMS
* User uploads
* AI runtime features
* Comments
* Favorites
* Subscriptions
* Image generation
* Complex 3D/WebGL experiences

Fruit images are external static assets and must remain decoupled from page architecture.

---

## 3. Routes

Initial routes:

```text
/
/avocado
/kiwi
/pomegranate
/persimmon
```

Future fruits should be added through structured content rather than duplicated page implementations.

Architecture principle:

> One reusable FruitPage system + fruit-specific structured content.

---

## 4. Fruit Page Structure

Default fruit page order:

```text
01 Hero
02 Quick Checks
03 Timing / Ripeness Guide
04 How to Pick
05 Don't Overthink
06 Test Your Eye
07 Nutrition Snapshot
08 FAQ
09 Related Fruits
```

Sections may be optional when they do not make sense for a particular fruit.

---

## 5. Search Intent

Initial primary intents:

```text
/avocado
How to Tell If an Avocado Is Ripe

/kiwi
How to Tell If a Kiwi Is Ripe

/pomegranate
How to Tell If a Pomegranate Is Ripe

/persimmon
How to Tell If a Persimmon Is Ripe
```

Each page must have:

* unique title
* unique description
* one clear H1
* static HTML picking content
* meaningful internal links

Do not keyword-stuff.

---

## 6. Hero

Hero must answer the core query immediately.

Example for Avocado:

```text
AVOCADO

How to Tell If an Avocado Is Ripe

A ripe Hass avocado should feel firm,
but give slightly under gentle pressure.
```

Hero may include:

* eyebrow
* H1
* direct answer
* primary CTA
* secondary CTA
* optional fruit note
* optional image asset

Core meaning must never depend on the image.

---

## 7. Quick Checks

Quick Checks provide the main answer in roughly 10 seconds.

Avocado:

```text
PRESS
Gentle give

PLAN
Match your timing

FEEL
Even firmness

LOOK
Color helps

INSPECT
Avoid structural damage
```

Keep this section compact and editorial.

Avoid oversized SaaS-style cards.

---

## 8. How to Pick

This is the primary static SEO/content section.

Content should be visual and concise, but all essential knowledge must exist in HTML text.

For Avocado:

### Press Gently

Use your palm, not your fingertips.

A ripe avocado should feel firm but give slightly under gentle pressure.

### Match Your Timing

The ripest avocado is not always the best choice.

Choose firmness based on when you plan to eat it.

### Cosmetic or Damage?

Minor surface scuffs may be cosmetic.

Deep dents, localized soft pockets, or structural collapse are more concerning.

Core principle:

> Don't confuse ugly with damaged.

### Shape

Natural asymmetry is normal.

Localized collapse is a warning sign.

Core principle:

> Don't look for a perfect shape. Look for structural damage.

### Stem Area

Check whether the stem area looks intact, collapsed, damaged, or unusually soft.

Do not present “remove the stem and check the color” as a primary ripeness test.

### Color

For Hass avocados, color can help but must not be the sole ripeness test.

Core principle:

> Color helps. It doesn't decide.

---

## 9. Don't Overthink

This section corrects common overinterpretation.

Avocado example:

```text
MINOR SCUFFS
Usually fine.

NATURAL ASYMMETRY
Normal.

THE DARKEST COLOR
Doesn't automatically mean best.

PERFECT-LOOKING SKIN
Doesn't guarantee a healthy avocado.
```

---

## 10. Quiz Positioning

Quiz is a learning reinforcement layer.

It is not the main SEO content.

Rule:

> Any core knowledge used in the quiz must already exist in the static How to Pick content.

Quiz heading:

```text
TEST YOUR EYE
```

---

## 11. Quiz Initial State

Before the user answers, show only:

* question
* optional helper text
* Option A
* Option B
* progress

Hide:

* correct answer
* wrong answer
* explanation
* green/red state
* check icon
* X icon
* answer labels

Answer graphics or red/green references belong only to the feedback state.

---

## 12. Quiz Correct Flow

```text
select
→ correct feedback
→ short explanation
→ approximately 1 second
→ fade transition
→ next question
```

Correct answers auto-advance.

---

## 13. Quiz Wrong Flow

```text
select
→ wrong feedback
→ explanation
→ correct principle
→ Got it
→ next question
```

Wrong answers do not auto-advance.

Principle:

> Correct = reward and momentum
> Wrong = pause and learn

---

## 14. Quiz Scroll Rules

**UI-01B approved exception (2026-09-29):** Avocado opts into an isolated Game Stage. Active desktop fine-pointer/hover wheel input inside that section is inert; outside or after completion it scrolls normally. Touch and keyboard always retain native scrolling. There is no body lock, modal or internal scrollbar. See `INTERACTION_SPEC.md` for the current scoped rule. The following defaults remain for other Quiz configurations.


The Quiz Stage is only a visual container.

Strict invariants:

```text
No internal page-scroll container
No scroll hijacking
No wheel capture
No touch-scroll capture
No sticky quiz that traps the user
```

The user must always be able to continue scrolling the page normally.

---

## 15. Quiz Layout Stability

Feedback must not cause major page jumping.

Reserve enough feedback space or otherwise prevent visible layout shift.

---

## 16. Avocado Quiz V1

Five questions:

### Q01 — Eat It Tonight

Teach immediate eating ripeness.

### Q02 — Gentle Press

Teach:

```text
firm + gentle give
vs
very firm
```

### Q03 — Cosmetic or Damage

Teach:

```text
minor cosmetic mark
vs
real structural damage
```

### Q04 — Buy for Later

Prompt:

```text
You want to eat it in 2–3 days.
Which one should you buy?
```

Teach choosing for timing rather than maximum ripeness.

### Q05 — Final Pick

Prompt:

```text
FINAL PICK

Both are ripe.
Which one would you choose?
```

Teach choosing the structurally healthier avocado when both are already ripe.

Correct option may contain:

* even firmness
* healthy stem area
* harmless cosmetic mark
* no suspicious soft pocket

Incorrect option may look visually cleaner but contain:

* localized soft pocket
* subtle structural collapse
* abnormal stem-area condition

---

## 17. Quiz Completion

After the final question:

```text
YOU'VE GOT IT.

PRESS
Gentle give

PLAN
Match the timing

FEEL
Even firmness

LOOK
Color is secondary

AVOID
Suspicious soft spots and collapse
```

---

## 18. Nutrition

Nutrition is secondary content.

Display no more than about five metrics.

Possible metrics:

* Calories
* Carbs
* Fat / Macros
* Fiber
* Sugar
* GI category

Use:

```text
per 100g
```

Do not make medical claims.

Do not claim suitability for diabetes or guaranteed blood-sugar effects.

---

## 19. FAQ

Each fruit page should eventually contain approximately 3–5 useful questions closely related to:

* ripeness
* choosing
* ripening
* storage

FAQ content must exist in normal HTML.

Do not build the product around FAQ rich-result markup.

---

## 20. Sources

Fruit knowledge and nutrition should support source references.

Content model should allow:

```ts
type SourceReference = {
  label: string;
  url: string;
};
```

Sources may be displayed in a compact Sources section.

---

## 21. Fruit-Specific Content

Shared:

* layout
* component system
* quiz engine
* design system

Not shared:

* judging criteria
* article sentences
* quiz learning points

Do not mechanically replace fruit names inside one generic article.

Examples:

```text
Avocado:
Firmness / Timing / Damage / Color

Pomegranate:
Weight / Shape / Skin / Soft spots

Persimmon:
Variety / Firmness / Color / Texture
```

---

## 22. Persimmon Special Case

Persimmon must distinguish at least:

```text
Fuyu
Hachiya
```

The architecture should eventually support optional fruit variants.

Suggested concept:

```ts
variantSelector?: FruitVariantSelector;
```

Do not implement this until the Persimmon development node.

---

## 23. Content Architecture

Use structured fruit data.

Conceptual shape:

```text
Fruit
├── theme
├── seo
├── hero
├── quickChecks
├── timingGuide
├── pickingSections
├── dontOverthink
├── quiz
├── nutrition
├── faq
├── sources
└── relatedFruits
```

Generic components must consume this data.

---

## 24. Asset Architecture

Images are external assets.

Components must reference semantic asset keys instead of scattered file paths.

Example:

```text
avocado.hero
avocado.ripeness.today
avocado.quiz.q01.a
avocado.quiz.q01.b
```

Development may use placeholders.

Replacing placeholders with production assets later must not require changing:

* page structure
* FruitPage
* quiz logic
* content schema

---

## 25. Rendering Architecture

Prefer Server Components/static HTML for:

* Hero
* Quick Checks
* Timing
* How to Pick
* Nutrition
* SEO content
* Sources

Use Client Components only where interaction requires them:

* Quiz
* FAQ accordion
* minor UI interaction

Core SEO content must never depend on hydration to exist.

---

## 26. Design Direction

Visual direction:

> Editorial Grocery × Premium Product UI

Avoid:

* SaaS dashboard aesthetics
* glassmorphism
* generic organic-farm templates
* cartoon fruit UI
* futuristic AI visual language
* excessive cards
* excessive gradients

Use:

* generous whitespace
* warm off-white base
* near-black text
* restrained borders
* fruit-specific accent color
* editorial typography

---

## 27. Avocado Theme

Approximate initial values:

```text
primary: #6E7F45
dark: #2F3B27
soft: #DDE2D2
```

Theme values must be centralized.

Other fruits will have different accents.

---

## 28. Typography

Preferred direction:

```text
Editorial Serif
+
Clean Sans Serif
```

Serif:

* H1
* major section headings

Sans:

* UI
* quiz
* body
* labels
* nutrition

---

## 29. Responsive Design

Desktop content width:

```text
1200–1280px max
```

Typical desktop horizontal padding:

```text
48–64px
```

Mobile padding:

```text
20–24px
```

Prefer generous whitespace.

Mobile should be designed intentionally, not merely shrink desktop.

Quiz A/B options should remain side by side when practical because simultaneous comparison is important.

---

## 30. Motion

Motion explains state rather than decorating the page.

Guidelines:

```text
interaction: 180–240ms
section reveal: 350–550ms
quiz transition: 300–420ms
```

Avoid:

* bounce
* elastic motion
* infinite decorative animation
* parallax
* scroll hijacking

Support:

```css
@media (prefers-reduced-motion: reduce)
```

Functionality must remain complete without motion.

---

## 31. Accessibility

Required:

* semantic headings
* visible focus states
* keyboard-accessible controls
* quiz options implemented as buttons
* feedback not communicated by color alone
* textual Correct/Wrong state
* `aria-live` for quiz feedback
* reduced-motion support
* appropriate contrast

Quiz initial image accessibility descriptions must not reveal the answer.

---

## 32. Homepage

Homepage should eventually include:

```text
Hero
Fruit Guides
General Picking Principles
Seasonal Fruit
```

It must not be only a navigation grid.

Initial development may use a minimal skeleton.

---

## 33. Technical Stack

MVP default:

```text
Next.js App Router
TypeScript
React
Tailwind CSS
```

Avoid unnecessary dependencies.

Do not add:

* database SDK
* authentication SDK
* CMS
* global state library
* heavy animation library

unless a later approved node genuinely requires it.

---

## 34. Engineering Invariants

1. No database in MVP.
2. No authentication in MVP.
3. No AI runtime feature in MVP.
4. No scroll trapping.
5. Core SEO content exists in static HTML.
6. Quiz answers are hidden before selection.
7. Correct answers auto-advance after about one second.
8. Wrong answers require manual continuation.
9. Quiz knowledge also exists in static content.
10. Fruit pages share components, not generic copy.
11. Images remain external and architecture-independent.
12. No medical claims.
13. Motion explains state.
14. Respect reduced-motion preferences.
15. Avoid unnecessary dependencies.
16. Keep route files thin.
17. Keep components focused.
18. Follow existing project conventions where reasonable.

---

## 35. Development Sequence

```text
DEV-01 Foundation + Fruit Content Architecture
DEV-02 Static Avocado Page
DEV-03 Quiz Engine
DEV-04 Avocado Quiz Content
DEV-05 Responsive + Accessibility
DEV-06 Motion Pass
DEV-07 Fruit Template Validation
DEV-08 Kiwi
DEV-09 Pomegranate
DEV-10 Persimmon + Variant Support
DEV-11 SEO + Performance QA
DEV-12 Release QA
```

Only execute one node at a time.

Do not advance automatically.

---

## 36. Current Rule

The current development target is:

```text
DEV-01
Foundation + Fruit Content Architecture
```

DEV-01 must stop before the complete static Avocado page, Quiz Engine, motion system, or additional fruits are implemented.
