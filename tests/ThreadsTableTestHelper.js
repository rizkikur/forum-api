/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-124',
    title = 'helper thread title',
    body = 'helper thread body',
    created_at = new Date().toISOString(),
    owner = 'user-124',
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES ($1, $2, $3, $4, $5)',
      values: [id, title, body, created_at, owner],
    };

    await pool.query(query);
  },

  async verifyAvailableThread(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
  },
};

module.exports = ThreadsTableTestHelper;
