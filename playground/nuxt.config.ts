export default defineNuxtConfig({
  modules: ['nuxt-parallel-limit'],
  parallelLimit: {
    patterns: [
      {
        pattern: 'https://jsonplaceholder.typicode.com',
        limit: 2
      }
    ]
  }
})
