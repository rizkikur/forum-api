const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepliesRepository = require('../../Domains/commentReplies/CommentRepliesRepository');
const AddedCommentReplies = require('../../Domains/commentReplies/entities/AddedCommentReplies');

class CommentRepliesRepositoryPostgres extends CommentRepliesRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addCommentReplies(userId, commentId, newCommentReplies) {
    const { content } = newCommentReplies;
    const id = `reply-${this._idGenerator()}`;
    const created_at = new Date().toISOString();

    const query = {
      text: `
            INSERT INTO replies (id, content, created_at, owner, comment_id, is_delete)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, content, owner
          `,
      values: [id, content, created_at, userId, commentId, false],
    };

    const result = await this._pool.query(query);
    return new AddedCommentReplies({
      id: result.rows[0].id,
      content: result.rows[0].content,
      owner: result.rows[0].owner,
    });
  }

  async getRepliesByCommentId(commentId) {
    const query = {
      text: `SELECT replies.id, replies.created_at, users.username, replies.content, replies.is_delete
        FROM replies
        INNER JOIN users ON users.id = replies.owner
        WHERE replies.comment_id = $1
        ORDER BY replies.created_at ASC`,
      values: [commentId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async checkAvailableReply(id) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Reply not found');
    }
  }

  async deleteReplyById(threadId, commentId, replyId) {
    const query = {
      text: `UPDATE replies SET is_delete = true FROM comments
        INNER JOIN threads ON comments.thread_id = threads.id
        WHERE replies.comment_id = comments.id AND threads.id = $1 AND replies.comment_id = $2 AND replies.id = $3`,
      values: [threadId, commentId, replyId],
    };

    await this._pool.query(query);
  }

  async verifyCommentReplyOwner(replyId, userId) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1 AND owner = $2',
      values: [replyId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError(
        'You are not the owner of this reply, so you cannot modify it.'
      );
    }
  }
}

module.exports = CommentRepliesRepositoryPostgres;
