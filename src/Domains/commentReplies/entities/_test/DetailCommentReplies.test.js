const DetailCommentReplies = require('../DetailCommentReplies');

describe('a DetailCommentReplies entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'reply-124',
      content: 'test comment replies',
      username: 'tatang',
    };

    // Action and Assert
    expect(() => new DetailCommentReplies(payload)).toThrow(
      'DETAIL_COMMENT_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'reply-124',
      content: 'test comment replies',
      date: 2122024,
      username: 'yanto',
    };

    // Action and Assert
    expect(() => new DetailCommentReplies(payload)).toThrow(
      'DETAIL_COMMENT_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should remap payload when content is deleted', () => {
    // Arrange
    const payload = {
      id: 'reply-124',
      content: 'test comment replies',
      date: '2024-12-02T10:08:21.271Z',
      username: 'user-124',
      is_delete: true,
    };

    // Action
    const detailComment = new DetailCommentReplies(payload);

    // Assert
    expect(detailComment.id).toEqual(payload.id);
    expect(detailComment.content).toEqual('**balasan telah dihapus**');
    expect(detailComment.date).toEqual(payload.date);
    expect(detailComment.username).toEqual(payload.username);
  });

  it('should get detail comment replies correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-124',
      content: 'test comment replies',
      date: '2024-12-02T10:08:21.271Z',
      username: 'user-124',
      is_delete: false,
    };

    // Action
    const detailComment = new DetailCommentReplies(payload);

    // Assert
    expect(detailComment.id).toEqual(payload.id);
    expect(detailComment.content).toEqual(payload.content);
    expect(detailComment.date).toEqual(payload.date);
    expect(detailComment.username).toEqual(payload.username);
  });
});
