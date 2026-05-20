# atomic-json-persistence Specification

## Purpose

Describe the existing atomic JSON write behavior used for persisted extension files such as state, MCP configuration, and agent indexes.

## Requirements

### Requirement: JSON persistence writes are atomic

JSON persistence SHALL write JSON files using an atomic write operation that stages content in the destination directory before replacing the target file.

#### Scenario: JSON value is written

- **WHEN** a JSON value is persisted to a file path
- **THEN** the parent directory is created when needed
- **AND** the value is serialized as pretty-printed JSON
- **AND** the file content ends with a trailing newline
- **AND** the target file is replaced through an atomic write operation

### Requirement: Atomic JSON writes preserve durability defaults

JSON persistence SHALL rely on the atomic writer's durability defaults for file and directory synchronization.

#### Scenario: Atomic write completes

- **WHEN** the atomic write operation returns successfully
- **THEN** the caller can treat the JSON file as durably written according to the atomic writer defaults

### Requirement: Atomic JSON writes serialize concurrent writes to the same path

JSON persistence SHALL use an atomic writer that queues concurrent writes targeting the same file path.

#### Scenario: Concurrent writes target one JSON file

- **WHEN** multiple writes target the same JSON file concurrently
- **THEN** the atomic writer serializes those writes for that target path
