const AddedCommentReplies = require('../AddedCommentReplies');

describe('a AddedCommentReplies entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'reply-124',
      owner: 'user-124',
    };

    // Action and Assert
    expect(() => new AddedCommentReplies(payload)).toThrow(
      'ADDED_COMMENT_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'reply-124',
      content: 'test comment replies',
      owner: 2122024,
    };

    // Action and Assert
    expect(() => new AddedCommentReplies(payload)).toThrow(
      'ADDED_COMMENT_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create AddedReply object correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-124',
      content: 'Nice article!',
      owner: 'user-124',
    };

    // Action
    const AddedComment = new AddedCommentReplies(payload);

    // Assert
    expect(AddedComment.id).toEqual(payload.id);
    expect(AddedComment.content).toEqual(payload.content);
    expect(AddedComment.owner).toEqual(payload.owner);
  });
});
