const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const CommentLikesRepository = require('../../../../Domains/commentLikes/CommentLikesRepository');
const CommentLikesUseCase = require('../CommentLikesUseCase');

describe('CommentLikesUseCase', () => {
  it('should orchestrate the like comment action correctly', async () => {
    const mockComment = {
      id: 'comment-123',
    };
    const mockThread = {
      id: 'thread-123',
    };
    const mockUser = {
      id: 'user-123',
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockCommentLikesRepository = new CommentLikesRepository();

    mockThreadRepository.verifyAvailableThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockThread.id));
    mockCommentRepository.checkAvailableComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockComment.id));
    mockCommentLikesRepository.getHasLiked = jest
      .fn()
      .mockImplementation(() => Promise.resolve([]));
    mockCommentLikesRepository.addLike = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ status: 'success' }));

    const commentLikesUseCase = new CommentLikesUseCase({
      CommentLikesRepository: mockCommentLikesRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const addLikeResponse = await commentLikesUseCase.execute(
      mockUser.id,
      mockThread.id,
      mockComment.id
    );

    expect(addLikeResponse).toStrictEqual({ status: 'success' });

    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(
      mockThread.id
    );
    expect(mockCommentRepository.checkAvailableComment).toBeCalledWith(
      mockComment.id
    );
    expect(mockCommentLikesRepository.getHasLiked).toBeCalledWith(
      mockUser.id,
      mockThread.id,
      mockComment.id
    );
    expect(mockCommentLikesRepository.addLike).toBeCalledWith(
      mockUser.id,
      mockThread.id,
      mockComment.id
    );
  });

  it('should orchestrate the unlike comment action correctly', async () => {
    const mockComment = {
      id: 'comment-123',
    };
    const mockThread = {
      id: 'thread-123',
    };
    const mockUser = {
      id: 'user-123',
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockCommentLikesRepository = new CommentLikesRepository();

    mockThreadRepository.verifyAvailableThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockThread.id));
    mockCommentRepository.checkAvailableComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockComment.id));
    mockCommentLikesRepository.getHasLiked = jest
      .fn()
      .mockImplementation(() => Promise.resolve([{ id: 'like-123' }]));
    mockCommentLikesRepository.deleteLikeById = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ status: 'success' }));

    const commentLikesUseCase = new CommentLikesUseCase({
      CommentLikesRepository: mockCommentLikesRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const removeLikeResponse = await commentLikesUseCase.execute(
      mockUser.id,
      mockThread.id,
      mockComment.id
    );

    expect(removeLikeResponse).toStrictEqual({ status: 'success' });

    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(
      mockThread.id
    );
    expect(mockCommentRepository.checkAvailableComment).toBeCalledWith(
      mockComment.id
    );
    expect(mockCommentLikesRepository.getHasLiked).toBeCalledWith(
      mockUser.id,
      mockThread.id,
      mockComment.id
    );
    expect(mockCommentLikesRepository.deleteLikeById).toBeCalledWith(
      'like-123'
    );
  });
});
