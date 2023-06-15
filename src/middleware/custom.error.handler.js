class CustomErrorHandler {
  constructor(statusCode, msg) {
    this.statusCode = statusCode;
    this.message = msg;
  }

  static notFound(statusCode, msg = "404 Not Found") {
    return new CustomErrorHandler(statusCode, msg);
  }
}

export default CustomErrorHandler;
