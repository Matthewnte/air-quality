import 'dotenv/config';

const config = {
  port: parseInt(process.env.PORT ?? '8090'),
  opt: process.env.OPT ?? './opt/logs',
  database: {
    url: process.env.DATABASE_URL
  }
};

export default config;
