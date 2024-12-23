const CommentLikesUseCase = require('../../../../Applications/use_case/likes/CommentLikesUseCase');

class LikesHandler {
  constructor(container) {
    this._container = container;

    this.commentLikeHandler = this.commentLikeHandler.bind(this);
  }

  async commentLikeHandler(request, h) {
    const commentLikesUseCase = this._container.getInstance(
      CommentLikesUseCase.name
    );

    const { id: userId } = request.auth.credentials;
    const { threadId, commentId } = request.params;

    await commentLikesUseCase.execute(userId, threadId, commentId);

    const response = h.response({
      status: 'success',
    });

    response.code(200);
    return response;
  }
}

module.exports = LikesHandler;
