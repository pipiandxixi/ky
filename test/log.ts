import test from 'ava';
import ky from '../source/index.js';

test('log receives each attempt', async t => {
	const entries: unknown[] = [];
	await ky('https://example.com/unicorn', {
		log: entry => entries.push(entry),
		fetch: async () => new Response('ok'),
	}).text();

	t.is(entries.length, 1);
});
