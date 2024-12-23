class DetailCommentReplies {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, content, date, username } = this._mapPayload(payload);

    this.id = id;
    this.content = content;
    this.date = date;
    this.username = username;
  }

  _verifyPayload({ id, content, date, username }) {
    if (!id || !content || !date || !username) {
      throw new Error('DETAIL_COMMENT_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof content !== 'string' ||
      typeof date !== 'string' ||
      typeof username !== 'string'
    ) {
      throw new Error(
        'DETAIL_COMMENT_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION'
      );
    }
  }

  _mapPayload({ id, content, date, username, is_delete }) {
    return {
      id,
      content: is_delete ? '**balasan telah dihapus**' : content,
      date,
      username,
    };
  }
}

module.exports = DetailCommentReplies;
