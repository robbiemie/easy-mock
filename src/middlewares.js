exports.successRate = rate => (req, res, next) => {
  if (rate > Math.random()) return next()
  return next(500)
}

exports.delayRes = time => (req, res, next) => {
  setTimeout(function() { next() }, time)
}

exports.jsonRes = () => (req, res, next) => {
  if (req.method === 'get') {
    res.setHeader('Content-Type', 'application/json')
  }
  next()
}

exports.crossDomain = (config) => (req, res, next) => {
  const {
    allowHeaders = '',
    withCredentials = true
  } = config
  const baseHeader = "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  if (withCredentials) {
    res.header('Access-Control-Allow-Credentials', 'true')
  }
  res.header("Access-Control-Allow-Headers", allowHeaders ? `${baseHeader}, ${allowHeaders}` : baseHeader);

  if (req.method === 'OPTIONS') res.status(200)
  next();
}
