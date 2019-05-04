export enum Alignment {
	STRETCH,
	START,
	END,
	CENTER,
	SPACE_BETWEEN,
	SPACE_AROUND,
	SPACE_EVENLY
}

export enum FlexDirection {
	ROW,
	COLUMN
};

export enum Direction {
	VERTICAL,
	HORIZONTAL
};

export class OldLayout {
	flexDirection: FlexDirection = FlexDirection.COLUMN;
	justifyContent: Alignment = Alignment.START;
	alignItems: Alignment = Alignment.START;

	getMainAxisAlignment (): Alignment {
		return this.justifyContent;
	}

	getCrossAxisAlignment (): Alignment {
		return this.alignItems;
	}

	getDirection(): Direction {
		return this.flexDirection === FlexDirection.COLUMN ? 
			Direction.VERTICAL : Direction.HORIZONTAL;
	}
}
