export class CommentMapper implements Mapper<CommentDTO, Comment> {
  toDomain(dto: CommentDTO): Comment {
    const commentProps = {
      commentId: UniqueID.create(dto.commentId),
      memberId: UniqueID.create(dto.memberId),
      postId: UniqueID.create(dto.postId),
      text: CommentText.create(dto.text).value as CommentText,
      likes: CommentVotes.create(
        dto.commentVotes.map(new CommentVoteMapper().toDomain),
      ),
    };

    if (dto.parentComentId) {
      Object.assign(commentProps, {
        parentComentId: UniqueID.create(dto.parentComentId),
      });
    }

    return Comment.create(commentProps).value as Comment;
  }

  toPersistence(domain: Comment): CommentDTO {
    const dto = {
      commentId: domain.id.value,
      memberId: domain.memberId.value,
      postId: domain.postId.value,
      text: domain.text.value,
      commentVotes: domain.likes
        .getItems()
        .map(new CommentVoteMapper().toPersistence),
    };

    if (domain.parentComentId) {
      Object.assign(dto, { parentComentId: domain.parentComentId.value });
    }

    return dto;
  }
}
