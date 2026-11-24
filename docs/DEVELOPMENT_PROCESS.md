# Development Process

How work gets planned, built, reviewed and shipped with this starter kit.
Everything here was derived from shipping a real 48-screen offline-first app
with AI coding sessions doing most of the typing — these are the practices that
measurably kept it maintainable, not theory.

Read this once before the first task of a project, and again whenever you're
about to start a new milestone.

---

## 1. The spine: requirements → designs → roadmap → batches

Three artefacts exist before any code, and every later artefact references them
by ID:

| Artefact                                     | Gives you                            | ID scheme                                                           |
| -------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------- |
| `docs/product/Requirements_Specification.md` | What must be true                    | `FR-xx` functional, `NFR-xx` non-functional, `BR-xx` business rules |
| `docs/product/design_screens/`               | What it looks like, screen by screen | `A1`…`H3` screens, `J1`…`Jn` user journeys                          |
| `docs/ROADMAP.md`                            | The order it gets built in           | Milestones, then batches                                            |

**Why IDs matter more than they look.** Every JSDoc block, commit message, PR
description and roadmap line carries the IDs it implements. The payoff is that
any line of code can be traced back to the requirement that justifies it, and —
more usefully — a reviewer can ask "does this actually satisfy FR-23?" instead
of "does this look right?". It also stops the most common AI-session failure
mode: implementing a plausible feature that nobody asked for. If there's no ID,
it's not in scope.

