const AddCommentReplies = require('../AddCommentReplies');

describe('a AddCommentReplies entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = 2122024;

    // Action and Assert
    expect(() => new AddCommentReplies(payload)).toThrow(
      'ADD_COMMENT_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 1,
    };

    // Action and Assert
    expect(() => new AddCommentReplies(payload)).toThrow(
      'ADD_COMMENT_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create AddCommentReplies object correctly', () => {
    // Arrange
    const payload = {
      content: 'test comment replies',
    };

    // Action
    const comment = new AddCommentReplies(payload);

    // Assert
    expect(comment.content).toEqual(payload.content);
  });
});
