import type { PageLoad } from './$types';
import { Backend } from '$lib/backend';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, parent }) => {
	const currentYear = new Date().getFullYear();
	redirect(307, `/profiles/${params.profileId}/${currentYear}`);
};
