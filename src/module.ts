import { addPlugin, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit';
import { resolve } from 'pathe';

export interface ParallelLimitPattern {
  pattern: string;
  limit: number;
}

export interface ModuleOptions {
  patterns: ParallelLimitPattern[];
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    configKey: 'parallelLimit',
  },
  async setup(options, nuxt) {
    if (!options || !Array.isArray(options.patterns)) return;

    const resolver = createResolver(import.meta.url);

    // Inject options via virtual template
    nuxt.options.alias['#parallel-limit-options'] = addTemplate({
      filename: 'parallel-limit-options.mjs',
      getContents: () => `export const options = ${JSON.stringify(options)};`,
    }).dst;

    const runtimeDir = await resolver.resolve('./runtime');
    nuxt.options.build.transpile.push(runtimeDir);

    // Add plugins
    for (const template of ['plugin']) {
      addPlugin(resolve(runtimeDir, template));
    }
  },
});
