class CommentRepliesRepository {
  async addCommentReplies(userId, commentId, addReply) {
    throw new Error('COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyCommentReplyOwner(userId, replyId) {
    throw new Error('COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getRepliesByCommentId(commentId) {
    throw new Error('COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async checkAvailableReply(id) {
    throw new Error('COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteReplyById(id) {
    throw new Error('COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = CommentRepliesRepository;
