---
name: react-native-development
description: Build features in a React Native Expo app using this starter kit's architecture: atomic design, Zustand, thin screens + containers, models/, i18n, theme tokens, ESLint import order, performance and native-feel requirements. Use for any code change in this repo.
---

# React Native Development (starter-kit conventions)

Source of truth in the repo: `CLAUDE.md`, `docs/ARCHITECTURE.md`,
`docs/CODING_GUIDELINES.md`, `docs/PERFORMANCE_AND_NATIVE_EXPERIENCE.md`,
`docs/DECISIONS.md`, `eslint.config.js`. When this skill and those disagree, the
repo's own docs win — and fix the skill.

## 0. Before writing any code

1. **Read the requirement and the design** for what you're building: the
   requirements spec (`FR-xx`/`NFR-xx`/`BR-xx`), the design screens (screen IDs)
   and user journeys. Reference those IDs in JSDoc, commits and the PR. Check
   `docs/ROADMAP.md` for the current batch — build that batch, not the whole
   milestone.
2. **Search before you create** — never duplicate:
   ```bash
   grep -rn "functionName\|similar logic" src/
   ls src/components/*/ src/hooks src/store src/services src/containers
   grep -n "^export" src/utils/*.ts src/constants/design/*.ts
   ```
3. **Decide the layer** (§2). Logic used in 2+ places goes to `src/utils/` or a
   domain service, never inside a component.
4. Finish with `npm run verify` green, then the PR-review skill, then update
   `docs/ROADMAP.md` and `CLAUDE.md`.

## 1. Structure

```
App.tsx                  # SafeAreaProvider, splash until the store hydrates, applyLanguage, AppNavigator
src/
  assets/i18n/supportedLanguages/<lang>/app.json   # ALL user-facing strings
  components/{atoms,molecules,organisms,templates}/ + index.ts + README.md (registry)
  constants/design/      # BaseColors, Colors (light+dark), Typography, Dimensions
  constants/enums.ts     # app-wide enums (imported via @/models/enums)
  containers/<screenName>/   # one <Name>Container.tsx per screen section
  hooks/                 # useAppTheme, useResponsive, feature hooks
  models/{enums,interfaces,props}/
  navigation/            # routes.ts (ROUTES), types.ts, AppNavigator, MainTabNavigator, TabStacks
  screens/               # thin shells only
  services/{database,domain}/ + platform wrappers
  store/                 # <domain>Store.ts, <screenName>ScreenStore.ts, index.ts
  utils/                 # helpers.ts, i18n.ts, dateTimeHelper.ts, build<Organism><Noun> builders
```

Only alias: `@/*` → `src/*`. Relative imports only within a level (`../atoms`,
`./Text`).

## 2. Where does it go?

| Writing…                                    | Location                                                    | Rule                                             |
| ------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------ |
| Visual primitive                            | `components/atoms/X.tsx` + `models/props/atoms/X.ts`        | No business logic, no store                      |
| Small combo of atoms                        | `components/molecules/`                                     | One purpose, reusable                            |
| Section with logic/variants                 | `components/organisms/`                                     | Render methods (§6)                              |
| Layout pattern                              | `components/templates/`                                     | `BaseScreen` wraps every screen                  |
| One section of a screen (form, list, sheet) | `containers/<screenName>/<Name>Container.tsx`               | Owns its own store slice (§7)                    |
| Screen                                      | `screens/<Name>Screen.tsx`                                  | Thin shell, ~200 line cap                        |
| Shared state                                | `store/<domain>Store.ts`                                    | Zustand, smallest slice                          |
| Screen state (form fields, open sheet, …)   | `store/<screenName>ScreenStore.ts`                          | Never `useState` on the screen                   |
| Data shape                                  | `models/interfaces/<Name>.ts`                               | `import type`                                    |
| Fixed value set                             | `constants/enums.ts` → re-export in `models/enums/index.ts` | No string literals for variants/status           |
| Pure helper                                 | `utils/helpers.ts` or a focused util file                   | Typed, JSDoc, exported from `utils/index.ts`     |
| Business calculation / rule                 | `services/domain/<name>.ts`                                 | Pure TS, no React/native imports, tested         |
| I/O (DB, files, share, notifications, IAP)  | `services/`                                                 | Components and stores never call native directly |

