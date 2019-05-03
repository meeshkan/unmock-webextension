import {
  Path,
  PathProcessor,
  extractPathParameters,
  extractPathParametersFull2,
} from "./paths";

describe("Parsing paths", () => {
  test("works for simple path", () => {
    const pathName = "/api/v2/project/(int: id)/";
    const path: Path = {
      name: pathName,
      pathParameters: [],
    };
    /*
    const processedPath: Path = PathProcessor.of(path).map(
      extractPathParameters
    ).value;
    */
    const processedPath: Path = extractPathParametersFull2(path);
    expect(processedPath.name).toBe("/api/v2/project/(int: id)/");
  });
});
