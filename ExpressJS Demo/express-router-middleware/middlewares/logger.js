const apiLogger = (req, res, next) => {
    const apiRequestDate = new Date();
    console.log("New request at: ", apiRequestDate);
    next();
  };
  
  module.exports = apiLogger;
  