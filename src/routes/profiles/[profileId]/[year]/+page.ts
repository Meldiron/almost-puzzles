import { Backend } from '$lib/backend';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	if (params.profileId === 'me') {
		const data = await parent();
		redirect(307, `/profiles/${data.user.$id}`);
	}

	const currentYear = new Date().getFullYear();
	if (+params.year < 2014) {
		redirect(307, `/profiles/${params.profileId}/2014`);
	} else if (+params.year > currentYear) {
		redirect(307, `/profiles/${params.profileId}/${currentYear}`);
	}

	const finishes = await Backend.getAllFinishes(params.profileId ?? '');

	return {
		finishes,
		year: +params.year,
		profileId: params.profileId
	};
};
