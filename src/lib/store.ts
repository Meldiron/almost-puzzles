import { writable } from 'svelte/store';

export const isQuickPlay = writable(false);

export const quickPlayCloseAt = writable(0);
