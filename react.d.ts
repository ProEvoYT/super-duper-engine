declare module "react" {
  export type ReactNode = any;

  export type SetStateAction<S> = S | ((prevState: S) => S);
  export type Dispatch<A> = (value: A) => void;

  export function useState<T = any>(
    initialState: T
  ): [T, Dispatch<SetStateAction<T>>];

  export function useEffect(
    effect: () => void | (() => void),
    deps?: any[]
  ): void;

  const React: any;
  export default React;
}

declare const process: {
  env: Record<string, string | undefined>;
};


