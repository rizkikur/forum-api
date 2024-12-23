const AddedComment = require('../AddedComment');

describe('a AddedComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange

    const payload = {
      id: 'thread-123',
      title: 'This is title',
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrow(
      'ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange

    const payload = {
      id: 'thread-124',
      content: 'Test Title',
      owner: 1,
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrow(
      'ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create AddedComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-124',
      content: 'test comment',
      owner: 'user-124',
    };

    // Action
    const addedComment = new AddedComment(payload);

    // Assert
    expect(addedComment.id).toEqual(payload.id);
    expect(addedComment.content).toEqual(payload.content);
    expect(addedComment.owner).toEqual(payload.owner);
  });
});
