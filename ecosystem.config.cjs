module.exports = {
  apps: [
    {
      name: 't08lega-web',
      exec_mode: 'fork',
      instances: '1',
      port: 3008,
      script: 'yarn start',
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
