export class EditPostService implements EditPostUseCase {
  constructor(private readonly _postRepo: PostRepoPort) {}

  async editPost(dto: EditPostDTO): Promise<EditPostResponse> {
    const editPostProps = {} as EditPostProps;

    const titleResult = PostTitle.create(dto.title);
    if (titleResult.isFailure) {
      return Result.fail<Post>(titleResult.errorValue as Error);
    }

    editPostProps.postTitle = titleResult.value as PostTitle;

    const textResult = PostText.create(dto.text);
    if (textResult.isFailure) {
      return Result.fail<Post>(textResult.errorValue as Error);
    }

    editPostProps.postText = textResult.value as PostText;

    editPostProps.hashtags = Hashtags.create([]);

    try {
      const post = await this._postRepo.getPostById(
        UniqueID.create(dto.postId),
      );

      const updateInfoResult = post.updateInfo(editPostProps);

      if (updateInfoResult.isFailure) {
        return Result.fail<Post>(updateInfoResult.errorValue as Error);
      }

      await this._postRepo.savePost(post);

      return Result.ok<Post>(post);
    } catch (error) {
      return Result.fail<Post>(error);
    }
  }
}
