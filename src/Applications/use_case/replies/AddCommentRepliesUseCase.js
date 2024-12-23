const AddCommentReplies = require('../../../Domains/commentReplies/entities/AddCommentReplies');

class AddCommentRepliesUseCase {
  constructor({
    commentRepliesRepository,
    commentRepository,
    threadRepository,
  }) {
    this._commentRepliesRepository = commentRepliesRepository;
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(threadId, commentId, ownerId, useCasePayload) {
    const addReplies = new AddCommentReplies(useCasePayload);
    await this._threadRepository.verifyAvailableThread(threadId);
    await this._commentRepository.checkAvailableComment(commentId);

    return this._commentRepliesRepository.addCommentReplies(
      ownerId,
      commentId,
      addReplies
    );
  }
}

module.exports = AddCommentRepliesUseCase;
