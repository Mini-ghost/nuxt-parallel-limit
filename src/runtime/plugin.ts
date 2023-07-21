import pLimit from "p-limit";
import { defineNuxtPlugin } from "#imports";
import { options } from "#parallel-limit-options";

export default defineNuxtPlugin(() => {
  const { patterns } = options;
  if (!patterns.length) return;

  const { $fetch } = globalThis;

  const limitMap = new Map<string, ReturnType<typeof pLimit>>();

  globalThis.$fetch = ((
    ...args: Parameters<typeof $fetch>
  ): ReturnType<typeof $fetch> => {
    const [request] = args;

    const url = request instanceof Request ? request.url : request;

    const pattern = patterns.find(({ pattern }) =>
      new RegExp(pattern).test(url),
    );

    if (!pattern) return $fetch(...args);

    let limit = limitMap.get(pattern.pattern);
    if (!limit) {
      limitMap.set(pattern.pattern, (limit = pLimit(pattern.limit)));
    }

    return limit(() => $fetch(...args));
  }) as typeof $fetch;

  Object.assign(globalThis.$fetch, $fetch);
});
