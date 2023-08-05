import pLimit from 'p-limit';

import { defineNuxtPlugin } from '#imports';
import { options } from '#parallel-limit-options';

import type { $Fetch, NitroFetchRequest } from 'nitropack';

const limitMap = new Map<string, ReturnType<typeof pLimit>>();

export default defineNuxtPlugin(() => {
  const $fetch = globalThis.$fetch as $Fetch<unknown, NitroFetchRequest> & {
    _limit?: boolean;
  };
  if (process.server && $fetch._limit) return;

  const { patterns } = options;
  if (!patterns.length) return;

  globalThis.$fetch = ((...args: Parameters<typeof $fetch>): ReturnType<typeof $fetch> => {
    const [request] = args;

    const url = request instanceof Request ? request.url : request;

    const pattern = patterns.find(({ pattern }) => new RegExp(pattern).test(url));

    if (!pattern) return $fetch(...args);

    let limit = limitMap.get(pattern.pattern);
    if (!limit) {
      limitMap.set(pattern.pattern, (limit = pLimit(pattern.limit)));
    }

    return limit(() =>
      $fetch(...args).finally(() => {
        if (limit?.pendingCount === 0) limitMap.delete(pattern.pattern);
      })
    );
  }) as typeof $fetch;

  if (process.server) {
    $fetch._limit = true;
  }

  Object.assign(globalThis.$fetch, $fetch);
});
