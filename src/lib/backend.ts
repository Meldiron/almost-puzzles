// TODO: Real Appwrite

export const Backend = {
	async getFinishes(gameId: string, mode: string, year: number) {
		return JSON.parse(localStorage.getItem(`${gameId}-${mode}-${year}`) ?? '[]');
	},
	async addFinish(gameId: string, mode: string, year: number, month: number, day: number) {
		const current = await this.getFinishes(gameId, mode, year);
		const key = `${month}-${day}`;

		if (current.includes(key)) {
			return;
		}

		current.push(key);
		localStorage.setItem(`${gameId}-${mode}-${year}`, JSON.stringify(current));
	}
};
