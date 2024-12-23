const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

describe('CommentRepositoryPostgres', () => {
  beforeAll(async () => {
    await UsersTableTestHelper.addUser({ id: 'user-123' });
    await ThreadsTableTestHelper.addThread({
      id: 'thread-123',
      title: 'Title',
      body: 'body',
      owner: 'user-123',
    });
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addComment function', () => {
    it('should persist adding comment and return added comment correctly', async () => {
      const newComment = new AddComment({
        content: 'comment!',
      });
      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      const addedComment = await commentRepositoryPostgres.addComment(
        'thread-123',
        'user-123',
        newComment
      );

      // Assert
      const comment = await CommentsTableTestHelper.checkAvailableComment(
        'comment-123'
      );
      expect(comment).toHaveLength(1);
      expect(addedComment).toStrictEqual(
        new AddedComment({
          id: 'comment-123',
          content: 'comment!',
          owner: 'user-123',
        })
      );
    });
  });

  describe('getCommentByThreadId', () => {
    it('should return correct comments', async () => {
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        threadId: 'thread-123',
        owner: 'user-123',
        content: 'Comment!',
        createdAt: '2024-12-05T12:28:47.134Z',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      const comments = await commentRepositoryPostgres.getCommentByThreadId(
        'thread-123'
      );

      expect(comments[0]).toStrictEqual({
        id: 'comment-123',
        username: 'dicoding',
        content: 'Comment!',
        is_delete: false,
        created_at: expect.any(Date),
      });
    });

    it('should return empty comments but does not throw error', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      const comments = await commentRepositoryPostgres.getCommentByThreadId(
        'thread-123'
      );

      expect(Array.isArray(comments)).toBeTruthy();
      expect(comments).toHaveLength(0);
    });
  });

  describe('checkAvailableComment function', () => {
    it('should return all comment if comment is exists', async () => {
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        threadId: 'thread-123',
        owner: 'user-123',
        content: 'This is a test comment',
        isDelete: false,
      });

      // Action & Assert
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await expect(
        commentRepositoryPostgres.checkAvailableComment('comment-123')
      ).resolves.not.toThrowError(NotFoundError);
    });
    it('should throw NotFoundError if comment is not found', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      await expect(
        commentRepositoryPostgres.checkAvailableComment('comment-123')
      ).rejects.toThrowError(NotFoundError);
    });
  });

  describe('deleteCommentById function', () => {
    it('should mark comment as deleted by id', async () => {
      // Arrange
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        content: 'Comment content',
        owner: 'user-123',
        threadId: 'thread-123',
        is_delete: false,
      });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await commentRepositoryPostgres.deleteCommentById(
        'thread-123',
        'comment-123'
      );

      const comments = await CommentsTableTestHelper.checkAvailableComment(
        'comment-123'
      );
      expect(comments[0].is_delete).toEqual(true);
    });
  });

  describe('verifyCommentOwner function', () => {
    it('should throw AuthorizationError if owner does not match', async () => {
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        content: 'Comment content',
        owner: 'user-123',
        threadId: 'thread-123',
        is_delete: false,
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await expect(
        commentRepositoryPostgres.verifyCommentOwner('comment-123', 'user-456')
      ).rejects.toThrowError(AuthorizationError);
    });

    it('should not throw error if owner matches', async () => {
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        content: 'Comment content',
        owner: 'user-123',
        threadId: 'thread-123',
        is_delete: false,
      });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      await expect(
        commentRepositoryPostgres.verifyCommentOwner('comment-123', 'user-123')
      ).resolves.not.toThrowError(AuthorizationError);
    });
  });
});
