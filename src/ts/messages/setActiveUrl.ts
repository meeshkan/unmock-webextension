import { Builder, MessageGeneric, MessageType } from "./types";

interface SetActiveUrlProps {
  url: string;
}

export interface SetActiveUrl extends MessageGeneric<SetActiveUrlProps> {
  type: MessageType.SET_ACTIVE_URL;
}

const builder = Builder<SetActiveUrl, SetActiveUrlProps>(
  MessageType.SET_ACTIVE_URL
);

export default builder;
