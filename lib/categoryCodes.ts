const categoryCodes: Record<string, Record<string, number>> = {
	Factbook: {
		value: 1,
		Overview: 100,
		History: 101,
		Geography: 102,
		Culture: 103,
		Politics: 104,
		Legislation: 105,
		Religion: 106,
		Military: 107,
		Economy: 108,
		International: 109,
		Trivia: 110,
		Miscellaneous: 111,
	},
	Bulletin: {
		value: 3,
		Policy: 305,
		News: 315,
		Opinion: 325,
		Campaign: 385,
	},
	Account: {
		value: 5,
		Military: 505,
		Trade: 515,
		Sport: 525,
		Drama: 535,
		Diplomacy: 545,
		Science: 555,
		Culture: 565,
		Other: 595,
	},
	Meta: {
		value: 8,
		Gameplay: 835,
		Reference: 845,
	},
};

export default categoryCodes;
