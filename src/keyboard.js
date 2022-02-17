const kb = require('./keyboard-buttons');

module.exports = {
  createPost: [[kb.createPost]],
  sendPost: [[kb.sendPost], [kb.deleteDraftPost]],
  empty: [[]],
};
