import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import env from "../env/runtime.env";
import database from "@/db/database";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.users,
      account: schema.accounts,
      session: schema.sessions,
      verification: schema.verifications,
    },
  }),

  baseURL: env.BETTER_AUTH_URL,

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  // Uncomment for multi-subdomain apps (e.g., app.example.com, admin.example.com)
  // advanced: {
  //   crossSubDomainCookies: {
  //     enabled: true,
  //     domain: ".example.com", // Set via env: BASE_DOMAIN
  //   },
  // },
  trustedOrigins: [],

  plugins: [nextCookies()], // make sure this is the last plugin in the array
});
