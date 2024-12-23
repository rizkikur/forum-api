const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const AddCommentReplies = require('../../../Domains/commentReplies/entities/AddCommentReplies');
const AddedCommentReplies = require('../../../Domains/commentReplies/entities/AddedCommentReplies');
const CommentRepliesRepositoryPostgres = require('../CommentRepliesRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');

describe('CommentRepliesRepositoryPostgres', () => {
  const userId = 'user-123';
  const threadId = 'thread-123';
  const commentId = 'comment-123';

  beforeAll(async () => {
    await UsersTableTestHelper.addUser({ id: userId });
    await ThreadsTableTestHelper.addThread({ id: threadId, owner: userId });
    await CommentsTableTestHelper.addComment({
      id: commentId,
      threadId,
      userId,
    });
  });

  afterEach(async () => {
    await RepliesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addCommentReplies function', () => {
    it('should persist adding reply and return added reply correctly', async () => {
      const newReply = new AddCommentReplies({
        content: 'Test reply',
      });
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new CommentRepliesRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      await replyRepositoryPostgres.addCommentReplies(
        'user-123',
        'comment-123',
        newReply
      );

      const reply = await RepliesTableTestHelper.findRepliesById('reply-123');
      expect(reply).toHaveLength(1);
    });

    it('should return added reply correctly', async () => {
      const newReply = new AddCommentReplies({
        content: 'test reply',
      });
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new CommentRepliesRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      const addedReply = await replyRepositoryPostgres.addCommentReplies(
        'user-123',
        'comment-123',
        newReply
      );
      expect(addedReply).toStrictEqual(
        new AddedCommentReplies({
          id: 'reply-123',
          content: 'test reply',
          owner: 'user-123',
        })
      );
    });
  });

  describe('getRepliesByCommentId function', () => {
    it('should return correct replies', async () => {
      await RepliesTableTestHelper.addReplyComment({
        id: 'reply-789',
        commentId: 'comment-123',
        threadId: 'thread-123',
        userId: 'user-123',
        content: 'test reply comment',
      });

      const replyRepositoryPostgres = new CommentRepliesRepositoryPostgres(
        pool,
        {}
      );

      const replies = await replyRepositoryPostgres.getRepliesByCommentId(
        'comment-123'
      );

      expect(replies[0]).toEqual(
        expect.objectContaining({
          id: 'reply-789',
          username: 'dicoding',
          content: 'test reply comment',
          is_delete: false,
          created_at: expect.any(Date),
        })
      );
    });

    it('should return empty replies but does not throw error', async () => {
      const replyRepositoryPostgres = new CommentRepliesRepositoryPostgres(
        pool,
        {}
      );

      const replies = await replyRepositoryPostgres.getRepliesByCommentId(
        'comment-123'
      );

      expect(Array.isArray(replies)).toBeTruthy();
      expect(replies).toHaveLength(0);
    });
  });

  describe('checkAvailableReply function', () => {
    it('should not throw error if reply is available', async () => {
      // Arrange
      await RepliesTableTestHelper.addReplyComment({
        id: 'reply-123',
        content: 'reply com',
        created_at: '2024-12-05T12:13:26.326Z',
        owner: 'user-123',
        comment_id: 'comment-123',
        is_delete: false,
      });

      const replyRepositoryPostgres = new CommentRepliesRepositoryPostgres(
        pool,
        {}
      );
      await expect(
        replyRepositoryPostgres.checkAvailableReply('reply-123')
      ).resolves.not.toThrowError(NotFoundError);
    });
    it('should throw error if reply is not found', async () => {
      const replyRepositoryPostgres = new CommentRepliesRepositoryPostgres(
        pool,
        {}
      );

      await expect(
        replyRepositoryPostgres.checkAvailableReply('reply-123')
      ).rejects.toThrowError(NotFoundError);
    });
  });

  describe('deleteReplyById function', () => {
    it('should be able to delete reply', async () => {
      await RepliesTableTestHelper.addReplyComment({
        id: 'reply-123',
        commentId: 'comment-123',
        threadId: 'thread-123',
        userId: 'user-123',
      });

      const replyRepositoryPostgres = new CommentRepliesRepositoryPostgres(
        pool,
        {}
      );
      replyRepositoryPostgres.deleteReplyById(
        'thread-123',
        'comment-123',
        'reply-123'
      );

      const replies = await replyRepositoryPostgres.getRepliesByCommentId(
        'comment-123'
      );
      expect(replies[0].is_delete).toEqual(true);
    });
  });

  describe('verifyCommentReplyOwner function', () => {
    it('should throw AuthorizationError if not the owner of reply', async () => {
      await RepliesTableTestHelper.addReplyComment({
        id: 'reply-123',
        commentId: 'comment-123',
        threadId: 'thread-123',
        userId: 'user-123',
      });

      const replyRepositoryPostgres = new CommentRepliesRepositoryPostgres(
        pool,
        {}
      );
      await expect(
        replyRepositoryPostgres.verifyCommentReplyOwner('reply-123', 'user-644')
      ).rejects.toThrowError(AuthorizationError);
    });

    it('should not throw error if user is the owner of reply', async () => {
      await RepliesTableTestHelper.addReplyComment({
        id: 'reply-123',
        commentId: 'comment-123',
        threadId: 'thread-123',
        userId: 'user-123',
      });

      const replyRepositoryPostgres = new CommentRepliesRepositoryPostgres(
        pool,
        {}
      );
      await expect(
        replyRepositoryPostgres.verifyCommentReplyOwner('reply-123', 'user-123')
      ).resolves.not.toThrowError(AuthorizationError);
    });
  });
});
