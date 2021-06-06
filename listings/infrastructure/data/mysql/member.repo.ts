interface MemberData extends MemberDTO, RowDataPacket {}

export class MemberRepo implements MemberRepoPort {
  constructor(private readonly _connection: Connection) {}

  public async getAllMembers(): Promise<Member[]> {
    const [rows]: [
      Array<MemberData>,
      Array<FieldPacket>,
    ] = await this._connection.promise().execute('SELECT * FROM `Members`', []);

    return rows.map(new MemberMapper().toDomain);
  }

  public async getMemberById(id: UniqueID): Promise<Member> {
    const [rows]: [
      Array<MemberData>,
      Array<FieldPacket>,
    ] = await this._connection
      .promise()
      .execute('SELECT * FROM `Members` WHERE `id` = ?', [id.toString()]);

    if (rows.length === 0) {
      throw new NotFoundError('Member');
    }

    return rows.map(new MemberMapper().toDomain)[0];
  }

  public async deleteMember(id: UniqueID): Promise<void> {
    this._connection
      .promise()
      .execute('DELETE FROM `Members` WHERE `id` = ?', [id.toString()]);
  }

  public async exists(id: UniqueID): Promise<boolean> {
    try {
      await this.getMemberById(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return false;
      }
      throw error;
    }

    return true;
  }

  public async saveMember(member: Member): Promise<void> {
    const exists = await this.exists(member.id);

    if (exists) {
      await this._connection
        .promise()
        .execute(
          'UPDATE `Members` SET username = ?, firstName = ?, lastName = ?, email = ? WHERE id = ?',
          [
            member.username.value,
            member.firstName.value,
            member.lastName.value,
            member.email.value,
            member.id.toString(),
          ],
        );

      DomainEvents.dispatchEventsForAggregate(member.id);

      return;
    }

    await this._connection
      .promise()
      .execute(
        'INSERT INTO `Members` (username,firstNmae,lastName,email) VALUES (?,?,?,?)',
        [
          member.username.value,
          member.firstName.value,
          member.lastName.value,
          member.email.value,
        ],
      );

    DomainEvents.dispatchEventsForAggregate(member.id);
  }
}
