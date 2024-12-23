const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    const mockThread = {
      id: 'thread-124',
    };

    const mockUser = {
      ownerId: 'user-243',
    };

    const mockComment = {
      id: 'comment-223',
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.verifyAvailableThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.checkAvailableComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.deleteCommentById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    await deleteCommentUseCase.execute(
      mockComment.id,
      mockUser.ownerId,
      mockThread.id
    );

    expect(mockCommentRepository.checkAvailableComment).toBeCalledWith(
      mockComment.id
    );
    expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith(
      mockComment.id,
      mockUser.ownerId
    );
    expect(mockCommentRepository.deleteCommentById).toBeCalledWith(
      mockThread.id,
      mockComment.id
    );
  });
});
