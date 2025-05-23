export interface PackageManager {
}

export interface PrittLocalController {
  getConfiguration<T extends Config>(): T;
}

export type PrittLocalConfigUnawareController = Omit<
  PrittLocalController,
  "getConfiguration"
>;

export interface PrittContext {
}

export interface Config {
}

export interface Workspace {
}
