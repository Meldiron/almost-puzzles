import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { Backend } from '$lib/backend';

export const ssr = false;

export const load: LayoutLoad = async ({ params }) => {
	try {
		const user = await Backend.getAccount();
		return {
			user
		};
	} catch (err) {
		redirect(307, 'https://login.puzzles.almostapps.eu/');
	}
};
