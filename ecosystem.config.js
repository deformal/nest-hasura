module.exports = {
  apps: [
    {
      name: 'suplyd-server',
      script: 'main.js',
      watch: true,
      instances: '2',
      exec_mode: 'fork',
      cwd: './',
      env_production: {
        NODE_ENV: 'production',
        JWT_TOKEN: 'HQrtlF8S7PyjM97q0ie3e5O2YxJ4trlw7fLOO3cX',
        DATABASE_URL:
          'postgresql://postgres:XDJ2jJ1mp5OKKQw5@postgres:5432/postgres',
      },
      env_development: {
        NODE_ENV: 'development',
        JWT_TOKEN: 'HQrtlF8S7PyjM97q0ie3e5O2YxJ4trlw7fLOO3cX',
        DATABASE_URL:
          'postgresql://postgres:XDJ2jJ1mp5OKKQw5@postgres:5432/postgres',
      },
    },
  ],
};
