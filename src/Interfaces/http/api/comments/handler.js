const autoBind = require('auto-bind');
const AddCommentUseCase = require('../../../../Applications/use_case/comments/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/comments/DeleteCommentUseCase');

class CommentHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postCommentHandler(request, h) {
    const addCommentUseCase = this._container.getInstance(
      AddCommentUseCase.name
    );
    const { id: ownerId } = request.auth.credentials;
    const { threadId } = request.params;

    const addedComment = await addCommentUseCase.execute(
      threadId,
      ownerId,
      request.payload
    );

    const response = h.response({
      status: 'success',
      data: { addedComment },
    });
    response.code(201);
    return response;
  }

  async deleteCommentHandler(request, h) {
    const deleteCommentUseCase = this._container.getInstance(
      DeleteCommentUseCase.name
    );
    const { id: ownerId } = request.auth.credentials;

    const { threadId, commentId } = request.params;

    await deleteCommentUseCase.execute(commentId, ownerId, threadId);

    const response = h.response({
      status: 'success',
    });
    return response;
  }
}

module.exports = CommentHandler;
