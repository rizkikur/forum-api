class CommentLikesUseCase {
  constructor({ CommentLikesRepository, threadRepository, commentRepository }) {
    this._CommentLikesRepository = CommentLikesRepository;
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(userId, threadId, commentId) {
    await this._threadRepository.verifyAvailableThread(threadId);
    await this._commentRepository.checkAvailableComment(commentId);

    const hasLiked = await this._CommentLikesRepository.getHasLiked(
      userId,
      threadId,
      commentId
    );

    if (hasLiked.length) {
      return this._CommentLikesRepository.deleteLikeById(hasLiked[0].id);
    }

    return this._CommentLikesRepository.addLike(userId, threadId, commentId);
  }
}

module.exports = CommentLikesUseCase;
