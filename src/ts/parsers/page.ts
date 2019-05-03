import { PageContent } from "../common/types";
import {
  OpenApiBuilder,
  OpenAPIObject,
  PathsObject,
  OperationObject,
  PathItemObject,
  ParameterObject,
} from "openapi3-ts";
import { merge as _merge } from "lodash";
import * as _ from "lodash";
import * as SwaggerParser from "swagger-parser";
import debug from "../common/logging";

const debugLog = debug("unmock:parsers:page");

const specBase = {
  openapi: "3.0.0",
  info: {
    version: "1",
    title: "API title",
  },
  paths: {},
};

const operationBase: OperationObject = {
  responses: {
    200: {
      description: "OK",
    },
  },
};

const pathName = "/api/v2/project/(int: id)/";

interface Path {
  path: string;
  pathParameters: ParameterObject[];
}

class PathProcessor {
  public static of(path: Path) {
    return new PathProcessor(path);
  }
  private path: Path;
  constructor(path: Path) {
    this.path = path;
  }
  public map(f: (path: Path) => Path): PathProcessor {
    return PathProcessor.of(f(path));
  }
  public chain(
    f: (pathProcessor: PathProcessor) => PathProcessor
  ): PathProcessor {
    return f(this);
  }
  public flatten() {
    return this.path;
  }
}

const extractPathParameters = (path: Path): Path => {
  return path;
};

const path: Path = {
  path: pathName,
  pathParameters: [],
};

const processedPath = PathProcessor.of(path).map(extractPathParameters);

/**
 * Pattern for matching expressions like
 * GET /v1/pets
 * PUT /v2/:id
 * DELETE /v1/(int: id)
 */
export const httpCallPattern = /(GET|POST|DELETE|PUT)\s((?:\/(?:[\w:]+|\([\w:\s]+\)|))+)/g;

export const parsePathsObjectFromHttpCallMatch = (
  match: RegExpExecArray
): PathsObject => {
  const pathName = match[2];
  const operationName = match[1].toLowerCase();
  const pathItem: PathItemObject = { [operationName]: operationBase };
  return { [pathName]: pathItem };
};

export const parsePathsFromPage = (pageContent: PageContent): PathsObject => {
  // TODO Revisit the pattern if the greedy quantifiers are a performance hazard
  /*
  const pattern = /(GET|POST|DELETE|PUT)\s((?:\/[\w.\/-:{}\(\)]*)+)/g;*/

  let paths: PathsObject = {};
  let patternExecResult = httpCallPattern.exec(pageContent.textContent);

  while (patternExecResult !== null) {
    const fullMatch: RegExpExecArray = patternExecResult;
    const pathsObject = parsePathsObjectFromHttpCallMatch(fullMatch);
    paths = _merge({}, paths, pathsObject);
    patternExecResult = httpCallPattern.exec(pageContent.textContent);
  }
  debugLog(`Got paths`, paths);
  return paths;
};

export const buildSpecFrom = async (
  pageContent: PageContent
): Promise<OpenAPIObject> => {
  const paths = parsePathsFromPage(pageContent);
  const specFromPage = {
    info: {
      title: pageContent.title,
    },
    paths,
  };
  const options = _merge({}, specBase, specFromPage);
  await SwaggerParser.validate(options as any);
  return OpenApiBuilder.create(options).getSpec();
};
