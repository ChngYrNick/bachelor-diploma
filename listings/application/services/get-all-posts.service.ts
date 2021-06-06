export class GetAllPostsService implements GetAllPostsUseCase {
  constructor(private readonly _postRepo: PostRepoPort) {}

  async getAllPosts(): Promise<GetAllPostsResponse> {
    try {
      const posts = await this._postRepo.getAllPosts();
      return Result.ok<Post[]>(posts as Post[]);
    } catch (error) {
      return Result.fail<Post[]>(error);
    }
  }
}
