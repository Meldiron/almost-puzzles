import { Client, Account, Databases, Query, ID } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://appwrite.puzzles.almostapps.eu/v1').setProject('almost-puzzles');

export const account = new Account(client);
export const databases = new Databases(client);

export const Backend = {
	async getAccount() {
		return await account.get();
	},
	async logout() {
		return await account.deleteSession('current');
	},
	async getAllFinishes(userId: string) {
		const response = await databases.listDocuments('main', 'finishes', [
			Query.equal('userId', userId),
			Query.limit(1000), // TODO: Pagination
			Query.orderDesc('$id')
		]);

		return response.documents;
	},
	async getFinishes(userId: string, gameId: string, mode: string, year: number) {
		const response = await databases.listDocuments('main', 'finishes', [
			Query.equal('userId', userId),
			Query.equal('gameId', gameId),
			Query.equal('mode', mode),
			Query.equal('year', year),
			Query.limit(1),
			Query.orderDesc('$id')
		]);

		if (response.documents.length > 0) {
			return response.documents[0];
		}

		const doc = await databases.createDocument('main', 'finishes', ID.unique(), {
			userId,
			gameId,
			mode,
			year,
			levels: []
		});

		return doc;
	},
	async addFinish(
		userId: string,
		gameId: string,
		mode: string,
		year: number,
		month: number,
		day: number
	) {
		const current = await this.getFinishes(userId, gameId, mode, year);

		const key = `${month}-${day}`;
		if (!current.levels.includes(key)) {
			current.levels.push(key);
		}

		if (
			year === new Date().getFullYear() &&
			month === new Date().getMonth() + 1 &&
			day === new Date().getDate()
		) {
			if (!current.levelsSameDay.includes(key)) {
				current.levelsSameDay.push(key);
			}
		}

		return await databases.updateDocument('main', 'finishes', current.$id, {
			levels: current.levels,
			levelsSameDay: current.levelsSameDay
		});
	}
};
