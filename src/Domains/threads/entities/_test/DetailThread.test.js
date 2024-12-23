const DetailThread = require('../DetailThread');

describe('a DetailThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'test Detail Thread',
      body: 'Test Body Detail Thread',
      date: '',
      username: 'user',
    };

    // Action and Assert
    expect(() => new DetailThread(payload)).toThrow(
      'DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'thread-123',
      title: 'test Detail Thread',
      body: 'Test Body Detail Thread',
      date: '2024-11-25T12:15:30.338Z',
      username: 'user-124',
      comments: 'Test comment',
    };

    // Action and Assert
    expect(() => new DetailThread(payload)).toThrow(
      'DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create DetailThread object correctly', () => {
    const payload = {
      id: 'thread-123',
      title: 'test Detail Thread',
      body: 'Test Body Detail Thread',
      date: '2024-11-25T12:15:30.338Z',
      username: 'user-124',
      comments: [],
    };

    // Action
    const {
      id, title, body, date, username, comments,
    } = new DetailThread(
      payload,
    );

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
    expect(comments).toEqual(payload.comments);
  });
});
