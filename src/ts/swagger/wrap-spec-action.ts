import { SwaggerEditor } from ".";

export const MyWrapActionPlugin = (system: SwaggerEditor) => {
  return {
    statePlugins: {
      spec: {
        wrapActions: {
          updateSpec: oriAction => str => {
            console.log("Got new API definition string");
            return oriAction(str);
          },
        },
      },
      unmock: {
        actions: {
          clear: () => {
            const contentString = system.specSelectors.specStr();
            /*
            const allErrors = system.errSelectors.allErrors();
            const contentObject = system.specSelectors.specJson().toJS();
            const isValid = allErrors.size === 0;
            const errors = allErrors.toJS();
            console.log(`Errors:`, allErrors);
            */
            system.specActions.updateSpec(`hello: ʕ ͡° ͜ʖ ͡°ʔ\n${contentString}`);
            return { type: "CLEAR" };
          },
        },
        rootInjects: {
          clear: () => system.specActions.updateSpec(""),
        },
      },
    },
  };
};
