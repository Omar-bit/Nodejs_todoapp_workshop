const jwt = require('jsonwebtoken');
async function authMiddleware(req, res, next) {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.json({
      message: 'unauthorized',
      ok: false,
    });
  }
  try {
    const decoded = jwt.verify(accessToken, 'SECRET');
    req.user = decoded;
    next();
  } catch (err) {
    res.json({
      message: 'unauthorized',
      ok: false,
    });
    console.log(err);
  }
}
module.exports = authMiddleware;
