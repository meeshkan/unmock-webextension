import * as React from "react";
import ExplorerButtonsComponent from "./explorer-buttons-component";
import { shallow } from "enzyme";
import { Labeled } from "../state";

const mockActions = {
  triggerFetchSuccess: jest.fn(),
  triggerSetActiveUrl: jest.fn(),
  triggerInitializeStore: jest.fn(),
  triggerDownload: jest.fn(),
};

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

const props = {
  labeled: mockLabeled,
  actions: mockActions,
};

describe("Explorer button", () => {
  test("renders correctly", () => {
    const wrapper = shallow(<ExplorerButtonsComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  test("applies export action when clicked", () => {
    const wrapper = shallow(<ExplorerButtonsComponent {...props} />);
    const button = wrapper.find("#export");
    expect(button).toHaveLength(1);
    button.simulate("click");
    expect(props.actions.triggerDownload).toHaveBeenCalledWith(mockLabeled);
  });
  test("applies clear action when clicked", () => {
    const wrapper = shallow(<ExplorerButtonsComponent {...props} />);
    const button = wrapper.find("#initialize");
    expect(button).toHaveLength(1);
    button.simulate("click");
    expect(props.actions.triggerInitializeStore).toHaveBeenCalledTimes(1);
  });
});
