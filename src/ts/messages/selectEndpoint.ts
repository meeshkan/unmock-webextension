import { Builder, MessageGeneric, MessageType } from "./types";

interface SelectEndpointProps {
  selection: string;
}

export interface SelectEndpoint extends MessageGeneric<SelectEndpointProps> {
  type: MessageType.SELECT_ENDPOINT;
}

const builder = Builder<SelectEndpoint, SelectEndpointProps>(
  MessageType.SELECT_ENDPOINT
);

export default builder;
