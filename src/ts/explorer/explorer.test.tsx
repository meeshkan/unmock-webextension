import * as React from "react";
import Explorer from "./explorer";
import { mockActions, mockExplorerState } from "./__mocks__";
import { shallow } from "enzyme";

const props = {
  state: mockExplorerState,
  actions: mockActions,
};

describe("Explorer", () => {
  test("renders correctly", () => {
    const wrapper = shallow(<Explorer {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
