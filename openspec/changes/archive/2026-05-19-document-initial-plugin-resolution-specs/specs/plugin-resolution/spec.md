# ADDED Requirements

## Requirement: Plugin resolution returns a discriminated installability result

The resolver SHALL classify each marketplace plugin entry as either installable or not installable using an `installable: true | false` discriminator.

## Scenario: Plugin is installable

- **WHEN** a plugin entry resolves successfully
- **THEN** the result has `installable: true`
- **AND** the result includes the plugin name, plugin root, supported components, unsupported components, notes, component paths, and MCP server declarations

## Scenario: Plugin is not installable

- **WHEN** a plugin entry cannot be safely installed
- **THEN** the result has `installable: false`
- **AND** the result includes the plugin name, supported components, unsupported components, notes, component paths, and MCP server declarations
- **AND** the result does not expose a plugin root

## Requirement: Strict resolution validates local plugin sources and declarations

Strict resolution SHALL resolve path-source plugin entries under the marketplace root and reject unsafe or malformed inputs.

## Scenario: Source cannot be resolved safely

- **WHEN** a plugin source is non-path, escapes the marketplace root, or points to a missing directory
- **THEN** strict resolution returns a non-installable result
- **AND** the notes explain why the plugin cannot be installed

## Scenario: Declarations are malformed

- **WHEN** plugin metadata, component paths, or MCP server declarations are malformed
- **THEN** strict resolution returns a non-installable result
- **AND** the notes identify the malformed declaration

## Requirement: Strict resolution discovers declared and conventional supported components

Strict resolution SHALL discover supported component paths from entry declarations, manifest declarations, and conventional plugin directories.

## Scenario: Declared and conventional component paths exist

- **WHEN** a supported component is declared and a conventional directory for the same component also exists
- **THEN** strict resolution records both paths
- **AND** declared paths appear before conventional paths
- **AND** duplicate paths are removed using first-wins ordering

## Requirement: Loose resolution uses entry declarations as authoritative

Loose resolution SHALL treat marketplace entry declarations as authoritative and shall not implicitly adopt manifest-only or standalone declarations for supported components or MCP servers.

## Scenario: Manifest-only component declaration exists

- **WHEN** a component is declared in the plugin manifest but not in the marketplace entry
- **THEN** loose resolution returns a non-installable result
- **AND** the notes identify a declaration conflict

## Scenario: Conventional supported component path exists without entry declaration

- **WHEN** a conventional supported component directory exists but the marketplace entry does not declare that component
- **THEN** loose resolution returns an installable result without that component path

## Requirement: Unsupported components prevent installation

The resolver SHALL mark plugins that contain unsupported component kinds as not installable.

## Scenario: Unsupported component is declared or found by convention

- **WHEN** a plugin entry, plugin manifest, or conventional location contains an unsupported component kind
- **THEN** resolution returns a non-installable result
- **AND** the unsupported kind appears in the unsupported component list
- **AND** the notes include `contains <kind>`

## Requirement: Dependencies are reported as manual-install notes

The resolver SHALL not block installation solely because a plugin declares dependencies.

## Scenario: Plugin declares dependencies

- **WHEN** an otherwise installable plugin declares dependencies
- **THEN** resolution returns an installable result
- **AND** the notes explain that dependencies must be installed manually
