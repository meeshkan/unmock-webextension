import * as React from "react";
import ExplorerButtonsComponent from "./explorer-buttons-component";
import { shallow } from "enzyme";
import { mockLabeled } from "./__mocks__";

const mockActions = {
  triggerFetchSuccess: jest.fn(),
  triggerSetActiveUrl: jest.fn(),
  triggerInitializeStore: jest.fn(),
  triggerDownload: jest.fn(),
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
