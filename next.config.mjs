import path from 'path';
import { config } from 'dotenv';

const { parsed: localEnv } = config({
  allowEmptyValues: false,
  path: path.resolve(process.cwd(), '.env.local'),
});

const nextConfig = {
  env: localEnv,
};

export default nextConfig;