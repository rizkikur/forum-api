const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const AddComment = require('../../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../../Domains/comments/entities/AddedComment');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    const useCasePayload = {
      content: 'test comment',
    };

    const mockUser = {
      id: 'user-124',
    };

    const mockThread = {
      id: 'thread-124',
    };

    const mockAddedComment = new AddedComment({
      id: 'comment-214',
      content: useCasePayload.content,
      owner: mockUser.id,
    });

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.verifyAvailableThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.addComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddedComment));

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const addedComment = await addCommentUseCase.execute(
      mockThread.id,
      mockUser.id,
      useCasePayload
    );

    expect(addedComment).toStrictEqual(
      new AddedComment({
        id: 'comment-214',
        content: useCasePayload.content,
        owner: mockUser.id,
      })
    );

    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(
      mockThread.id
    );
    expect(mockCommentRepository.addComment).toBeCalledWith(
      mockThread.id,
      mockUser.id,
      new AddComment({
        content: useCasePayload.content,
      })
    );
  });
});
