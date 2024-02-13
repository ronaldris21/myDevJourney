const notFound = (req, res, next) => {
  console.log("notFound----------------------------------------");
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

///Middleware de tipo error
const errorHandler = (err, req, res, next) => {
  console.log("errorHandler----------------------------------------");
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
    status: statusCode
  });
};


function logErrors (err,req,res,next){
  console.log("logErrors----------------------------------------");
  console.log(err);
  next(err);
}


export { notFound, errorHandler, logErrors };
