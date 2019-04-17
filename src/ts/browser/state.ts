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
}

interface State {
  // Current active state: what is being selected.
  // Defined by the explorer UI
  active: Active;
  selected: Selected;
}

interface Selected {
  [url: string]: Paths;
}

// Analogous to
// https://swagger.io/specification/#pathsObject
interface Paths {
  // For example: "/pets/:id" -> Path
  [path: string]: Path;
}

// Analogous to
// https://swagger.io/specification/#pathItemObject
interface Path {
  // For example: "get" -> Operation
  [operation: string]: Operation;
}

interface Operation {}
