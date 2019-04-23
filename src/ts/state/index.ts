import { State, Active, Labeled, Phase, Paths, Path } from "./types";

const defaultActive = {
  activePath: [],
  phase: Phase.ADD_PATH,
};

const defaultLabeled = {};

const defaultState = {
  active: defaultActive,
  labeled: defaultLabeled,
};

export {
  defaultActive,
  defaultLabeled,
  defaultState,
  State,
  Active,
  Labeled,
  Phase,
  Paths,
  Path,
};