After adding anything: export it from the folder's `index.ts`, and add new
shared components to `src/components/README.md`.

## 3. Golden rules

1. **Search before create; centralise immediately.**
2. **No hardcoded user-facing strings** — `t('feature.key')` for labels, titles,
   alerts, placeholders **and accessibility labels**. Add the key to every
   language file in the same change, identical tree shape. Never build
   translated content at module level (it runs once at import and goes stale
   after a language switch).
3. **No hardcoded design values** — theme colours via `useAppTheme().colors`,
   spacing `SPACING`, radius `BORDER_RADIUS`, icons `ICON_SIZES`, text via
   `<Text variant=…>`, shadows `...ELEVATION.CARD`. Colour literals only inside
   `src/constants/design/`.
4. **Enums, not string literals**; import enums only from `@/models/enums`.
5. **Strict TypeScript** — no `any`, no `@ts-ignore`. Respect
   `exactOptionalPropertyTypes` (forwarding `disabled={props.disabled}` fails;
   write `?? false`) and `noUncheckedIndexedAccess` (index reads are
   `T | undefined`). Explicit return types on exports and render methods.
   Exported types live in `src/models/`.
6. **Minimal store subscriptions** — `useStore((s) => s.field)`; never
   destructure the whole store, never create an object/array inside a selector.
   `useShallow` for several fields.
7. **Dark mode + RTL + tablet by default** — theme colours, `marginStart/End`,
   `align="start"`, body wrapped in `ResponsiveBounds`. Numbers stay LTR; mirror
   directional icons under RTL.
8. **Accessibility** — `accessibilityRole`, translated `accessibilityLabel`,
   ≥48dp targets, never colour-only meaning. A field's visible label must also
   reach the native `accessibilityLabel`. `pointerEvents="none"` does **not**
   hide content from a screen reader: anything visually covered (lock overlay,
   skeleton, disabled preview) needs `accessibilityElementsHidden` **and**
   `importantForAccessibility="no-hide-descendants"`.
9. **Performance is a requirement** — virtualised lists, memoised rows, no heavy
   work in a press handler, one query per section (not per row). See
   `docs/PERFORMANCE_AND_NATIVE_EXPERIENCE.md`.
10. **JSDoc on everything exported** (`@component`, `@example`, `@usage`,
    `@param`, `@returns`) **and on every single field of every exported
    interface/type/enum member** — obvious ones included. Verify, don't
    remember:
    `grep -B1 '^\s*\w\+[?]\?:' path/to/Props.ts | grep -B1 -v '/\*\*'`.
11. **A derived boolean must gate every visual branch it owns.** If you compute
    `isChecked = checked && !disabled`, every checked-ness branch (fill, border,
    icon) reads `isChecked` — mixing the raw prop into one branch and the
    derived value into another breaks the combination nobody tested.
12. **Conditionally-required props need a discriminated union, not a comment.**
    Narrow on the discriminant in the component; a `?? (() => {})` fallback
    silently no-ops at runtime instead of failing to compile.
13. **Domain invariants are non-negotiable** — e.g. money in integer minor
    units, derived values never stored, rows that must agree written in one
    transaction, system rows identified by a stable key rather than a translated
    display name.

## 4. Import order

Follow ESLint `import/order` (`npm run lint:fix` sorts):
`builtin → external → internal (@/…) → parent → sibling → index`, one blank line
between groups, alphabetical (case-insensitive) inside each. Type-only imports
are separate `import type` statements right after the value import from the same
module. Don't hand-order by "kind".

## 5. Component + props template

```ts
// src/models/props/molecules/ItemRow.ts
/** Props for ItemRow (FR-xx) */
export interface ItemRowProps {
  /** Item to display */
  item: Item;
  /** Called when the row is pressed */
  onPress?: (item: Item) => void;
  /** Extra container styles */
  style?: StyleProp<ViewStyle>;
  /** Test identifier for the row container */
  testID?: string;
}
```

