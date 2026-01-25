import { defineConfig } from "drizzle-kit";
import env from "@/lib/env/node.env";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  schemaFilter: ["APP"], // Change this to match your schema name
  verbose: true,
  strict: true,
});
