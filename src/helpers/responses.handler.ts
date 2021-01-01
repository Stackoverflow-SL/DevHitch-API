// failed response format
function failed(errorCode: string, statusCode: number = 400) {
  return {
    success: false,
    errorCode,
    statusCode,
  };
}

// success response format
function success(message) {
  return {
    success: true,
    message,
  };
}

// success response format
function successWithPayload(message, data) {
  return {
    success: true,
    data,
    message,
  };
}

export { failed, success, successWithPayload };
