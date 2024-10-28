export const playUrl = 'https://simon-tatham-puzzles.surge.sh';

export const Games = {
	ascent: {
		name: 'Ascent',
		image: 'TODO: Add image',
		defaultMode: 'easy',
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
		defaultMode: 'easy',
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
	},
	filling: {
		keys: '1234567890',
		name: 'Filling',
		image: 'TODO: Add image',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '4x4'
			},
			normal: {
				name: 'Normal',
				config: '4x5'
			},
			hard: {
				name: 'Hard',
				config: '5x5'
			}
		}
	},
	inertia: {
		name: 'Inertia',
		image: 'TODO: Add image',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '5x5'
			},
			normal: {
				name: 'Normal',
				config: '7x7'
			},
			hard: {
				name: 'Hard',
				config: '10x10'
			}
		}
	},
	lightup: {
		name: 'Light Up',
		image: 'TODO: Add image',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '5x5b20s0d0'
			},
			normal: {
				name: 'Normal',
				config: '6x6b20s0d0'
			},
			hard: {
				name: 'Hard',
				config: '7x7b20s0d0'
			}
		}
	},
	loopy: {
		name: 'Loopy',
		image: 'TODO: Add image',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '4x4'
			},
			normal: {
				name: 'Normal',
				config: '5x5'
			},
			hard: {
				name: 'Hard',
				config: '6x6'
			}
		}
	},
	mines: {
		name: 'Mines',
		image: 'TODO: Add image',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '6x6n6'
			},
			normal: {
				name: 'Normal',
				config: '9x9n15'
			},
			hard: {
				name: 'Hard',
				config: '13x13n25'
			}
		}
	},
	net: {
		name: 'Net',
		image: 'TODO: Add image',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '5x5'
			},
			normal: {
				name: 'Normal',
				config: '7x7'
			},
			hard: {
				name: 'Hard',
				config: '9x9'
			}
		}
	},
	flip: {
		name: 'Flip',
		image: 'TODO: Add image',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '3x3c'
			},
			normal: {
				name: 'Normal',
				config: '4x4c'
			},
			hard: {
				name: 'Hard',
				config: '5x5c'
			}
		}
	},
	mosaic: {
		name: 'Mosaic',
		image: 'TODO: Add image',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '4x4'
			},
			normal: {
				name: 'Normal',
				config: '6x6'
			},
			hard: {
				name: 'Hard',
				config: '8x8'
			}
		}
	},
	pattern: {
		name: 'Pattern',
		image: 'TODO: Add image',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '4x4'
			},
			normal: {
				name: 'Normal',
				config: '5x5'
			},
			hard: {
				name: 'Hard',
				config: '6x6'
			}
		}
	},
	tents: {
		name: 'Tents',
		image: 'TODO: Add image',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '5x5de'
			},
			normal: {
				name: 'Normal',
				config: '6x6de'
			},
			hard: {
				name: 'Hard',
				config: '7x7de'
			}
		}
	},
	unruly: {
		name: 'Unruly',
		image: 'TODO: Add image',
		defaultMode: 'normal',
		modes: {
			normal: {
				name: 'Normal',
				config: '6x6dt'
			},
			hard: {
				name: 'Hard',
				config: '8x8dt'
			}
		}
	},
	solo: {
		keys: '1234567890',
		name: 'Solo',
		image: 'TODO: Add image',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '2x2a'
			},
			normal: {
				name: 'Normal',
				config: '2x3adb'
			},
			hard: {
				name: 'Hard',
				config: '3x3adb'
			}
		}
	},
	unequal: {
		keys: '123450',
		name: 'Unequal',
		image: 'TODO: Add image',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '4de'
			},
			normal: {
				name: 'Normal',
				config: '5de'
			},
			hard: {
				name: 'Hard',
				config: '6de'
			}
		}
	}
};

export function isInFuture(year: number, month: number, day: number) {
	const now = Date.now();
	const futureNow = new Date(year, month - 1, day).getTime();
	return futureNow > now;
}

export function isLeapYear(year: number) {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
