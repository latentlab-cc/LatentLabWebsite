# Make Time

A mobile-first group availability tool in the spirit of [when2meet](https://www.when2meet.com/),
built for friends and gaming groups: someone creates an event and says how long it needs
(e.g. "3 hours for a raid night"), shares a link, everyone marks when they're free, and
the group quickly sees the windows that actually fit. No accounts required.

Hosted for now at **`latentlab.cc/make-time`**. It will get its own domain later.

The bet: when2meet's *model* is right (zero-friction, link-based, grid of times), but
its *mobile interaction* is broken. Finding the right days is clunky and painting or
erasing times with a finger fights the page scroll. We want to win on that UX.

> **Status:** Discovery / requirements. No code yet.

## Documents

| Doc | Purpose |
| --- | --- |
| [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) | Problem, users, scope, prioritized requirements, open questions |
| [docs/REFERENCES.md](docs/REFERENCES.md) | Competitors, what they get right/wrong, interaction patterns, tech refs |
| [docs/PLAN.md](docs/PLAN.md) | Delivery phases, milestones, exit criteria, decision log |
| docs/DESIGN_HANDOFF.md | *(Phase 2)* Brief for Claude Design: flows, screens, interaction specs |

## Living here temporarily

This project lives inside the Latent Lab website repo **for now** and will move to
its own repository. To keep that move trivial, this folder follows these rules:

1. **Self-contained.** Everything for this project lives under `projects/make-time/`.
   Nothing here imports from the website's `src/`, and the website never imports from here.
2. **Own tooling.** When code arrives, it gets its own `package.json`, lockfile,
   `tsconfig`, and build config inside this folder. It is *not* an npm workspace of the
   website, and the website's root `package.json` and `tsconfig` don't change for it.
3. **Relative links only.** Docs link to each other with relative paths. Nothing
   points to website-repo paths outside this folder.
4. **Own CI.** Any CI workflow for this project is a separate file filtered to
   `projects/make-time/**`, so it can be copied over unchanged except for the path filter.
5. **No shared secrets or config.** Env vars are documented in this folder's own
   `.env.example`.
6. **Path-agnostic.** The app is served under `/make-time/` for now. The base path is a
   single build setting (e.g. Vite `base`), and the code never hardcodes `/make-time`,
   so moving to its own domain later is a config change.

### How it's served under latentlab.cc (for now)

The website deploys to Cloudflare Pages as a single project, so Make Time ships inside
that deploy. The plan, to be confirmed in tech design:

- Make Time builds separately (its own `npm ci && npm run build`) with base path `/make-time/`.
- The website's deploy workflow gets **one added step** that builds Make Time and copies
  its output into `dist/make-time/`. A `_redirects` rule sends deep links such as
  `/make-time/e/<id>` to Make Time's own `index.html`, not the website's.
- The backend runs as a **separate Cloudflare Worker** on the route `latentlab.cc/make-time/api/*`,
  not as Pages Functions inside the website project. That keeps it separate.

These deploy-workflow lines and the `_redirects` rule are the only things outside this
folder. Remove them when you migrate.

### Migration recipe (for later)

Keeps full commit history for this folder only:

```bash
# from the website repo
git subtree split --prefix=projects/make-time -b make-time-export

# in the new, empty repo
git pull <path-to-website-repo> make-time-export
```

Then move any `projects/make-time` CI workflow into the new repo's `.github/workflows/`,
drop its path filter, change the base path to `/`, remove the Make Time build step and
`_redirects` rule from the website's deploy, and delete `projects/make-time/` from the
website repo. Add a redirect from `latentlab.cc/make-time/*` to the new domain so old
event links keep working.
