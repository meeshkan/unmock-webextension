import * as SwaggerParser from "swagger-parser";
import { OpenApiBuilder, OpenAPIObject } from "openapi3-ts";
import * as yaml from "js-yaml";
import { merge as _merge } from "lodash";

export const buildOpenApiWithValidation = async (
  input: string | object
): Promise<OpenAPIObject> => {
  const obj: object = typeof input === "string" ? yaml.safeLoad(input) : input;
  await SwaggerParser.validate(obj as any);
  return OpenApiBuilder.create(obj as any).getSpec();
};
