class DeleteCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(commentId, ownerId, threadId) {
    await this._commentRepository.checkAvailableComment(commentId);
    await this._commentRepository.verifyCommentOwner(commentId, ownerId);

    return this._commentRepository.deleteCommentById(threadId, commentId);
  }
}

module.exports = DeleteCommentUseCase;
