const CommentRepliesRepository = require('../CommentRepliesRepository');

describe('CommentRepliesRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const commentRepliesRepository = new CommentRepliesRepository();
    await expect(
      commentRepliesRepository.addCommentReplies('', '', {})
    ).rejects.toThrow('COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(
      commentRepliesRepository.verifyCommentReplyOwner('', '')
    ).rejects.toThrow('COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(
      commentRepliesRepository.getRepliesByCommentId('')
    ).rejects.toThrow('COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(
      commentRepliesRepository.checkAvailableReply('')
    ).rejects.toThrow('COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentRepliesRepository.deleteReplyById('')).rejects.toThrow(
      'COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
