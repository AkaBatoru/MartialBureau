class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message) { //Not found
        return new ApiError(404, message) 
    }

    static internal(message) { //Запрос не обработан
        return new ApiError(500, message)
    }

    static forbidden(message) { //Нет прав 
        return new ApiError(403, message)
    }
}

module.exports = ApiError