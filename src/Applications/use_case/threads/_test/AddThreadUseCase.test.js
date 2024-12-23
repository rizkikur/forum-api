const AddThreadUseCase = require('../AddThreadUseCase');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const AddThread = require('../../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../../Domains/threads/entities/AddedThread');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    const useCasePayload = {
      title: 'test Title',
      body: 'test Body',
    };

    const mockUser = { id: 'user-124' };
    const mockAddedThread = new AddedThread({
      id: 'thread-124',
      title: useCasePayload.title,
      owner: mockUser.id,
    });

    const mockThreadRepository = new ThreadRepository();

    // mockThreadRepository.addThread = jest
    //   .fn()
    //   .mockImplementation(() => Promise.resolve(mockAddedThread));

    mockThreadRepository.addThread = jest.fn(() =>
      Promise.resolve(mockAddedThread)
    );

    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const addedThread = await addThreadUseCase.execute(
      mockUser.id,
      useCasePayload
    );

    expect(addedThread).toEqual(
      new AddedThread({
        id: 'thread-124',
        owner: mockUser.id,
        title: useCasePayload.title,
      })
    );

    expect(mockThreadRepository.addThread).toBeCalledWith(
      mockUser.id,
      new AddThread({
        title: useCasePayload.title,
        body: useCasePayload.body,
      })
    );
  });
});
