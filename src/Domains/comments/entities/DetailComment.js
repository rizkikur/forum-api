class DetailComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, username, date, content, likeCount, replies } =
      this._mapPayload(payload);

    this.id = id;
    this.username = username;
    this.date = date;
    this.content = content;
    this.likeCount = likeCount;
    this.replies = replies;
  }

  _verifyPayload({ id, username, date, content, likeCount, replies }) {
    if (
      !id ||
      !username ||
      !date ||
      !content ||
      likeCount === undefined ||
      !replies
    ) {
      throw new Error('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof username !== 'string' ||
      typeof date !== 'string' ||
      typeof content !== 'string' ||
      typeof likeCount !== 'number' ||
      !Array.isArray(replies)
    ) {
      throw new Error('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  _mapPayload({ id, username, date, content, replies, is_delete, likeCount }) {
    return {
      id,
      username,
      date,
      content: is_delete ? '**komentar telah dihapus**' : content,
      likeCount,
      replies,
    };
  }
}

module.exports = DetailComment;
