# React Native + Expo Starter Kit

An opinionated starting point for production React Native apps: atomic design,
typed navigation, a token-based design system, i18n with RTL, and — the part
that matters most — **a written set of conventions and a development process
that an AI coding session can pick up and follow without being told twice.**

The conventions here aren't aspirational. They were extracted from shipping a
real 48-screen, offline-first app on this structure, where AI sessions did most
of the typing. Every rule in `docs/` exists because its absence produced a
review finding or a bug.

---

## Start here

**If you are an AI coding session (Claude Code or similar), read in this order —
before writing any code:**

1. **`CLAUDE.md`** — project context, the stack, the commands, the
   non-negotiables, and where the last session left off. Claude Code reads this
   automatically; keep it current.
2. **`docs/DEVELOPMENT_PROCESS.md`** — how work is planned (milestones →
   batches), the per-batch development cycle, when to open a PR, and how to use
   the two skills.
3. **`docs/ARCHITECTURE.md`** — folders, layers, the screen/container/store
   split, state, navigation, theming.
4. **`docs/CODING_GUIDELINES.md`** — the rules you'll be reviewed against.
5. **`docs/PERFORMANCE_AND_NATIVE_EXPERIENCE.md`** — performance budgets and the
   native-feel checklist. These are requirements, not polish.
6. **`docs/DECISIONS.md`** — decisions already made. Don't re-litigate them; add
   a new row if one changes.
7. **`docs/ROADMAP.md`** — the current milestone and batch. Build that batch,
   not the whole milestone.

Then load the development skill
(`.claude/skills/react-native-development/SKILL.md`) and start.

