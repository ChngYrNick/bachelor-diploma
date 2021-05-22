import { GetMemberUseCase } from '../../application/use-cases/member/get-member.use-case';
import { DomainEvents } from '../../shared/event/domain-events.base';
import { Handler } from '../../shared/event/handler.interface';
import { Member } from '../entities/member/member.entity';
import { PostRated } from '../events/post-rated.event';
import { EmailServicePort } from '../ports/email-service.port';

export class PostRatedHandler implements Handler {
  constructor(
    private readonly _emailService: EmailServicePort,
    private readonly _getMemberService: GetMemberUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.handle.bind(this), PostRated.name);
  }

  async handle(event: PostRated): Promise<void> {
    const memberResult = await this._getMemberService.getMember({
      memberId: event.postVote.memberId.toString(),
    });

    const member = memberResult.value as Member;

    this._emailService.sendEmail(
      member.email.value,
      `Member ${member.fullName} rated your post.`,
    );
  }
}
