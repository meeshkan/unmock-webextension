export enum Phase {
  ADD_PATH = "Add path",
  ADD_OPERATION = "Add operation",
}

export interface Active {
  url?: string;
  /**
   * Active path in Paths object:
   * Examples:
   * []: User needs to select a path such as "/pets/:id" for the currently active URL
   * ["/pets/:id"]: User needs to select an operation
   * ["/pets/:id", "get"]: User is filling in an operation, with default value such as "description" appended to the selection if nothing chosen
   */
  //
  activePath?: string[];
  phase: Phase;
}

export interface State {
  /**
   * Current active state: what is being labeled.
   */
  active: Active;
  /**
   * What has been labeled.
   */
  labeled: Labeled;
}

export interface Labeled {
  [url: string]: Paths;
}

// Analogous to
// https://swagger.io/specification/#pathsObject
export interface Paths {
  // For example: "/pets/:id" -> Path
  [path: string]: Path;
}

// Analogous to
// https://swagger.io/specification/#pathItemObject
export interface Path {
  // For example: "get" -> Operation
  [operation: string]: Operation;
}

export interface Operation {}
