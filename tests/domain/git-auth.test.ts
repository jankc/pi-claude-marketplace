import assert from "node:assert/strict";
import test from "node:test";

import { resolveGitCredentials } from "../../extensions/pi-claude-marketplace/domain/git-auth.ts";

test("resolveGitCredentials uses Bitbucket-specific pair before generic fallback", () => {
  assert.deepEqual(
    resolveGitCredentials("https://bitbucket.org/workspace/repo.git", {
      PI_CLAUDE_MARKETPLACE_BITBUCKET_USERNAME: "bb-user",
      PI_CLAUDE_MARKETPLACE_BITBUCKET_TOKEN: "bb-token",
      PI_CLAUDE_MARKETPLACE_GIT_USERNAME: "generic-user",
      PI_CLAUDE_MARKETPLACE_GIT_TOKEN: "generic-token",
    }),
    { username: "bb-user", token: "bb-token" },
  );
});

test("resolveGitCredentials supports GitLab and GitHub provider pairs", () => {
  assert.deepEqual(
    resolveGitCredentials("https://gitlab.com/group/repo.git", {
      PI_CLAUDE_MARKETPLACE_GITLAB_USERNAME: "gl-user",
      PI_CLAUDE_MARKETPLACE_GITLAB_TOKEN: "gl-token",
    }),
    { username: "gl-user", token: "gl-token" },
  );

  assert.deepEqual(
    resolveGitCredentials("https://github.com/o/r.git", {
      PI_CLAUDE_MARKETPLACE_GITHUB_USERNAME: "gh-user",
      PI_CLAUDE_MARKETPLACE_GITHUB_TOKEN: "gh-token",
    }),
    { username: "gh-user", token: "gh-token" },
  );
});

test("resolveGitCredentials falls back to generic pair and ignores partial pairs", () => {
  assert.deepEqual(
    resolveGitCredentials("https://git.example.com/team/repo.git", {
      PI_CLAUDE_MARKETPLACE_GIT_USERNAME: "user",
      PI_CLAUDE_MARKETPLACE_GIT_TOKEN: "token",
    }),
    { username: "user", token: "token" },
  );

  assert.equal(
    resolveGitCredentials("https://git.example.com/team/repo.git", {
      PI_CLAUDE_MARKETPLACE_GIT_USERNAME: "user",
    }),
    undefined,
  );
});
