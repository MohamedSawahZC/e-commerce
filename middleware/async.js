module.exports = function asyncFuntion(routerHandler) {
  return async function (req, res, next) {
    try {
      //Login
      await routerHandler(req, res);
    } catch (error) {
      next(error);
    }
  };
};
