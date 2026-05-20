# Design: Authenticated Git marketplace sources

## Source model

Add a generic marketplace source:

```ts
interface GitSource {
  kind: "git";
  raw: string;
  url: string;
  ref?: string;
}
```

Existing `github` sources remain supported for compatibility and shorthand parity. Generic `git` sources cover arbitrary HTTPS Git remotes.

## Supported forms

- `https://bitbucket.org/workspace/repo.git`
- `https://gitlab.com/group/repo.git`
- `https://git.example.com/team/repo.git`
- `https://git.example.com/team/repo.git#main`

## Rejected forms

- `git@bitbucket.org:workspace/repo.git`
- `ssh://git@gitlab.com/group/repo.git`
- `https://user:token@gitlab.com/group/repo.git`

Credential-bearing URLs are rejected to avoid persisting or rendering secrets.

## Authentication

Resolve credentials from environment variables.

Provider-specific variables:

```txt
PI_CLAUDE_MARKETPLACE_BITBUCKET_USERNAME
PI_CLAUDE_MARKETPLACE_BITBUCKET_TOKEN

PI_CLAUDE_MARKETPLACE_GITLAB_USERNAME
PI_CLAUDE_MARKETPLACE_GITLAB_TOKEN

PI_CLAUDE_MARKETPLACE_GITHUB_USERNAME
PI_CLAUDE_MARKETPLACE_GITHUB_TOKEN
```

Generic fallback:

```txt
PI_CLAUDE_MARKETPLACE_GIT_USERNAME
PI_CLAUDE_MARKETPLACE_GIT_TOKEN
```

Resolution order:

1. Provider-specific pair for known host.
2. Generic pair.
3. No credentials.

Both username and token must be present. Partial credentials are treated as incomplete and should produce a diagnostic when authentication is needed.

## GitOps changes

Extend `clone` and `fetch` options with optional credentials.

`platform/git.ts` maps credentials to `isomorphic-git`:

```ts
onAuth: () => ({
  username,
  password: token,
});
```

Marketplace add uses credentials during clone. Marketplace update and plugin update use credentials during fetch/refresh.

## Naming

Rename GitHub-specific internal helpers where appropriate:

- `refreshGitHubClone` -> `refreshGitClone`
- `addGithubInGuard` -> `addRemoteGitInGuard` or similar

Compatibility aliases are acceptable if a full rename creates unnecessary churn.
