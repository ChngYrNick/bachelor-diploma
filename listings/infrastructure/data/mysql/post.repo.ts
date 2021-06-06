interface PostData extends PostDTO, RowDataPacket {}

export class PostRepo implements PostRepoPort {
  constructor(private readonly _connection: Connection) {}

  public async getAllPosts(): Promise<Post[]> {
    const [rows]: [
      Array<PostData>,
      Array<FieldPacket>,
    ] = await this._connection.promise().execute('SELECT * FROM `Posts`', []);

    return rows.map(new PostMapper().toDomain);
  }

  public async getPostById(id: UniqueID): Promise<Post> {
    const [rows]: [
      Array<PostData>,
      Array<FieldPacket>,
    ] = await this._connection
      .promise()
      .execute('SELECT * FROM `Posts` WHERE `id` = ?', [id.toString()]);

    if (rows.length === 0) {
      throw new NotFoundError('Post');
    }

    return rows.map(new PostMapper().toDomain)[0];
  }

  public async deletePost(id: UniqueID): Promise<void> {
    await this._connection
      .promise()
      .execute('DELETE FROM `Posts` WHERE `id` = ?', [id.toString()]);
  }

  public async exists(id: UniqueID): Promise<boolean> {
    try {
      await this.getPostById(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return false;
      }
      throw error;
    }

    return true;
  }

  public async savePost(post: Post): Promise<void> {
    const exists = await this.exists(post.id);

    if (exists) {
      await this._connection
        .promise()
        .execute('UPDATE `Posts` SET title = ?, text = ?, dateModified = ?', [
          post.title.value,
          post.text.value,
          `${
            post.dateModified.getFullYear
          }-${post.dateModified.getMonth()}-${post.dateModified.getDay()}`,
        ]);

      DomainEvents.dispatchEventsForAggregate(post.id);

      return;
    }

    await this._connection
      .promise()
      .execute(
        'INSERT INTO `Posts` (memberId,title,text,datePosted,dateModified) VALUES (?,?,?,?)',
        [
          post.memberId.toString(),
          post.title.value,
          post.text.value,
          `${
            post.datePosted.getFullYear
          }-${post.datePosted.getMonth()}-${post.datePosted.getDay()}`,
          `${
            post.dateModified.getFullYear
          }-${post.dateModified.getMonth()}-${post.dateModified.getDay()}`,
        ],
      );

    DomainEvents.dispatchEventsForAggregate(post.id);
  }
}
