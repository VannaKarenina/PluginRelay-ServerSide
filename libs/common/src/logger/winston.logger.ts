import {format,transports, createLogger} from "winston";

const customLog = format.printf(info => `[${info['timestamp']}] ${info.level}: ${info.message}`);

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format(info => {
      info.level = info.level.toUpperCase()
      return info;
    })(),
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
    format.colorize(),
    customLog
  ),
  transports: [new transports.Console()],
})

