# An adapter for using [tRPC](https://trpc.io) with [Nitro](https://nitro.unjs.io)

## install
```bash
// npm
npm i trpc-adapter-nitro

// yarn
yarn add trpc-adapter-nitro

// pnpm
pnpm add trpc-adapter-nitro
```

## usage

```typescript
// file: /routes/[...trpc].ts

import { appRouter } from ".";
import { trpcNitro } from "trpc-adapter-nitro";

export default trpcNitro({
  router: appRouter,
  createContext: () => {
    return {};
  },
});
```

Please follow the tRPC and nitro documentation for more insight into how this adapter works. They're amazing tools.
