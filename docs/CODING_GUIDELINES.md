# Coding Guidelines

Rules for writing code in a project built on this starter kit. Architecture
(layers, folders, state) is in [ARCHITECTURE.md](./ARCHITECTURE.md); process in
[DEVELOPMENT_PROCESS.md](./DEVELOPMENT_PROCESS.md).

Every rule here exists because its absence caused a real review finding or a
real bug on a shipped project. Where a rule is commonly misunderstood, the
failure case is written out.

---

## 1. Search before you create

Before adding any helper, component, enum member, colour key, i18n key or model
field:

```bash
grep -rn "functionName\|similar logic" src/
ls src/components/*/ src/hooks src/store src/services
grep -n "^export" src/utils/*.ts src/constants/design/*.ts
```

Duplication is the most frequent review finding on this kind of codebase, and
thirty seconds of grep prevents almost all of it. Ask: does this already exist?
Can an existing component take one more prop instead of a parallel component
being built? Is this logic that belongs in `utils/` or a domain service rather
than inside this component?

**The red flags:** the same function name in two files, the same computation in
a component and its store, a colour calculation in more than one place, a
`format*` helper reimplemented inline, copy-pasted JSX.

---

## 2. No literals, ever

| Literal                         | Use instead                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| User-facing string              | `t('feature.key')`, key added to **every** language file in the same change         |
| Colour                          | `useAppTheme().colors.<semanticKey>` — literals only inside `src/constants/design/` |
| Spacing / radius / size         | `SPACING`, `BORDER_RADIUS`, `ICON_SIZES`, `LAYOUT` from `@/constants/design`        |
| Font size / weight              | `<Text variant="h1\|body\|caption\|label\|button…">`                                |
| Shadow / elevation              | `...ELEVATION.CARD`                                                                 |
| Variant / status / route string | an enum from `@/models/enums`, or `ROUTES`                                          |

Accessibility labels are user-facing text too. So are alert titles, placeholders
and empty-state copy.

---

## 3. Imports: let ESLint decide

`eslint.config.js` → `import/order`: groups
`builtin, external, internal (@/…), parent, sibling, index`, **one blank line
between groups, alphabetical (case-insensitive) within each group**,
`import/internal-regex: '^@/'`. Type-only imports are separate `import type`
statements (`consistent-type-imports`), placed right after the value import from
the same module. `npm run lint:fix` sorts them.

```ts
import { Feather } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { Card, Text } from '@/components/atoms';
import { SPACING } from '@/constants/design';
import type { ThemeColors } from '@/constants/design';
import { useAppTheme } from '@/hooks';
import { Size } from '@/models/enums';
import type { ItemRowProps } from '@/models/props';
import { useHomeStore } from '@/store';
import { t } from '@/utils/i18n';

import { Badge } from '../atoms';

import ItemAmount from './ItemAmount';
```

Don't hand-order by "kind" (i18n first, design second…) — alphabetical wins. Use
`@/` over `../../` chains. Import shared UI from the barrel, never reach into a
component's file path.

---

## 4. Per-field JSDoc — no exceptions

