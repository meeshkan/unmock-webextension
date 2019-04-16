export interface MessageGeneric<Props> {
  type: string;
  props: Props;
}

export type MessageCreator<M extends MessageGeneric<P>, P> = {
  build(props: P): M;
  matches(msg: MessageGeneric<any>): msg is M;
};
