---
name: pr-review-react-native
description: Review a React Native/TypeScript PR, diff or branch in a starter-kit project: architecture-conformance checks plus a frequency-ranked review checklist. Use when asked to review a PR, diff or branch, and run it on every batch before the PR is opened.
---

# PR Review: React Native (starter-kit conventions)

Two parts, kept separate so findings can be prioritised:

1. **Architecture-conformance checks** — mechanical, specific to how this
   codebase is built. A violation is a legitimate blocking comment, not a style
   nit.
2. **A frequency-ranked substantive checklist** — lead with what actually gets
   flagged most; don't pad the review with generic concerns (see the
   de-prioritise list at the bottom).

**Run this before opening the PR, ideally from a session that did not write the
code.** The author of a change is its worst reviewer, and that's more true after
an hour in the same files.

## Step 0 — Get the diff and the context

- PR number: `gh pr diff <number>` and
  `gh pr view <number> --json title,body,files`.
- Local branch: `git diff main...HEAD`.
- Read the surrounding code, not just the hunks — most rules need to know what
  the rest of the codebase does.
- Read the spec and design the PR claims to implement (`FR-xx`/`NFR-xx`/`BR-xx`,
  screen IDs, journeys).
- Run (or ask for) `npm run verify`. A red verify is blocking.

## Step 1 — Architecture conformance

- **Layering**: UI → Zustand store → domain service → repository → database /
  native API. Enforced literally: a screen or container calling `getDatabase()`
  or a repository method itself is **blocking**, not "could be cleaner" — that
  orchestration belongs in a screen-scoped store action. Components and stores
  must not touch SQLite, AsyncStorage, file system, share sheet, notifications
  or purchases directly, only through `src/services/`. Domain logic must be pure
  TS with no React/native imports.
- **Domain rules from the spec**: whatever the project's invariants are (units
  and rounding, derived vs stored values, soft deletes, rows that must change
  together in one transaction, which actions may touch which table). Any
  deviation is a correctness bug, not a preference. Cite the `BR-xx`.
- **Zustand**: one store per domain, plus one screen-scoped store per screen
  with non-trivial state. **A screen component holding its own `useState` for
  form fields, loaded data or "which sheet is open" is blocking** — that state
  belongs in the screen's store, which is what lets containers subscribe to only
  what they render. Whole-store destructuring (`const { a } = useStore()`) or
  new objects/arrays created inside a selector are blocking (re-render bugs).
  Several fields → `useShallow`. Only small preferences persisted; screen state
  never persisted. No Redux.
- **Screens & containers**: a screen is a thin shell — route params, navigation,
  composing containers. Flag one over ~200 lines, or with its own `useState`, a
  `getDatabase()` call, or a render tree doing more than composing children.
  Section rendering belongs in
  `src/containers/<screenName>/<Name>Container.tsx`, each reading its own store
  slice rather than taking it as props. "We'll split it later" is the same
  finding as already-too-big: ask for the split in this PR.
- **Types/props placement**: interfaces in `src/models/interfaces/`, props in
  `src/models/props/<level>/`, enums in `constants/enums.ts` imported **only**
  from `@/models/enums`. An exported type declared inside a
  component/store/service file is wrong.
- **Navigation**: names from `ROUTES`, params in `navigation/types.ts`, typed
  screen props. String-literal routes or `as never` casts are blocking.
- **Imports**: `@/` over `../../`; order must pass ESLint `import/order`;
  type-only imports separate. Shared UI imported from the barrel, not
  re-implemented in a screen.
- **i18n**: every user-facing string — labels, titles, alerts, placeholders,
  **accessibility labels** — via `t('…')`, with the key present in **every**
  language file. Translated content built at module level is a bug (it goes
  stale after a language switch).
- **Theme & tokens**: colours from `useAppTheme().colors` semantic keys;
  spacing/radius/sizes from `@/constants/design`. Colour literals outside
  `src/constants/design/`, raw `elevation`/`shadow*`, or static colours where
  dark mode matters → flag.
- **Component tiers**: atoms (no logic/store) → molecules → organisms →
  templates → screens. Every screen wraps `BaseScreen`. New reusable UI goes
  under the right tier, is exported from its `index.ts`, and is added to
  `src/components/README.md`.
- **File structure**: section dividers (`Helper Methods`, `Event Handlers`,
  `Render Methods`, `Render`), `StyleSheet.create` at the bottom, JSDoc with
  `@component`/`@example`/`@usage` on every exported component.
- **Per-field JSDoc, no exceptions**: every field of every exported
  interface/type and every enum member needs its own doc comment — including
  self-evident ones like `disabled?: boolean` or `SM = 'sm'`. A field with no
  comment is blocking. `@default` is not a description.
- **RTL**: `marginStart/End`, `paddingStart/End`, `align="start|end"`. A
  `left`/`right` layout prop is a bug in an RTL language. Directional icons
  mirror; numbers stay LTR.
- **Tablet**: the screen's body is wrapped in `ResponsiveBounds` (or
  `BaseScreen`'s `wide`). A new screen that isn't is a finding.
- **Accessibility** (a requirement here, not a nit): `accessibilityRole`,
  translated `accessibilityLabel`, ≥48dp targets, never colour-only meaning.
  Content behind an overlay must be hidden from screen readers with
  `accessibilityElementsHidden` **and**
  `importantForAccessibility="no-hide-descendants"` — `pointerEvents="none"`
  only blocks touches.
