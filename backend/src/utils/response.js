const { HttpStatusCode, ErrorCode, ErrorMessage } = require("./http.helper");


const safeResponse = (res, { statusCode = 200, message = "Success", payload }) => {
    res.status(statusCode).json({
        message,
        data: Array.isArray(payload) ? [...payload] : { ...payload }
    });
};

const safeError = (res, error) => {
    console.log("error", { ...error })
    res.status(error.statusCode || HttpStatusCode.InternalServerError).json({
        message: error.message || ErrorMessage.UNKNOWN,
        code: error.code || ErrorCode.UNKNOWN,
        data: error || null
    });
};

module.exports = { safeError, safeResponse }