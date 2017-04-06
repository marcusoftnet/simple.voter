const views = require('co-views')
const path = require('path')
const viewpath = path.join(__dirname, '/../views')

console.log(viewpath)


module.exports = views(viewpath, {
  map: { html: 'swig' }
})
