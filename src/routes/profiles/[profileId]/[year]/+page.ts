import { Backend } from '$lib/backend';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	if (params.profileId === 'me') {
		const data = await parent();
		redirect(307, `/profiles/${data.user.$id}`);
	}

	const finishes = await Backend.getAllFinishes(params.profileId ?? '');

	return {
		finishes,
		year: +params.year,
		profileId: params.profileId
	};
};
