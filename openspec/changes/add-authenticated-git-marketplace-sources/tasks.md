# Tasks

## 1. Source parsing

- [x] Add `GitSource` type.
- [x] Parse non-GitHub HTTPS URLs as `kind: "git"`.
- [x] Parse `#ref` fragments for generic Git URLs.
- [x] Reject credential-bearing HTTPS URLs.
- [x] Reject SSH URLs with an HTTPS/env-auth hint.
- [x] Preserve existing GitHub and path parsing behavior.

## 2. Credential resolution

- [x] Add Git credential resolver from environment variables.
- [x] Support Bitbucket-specific env vars.
- [x] Support GitLab-specific env vars.
- [x] Support GitHub-specific env vars.
- [x] Support generic fallback env vars.
- [x] Ensure credentials are never persisted or rendered.

## 3. Git transport

- [x] Extend GitOps clone options with optional credentials.
- [x] Extend GitOps fetch options with optional credentials.
- [x] Wire credentials into `isomorphic-git` `onAuth`.
- [x] Keep tests using GitOps injection without real network.

## 4. Marketplace add

- [x] Allow generic Git source in `addMarketplace`.
- [x] Clone generic Git URL directly.
- [x] Continue synthesizing clone URL for GitHub sources.
- [x] Pass credentials when available.
- [x] Preserve path-source no-network behavior.

## 5. Marketplace/plugin update

- [x] Refresh generic Git marketplace clones.
- [x] Pass credentials during fetch.
- [x] Preserve GitHub update behavior.
- [x] Preserve path-source no-network behavior.

## 6. Presentation and persistence

- [x] Persist generic Git source without credentials.
- [x] Render generic Git source URL in marketplace list.
- [x] Add tests proving credentials are not rendered.

## 7. Tests

- [x] Domain parser tests.
- [x] Credential resolver tests.
- [x] Marketplace add tests.
- [x] Marketplace update tests.
- [x] Plugin update sync tests.
- [x] Marketplace list rendering tests.
