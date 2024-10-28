import type { PageLoad } from './$types';
import { Backend } from '$lib/backend';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, parent }) => {
	if (params.profileId === 'me') {
		const data = await parent();
		redirect(307, `/profiles/${data.user.$id}`);
	}

	const finishes = await Backend.getAllFinishes(params.profileId ?? '');

	return {
		finishes
	};
};
