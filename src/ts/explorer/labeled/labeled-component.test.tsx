import * as React from "react";
import Labeled from "./labeled-component";
import { shallow } from "enzyme";
import { mockActions, mockUserState, mockLabeled } from "../__mocks__";

const props = {
  actions: mockActions,
  labeled: mockLabeled,
  userState: mockUserState,
};

describe("Labeled", () => {
  test("renders correctly", () => {
    const wrapper = shallow(<Labeled {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
