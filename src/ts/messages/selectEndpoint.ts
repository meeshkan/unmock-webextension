import { Builder, MessageGeneric, MessageType } from "./types";

interface SelectEndpointProps {
  selection: string;
}

interface SelectEndpoint extends MessageGeneric<SelectEndpointProps> {}

const builder = Builder<SelectEndpoint, SelectEndpointProps>(
  MessageType.SELECT_ENDPOINT
);

export default builder;
