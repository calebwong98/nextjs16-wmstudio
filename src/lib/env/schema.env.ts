import { z } from "zod";

export const EnvSchema = z.object({
  // 🗄️ Database
  POSTGRES_URL: z.string().url(),

  // 🌍 Runtime
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // 🌐 Domain / Routing (optional - for subdomain routing)
  USE_SUBDOMAIN_ROUTING: z.coerce.boolean().default(false),
  BASE_DOMAIN: z.string().optional(),

  // 🔐 Better Auth
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(),

  // 🔑 OAuth - Google
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

export type Env = z.infer<typeof EnvSchema>;
