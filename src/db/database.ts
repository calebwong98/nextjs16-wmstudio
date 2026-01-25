import * as schema from "./schema";
import { isProd } from "@/lib/env/_isProd";
import env from "@/lib/env/runtime.env";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

declare global {
  // eslint-disable-next-line no-var
  var database: PostgresJsDatabase<typeof schema> | undefined;
}

const client = postgres(env.POSTGRES_URL, {
  max: 1, // important for serverless
  idle_timeout: 20,
  connect_timeout: 10,
});

let database: PostgresJsDatabase<typeof schema>;

if (isProd()) {
  database = drizzle(client, { schema });
} else {
  if (!global.database) {
    global.database = drizzle(client, { schema });
  }
  database = global.database;
}

export default database;
