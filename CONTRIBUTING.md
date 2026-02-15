# Contributing to Dev Events Workshop

Thank you for your interest in contributing! This repository is designed for practicing open source contributions. Follow this guide to make your first contribution.

## Table of Contents

- [Getting Started](#getting-started)
- [Contribution Workflow](#contribution-workflow)
- [Conventional Commits](#conventional-commits)
- [Code Style](#code-style)
- [Testing](#testing)
- [Common Mistakes to Avoid](#common-mistakes-to-avoid)
- [Getting Help](#getting-help)

## Getting Started

1. **Fork the repository** by clicking the "Fork" button on GitHub.

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/dev-events-workshop.git
   cd dev-events-workshop
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/anxkhn/dev-events-workshop.git
   ```

4. **Install dependencies**:
   ```bash
   pnpm install
   ```

5. **Run the development server**:
   ```bash
   pnpm dev
   ```

## Contribution Workflow

### Step 1: Find an Issue

Browse [open issues](https://github.com/anxkhn/dev-events-workshop/issues) and look for:
- Issues labeled `good-first-issue` for beginners
- Issues labeled `intermediate` for moderate difficulty
- Issues labeled `advanced` for complex challenges

### Step 2: Create a Branch

```bash
git checkout -b fix/issue-number-short-description
# or
git checkout -b feature/issue-number-short-description
```

Branch naming conventions:
- `fix/` prefix for bug fixes
- `feature/` prefix for new features
- `docs/` prefix for documentation changes
- `refactor/` prefix for code refactoring
- `test/` prefix for test additions/fixes

### Step 3: Make Your Changes

1. Write clean, readable code
2. Follow the existing code style
3. Add/update tests if applicable
4. Update documentation if needed

### Step 4: Commit Your Changes

Use conventional commit messages (see [Conventional Commits](#conventional-commits)).

```bash
git add .
git commit -m "fix: correct date formatting in event card"
```

### Step 5: Push and Create PR

```bash
git push origin your-branch-name
```

Then open a pull request on GitHub using the PR template.

### Step 6: Address Review Feedback

- Respond to all review comments
- Make requested changes in new commits
- Mark conversations as resolved

## Conventional Commits

All commit messages must follow this format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add event search functionality` |
| `fix` | Bug fix | `fix: correct date calculation for events` |
| `docs` | Documentation only | `docs: update installation instructions` |
| `style` | Code style (formatting) | `style: format event card component` |
| `refactor` | Code refactoring | `refactor: extract date formatting utility` |
| `test` | Adding/fixing tests | `test: add tests for event validation` |
| `chore` | Maintenance tasks | `chore: update dependencies` |
| `ci` | CI/CD changes | `ci: add commit message linting` |

### Scopes (Optional)

Common scopes: `events`, `form`, `api`, `ui`, `date`, `validation`

### Examples

```bash
fix(events): resolve hydration error in event list
feat(form): add character counter for description field
docs(readme): add troubleshooting section
test(validations): add edge case tests for date parsing
```

## Code Style

### TypeScript

- Use strict type checking (enabled in tsconfig.json)
- Avoid `any` type - use `unknown` when type is truly unknown
- Define interfaces for all data structures
- Use const assertions for literal types

### React

- Use functional components with hooks
- Add `'use client'` directive for client components
- Use Server Components by default
- Handle loading and error states

### Styling

- Use Tailwind utility classes
- Follow existing CSS variable naming
- Ensure responsive design
- Support dark mode where applicable

### File Naming

- Use kebab-case for file names: `event-card.tsx`
- Test files: `component.test.ts` or `module.test.ts`

## Testing

### Running Tests

```bash
pnpm test          # Watch mode
pnpm test:run      # Run all tests once
```

### Writing Tests

- Place test files next to the code they test
- Use descriptive test names
- Follow AAA pattern: Arrange, Act, Assert

```typescript
import { describe, it, expect } from 'vitest'

describe('MyComponent', () => {
  it('should render correctly', () => {
    // Arrange
    const props = { title: 'Test' }
    
    // Act
    const result = render(<MyComponent {...props} />)
    
    // Assert
    expect(result.getByText('Test')).toBeDefined()
  })
})
```

### Test Coverage

- New features must include tests
- Bug fixes should include regression tests
- Maintain or improve coverage percentage

## Common Mistakes to Avoid

1. **Not pulling latest changes**: Always sync with upstream before starting
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Committing to main branch**: Always create a feature branch

3. **Large pull requests**: Keep PRs focused on a single issue

4. **Ignoring linting errors**: Run `pnpm lint` before committing

5. **Missing tests**: Run `pnpm test:run` to verify all tests pass

6. **Not updating documentation**: Update README/CONTRIBUTING for significant changes

7. **Squashing all commits**: Keep meaningful commit history

## Getting Help

- Comment on the issue if you need clarification
- Check existing pull requests for similar changes
- Review the project documentation

## Pull Request Template Reference

Your PRs will use the template at `.github/PULL_REQUEST_TEMPLATE.md`. Key sections:

- Description of changes
- Related issue(s)
- Type of change
- Testing performed
- Checklist verification

---

Happy contributing! Remember, this is a learning environment. Do not hesitate to ask questions and learn from your mistakes.