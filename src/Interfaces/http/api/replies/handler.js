const autoBind = require('auto-bind');
const AddCommentRepliesUseCase = require('../../../../Applications/use_case/replies/AddCommentRepliesUseCase');
const DeleteCommentRepliesUseCase = require('../../../../Applications/use_case/replies/DeleteCommentRepliesUseCase');

class CommentRepliesHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postReplyHandler(request, h) {
    const addReplyUseCase = this._container.getInstance(
      AddCommentRepliesUseCase.name,
    );

    const { id: ownerId } = request.auth.credentials;
    const { threadId, commentId } = request.params;

    const addedReply = await addReplyUseCase.execute(
      threadId,
      commentId,
      ownerId,
      request.payload,
    );

    const response = h.response({
      status: 'success',
      data: { addedReply },
    });
    response.code(201);
    return response;
  }

  async deleteReplyByIdHandler(request, h) {
    const deleteReplyUseCase = this._container.getInstance(
      DeleteCommentRepliesUseCase.name,
    );

    const { id: userId } = request.auth.credentials;
    const { threadId, commentId, replyId } = request.params;

    await deleteReplyUseCase.execute(threadId, commentId, replyId, userId);

    const response = h.response({
      status: 'success',
    });
    return response;
  }
}

module.exports = CommentRepliesHandler;
