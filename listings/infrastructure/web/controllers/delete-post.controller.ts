export class DeletePostController {
  constructor(private readonly _deletePostService: DeletePostUseCase) {}

  async deletePost(req: Request, res: Response): Promise<void> {
    const dto: DeletePostDTO = {
      postId: req.body.postId,
    };

    const response = await this._deletePostService.deletePost(dto);

    if (response.isFailure) {
      throw response.errorValue;
    }

    res.status(200);
  }
}
