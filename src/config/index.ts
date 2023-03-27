import 'dotenv/config';

const config = {
  port: parseInt(process.env.PORT ?? '8090'),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  opt: process.env.OPT ?? './opt/logs',
  database: {
    url: process.env.NODE_ENV !== 'test' ? process.env.DB_URL : process.env.TEST_DB_URL
  },
  iqair: {
    baseUrl: process.env.IQAIR_BASEURL ?? '',
    apiKey: process.env.IQAIR_API_KEY ?? ''
  }
};

export default config;
