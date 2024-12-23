const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  beforeAll(async () => {
    await UsersTableTestHelper.addUser({ id: 'user-124' });
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist adding thread and return added thread correctly', async () => {
      // Arrange
      const newThread = new AddThread({
        title: 'test Thread title',
        body: 'test Thread body',
      });
      const fakeIdGenerator = () => '124';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(
        'user-124',
        newThread
      );

      expect(addedThread).toStrictEqual(
        new AddedThread({
          id: 'thread-124',
          title: 'test Thread title',
          owner: 'user-124',
        })
      );

      const thread = await ThreadsTableTestHelper.verifyAvailableThread(
        'thread-124'
      );
      expect(thread).toHaveLength(1);
    });
  });
  describe('getThreadById function', () => {
    it('should throw NotFoundError if thread is not found', async () => {
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      await expect(
        threadRepositoryPostgres.getThreadById('thread-1')
      ).rejects.toThrowError(NotFoundError);
    });

    it('should return correct thread', async () => {
      await ThreadsTableTestHelper.addThread({
        id: 'thread-124',
        title: 'Thread 1',
        body: 'Body thread',
        owner: 'user-124',
        created_at: '2024-12-05T10:18:26.316Z',
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      const thread = await threadRepositoryPostgres.getThreadById('thread-124');

      expect(thread).toStrictEqual({
        id: 'thread-124',
        title: 'Thread 1',
        body: 'Body thread',
        created_at: expect.any(Date),
        username: 'dicoding',
      });
    });
  });
  describe('verifyAvailableThread function', () => {
    it('should not throw error when thread exists', async () => {
      // Arrange
      await ThreadsTableTestHelper.addThread({
        id: 'thread-124',
        title: 'Thread 1',
        body: 'Body thread',
        owner: 'user-124',
      });

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert

      await expect(
        threadRepositoryPostgres.verifyAvailableThread('thread-124')
      ).resolves.not.toThrowError(NotFoundError);
    });
    it('should throw NotFoundError when thread not found', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        threadRepositoryPostgres.verifyAvailableThread('thread-123')
      ).rejects.toThrowError(NotFoundError);
    });
  });
});
