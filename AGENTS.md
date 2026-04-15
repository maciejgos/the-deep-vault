# Repository Guidelines

## Project Structure & Module Organization

This repository is Flow Forge, an AI-native PDLC workflow template for running human-governed product development with Codex. Treat `spec/` as the primary workspace until product implementation begins:

- `spec/requirements/` for business needs, constraints, and acceptance criteria.
- `spec/features/` for feature definitions, scope, and outcomes.
- `spec/stories/` for implementation-ready user stories and tasks.
- `spec/design/` for UX, technical design, and flows.
- `spec/plans/` for ExecPlans that guide complex Codex-executed implementation work.
- `spec/architecture-records/` for ADRs based on the included template.
- `spec/validation/` for acceptance checks, evaluation plans, and evidence that PDLC artifacts or delivered outcomes are complete.
- `spec/release-readiness/` for advisory release, merge, and deployment readiness records before human release decisions.
- `spec/lifecycle/` for post-release retrospectives, incidents, feedback, metrics, and continuous improvement notes.
- `.codex/` for Codex runtime configuration, including agent definitions, rules, and skills. Project-scoped custom subagents belong in standalone `.codex/agents/*.toml` files with `name`, `description`, and `developer_instructions`.
- `src/` for product implementation code once this template is instantiated. Source-specific agent guidance belongs in `src/AGENTS.md`.
- `tests/` for executable product tests once implementation tooling exists.

Each spec subdirectory should include a `README.md` explaining its purpose and a `TEMPLATE.md` for new artifacts, except `spec/plans/`, where `spec/plans/PLANS.md` is the authoritative self-contained guide for ExecPlan format and maintenance rules.

Keep generated output, caches, and dependency folders out of version control. Add `.gitignore` when a toolchain is introduced.

## Build, Test, and Development Commands

The Deep Vault MVP uses Node.js 24 LTS, pnpm, Vite, React, TypeScript, TailwindCSS, Vitest, Playwright, Docker, and Dev Containers.

- `pnpm install --frozen-lockfile`: install dependencies from the committed lockfile.
- `pnpm dev`: start the Vite development server at `http://localhost:5173`.
- `pnpm build`: typecheck and produce the static Cloudflare Pages build in `dist/`.
- `pnpm lint`: run ESLint.
- `pnpm test`: run the default unit test suite.
- `pnpm test:unit`: run Vitest unit tests.
- `pnpm test:content`: run content validation tests once content modules exist.
- `pnpm test:e2e`: run Playwright end-to-end tests.
- `pnpm audit:deps`: run the pnpm dependency security audit with a moderate-or-higher severity gate when the registry audit endpoint is available.
- `pnpm validate`: run lint, unit tests, content tests, build, and Playwright checks.
- `docker compose run --rm workspace pnpm install --frozen-lockfile`: install inside the planned container workspace.
- `docker compose run --rm workspace pnpm validate`: run validation inside the planned container workspace.

Do not add setup steps that cannot be reproduced from committed files. If dependency installation or Playwright browser setup needs network access, request approval through the command escalation flow.

## Coding Style & Naming Conventions

Follow the committed TypeScript, ESLint, Vite, and TailwindCSS tooling. Use 2-space indentation for JavaScript, TypeScript, JSON, and Markdown. Prefer `camelCase` for variables and functions, `PascalCase` for classes and components, and `kebab-case` for filenames unless a framework requires otherwise.

Keep modules focused. Avoid large utility files; group shared helpers under `src/lib/` or `src/utils/` when needed.

## Testing Guidelines

During workflow-template work, validate Markdown structure, links, examples, and artifact completeness. Use `spec/validation/` for acceptance evidence before product code exists. During product implementation, place executable tests under `tests/` or beside source files with a suffix such as `.test.ts` or `.spec.ts`. Each behavior change should include a focused test where practical.

## Commit & Pull Request Guidelines

This repository has no commits yet, so no historical convention can be inferred. Use clear, imperative commit messages such as `Add PDLC spec templates`.

Before committing, run `git status --short` and verify only intentional files are staged. Pull requests should include a short summary, testing notes, and linked issues when applicable. Include screenshots or terminal output for user-visible changes, CLI behavior, or generated artifacts.

## Agent-Specific Instructions

Before broad changes, inspect the tree with `git status --short` and preserve user edits. Do not rewrite history on `main` unless requested. Update this guide whenever the repository gains tooling, directories, remotes, or contribution rules.

Nested `AGENTS.md` files may add more specific instructions for their subtree. Follow the closest applicable `AGENTS.md` when editing files.

