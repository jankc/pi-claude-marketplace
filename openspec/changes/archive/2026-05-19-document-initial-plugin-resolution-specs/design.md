# Context

OpenSpec was added to an existing repository that already implements plugin resolution behavior. The current resolver behavior is documented in TypeScript implementation and tests but not yet represented as OpenSpec baseline requirements.

## Goals / Non-Goals

**Goals:**

- Capture the current plugin resolution contract as an initial OpenSpec capability.
- Base the spec on existing implementation and tests.
- Avoid changing runtime behavior during this onboarding change.

**Non-Goals:**

- Refactor resolver implementation.
- Add or change resolver tests.
- Broaden the spec to cover install orchestration, bridge materialization, or marketplace commands.

## Decisions

### Decision 1: Treat this as a brownfield baseline spec

This change records existing behavior as `ADDED Requirements` because the repository has no prior OpenSpec specs. Future changes can then modify this capability using normal OpenSpec deltas.

### Decision 2: Use resolver tests as behavioral evidence

The spec is derived from `tests/domain/resolver*.test.ts` and `extensions/pi-claude-marketplace/domain/resolver.ts`. Existing tests remain the executable verification of the baseline behavior.

### Decision 3: Keep the capability focused on domain resolution

The `plugin-resolution` capability covers classification and resolution of plugin entries only. Installation, file materialization, command routing, and presentation remain separate future capabilities.
