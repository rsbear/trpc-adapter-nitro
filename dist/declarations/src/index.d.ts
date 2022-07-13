import type { AnyRouter, ProcedureType, ResponseMeta, TRPCError, inferRouterContext, inferRouterError } from "@trpc/server";
import type { CompatibilityEvent } from "h3";
import type { TRPCResponse } from "@trpc/server/dist/declarations/src/rpc";
declare type MaybePromise<T> = T | Promise<T>;
export declare type CreateContextFn<TRouter extends AnyRouter> = (event: CompatibilityEvent) => MaybePromise<inferRouterContext<TRouter>>;
export interface ResponseMetaFnPayload<TRouter extends AnyRouter> {
    data: TRPCResponse<unknown, inferRouterError<TRouter>>[];
    ctx?: inferRouterContext<TRouter>;
    paths?: string[];
    type: ProcedureType | "unknown";
    errors: TRPCError[];
}
export declare type ResponseMetaFn<TRouter extends AnyRouter> = (opts: ResponseMetaFnPayload<TRouter>) => ResponseMeta;
export interface OnErrorPayload<TRouter extends AnyRouter> {
    error: TRPCError;
    type: ProcedureType | "unknown";
    path: string | undefined;
    req: CompatibilityEvent["req"];
    input: unknown;
    ctx: undefined | inferRouterContext<TRouter>;
}
export declare type OnErrorFn<TRouter extends AnyRouter> = (opts: OnErrorPayload<TRouter>) => void;
export declare function trpcNitro<Router extends AnyRouter>({ router, createContext, responseMeta, onError, }: {
    router: Router;
    createContext?: CreateContextFn<Router>;
    responseMeta?: ResponseMetaFn<Router>;
    onError?: OnErrorFn<Router>;
}): import("h3").EventHandler<string>;
export {};
