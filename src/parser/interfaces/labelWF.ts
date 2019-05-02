import { IValueProviderJSON } from "./value-provider";

export interface ILabelWFJSON {
	text: IValueProviderJSON<string>,
	style?: {
		color: IValueProviderJSON<number>,
		size: IValueProviderJSON<number>
	}
}

export interface ILabelWFDeclaration {
	type: 'labelWF';
	value: ILabelWFJSON;
}
