import { fetchUser, fetchLatestData } from '$lib/server/db/queries';
import { json } from '@sveltejs/kit';

export function GET() {
	return json(fetchLatestData());
}