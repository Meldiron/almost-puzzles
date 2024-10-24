import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { Games } from '$lib';

export const load: PageLoad = ({ params }) => {
	const game = Games[params.gameId ?? ''];

	if (!game) {
		redirect(307, '/');
	}

	redirect(307, `/games/${params.gameId}/${game.defaultMode}`);
};
