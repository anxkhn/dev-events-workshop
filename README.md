# Dev Events Workshop

> **Note**: This is an educational repository with intentionally seeded bugs and incomplete features for practicing open source contributions. It is NOT a production application.

## Overview

Dev Events is a community event listing application where users can discover and submit local hackathons, meetups, conferences, and workshops. Users can upvote events they are interested in and help others discover great opportunities.

### Features

- Browse events by category, location, and online status
- Search events by title, description, and tags
- Submit new events with comprehensive details
- Upvote events to boost their visibility
- Register for events and track attendance
- Responsive design for all devices
- Dark mode support via system preferences

## Learning Objectives

This workshop is designed to help you practice:

- **Git/GitHub workflows**: Forking, branching, committing, pull requests
- **Next.js 15**: App Router, React Server Components, Server Actions
- **TypeScript**: Strict typing, generics, type inference
- **Form validation**: Zod schema validation with server-side handling
- **Testing**: Unit tests with Vitest, test-driven development
- **Code quality**: ESLint, TypeScript strict mode, conventional commits
- **Open source best practices**: Issue triage, documentation, collaborative development

## Quick Start

### Prerequisites

- Node.js 18.17 or later
- pnpm 9.x (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anxkhn/dev-events-workshop.git
cd dev-events-workshop
```

2. Install dependencies with pnpm:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Alternative: Using npm

```bash
npm install
npm run dev
```

## Project Structure

```
dev-events-workshop/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   └── feature_request.yml
│   ├── workflows/
│   │   └── ci.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── src/
│   ├── actions/
│   │   └── events.ts          # Server Actions
│   ├── app/
│   │   ├── api/
│   │   │   └── events/        # API routes
│   │   ├── events/
│   │   │   ├── [id]/          # Event detail page
│   │   │   └── page.tsx       # Events listing
│   │   ├── submit/
│   │   │   └── page.tsx       # Submit event form
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Home page
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── event-card.tsx
│   │   ├── event-form.tsx
│   │   ├── event-stats.tsx
│   │   ├── hero-section.tsx
│   │   ├── category-filter.tsx
│   │   ├── search-bar.tsx
│   │   ├── upvote-button.tsx
│   │   └── register-button.tsx
│   ├── lib/
│   │   ├── date-utils.ts      # Date formatting utilities
│   │   ├── store.ts           # In-memory data store
│   │   └── validations.ts     # Zod schemas
│   ├── test/
│   │   └── setup.ts
│   └── types/
│       └── index.ts           # TypeScript type definitions
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── vitest.config.ts
├── eslint.config.mjs
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint issues |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:run` | Run all tests once |

## Issue Labels Guide

| Label | Color | Description |
|-------|-------|-------------|
| `good-first-issue` | Blue | Good for newcomers (15-30 min) |
| `intermediate` | Yellow | Moderate difficulty (1-2 hours) |
| `advanced` | Orange | Complex challenge (3-6 hours) |
| `bug` | Red | Something is not working |
| `documentation` | Blue | Improvements to docs |
| `tests` | Cyan | Related to testing |
| `enhancement` | Cyan | New feature or request |
| `security` | Red | Security vulnerability |
| `performance` | Yellow | Performance optimization |
| `refactoring` | Yellow | Code quality improvements |
| `ci-cd` | Gray | CI/CD pipeline issues |

## Using github.dev

For quick edits without local setup:

1. Open the repository on GitHub
2. Press `.` (period) or change URL from `github.com` to `github.dev`
3. This opens VS Code in the browser
4. Make changes and create a pull request directly

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.