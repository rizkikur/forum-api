const DetailComment = require('../DetailComment');

describe('a DetailComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'comment-124',
      date: '2024-11-24T16:10:31.288Z',
      content: 'test a comment',
      likeCount: 0,
    };

    expect(() => new DetailComment(payload)).toThrowError(
      'DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'comment-124',
      username: 'user-124',
      date: '2024-11-24T16:10:31.288Z',
      content: 1,
      likeCount: 0,
      replies: 'not an array',
    };

    expect(() => new DetailComment(payload)).toThrowError(
      'DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should remap payload when content is deleted', () => {
    const payload = {
      id: 'comment-124',
      username: 'user-124',
      date: '2024-11-24T16:10:31.288Z',
      content: 'This is a comment',
      replies: ['reply1', 'reply2'],
      likeCount: 0,
      is_delete: true,
    };

    const { id, username, date, content, likeCount, replies } =
      new DetailComment(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(date).toEqual(payload.date);
    expect(content).toEqual('**komentar telah dihapus**');
    expect(replies).toEqual(payload.replies);
    expect(likeCount).toEqual(payload.likeCount);
  });

  it('should correctly handle valid payload and create a DetailComment instance', () => {
    const payload = {
      id: 'comment-124',
      username: 'user-124',
      date: '2024-11-24T16:10:31.288Z',
      content: 'This is a comment',
      replies: ['reply1', 'reply2'],
      is_delete: false,
      likeCount: 5,
    };

    const comment = new DetailComment(payload);

    expect(comment.id).toEqual('comment-124');
    expect(comment.username).toEqual('user-124');
    expect(comment.date).toEqual('2024-11-24T16:10:31.288Z');
    expect(comment.content).toEqual('This is a comment');
    expect(comment.replies).toEqual(['reply1', 'reply2']);
    expect(comment.likeCount).toEqual(5);
  });
});
