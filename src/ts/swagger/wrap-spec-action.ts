export const MyWrapActionPlugin = system => {
  return {
    statePlugins: {
      spec: {
        wrapActions: {
          updateSpec: (oriAction, system) => str => {
            console.log("Changed API definition", str);
            return oriAction(str);
          },
        },
      },
    },
  };
};
