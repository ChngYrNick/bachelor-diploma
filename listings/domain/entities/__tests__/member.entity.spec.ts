import { Email } from '../member/email.value';
import { FirstName } from '../member/first-name.value';
import { LastName } from '../member/last-name.value';
import { Member } from '../member/member.entity';
import { UserName } from '../member/username.value';

describe('MemberEntity', () => {
  it('should create Member entity', () => {
    const memberResult = Member.create({
      username: UserName.create('Mosk6565').value as UserName,
      firstName: FirstName.create('Serhii').value as FirstName,
      lastName: LastName.create('Moskovko').value as LastName,
      email: Email.create('serhii@moskovko.xyz').value as Email,
    });

    expect(memberResult.isSuccess).toEqual(true);

    if (memberResult.isSuccess) {
      const member = memberResult.value as Member;

      expect(member.domainEvents.length).toEqual(1);
    }
  });
});
