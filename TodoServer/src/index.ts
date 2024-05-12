import "dotenv/config";
import { createExpressServer } from "./loader";
import { logger } from "./loggers";
import { SERVER_PORT } from "./config";
import { db } from "./database/db";

const startServer = async () => {
  try {
    // Check database connection
    await db.connect();
    logger.info("Database connection successful");

    const app = await createExpressServer();
    app.listen(`${SERVER_PORT || 9001}`, () => {
      logger.info("Server Started at port " + `${SERVER_PORT || 9001}`);
    });
  } catch (error) {
    logger.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

startServer();
