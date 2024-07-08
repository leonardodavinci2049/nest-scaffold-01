import 'dotenv/config';

import * as joi from 'joi';
// zod
// env_-schema não usar por enquanto altera o tsconfig
interface EnvVars {
  APP_API_URL: string;
  APP_SWAGGER_URL: string;

  APP_JWT_SECRET: string;
  APP_PORT: number;
  APP_HOST_API: string;
  DATABASE_URL: string;
  MYSQL_HOST: string;
  MYSQL_ROOT: string;
  MYSQL_ROOT_PASSWORD: string;
  MYSQL_DATABASE: string;
}

const envsSchema = joi
  .object({
    APP_API_URL: joi.string().required(),
    APP_SWAGGER_URL: joi.string().required(),

    APP_JWT_SECRET: joi.string().required(),
    APP_PORT: joi.number().positive().required(),
    APP_HOST_API: joi.string().required(),
    DATABASE_URL: joi.string().required(),
    MYSQL_HOST: joi.string().required(),
    MYSQL_ROOT: joi.string().required(),
    MYSQL_ROOT_PASSWORD: joi.string().required(),
    MYSQL_DATABASE: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`❌ Invalid environment variables:  ${error.message}`);
}
const envVars: EnvVars = value;

export const envs = {
  APP_API_URL: envVars.APP_API_URL,
  APP_SWAGGER_URL: envVars.APP_SWAGGER_URL,

  APP_JWT_SECRET: envVars.APP_JWT_SECRET,
  APP_PORT: envVars.APP_PORT,
  APP_HOST_API: envVars.APP_HOST_API,
  DATABASE_URL: envVars.DATABASE_URL,
  DB_MYSQL_HOST: envVars.MYSQL_HOST,
  DB_MYSQL_ROOT: envVars.MYSQL_ROOT,
  DB_MYSQL_ROOT_PASSWORD: envVars.MYSQL_ROOT_PASSWORD,
  DB_MYSQL_DATABASE: envVars.MYSQL_DATABASE,
};
