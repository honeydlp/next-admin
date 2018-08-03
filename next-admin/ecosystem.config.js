module.exports = {
  apps : [{
    name      : 'killer-admin',
    script    : 'server.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    },
    env_test : {
      NODE_TEST: 'test',
      NODE_ENV :'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
//pm2 start ecosystem.config.js --env production
