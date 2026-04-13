# Docker and Dev Containers for Implementation

## Status

Accepted

## Context

The repository currently has no committed product runtime, package manager, Dockerfile, Docker Compose file, or Dev Container configuration. The complete-game MVP will introduce React, TypeScript, TailwindCSS, browser automation, content validation, and build/test commands. Those tools should be reproducible across contributors, Codex sessions, and future CI.

The implementation guardrails already expect exact setup and validation commands to be documented when tooling is introduced. Docker and Dev Containers can reduce environment drift before source implementation begins.

## Decision

Add Docker and Dev Container support as part of the first implementation setup.

The Dev Container should be the preferred contributor environment and should provide Node.js 24 LTS, pnpm, Playwright/browser dependencies, and documented commands for install, dev server, build, lint, unit tests, content validation, and end-to-end checks as those commands are introduced.

The implementation should commit package manager metadata and a lockfile so container, host-native, and CI installs use the same dependency graph.

Docker Compose may be used for a `workspace` service and future dependencies, but the MVP should not add database or backend service containers unless a later approved ADR supersedes the no-database and client-only decisions.

Host-native setup should remain documented for contributors who do not want to use containers.

## Consequences

This improves reproducibility, CI parity, and Codex implementation reliability. It also gives future contributors a consistent way to run browser validation and content checks.

The tradeoff is additional setup complexity and a Docker dependency for the preferred workflow. Execution planning must include `.devcontainer/`, Dockerfile or image selection, optional Compose configuration, and documentation updates when product tooling is introduced.

Execution planning should include the Dev Container, Docker, package manager, and documentation work needed to make this decision executable.

## Related Artifacts

- [Design: The Deep Vault MVP Game Architecture](../design/the-deep-vault-mvp-game-architecture.md)
- [ADR: Browser-First React Runtime for The Deep Vault MVP](browser-first-react-runtime-for-the-deep-vault-mvp.md)
- [Feature: The Deep Vault Complete Game MVP](../features/the-deep-vault-complete-game-mvp.md)
