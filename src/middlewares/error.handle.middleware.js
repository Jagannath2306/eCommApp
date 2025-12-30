const logger =  require('../loggers/logger');

process.on("uncaughtException", (err) => {
    logger.error(err.message,err);
});

function handleError(err,req,res,next){
    try {
        logger.error(err.message,err);
        res.status(500).json({error: err.message || 'Something Went Wrong..' });
    } catch(error){
        next(error);
    }
}

module.exports =  handleError;