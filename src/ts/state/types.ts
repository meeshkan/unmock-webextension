export interface State {
  /**
   * What has been labeled.
   */
  labeled: Labeled;

  /**
   * User state (xstate)
   */
  userState?: any;
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
