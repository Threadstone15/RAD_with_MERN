module.exports = (roles) => {
    return (req, res, next) => {
      console.log(`Checking role middleware for roles: ${roles}`);
      console.log(`req.user: ${req.user}`);

      // Check if user is authenticated
      if (!req.user) {
        console.log('Unauthorized');
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Check if user role is in the allowed roles
      if (!roles.includes(req.user)) {
        console.log('Forbidden');
        return res.status(403).json({ error: 'Forbidden' });
      }
      
      console.log('Role is valid, proceeding to next middleware or route handler');
      // User role is valid, proceed to the next middleware or route handler
      next();
    };
  };
