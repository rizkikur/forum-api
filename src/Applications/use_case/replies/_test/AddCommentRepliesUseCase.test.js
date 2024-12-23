const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const AddCommentReplies = require('../../../../Domains/commentReplies/entities/AddCommentReplies');
const AddedCommentReplies = require('../../../../Domains/commentReplies/entities/AddedCommentReplies');
const CommentRepliesRepository = require('../../../../Domains/commentReplies/CommentRepliesRepository');
const AddCommentRepliesUseCase = require('../AddCommentRepliesUseCase');

describe('AddCommentRepliesUseCase', () => {
  it('should orchestrating the add reply comment action correctly', async () => {
    const useCasePayload = {
      content: 'This is a reply to the comment',
    };

    const mockThread = {
      id: 'thread-789',
    };
    const mockUser = {
      id: 'user-465',
    };
    const mockComment = {
      id: 'comment-457',
    };

    const mockAddedCommentReply = new AddedCommentReplies({
      id: 'reply-576',
      content: useCasePayload.content,
      owner: mockUser.id,
    });

    const mockCommentRepliesRepository = new CommentRepliesRepository();
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.verifyAvailableThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.checkAvailableComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepliesRepository.addCommentReplies = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddedCommentReply));

    const addCommentRepliesUseCase = new AddCommentRepliesUseCase({
      commentRepliesRepository: mockCommentRepliesRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const addedCommentReply = await addCommentRepliesUseCase.execute(
      mockThread.id,
      mockComment.id,
      mockUser.id,
      useCasePayload
    );

    expect(addedCommentReply).toStrictEqual(
      new AddedCommentReplies({
        id: 'reply-576',
        content: useCasePayload.content,
        owner: mockUser.id,
      })
    );

    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(
      mockThread.id
    );
    expect(mockCommentRepository.checkAvailableComment).toBeCalledWith(
      mockComment.id
    );
    expect(mockCommentRepliesRepository.addCommentReplies).toBeCalledWith(
      mockUser.id,
      mockComment.id,
      new AddCommentReplies({
        content: useCasePayload.content,
      })
    );
  });
});