Do not self-approve PDLC artifacts or checkpoints. Codex and subagents may draft artifacts, review artifacts, recommend readiness, and summarize evidence, but only an explicit human instruction can approve, accept, reject, or mark a checkpoint complete. Keep generated artifacts in `Draft` status unless the human explicitly asks to change the status.

Every PDLC step must use the applicable read-only reviewer subagents defined in `.codex/agents/` before the human checkpoint for that step, once a draft artifact or implementation diff exists. Subagent review is required process evidence, but it is advisory only: Codex and subagents may identify risks, recommend changes, and summarize readiness, but only an explicit human instruction can approve, accept, reject, merge, release, deploy, tag, announce, close, or mark a checkpoint complete.

Use these reviewer roles by PDLC stage, adding the risk-specific reviewers when the artifact or implementation touches their area:

- Requirements, features, and stories: `product_coherence_reviewer`.
- Solution design and ADRs: `architecture_decision_reviewer`, plus `product_coherence_reviewer` when product intent may drift and `security_reviewer` when security, privacy, data, hosting, dependency, or permission decisions are involved.
- Execution planning: `execution_plan_reviewer`, plus `validation_gate_reviewer` when test, CI/CD, or acceptance evidence is material.
- Implementation execution: `implementation_reviewer`, `security_reviewer`, and `quality_gate_reviewer`.
- Validation review: `validation_gate_reviewer`, plus `implementation_reviewer`, `security_reviewer`, or `quality_gate_reviewer` when evidence depends on implementation scope, security, or test quality.
- Release readiness: `release_readiness_reviewer`, plus `validation_gate_reviewer`, `security_reviewer`, and `quality_gate_reviewer`.
- Lifecycle retrospective: `lifecycle_learning_reviewer`, plus `product_coherence_reviewer`, `architecture_decision_reviewer`, `security_reviewer`, or `validation_gate_reviewer` depending on the learning.

Each PDLC artifact must record `Subagent Review Evidence` when the stage uses or should use reviewer subagents:

- PDLC step.
- Trigger.
- Required `.codex/agents` reviewers.
- Review status: `pending`, `running`, `completed`, `skipped`, or `unavailable`.
- Findings summary.
- Evidence path.
- Unresolved gaps.
- Human decision state.

If an applicable reviewer cannot be executed, record the reviewer role, reason unavailable or skipped, impact on confidence, unresolved risk, and whether explicit human approval is required to proceed despite missing advisory review.

`pending` and `running` reviewer statuses are allowed only while drafting or implementing. Before a human checkpoint, each required reviewer must be `completed`, `skipped`, or `unavailable`; skipped or unavailable reviewers require explicit evidence and human acknowledgment before advancing.

## ExecPlans

When writing complex features or significant refactors, use an ExecPlan (as described in spec/plans/PLANS.md) from design to implementation. When executing an approved ExecPlan, use the `implementation-execution` skill and keep the ExecPlan updated as a living artifact.

## Implementation Guardrails

During implementation, create or switch to a feature branch before edits unless the human explicitly says to stay on the current branch. Use TDD and BDD where practical: define behavior first, add or update tests first when tooling exists, then implement the smallest scoped change. Apply SOLID and KISS principles so responsibilities stay focused, dependencies stay explicit, interfaces stay narrow, and the implementation remains as simple as the behavior allows. Use established design patterns when they clarify boundaries, lifecycle, orchestration, or extension points; avoid patterns that add ceremony without reducing real complexity. Validate usability with available lint, typecheck, build, unit, integration, manual, and end-to-end checks. Use Playwright for browser UI validation when a UI exists, and capture screenshots as reference evidence when useful. Review changes against design, security, quality, validation gates, and the no-self-approval policy before asking for human acceptance.

## Validation Review

After implementation, use the `validation-review` skill to record evidence under `spec/validation/`. Map validation back to requirements, features, stories, designs, ADRs, and ExecPlans. Distinguish passed, failed, skipped, unavailable, and future CI/CD checks. Do not mark validation accepted or complete without explicit human approval.

## Release Readiness

After validation review, use the `release-readiness` skill to prepare the final human release decision and record durable evidence under `spec/release-readiness/`. Summarize approval state, validation and CI/CD evidence, security and quality review notes, unresolved risks, rollback or recovery notes, and recommended next action. Do not merge, release, deploy, tag, announce, or mark release complete without explicit human approval.

## Lifecycle Retrospective

After release, merge, deployment, incident, or sustained usage, use the `lifecycle-retrospective` skill to record learnings under `spec/lifecycle/`. Route approved follow-up work back into requirements refinement, ADR updates, validation improvements, process changes, or operational work. Do not approve priorities, close incidents, or start a new lifecycle loop without explicit human approval.
