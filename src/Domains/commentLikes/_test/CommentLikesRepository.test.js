const CommentLikesRepository = require('../CommentLikesRepository');

describe('CommentLikesRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const commentLikesRepository = new CommentLikesRepository();

    await expect(
      commentLikesRepository.addCommentLikes('', '', '')
    ).rejects.toThrow('COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentLikesRepository.deleteLikeById('')).rejects.toThrow(
      'COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(
      commentLikesRepository.getHasLiked('', '', '')
    ).rejects.toThrow('COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentLikesRepository.getLikesByThreadId('')).rejects.toThrow(
      'COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
