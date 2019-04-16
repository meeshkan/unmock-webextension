export interface MessageGeneric<Props> {
  type: string;
  props: Props;
}

export type MessageCreator<M extends MessageGeneric<P>, P> = {
  build(props: P): M;
  matches(msg: MessageGeneric<any>): msg is M;
};

export function Builder<M extends MessageGeneric<P>, P>(message: string) {
  return {
    build(props: P): MessageGeneric<P> {
      return { type: message, props };
    },
    matches(msg: MessageGeneric<any>): msg is M {
      return msg.type === message;
    },
  };
}
