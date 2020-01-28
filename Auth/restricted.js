function restricted(req, res, next) {
 
  if (req.session && req.session.user) {
    next()
  } else {
    res.status(401).json({ message: 'No session cookies' });
  }
}

module.exports = restricted;