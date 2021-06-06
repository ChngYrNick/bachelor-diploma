export class CreatePostService implements CreatePostUseCase {
  constructor(
    private readonly _postRepo: PostRepoPort,
    private readonly _memberRepo: MemberRepoPort,
  ) {}

  async createPost(dto: CreatePostDTO): Promise<CreatePostResponse> {
    const postProps = {} as PostProps;

    try {
      const member = await this._memberRepo.getMemberById(
        UniqueID.create(dto.memberId),
      );
      postProps.memberId = member.id;
    } catch (error) {
      return Result.fail<Post>(error);
    }

    const titleResult = PostTitle.create(dto.title);
    if (titleResult.isFailure) {
      return Result.fail<Post>(titleResult.errorValue as Error);
    }
    postProps.postTitle = titleResult.value as PostTitle;

    const textResult = PostText.create(dto.text);
    if (textResult.isFailure) {
      return Result.fail<Post>(textResult.errorValue as Error);
    }
    postProps.postText = textResult.value as PostText;

    const postResult = Post.create(postProps);
    if (postResult.isFailure) {
      return Result.fail<Post>(postResult.errorValue as Error);
    }

    const post = postResult.value as Post;

    try {
      await this._postRepo.savePost(post);
    } catch (error) {
      return Result.fail<Post>(error);
    }

    return Result.ok<Post>(post);
  }
}
