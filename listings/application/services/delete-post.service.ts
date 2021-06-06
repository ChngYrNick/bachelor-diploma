export class DeletePostService implements DeletePostUseCase {
  constructor(private readonly _postRepo: PostRepoPort) {}

  async deletePost(dto: DeletePostDTO): Promise<DeletePostResponse> {
    try {
      await this._postRepo.deletePost(UniqueID.create(dto.postId));
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(error);
    }
  }
}
