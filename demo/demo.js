const path = require('path')
const easyMock = require('..')

new easyMock({
  path: path.join(__dirname, './mock.config.js')
})
