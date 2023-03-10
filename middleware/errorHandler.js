const errorHandler = (err, req, res, next) => {
    logEvents(
        `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
        'errLog.log'
    );

    const status = res.statusCode ? res.statusCode : 500; // server error
    // isError: this is needed from FE RTK query apiSlices; so if there is any unexpected error, the RTK query would catch the isError
    res.status(status).json({ message: err.message, isError: true });
    next(err);
};

module.exports = errorHandler;
