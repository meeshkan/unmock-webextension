import { buildSpecFrom } from "./page";
import { PageContent } from "../common/types";

describe("Building spec from page content", () => {
  test("parses paths", async () => {
    const petsPageContent: PageContent = {
      title: "Page title",
      innerHtml: "<html><body>GET /v1/pets PUT /v2/pets</body></html>",
      textContent: "GET /v1/pets PUT /v2/pets",
    };
    const spec = await buildSpecFrom(petsPageContent);
    expect(Object.keys(spec.paths)).toHaveLength(2);
    expect(spec.paths).toHaveProperty("/v1/pets");
    const pathItem = spec.paths["/v1/pets"];
    expect(pathItem).toBeDefined();
    const operationItem = pathItem.get;
    expect(operationItem).toBeDefined();
  });
  test("parses RTD-style paths", async () => {
    const rtdPageContent: PageContent = {
      title: "Page title",
      innerHtml:
        "<html><<body>GET /api/v2/project/(int: id)/ plus some other stuff</body>/html>",
      textContent: "GET /api/v2/project/(int: id)/ plus some other stuff",
    };
    const spec = await buildSpecFrom(rtdPageContent);
    expect(Object.keys(spec.paths)).toHaveLength(1);
    expect(spec.paths).toHaveProperty("/api/v2/project/:id/");
    const pathItem = spec.paths["/api/v2/project/:id/"];
    expect(pathItem).toBeDefined();
    const operationItem = pathItem.get;
    expect(operationItem).toBeDefined();
  });
});
