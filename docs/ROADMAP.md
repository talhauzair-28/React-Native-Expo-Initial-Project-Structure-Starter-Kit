# Roadmap — <Project Name>

> **Template.** Replace the example content; keep the structure. One section per
> milestone, one sub-section per batch. Tick items as they land and keep
> `CLAUDE.md`'s "Current state" in sync. See
> [DEVELOPMENT_PROCESS.md](./DEVELOPMENT_PROCESS.md) §2 for how milestones and
> batches are sized.

Each batch = one branch, one PR, one `npm run verify`, one review pass. IDs
refer to the requirements spec (`FR-xx`/`NFR-xx`/`BR-xx`), the component
registry (`src/components/README.md`) and the designs (screen IDs, journey IDs).

**Checkbox discipline:** `[x]` only for what actually shipped, and keep the
`[ ]` lines — an unticked box is the most useful line in this file. Mark a
partially-done batch `◐` and say exactly which parts are not claimed.

---

## ✅ Milestone 0 — Project setup

Project scaffold, theme (light/dark), i18n (incl. one RTL language), navigation
skeleton, base atoms and templates, ESLint/Prettier/Jest, the docs in this
folder.

## ✅ Milestone 1 — Reusable component library

Build every shared component the designs need **before** any screen is built for
real, so later milestones only wire components to data and no new UI pattern is
invented mid-feature. Full inventory, screen mapping and build order live in
`src/components/README.md` — keep it in sync with every PR here.

- [ ] **1a. <set name>** (unblocks Milestone <n>) — atoms: … molecules: …
      organisms: …
- [ ] **1b. <set name>** (unblocks Milestone <n>) — …
- [ ] A dedicated light + dark + RTL + tablet visual QA pass across every
      component, ≥48dp targets (defer to the polish milestone if no screens
      exist to check against yet — but write the deferral down)

## ✅ Milestone 2 — Data layer (no UI)

**Batch 2a — domain foundations:** interfaces, enums and pure calculations need
no native module and are fully unit-testable, so they come first and give batch
2b real types to sit on.

- [ ] Interfaces in `models/interfaces/` + enums in `constants/enums.ts` (spec
      §4.1)
- [ ] Pure domain services in `services/domain/` with high unit-test coverage
- [ ] Seed/default data templates

**Batch 2b — database layer:** connection + keying, versioned migrations,
schema, one repository per table, transactional writes where rows must agree.

- [ ] `npx expo install expo-sqlite …` (note if this forces a development build
      from here on)
- [ ] `services/database/`: `connection.ts`, `migrations.ts`, `schema.ts`
- [ ] Repositories with soft delete where the domain needs it; transactions for
      linked rows
- [ ] Tested against a real in-memory database, not a mock

## Milestone 3…N — <feature milestones>

One section per milestone, split into batches. For each batch, a table mapping
**screen ID → what gets built → which components it uses**, then the checklist,
then:

**Known gaps, not silently built around:** <what a reader might expect and won't
find, and why — see [DEVELOPMENT_PROCESS.md](./DEVELOPMENT_PROCESS.md) §5. Never
fake; always write it down.>

## Milestone N+1 — Polish & release

Different in kind from the feature milestones: no new screens, mostly QA and
infrastructure. Batch it anyway.

- [ ] **Qa — Dark/RTL/accessibility/tablet QA pass:** screen by screen on a real
      device, in every theme, direction and form factor. Log every finding; fix
      the cross-cutting ones once rather than per screen.
- [ ] **Qb — Performance budgets:** seed to real target scale, measure each
      `NFR` with a number, fix only what misses. Record which budgets are
      device-level and therefore not covered by automated tests.
- [ ] **Qc — E2E tests:** one flow per acceptance criterion, run against the
      real compiled app.
- [ ] **Qd — Release prep:** store listings, privacy policy, icons/screenshots,
      build profiles and signing. Flag the items that are blocked on business
      decisions rather than on work (pricing, final name, legal).