```tsx
/**
 * ItemRow (Molecule)
 *
 * One list row: leading icon, label, trailing value (design <screen id>).
 *
 * @component
 * @example
 * <ItemRow item={item} onPress={open} />
 *
 * @usage Used in:
 * - Organisms: ItemList
 */
const ItemRow: React.FC<ItemRowProps> = ({ item, onPress, style, testID }) => {
  const { colors } = useAppTheme();

  // ==========================================
  // Event Handlers
  // ==========================================
  const handlePress = useCallback((): void => onPress?.(item), [item, onPress]);

  // ==========================================
  // Render Methods
  // ==========================================
  /** Leading icon in a tinted square */
  const renderIcon = (): React.JSX.Element => ( /* … */ );

  // ==========================================
  // Render
  // ==========================================
  return ( /* … */ );
};

const styles = StyleSheet.create({ /* static only; theme colours inline */ });

export default memo(ItemRow);
```

If the component duplicates a platform capability (a custom keypad instead of a
numeric `TextInput`) or nests a second interactive element inside the first, the
JSDoc says **why** — that question always gets asked in review.

## 6. Render methods & builders

- Split JSX into named render methods past ~100 lines or once there are
  states/variants: `renderHeader`, `renderEmptyState`, `renderList`,
  `renderItem(item)`, `renderFooter`. Typed returns, one-line JSDoc each. Guards
  first in the main render, then `switch (variant)`. No business logic inside
  them.
- When an organism builds an array of child props inline **with logic**
  (disabled states, conditional fields, computed labels), extract
  `build<Organism><Noun>` into `src/utils/<organismName>.ts`, re-export it from
  `utils/index.ts`, and unit-test the combinations.

## 7. Screens, containers & templates

**A screen file is a thin shell, hard cap ~200 lines.** It wires route params
and navigation to a screen-scoped store and composes containers — no `useState`,
no `getDatabase()`, no large render tree.

```tsx
export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const activeId = useAppStore((s) => s.activeId);
  const load = useHomeScreenStore((s) => s.load);
  const reset = useHomeScreenStore((s) => s.reset);

  useEffect(() => {
    if (!activeId) return;
    void load(activeId);
    return () => reset(); // module singleton — reset so the next visit starts clean
  }, [activeId, load, reset]);

  return (
    <BaseScreen footer={<ActionsFooterContainer navigation={navigation} />}>
      <HomeHeaderContainer navigation={navigation} />
      <OverviewContainer />
      <ItemListSectionContainer navigation={navigation} />
    </BaseScreen>
  );
};
```

A **container** owns one section end to end: selects its own slice (never takes
that state as props), computes its derived values, renders one presentational
piece. Because each subscribes independently, typing in a form re-renders the
form container only — that's the point of the pattern, not a micro-optimisation.

- One container per distinct section (form, list + header, bottom sheet, footer
  bar) — not per field.