**If you are a human starting a project:** `npm install`, `npm start`, then work
through [Starting a new project](#starting-a-new-project-from-this-kit) below.

---

## What's in the box

| Area          | What you get                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------ |
| Structure     | Atomic design (`atoms/molecules/organisms/templates`), thin screens + per-section **containers** |
| State         | **Zustand** — one store per domain, one per screen; `persist` for small preferences only         |
| Design system | `BaseColors` → semantic `Colors` (light + dark), `Typography`, `Dimensions`, 8-pt spacing        |
| Navigation    | React Navigation (native-stack + bottom-tabs), `ROUTES` constants, fully typed params            |
| i18n          | i18n-js + expo-localization, one JSON per language, RTL support                                  |
| Types         | Strict TypeScript, `models/{interfaces,enums,props}`, props file per component                   |
| Quality       | ESLint 9 flat + Prettier, `npm run verify` as the single pre-commit gate                         |
| AI workflow   | `CLAUDE.md`, a documented process, and two Claude skills (development + PR review)               |
| Docs          | Architecture, coding guidelines, performance/native checklist, decision log, roadmap template    |

**Priorities, in order:** correctness → performance and native feel →
maintainability → velocity. A feature that works but drops frames, or that feels
like a website in a shell, is not done.

---

## The two Claude skills

They live in `.claude/skills/` and load with the `Skill` tool, or by typing
`/<name>`.

### `react-native-development` — use before writing any code

The first tool call of a coding task, before you open the target file. It
carries the folder map, the "where does this go?" table, the component and props
templates (with the expected JSDoc density), the import-order rule, the
screen/container/store split, the Zustand patterns, i18n and theming rules, the
testing conventions, and the gotchas that cost real debugging time — strict-TS
traps, screen-reader hiding, `Animated.Value` creation, conditionally-required
props.

It's written as instructions for the session that's about to type, so it changes
the first draft rather than catching problems later.

### `pr-review-react-native` — use after it builds, before the PR

Step 1 is a mechanical architecture-conformance sweep (layering violations,
screens holding state, selector misuse, props/enum placement, missing i18n keys,
raw literals, RTL props, per-field JSDoc, tablet bounds). Step 2 is a
**frequency-ranked** substantive checklist — ordered by what actually gets
flagged most — plus an explicit de-prioritise list so review attention doesn't
go to generic nits.

Run it from a **fresh session** that didn't write the code, give it the diff
plus the requirement IDs and design screens, and have it rank findings against
`file:line`. Fix the blocking ones, write the deferred ones into the PR body,
then open the PR.

### Keep the skills alive

If review finds the same class of mistake twice, the skill is missing a rule —
add it there, with the concrete example. A rule with a war story attached gets
followed; a generic rule gets skimmed.

---

## How work is organised: milestones → batches

Full detail in [`docs/DEVELOPMENT_PROCESS.md`](./docs/DEVELOPMENT_PROCESS.md).
The short version, because it's the thing that made a large project stay
maintainable:

A **milestone** is a vertical slice a user would notice ("onboarding & app
lock", "reports & export"). It's too big to build or review in one go, so it's
split into **batches** — and a batch is:

> **one branch · one PR · one `npm run verify` · one review pass · 3–8 screens
> or one coherent layer**

Why it works:

- **Dependency order becomes visible.** Writing the batches down forces you to
  notice that the data layer has no UI yet, that the paywall can't exist before
  purchases, that reports need a date-range service first. The roadmap becomes a
  build order instead of a wish list.
- **Batch-sized PRs get real reviews.** A 40-file PR gets a rubber stamp. Nearly
  every genuinely important bug on the reference project was caught in a
  batch-sized review.
- **`main` stays green and demoable** — it never holds half a batch.
- **Context survives session boundaries.** AI sessions end. A batch is about
  what one session can hold, and the roadmap plus `CLAUDE.md`'s "Current state"
  is the handoff. **The docs are the memory, not the conversation.**
- **Scope creep gets a name.** "That's batch 6b" is a complete answer to a good
  idea at the wrong time.

Two sequencing rules worth copying: **build the shared component library before
the screens** (so later work only wires components to data), and **build the
data layer before the UI**, pure domain logic first.

### The per-batch cycle

```
0. Load the development skill
1. Read     requirements (FR/NFR/BR) + design screens + the ROADMAP batch + DECISIONS
2. Search   grep for the helper/component/enum/key you're about to add
3. Build    tokens → props → component → store → container → screen
4. Verify   npm run verify — green
5. Review   fresh session + the PR-review skill; fix the findings
6. Commit   type(scope): description (FR-xx)
7. PR       one per batch: what shipped / what didn't / test plan
8. Docs     tick ROADMAP, update CLAUDE.md "Current state", add DECISIONS rows
```

### When to open a PR

Per batch, once `verify` is green, the independent review has run and its
findings are fixed, the roadmap and `CLAUDE.md` are updated, and the diff
contains nothing beyond the batch's scope. Don't open one to "save work" (push
the branch instead), don't bundle two batches, and do open one for a small
cross-cutting fix. Merge each batch into `main` as it's approved — long stacks
of open PRs were tried and became a liability.

### Write down what you didn't do

The most valuable convention in the reference project: **"known gaps, not
silently built around."** When a batch can't deliver something, never fake it
(mock data, a button that does nothing) and never build it silently differently.
Build the honest subset and record the gap in the PR body, the roadmap batch and
— if it outlives the batch — `CLAUDE.md`. Paid-tier features, for example, were
built for real and shown dimmed behind a lock overlay that explained itself, so
the app was honest and demoable at every point in the build.

---

## Quick start

```bash
npm install
npm start                 # Expo dev server
npm run ios | android     # development build (required once any native-only module is added)
npm run verify            # type-check + lint + format check + tests — before every commit
npm run lint:fix          # also sorts imports (ESLint import/order is the source of truth)
npx expo install <pkg>    # ALWAYS this, never bare npm i, for Expo / React Native packages
```

## Project structure

```
App.tsx                   # SafeAreaProvider, splash until the store hydrates, language → i18n, AppNavigator
src/
  assets/i18n/supportedLanguages/<lang>/app.json   # ALL user-facing strings
  components/{atoms,molecules,organisms,templates}/ + README.md (the component registry)
  constants/design/       # BaseColors, Colors (light+dark), Typography, Dimensions
  constants/enums.ts      # app-wide enums (imported via @/models/enums)
  containers/<screenName>/# one container per screen section, owns its own store slice
  hooks/                  # useAppTheme, useResponsive
  models/{enums,interfaces,props}/
  navigation/             # routes.ts, types.ts, AppNavigator, MainTabNavigator, stacks
  screens/                # thin shells: navigation wiring + composing containers
  services/{database,domain}/ + platform wrappers (files, share, notifications…)
  store/                  # <domain>Store.ts, <screenName>ScreenStore.ts
  utils/                  # helpers, i18n, dateTimeHelper
docs/                     # architecture, guidelines, process, performance, decisions, roadmap
.claude/skills/           # development + PR review skills
```

Only path alias: `@/*` → `src/*`.

## The rules you will be reviewed against

Short form; the full version is in
[`docs/CODING_GUIDELINES.md`](./docs/CODING_GUIDELINES.md).

1. **Search before you create.** Duplication is the most common finding and grep
   prevents it.
2. **No literals** — strings via `t()` (in every language file), colours via
   `useAppTheme().colors`, sizes from design tokens, routes from `ROUTES`,
   variants from enums.
3. **Per-field JSDoc on every exported interface/type/enum member**, obvious
   ones included — plus a _why_ comment anywhere the reason isn't visible in the
   code.
4. **Layers are literal:** UI → store → domain service → repository →
   database/native. A screen or container calling the database directly is a
   blocking review finding.
5. **Thin screens (~200 lines), state in a screen-scoped store, sections in
   containers.** Not an optimisation — screen-level state re-renders the whole
   screen on every keystroke.
6. **Smallest possible store subscription;** never destructure the whole store,
   never build an object in a selector.
7. **Strict TypeScript** — no `any`, no `@ts-ignore`, no cast without a runtime
   check, discriminated unions for conditionally-required props.
8. **Dark mode, RTL, tablet and accessibility on every screen**, from the first
   draft.
9. **Performance and native feel are requirements** with numbers behind them —
   measure, never claim.
10. **`npm run verify` green before every commit**, and write down what you
    didn't do.

---

## Starting a new project from this kit

1. Clone, then update `package.json` (name, description, keywords, repository)
   and `app.json` (name, slug, bundle identifier, icons, splash).
2. Replace every `<placeholder>` in `CLAUDE.md` with the real project context —
   this is the file every AI session reads first.
3. Write the requirements spec with **numbered IDs** (`FR-xx` functional,
   `NFR-xx` non-functional with real numbers, `BR-xx` business rules) and put
   the designs in `docs/product/design_screens/` with screen IDs.
4. Fill `docs/DECISIONS.md` with the decisions you've already made (and the open
   questions you haven't).
5. Turn the requirements into `docs/ROADMAP.md`: milestones, then batches.
   Component library first, data layer second, features after.
6. Set the semantic colours in `src/constants/design/Colors.ts` (both themes)
   and the languages in `src/assets/i18n/supportedLanguages/`.
7. Start batch 1a. Follow the cycle above.

---

## Known divergence between these docs and the template code

The documentation and skills in this repo describe the conventions as they ended
up after real production use. Some of the **template source still reflects the
earlier setup**, so expect to fix these up (or take the follow-up PR that does):

- `src/store/` still ships **Redux Toolkit** slices with
  `react-redux`/`redux-persist`, while the docs and skills specify **Zustand**
  (`docs/DECISIONS.md` has the reasoning). Migrating is mechanical: a
  `create<T>()` store per domain, `persist` + `partialize` for preferences, and
  selector reads at the call sites.
- ESLint is configured with the legacy `.eslintrc.js`; the conventions assume
  **ESLint 9 flat config** (`eslint.config.js`) with `import/order` and
  `import/internal-regex: '^@/'` — the rule that makes import order automatic
  rather than argued about.
- `jest` and `jest-expo` are in `devDependencies` but there is **no Jest config,
  no `jest.setup.ts`, no `@testing-library/react-native`, and no tests** — so
  `npm run verify` doesn't exist yet as a script either. Add those four before
  the first batch; the whole process depends on that one command.
- `src/containers/`, `src/hooks/`, `src/services/domain/`,
  `src/services/database/` and
  `components/templates/{BaseScreen,ResponsiveBounds}` are described in the docs
  but not yet scaffolded here.
- The kit still includes `react-native-elements`, `expo-router` alongside React
  Navigation, and a web target (`react-native-web`). The conventions assume none
  of the three — remove what your project doesn't use.

Treated as a deliberate, documented gap rather than silently shipping docs that
contradict the code — which is exactly the convention this kit asks you to
follow.

## License

MIT
