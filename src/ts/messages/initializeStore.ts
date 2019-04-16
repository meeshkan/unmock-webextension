import { MessageCreator, MessageGeneric } from "./types";

/* Initialization message */
const INITIALIZE = "initialize";

interface InitializeProps {
  url: string;
}

interface Initialize extends MessageGeneric<InitializeProps> {}

const initializeStore: MessageCreator<Initialize, InitializeProps> = {
  build(props: InitializeProps): Initialize {
    return { type: INITIALIZE, props };
  },
  matches(msg: MessageGeneric<any>): msg is Initialize {
    return msg.type === INITIALIZE;
  },
};

export default initializeStore;
