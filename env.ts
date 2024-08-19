import { config } from 'dotenv';
import path from 'path';
const envPath = path.resolve(process.cwd(), '.env');

const { parsed: localEnv } = config({
  path: envPath,
});

export const env = localEnv;
