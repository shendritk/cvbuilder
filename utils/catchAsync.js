/**
 * @description Handle errors by wrapping a middleware function with this function,
 *  instead of putting it inside a try/catch block.
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => next(error));
  };
};

module.exports = catchAsync;
