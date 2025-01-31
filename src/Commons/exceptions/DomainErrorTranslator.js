const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'
  ),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat user baru karena tipe data tidak sesuai'
  ),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError(
    'tidak dapat membuat user baru karena karakter username melebihi batas limit'
  ),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError(
    'tidak dapat membuat user baru karena username mengandung karakter terlarang'
  ),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'harus mengirimkan username dan password'
  ),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'username dan password harus string'
  ),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('refresh token harus string'),
  'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat menambahkan thread baru karena properti yang dibutuhkan tidak ada'
  ),
  'ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat menambahkan thread baru karena tipe data tidak sesuai'
  ),
  'GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat mengambil thread karena properti yang dibutuhkan tidak ada'
  ),
  'GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATIONS': new InvariantError(
    'tidak dapat mengambil thread karena tipe data tidak sesuai'
  ),
  'ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat menambahkan comment baru karena properti yang dibutuhkan tidak ada'
  ),
  'DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat mengambil thread karena properti yang dibutuhkan tidak ada'
  ),
  'DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat mengambil thread karena tipe data tidak sesuai'
  ),
  'ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat menambahkan comment baru karena tipe data tidak sesuai'
  ),
  'DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat mengambil comment karena properti yang dibutuhkan tidak ada'
  ),
  'DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat mengambil comment karena tipe data tidak sesuai'
  ),
  'ADD_COMMENT_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat menambahkan comment replies baru karena properti yang dibutuhkan tidak ada'
  ),
  'ADD_COMMENT_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat menambahkan comment replies baru karena tipe data tidak sesuai'
  ),
  'DETAIL_COMMENT_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat mengambil comment replies karena properti yang dibutuhkan tidak ada'
  ),
  'DETAIL_COMMENT_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat mengambil comment replies karena tipe data tidak sesuai'
  ),
};

module.exports = DomainErrorTranslator;
