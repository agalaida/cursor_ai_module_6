# cursor_ai_module_6

A React dashboard app built with Vite, TypeScript, and Tailwind CSS. Includes a Kanban board, social feed, analytics, product catalog, team dashboard, and user profile.

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 3
- React Router 7
- dnd-kit (drag-and-drop)
- Playwright (e2e tests)

## Setup

**Requirements:** Node.js ^20.19.0 or >=22.12.0 (required by Vite 8 / oxlint)

```bash
# Install dependencies
npm install

# Install Playwright browsers (first time only)
npx playwright install
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot module replacement.

## Build

```bash
npm run build     # compile TypeScript + bundle
npm run preview   # serve the production build locally
```

## Linting

```bash
npm run lint
```

## E2E tests

The dev server starts automatically when running tests.

```bash
npm run test:e2e            # run all tests (Chromium, Firefox, WebKit)
npm run test:e2e:ui         # interactive Playwright UI
npm run test:e2e:report     # open last HTML report
```

### Running in Docker

On Linux systems where WebKit system dependencies are unavailable (e.g. Arch Linux), use Docker:

```bash
npm run test:e2e:docker
```

This builds the image from `Dockerfile.playwright` (Ubuntu 22.04 + all Playwright deps) and mounts `playwright-report/` back to the host, so the HTML report is available locally after the run.

**Requirements:** Docker installed and running.

Test artifacts are written to `test-results/` and `playwright-report/` (git-ignored).

## Screenshots

Screenshots of the running application are in the [`screenshots/`](screenshots/) folder:

| File | Page |
|------|------|
| `screenshots/dashboard.png` | Dashboard |
| `screenshots/kanban.png` | Kanban board |
| `screenshots/feed.png` | Social feed |
| `screenshots/analytics.png` | Analytics |
| `screenshots/product.png` | Products |
| `screenshots/profile.png` | User profile |
| `screenshots/settings.png` | Settings |
| `screenshots/team.png` | Team dashboard |

## Test report

After running `npm run test:e2e`, the HTML report is generated at:

```
playwright-report/index.html
```

Open it directly in a browser, or via:

```bash
npm run test:e2e:report
```

## AI prompts used

The app was built with AI assistance (Cursor / Claude). Key prompts used during development:

1. **Scaffold** — *"Generate a React + Vite + TypeScript + Tailwind project with the following pages: Dashboard, Kanban board, Social feed, Analytics, Products, User profile, Settings, Team dashboard. Use React Router for navigation."*

2. **Kanban drag-and-drop** — *"Implement drag-and-drop column reordering and card moving between columns using dnd-kit."*

3. **Follow button bug fix** — *"The Follow button on the User Profile page adds 2 to the followers count instead of 1. Find and fix the bug."* (Root cause: `setFollowerCount` was called inside a `setFollowing` updater, which React Strict Mode runs twice to detect side effects.)

4. **E2E tests** — *"Write Playwright tests covering navigation, task management, product search, registration form, accessibility, and responsive layout across Chromium, Firefox, and WebKit."*

5. **README** — *"Write a README with setup instructions, commands, project structure, screenshots path, test report path, and AI prompts explanation."*

## Project structure

```
src/
  components/       # feature components grouped by domain
    Analytics/
    Dashboard/
    KanbanBoard/
    Navbar/
    ProductCard/
    SettingsPanel/
    SocialFeed/
    TeamDashboard/
    UserProfile/
    shared/         # reusable primitives (Button, Card, Badge, …)
  pages/            # route-level page components
  types/            # shared TypeScript types
e2e-tests/          # Playwright test suites and config
public/             # static assets
```
