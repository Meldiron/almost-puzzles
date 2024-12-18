export const playUrl = 'https://simon-tatham-puzzles.surge.sh';

export type Mode = {
	name: string;
	config: string;
};

export type Game = {
	keys?: string[];
	name: string;
	defaultMode: string;
	modes: { [key: string]: Mode };
};

export const Games: { [key: string]: Game } = {
	ascent: {
		name: 'Ascent',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '3x3mRdn'
			},
			normal: {
				name: 'Normal',
				config: '4x4mRdn'
			},
			hard: {
				name: 'Hard',
				config: '5x5mRdn'
			}
		}
	},
	boats: {
		name: 'Boats',
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
		keys: ['12345', '67890'],
		name: 'Filling',
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
	lightup: {
		name: 'Light Up',
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
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '3x3t0de'
			},
			normal: {
				name: 'Normal',
				config: '3x4t0de'
			},
			hard: {
				name: 'Hard',
				config: '4x4t0de'
			}
		}
	},
	mines: {
		name: 'Mines',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '6x6n6'
			},
			normal: {
				name: 'Normal',
				config: '7x7n10'
			},
			hard: {
				name: 'Hard',
				config: '8x8n15'
			}
		}
	},
	net: {
		name: 'Net',
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
	flip: {
		name: 'Flip',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '3x3c'
			},
			normal: {
				name: 'Normal',
				config: '3x4c'
			},
			hard: {
				name: 'Hard',
				config: '4x4c'
			}
		}
	},
	mosaic: {
		name: 'Mosaic',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '3x3'
			},
			normal: {
				name: 'Normal',
				config: '4x4'
			},
			hard: {
				name: 'Hard',
				config: '5x5'
			}
		}
	},
	pattern: {
		name: 'Pattern',
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
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '4x4de'
			},
			normal: {
				name: 'Normal',
				config: '5x5de'
			},
			hard: {
				name: 'Hard',
				config: '6x6de'
			}
		}
	},
	unruly: {
		name: 'Unruly',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '6x6dt'
			},
			normal: {
				name: 'Normal',
				config: '6x8dt'
			},
			hard: {
				name: 'Hard',
				config: '8x8dt'
			}
		}
	},
	solo: {
		keys: ['12345', '67890'],
		name: 'Solo',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '2x2a'
			},
			normal: {
				name: 'Normal',
				config: '2x2ka'
			},
			hard: {
				name: 'Hard',
				config: '2x3adb'
			}
		}
	},
	unequal: {
		keys: ['123450'],
		name: 'Unequal',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '3de'
			},
			normal: {
				name: 'Normal',
				config: '4de'
			},
			hard: {
				name: 'Hard',
				config: '5adt'
			}
		}
	},
	rect: {
		name: 'Rectangle',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '5x5'
			},
			normal: {
				name: 'Normal',
				config: '6x6'
			},
			hard: {
				name: 'Hard',
				config: '7x7'
			}
		}
	},
	range: {
		name: 'Range',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '3x3'
			},
			normal: {
				name: 'Normal',
				config: '3x4'
			},
			hard: {
				name: 'Hard',
				config: '4x4'
			}
		}
	},
	singles: {
		name: 'Singles',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '3x3de'
			},
			normal: {
				name: 'Normal',
				config: '4x4de'
			},
			hard: {
				name: 'Hard',
				config: '5x5de'
			}
		}
	},
	tracks: {
		name: 'Tracks',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '4x4de'
			},
			normal: {
				name: 'Normal',
				config: '4x5de'
			},
			hard: {
				name: 'Hard',
				config: '5x5de'
			}
		}
	},
	sixteen: {
		name: 'Sixteen',
		defaultMode: 'easy',
		modes: {
			easy: {
				name: 'Easy',
				config: '3x3'
			},
			normal: {
				name: 'Normal',
				config: '3x4'
			},
			hard: {
				name: 'Hard',
				config: '4x4'
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
