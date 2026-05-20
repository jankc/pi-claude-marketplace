# plugin-listing Specification

## Purpose

Describe the existing behavior for listing plugins from configured marketplaces, including installed, available, and unavailable plugins.

## Requirements

### Requirement: Plugin listing groups plugins by scope and marketplace

Plugin listing SHALL enumerate configured marketplaces and render plugin rows grouped by scope and marketplace.

#### Scenario: No scope is provided

- **WHEN** plugin listing is requested without a scope
- **THEN** user-scope marketplaces are considered
- **AND** project-scope marketplaces are considered

#### Scenario: Scope is provided

- **WHEN** plugin listing is requested with an explicit scope
- **THEN** only marketplaces from that scope are considered

#### Scenario: Marketplace filter is provided

- **WHEN** plugin listing is requested with a marketplace name
- **THEN** only matching marketplace records are considered

### Requirement: Plugin listing applies status filters as a union

Plugin listing SHALL include installed, available, and unavailable plugins by default, and SHALL treat explicit status flags as a union of selected buckets.

#### Scenario: No status filters are provided

- **WHEN** plugin listing is requested without installed, available, or unavailable filters
- **THEN** installed plugins are included
- **AND** available plugins are included
- **AND** unavailable plugins are included

#### Scenario: One or more status filters are provided

- **WHEN** plugin listing is requested with one or more status filters
- **THEN** a plugin is included when its status matches any selected filter

### Requirement: Plugin listing reports installed plugin upgrade availability by string comparison

Plugin listing SHALL mark an installed plugin as upgradable when the manifest version differs from the installed record version.

#### Scenario: Manifest version differs from installed version

- **WHEN** an installed plugin appears in the marketplace manifest with a different version string
- **THEN** the plugin is marked upgradable

### Requirement: Plugin listing soft-fails manifest load errors

Plugin listing SHALL continue listing plugins from other state records when a marketplace manifest cannot be loaded.

#### Scenario: Marketplace manifest cannot be loaded

- **WHEN** loading a marketplace manifest fails
- **THEN** plugin listing records a warning for that marketplace
- **AND** plugin listing continues processing remaining marketplaces
- **AND** installed plugins from state can still be rendered for the affected marketplace

### Requirement: Plugin listing probes not-yet-installed entries for availability

Plugin listing SHALL resolve not-yet-installed manifest entries to distinguish available plugins from unavailable plugins.

#### Scenario: Manifest entry resolves as installable

- **WHEN** a not-yet-installed manifest entry resolves as installable
- **THEN** the plugin is listed as available

#### Scenario: Manifest entry resolves as not installable

- **WHEN** a not-yet-installed manifest entry resolves as not installable
- **THEN** the plugin is listed as unavailable
- **AND** resolver notes are included when present
