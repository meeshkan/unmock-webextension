import * as React from "react";
import UserStateComponent from "./user-state-component";
import { shallow } from "enzyme";

const mockUserState = {
  actions: [{ type: "log" }],
  activities: {},
  changed: true,
  context: { path: [] },
  event: { type: "NEXT" },
  events: [],
  history: {
    actions: [{ type: "log" }],
    activities: {},
    context: { path: [] },
    event: { type: "NEXT" },
    events: [],
    historyValue: { current: "addOperation", states: {} },
    meta: {},
    value: "addOperation",
  },
  historyValue: { current: "addPath", states: {} },
  meta: {},
  value: "addPath",
};

describe("User state component", () => {
  test("renders correctly", () => {
    const wrapper = shallow(<UserStateComponent userState={mockUserState} />);
    expect(wrapper).toMatchSnapshot();
  });
});
