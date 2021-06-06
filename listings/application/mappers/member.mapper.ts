export class MemberMapper implements Mapper<MemberDTO, Member> {
  public toDomain(dto: MemberDTO): Member {
    return Member.create({
      memberId: UniqueID.create(dto.id.toString()),
      username: UserName.create(dto.username).value as UserName,
      firstName: FirstName.create(dto.firstName).value as FirstName,
      lastName: LastName.create(dto.lastName).value as LastName,
      email: Email.create(dto.email).value as Email,
    }).value as Member;
  }

  public toPersistence(domain: Member): MemberDTO {
    return {
      id: parseInt(domain.id.value, 10),
      username: domain.username.value,
      firstName: domain.firstName.value,
      lastName: domain.lastName.value,
      email: domain.email.value,
    };
  }
}
