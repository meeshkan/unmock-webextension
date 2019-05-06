import { ParameterObject } from "openapi3-ts";
import * as _ from "lodash";

export interface Path {
  name: string;
  pathParameters: ParameterObject[];
}

/**
 * Transform a single route portion of path and maybe extract an OpenAPI spec compatible ParameterObject.
 * For example, for `(int: id)`, return `[":id", `parameterObject]`, where `parameterObject`has schema `type: integer`.
 * As another example, for `:id`, return `[":id", parmaeterObject]` without the type information.
 * @param str Part of path, for example `:id` or `(int: id)`.
 */
const cleanPartOfPathAndExtractParameters = (
  str: string
): [string, ParameterObject | undefined] => {
  const rtdPathPattern = /^\(([\w_]+):\s?([\w_]+)\)$/;
  const rtdMatch = str.match(rtdPathPattern);
  const colonPathPattern = /^:([\w_]+)/;
  const colonMatch = str.match(colonPathPattern);
  if (rtdMatch) {
    const parameterName = rtdMatch[2];
    // TODO Better
    const schema = rtdMatch[1] === "int" ? { type: "integer" } : {};
    const parameterObject: ParameterObject = {
      name: parameterName,
      in: "path",
      required: true,
      schema,
    };
    return [`:${parameterName}`, parameterObject];
  } else if (colonMatch) {
    const parameterName = colonMatch[1];
    const schema = {};
    const parameterObject: ParameterObject = {
      name: parameterName,
      in: "path",
      required: true,
      schema,
    };
    return [str, parameterObject];
  }
  return [str, null];
};

/**
 * @param path Path object built from, e.g., `/v1/pets/:id`.
 * @returns Transformed path object with extracted path parameters.
 */
export const cleanPathAndExtractParameters = (path: Path): Path => {
  const pathSplit = path.name.split("/");
  const params: ParameterObject[] = [];
  const cleanedPathSplit = pathSplit.map(value => {
    const [
      cleanedPath,
      maybeParameterObject,
    ] = cleanPartOfPathAndExtractParameters(value);

    // Urgh, ugly side-effect in map
    if (maybeParameterObject) {
      params.push(maybeParameterObject);
    }

    return cleanedPath;
  });
  return {
    ...path,
    name: cleanedPathSplit.join("/"),
    pathParameters: path.pathParameters.concat(...params),
  };
};
