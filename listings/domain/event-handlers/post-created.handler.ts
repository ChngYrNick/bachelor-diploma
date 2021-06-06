export class PostCreatedHandler implements Handler {
  constructor(private readonly _loggers: Logger[]) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.handle.bind(this) as (event: DomainEvent) => Promise<void>,
      PostCreated.name,
    );
  }

  async handle(event: PostCreated): Promise<void> {
    this._loggers.forEach(async logger => {
      logger.log(
        `[${event.dateTimeOccurred}][${PostCreated.name}] New post created.`,
      );
    });
  }
}
