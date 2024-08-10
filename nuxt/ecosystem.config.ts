export default {
  apps: [
    {
      name: 'nuxtgpt',
      port: '4000',
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs'
    }
  ]
}