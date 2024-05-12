import morgan from "morgan";
import path, { join } from "path";
import { LOG_DIR } from "../config";
import fs from "fs";

const logDir: string = join(__dirname, LOG_DIR as string);

const accessDir = path.join(logDir, "access");
if (!fs.existsSync(accessDir)) {
  fs.mkdirSync(accessDir, { recursive: true });
}

export const morganMiddleware = morgan("common", {
  stream: fs.createWriteStream(path.join(accessDir, "access.log"), {
    flags: "a",
  }),
});