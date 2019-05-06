import { Path, cleanPathAndExtractParameters } from "./paths";
import { SchemaObject } from "openapi3-ts";

describe("Parsing paths", () => {
  test("works for path with a parameter", () => {
    const pathName = "/api/v2/project/:id/";
    const path: Path = {
      name: pathName,
      pathParameters: [],
    };
    const processedPath: Path = cleanPathAndExtractParameters(path);
    expect(processedPath.name).toBe("/api/v2/project/:id/");
    expect(processedPath.pathParameters).toHaveLength(1);
    const pathParameter = processedPath.pathParameters[0];
    expect(pathParameter.name).toBe("id");
  });
  test("works for RTD-like path", () => {
    const pathName = "/api/v2/project/(int: id)/";
    const path: Path = {
      name: pathName,
      pathParameters: [],
    };
    const processedPath: Path = cleanPathAndExtractParameters(path);
    expect(processedPath.name).toBe("/api/v2/project/:id/");
    expect(processedPath.pathParameters).toHaveLength(1);
    const pathParameter = processedPath.pathParameters[0];
    expect(pathParameter.name).toBe("id");
    const schema = pathParameter.schema as SchemaObject;
    expect(schema).toBeDefined();
    expect(schema.type).toBe("integer");
  });
});
