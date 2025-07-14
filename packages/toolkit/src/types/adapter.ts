import { CRSArchive, CRSArchiveController, CRSDBController } from "./crs";
/**
 * Necessary information about the incoming request needed to be able
 */
export interface AdapterRequestObject {
  resolveObject: AdapterResolveObject;
  env: Record<string, any>;
  resolveType: AdapterResolveType;
}

export enum AdapterResolveType {
  None,
  Meta,
  Archive,
}

/** */
export interface AdapterResolveObject {
  path: string;
  pathSegments: string[];
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";
  accept: string;
  maxAge?: number;
  query: Record<string, string>;
  userAgent: string;

  get meta(): Record<string, any>;
  /** @fixme unimplemented */
  addMeta(key: string, value: any): void;
}

export interface AdapterResult {
  /** The MIME type of the response */
  responseType: string;
}

export interface AdapterMetaResult<T> extends AdapterResult {
  body: T;
}

export interface AdapterArchiveResult extends AdapterResult {
  target: string;
  archive?: CRSArchive;
  name: string;
  contentType: string;
}

export interface AdapterErrorResult<T> extends AdapterResult {
  error?: T;
  message: string;
  statusCode: number;
}

export type PrittAdapterResolveFunc = (
  res: AdapterResolveObject,
) => Promise<AdapterResolveType> | AdapterResolveType;

export type PrittAdapterMetaRequestFunc<T = any> = (
  req: AdapterRequestObject,
  crs: CRSDBController,
) =>
  | Promise<AdapterMetaResult<T> | AdapterErrorResult<T>>
  | AdapterMetaResult<T>
  | AdapterErrorResult<T>;

export type PrittAdapterArchiveRequestFunc<T = any> = (
  req: AdapterRequestObject,
  crs: CRSArchiveController,
) =>
  | Promise<AdapterArchiveResult | AdapterErrorResult<T>>
  | AdapterArchiveResult
  | AdapterErrorResult<T>;
