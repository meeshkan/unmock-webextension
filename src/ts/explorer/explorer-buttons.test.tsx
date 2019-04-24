import * as React from "react";
import ExplorerButtonsComponent from "./explorer-buttons-component";
import { shallow } from "enzyme";
import { Labeled } from "../state";

jest.mock("./context");

const mockLabeled: Labeled = {
  "https://docs.readthedocs.io/en/stable/api/v2.html": {
    "/api/v2/project/": {
      GET: {},
      PUT: {},
    },
    "/api/v2/user/": {
      POST: {},
    },
  },
  "https://docs.readthedocs.io/en/stable/api/v1.html": {
    "/api/v1/project/": {
      GET: {},
      PUT: {},
    },
    "/api/v1/user/": {},
  },
};

describe("Explorer button", () => {
  test("renders correctly", () => {
    const tree = shallow(<ExplorerButtonsComponent labeled={mockLabeled} />);
    expect(tree).toMatchSnapshot();
  });
});
