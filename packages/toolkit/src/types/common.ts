/**
 * A basic user object
 */
export interface User {
  name: string;
  email: string;
}

/**
 * The base type for an entry for a package's specific version
 *
 * For information about a general package, see {@link Package}
 */
export interface PackageVersions {
  package: string;
  version: string;
  versionType:
    | "major"
    | "experimental"
    | "beta"
    | "next"
    | "rc"
    | "canary"
    | "other";
  /** @todo we could serialize this to a date */
  created: string;
  config: string;
  configName: string;
  env: Record<string, any>;
  metadata: Record<string, any>;
  archive_path: string;
  isDeprecated?: boolean;
  isYanked?: boolean;
}

export type Privileges = "read" | "write" | "publish" | "ultimate";

/**
 * A package
 */
export interface Package {
  name: string;
  scope?: string;
  description?: string;
  latest_version: string;
  author: User;
  language: string;
  updated: string;
  created: string;
  vcs: "git" | "svn" | "fossil" | "mercurial" | "other";
  vcsUrl?: string;
}
