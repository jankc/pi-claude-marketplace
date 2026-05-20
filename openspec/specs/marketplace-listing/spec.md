# marketplace-listing Specification

## Purpose

Describe the existing behavior for listing configured Claude plugin marketplaces across user and project scopes.

## Requirements

### Requirement: Marketplace listing reads configured marketplaces without mutation

Marketplace listing SHALL read marketplace records from extension state and render them without mutating state or contacting the network.

#### Scenario: Marketplaces are configured

- **WHEN** marketplace listing is requested
- **THEN** the command reads configured marketplace records from state
- **AND** the command renders each marketplace name, scope, source, and autoupdate setting when present
- **AND** the command does not update state or fetch remote data

#### Scenario: No marketplaces are configured

- **WHEN** marketplace listing finds no marketplace records
- **THEN** the rendered output states that no marketplaces are configured

### Requirement: Marketplace listing respects scope selection

Marketplace listing SHALL enumerate both supported scopes by default and SHALL narrow enumeration when a scope is explicitly provided.

#### Scenario: No scope is provided

- **WHEN** marketplace listing is requested without a scope
- **THEN** user-scope marketplaces are considered
- **AND** project-scope marketplaces are considered

#### Scenario: Scope is provided

- **WHEN** marketplace listing is requested with an explicit scope
- **THEN** only marketplaces from that scope are considered
