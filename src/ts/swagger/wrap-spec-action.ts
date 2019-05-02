import { SwaggerEditor } from ".";
import { getOpenApiObjectFromString } from "../parsers";

const handleUpdateSpec = async (str: string) => {
  // TODO
  await getOpenApiObjectFromString(str);
};

export const WrapActionPlugin = () => (system: SwaggerEditor) => {
  return {
    statePlugins: {
      spec: {
        wrapActions: {
          updateSpec: originalAction => async str => {
            try {
              await handleUpdateSpec(str);
            } catch (err) {
              console.error("Failed updating spec", err);
            }
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
          updateSpec: async (str: string) => {
            try {
              await handleUpdateSpec(str);
            } catch (err) {
              console.error("Failed updating spec", err);
            }
          },
          setSpec: (str: string) => {
            system.specActions.updateSpec(str);
            // Need to return Redux action from here, not used
            return { type: "SET_SPEC", payload: str };
          },
        },
      },
    },
  };
};
