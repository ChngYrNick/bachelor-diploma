import { UniqueID } from '../../../shared/unique-id.base';
import { PostText } from '../post/post-text.value';
import { PostTitle } from '../post/post-title.value';
import { Post } from '../post/post.entity';

describe('PostEntity', () => {
  it('should create post', () => {
    const postTitleResult = PostTitle.create('Post title');

    const postTextResult = PostText.create('Post text');

    expect(postTitleResult.isSuccess).toEqual(true);
    expect(postTextResult.isSuccess).toEqual(true);

    if (postTitleResult.isFailure || postTextResult.isFailure) {
      return;
    }

    const postResult = Post.create({
      memberId: UniqueID.create(),
      postTitle: PostTitle.create('Post title').value as PostTitle,
      postText: PostText.create('Post text').value as PostText,
    });

    expect(postResult.isSuccess).toEqual(true);

    if (postResult.isSuccess) {
      const member = postResult.value as Post;

      expect(member.domainEvents.length).toEqual(1);
    }
  });
});
