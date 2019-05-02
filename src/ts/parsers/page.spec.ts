import { buildSpecFrom } from "./page";
import { PageContent } from "../common/types";

const pageContent: PageContent = {
  title: "Page title",
  innerHtml: "<html></html><body>GET /v1/pets</body>",
  textContent: "GET /v1/pets",
};

describe("Building spec from page content", () => {
  test("parses paths", async () => {
    const spec = await buildSpecFrom(pageContent);
    expect(Object.keys(spec.paths)).toHaveLength(1);
  });
});
