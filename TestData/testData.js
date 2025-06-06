module.exports = {
  validCredentials: {
    username: 'jorgedlc81@gmail.com',
    password: 'Passw0rd!'
  },
  invalidCredentials: {
    username: 'wrong.user@example.com',
    password: 'wrongpass123'
  },
  emptyCredentials: {
    username: '',
    password: ''
  },
  edgeCases: {
    shortPassword: '123',
    specialCharsUsername: 'user<>@test.com'
  }
};