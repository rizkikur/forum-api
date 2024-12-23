const CommentLikesRepository = require('../../Domains/commentLikes/CommentLikesRepository');

class CommentLikesRepositoryPostgres extends CommentLikesRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addLike(userId, threadId, commentId) {
    const id = `like-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO likes VALUES ($1, $2, $3, $4)',
      values: [id, threadId, commentId, userId],
    };

    await this._pool.query(query);
  }

  async deleteLikeById(id) {
    const query = {
      text: 'DELETE FROM likes WHERE id = $1',
      values: [id],
    };

    await this._pool.query(query);
  }

  async getHasLiked(userId, threadId, commentId) {
    const query = {
      text: 'SELECT id FROM likes WHERE owner = $1 AND thread_id = $2 AND comment_id = $3',
      values: [userId, threadId, commentId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getLikesByThreadId(threadId) {
    const query = {
      text: 'SELECT * FROM likes WHERE thread_id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = CommentLikesRepositoryPostgres;
