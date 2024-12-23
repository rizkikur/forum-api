const routes = require('./routes');
const LikesHandler = require('./Handler');

module.exports = {
  name: 'likes',
  register: async (server, { container }) => {
    const likesHandler = new LikesHandler(container);
    server.route(routes(likesHandler));
  },
};
