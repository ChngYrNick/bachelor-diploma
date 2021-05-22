import { DomainEvents } from '../../shared/event/domain-events.base';
import { Handler } from '../../shared/event/handler.interface';
import { PostCreated } from '../events/post-created.event';
import { Logger } from '../ports/logger.port';

export class PostCreatedHandler implements Handler {
  constructor(private readonly _loggers: Logger[]) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.handle.bind(this), PostCreated.name);
  }

  async handle(event: PostCreated): Promise<void> {
    this._loggers.forEach(async logger => {
      logger.log(
        `[${event.dateTimeOccurred}][${PostCreated.name}] New post created.`,
      );
    });
  }
}
