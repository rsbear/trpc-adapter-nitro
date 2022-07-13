'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var server = require('@trpc/server');
var ufo = require('ufo');
var h3 = require('h3');

function trpcNitro({
  router,
  createContext,
  responseMeta,
  onError
}) {
  return h3.defineEventHandler(async event => {
    const {
      req,
      res
    } = event; // console.log('req', req)

    const $url = ufo.createURL(req.url);

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
    const httpResponse = await server.resolveHTTPResponse({
      router,
      req: {
        method: req.method,
        headers: req.headers,
        body: h3.isMethod(event, "GET") ? null : await h3.useBody(event),
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

exports.trpcNitro = trpcNitro;
