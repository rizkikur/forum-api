const AddComment = require('../../../Domains/comments/entities/AddComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(threadId, ownerId, useCasePayload) {
    const addComment = new AddComment(useCasePayload);
    await this._threadRepository.verifyAvailableThread(threadId);

    return this._commentRepository.addComment(threadId, ownerId, addComment);
  }
}

module.exports = AddCommentUseCase;
