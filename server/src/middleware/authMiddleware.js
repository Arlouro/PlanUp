export const isAuthenticated = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  }
  response.status(401).json({ message: 'Unauthorized: Please log in first.' });
};
