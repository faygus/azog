import { ValueProviderJSON } from "./value-provider";

export interface ILabelWFJSON {
	text: ValueProviderJSON<string>,
	style?: {
		color: ValueProviderJSON<number>,
		size: ValueProviderJSON<number>
	}
}

export interface ILabelWFDeclaration {
	type: 'labelWF';
	value: ILabelWFJSON;
}
