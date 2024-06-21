const ErrorCode = {
    EMAIL_EXIST: "EMAIL_EXIST",
    NO_RECORD_FOUND: "NO_RECORD_FOUND",
    INCORRECT_PASSWORD: "INCORRECT_PASSWORD",
    UNAUTHORIZED: "UNAUTHORIZED",
    UNKNOWN: "UNKNOWN",
};

const ErrorMessage = {
    EMAIL_EXIST: "Email already exist",
    INCORRECT_PASSWORD: "Incorrect password",
    INVALID_TOKEN: "Invalid access token",
    UNAUTHORIZED: "Unauthorized access",
    RECORD_HAS_ALREADY_DELETED: "The record has already been deleted",
    UNKNOWN: "Oops! something went wrong",
};

const HttpStatusCode = {
    // Informational
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,

    // Success
    OK: 200,
    Created: 201,
    Accepted: 202,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,

    // Redirection
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,

    // Client Errors
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    Conflict: 409,
    Gone: 410,
    PreconditionFailed: 412,
    UnsupportedMediaType: 415,
    UnprocessableEntity: 422,
    TooManyRequests: 429,

    // Server Errors
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HTTPVersionNotSupported: 505,
};

module.exports = { ErrorCode, ErrorMessage, HttpStatusCode };