# Requirements

> Draft v0.3. Anything marked **[?]** is still open. See [Open questions](#open-questions)
> at the bottom. Answered questions are recorded in the [PLAN.md decision log](PLAN.md#decision-log).

## 1. Problem

Getting a group to agree on a time is a coordination problem, not a calendar problem.
when2meet solves it with a brutally simple model: create an event, share a link, everyone
paints a grid, and the overlap shows up as a heatmap. No accounts, no app install.

On a phone, it falls apart:

- **Painting fights scrolling.** Touch-drag on the grid either scrolls the page or
  selects cells, and you can't reliably control which one happens. Erasing a mistake
  is worse.
- **Tiny targets.** 15-minute cells across 7+ day columns are a few pixels wide.
  Zooming and panning breaks your sense of where you are.
- **Finding days is clunky.** Wide date ranges overflow sideways. You lose track of
  which column is which day, and the time labels scroll out of view.
- **Results are unreadable.** A heatmap on a small screen means hovering over each
  cell to see who's free, and touch screens can't hover.
- **It ignores how long the event is.** A heatmap shows that 6 people are free at 9pm,
  not whether they're free for the whole 3-hour session. The organizer has to work that
  out by eye.

## 2. Goals

1. Marking your availability on a phone is **fast and accurate**. Target: a typical
   response (one week, a few blocks) in **under 30 seconds** with no mis-taps that
   need fixing.
2. Keep when2meet's **zero-friction** model: no account, no install, one link.
3. **Duration-aware results.** The organizer sets how long the event needs, and the results
   only suggest windows at least that long, showing who can make the *whole* window.
4. The organizer sees **the best window, and who can't make it**, in one glance on a phone.
5. It works just as well on desktop. Mobile-first doesn't mean mobile-only.

## 3. Non-goals (for v1)

- A full calendar app or booking pages (Calendly / Cal.com territory).
- Recurring meeting management after the time is picked.
- Paid tiers, teams, or org admin.
- Native iOS/Android apps. It's a PWA-capable web app; native apps can come later.
- Accounts or sign-in of any kind. Google sign-in is planned for later (P2), not v1.
- An "if needed" availability state (see §5).
- Time windows that cross midnight. Late-night sessions are usually informal and not
  scheduled ahead, so v1 days end at midnight at the latest.
- Work and office scheduling features (rooms, Outlook integration, etc.).

## 4. Audience, users and roles

**Audience: friends and gaming groups.** Think raid nights, D&D sessions, LAN parties,
tournament practice, board game nights. This shapes the product:

- People open the link from **Discord**, iMessage, or WhatsApp, usually on a phone,
  often inside an in-app browser.
- Events run **in the evening and late at night**. Scheduled sessions end by midnight
  (later sessions tend to happen informally).
- Groups span **timezones** (online friends).
- The tone is **casual and playful**, not corporate. It fits Latent Lab's "built for
  players" positioning.

| Role | Who | Needs |
| --- | --- | --- |
| **Organizer** | Creates the event, usually from a phone in a group chat | Set up in under a minute, share fast, see results, lock in a time |
| **Respondent** | Anyone with the link | Open the link, enter a name, mark times, done. Come back and edit later. |
| **Viewer** | Someone checking the status | See who's responded and what the best windows are |

## 5. Core concepts

- **Event:** title, optional description, timezone, **minimum duration**, and a set of
  candidate days, each with a time window.
- **Minimum duration:** how long the event needs (e.g. 3 hours). The organizer is required
  to set it. It drives the results and appears throughout the UI.
- **Candidate days:** either **specific dates** ("Nov 3, 5, 6") or **days of the week**
  ("any Mon/Wed", no dates). when2meet supports both.
- **Slot:** the smallest selectable unit. **15 minutes** in v1.
- **Response:** one participant's name plus the slots they've marked.
- **Availability state per slot:** `available` or unset (= unavailable). Binary, like
  when2meet. A third "if needed" state is deferred until testing shows people want it.
- **Viable window:** a continuous stretch of time at least as long as the minimum duration.
  A participant **counts toward a window only if they're available for all of it**.

## 6. Functional requirements

Priority: **P0** = MVP, **P1** = soon after launch, **P2** = later / nice to have.

### 6.1 Create event (organizer)

| ID | Req | Pri |
| --- | --- | --- |
| C-1 | Create an event with a title and candidate days, picked on a touch-friendly calendar (tap or drag to select multiple dates; quick picks like "this weekend" or "next 7 days") | P0 |
| C-2 | Set a daily time window (e.g. 6pm–midnight) with a touch-friendly picker, not a dropdown of 96 options. The latest end time is midnight. | P0 |
| C-3 | Slot size is 15 minutes, fixed in v1. Other sizes (30 or 60 minutes) are P2. | P0 |
| C-4 | Event timezone defaults to the organizer's device timezone | P0 |
| C-5 | **Required minimum duration.** Quick picks (1h, 2h, 3h, 4h) plus a custom value in 15-minute steps. The event can't be created without it. | P0 |
| C-6 | Validation: the minimum duration fits inside the daily time window (you can't ask for 4h in a 3h window) | P0 |
| C-7 | "Days of the week" mode (no specific dates) | P1 |
| C-8 | Optional description / location / game | P1 |
| C-9 | Different time windows per day | P2 |
| C-10 | Optional expected participant list, so we can show who hasn't responded | P2 |

### 6.2 Share

| ID | Req | Pri |
| --- | --- | --- |
| S-1 | Short, unguessable shareable link | P0 |
| S-2 | Native share sheet (Web Share API) with copy-link fallback | P0 |
| S-3 | Rich link preview for Discord and iMessage (Open Graph title, dates, duration, response count) | P1 |
| S-4 | QR code for in-person sharing | P2 |

### 6.3 Respond (mark availability) — the core UX

| ID | Req | Pri |
| --- | --- | --- |
| R-1 | Enter a name to start. No account. | P0 |
| R-2 | **Selecting never fights scrolling.** Gestures are clearly separated (see 7.1). | P0 |
| R-3 | Tap a slot to toggle it; drag across slots to paint a range. The drag's first cell decides whether it adds or removes. | P0 |
| R-4 | Touch targets are at least 44×44 pt | P0 |
| R-5 | Day and time labels stay visible (sticky) while scrolling | P0 |
| R-6 | Easy to move between days, so you never get lost in a wide grid (see 7.2) | P0 |
| R-7 | Undo the last change | P0 |
| R-8 | **The minimum duration is always visible** while responding (e.g. a "Needs 3 hrs" badge in the header) | P0 |
| R-9 | **Short-block hint.** A marked block shorter than the minimum duration is visibly flagged (e.g. "1h, too short to count"). It's still saved, never blocked. | P0 |
| R-10 | Show times in the respondent's local timezone, with a clear label when it differs from the event's | P0 |
| R-11 | Come back and edit your response on the same device without logging in (local token). Optional name + PIN to edit from another device. | P0 (device) / P1 (PIN) |
| R-16 | Optional Google sign-in to keep your events and responses across devices | P2 |
| R-12 | Autosave as you go, with a visible "saved" state, so no "submit" step gets forgotten | P0 |
| R-13 | Bulk shortcuts: "all evening", "clear day", "copy this day to…" | P1 |
| R-14 | See everyone else's availability as an overlay while you're picking | P1 |
| R-15 | Prefill busy times from a calendar (Google / Apple / ICS), read-only and never stored server-side | P2 |

### 6.4 Results

| ID | Req | Pri |
| --- | --- | --- |
| V-1 | **Ranked "best windows" list.** Only windows at least the minimum duration long. Each one shows its time range, its length, how many people can make all of it, and who can't (e.g. "Sat 7pm–11pm · 4h · 5/6 · Sam can't"). | P0 |
| V-2 | Ranking: most people available for the whole window, then the longest window, then the earliest | P0 |
| V-3 | Near-misses: for people who can make only part of a top window, show it ("Sam: from 9pm") | P1 |
| V-4 | Heatmap / group grid view, where tapping a slot shows who's available and who isn't (no hover) | P0 |
| V-5 | Clear empty state when no window fits everyone (or anyone), showing the best partial options | P0 |
| V-6 | Respondent list with an edit link for your own entry | P0 |
| V-7 | Filter: "only show windows where everyone is free" / "these specific people are free" | P1 |
| V-8 | Explore with a different duration ("what if we only did 2h?") without changing the event | P2 |
| V-9 | Live updates as others respond, without reloading | P2 |

### 6.5 Finalize

| ID | Req | Pri |
| --- | --- | --- |
| F-1 | Organizer picks the final window; the event page shows it prominently | P1 |
| F-2 | "Add to calendar" (.ics download, Google Calendar link) | P1 |
| F-3 | Organizer-only actions (edit or delete the event, finalize) protected by an organizer link or token | P0 (edit/delete) |

## 7. UX requirements (mobile)

These are the heart of the product, and they're what the design phase needs to explore
and settle. The options listed are starting points, not decisions.

### 7.1 Separating scroll from select

Has to work. Candidate approaches:

- **A. Edit-mode toggle.** In "paint" mode, drags select and a two-finger drag scrolls.
  Clear, but adds a mode.
- **B. Long-press to start painting.** A normal swipe scrolls. A short press and then
  drag paints. Familiar from iOS text selection, but slower to discover.
- **C. Day-at-a-time vertical list.** Show one day per screen, with time slots as
  full-width rows. Vertical drag on the slot column paints; vertical scrolling happens
  in a gutter or with swipes outside the column. Horizontal swipe changes the day.
- **D. Range chips instead of a grid.** "+ Add time" opens a start/end picker, giving
  chips like "9:00–12:00". Precise and accessible, but less direct.

Likely answer: **C as the main view, with D as the accessible / precise alternative**.
To be validated in design.

### 7.2 Navigating days

- A horizontal **day strip** (like a week picker) at the top, showing every candidate day
  with a mini indicator of how much you've marked on it.
- Swipe left and right to move between days. The current day is always labeled.
- Optional **multi-day overview** (zoomed out, read-only or coarse-select) for seeing
  the week at a glance.

### 7.3 Showing the minimum duration

The minimum duration needs to be visible wherever it affects a decision:

- **Create:** a required step with big quick-pick buttons, never hidden in "advanced".
- **Respond:** a persistent badge ("Needs 3 hrs"). Blocks that meet the duration look
  "complete" (e.g. a ✓ or solid fill). Shorter blocks show a subtle "too short" treatment
  and their length. Optionally, a ghost marker shows how far the block needs to extend.
- **Results:** the duration in the header ("Best 3h+ windows"), and each window shows its
  actual length.
- **Link preview:** the duration appears in the preview card (S-3).

### 7.4 Feedback

- Haptic tick (where supported) when painting crosses a slot boundary.
- Show the selected range and its length live while dragging ("9:00–11:30 · 2.5h").
- Clear visual states for available, unset, and too short that work in light and dark
  mode and don't rely on color alone.

### 7.5 Tone and visual direction

- Casual and a bit playful, written for friends ("Who's in?", "Lock it in"), never corporate.
- Dark mode is first-class (late-night gaming audience), not an afterthought.
- Whether it shares Latent Lab's visual identity or gets its own is a design-phase
  question. It will move to its own domain later, so it should be able to stand alone.

### 7.6 Accessibility

- Every action available without drag gestures (tap, range picker).
- Screen reader labels per slot ("Tuesday Nov 4, 9:00 to 9:15 PM, available").
- Respects reduced motion and dynamic type / zoom.
- WCAG 2.2 AA contrast.

## 8. Non-functional requirements

| Area | Requirement |
| --- | --- |
| Performance | Interactive in under 2s on a mid-range phone on 4G. Painting stays at 60fps on a 7-day × 15-min grid. Results (viable windows) computed instantly on the device for up to ~30 respondents. |
| Compatibility | iOS Safari, Android Chrome, **in-app browsers** (Discord, iMessage, Instagram, WhatsApp), and desktop evergreen browsers |
| Hosting | Frontend: a static build served at `latentlab.cc/make-time` (base path is configurable). Backend: a Kubernetes service on the home lab cluster behind the shared Kong gateway. See the [README](../README.md). |
| Privacy | No accounts and no tracking beyond basic anonymous analytics. Events can be deleted. Calendar data (R-15) stays on the device. |
| Data retention | **14-day TTL.** Events and their responses are deleted 14 days after the last candidate date (days-of-week events: 14 days after the last change). A scheduled cleanup job does the deletion, and the event page says when the event expires. |
| Security | Event IDs and edit tokens are unguessable. Rate limits on create and respond. Names are display-only and HTML-escaped. |
| Reliability | Autosave holds up on flaky mobile connections: queue the change and retry, and don't lose the user's selection |
| Offline | P2: the respond page works offline after first load and syncs when reconnected |
| Portability | Matches the self-contained rules in the [README](../README.md) |

## 9. Success metrics

- Median time to submit a response on mobile (goal: under 30s).
- Share of respondents who start and finish a response (goal: over 90%).
- Rate of corrections: undo or erase actions per response (lower is better).
- Organizer can name the best window that fits the duration without leaving the results
  screen (usability test).

## Open questions

Product questions are answered for now (see the [decision log](PLAN.md#decision-log)).
The remaining questions are about infrastructure:

1. **Repo:** OK to keep Make Time in the website repo? The shared Kong, CI runner, and
   registry work from any latentlab-cc repo (ModernMtg already does this), so moving
   isn't required. See [PLAN.md](PLAN.md), Phase 3.
2. **API hostname:** proposed `maketime-api.latentlab.cc` (see the [README](../README.md)).
