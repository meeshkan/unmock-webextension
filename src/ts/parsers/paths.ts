import {
  OpenApiBuilder,
  OpenAPIObject,
  PathsObject,
  OperationObject,
  PathItemObject,
  ParameterObject,
} from "openapi3-ts";
import * as _ from "lodash";

export interface Path {
  name: string;
  pathParameters: ParameterObject[];
}

export const extractPathParametersRtd = (path: Path): Path => {
  const pathSplit = path.name.split("/");
  const params: ParameterObject[] = [];
  const cleanedPathSplit = pathSplit.map(value => {
    const rtdPathPattern = /^\((\w+):\s?(\w+)\)$/;
    const match = value.match(rtdPathPattern);
    if (match) {
      // const parameterType = match[0];
      const parameterName = match[2];
      // Urgh, ugly side-effect in map
      const parameterObject: ParameterObject = {
        name: parameterName,
        in: "path",
        required: true,
        schema: {}, // TODO
      };
      params.push(parameterObject);
      return `:${parameterName}`;
    }
    return value;
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
