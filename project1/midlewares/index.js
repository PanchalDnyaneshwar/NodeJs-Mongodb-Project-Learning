const fs = require('fs');


function logResReq(filename) {
    return ((req, res, next) => {
        fs.appendFile(filename,
            `${Date.now()} : ${req.method} : ${req.path} \n`,
            (error, Data) => {
                if (error) console.log(error);
                next();
            })
    });
}

module.exports = {
    logResReq,
}