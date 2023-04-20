import { LoggerService } from '@nestjs/common';
import {logger} from '@mmh/common'

export default class LoggerModification implements LoggerService {

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    logger.info(message);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    logger.error(message);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    logger.warning(message);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    logger.debug(message);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    logger.verbose(message);
  }

}
