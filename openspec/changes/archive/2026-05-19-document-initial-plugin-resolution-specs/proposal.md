# Why

This brownfield repository has OpenSpec installed but does not yet have baseline specs for existing behavior. The plugin compatibility resolver is a core domain boundary, so capturing its current behavior creates a stable reference for future changes.

## What Changes

- Add an initial `plugin-resolution` capability spec describing current resolver behavior.
- Document strict and loose resolver modes.
- Document installable vs non-installable result shape.
- Document component path resolution and unsupported component handling.
- Make no runtime code changes.

## Capabilities

### New Capabilities

- `plugin-resolution`: Describes how marketplace plugin entries are resolved into installable or non-installable plugin records.

### Modified Capabilities

None.

## Impact

- `openspec/changes/document-initial-plugin-resolution-specs/specs/plugin-resolution/spec.md`: new baseline behavior spec.
- Runtime code under `extensions/pi-claude-marketplace/`: no changes.
