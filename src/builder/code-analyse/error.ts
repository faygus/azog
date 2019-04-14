export enum ParsingErrorType {
	UNIT,
	SIZE,
	COMPONENT,
}

export class ParsingException extends Error {
	constructor(type: ParsingErrorType, value?: any) {
		let errorMessage = `Error when parsing ${ParsingErrorType[type]}`;
		if (value) {
			errorMessage += ' ' + JSON.stringify(value);
		}
		super(errorMessage);
	}
}
