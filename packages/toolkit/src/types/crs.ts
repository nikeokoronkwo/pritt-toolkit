import { Package, PackageVersions, Privileges, User } from "./common.ts";

interface CRSBaseController {
}

export interface CRSDBController extends CRSBaseController {
  /**
   * Get the latest version of a package
   */
  getLatestPackage(
    packageName: string,
    options?: {
      language?: string;
      env?: Record<string, any>;
    }
  ): Promise<CRSResponse<PackageVersions>>;

  /**
   * Get a specific version of a package
   */
  getPackageWithVersion(
    packageName: string,
    version: string,
    options?: {
      language?: string;
      env?: Record<string, any>;
    }
  ): Promise<CRSResponse<PackageVersions>>;

  /**
   * Get all versions of a package from the registry
   */
  getPackages(
    packageName: string,
    options?: {
      language?: string;
      env?: Record<string, any>;
    }
  ): Promise<CRSResponse<Map<string, PackageVersions>>>;

  /**
   * Get the package details from the registry
   */
  getPackageDetails(
    packageName: string,
    options?: {
      language?: string;
      env?: Record<string, any>;
    }
  ): Promise<CRSResponse<Package>>;

  /**
   * Get package contributors and authors
   */
  getPackageContributors(
    packageName: string,
    options?: {
      language?: string;
      env?: Record<string, any>;
    }
  ): Promise<CRSResponse<Map<User, Iterable<Privileges>>>>;
}

export interface CRSArchiveController extends CRSBaseController {
    getArchiveWithVersion(packageName: string, version: string, language?: string) : Promise<CRSResponse<CRSArchive>>;
}

export interface CRSController extends CRSDBController, CRSArchiveController {

}

export interface CRSArchive {
    ref: string;
}

export type CRSResponse<T> = {
    success: true;
    body: T;
    statusCode?: number;
} | {
    success: false;
    error: string;
    statusCode?: number;
    body?: T;
}