describe('BlogService', () => {
  it('should like post', () => {
    expect(true).toEqual(true);
    const member = Member.create({
      username: UserName.create('Mosk6565').value as UserName,
      firstName: FirstName.create('Serhii').value as FirstName,
      lastName: LastName.create('Moskovko').value as LastName,
      email: Email.create('serhii@moskovko.xyz').value as Email,
    }).value as Member;

    const post = Post.create({
      memberId: member.id,
      postTitle: PostTitle.create('Post title').value as PostTitle,
      postText: PostText.create('Post text').value as PostText,
    }).value as Post;

    const likePostResult = new BlogService().likePost(post, member, []);

    expect(likePostResult.isSuccess).toEqual(true);
    expect(post.likes.getItems()[0].memberId.toString()).toEqual(
      member.id.toString(),
    );
    expect(post.likes.getItems()[0].isLike()).toEqual(true);
    expect(post.likes.getItems().length).toEqual(1);
  });

  it('should remove like on post', () => {
    expect(true).toEqual(true);
    const member = Member.create({
      username: UserName.create('Mosk6565').value as UserName,
      firstName: FirstName.create('Serhii').value as FirstName,
      lastName: LastName.create('Moskovko').value as LastName,
      email: Email.create('serhii@moskovko.xyz').value as Email,
    }).value as Member;

    const postId = UniqueID.create();

    const existingVote = PostVote.create({
      memberId: member.id,
      voteType: 'LIKE',
      postId,
    }).value as PostVote;

    const post = Post.create({
      memberId: member.id,
      postTitle: PostTitle.create('Post title').value as PostTitle,
      postText: PostText.create('Post text').value as PostText,
      postLikes: PostVotes.create([existingVote]),
      postId,
    }).value as Post;

    const likePostResult = new BlogService().likePost(post, member, [
      existingVote,
    ]);

    expect(likePostResult.isSuccess).toEqual(true);
    expect(post.likes.getItems().length).toEqual(0);
  });
