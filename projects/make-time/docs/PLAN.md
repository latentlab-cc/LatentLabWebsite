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

- [x] Set up a self-contained `projects/make-time/` folder that's easy to migrate
- [x] Draft [REQUIREMENTS.md](REQUIREMENTS.md)
- [x] Start [REFERENCES.md](REFERENCES.md)
- [ ] Hands-on teardown: use when2meet, Crab Fit, LettuceMeet, and Rallly **on a phone**,
      and log specific pain points and good ideas in REFERENCES.md

**Exit:** the requirements draft and references exist, and the open questions are listed.

## Phase 1 — Requirements sign-off

- [x] Name, hosting, audience, slot size, live-update timing (see decision log)
- [x] Add the required minimum duration to the requirements
- [ ] Answer the remaining open questions in REQUIREMENTS.md ("if needed", crossing
      midnight, calendar import, accounts, retention, backend)
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
  - **how the minimum duration shows up** on create, respond, and results (REQUIREMENTS §7.3)
  - realistic sample data (e.g. "Raid night", 7 evenings, 6pm–1am, 15-min slots, 3h minimum,
    6 respondents across 2 timezones)
- [ ] Explore in Claude Design: start with the **Respond** screen, then Results, then Create
- [ ] Review the prototypes **on a phone**. Iterate.
- [ ] Export the handoff bundle (components, styles, copy) and commit it under
      `projects/make-time/design/`

**2b — Gesture spike (runs in parallel):** a throwaway HTML page that tests the 2–3
scroll-vs-paint approaches on real iOS Safari, Android Chrome, and an in-app browser.
Design can make an interaction *look* right, and only a device can confirm it *feels* right.
Lives in `projects/make-time/spikes/`.

**Exit:** an approved clickable prototype of all P0 flows, plus a chosen gesture model
confirmed on real devices.

## Phase 3 — Technical design

- [ ] Stack decision. Current leaning:
  - **Frontend:** React + TypeScript + Vite (same as the website, so the skills carry over),
    built as a PWA
  - **Backend:** Cloudflare Workers + D1 (SQLite) for storage, and Durable Objects if we
    add live updates later (V-9). Same vendor as the website hosting.
  - **Alternative:** Supabase (Postgres + realtime) if we'd rather not be Cloudflare-specific
- [ ] Data model (events, days, min duration, responses, slot bitsets) and API contract
- [ ] Viable-window algorithm: for each day, find the windows of at least the minimum
      duration and count who's free for all of each one. Runs on the device and is unit-tested.
- [ ] Hosting under `latentlab.cc/make-time`: the build step in the website deploy,
      `_redirects` for deep links, and a Worker route for `/make-time/api/*` (see [README](../README.md))
- [ ] Timezone strategy: store UTC instants, render in the viewer's zone
- [ ] Auth tokens: organizer link, per-device respondent token, optional PIN
- [ ] Record decisions in the decision log below

**Exit:** the stack, data model, and API are written down. Repo layout:

```
projects/make-time/
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

Add a separate CI workflow (`make-time.yml`, path-filtered) for typecheck, lint, and tests.

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

- [ ] Ship at `latentlab.cc/make-time` (the deploy step and `_redirects` from the README
      are the only changes outside this folder)
- [ ] Add a Make Time card to the website's Projects section
- [ ] Use it for real with friend groups, then pick up P1 items (finalize + .ics,
      near-misses, bulk shortcuts, crossing midnight)

## Phase 7 — Migrate to its own repo

- [ ] Run the `git subtree split` recipe in the [README](../README.md)
- [ ] Move the CI workflow and secrets, and set the base path to `/` for the new domain
- [ ] Redirect `latentlab.cc/make-time/*` to the new domain so old event links keep working
- [ ] Remove `projects/make-time/`, its deploy step, and `_redirects` rule from the website
      repo (keep the Projects card, pointing at the new domain)

---

## Decision log

| # | Date | Decision | Why |
| --- | --- | --- | --- |
| 1 | 2026-10-25 | Live temporarily at `projects/make-time/` in the website repo, self-contained | No laptop access right now; easy to split out later with `git subtree` |
| 2 | 2026-10-25 | Design the UX before writing product code; a gesture spike runs alongside design | The core risk is the touch interaction, not the backend |
| 3 | 2026-10-25 | Name: **Make Time** (for now) | Owner's call |
| 4 | 2026-10-25 | Host at `latentlab.cc/make-time`, not a subdomain. Base path is configurable. | Simple for now; it moves to its own domain later |
| 5 | 2026-10-25 | Audience: friends and gaming groups | Fits Latent Lab's "built for players"; drives tone, evening/late-night defaults, Discord-first sharing |
| 6 | 2026-10-25 | Slot size: 15 minutes (fixed in v1) | Owner's call; finer slots make the painting UX matter even more |
| 7 | 2026-10-25 | Live updates: later (P2) | Not needed for MVP; refresh is fine at first |
| 8 | 2026-10-25 | **Required minimum duration** per event; results only show windows at least that long, counting people free for the whole window | Owner request; the biggest functional gap in when2meet |
