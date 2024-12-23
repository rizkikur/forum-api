const autoBind = require('auto-bind');
const AddThreadUseCase = require('../../../../Applications/use_case/threads/AddThreadUseCase');
const GetDetailThreadUseCase = require('../../../../Applications/use_case/threads/GetDetailThreadUseCase');

class ThreadHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postThreadHandler(request, h) {
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const { id: ownerId } = request.auth.credentials;

    const addedThread = await addThreadUseCase.execute(
      ownerId,
      request.payload
    );

    const response = h.response({
      status: 'success',
      data: { addedThread },
    });
    response.code(201);
    return response;
  }

  async getThreadHandler(request, h) {
    const { threadId } = request.params;
    const getDetailThreadUseCase = this._container.getInstance(
      GetDetailThreadUseCase.name
    );

    const thread = await getDetailThreadUseCase.execute(threadId);

    const response = h.response({
      status: 'success',
      data: { thread },
    });
    return response;
  }
}
module.exports = ThreadHandler;
