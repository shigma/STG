const path = require('path')

function resolve(...paths) {
  return path.join(__dirname, '..', ...paths)
}

module.exports = {
  resolve,
}
