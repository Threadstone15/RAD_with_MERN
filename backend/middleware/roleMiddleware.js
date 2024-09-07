module.exports = (roles) => {
  return (req, res, next) => {

    if (!req.user) {
      console.log('Unauthorized');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!roles.includes(req.userRole)) {
      console.log('Forbidden');
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
};
