export const MyWrapActionPlugin = system => {
  return {
    statePlugins: {
      spec: {
        wrapActions: {
          updateSpec: (oriAction, system) => str => {
            console.log("Got new API definition string");
            return oriAction(str);
          },
        },
      },
      unmock: {
        actions: {
          clear: () => {
            const contentString = system.specSelectors.specStr();
            const allErrors = system.errSelectors.allErrors();
            const contentObject = system.specSelectors.specJson().toJS();
            const isValid = allErrors.size === 0;
            const errors = allErrors.toJS();
            console.log(`Errors:`, allErrors);
            system.specActions.updateSpec(`hello: ʕ ͡° ͜ʖ ͡°ʔ\n${contentString}`);
            return { type: "CLEAR" };
          },
        },
        /*
        reducers: {
          CLEAR: (state, action) => {
            // you're only working with the state under the namespace, in this case "example".
            // So you can do what you want, without worrying about /other/ namespaces
            return state.set("clear", action.payload);
          },
        },
        */
        rootInjects: {
          clear: () => system.specActions.updateSpec(""),
        },
      },
    },
  };
};
