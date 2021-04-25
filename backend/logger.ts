import winston, { LogEntry } from "winston";

const format = () => {
  const formatMessage = (info: LogEntry) => `${info.level} ${info.message}`;
  const formatError = (info: LogEntry) =>
    `${info.level} ${info.message}\n\n${info.stack}\n`;
  const format = (info: LogEntry) =>
    info.stack ? formatError(info) : formatMessage(info);
  return winston.format.printf(format);
};

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: format(),
    }),
  ],
});
