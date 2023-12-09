import { Storage } from '@google-cloud/storage';
import { randomUUID } from 'crypto';

export const createSuccessResponse = (body: object, message: string) => {
	return {
		success: true,
		data: body,
		message,
	};
};

export const createErrorResponse = (message: string) => {
	return {
		success: false,
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

export const uploadImage = (file, folder: string) =>
	new Promise((resolve, reject) => {
		const storage = new Storage({
			keyFilename: 'key.json',
			projectId: 'bangkit-breeze',
		});
		const bucketName = 'bangkit-breeze';
		const bucket = storage.bucket(bucketName);

		const { originalname, buffer } = file;
		const blob = bucket.file(
			`${folder}/${randomUUID()}-${originalname.replace(/ /g, '_')}`
		);
		const blobStream = blob.createWriteStream({
			resumable: false,
		});
		blobStream
			.on('finish', () => {
				const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
				resolve(publicUrl);
			})
			.on('error', () => {
				reject('Fail to upload image');
			})
			.end(buffer);
	});
