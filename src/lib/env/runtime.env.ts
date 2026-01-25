import { EnvSchema, type Env } from "./schema.env";

export const env: Env = EnvSchema.parse(process.env);
export default env;
