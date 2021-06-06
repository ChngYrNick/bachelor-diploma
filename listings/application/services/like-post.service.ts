export class LikePostService implements LikePostUseCase {
  constructor(
    private readonly _postRepo: PostRepoPort,
    private readonly _memberRepo: MemberRepoPort,
    private readonly _postVoteRepo: PostVoteRepo,
    private readonly _blogService: BlogService,
  ) {}

  async likePost(dto: LikePostDTO): Promise<LikePostResponse> {
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

      const likePostResult = this._blogService.likePost(
        post,
        member,
        postVotesByMember,
      );

      if (likePostResult.isFailure) {
        return Result.fail<void>(likePostResult.errorValue as Error);
      }

      await this._postRepo.savePost(post);

      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(error);
    }
  }
}
