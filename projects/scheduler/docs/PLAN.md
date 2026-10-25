# Delivery Plan

UX comes first. We don't write product code until the core "mark availability"
interaction has been designed, prototyped, and tried on a real phone.

```
0. Discovery ─► 1. Requirements sign-off ─► 2. Design (Claude Design) ─► 3. Tech design
                                                 │                            │
                                                 └──── 2b. Gesture spike ─────┤
                                                                              ▼
              7. Migrate to own repo ◄── 6. Beta launch ◄── 5. Test ◄── 4. Build MVP
```

## Phase 0 — Discovery *(in progress)*

- [x] Set up a self-contained `projects/scheduler/` folder that's easy to migrate
- [x] Draft [REQUIREMENTS.md](REQUIREMENTS.md)
- [x] Start [REFERENCES.md](REFERENCES.md)
- [ ] Hands-on teardown: use when2meet, Crab Fit, LettuceMeet, and Rallly **on a phone**,
      and log specific pain points and good ideas in REFERENCES.md

**Exit:** the requirements draft and references exist, and the open questions are listed.

## Phase 1 — Requirements sign-off

- [ ] Answer the open questions in REQUIREMENTS.md (name, "if needed", granularity,
      audience, calendar import priority, retention, backend)
- [ ] Lock the P0 list. Everything else moves to P1/P2.
- [ ] Write the 3–5 **key user stories** that design must cover end to end

**Exit:** the P0 scope is frozen and the open questions are resolved or explicitly deferred.

## Phase 2 — UX design (Claude Design)

- [ ] Write `docs/DESIGN_HANDOFF.md`, the brief for Claude Design:
  - product summary, audience, tone, and brand direction (fit with Latent Lab, or its own identity?)
  - user flows: create → share → respond → results → finalize
  - screen inventory and every state (empty, partial, saving, offline, error, finalized)
  - **interaction spec for painting** (the §7.1 options), with an ask to prototype at least two
  - constraints: touch targets, in-app browsers, accessibility, light and dark mode
  - realistic sample data (event with 7 days, 30-min slots, 6 respondents)
- [ ] Explore in Claude Design: start with the **Respond** screen, then Results, then Create
- [ ] Review the prototypes **on a phone**. Iterate.
- [ ] Export the handoff bundle (components, styles, copy) and commit it under
      `projects/scheduler/design/`

**2b — Gesture spike (runs in parallel):** a throwaway HTML page that tests the 2–3
scroll-vs-paint approaches on real iOS Safari, Android Chrome, and an in-app browser.
Design can make an interaction *look* right, and only a device can confirm it *feels* right.
Lives in `projects/scheduler/spikes/`.

**Exit:** an approved clickable prototype of all P0 flows, plus a chosen gesture model
confirmed on real devices.

## Phase 3 — Technical design

- [ ] Stack decision. Current leaning:
  - **Frontend:** React + TypeScript + Vite (same as the website, so the skills carry over),
    built as a PWA
  - **Backend:** Cloudflare Workers + D1 (SQLite) for storage, and Durable Objects if we
    want live updates (V-5). Same vendor as the website hosting.
  - **Alternative:** Supabase (Postgres + realtime) if we'd rather not be Cloudflare-specific
- [ ] Data model (events, days, responses, slot bitsets) and API contract
- [ ] Timezone strategy: store UTC instants, render in the viewer's zone
- [ ] Auth tokens: organizer link, per-device respondent token, optional PIN
- [ ] Record decisions in the decision log below

**Exit:** the stack, data model, and API are written down. Repo layout:

```
projects/scheduler/
  docs/       requirements, plan, references, handoff
  design/     Claude Design export
  spikes/     throwaway prototypes
  app/        frontend (own package.json)
  api/        worker / backend (own package.json)
```

## Phase 4 — Build MVP (P0 only)

Built as vertical slices, each one deployable:

1. Create event → shareable link → empty event page
2. Respond: name + paint availability + autosave (**the hard one, most of the effort goes here**)
3. Results: ranked best times + group grid with tap-for-details
4. Edit own response (device token), organizer edit and delete
5. Polish: share sheet, link previews, empty and error states, accessibility pass

Add a separate CI workflow (`scheduler.yml`, path-filtered) for typecheck, lint, and tests.

**Exit:** every P0 requirement is met on a staging URL.

## Phase 5 — Test

- [ ] Device matrix: iPhone Safari, Android Chrome, iMessage / Discord / Instagram / WhatsApp
      in-app browsers, and desktop
- [ ] Hallway test with 5+ people on their own phones. Measure time to respond and watch
      for mis-taps.
- [ ] Accessibility check (VoiceOver, TalkBack, keyboard only)
- [ ] Fix, then retest

**Exit:** the success metrics in REQUIREMENTS §9 hold for the test group.

## Phase 6 — Beta launch

- [ ] Deploy to its own subdomain (e.g. `<name>.latentlab.cc`), matching the other Latent Lab projects
- [ ] Add a card to the website's Projects section. That's the only change outside this folder.
- [ ] Use it for real with friend groups, then pick up P1 items (finalize + .ics,
      live updates, "if needed", bulk shortcuts)

## Phase 7 — Migrate to its own repo

- [ ] Run the `git subtree split` recipe in the [README](../README.md)
- [ ] Move the CI workflow and secrets
- [ ] Remove `projects/scheduler/` from the website repo (keep the Projects card)

---

## Decision log

| # | Date | Decision | Why |
| --- | --- | --- | --- |
| 1 | 2026-10-25 | Live temporarily at `projects/scheduler/` in the website repo, self-contained | No laptop access right now; easy to split out later with `git subtree` |
| 2 | 2026-10-25 | Design the UX before writing product code; a gesture spike runs alongside design | The core risk is the touch interaction, not the backend |
