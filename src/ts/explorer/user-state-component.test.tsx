import * as React from "react";
import UserStateComponent from "./user-state-component";
import { shallow } from "enzyme";
import { mockUserState } from "./__mocks__";

describe("User state component", () => {
  test("renders correctly", () => {
    const wrapper = shallow(<UserStateComponent userState={mockUserState} />);
    expect(wrapper).toMatchSnapshot();
  });
});
