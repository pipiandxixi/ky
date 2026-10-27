import type {KyRequest} from '../types/request.js';
import {KyError} from './KyError.js';
import type {TimeoutOptions} from '../utils/timeout.js';

/**
Error thrown when the request times out. It has a `request` property with the `Request` object.
*/
export class TimeoutError extends KyError {
	override name = 'TimeoutError';
	request: KyRequest;
	/**
	The timeout that was exceeded, in milliseconds.
	*/
	timeout?: TimeoutOptions['timeout'];

	constructor(request: Request, timeout?: TimeoutOptions['timeout']) {
		super(`Request timed out: ${request.method} ${request.url}`);
		this.request = request;
		this.timeout = timeout;
	}
}
