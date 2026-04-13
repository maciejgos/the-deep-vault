# Tests

Executable product tests now use Vitest and Playwright.

- Unit and component tests may live beside source files under `src/` with `.test.ts` or `.test.tsx` suffixes.
- Content validation tests may live under `src/content/` or `tests/content/`.
- Browser end-to-end tests live under `tests/e2e/`.

Run:

- `pnpm test:unit` for Vitest unit and component tests.
- `pnpm test:content` for content validation tests once content modules exist.
- `pnpm test:e2e` for Playwright browser tests.
- `pnpm validate` for the full validation chain.

Implementation validation evidence should still be recorded under `spec/validation/` before human acceptance.
