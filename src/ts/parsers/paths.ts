import { ParameterObject } from "openapi3-ts";
import * as _ from "lodash";
import { Optional } from "typescript-optional";

export interface PartOfPath {
  /**
   * Part of path, for example `:id`
   */
  name: string;
  /**
   * Path parameter extracted from `name`, would be present and have `name: id` for `:id`.
   */
  pathParameter?: ParameterObject;
}

export interface Path {
  /**
   * Full path, for example `/v1/pets/:id`
   */
  name: string;
  /**
   * Path parameters extracted from parts of path such as `:id`
   */
  pathParameters: ParameterObject[];
}

/**
 * @param str Part of path, for example, `(int: id)`
 * @returns Filled optional if part of route matches the expected pattern, empty otherwise.
 */
const tryHandleRouteWithParentheses = (str: string): Optional<PartOfPath> => {
  const rtdPathPattern = /^\(([\w_]+):\s?([\w_]+)\)$/;
  const rtdMatch = str.match(rtdPathPattern);
  if (!rtdMatch) {
    return Optional.empty();
  }
  const parameterName = rtdMatch[2];
  // TODO Better
  const schema = rtdMatch[1] === "int" ? { type: "integer" } : {};
  const parameterObject: ParameterObject = {
    name: parameterName,
    in: "path",
    required: true,
    schema,
  };
  return Optional.of({
    name: `:${parameterName}`,
    pathParameter: parameterObject,
  });
};

/**
 * @param str Part of path, for example, `:id`
 * @returns Filled optional if part of path matches the expected pattern, empty otherwise.
 */
const tryHandleRouteStartingWithColon = (str: string): Optional<PartOfPath> => {
  const colonPathPattern = /^:([\w_]+)/;
  const colonMatch = str.match(colonPathPattern);
  if (!colonMatch) {
    return Optional.empty();
  }
  const parameterName = colonMatch[1];
  const schema = {};
  const parameterObject: ParameterObject = {
    name: parameterName,
    in: "path",
    required: true,
    schema,
  };
  return Optional.of({
    name: `:${parameterName}`,
    pathParameter: parameterObject,
  });
};

/**
 * @param path Path object built from, e.g., `/v1/pets/:id`.
 * @returns Transformed path object with extracted path parameters.
 */
export const cleanPathAndExtractParameters = (path: Path): Path => {
  const pathSplit = path.name.split("/");
  const pathParameterObjects: ParameterObject[] = [];
  const cleanedPathSplit = pathSplit.map(partOfPath => {
    const cleanedPartOfPath: PartOfPath = Optional.of(partOfPath)
      .flatMap(tryHandleRouteStartingWithColon)
      .or(() => tryHandleRouteWithParentheses(partOfPath))
      .orElse({ name: partOfPath });

    // Urgh, ugly side-effect in map
    if (!!cleanedPartOfPath.pathParameter) {
      pathParameterObjects.push(cleanedPartOfPath.pathParameter);
    }

    return cleanedPartOfPath.name;
  });
  return {
    ...path,
    name: cleanedPathSplit.join("/"),
    pathParameters: path.pathParameters.concat(...pathParameterObjects),
  };
};
