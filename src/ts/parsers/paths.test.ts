import { Path, extractPathParametersFull } from "./paths";

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
    const processedPath: Path = extractPathParametersFull(path);
    expect(processedPath.name).toBe("/api/v2/project/:id/");
  });
});
