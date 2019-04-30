import { UserStateConfig } from "../common/machine";

export interface State {
  /**
   * What has been labeled.
   */
  labeled: Labeled;

  /**
   * Any information related to user tabs
   */
  tabInfo?: TabInfo;

  /**
   * User state (xstate)
   */
  userState: UserStateConfig;
}

export interface TabInfo {
  /**
   * Tab ID user had active when opening Swagger editor
   */
  tabId?: number;
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
