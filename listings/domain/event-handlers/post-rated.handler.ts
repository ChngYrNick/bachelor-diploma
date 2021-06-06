export class PostRatedHandler implements Handler {
  constructor(
    private readonly _emailService: EmailServicePort,
    private readonly _memberRepo: MemberRepoPort,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.handle.bind(this) as (event: DomainEvent) => Promise<void>,
      PostRated.name,
    );
  }

  async handle(event: PostRated): Promise<void> {
    const member: Member = await this._memberRepo.getMemberById(
      event.postVote.memberId,
    );

    this._emailService.sendEmail(
      member.email.value,
      `Member ${member.fullName} rated your post.`,
    );
  }
}
