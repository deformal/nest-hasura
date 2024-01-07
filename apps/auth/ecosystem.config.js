module.exports = {
  apps: [
    {
      name: 'suplyd-server',
      script: 'main.js',
      instances: '2',
      exec_mode: 'fork',
      out_file: './out.log',
      error_file: './error.log',
      log_type: 'json',
      cwd: './',
      env_production: {
        watch: false,
        exec_mode: 'cluster_mode',
        NODE_ENV: 'production',
        JWT_TOKEN: 'HQrtlF8S7PyjM97q0ie3e5O2YxJ4trlw7fLOO3cX',
        DATABASE_URL:
          'postgresql://postgres:XDJ2jJ1mp5OKKQw5@postgres:5432/postgres',
      },
      env_development: {
        watch: false,
        exec_mode: 'cluster_mode',
        NODE_ENV: 'development',
        JWT_TOKEN: 'HQrtlF8S7PyjM97q0ie3e5O2YxJ4trlw7fLOO3cX',
        DATABASE_URL:
          'postgresql://postgres:XDJ2jJ1mp5OKKQw5@postgres:5432/postgres',
      },
    },
  ],
};
