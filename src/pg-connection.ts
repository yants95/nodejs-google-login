import { env } from "@/config/env";

import { DataSource } from "typeorm";

export const db = new DataSource({
  type: "postgres",
  url: env.url,
  migrations: [`./src/db/migrations/*.{js,ts}`],
  entities: [`./src/db/*.{js,ts}`],
  synchronize: false,
});
