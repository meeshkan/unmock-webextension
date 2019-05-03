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

export const extractPathParametersSimple = (path: Path): Path => {
  const pathSplit = path.name.split("/");
  // const params: ParameterObject[] = [];
  const cleanedPathSplit = pathSplit.map(value => {
    const rtdPathPattern = /^\((\w+):\s(\w+)\)$/;
    const match = value.match(rtdPathPattern);
    if (match) {
      // const parameterType = match[0];
      const parameterName = match[2];
      return `:${parameterName}`;
    }
    return value;
  });
  return { ...path, name: cleanedPathSplit.join("/") };
};

export const extractPathParametersRtd = (path: Path): Path => {
  return { ...path, name: "/v2/pets" };
};

export const extractPathParametersFull: (path: Path) => Path = _.flow([
  extractPathParametersSimple,
]);
