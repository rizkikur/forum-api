const DetailThread = require('../../../Domains/threads/entities/DetailThread');
const DetailComment = require('../../../Domains/comments/entities/DetailComment');
const DetailReplies = require('../../../Domains/commentReplies/entities/DetailCommentReplies');

class GetDetailThreadUseCase {
  constructor({
    threadRepository,
    userRepository,
    commentRepository,
    commentRepliesRepository,
    commentLikesRepository,
  }) {
    this._threadRepository = threadRepository;
    this._userRepository = userRepository;
    this._commentRepository = commentRepository;
    this._commentRepliesRepository = commentRepliesRepository;
    this._commentLikesRepository = commentLikesRepository;
  }

  async execute(threadId) {
    const threadFromId = await this._threadRepository.getThreadById(threadId);

    const thread = new DetailThread({
      id: threadFromId.id,
      title: threadFromId.title,
      body: threadFromId.body,
      date: threadFromId.created_at.toString(),
      username: threadFromId.username,
      comments: [],
    });

    const commentsInThread = await this._commentRepository.getCommentByThreadId(
      threadId
    );

    if (commentsInThread.length > 0) {
      const likesResult = await this._commentLikesRepository.getLikesByThreadId(
        threadId
      );
      const likeCount = (commentId) =>
        likesResult.filter((like) => like.comment_id === commentId).length;

      const detailComments = await Promise.all(
        commentsInThread.map(async (comment) => {
          const detailComment = new DetailComment({
            id: comment.id,
            username: comment.username,
            date: comment.created_at.toString(),
            content: comment.content,
            likeCount: likeCount(comment.id),
            replies: [],
            is_delete: comment.is_delete,
          });

          const repliesInComment =
            await this._commentRepliesRepository.getRepliesByCommentId(
              comment.id
            );

          if (repliesInComment.length > 0) {
            const detailReplies = await Promise.all(
              repliesInComment.map(
                async (reply) =>
                  new DetailReplies({
                    id: reply.id,
                    content: reply.content,
                    date: reply.created_at.toString(),
                    username: reply.username,
                    is_delete: reply.is_delete,
                  })
              )
            );

            detailComment.replies.push(...detailReplies);
          }

          return detailComment;
        })
      );

      thread.comments.push(...detailComments);
    }

    return thread;
  }
}

module.exports = GetDetailThreadUseCase;
