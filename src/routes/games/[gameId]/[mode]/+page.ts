import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { Games } from '$lib';

export const load: PageLoad = ({ params }) => {
	const game = Games[params.gameId ?? ''];

	if (!game) {
		redirect(307, '/');
	}

	if (!game.modes[params.mode]) {
		redirect(307, '/games/' + params.gameId);
	}

	const year = new Date().getFullYear();

	redirect(307, `/games/${params.gameId}/${game.defaultMode}/${year}`);
};
