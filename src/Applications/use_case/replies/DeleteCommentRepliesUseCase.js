class DeleteCommentRepliesUseCase {
  constructor({ commentRepliesRepository }) {
    this._commentRepliesRepository = commentRepliesRepository;
  }

  async execute(threadId, commentId, replyId, userId) {
    await this._commentRepliesRepository.checkAvailableReply(replyId);
    await this._commentRepliesRepository.verifyCommentReplyOwner(
      replyId,
      userId,
    );

    return this._commentRepliesRepository.deleteReplyById(
      threadId,
      commentId,
      replyId,
    );
  }
}

module.exports = DeleteCommentRepliesUseCase;
