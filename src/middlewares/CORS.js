exports.setCORSHeaders = function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3001');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
};

//"GET, POST, PATCH, DELETE, OPTIONS, PUT"