const AddedThread = require('../AddedThread');

describe('a AddedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'thread-1234',
      title: 'test Title',
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrow(
      'ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange

    const payload = {
      id: 'thread-123',
      title: 'test Title',
      owner: 1,
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrow(
      'ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create addedThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'test Title',
      owner: 'user-123',
    };

    // Action
    const addedThread = new AddedThread(payload);

    // Assert
    expect(addedThread.id).toStrictEqual(payload.id);
    expect(addedThread.title).toStrictEqual(payload.title);
    expect(addedThread.owner).toStrictEqual(payload.owner);
  });
});
