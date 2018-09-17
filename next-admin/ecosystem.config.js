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
      host : '106.12.2.185',
      ref  : 'origin/master',
      repo : 'git@github.com:honeydlp/next-admin.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
//pm2 start ecosystem.config.js --env production
