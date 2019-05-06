import { ParameterObject } from "openapi3-ts";
import * as _ from "lodash";

export interface Path {
  name: string;
  pathParameters: ParameterObject[];
}

const cleanPartOfPathAndExtractParameters = (
  str: string
): [string, ParameterObject | undefined] => {
  const rtdPathPattern = /^\(([\w_]+):\s?([\w_]+)\)$/;
  const rtdMatch = str.match(rtdPathPattern);
  const colonMatch = str.match(/^:([\w_]+)/);
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

export const extractPathParametersRtd = (path: Path): Path => {
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

export const extractPathParametersFull: (path: Path) => Path = _.flow([
  extractPathParametersRtd,
]);
