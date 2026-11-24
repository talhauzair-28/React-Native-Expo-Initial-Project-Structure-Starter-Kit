# Decision Log

Decisions already made, so they don't get re-litigated. **Append-only:** add new
rows at the bottom; never edit an old row to change its meaning — add a new row
that supersedes it, and say so.

Each row: number · date · the decision · **why**. The "why" is the whole point;
a decision without one gets re-opened by the next person (or the next AI
session) who thinks they see something better.

| #   | Date       | Decision                                                                                     | Why                                                                                                                |
| --- | ---------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1   | YYYY-MM-DD | <Product shape: what the app is and who it's for>                                            | <the constraint or insight behind it>                                                                              |
| 2   | YYYY-MM-DD | <Backend or no backend; where data lives>                                                    | <privacy, cost, offline requirement…>                                                                              |
| 3   | YYYY-MM-DD | <Monetisation model>                                                                         | <market fit, running costs>                                                                                        |
| 4   | YYYY-MM-DD | **Zustand**, not Redux Toolkit                                                               | Selector-level subscriptions (fewer re-renders), no boilerplate/providers, tiny bundle; heavy data lives in SQLite |
| 5   | YYYY-MM-DD | No UI kit — atoms built on React Native primitives                                           | Full control of the design, smaller bundle, no stale third-party dependency to fight                               |
| 6   | YYYY-MM-DD | Import order = ESLint `import/order`                                                         | One enforceable rule; docs follow the linter rather than competing with it                                         |
| 7   | YYYY-MM-DD | Preferences persisted via Zustand `persist` + AsyncStorage; business data in SQLite          | AsyncStorage is right for a handful of prefs and wrong for records                                                 |
| 8   | YYYY-MM-DD | Screens split into a thin shell + containers, each owning a slice of a per-screen store      | Screen-level `useState` re-renders the whole screen on every keystroke, and screens grow past maintainable size    |
| 9   | YYYY-MM-DD | Tablet support is a content-cap problem (one breakpoint + `ResponsiveBounds`), portrait only | Matches the requirement without a master-detail rewrite; one template stops 40 screens inventing max-widths        |
| 10  | YYYY-MM-DD | <Encryption / security posture>                                                              | <requirement it satisfies>                                                                                         |

## Open questions

Decisions that are the owner's to make, not research tasks. A batch blocked on
one of these is blocked on a person — say so in the roadmap instead of guessing.

1. <e.g. final app name / branding>
2. <e.g. price per market>
3. <e.g. minimum OS version>
