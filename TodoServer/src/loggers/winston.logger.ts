import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import { LOG_DIR } from "../config";

/* -------------------------------- Logs dir -------------------------------- */
const logDir: string = join(__dirname, LOG_DIR as string);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

/* ------------------------------- Log Format ------------------------------- */
const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

/* -------------------------------- Log Level ------------------------------- */

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const logColors = {
  error: "bold red",
  warn: "bold yellow",
  info: "bold blue",
  http: "bold green",
  verbose: "bold magenta",
  debug: "bold cyan",
  silly: "bold white",
};

const logSymbols: any = {
  error: "❌",
  warn: "⚠️",
  info: "📌",
  http: "🌐",
  verbose: "🔍",
  debug: "🐞",
  silly: "🤪",
};

export const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    new winstonDaily({
      level: "debug",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/debug",
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error",
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true, colors: logColors }),
      winston.format.splat(),
      winston.format.simple(),
      winston.format.printf(({ timestamp, level, message }) => {
        let symbol;

        // Check if logSymbols is populated
        if (Object.keys(logSymbols).length === 0) {
          console.log("logSymbols is empty. Exiting loop.");
        } else {
          // Regular expression to remove ANSI escape codes
          const stripAnsi = (str: string): string =>
            str.replace(/\u001b\[[0-9]{1,2}m/g, "");

          // Remove ANSI escape codes from level
          level = stripAnsi(level);

          for (const [key, value] of Object.entries(logSymbols)) {
            if (key === level) {
              symbol = value || "No Symbol";
              break;
            }
          }
        }

        return `${timestamp} ${symbol} ${level}: ${message}`;
      })
    ),
  })
);

export const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  },
};