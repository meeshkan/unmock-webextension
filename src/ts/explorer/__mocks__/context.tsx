import * as React from "react";
import { Actions } from "../actions";

const actions: Actions = {
  triggerFetchSuccess: jest.fn(),
  triggerSetActiveUrl: jest.fn(),
  triggerInitializeStore: jest.fn(),
  triggerDownload: jest.fn(),
};
export const ExplorerActionsContext = React.createContext({ actions });
