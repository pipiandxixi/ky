import type {Ky} from '../core/Ky.js';
import type {KyHeadersInit} from '../types/options.js';

/**
One completed request attempt, as passed to the `log` option.
*/
export type LogEntry = {
	method: string;
	url: string;
	status: number;
	durationMs: number;
	retryCount: number;
	headers: Record<string, string>;
};

const toPlainHeaders = (source: KyHeadersInit = {}): Record<string, string> => {
	const result = new globalThis.Headers(source as RequestInit['headers']);
	const plain: Record<string, string> = {};

	for (const [key, value] of result.entries()) {
		if (value === undefined) {
			result.delete(key);
		} else {
			plain[key] = value;
		}
	}

	return plain;
};

export const createLogEntry = (ky: Ky, request: Request, response: Response, startedAt: number): LogEntry => ({
	method: request.method,
	url: request.url,
	status: response.status,
	durationMs: Date.now() - startedAt,
	retryCount: ky.retryCount,
	headers: toPlainHeaders(request.headers),
});
