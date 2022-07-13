import { resolveHTTPResponse } from '@trpc/server';
import { createURL } from 'ufo';
import { defineEventHandler, isMethod, useBody } from 'h3';

function trpcNitro({
  router,
  createContext,
  responseMeta,
  onError
}) {
  return defineEventHandler(async event => {
    const {
      req,
      res
    } = event; // console.log('req', req)

    const $url = createURL(req.url);

    function getPath() {
      if (typeof event.context.params.trpc === "string") {
        return event.context.params.trpc;
      }

      if (Array.isArray(event.context.params.trpc)) {
        return event.context.params.trpc.join("/");
      }

      return null;
    }

    const path = getPath();
    const httpResponse = await resolveHTTPResponse({
      router,
      req: {
        method: req.method,
        headers: req.headers,
        body: isMethod(event, "GET") ? null : await useBody(event),
        query: $url.searchParams
      },
      path,
      createContext: async () => createContext?.(event),
      responseMeta,
      onError: o => {
        onError?.({ ...o,
          req
        });
      }
    });
    const {
      status,
      headers,
      body
    } = httpResponse;
    res.statusCode = status;
    headers && Object.keys(headers).forEach(key => {
      res.setHeader(key, headers[key]);
    });
    return body;
  });
}

export { trpcNitro };
