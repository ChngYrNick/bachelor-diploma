export class GetPostService implements GetPostUseCase {
  constructor(private readonly _postRepo: PostRepoPort) {}

  async getPost(dto: GetPostDTO): Promise<GetPostResponse> {
    try {
      const post = await this._postRepo.getPostById(
        UniqueID.create(dto.postId),
      );
      return Result.ok<Post>(post);
    } catch (error) {
      return Result.fail<Post>(error);
    }
  }
}
