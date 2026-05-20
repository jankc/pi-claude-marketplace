export interface GitCredentials {
  readonly username: string;
  readonly token: string;
}

export type EnvRecord = Record<string, string | undefined>;

const PROVIDER_ENV: readonly {
  readonly host: string;
  readonly username: string;
  readonly token: string;
}[] = [
  {
    host: "bitbucket.org",
    username: "PI_CLAUDE_MARKETPLACE_BITBUCKET_USERNAME",
    token: "PI_CLAUDE_MARKETPLACE_BITBUCKET_TOKEN",
  },
  {
    host: "gitlab.com",
    username: "PI_CLAUDE_MARKETPLACE_GITLAB_USERNAME",
    token: "PI_CLAUDE_MARKETPLACE_GITLAB_TOKEN",
  },
  {
    host: "github.com",
    username: "PI_CLAUDE_MARKETPLACE_GITHUB_USERNAME",
    token: "PI_CLAUDE_MARKETPLACE_GITHUB_TOKEN",
  },
];

export function resolveGitCredentials(
  url: string,
  env: EnvRecord = defaultEnv(),
): GitCredentials | undefined {
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return undefined;
  }

  const provider = PROVIDER_ENV.find((entry) => entry.host === host);
  if (provider !== undefined) {
    const credentials = readPair(env, provider.username, provider.token);
    if (credentials !== undefined) {
      return credentials;
    }
  }

  return readPair(env, "PI_CLAUDE_MARKETPLACE_GIT_USERNAME", "PI_CLAUDE_MARKETPLACE_GIT_TOKEN");
}

function defaultEnv(): EnvRecord {
  const runtime = globalThis as unknown as { readonly process?: { readonly env?: EnvRecord } };
  return runtime.process?.env ?? {};
}

function readPair(
  env: EnvRecord,
  usernameKey: string,
  tokenKey: string,
): GitCredentials | undefined {
  const username = env[usernameKey];
  const token = env[tokenKey];
  if (username === undefined || token === undefined || username === "" || token === "") {
    return undefined;
  }

  return { username, token };
}
