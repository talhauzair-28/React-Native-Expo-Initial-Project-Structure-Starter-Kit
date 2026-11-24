# Architecture

How a project built on this starter kit is organised, and why. Rules for writing
code are in [CODING_GUIDELINES.md](./CODING_GUIDELINES.md); process is in
[DEVELOPMENT_PROCESS.md](./DEVELOPMENT_PROCESS.md).

## Stack

| Concern     | Choice                                                                       | Why                                                          |
| ----------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Runtime     | Expo SDK (latest stable), React Native (New Architecture)                    | Managed native config, OTA-ready, native modules when needed |
| Language    | TypeScript strict (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`) | Catch errors at compile time, not in QA                      |
| Navigation  | React Navigation 7 — native-stack + bottom-tabs                              | Real native transitions, typed route params                  |
| State       | **Zustand** (+ `persist` with AsyncStorage for small preferences)            | Selector-level subscriptions, no providers, ~1KB             |
| Data        | SQLite (`expo-sqlite`) via repositories; files via `expo-file-system`        | Offline-first, transactional, queryable at scale             |
| i18n        | i18n-js + expo-localization                                                  | Multiple languages incl. RTL, no code changes to add one     |
| Icons       | `Feather` from `@expo/vector-icons`                                          | One consistent line-icon set, already bundled                |
| Lint/format | ESLint 9 flat config (`eslint-config-expo`) + Prettier                       | One source of truth for style **and** import order           |
| Tests       | Jest (`jest-expo`) + React Native Testing Library                            | Unit + component tests                                       |

**Zustand over Redux Toolkit** (the kit's original choice): components subscribe
to exactly the fields they read, so there's no provider re-render cascade; no
action/reducer/slice boilerplate; and the heavy data lives in SQLite anyway,
which is what Redux's normalised store was doing the work for. See
`docs/DECISIONS.md`.

**No UI kit.** Atoms are built on React Native primitives (`Pressable`, `Text`,
`View`). A kit's components are someone else's design system and overriding them
costs more than owning three atoms.

## Folder structure

```
index.ts                  # registerRootComponent(App)
App.tsx                   # SafeAreaProvider, splash until preferences hydrate, language → i18n, AppNavigator
src/
  assets/
    i18n/supportedLanguages/<language>/app.json   # ALL user-facing strings, identical tree shape per language
    images/
  components/
    atoms/                # primitives on RN views (no logic, no store)
    molecules/            # small combinations of atoms, one purpose
    organisms/            # sections with logic/variants
    templates/            # BaseScreen, ScreenSection, ResponsiveBounds, PlaceholderScreen
    README.md             # the component registry — purpose, consumers, build order
  constants/
    design/               # BaseColors, Colors (light+dark), Typography, Dimensions
    enums.ts              # app-wide enums (always imported via @/models/enums)
    index.ts              # APP_CONFIG, feature limits, re-export of design tokens
  containers/
    <screenName>/         # one <Name>Container.tsx per screen section; owns its slice + its render
  hooks/                  # useAppTheme, useResponsive, feature hooks
  models/
    enums/                # single import point for enums
    interfaces/           # one data shape per file
    props/{atoms,molecules,organisms,templates}/   # one props file per component
  navigation/             # routes.ts (ROUTES), types.ts, AppNavigator, MainTabNavigator, TabStacks
  screens/                # one thin file per screen — navigation wiring + composes containers
  services/
    database/             # connection, versioned migrations, schema, one repository per table
    domain/               # pure TS business logic — no React, no native imports
    *.ts                  # platform wrappers: files, share, notifications, contacts, purchases
  store/                  # <domain>Store.ts + <screenName>ScreenStore.ts + index.ts
  utils/                  # helpers.ts, i18n.ts, dateTimeHelper.ts, focused per-organism builders
```

Only path alias: `@/*` → `src/*` (tsconfig `paths`; Metro reads it via
`experiments.tsconfigPaths`, Jest via `moduleNameMapper`). Relative imports only
within the same level (`../atoms`, `./Text`).

## Layers

```
Screen (thin shell: navigation ⇄ screen store, composes containers)
   │
   └─▶ Containers (one per screen section — its own store slice + its own render)
            │
            └─▶ templates / organisms / molecules / atoms     (UI only: tokens, t(), theme)
   │
   └─▶ Zustand store (domain stores AND per-screen stores; actions live here)
            └─▶ domain service (pure TS: calculations, validation, rules)
                     └─▶ repository / platform service (SQLite, files, share sheet, notifications…)
```

Three rules make this real rather than decorative:

1. **UI never touches storage or native APIs.** Not the screen, not a container.
   A component calling `getDatabase()` or a repository method directly is a
   layering violation, not a shortcut — that orchestration belongs in a store
   action, so there is exactly one path from a button press to a write.
2. **Domain logic has no React and no native imports**, so it is unit-tested in
   isolation and fast.
3. **The database is the source of truth for business data.** Zustand holds
   UI/session state and small persisted preferences. Derived values stay
   derived.

## Screens, containers and screen-scoped stores

A screen file is a **thin shell with a hard cap of ~200 lines**: route params,
navigation calls, and composing containers. It owns no `useState`, no database
calls, and no large render tree.

```tsx
// src/screens/HomeScreen.tsx
type Props = HomeStackScreenProps<typeof ROUTES.HOME>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const activeId = useAppStore((s) => s.activeId);
  const load = useHomeScreenStore((s) => s.load);
  const reset = useHomeScreenStore((s) => s.reset);

  useEffect(() => {
    if (!activeId) return;
    void load(activeId);
    return () => reset(); // module singleton — clear it so the next visit starts clean
  }, [activeId, load, reset]);

  return (
    <BaseScreen footer={<ActionsFooterContainer navigation={navigation} />}>
      <HomeHeaderContainer navigation={navigation} />
      <OverviewContainer />
      <ItemListSectionContainer navigation={navigation} />
      <FilterSheetContainer />
    </BaseScreen>
  );
};
```

A **container** owns one section of a screen end to end: it selects its own
slice of the screen's store (never receives that state as props), computes what
that section needs, and renders one presentational piece.

- **Location:** `src/containers/<screenName>/<Name>Container.tsx`, with an
  `index.ts` barrel per screen folder, mirroring
  `src/store/<screenName>ScreenStore.ts`.
- **Split boundary:** one container per visually/logically distinct section (a
  form, a list + header, a bottom sheet, a footer bar) — not one per field. A
  handful per screen is normal; dozens means the split is too fine.
- **Props:** `navigation` when it needs to navigate (navigation isn't app
  state), and rarely an id the parent already holds. Everything else comes from
  the store.
- **What may stay inline:** genuinely static markup with no state and no
  branching. If it reads a store or branches on data, it's a container.

**Why this is the default and not an optimisation:** state held on the screen
component re-renders the entire subtree — every container — on every change.
Per-container subscriptions mean typing in a note field re-renders the form, not
the list beside it. It also keeps screens reviewable: a 300-line screen with a
dozen `useState` calls is the shape this pattern exists to prevent.

## State management (Zustand)

- One store per domain: `src/store/<domain>Store.ts`. One store per screen with
  non-trivial state: `src/store/<screenName>ScreenStore.ts` — form fields,
  loaded reference data, which sheet is open, `isSaving`, plus the database
  orchestration the screen used to do inline. Both exported from
  `src/store/index.ts`.
- Select the smallest slice: `useStore((s) => s.field)`. Several fields →
  `useShallow`. Never destructure the whole store; never build a new
  object/array inside a selector.
- Actions live in the store; async actions call services. One action does one
  whole update — not three `set()` calls from a component.
- Screen stores are **never persisted** and are `reset()` on unmount (they're
  module singletons, so without the reset the next visit starts from stale
  state).
- `persist` + AsyncStorage only for small preferences: `partialize` lists the
  persisted keys, bump `version` and add `migrate` when the shape changes, and
  gate first render on `hasHydrated`.
- Outside React: `useStore.getState()`.

## Navigation

- Route names live in `ROUTES` (`navigation/routes.ts`); param lists in
  `navigation/types.ts` keyed by `ROUTES`.
- Root stack: onboarding (until completed) → optional lock gate → main tabs.
  Modal flows (forms, paywalls) go in the root stack with
  `presentation: 'modal'`.
- Each tab owns a native stack in `TabStacks.tsx`. Screen props via
  `RootStackScreenProps<typeof ROUTES.X>` /
  `<Tab>StackScreenProps<typeof ROUTES.X>`; `useNavigation()` is typed globally.
  Never a string-literal route, never `as never`.
- A screen reachable from several stacks takes a minimal navigation type (e.g.
  `{ goBack }`) rather than one stack's full type.

## Theming

- `BaseColors.ts` = raw palette. `Colors.ts` = **semantic** keys with identical
  names in light and dark (`primary`, `surface`, `surfaceSecondary`, `text*`,
  `border`, plus domain keys the product needs).
- `const { colors, isDark } = useAppTheme();` resolves system/light/dark. Atoms
  and templates use it, so every screen supports dark mode by default. Static
  `Colors` is only for theme-independent values.
- A new colour means: add to `BaseColors` **and** the same semantic key to both
  themes.

## Responsive / tablet

- `useResponsive()` → `{ width, height, isTablet }`, with one breakpoint
  (`BREAKPOINTS.MD`). Pick the value from the narrowest real tablet you support,
  not a round number.
- `ResponsiveBounds` caps body width (`GRID.CONTENT_MAX_WIDTH_STANDARD` for
  forms/detail/settings, `_WIDE` for lists/dashboards); `BaseScreen` exposes it
  via a `wide` prop. Every screen's body is wrapped.
- Portrait-only support is a legitimate scope: it makes tablet work a
  content-cap problem rather than a master-detail rewrite.

## Internationalisation

- `t('feature.key', { values })` for **every** user-facing string, including
  accessibility labels. Keys exist in every language file with an identical tree
  shape, added in the same change.
- `applyLanguage()` sets the locale and the native RTL flag; the navigator
  re-mounts on language change (`key={language}`) so every `t()` re-renders.
  Switching LTR↔RTL needs an app reload — prompt for it.
- Never compute translated content at module level: it runs once at import and
  goes stale on a language switch.
- Numbers/dates via `formatNumber`/`formatDate`; one central money/unit
  formatter if the domain needs one.

## Quality gates

`npm run verify` = type-check + lint + format check + tests. Green before every
commit. Performance budgets run separately (`npm run test:perf`) — see
[PERFORMANCE_AND_NATIVE_EXPERIENCE.md](./PERFORMANCE_AND_NATIVE_EXPERIENCE.md).
