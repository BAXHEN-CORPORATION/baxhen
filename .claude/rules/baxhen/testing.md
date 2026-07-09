# Baxhen E2E Testing Standards

## Test Framework

- **Playwright** (`@playwright/test`) for all E2E tests
- Next.js 16 testmode via `next/experimental/testmode/playwright`
- Tests live in `e2e/specs/`, fixtures in `e2e/fixtures/`, utilities in `e2e/utils/`

## Test Organization

```
e2e/
  fixtures/
    pages/                        # Page Object Models
      {step-name}-page.ts         # One POM per funnel step
      index.ts                    # Barrel export
  specs/
    {funnel-name}-{variant}.spec.ts   # Full funnel flow tests
    {step-name}-states.spec.ts        # State machine tests
    {step-name}-interactions.spec.ts  # Interaction-specific tests
    a11y-smoke.spec.ts                # Accessibility tests
    mobile-viewport.spec.ts           # Responsive design tests
  utils/
    audio-mock.ts                 # HTMLAudioElement mock
    time-fake.ts                  # Clock API helpers
    route-wait.ts                 # Navigation wait helpers
    test-helpers.ts               # Hermetic test context helpers
```

## Test Rules

1. Every new funnel variant MUST have at least one full-flow E2E spec
2. Every new component with state transitions MUST have state machine specs
3. Every new interaction type MUST have interaction specs
4. Use Page Object Models — no raw `page.locator()` in specs
5. Use Playwright Clock API (`page.clock.fastForward()`) for script-driven delays — never real timers
6. Always mock `HTMLAudioElement` — see `e2e/utils/audio-mock.ts`
7. `test.describe` groups related tests, `test.beforeEach` sets up page state
8. Each `test()` is self-contained and hermetic — no state leakage between tests
9. Use `test.fixme()` for known-flaky tests, `test.skip(condition)` for environment-specific
10. Accessibility specs use Playwright's built-in a11y checks or `@axe-core/playwright`

## CI Configuration

- `reuseExistingServer: !process.env.CI`
- Retries: 1 local, 2 CI
- Trace on first retry, screenshot on failure, video on failure
- Run `--repeat-each=5` to detect flakes before merging

## Funnel-Specific Patterns

| Scenario               | Pattern                                      |
|------------------------|----------------------------------------------|
| Audio playback         | Mock Audio prototype, assert `.play()` called |
| Script-driven delays   | `page.clock.fastForward()` skip all delays    |
| Call timer             | Clock advance by 1s, assert timer text        |
| Client-side navigation | Wait for `page.url()` to match route         |
| PDF viewer             | POM methods for open/next/close               |
| Fullscreen request     | `page.context().grantPermissions(["fullscreen"])` or mock |
