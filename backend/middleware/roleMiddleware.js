module.exports = (roles) => {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      console.log('Unauthorized');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if user role is in the allowed roles
    if (!roles.includes(req.userRole)) {
      console.log('Forbidden');
      return res.status(403).json({ error: 'Forbidden' });
    }

    // User role is valid, proceed to the next middleware or route handler
    next();
  };
};