Every exported component gets a JSDoc block with `@component`, `@example` and
`@usage` (where it's used). **And every single field of every exported
`interface`/`type`, plus every `enum` member, gets its own one-line doc comment
— including the obvious ones.** `disabled?: boolean` still gets
`/** Dims the control and blocks presses */`. `SM = 'sm'` still gets
`/** Small */`. A bare `@default` tag is not a description.

This is the highest-frequency review finding in practice, and it recurs because
people rely on remembering while writing. Don't remember — verify before moving
on:

```bash
grep -B1 '^\s*\w\+[?]\?:' src/models/props/molecules/ItemRow.ts | grep -B1 -v '/\*\*'
```

Anything non-obvious also needs a **why** comment, not just a what: why this
optional field exists, why this cast is safe, why this component exists instead
of the obvious platform alternative, why a line was removed. Put the reasoning
in the JSDoc rather than a PR thread — the thread gets resolved and disappears.

---

## 5. TypeScript, strictly

- No `any` (lint error). Use `unknown` plus a type guard.
- Never `@ts-ignore` / `@ts-expect-error` to get past a type error — fix the
  type.
- `exactOptionalPropertyTypes`: forwarding an optional prop into another
  component's same-named optional prop still needs a default.
  `disabled={props.disabled}` (type `boolean | undefined`) fails unless the
  receiving prop's type explicitly includes `| undefined`; write
  `disabled={props.disabled ?? false}`.
- `noUncheckedIndexedAccess`: an index read is `T | undefined`. Guard it.
- Explicit return types on exported functions and on render methods.
- Exported types live in `src/models/` — an exported `interface` declared inside
  a component, store or service file is in the wrong place.
- **Don't cast (`as X`) without a runtime check first** — especially for JSON
  read from a file or a backup, and for database rows.
- **Conditionally-required props need a discriminated union, not a comment.** If
  prop B is only valid when prop A has a certain value, model it as a union of
  variant interfaces on the discriminant — a doc comment doesn't stop a caller
  omitting the pair, and an `onChange ?? (() => {})` fallback silently no-ops at
  runtime instead of failing at compile time. In the component, destructure the
  common fields, then narrow on `props.<discriminant>` to reach variant-only
  fields.

---

## 6. Component structure

```ts
// src/models/props/molecules/ItemRow.ts
import type { StyleProp, ViewStyle } from 'react-native';

import type { Item } from '@/models/interfaces';

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
 * One list row: leading icon, label and trailing value (design <screen id>).
 *
 * @component
 * @example
 * <ItemRow item={item} onPress={openItem} />
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

const styles = StyleSheet.create({ /* static values only; theme colours applied inline */ });

export default memo(ItemRow);
```

Checklist: right atomic level · props in `models/props/<level>/` · JSDoc with
`@usage` · every prop field commented · theme colours via `useAppTheme` · tokens
only · `t()` everywhere · section dividers (`Helper Methods`, `Event Handlers`,
`Render Methods`, `Render`) · `StyleSheet.create` at the bottom · `memo` on list
rows · `testID` on interactive elements · exported from the folder's `index.ts`.

### Render-method pattern

Split JSX into named render methods once a component passes ~100 lines or gains
states/variants: `renderHeader`, `renderEmptyState`, `renderList`,
`renderItem(item)`, `renderFooter`. Return types `(): React.JSX.Element` or
`| null`, one-line JSDoc each. Main render: guards (loading/empty/error) first,
then `switch (variant)`. No business logic inside a render method; no render
method for two lines of JSX.

### Pull item-array construction out of data-driven organisms

When an organism assembles an array of child props inline in its JSX and the
assembly has real logic (disabled states, conditional fields, computed labels),
extract a pure builder: an exported function named `build<Organism><Noun>` in a
focused file at `src/utils/<organismName>.ts` (not the catch-all `helpers.ts`,
since it imports prop types and `t()`), re-exported from `utils/index.ts`, with
its own unit tests covering the logic combinations. The organism then just calls
it.

### A derived boolean must gate every branch it owns

If a component computes `const isChecked = checked && !disabled`, then **every**
visual branch representing checked-ness reads `isChecked` — fill, border, icon,
all of them. Mixing the raw prop into one branch and the derived value into
another produces a state nobody tested (a disabled-checked control rendering an
icon with no fill behind it, a real shipped bug).

### Animation

- Create the `Animated.Value` with a lazy `useState` initialiser —
  `const [anim] = useState(() => new Animated.Value(v))` — not
  `useRef(...).current`, which this kit's `react-hooks` lint rules reject during
  render.
- `useNativeDriver: false` is **required** for layout properties (width/height);
  only transform and opacity support the native driver. Dropping this throws at
  runtime.
- Skip the tween on first mount (a plain `useRef(true)` flag read inside the
  effect): the initial value is already correct, and animating
  `initial → initial` trips testing-library's `act()` warning.
- An `Animated.View`'s rendered `style` in a test is one flattened object, not
  the array a plain `View` gets.

---

## 7. Accessibility (a requirement, not a nit)

- `accessibilityRole` and a translated `accessibilityLabel` on every interactive
  element.
- Touch targets ≥ 48dp (`LAYOUT.TOUCH_TARGET_SIZE`), `hitSlop` when the visual
  is smaller.
- Never colour alone for meaning — pair it with an icon, a sign, or a label.
- A field's visible `label` must also reach the native element's
  `accessibilityLabel`; wiring one and not the other means screen readers
  announce a bare "text field".
- **`pointerEvents="none"` does not hide anything from a screen reader.** Any
  view that visually dims or covers real content (a lock overlay, a skeleton, a
  disabled preview) needs `accessibilityElementsHidden` **and**
  `importantForAccessibility="no-hide-descendants"`. Testing-library honours
  this — query such content with `{ includeHiddenElements: true }` if a test
  must reach it.
- Support font scaling to 200% without clipping, especially numbers.

## 8. RTL

`marginStart/End`, `paddingStart/End`, `align="start|end"` — a `left`/`right`
layout prop is a bug in an RTL language. Mirror directional icons
(back/disclosure chevrons) under RTL. Numeric values stay LTR.

## 9. Data, domain and services

- **UI → store → domain service → repository → database / native API.** A screen
  or container calling `getDatabase()` or a repository method is a layering
  violation; that orchestration belongs in a store action.
- Domain logic is pure TypeScript — no React, no native imports — and
  unit-tested directly.
- Repositories: one per table, in `services/database/`. Migrations versioned,
  run automatically, and tested from every released schema version.
- Multi-row writes that must agree go in **one transaction**.
- Keep derived values derived. Storing a computed total creates a second source
  of truth and a bug class that only shows up after an edit to old data.
- Identify seeded/system rows by a stable key column, never by a translated,
  user-renameable display name.
- Guard everything that comes from outside the type system: database rows,
  picked files, restored JSON, contact pickers, index reads. An unguarded access
  after an async read is a crash, not a style nit.
- `async`/`await` discipline: check mechanically that every function that awaits
  is `async`, and that every promise-returning call is awaited (store actions,
  service calls, transactions).
- Platform/native APIs (files, share, notifications, contacts, purchases,
  biometrics) are wrapped in a thin service in `src/services/` so no component
  or store imports a native module directly.

## 10. Testing

- Tests in `__tests__/` next to the code (`*.test.ts(x)`).
- Domain logic and utils: unit tests, high coverage — this is where correctness
  lives.
- Stores: call actions via `useStore.getState()` and assert the resulting state.
- Components: React Native Testing Library — `await render(...)`,
  `screen.getByRole('button', { name })`, `await fireEvent.press(...)`.
- New domain logic or a new util ships with its tests in the same change.
- **When several components share a structural pattern, test each occurrence**,
  not just the first. A sibling with identical logic and no test is exactly what
  a later refactor breaks silently.
- Prefer testing against a real in-memory database over a hand-rolled mock when
  the thing under test is SQL.

## 11. Verify before you commit

`npm run verify` = type-check + lint + format check + tests. Green, every time,
before every commit. No `console.log` left behind. Nothing in the diff beyond
the batch's stated scope.

---

## Golden rules

1. **Search before create.** Centralise immediately, not "later".
2. **No literals** — strings, colours, sizes, routes, variants all come from
   somewhere central.
3. **Annotate everything** — every field, plus a "why" wherever the reason isn't
   obvious from the code.
4. **Smallest possible state subscription**; one store action per whole update.
5. **Layers are enforced**, not aspirational: UI never touches storage or native
   APIs.
6. **Derived data stays derived.**
7. **Dark mode, RTL, tablet, accessibility on every screen** — not a later pass.
8. **Performance and native feel are requirements** with numbers behind them.
9. **Verify green before every commit.**
10. **Write down what you didn't do.**
