module.exports = {
  apps: [
    {
      name: 'bingo',
      script: './src/index.js',
      instance_var: 'INSTANCE_ID',
      instances: 4,
      exec_mode: 'cluster',
      watch: true,
      env: {
        NODE_ENV: 'development',
        PORT: 3030
      }
    }
  ]
}
