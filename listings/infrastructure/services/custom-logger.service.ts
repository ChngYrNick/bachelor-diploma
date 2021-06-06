import { Logger } from '../../domain/ports/logger.port';

export class CustomLogger implements Logger {
  public async log(message: string): Promise<void> {
    const date = new Date();
    console.log(
      `${date.getHours}:${date.getMinutes}:${date.getSeconds} | ${message}`,
    );
  }
}
