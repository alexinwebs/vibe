# Contributing to VIBE

Thanks for your interest in VIBE.

VIBE is an open-source project focused on experimenting with a modern ride-hailing product architecture and a driver-friendly business model.

## Before Contributing

Please read:

- `README.md`
- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `docs/PROJECT_STATUS.md`

## Contribution Principles

### Keep changes focused

Prefer small changes that solve one problem clearly.

### Preserve API contracts

If an API response or shared type changes, update all affected applications and documentation.

### Keep business logic on the backend

Fare, commission, earnings and ride state should be controlled by the API rather than trusted to mobile clients.

### Don't claim unfinished features

Documentation should clearly distinguish:

- Working
- In development
- Planned

### Test before committing

At minimum, run the TypeScript check for the workspace you changed and manually test the affected flow when possible.

## Pull Requests

A useful pull request should explain:

1. What changed
2. Why it changed
3. How it was tested
4. Any known limitations

## Commit Messages

Keep commits understandable.

Examples:

```text
feat: add driver ride acceptance
fix: handle empty POST bodies
feat: add VIBE+ commission calculation
docs: update ride lifecycle
```
