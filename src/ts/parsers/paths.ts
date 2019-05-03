import {
  OpenApiBuilder,
  OpenAPIObject,
  PathsObject,
  OperationObject,
  PathItemObject,
  ParameterObject,
} from "openapi3-ts";

export interface Path {
  name: string;
  pathParameters: ParameterObject[];
}

export class Monad<A> {
  public static of<B>(a: B): Monad<B> {
    return new Monad(a);
  }
  public static identity<B>(): (monad: Monad<B>) => Monad<B> {
    return monad => monad;
  }
  private value_: A;
  constructor(value: A) {
    this.value_ = value;
  }
  public map(f: (value: A) => A): Monad<A> {
    return Monad.of(f(this.value_));
  }
  public chain(f: (monad: Monad<A>) => Monad<A>): Monad<A> {
    return f(this);
  }
  public get value(): A {
    return this.value_;
  }
}

export class PathProcessor extends Monad<Path> {
  public static updatePathName(path: Path, name: string): Path {
    return {
      ...path,
      name,
    };
  }
  public static addPathParameter(
    path: Path,
    pathParameter: ParameterObject
  ): Path {
    return {
      pathParameters: path.pathParameters.concat(pathParameter),
      ...path,
    };
  }
  constructor(path: Path) {
    super(path);
  }
}

export const extractPathParameters = (path: Path): Path => {
  return PathProcessor.updatePathName(path, "/v1/pets");
};
