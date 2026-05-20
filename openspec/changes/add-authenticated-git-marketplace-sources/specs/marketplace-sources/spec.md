# marketplace-sources Specification

## ADDED Requirements

### Requirement: Marketplace add accepts HTTPS Git remotes

Marketplace add SHALL accept arbitrary HTTPS Git repository URLs as marketplace sources.

#### Scenario: Bitbucket HTTPS Git marketplace is added

- **WHEN** the user adds `https://bitbucket.org/workspace/repo.git`
- **THEN** the source is classified as a generic Git source
- **AND** the repository is cloned from that URL
- **AND** the marketplace manifest is loaded from the clone

#### Scenario: GitLab HTTPS Git marketplace is added with a ref

- **WHEN** the user adds `https://gitlab.com/group/repo.git#main`
- **THEN** the source is classified as a generic Git source
- **AND** the clone uses `main` as the requested ref
- **AND** the persisted source records the URL and ref

### Requirement: Marketplace Git authentication uses environment credentials

Marketplace Git clone and fetch operations SHALL use environment-provided username/token credentials when available.

#### Scenario: Bitbucket credentials are configured

- **WHEN** the source host is `bitbucket.org`
- **AND** `PI_CLAUDE_MARKETPLACE_BITBUCKET_USERNAME` and `PI_CLAUDE_MARKETPLACE_BITBUCKET_TOKEN` are set
- **THEN** clone and fetch authenticate with those values

#### Scenario: Generic credentials are configured

- **WHEN** no provider-specific credential pair applies
- **AND** `PI_CLAUDE_MARKETPLACE_GIT_USERNAME` and `PI_CLAUDE_MARKETPLACE_GIT_TOKEN` are set
- **THEN** clone and fetch authenticate with the generic values

### Requirement: Credentials are not persisted or rendered

Marketplace source persistence and presentation SHALL exclude credential values.

#### Scenario: Authenticated marketplace is added

- **WHEN** a marketplace is cloned using environment credentials
- **THEN** state records only the source URL and optional ref
- **AND** state does not contain the username or token
- **AND** marketplace listing does not render the username or token

#### Scenario: Credential-bearing URL is supplied

- **WHEN** the user supplies a URL containing username or password information
- **THEN** marketplace add rejects the source before cloning
- **AND** the error instructs the user to use environment variables

### Requirement: SSH Git URLs are rejected

Marketplace add SHALL reject SSH Git URLs until an SSH transport is explicitly designed.

#### Scenario: SCP-like SSH URL is supplied

- **WHEN** the user supplies `git@bitbucket.org:workspace/repo.git`
- **THEN** marketplace add rejects the source
- **AND** the error says SSH URLs are unsupported
- **AND** the error suggests using an HTTPS Git URL with environment credentials

#### Scenario: ssh:// URL is supplied

- **WHEN** the user supplies `ssh://git@gitlab.com/group/repo.git`
- **THEN** marketplace add rejects the source
- **AND** the error says SSH URLs are unsupported
