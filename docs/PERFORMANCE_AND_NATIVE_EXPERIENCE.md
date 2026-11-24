# Performance & Native Experience

**These are requirements, not polish.** A React Native app is judged against the
native apps next to it on the home screen, so "it works" is not the bar — it has
to start fast, scroll at 60fps, respect platform gestures and feel like it
belongs on the device. Treat every item here the way you'd treat a functional
requirement: it has a number or a checklist entry, it gets verified, and it
blocks a release if it regresses.

---

## 1. Give every performance requirement a number

An NFR without a number can never be closed. Write budgets into the requirements
spec as `NFR-xx` rows, with the device class they apply to:

| Example budget                                              | Why this shape                             |
| ----------------------------------------------------------- | ------------------------------------------ |
| Cold start to usable first screen ≤ 1.5s (mid-range device) | "Fast" is unfalsifiable; 1.5s is testable  |
| Commit a record and show the updated total ≤ 100ms          | Covers the app's most repeated interaction |
| List of 500 items scrolls at 60fps                          | Forces a virtualised list, not a `.map()`  |
| Aggregate report over 100,000 records ≤ 1s                  | Forces indexes and set-based queries       |
| Search across 100,000 records ≤ 500ms                       | Forces indexed columns                     |
| List of 5,000 items with computed values loads ≤ 500ms      | Forces one query, not N+1                  |
| Install size ≤ 30MB                                         | Forces dependency discipline               |

Pick the sizes from the **worst realistic user**, not the average one, and state
the device class — a budget that only holds on the newest flagship isn't a
budget.

## 2. Measure; never claim a number you didn't measure

Split budgets by what can actually be measured where, and be explicit about the
ones you haven't:

- **Query/compute budgets** (reports, search, list loads) → an automated perf
  test against a real database seeded to the full target size. Seed with bulk
  raw SQL, not the repositories' one-row-at-a-time `create()`, or seeding
  dominates the measurement. Keep these tests **out of `npm run verify`**
  (`npm run test:perf`, its own Jest config): wall-clock assertions are flaky
  when run concurrently with the rest of the suite.
- **Device budgets** (cold start, interaction latency, frame rate, install size)
  → measured on a real build on a real device, in the release configuration.
  Jest cannot answer these, and a unit test that pretends to is worse than no
  test.
- Anything unmeasured is written down as unmeasured, in the PR and the roadmap.
  "NFR-01 not claimed — no device available in this environment" is a fine
  status; silently ticking it is not.

When a measurement passes with margin, **don't optimise it further** — that's
complexity with no requirement behind it. Optimise only what measurement shows
missing.

## 3. The rendering rules that actually matter

- **Virtualised lists always.** `FlatList`/`SectionList`/`FlashList` for
  anything that can grow — never `items.map()` inside a `ScrollView`. Memoised
  `renderItem` and `keyExtractor`, `memo` on row components, `getItemLayout`
  when rows are fixed-height.
- **Narrow state subscriptions.** With Zustand, `useStore((s) => s.field)` —
  never `const { a } = useStore()`, and never create a new object/array inside a
  selector (it re-renders on every store write). Use `useShallow` for several
  fields. Stable module-level empty fallbacks (`const EMPTY: T[] = []`), not
  `?? []` inside the selector.
- **Screen-scoped stores + containers** (see `docs/ARCHITECTURE.md`). This is a
  performance pattern first: state held by the screen component re-renders the
  whole screen subtree on every keystroke, whereas each container subscribing to
  its own slice re-renders only itself. Typing in a form field must not
  re-render the list next to it.
- `useCallback` for handlers passed into memoised children; `useMemo` for
  genuinely derived data. Don't memoise trivial values — the bookkeeping costs
  more than the work.
- Animate with the native driver (`useNativeDriver: true`) for
  transform/opacity. Layout properties (width, height) can't use it — if you're
  animating layout on a hot path, reach for `react-native-reanimated` instead.
- Keep the JS thread free during gestures and transitions: no synchronous
  database work, JSON parsing or heavy computation in a press handler. Hand it
  to a store action that awaits, and render a pending state.

## 4. Data-layer rules that keep the UI fast

- Index every column you filter, sort or join on, and confirm it with a query
  plan at target scale — not by assumption.
- One query per screen section, not one per row (the N+1 that kills a 5,000-row
  list is almost always a per-item balance/count lookup).
- Keep derived values derived. Caching a computed total in a column creates two
  sources of truth and a class of bug that only appears after an edit to old
  data.
- Wrap multi-row writes in one transaction — correctness first, but it's also
  faster than N round trips.

## 5. Native feel — the checklist

Performance is half of "feels native". The other half is behaving like the
platform:

- **Safe areas** on every screen (`BaseScreen` handles it — don't bypass it).
- **Keyboard**: the focused field stays visible,
  `keyboardType`/`returnKeyType`/`autoCapitalize` set per field, tapping outside
  dismisses, and nothing important sits under the keyboard.
- **Touch targets ≥ 48dp**, with `hitSlop` where the visual is smaller.
  Thumb-reachable primary actions (bottom of the screen, not the top).
- **Native gestures**: platform back behaviour (Android hardware back, iOS
  swipe-back), pull-to-refresh where a list can change, long-press for secondary
  actions.
- **Haptics** on meaningful commits and destructive confirmations
  (`expo-haptics`), not on every tap.
- **Platform-appropriate chrome**: native-stack navigator (real native
  transitions), platform share sheet, system contact/file pickers rather than
  in-app re-implementations, OS-level permission prompts at the moment of use.
- **Loading, empty, and error states for every data-backed view** — a blank
  screen reads as a crash.
- **Dark mode** via semantic theme tokens; **RTL** via `marginStart/End` and
  `align="start|end"`; **tablet** via content-width caps. All three are "every
  screen", not "most screens".
- **Accessibility**: `accessibilityRole`, translated `accessibilityLabel`, never
  colour as the only carrier of meaning, and content hidden behind an overlay
  hidden from the screen reader too (`accessibilityElementsHidden` +
  `importantForAccessibility="no-hide-descendants"` — `pointerEvents="none"`
  only blocks touches).
- **Offline**: if the app is offline-first, every core action works with the
  radio off, and anything that does need the network (sync, purchases, share
  hand-offs) has an explicit failure path that never blocks local use.
- **Font scaling** to 200% without clipping — especially numbers and currency.

## 6. Dependency and bundle discipline

- `npx expo install <pkg>` (never bare `npm i`) so versions match the SDK;
  `npm run deps:check` after.
- Every new dependency is a question: does the platform already do this? Is it
  one function you could write? Does it pull in a native module that forces a
  development build (and is that acceptable now)?
- Prefer no UI kit. A kit's components are someone else's design system, and
  overriding them costs more than building the handful of atoms a project
  actually uses.
- Audit the release build's size when a milestone closes, not the day before
  submission.

## 7. Where this gets verified

| Budget type                 | Verified by                                        | In `npm run verify`?                   |
| --------------------------- | -------------------------------------------------- | -------------------------------------- |
| Query/compute at scale      | `npm run test:perf` against a real seeded database | No (timing flakiness)                  |
| Correctness of derived data | Unit tests on pure domain functions                | Yes                                    |
| Re-render behaviour         | Review (selector shape) + component tests          | Yes                                    |
| Cold start / fps / size     | Manual pass on a real release build, per milestone | No — record the numbers in the roadmap |
| Native feel & a11y          | The §5 checklist, per screen, in the QA batch      | No — checklist in the PR body          |
