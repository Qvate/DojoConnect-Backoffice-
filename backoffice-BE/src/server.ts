import * as dbService from "./services/db.service";
import app from "./app";
import AppConfig, { appConfigSchema } from "./config/AppConfig";
import { NodeEnv } from "./constants/enums";
import { runMigrations } from "./db/run-migrations";

/* ------------------ START ------------------ */
(async () => {
  try {
    const result = appConfigSchema.safeParse(AppConfig);
    if (!result.success) {
      throw new Error(`Server Error: Invalid AppConfig. Err: ${result.error}`);
    }

    if (AppConfig.NODE_ENV === NodeEnv.Production) {
      await runMigrations();
    }

    await dbService.initMobileApiDB(); // ✅ ensure DB is ready before listen
    const PORT = AppConfig.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (e) {
    console.error("DB init failed:", e);
    process.exit(1);
  }
})();
