const CommentRepliesRepository = require('../../../../Domains/commentReplies/CommentRepliesRepository');
const CommentLikesRepository = require('../../../../Domains/commentLikes/CommentLikesRepository');
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const UserRepository = require('../../../../Domains/users/UserRepository');
const GetDetailThreadUseCase = require('../GetDetailThreadUseCase');

describe('GetDetailThreadUseCase', () => {
  it('should orchestrating the get detail thread action correctly', async () => {
    const mockThreadData = {
      id: 'thread-124',
      title: 'Test New Thread',
      body: 'Testing new thread.',
      created_at: '2024-12-02T11:01:10.238Z',
      username: 'tatang',
    };

    const mockCommentData = [
      {
        id: 'comment-124',
        username: 'yanto',
        created_at: '2024-12-02T12:01:10.238Z',
        is_delete: false,
        content: 'first comment',
      },
      {
        id: 'comment-132',
        username: 'adi',
        created_at: '2024-12-02T12:41:10.238Z',
        is_delete: false,
        content: 'wow',
      },
      {
        id: 'comment-140',
        username: 'agus',
        created_at: '2024-12-02T12:31:10.238Z',
        is_delete: true,
        content: '**komentar telah dihapus**',
      },
    ];

    const mockReplyData = [
      {
        id: 'reply-222',
        username: 'tatang',
        created_at: '2024-12-20T11:32:20.000Z',
        content: 'Thanks!!!',
        is_delete: false,
      },
      {
        id: 'reply-113',
        username: 'agus',
        created_at: '2024-12-21T09:41:00.000Z',
        content: '**balasan telah dihapus**',
        is_delete: true,
      },
    ];

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockCommentLikesRepository = new CommentLikesRepository();
    const mockCommentRepliesRepository = new CommentRepliesRepository();
    const mockUserRepository = new UserRepository();

    mockThreadRepository.getThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockThreadData));
    mockCommentRepository.getCommentByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockCommentData));
    mockCommentLikesRepository.getLikesByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve([]));
    mockCommentRepliesRepository.getRepliesByCommentId = jest
      .fn()
      .mockImplementation((commentId) => {
        if (commentId === 'comment-124') {
          return Promise.resolve(mockReplyData);
        }
        return Promise.resolve([]);
      });

    const getDetailThreadUseCase = new GetDetailThreadUseCase({
      threadRepository: mockThreadRepository,
      userRepository: mockUserRepository,
      commentRepository: mockCommentRepository,
      commentRepliesRepository: mockCommentRepliesRepository,
      commentLikesRepository: mockCommentLikesRepository,
    });

    const detailThread = await getDetailThreadUseCase.execute('thread-124');

    expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-124');
    expect(mockCommentRepository.getCommentByThreadId).toBeCalledWith(
      'thread-124'
    );
    expect(mockCommentLikesRepository.getLikesByThreadId).toBeCalledWith(
      'thread-124'
    );
    expect(mockCommentRepliesRepository.getRepliesByCommentId).toBeCalledWith(
      'comment-124'
    );

    expect(detailThread).toMatchObject({
      id: 'thread-124',
      title: 'Test New Thread',
      body: 'Testing new thread.',
      username: 'tatang',
    });

    expect(detailThread.comments).toHaveLength(3);

    expect(detailThread.comments[0]).toMatchObject({
      id: 'comment-124',
      username: 'yanto',
      content: 'first comment',
    });

    expect(detailThread.comments[1]).toMatchObject({
      id: 'comment-132',
      username: 'adi',
      content: 'wow',
    });

    expect(detailThread.comments[2]).toMatchObject({
      id: 'comment-140',
      username: 'agus',
      content: '**komentar telah dihapus**',
    });

    expect(detailThread.comments[0].replies).toHaveLength(2);

    expect(detailThread.comments[0].replies[0]).toMatchObject({
      id: 'reply-222',
      username: 'tatang',
      content: 'Thanks!!!',
    });

    expect(detailThread.comments[0].replies[1]).toMatchObject({
      id: 'reply-113',
      username: 'agus',
      content: '**balasan telah dihapus**',
    });

    expect(detailThread.comments[1].replies).toHaveLength(0);
  });

  it('should orchestrating the get thread detail action without comments and replies correctly', async () => {
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockCommentRepliesRepository = new CommentRepliesRepository();
    const mockCommentLikesRepository = new CommentLikesRepository();
    const mockUserRepository = new UserRepository();

    const mockThreadData = {
      id: 'thread-125',
      title: 'Second thread',
      body: 'Testing second thread',
      created_at: '2024-12-03T08:10:00.000Z',
      username: 'boy',
    };

    mockThreadRepository.getThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockThreadData));
    mockCommentRepository.getCommentByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve([]));
    mockCommentRepliesRepository.getRepliesByCommentId = jest
      .fn()
      .mockImplementation(() => Promise.resolve([]));

    const getDetailThreadUseCase = new GetDetailThreadUseCase({
      threadRepository: mockThreadRepository,
      userRepository: mockUserRepository,
      commentRepository: mockCommentRepository,
      commentRepliesRepository: mockCommentRepliesRepository,
      commentLikesRepository: mockCommentLikesRepository,
    });

    const detailThread = await getDetailThreadUseCase.execute('thread-125');

    expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-125');
    expect(mockCommentRepository.getCommentByThreadId).toBeCalledWith(
      'thread-125'
    );
    expect(mockCommentRepliesRepository.getRepliesByCommentId).toBeCalledTimes(
      0
    );

    expect(detailThread).toMatchObject({
      id: 'thread-125',
      title: 'Second thread',
      body: 'Testing second thread',
      username: 'boy',
    });
    expect(detailThread.comments).toHaveLength(0);
  });
});
