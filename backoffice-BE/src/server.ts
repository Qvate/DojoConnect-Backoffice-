import * as dbService from "./services/db.service";
import app from "./app";

const PORT = process.env.PORT || 5000;

/* ------------------ START ------------------ */
(async () => {
  try {
    await dbService.initBackOfficeDB(); // ✅ ensure DB is ready before listen
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (e) {
    console.error("DB init failed:", e);
    process.exit(1);
  }
})();