- Containers take `navigation` when they navigate (navigation isn't app state)
  and rarely an id. Nothing else.
- Static markup with no state and no branching can stay inline in the screen. If
  it reads a store or branches on data, it's a container.
- Templates: `BaseScreen` (`scrollable`, `padded`, `edges`, `footer`, `wide`),
  `ScreenSection`, `ResponsiveBounds`, `PlaceholderScreen`. `scrollable={false}`
  when the screen owns a list.
- Build new screens in this shape from the start — never "monolith now, split
  later".

## 8. Navigation

- Add names to `ROUTES`, params to the right list in `navigation/types.ts`,
  register in `TabStacks.tsx` or `AppNavigator.tsx` (modals with
  `presentation: 'modal'`).
- Type screens with `RootStackScreenProps<typeof ROUTES.X>` /
  `<Tab>StackScreenProps<typeof ROUTES.X>`. Never a string literal, never
  `as never`. A screen reachable from several stacks takes a minimal
  `{ goBack }` type.

## 9. State (Zustand)

```ts
export const useHomeScreenStore = create<HomeScreenState>()((set, get) => ({
  ...INITIAL_STATE,
  load: async (id) => {
    const db = await getDatabase();
    const [a, b] = await Promise.all([/* … */]);
    set({/* … */});
  },
  save: async () => {
    // validate, write, return success — the container navigates, not the store
    return true;
  },
  reset: () => set(INITIAL_STATE),
}));
```

- One store per domain + one per screen with non-trivial state, all exported
  from `store/index.ts`.
- Actions live in the store; async actions call services. One action per whole
  update.
- Screen stores are never persisted; the screen calls `load` on mount and
  `reset` on unmount.
- `persist` + AsyncStorage only for small preferences (`partialize`, `version`,
  `migrate`, `hasHydrated` gate).
- Stable module-level empty fallbacks (`const EMPTY: T[] = []`), never `?? []`
  in a selector.
- Navigation stays out of stores: a container awaits the action and calls
  `navigation.goBack()` itself.

## 10. i18n

`t(key, values?)`, `tp(key, count)`. Dot-notation keys by feature
(`common.save`, `navigation.home`, `home.summary.total`). Interpolation
`{{name}}`; plurals via `one`/`other`. Language change applies the locale and
the RTL flag and re-mounts navigation; LTR↔RTL needs a reload — prompt for it.
Dates/numbers via `formatDate`/`formatNumber`.

## 11. Design system

- `BaseColors` = raw palette; `Colors` = semantic keys **identical in light and
  dark**. New colour → both themes, same key.
- `<Text variant="h1|h2|h3|bodyLarge|body|caption|label|button" color="textSecondary" align="start|center|end" truncate>`.
- 8-pt spacing scale; touch targets ≥48dp; match the design mockups rather than
  approximating them.
- Check a mockup before assuming two similar components should match each other
  — designs differ on purpose sometimes. Verify, and leave a one-line note of
  what you checked.

## 12. Services & data

- Layering is literal: a screen or container must never call `getDatabase()` or
  a repository. That belongs in a store action, so there is one path from a
  press to a write.
- Domain logic is pure and fully unit-tested; repositories are one-per-table;
  migrations are versioned and tested; rows that must agree change in one
  transaction.
- Guard everything crossing the type boundary — database rows, picked files,
  restored JSON, index reads.
- Adding a native package: `npx expo install <pkg>`, then `npm run deps:check`.
  If it doesn't run in Expo Go, say so in the PR — the team needs a development
  build from then on.
- Shared date/time composition lives in `src/utils/dateTimeHelper.ts`. Don't
  reimplement a date format inline a second time.

## 13. Performance & native feel

Virtualised lists with memoised rows and `getItemLayout`; narrow selectors;
`useCallback`/`useMemo` only where they pay; native driver for transform/opacity
(`useNativeDriver: false` is required for layout properties); nothing heavy on
the JS thread during a gesture. Safe areas, keyboard handling, platform
back/swipe gestures, haptics on meaningful commits, system pickers over in-app
reimplementations, loading/empty/error states everywhere. Budgets with numbers,
measured — never claimed. Full checklist:
`docs/PERFORMANCE_AND_NATIVE_EXPERIENCE.md`.

## 14. Animation

- `const [anim] = useState(() => new Animated.Value(initial))` — not
  `useRef(...).current` (the lint rules reject reading a ref during render).
- `useNativeDriver: false` for layout properties; only transform/opacity support
  the native driver.
- Skip the tween on first mount (a `useRef(true)` flag read inside the effect) —
  the initial value is already correct and animating `initial → initial` trips
  the `act()` warning in tests.
- An `Animated.View`'s `style` renders as one flattened object in tests, not an
  array.

## 15. Testing

- `__tests__/` next to the code. Domain/utils: unit tests. Stores: drive actions
  via `getState()`. Components: RNTL (`await render`,
  `getByRole('button', { name })`, `await fireEvent.press`).
- New domain logic or util ⇒ tests in the same change. Test **every** occurrence
  of a shared structural pattern, not just the first one.
- Prefer a real in-memory database over a mock when testing SQL.

## 16. Quality gate & definition of done

`npm run verify` (type-check + lint + format + tests) green before every commit.
Commits: `type(scope): description (FR-xx)`. One batch per branch/PR.

**Done** = verify green · no literals (strings/colours/sizes) · keys in every
language · exported via index files · JSDoc incl. every field · dark mode +
RTL + tablet + a11y · tests for new logic · matches the design · requirement IDs
referenced · review pass run and findings fixed · `docs/ROADMAP.md` ticked and
`CLAUDE.md` "Current state" updated · known gaps written down.
