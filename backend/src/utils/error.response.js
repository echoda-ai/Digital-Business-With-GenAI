const { ErrorCode, ErrorMessage, HttpStatusCode } = require("../utils/http.util");

class ErrorResponse {
    static PlasgateError(code, message) {
        return {
            statusCode: code,
            code: "PLASGATE_ERROR",
            message: message
        };
    }

    static CustomError(code, shortCode, message) {
        return {
            statusCode: code,
            code: (shortCode && shortCode.trim() !== "") ? shortCode : "CUSTOM_ERROR",
            message: message
        };
    }

    static NoRecordFound = {
        statusCode: HttpStatusCode.NotFound,
        code: ErrorCode.NO_RECORD_FOUND,
        message: ErrorMessage.NO_RECORD_WITH_PROVIDED_INFO
    };

    static AlreadyDeleted = {
        statusCode: HttpStatusCode.BadRequest,
        code: ErrorCode.NO_RECORD_FOUND,
        message: ErrorMessage.RECORD_HAS_ALREADY_DELETED
    };

    static NoPermissionAccessApi = {
        statusCode: HttpStatusCode.Unauthorized,
        code: ErrorCode.NO_PERMISSION_ACCESS_API,
        message: ErrorMessage.NO_PERMISSION_ACCESS_API
    };

    static Unauthorized = {
        statusCode: HttpStatusCode.Unauthorized,
        code: ErrorCode.UNAUTHORIZED,
        message: ErrorMessage.UNAUTHORIZED
    };

    static ValidationError = {
        statusCode: 422,
        code: "VALIDATION_FAIL",
        message: "Invalid parameters"
    };

    static OtpLimitedRequest = {
        statusCode: 429,
        code: "LIMIT_OTP_REQUEST",
        message: "You've reached maximum request per day"
    };

    static RequestLimit = {
        statusCode: 429,
        code: "TOO_MANY_REQUEST",
        message: "Too Many Requests"
    };

    static InvalidOtpCode = {
        statusCode: 400,
        code: "INVALID_OTP_CODE",
        message: "Invalid OTP code"
    };

    static InvalidOtpToken = {
        statusCode: 400,
        code: "_OTP_TOKEN",
        message: "Invalid verification token"
    };

    static OtpCodeExpired = {
        statusCode: 400,
        code: "OTP_CODE_EXPIRED",
        message: "OTP code was expired"
    };

    static PhoneVerified = {
        statusCode: 400,
        code: "PHONE_VERIFIED",
        message: "Phone number already verified"
    };

    static OtpVerificationFailed = {
        statusCode: 500,
        code: "OTP_FAIL_VERIFY",
        message: "Otp verification failed"
    };

    static InvalidRedisConnection = {
        statusCode: 500,
        code: ErrorCode.INVALID_REDIS_CONNECTION,
        message: ErrorMessage.INVALID_REDIS_CONNECTION
    };

    static RedisClientNotInitialized = {
        statusCode: 500,
        code: ErrorCode.INVALID_REDIS_CONNECTION,
        message: ErrorMessage.INVALID_REDIS_CONNECTION
    };

    static RedisOperationFailed = {
        statusCode: 500,
        code: ErrorCode.REDIS_OPERATION_FAILED,
        message: ErrorMessage.REDIS_OPERATION_FAILED
    };

    static UnknownError = {
        statusCode: HttpStatusCode.InternalServerError,
        code: ErrorCode.UNKNOWN,
        message: ErrorMessage.UNKNOWN
    };

    static InvalidLoginSession = {
        statusCode: HttpStatusCode.Unauthorized,
        code: ErrorCode.UNAUTHORIZED,
        message: ErrorMessage.INVALID_LOGIN_SESSION
    };
}

module.exports = ErrorResponse;