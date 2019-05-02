import { PageContent } from "../common/types";
import * as SwaggerParser from "swagger-parser";
import { OpenApiBuilder, OpenAPIObject } from "openapi3-ts";
import * as yaml from "js-yaml";
import { merge as _merge } from "lodash";

export const getOpenApiBuilder = async (
  obj: object
): Promise<OpenApiBuilder> => {
  const validatedApi = await SwaggerParser.validate(obj as any);
  return OpenApiBuilder.create(validatedApi);
};

export const getOpenApiObject = async (obj: object): Promise<OpenAPIObject> => {
  return (await getOpenApiBuilder(obj)).getSpec();
};

export const getOpenApiObjectFromString = async (str: string) => {
  const parsedObj = yaml.safeLoad(str);
  return getOpenApiObject(parsedObj);
};

const defaultOptions = {
  openapi: "3.0.0",
  info: {
    version: "1",
    title: "API title",
  },
  paths: {},
};

export const parseOpenApiObject = (pageContent: PageContent): OpenAPIObject => {
  const pageOptions = {
    info: {
      title: pageContent.title,
    },
  };
  const options = _merge({}, defaultOptions, pageOptions);
  const openApiBuilder: OpenApiBuilder = OpenApiBuilder.create(options);
  return openApiBuilder.getSpec();
};
