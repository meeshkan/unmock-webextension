import { SwaggerEditor } from ".";

export const WrapActionPlugin = () => (system: SwaggerEditor) => {
  return {
    statePlugins: {
      spec: {
        wrapActions: {
          updateSpec: originalAction => str => {
            console.log("Got new API definition string");
            return originalAction(str);
          },
        },
      },
      unmock: {
        actions: {
          clear: () => {
            // Side effect, not very reduxy
            system.specActions.updateSpec("");
            return { type: "CLEAR" };
          },
        },
      },
    },
  };
};
