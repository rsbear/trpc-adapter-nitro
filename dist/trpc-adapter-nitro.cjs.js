'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./trpc-adapter-nitro.cjs.prod.js");
} else {
  module.exports = require("./trpc-adapter-nitro.cjs.dev.js");
}
