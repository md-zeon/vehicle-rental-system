const ERROR_RESPONSE = (error: Error, message?: string) => {
	return {
		success: false,
		message: message || error.message,
		errors: error,
	};
};

const SUCCESS_RESPONSE = (data: unknown, message: string) => {
	return {
		success: true,
		message: message,
		data: data,
	};
};

export { ERROR_RESPONSE, SUCCESS_RESPONSE };
