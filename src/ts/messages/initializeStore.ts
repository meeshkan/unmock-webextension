import { Builder, MessageGeneric, MessageType } from "./types";

interface InitializeProps {
  url: string;
}

interface Initialize extends MessageGeneric<InitializeProps> {
  type: MessageType.INITIALIZE_STORE;
}

const builder = Builder<Initialize, InitializeProps>(
  MessageType.INITIALIZE_STORE
);

export default builder;
