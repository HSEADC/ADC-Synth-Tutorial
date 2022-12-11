import './index.scss'

function importAll(r) {
  r.keys().forEach(r)
}

importAll(require.context('./samples/', true, /\.mp3$/))

Number.prototype.times = function (cb) {
  var i = -1

  while (++i < this) {
    cb(i)
  }

  return +this
}
