export class DislikePostService implements DislikePostUseCase {
  constructor(
    private readonly _postRepo: PostRepoPort,
    private readonly _memberRepo: MemberRepoPort,
    private readonly _postVoteRepo: PostVoteRepo,
    private readonly _blogService: BlogService,
  ) {}

  async dislikePost(dto: DislikePostDTO): Promise<DislikePostResponse> {
    try {
      const member = await this._memberRepo.getMemberById(
        UniqueID.create(dto.memberId),
      );

      const post = await this._postRepo.getPostById(
        UniqueID.create(dto.postId),
      );

      const postVotesByMember = await this._postVoteRepo.getPostVotesByMemberId(
        post.id,
        member.id,
      );

      const dislikePostResult = this._blogService.dislikePost(
        post,
        member,
        postVotesByMember,
      );

      if (dislikePostResult.isFailure) {
        return Result.fail<void>(dislikePostResult.errorValue as Error);
      }

      await this._postRepo.savePost(post);

      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(error);
    }
  }
}
