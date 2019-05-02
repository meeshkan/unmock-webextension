import { PageContent } from "../common/types";
import {
  OpenApiBuilder,
  OpenAPIObject,
  PathsObject,
  OperationObject,
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

const operationBase = (): OperationObject => ({
  responses: {
    200: {
      description: "OK",
    },
  },
});

export const parsePathsFromPage = (pageContent: PageContent): PathsObject => {
  const pattern = /(GET|POST|DELETE|PUT)\s((?:\/[\w.\/-:{}]*)+)/g;
  const paths: PathsObject = {};
  let patternExecResult = pattern.exec(pageContent.textContent);

  while (patternExecResult !== null) {
    const pathName = patternExecResult[2];
    const operationName = patternExecResult[1].toLowerCase();
    _merge(paths, { [pathName]: { [operationName]: operationBase() } });
    patternExecResult = pattern.exec(pageContent.textContent);
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
