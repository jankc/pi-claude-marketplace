# Change: Add authenticated Git marketplace sources

## Summary

Allow `/claude:plugin marketplace add` to install marketplaces from arbitrary HTTPS Git remotes, including private Bitbucket, GitLab, and self-hosted Git repositories, using username/token credentials supplied through environment variables.

## Motivation

Marketplace sources currently support local paths and GitHub-specific forms. Users who host private Claude plugin marketplaces on Bitbucket or GitLab cannot add those marketplaces unless they mirror them locally or on GitHub.

A validation showed `isomorphic-git` can clone a private Bitbucket HTTPS repository when supplied with `onAuth` credentials from environment variables.

## Proposed scope

- Add a generic HTTPS Git marketplace source kind.
- Continue supporting existing local path and GitHub source forms.
- Use environment variables for private HTTPS Git authentication.
- Never persist or render credentials.
- Reject SSH Git URLs with a clear message that HTTPS plus env credentials is supported instead.
- Reuse authenticated Git behavior for marketplace update and plugin update clone refreshes.

## Non-goals

- Native SSH transport support for `git@...` or `ssh://...` URLs.
- Shelling out to system `git`.
- Interactive credential prompts.
- Persisted credential stores.
- Provider API integrations.
- Installing plugin sources beyond the marketplace-level Git clone.
