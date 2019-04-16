import { Builder, MessageGeneric } from "./types";

const SELECT_ENDPOINT = "Select endpoint";

interface SelectEndpointProps {
  selection: string;
}

interface SelectEndpoint extends MessageGeneric<SelectEndpointProps> {}

const builder = Builder<SelectEndpoint, SelectEndpointProps>(SELECT_ENDPOINT);

export default builder;
