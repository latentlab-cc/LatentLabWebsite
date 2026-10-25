# Scheduler (working name)

A mobile-first group availability tool in the spirit of [when2meet](https://www.when2meet.com/):
someone creates an event, shares a link, everyone marks when they're free, and the
group quickly sees the time that works best. No accounts required.

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

1. **Self-contained.** Everything for this project lives under `projects/scheduler/`.
   Nothing here imports from the website's `src/`, and the website never imports from here.
2. **Own tooling.** When code arrives, it gets its own `package.json`, lockfile,
   `tsconfig`, and build config inside this folder. It is *not* an npm workspace of the
   website, and the website's root `package.json` and `tsconfig` don't change for it.
3. **Relative links only.** Docs link to each other with relative paths. Nothing
   points to website-repo paths outside this folder.
4. **Own CI.** Any CI workflow for this project is a separate file filtered to
   `projects/scheduler/**`, so it can be copied over unchanged except for the path filter.
5. **No shared secrets or config.** Env vars are documented in this folder's own
   `.env.example`.

### Migration recipe (for later)

Keeps full commit history for this folder only:

```bash
# from the website repo
git subtree split --prefix=projects/scheduler -b scheduler-export

# in the new, empty repo
git pull <path-to-website-repo> scheduler-export
```

Then move any `projects/scheduler` CI workflow into the new repo's `.github/workflows/`,
drop its path filter, and delete `projects/scheduler/` from the website repo.
