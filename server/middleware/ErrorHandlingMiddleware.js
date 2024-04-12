const ApiError = require('../errors/APIError')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message}) //Мы поняли в чем дело
    }
    return res.status(500).json({message: "Unpredicted error!"}) //Ме не поняли в чем дело
}