- **Performance**: virtualised list for anything growable, memoised
  rows/`renderItem`/`keyExtractor`, one query per section (not per row), no
  heavy work in a press handler, native driver used correctly. A new performance
  claim without a measurement is a finding; so is a measurement test inside
  `npm run verify` (timing flakiness).
- **Native packages**: added with `npx expo install` (versions aligned with the
  SDK). A package that forces a development build must be called out in the PR
  description.
- **Tests**: new domain/util/store logic without tests is a blocking gap; pure
  UI tweaks don't need them. Expect a manual test plan (iOS + Android, light +
  dark, each language, phone + tablet) for UI changes — including an honest
  unchecked box for what wasn't verified.
- **Docs**: a decision made ⇒ a new `docs/DECISIONS.md` row; finished items
  ticked in `docs/ROADMAP.md`; `CLAUDE.md` "Current state" updated; known gaps
  written down rather than left in the author's head.

## Step 2 — Substantive checklist, ranked by how often it actually comes up

Phrase feedback short and direct, often as a pointed question rather than a
prescription.

**1. Demand annotation on everything (highest frequency).** A "why" comment on
anything non-obvious, and a plain description on every field even when it's
obvious. Flag helpers, interfaces, optional/nullable fields and odd conditionals
with no explanation of _why_ they exist — and flag any field, prop, param or
enum member with **no** comment at all. Treat this as a standing rule for the
whole codebase, not a fix for the flagged line.

**2. Push back on unverified assumptions.** Business logic, tier limits, offline
behaviour, RTL, or "does this already exist" — ask for it to be confirmed
against the spec (cite the `FR`/`BR`) or the design screen rather than accepted.

**3. Interrogate design decisions with a direct "why".** Removed lines, unusual
branches, unexplained casts or exports, a second interactive element nested
inside the first, a new component that duplicates a platform capability. The
answer belongs in the component's JSDoc, not just the PR thread — threads get
resolved and vanish.

**4. Naming must match the domain concept, everywhere** — and a rename must be
applied across files, usages and i18n keys, not just the declaration.

**5. Store discipline:** one action that does the whole update instead of
several `set()` calls from a component; never `@ts-ignore` to bypass a type
error; guard state that may not be hydrated/loaded yet before nested access;
don't duplicate state the database or another store already derives.

**6. Null/undefined safety on anything from the database, files or native
APIs.** Query results, index reads under `noUncheckedIndexedAccess`, picked
contacts/files, restored JSON — guard before use. An unguarded access after an
async read is a crash risk, not a style nit.

**7. Extract duplicated logic into one shared helper** — the same check or
computation in 2+ places (including a component and its store) becomes one
helper in `src/utils/` or a domain service. Date/time composition belongs in
`src/utils/dateTimeHelper.ts`.

**8. No literal duplication either.** Before adding an icon, enum value, colour
key, i18n key or model field, check whether an equivalent exists.

**9. Type/interface placement** — exported types in `src/models/`, never
exported from a store/service/component.

**10. Import hygiene** — ESLint-sorted, `@/` alias, shared components from the
barrel.

**11. Missing `async` on functions that await, and missing `await` on async
work** (store actions, service calls, transactions). Check this mechanically on
every new async path.

**12. Scope discipline: flag and ask to revert anything beyond the stated ask,**
even if it's technically fine.

**13. Reuse over parallel implementations** — can an existing atom/helper take
one more parameter instead of a new variant being built?

**14. Don't cast (`as X`) without a preceding runtime check** — especially
restored JSON and database rows.

**15. No literal user-facing strings** — always `t('…')`, with keys in every
language.

**16. Check for an existing enum before adding one;** enum names PascalCase,
members UPPER_SNAKE.

**17. Offline behaviour** — if the app is offline-first, every action must work
with no network, and anything that needs one (sync, purchases, external
hand-offs) needs an explicit failure path that never blocks local use.

**18. No leftover `console.log`; no hardcoded literal where a
constant/enum/token already models the value.**

**19. In store actions and domain services, prefer explicit `if/else` over
compressed or nested ternaries.**

**20. Spacing/sizes checked against the design precisely** (compare the mockup),
and for consistency with similar screens, not just the one touched.

**21. Exercise the feature, not just the diff.** Reason about runtime behaviour:
repeated re-renders from a bad selector, a total that won't recalculate after a
back-dated edit, a handler that can't fire on Android, RTL breaking a row, a
list that drops frames at real scale. If you can't run the app, say so and list
the states to verify manually: loading, empty, error, edge values, offline, iOS
vs Android, light vs dark, each language, phone vs tablet.

## Explicitly de-prioritise

Mention only as low-priority notes, if at all:

- Generic "add a loading state" nits
- Generic try/catch nits (judge against the service-layer error contract in
  `docs/ARCHITECTURE.md`)
- "Magic number" callouts as a named category (design tokens still apply —
  that's a Step 1 finding)
- `useMemo`/`useCallback`/`React.memo` nitpicking — only flag for list rows and
  genuinely heavy renders
- Prop-drilling complaints

## Output

Rank findings by the Step 2 order, Step 1 architecture violations first as
blocking, each tied to `file:line`, one line stating the defect and one line on
the concrete failure scenario. Use the `ReportFindings` tool if available.
Finish by separating **blocking** from **deferred-with-a-note** — the deferred
ones belong in the PR body so they aren't lost.

## Feeding findings back

If the same class of mistake shows up twice across PRs, the **development skill
is missing a rule**. Add it there with the concrete example and the PR it came
from, so the next first draft is already correct. A rule with a war story
attached gets followed; a generic rule gets skimmed.
