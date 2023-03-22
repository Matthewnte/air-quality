import 'dotenv/config';

const config = {
  port: parseInt(process.env.PORT ?? '8090'),
};

export default config;
