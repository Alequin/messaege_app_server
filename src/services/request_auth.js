const requestAuth = function (req, res, next) {
  const authKey = req.get(process.env.AUTH_TITLE);
  if(authKey === process.env.AUTH_KEY) {
    next();
  } else {
    res.status(401);
    res.send(process.env.AUTH_TITLE + " | " + process.env.AUTH_KEY);
  }
}

module.exports = requestAuth;
