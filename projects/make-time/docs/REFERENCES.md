# References

Products, patterns, and technical resources we're drawing from for Make Time. Add to this as we go.
Each entry notes **why it's relevant**.

## Direct competitors / prior art

| Product | Link | Notes |
| --- | --- | --- |
| **when2meet** | https://www.when2meet.com/ | The baseline. Right model (no accounts, link, paint a grid, heatmap); poor mobile interaction and dated setup. Supports specific dates or days of the week. |
| **Crab Fit** | https://crab.fit/ · [source](https://github.com/GRA0007/crab.fit) | Open source when2meet-style tool with a cleaner UI, live heatmap, and automatic timezone handling. Worth studying its grid code. |
| **Rallly** | https://rallly.co/ · [source](https://github.com/lukevella/rallly) | Open source Doodle-style poll (vote on proposed options) rather than a grid. No sign-up to vote. Good mobile polish and a good reference for the results / finalize flow. |
| **LettuceMeet** | https://lettucemeet.com/ | when2meet with a friendlier, more mobile-friendly UI. Still manual painting, no calendar import. |
| **Timeful** (formerly Schej) | https://timeful.app/ | when2meet-style with Google Calendar overlay and an "if needed" state. Reference for calendar import UX. *Current status not checked.* |
| **Doodle** | https://doodle.com/ | Poll-based: organizer proposes options and people vote. Familiar but heavier, ads and accounts. Shows the "propose options" vs "paint availability" trade-off. |
| **Cal.com / Calendly** | https://cal.com/ | Booking-page model, which is a non-goal. Useful only as a contrast. |

### Takeaways so far

- **Grid model** (when2meet, Crab Fit, LettuceMeet) is better when the organizer doesn't
  know the options yet. **Poll model** (Doodle, Rallly) is better when there are only a
  few candidate times. We're building a grid tool, but a ranked "best times" result
  borrows the poll model's readability.
- No one in this group (as far as we've seen) has fully solved **scroll vs. paint on a
  touch screen**. That's the gap to win.
- Calendar import is the common "premium" differentiator. It's P2 for us.

## Interaction patterns to study

| Pattern | Where to see it | Relevance |
| --- | --- | --- |
| Week strip day picker | iOS Calendar, Google Calendar (mobile), fitness apps | Day navigation (REQUIREMENTS §7.2) |
| Drag-to-select time ranges | Google Calendar mobile (create event by drag), iOS Calendar | Painting on a vertical time axis |
| Long-press then drag | iOS text selection, Photos multi-select drag | Gesture option B in §7.1 |
| Swipe-to-multi-select | iOS Photos / Mail (two-finger or drag across checkboxes) | Painting without a mode |
| Bottom sheets | Apple Maps, Google Maps | Slot details ("who's free?") on the results view |
| Haptic tick on scrub | iOS pickers, Apple Watch crown | Painting feedback (§7.4) |

## Design and accessibility

- Apple Human Interface Guidelines: [touch targets and layout](https://developer.apple.com/design/human-interface-guidelines/layout) (44×44 pt minimum)
- Material Design 3: [touch target size](https://m3.material.io/foundations/designing/structure) (48×48 dp)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/), including 2.5.7 *Dragging Movements* (every drag needs a single-pointer alternative) and 2.5.8 *Target Size*
- Claude Design overview: [Using Claude Design for prototypes and UX](https://claude.com/resources/tutorials/using-claude-design-for-prototypes-and-ux). Our design tool; it can export a handoff bundle for Claude Code.

## Technical references

| Topic | Link | Notes |
| --- | --- | --- |
| Pointer Events | https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events | One input model for touch, mouse, and pen |
| `touch-action` CSS | https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action | Key tool for separating scroll from paint |
| Web Share API | https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share | Native share sheet (S-2) |
| Vibration API | https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API | Haptics on Android. **iOS Safari doesn't support it.** |
| Temporal / Intl | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat | Timezone-correct display |
| iCalendar (RFC 5545) | https://datatracker.ietf.org/doc/html/rfc5545 | .ics export (F-2) |
| Kong grpc-gateway plugin | https://docs.konghq.com/hub/kong-inc/grpc-gateway/ | How the shared Kong transcodes HTTP/JSON to gRPC |
| Kong CORS plugin | https://docs.konghq.com/hub/kong-inc/cors/ | Cross-origin calls from `latentlab.cc` to the API hostname |
| CloudNativePG | https://cloudnative-pg.io/documentation/ | Postgres operator already on the cluster |
| Cloudflare Pages `_redirects` | https://developers.cloudflare.com/pages/configuration/redirects/ | Sending `/make-time/*` deep links to Make Time's `index.html` |
| `git subtree` | https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging | Migration to a separate repo (see README) |

## Internal references (existing latentlab-cc infrastructure)

| Repo / file | Why |
| --- | --- |
| [Riftbound-Engine](https://github.com/latentlab-cc/Riftbound-Engine) `k8s/README.md`, `k8s/templates/kong-values.yaml` | Owns the shared Kong Helm release, registry, and org runner. Make Time's proto mount gets added here. |
| [ModernMtgEngine](https://github.com/latentlab-cc/ModernMtgEngine) `k8s/README.md`, `k8s/templates/kong.yaml`, `project.yaml`, `Makefile` (`kong-deploy`) | The template to copy: a secondary project on the shared Kong with a host-scoped Ingress and its own namespace, DB, and tunnel |
