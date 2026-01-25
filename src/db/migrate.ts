import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import config from "../../drizzle.config";
import database from "./database";

async function main() {
  try {
    console.log("⏳ Running migrations...");

    await migrate(database, {
      migrationsFolder: config.out!,
    });

    console.log("✅ Migrations completed");
  } catch (err) {
    console.error("❌ Migration failed", err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();