Give each non-functional requirement a **number** wherever possible ("cold start
≤ 1.5s", "search across 100,000 records ≤ 500ms", "install size ≤ 30MB"). An NFR
without a number can never be closed; see
[PERFORMANCE_AND_NATIVE_EXPERIENCE.md](./PERFORMANCE_AND_NATIVE_EXPERIENCE.md).

---

## 2. Milestones and sub-milestones (batches) — the technique that made this maintainable

### The shape

A **milestone** is a vertical slice a user could notice: "onboarding & app
lock", "the main ledger", "reports & export", "settings, backup & purchases". A
milestone is too big to build, review or verify in one go, so it is split into
**batches** (sub-milestones), each of which is:

- **One branch, one PR, one `npm run verify`, one review pass.**
- Small enough to review in a sitting — in practice 3–8 screens, or one coherent
  layer.
- Independently shippable to `main`: at no point does `main` contain half a
  batch.
- Named so the dependency is obvious: `Milestone 4 — cash book` became
  `4a day view + entry CRUD` and
  `4b switch book, search, linked entries, share`.

The roadmap's job is to hold this structure, with checkboxes, in one file:

```markdown
## ✅ Milestone 4 — <name>

**Batch 4a — <what it delivers>:** <one line on why this batch comes first>

| Screen | Build | Components |
| ------ | ----- | ---------- |
| C1     | …     | …          |

- [x] <item that shipped, with the real file/function names>
- [ ] <item that did not, and why>

**Known gaps, not silently built around:** <the list — see §5>
```

### Why it worked

1. **Dependency order becomes visible.** Writing batches down forces you to
   notice that the data layer has no UI to show, that the Pro paywall can't
   exist before purchases, that reports need the period-range service first. The
   roadmap ends up being a build order, not a wish list.
2. **A batch is a reviewable unit.** A 40-file PR gets a rubber stamp; a 10-file
   PR gets real findings. Most of the genuinely important bugs found on this
   project were found in batch-sized reviews.
3. **`main` stays green and demoable.** Every batch ends with `npm run verify`
   green and the app runnable, so there is never a "we'll fix the build after
   the milestone" week.
4. **Context survives session boundaries.** AI sessions end — on context limits,
   on a restart, on a different day. A batch is roughly the amount of work one
   session can hold in its head, and the roadmap plus `CLAUDE.md`'s "Current
   state" is the handoff. This is the single highest-leverage practice in this
   document: **the durable docs, not the conversation, are the memory.**
5. **Scope creep gets a name.** "That's batch 6b" is a complete answer to a good
   idea at the wrong time.

### Two sequencing rules worth copying

- **Build the component library before the screens** (`Milestone 1` in the
  reference project). One milestone that builds every shared
  atom/molecule/organism the designs need — registered in
  `src/components/README.md` with its purpose, the screens that use it and its
  build order — means later milestones only ever _wire_ components to data. No
  new UI pattern gets invented mid-feature, and 66 components stayed consistent
  because they were built as a set rather than one-per-screen.
- **Build the data layer before the UI that needs it** (`Milestone 2`), and
  split it: pure domain logic first (interfaces, enums, calculations —
  unit-testable with no native module at all), then the database/repository
  layer. Pure logic tested to near-100% coverage early pays for itself for the
  rest of the project, because every later bug is then either a UI bug or a
  wiring bug, never an arithmetic bug.

### Batch sizing smells

- A batch whose PR touches more than ~25 files, or that you can't describe in
  two sentences → split it.
- A batch that can't be verified without another batch → wrong order, re-slice.
- Two batches editing the same files for different reasons → merge them, or make
  one depend on the other.

---

## 3. The development cycle (per batch)

Follow this loop for every batch. Steps 2–7 are not optional and not
reorderable.

```
0. Load the skill        .claude/skills/react-native-development/SKILL.md
1. Read                  requirements (FR/NFR/BR) + design screens + ROADMAP's batch + DECISIONS
2. Search before create  grep the repo for the helper/component/enum/key you're about to add
3. Build                 layer by layer: tokens → props → component → store → container → screen
4. Verify                npm run verify  (type-check + lint + format + tests) — all green
5. Review                independent review pass with the PR-review skill; fix the findings
6. Commit                type(scope): description (FR-xx)
7. PR                    one per batch, body = what shipped / what didn't / test plan
8. Update docs           tick ROADMAP, update CLAUDE.md "Current state", add DECISIONS entries
```

### Step 2 in practice

```bash
grep -rn "formatSomething\|similar logic" src/
ls src/components/*/ src/hooks src/store src/services
grep -n "^export" src/utils/*.ts src/constants/design/*.ts
```

Duplication is the single most common finding in review on this kind of project,
and it is almost always preventable by thirty seconds of grep. The second most
common is a literal (string, colour, size) that a token or an i18n key already
models.

### Step 5: review with a _fresh_ reviewer

The author of a change is the worst reviewer of it, and this is _more_ true when
the author is an AI session that has been looking at the same files for an hour.
So the review step is done by something that has not seen the work being built:

- a **separate agent/session** given only the diff, the requirements and the
  PR-review skill, or
- a **human** reading the same diff, or
- both, for a milestone-closing batch.

Run it **before** opening the PR, so the PR description can honestly say what
the review found and how it was fixed. On the reference project this caught real
correctness bugs in almost every batch — a period selector that overshot into
future dates, an auto-tag matching on a translated (and renameable) display
name, a report that counted archived records in one total but not the other.
None of those would have been found by tests that the same session wrote for its
own code.

### Step 8: the docs are part of the batch, not paperwork

A batch is not done until:

- `docs/ROADMAP.md` checkboxes reflect reality — **including the ones that are
  still unticked**;
- `CLAUDE.md`'s "Current state" says what now exists and what the next batch is;
- any decision made along the way is a new row in `docs/DECISIONS.md`;
- `src/components/README.md` lists any new shared component.

Docs drift is cheap to prevent and expensive to repair. A reference-project
audit found an entire five-batch feature rollout (tablet support) that had
shipped to `main` with no roadmap section and no decision entry — meaning the
next session had no way to know a new mandatory layout primitive existed. Tick
the boxes in the same commit as the code, or at latest in the batch's own PR.

---

## 4. When to open a PR

Open one **per batch**, when all of these are true:

- `npm run verify` is green locally;
- the independent review pass has run and its findings are fixed (or consciously
  deferred and written down);
- the batch's roadmap items are ticked and `CLAUDE.md` is updated;
- the branch is rebased/merged up to date with `main` and the diff contains
  nothing beyond the batch's scope.

**Don't** open a PR to "save work" — that's what pushing a branch is for.
**Don't** bundle two batches into one PR because they're both ready. **Do** open
one even if the batch is small (a cross-cutting one-line accessibility fix
deserves its own reviewable PR).

### PR description template

```markdown
## Summary

<What this batch delivers, in requirement IDs and screen IDs.>

<Any deliberate scope decision — "we built X instead of Y because …". State it
here, not in a commit body nobody re-reads.>

**Known gaps (deliberate):** <what a reader might expect to find and won't, and
why.>

## Test plan

- [x] `npm run verify` green: <N> suites / <N> tests (<N> new)
- [x] <what the new tests actually cover>
- [ ] <what was NOT verified — e.g. "no iOS device available; RTL covered only
      by mocked tests">
```

That last unchecked box is the important one. A test plan that claims everything
was verified when it wasn't is worse than no test plan.

### Merge or stack?

Merge each batch's PR into `main` as it is approved. Long-lived stacked PRs were
tried on the reference project and became a liability: six open PRs deep, every
rebase touched the same files, and the "current state" of the code was spread
across branches nobody could diff cleanly. If a batch genuinely must stack, say
so explicitly in the PR body and merge the stack bottom-up promptly.

---

## 5. "Known gaps, not silently built around"

The most valuable convention in the reference project's docs. When a batch can't
deliver something — the design shows a control that needs a feature from a later
milestone, a component can't do what the mockup implies, a platform API isn't
available in this environment — you have three options, and only one is
acceptable:

| Option                                             | Verdict                                                                         |
| -------------------------------------------------- | ------------------------------------------------------------------------------- |
| Fake it (mock data, a button that does nothing)    | ❌ Never. A fake is indistinguishable from a bug later.                         |
| Build it silently differently and say nothing      | ❌ The next session "fixes" it back, or ships the mismatch.                     |
| Build the honest subset and **write the gap down** | ✅ In the PR body, the roadmap batch, and `CLAUDE.md` if it outlives the batch. |

Concrete pattern from the reference project: features behind a paid tier were
**built for real and shown dimmed under a lock overlay**, with the gate
explaining itself — never hidden, never faked with placeholder data. When no
purchase flow existed yet, the unlock button said so honestly. That left a
working, demoable, honest app at every point in the build.

---

## 6. Using the Claude skills in this kit

Two skills live in `.claude/skills/`. They are loaded with the `Skill` tool, or
by typing `/<name>`.

### `react-native-development`

**When:** before writing or changing _any_ code in the repo — the first tool
call of a coding task, before reading the target file.

**What it gives you:** the folder map and the "where does this go?" table, the
component + props templates with the expected JSDoc density, the import-order
rule, the screen/container/store split, the Zustand patterns, the i18n and
theming rules, the testing conventions, and the hard-won gotchas (strict-TS
traps, accessibility-hiding, animation-value creation, conditionally-required
props).

**Why a skill and not just the docs:** it is written as _instructions for the
session about to type_, ranked by what actually goes wrong, so it changes the
first draft rather than catching problems in review.

### `pr-review-react-native`

**When:** after a batch builds and verifies, **before** opening the PR. Also
whenever asked to review a diff, a branch or a PR number. Ideally run by a fresh
session or agent (see §3, step 5).

**What it gives you:** step 1 is a mechanical architecture-conformance sweep
(layering violations, screens holding state, store selector misuse, props/enum
placement, i18n keys, tokens, RTL props, per-field JSDoc). Step 2 is a
**frequency-ranked** substantive checklist — ordered by what the project's
reviewer actually raises most often, with an explicit "de-prioritize" list of
generic nits that waste review attention.

**How to use it well:** give the reviewing session the diff, the requirement IDs
the PR claims, and the design screens — then make it rank findings and tie each
to `file:line`. Fix the blocking findings, write the deferred ones into the PR
body, and only then open the PR.

### Keeping the skills alive

When review finds the same class of mistake twice, that's a signal the _skill_
is missing a rule, not that someone was careless. Add the rule to the skill,
with the concrete example and the PR it came from. Both skills in this kit carry
those annotations ("flagged on PR #10", "recurred through PR #6, #8") on
purpose: a rule with a war story attached gets followed.

---

## 7. Decisions and open questions

`docs/DECISIONS.md` is an append-only table: `# · date · decision · why`. Rules:

- Add a row the moment a decision is made, including the "why" — the why is what
  stops it being re-litigated.
- Never edit an old row to change its meaning; add a new row that supersedes it.
- Keep an **open questions** list at the bottom for decisions that are genuinely
  the owner's to make (pricing, branding, legal, platform minimums). A batch
  blocked on one of these is blocked on a person, not on research — say so in
  the roadmap instead of guessing.

---

## 8. Session hygiene for AI-assisted work

- **Start by reading, not typing.** `CLAUDE.md` → the batch in `docs/ROADMAP.md`
  → the relevant requirements and design screens → the development skill. A
  session that starts typing from the prompt alone re-invents patterns that
  already exist.
- **Don't trust the conversation as memory.** If something matters beyond this
  session, it goes in a doc.
- **Prefer "not built, and here's why" over "built, probably".** Report what was
  actually verified; if tests were skipped or a device wasn't available, say it
  in the PR.
- **Be accurate about what shipped.** On a stale-docs audit, two separate "known
  gaps" turned out to have been fixed weeks earlier and never recorded — the
  docs were scaring future sessions away from solved problems.
- **One batch per session where possible.** Finish it: verify, review, commit,
  PR, docs. A half-finished batch is the most expensive state a project can be
  in.
