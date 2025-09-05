export function getErrorMessage(status) {
  const messages = {
    400: 'Invalid request data.',
    401: 'Please log in to continue.',
    403: 'You don’t have permission to perform this action.',
    404: 'Resource not found.',
    409: 'Conflict: resource already exists.',
    422: 'Validation error: check your input.',
    500: 'Server error. Please try again later.',
    502: 'Bad gateway.',
    503: 'Service unavailable. Try again soon.',
    504: 'Request timeout.',
  };
  return messages[status] || 'Unexpected error occurred.';
}

export function handleApiError(error) {
  if (error.response) {
    const status = error.response.status;
    const message = getErrorMessage(status);
    return { status, message };
  } else if (error.request) {
    return { status: null, message: 'No response from server. Please check your network.' };
  } else {
    return { status: null, message: 'Unexpected error: ' + error.message };
  }
}
