const routes = require('./routes');
const CommentRepliesHandler = require('./handler');

module.exports = {
  name: 'replies',
  register: async (server, { container }) => {
    const commentRepliesHandler = new CommentRepliesHandler(container);
    server.route(routes(commentRepliesHandler));
  },
};
