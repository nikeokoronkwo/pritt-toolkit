import { CRSDBController, CRSArchiveController } from "./crs.ts";
/**
 * Necessary information about the incoming request needed to be able
 */
export interface AdapterResolve {

}


export enum AdapterResolveType {
    None,
    Meta,
    Archive,
}

/**
 * 
 */
export interface AdapterRequestObject {
    path: string;
    pathSegments: string[];
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
    accept: string;
    maxAge?: number;
    query: Record<string, string>;
    userAgent: string;

    get meta(): Record<string, any>;
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
    archive: Blob;
    name: string;
    contentType: string;
}

export interface AdapterErrorResult<T> extends AdapterResult {
    error: T;
    status: number;
}

export type PrittAdapterResolveFunc = (res: AdapterResolve) => Promise<AdapterResolveType> | AdapterResolveType;

export type PrittAdapterMetaRequestFunc<T> = (req: AdapterRequestObject, crs: CRSDBController) => Promise<AdapterMetaResult<T> | AdapterErrorResult<T>> | AdapterMetaResult<T> | AdapterErrorResult<T>;

export type PrittAdapterArchiveRequestFunc<T> = (req: AdapterResolve, crs: CRSArchiveController) => Promise<AdapterArchiveResult | AdapterErrorResult<T>> | AdapterArchiveResult | AdapterErrorResult<T>;