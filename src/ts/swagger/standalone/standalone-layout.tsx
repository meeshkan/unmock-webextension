import * as React from "react";
// import PropTypes from "prop-types";

export default class StandaloneLayout extends React.Component {
  /*
  static propTypes = {
    specActions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
  };
  */

  public render() {
    // @ts-ignore
    const { getComponent } = this.props;
    const EditorLayout = getComponent("EditorLayout", true);

    return (
      <div>
        <EditorLayout />
      </div>
    );
  }
}
