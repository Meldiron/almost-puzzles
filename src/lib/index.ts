export const playUrl = 'https://simon-tatham-puzzles.surge.sh';

export const Games = {
	ascent: {
		name: 'Ascent',
		image: 'TODO: Add image',
		defaultMode: 'normal',
		modes: {
			easy: {
				name: 'Easy',
				config: '4x4mRdn'
			},
			normal: {
				name: 'Normal',
				config: '5x5mRdn'
			},
			hard: {
				name: 'Hard',
				config: '6x6mRdn'
			}
		}
	},
	boats: {
		name: 'Boats',
		image: 'TODO: Add image',
		defaultMode: 'normal',
		modes: {
			easy: {
				name: 'Easy',
				config: '4x4f3de,2,1,0'
			},
			normal: {
				name: 'Normal',
				config: '5x5f3de,3,2,1'
			},
			hard: {
				name: 'Hard',
				config: '6x6f3de,3,2,1'
			}
		}
	}
};

/*
'Boats',
'Filling',
'Guess',
'Inertia',
'Lightup',
'Loopy',
'Mines',
'Net',
'Untangle'
*/
