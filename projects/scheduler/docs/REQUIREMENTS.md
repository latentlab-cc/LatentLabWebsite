# Requirements

> Draft v0.1. Anything marked **[?]** is an assumption to confirm. See
> [Open questions](#open-questions) at the bottom.

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
- **Setup is dated.** Picking dates, timezones, and time ranges is a desktop form.

## 2. Goals

1. Marking your availability on a phone is **fast and accurate**. Target: a typical
   response (one week, a few blocks) in **under 30 seconds** with no mis-taps that
   need fixing.
2. Keep when2meet's **zero-friction** model: no account, no install, one link.
3. The organizer can see **the best time, and who can't make it**, in one glance on a phone.
4. It works just as well on desktop. Mobile-first doesn't mean mobile-only.

## 3. Non-goals (for v1)

- A full calendar app or booking pages (Calendly / Cal.com territory).
- Recurring meeting management after the time is picked.
- Paid tiers, teams, or org admin.
- Native iOS/Android apps. It's a PWA-capable web app; native apps can come later.

## 4. Users and roles

| Role | Who | Needs |
| --- | --- | --- |
| **Organizer** | Creates the event; often on a phone in a group chat | Set up in under a minute, share fast, see results, lock in a time |
| **Respondent** | Anyone with the link | Open the link, enter a name, mark times, done. Come back and edit later. |
| **Viewer** | Someone checking the status | See who's responded and what the best options are |

Primary context: someone in a group chat (iMessage, Discord, WhatsApp) drops a link.
Most respondents will open it **on a phone, inside an in-app browser**.

## 5. Core concepts

- **Event:** title, optional description, timezone, slot granularity, and a set of
  candidate days, each with a time window.
- **Candidate days:** either **specific dates** ("Nov 3, 5, 6") or **days of the week**
  ("any Mon/Wed", no dates). when2meet supports both.
- **Slot:** the smallest selectable unit (15, 30, or 60 minutes).
- **Response:** one participant's name plus the slots they've marked.
- **Availability state per slot:** `available`, `if needed` **[?]**, or unset (= unavailable).

## 6. Functional requirements

Priority: **P0** = MVP, **P1** = soon after launch, **P2** = later / nice to have.

### 6.1 Create event (organizer)

| ID | Req | Pri |
| --- | --- | --- |
| C-1 | Create an event with a title and candidate days, picked on a touch-friendly calendar (tap or drag to select multiple dates; quick picks like "next 7 days" or "weekdays next week") | P0 |
| C-2 | Set a daily time window (e.g. 9am–9pm) with a touch-friendly picker, not a dropdown of 96 options | P0 |
| C-3 | Choose slot granularity: 15, 30, or 60 min. Default 30 **[?]** | P0 |
| C-4 | Event timezone defaults to the organizer's device timezone | P0 |
| C-5 | "Days of the week" mode (no specific dates) | P1 |
| C-6 | Different time windows per day | P2 |
| C-7 | Optional description / location | P1 |
| C-8 | Optional expected participant list, so we can show who hasn't responded | P2 |

### 6.2 Share

| ID | Req | Pri |
| --- | --- | --- |
| S-1 | Short, unguessable shareable link | P0 |
| S-2 | Native share sheet (Web Share API) with copy-link fallback | P0 |
| S-3 | Rich link preview (Open Graph title, dates, response count) for group chats | P1 |
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
| R-8 | Bulk shortcuts: "all day", "clear day", "copy this day to…" | P1 |
| R-9 | "If needed" state, separate from "available" | P1 **[?]** |
| R-10 | Show times in the respondent's local timezone, with a clear label when it differs from the event's | P0 |
| R-11 | Come back and edit your response on the same device without logging in (local token). Optional name + PIN to edit from another device. | P0 (device) / P1 (PIN) |
| R-12 | Prefill busy times from a calendar (Google / Apple / ICS), read-only and never stored server-side | P2 |
| R-13 | Autosave as you go, with a visible "saved" state, so no "submit" step gets forgotten | P0 |
| R-14 | See everyone else's availability as an overlay while you're picking **[?]** | P1 |

### 6.4 Results

| ID | Req | Pri |
| --- | --- | --- |
| V-1 | **Ranked "best times" list**: the top time windows by number of people available, each showing who can't make it | P0 |
| V-2 | Heatmap / group grid view, where tapping a slot shows who's available and who isn't (no hover) | P0 |
| V-3 | Filter: "only show times when everyone is free" / "these specific people are free" | P1 |
| V-4 | Respondent list with an edit link for your own entry | P0 |
| V-5 | Live updates as others respond, without reloading | P1 |
| V-6 | Minimum duration filter ("I need a 2-hour block") | P1 |

### 6.5 Finalize

| ID | Req | Pri |
| --- | --- | --- |
| F-1 | Organizer picks the final time; the event page shows it prominently | P1 |
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

### 7.3 Feedback

- Haptic tick (where supported) when painting crosses a slot boundary.
- Show the selected range live ("9:00–11:30") while dragging.
- Clear visual states for available, if-needed, and unset that work in light and dark
  mode and don't rely on color alone.

### 7.4 Accessibility

- Every action available without drag gestures (tap, range picker).
- Screen reader labels per slot ("Tuesday Nov 4, 2:00 to 2:30 PM, available").
- Respects reduced motion and dynamic type / zoom.
- WCAG 2.2 AA contrast.

## 8. Non-functional requirements

| Area | Requirement |
| --- | --- |
| Performance | Interactive in under 2s on a mid-range phone on 4G. Painting stays at 60fps on a 7-day × 15-min grid. |
| Compatibility | iOS Safari, Android Chrome, **in-app browsers** (iMessage, Instagram, Discord, WhatsApp), and desktop evergreen browsers |
| Privacy | No accounts and no tracking beyond basic anonymous analytics. Events can be deleted. Calendar data (R-12) stays on the device. |
| Data retention | Events expire some time after their last candidate date **[? 30–90 days]** |
| Security | Event IDs and edit tokens are unguessable. Rate limits on create and respond. Names are display-only and HTML-escaped. |
| Reliability | Autosave holds up on flaky mobile connections: queue the change and retry, and don't lose the user's selection |
| Offline | P2: the respond page works offline after first load and syncs when reconnected |
| Portability | Matches the self-contained rules in the [README](../README.md) |

## 9. Success metrics

- Median time to submit a response on mobile (goal: under 30s).
- Share of respondents who start and finish a response (goal: over 90%).
- Rate of corrections: undo or erase actions per response (lower is better).
- Organizer can name the best time without leaving the results screen (usability test).

## Open questions

1. **Name:** working name is "Scheduler". Want a real name / subdomain now
   (e.g. `something.latentlab.cc`), or later?
2. **"If needed" state:** include it in v1, or keep it binary like when2meet?
3. **Default granularity:** 15 or 30 minutes?
4. **Calendar import:** how important is it? It's the biggest differentiator after
   mobile UX, but also the most work (OAuth, privacy).
5. **Accounts:** are we confident in "never require an account", even for organizers?
6. **Audience:** friends and gaming groups (fits Latent Lab's "built for players"
   positioning), or general and work use too? This affects tone, visual style, and features.
7. **Live updates (V-5):** needed for MVP?
8. **Data retention window:** how long do events live?
9. **Backend preference:** the website is on Cloudflare Pages. Use Cloudflare
   Workers + D1 / Durable Objects to stay in one ecosystem? (See [PLAN.md](PLAN.md), Phase 3.)
