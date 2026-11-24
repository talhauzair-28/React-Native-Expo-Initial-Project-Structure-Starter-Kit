# CLAUDE.md — <Project Name>

Context for AI coding sessions (Claude Code reads this file automatically at the
start of every session). **Keep it current** — it is the one file that is always
in context, so a stale line here misleads every future session. Update the
"Current state" section at the end of every task.

> **Starting a new project from this starter kit?** Replace every
> `<placeholder>` below, delete the lines that don't apply, and keep the
> structure. The headings are deliberate: this file answers, in order, _what is
> this_, _what do I read first_, _what is the stack_, _what commands exist_,
> _what must I never break_, _how do we use git_, and _where did the last
> session leave off_.

## What this is

<One paragraph: what the app does, for whom, on what platforms, online or
offline-first, and how it makes money. A session that reads only this paragraph
should still make sensible product judgment calls.>

Owner: <name> (<role / relevant expertise>).

## Read before working

| What                                                                | Where                                              |
| ------------------------------------------------------------------- | -------------------------------------------------- |
| Requirements (FR-xx functional, NFR-xx non-functional, BR-xx rules) | `docs/product/Requirements_Specification.md`       |
| Designs: tokens, user journeys, per-screen mockups                  | `docs/product/design_screens/`                     |
| Architecture (stack, folders, layers, state, navigation, theming)   | `docs/ARCHITECTURE.md`                             |
| Coding rules                                                        | `docs/CODING_GUIDELINES.md`                        |
| Performance budgets & native-feel checklist                         | `docs/PERFORMANCE_AND_NATIVE_EXPERIENCE.md`        |
| How we plan, build, review and ship                                 | `docs/DEVELOPMENT_PROCESS.md`                      |
| Decisions already made (don't re-litigate)                          | `docs/DECISIONS.md`                                |
| Build plan & next tasks                                             | `docs/ROADMAP.md`                                  |
| Reusable component registry (list, purpose, screens, build order)   | `src/components/README.md`                         |
| Development skill (patterns, templates, checklists)                 | `.claude/skills/react-native-development/SKILL.md` |
| PR review skill (run before opening a PR)                           | `.claude/skills/pr-review-react-native/SKILL.md`   |

Screen IDs (e.g. `A1`…`H3`), journey IDs (`J1`…`Jn`) and requirement IDs
(`FR-xx`, `NFR-xx`, `BR-xx`) are the shared vocabulary of the project — use them
in JSDoc, commit messages and PR descriptions so any artefact can be traced back
to the requirement it implements.

## Stack

React Native <version> (New Architecture) · Expo SDK <version> · React <version>
· TypeScript <version> strict · React Navigation 7 (native-stack + bottom-tabs)
· **Zustand 5** · i18n-js + expo-localization · `Feather` from
`@expo/vector-icons` · ESLint 9 flat + Prettier · Jest (`jest-expo`) + React
Native Testing Library. No Redux, no UI kit, no web target.

## Commands

```bash
npm install
npm start                 # Expo dev server
npm run ios | android     # development build (required once any native-only module is added)
npm run verify            # type-check + lint + format check + tests — must pass before every commit
npm run lint:fix          # also sorts imports (ESLint import/order is the source of truth)
npx expo install <pkg>    # ALWAYS use this (not npm i) for Expo / React Native packages
npm run deps:check        # versions aligned with the current Expo SDK
npm run test:perf         # performance budgets at real scale — isolated, not part of verify
```

## Non-negotiables

1. All user-facing text via `t('…')`; every key added to **all** language files
   in the same change.
2. Colours from `useAppTheme().colors` (semantic keys only);
   spacing/radius/sizes from design tokens. No colour or size literals outside
   `src/constants/design/`.
3. <Domain invariant, e.g. "Money = integer minor units; balances are derived
   from records, never stored">.
4. <Domain invariant, e.g. "Related rows that must agree change in ONE database
   transaction">.
5. Zustand: select the smallest slice (`useStore((s) => s.x)`); heavy data in
   the database, only small preferences persisted.
6. Enums from `@/models/enums`; routes from `ROUTES`; props in
   `src/models/props/<level>/`.
7. Dark mode + RTL + accessibility (≥ 48dp targets, translated labels, never
   colour-only meaning) on every screen.
8. Tablet: every screen body wrapped in `ResponsiveBounds` (or `BaseScreen`'s
   `wide` prop).
9. Performance and native feel are requirements, not polish — see
   `docs/PERFORMANCE_AND_NATIVE_EXPERIENCE.md`.
10. Search before creating helpers/components; export everything through
    `index.ts` files.
11. **Per-field JSDoc on every exported interface/type/enum member**, obvious
    ones included.

## Git workflow

- Branch per batch: `feature/<name>` (or `docs/<name>`, `fix/<name>`), PR into
  `main`.
- Commit format: `type(scope): description (FR-xx)` — `feat`, `fix`, `refactor`,
  `test`, `docs`, `chore`, `style`.
- One PR per sub-milestone (batch), not per milestone — see
  `docs/DEVELOPMENT_PROCESS.md` for when to open one.
- Native `ios/` and `android/` folders are generated by `expo prebuild` and not
  committed.

## Current state (update at the end of each task)

- ✅ <what is done, milestone by milestone, with the known gaps that were
  deliberately left>
- ◐ <what is partially done, and exactly which parts are NOT claimed>
- ⏭️ Next: <the next batch, and anything blocking it>

> Write the gaps down. A "known gap, deliberately not built" is useful context;
> a gap that only exists in a finished session's memory becomes a bug report
> from your future self.
