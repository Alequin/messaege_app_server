const requestAuth = function (req, res, next) {
  const derp = req.get('auth');
  if(derp === 'key') {
    next();
  } else {
    res.status(401);
    res.send('go away');
  }
}

module.exports = requestAuth;
