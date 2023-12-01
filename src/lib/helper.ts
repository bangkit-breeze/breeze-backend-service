export const createSuccessResponse = (body: object, message: string) => {
	return {
		status: 'success',
		data: body,
		message,
	};
};

export const createErrorResponse = (message: string) => {
	return {
		status: 'error',
		data: null,
		message,
	};
};

export const validate = (schema) => (req, res, next) => {
	try {
		schema.parse({
			body: req.body,
			query: req.query,
			params: req.params,
		});

		next();
	} catch (err) {
		res.status(400).json(createErrorResponse(err.errors));
	}
};
