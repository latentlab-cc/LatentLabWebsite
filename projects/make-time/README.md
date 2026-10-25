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
   `.env.example`, and Kubernetes secrets in a `k8s/secrets.example.yaml` (the real
   file is gitignored).
6. **Path-agnostic.** The app is served under `/make-time/` for now. The base path is a
   single build setting (e.g. Vite `base`), and the code never hardcodes `/make-time`,
   so moving to its own domain later is a config change.

### How it's deployed (for now)

```
Phone ──► latentlab.cc/make-time/        Cloudflare Pages (static frontend, part of the website deploy)
  │
  └─────► maketime-api.latentlab.cc     Cloudflare tunnel ─► shared Kong (grpc-gateway) ─► maketime gRPC service
                                                                                        └─► maketime-db (Postgres via CNPG)
                                         └── all on the home lab k8s cluster, namespace `maketime`
```

**Frontend** is a static build served from the website's Cloudflare Pages project:

- Make Time builds separately (its own `npm ci && npm run build`) with base path `/make-time/`.
- The website's deploy workflow gets **one added step** that builds Make Time and copies
  its output into `dist/make-time/`. A `_redirects` rule sends deep links such as
  `/make-time/e/<id>` to Make Time's own `index.html`, not the website's.

**Backend** runs on the home lab Kubernetes cluster and follows the same pattern as
[ModernMtgEngine](https://github.com/latentlab-cc/ModernMtgEngine) (`k8s/README.md`):

- A Go gRPC service with `google.api.http` annotations in its proto. The **shared Kong
  gateway** turns those into HTTP/JSON endpoints using its grpc-gateway plugin. Kong is
  owned by [Riftbound-Engine](https://github.com/latentlab-cc/Riftbound-Engine)
  (`k8s/kong-values.yaml`) and shared by every latentlab-cc project.
- Postgres via the cluster's CloudNativePG operator. The image is pushed to the shared
  registry (`:32000`), and CI deploys with the org-wide `[self-hosted, k8s]` runner.
- A host-scoped Kong Ingress on `maketime-api.latentlab.cc` and its own Cloudflare tunnel.
  The API is on a different origin from the frontend, so it needs a CORS policy that
  allows `https://latentlab.cc` (Kong's `cors` plugin).
- All manifests live in `projects/make-time/k8s/` and are generated from a
  `projects/make-time/project.yaml`, the same way the other projects do it.

**Touchpoints outside this folder.** Remove these when you migrate:

| Where | What |
| --- | --- |
| Website `.github/workflows/deploy.yml` | Step that builds Make Time into `dist/make-time/` |
| Website `public/_redirects` | `/make-time/*` → `/make-time/index.html` |
| Riftbound-Engine `k8s/templates/kong-values.yaml` | Mount for the `maketime-proto` configmap (same steps as when ModernMtg was added) |
| Cloudflare Zero Trust dashboard | Tunnel public hostname `maketime-api.latentlab.cc` → `http://kong-gateway-proxy.kong:80`. There's no in-cluster web/nginx layer like the other projects have, so the tunnel goes straight to Kong, and the host-scoped Ingress picks the route. |

### Migration recipe (for later)

Keeps full commit history for this folder only:

```bash
# from the website repo
git subtree split --prefix=projects/make-time -b make-time-export

# in the new, empty repo
git pull <path-to-website-repo> make-time-export
```

Then move any `projects/make-time` CI workflow into the new repo's `.github/workflows/`,
drop its path filter, change the base path to `/`, and remove the touchpoints listed
above. The backend doesn't move: its namespace, Kong route, and tunnel stay as they are.
Then delete `projects/make-time/` from the website repo. Add a redirect from
`latentlab.cc/make-time/*` to the new domain so old event links keep working, and add
the new origin to the API's CORS allowlist.
