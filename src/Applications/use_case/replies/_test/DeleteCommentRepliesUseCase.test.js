const CommentRepliesRepository = require('../../../../Domains/commentReplies/CommentRepliesRepository');
const DeleteCommentRepliesUseCase = require('../DeleteCommentRepliesUseCase');

describe('DeleteCommentRepliesUseCase', () => {
  it('should orchestrate the delete comment reply action correctly', async () => {
    const mockCommentRepliesRepository = new CommentRepliesRepository();

    const mockThread = {
      id: 'thread-124',
    };

    const mockComment = {
      id: 'comment-344',
    };

    const mockReply = {
      id: 'reply-223',
    };

    const mockUser = {
      id: 'user-144',
    };

    mockCommentRepliesRepository.checkAvailableReply = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockCommentRepliesRepository.verifyCommentReplyOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockCommentRepliesRepository.deleteReplyById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentRepliesUseCase = new DeleteCommentRepliesUseCase({
      commentRepliesRepository: mockCommentRepliesRepository,
    });

    await deleteCommentRepliesUseCase.execute(
      mockThread.id,
      mockComment.id,
      mockReply.id,
      mockUser.id
    );

    expect(mockCommentRepliesRepository.checkAvailableReply).toBeCalledWith(
      mockReply.id
    );
    expect(mockCommentRepliesRepository.verifyCommentReplyOwner).toBeCalledWith(
      mockReply.id,
      mockUser.id
    );
    expect(mockCommentRepliesRepository.deleteReplyById).toBeCalledWith(
      mockThread.id,
      mockComment.id,
      mockReply.id
    );
  });
});
