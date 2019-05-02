import { IValueProviderJSON } from "./value-provider";

export interface IIconWFJSON {
	iconName: IValueProviderJSON<string>;
	style?: {
		color: IValueProviderJSON<number>,
		size: IValueProviderJSON<number>
	}
}

export interface IIconWFDeclaration {
	type: 'iconWF';
	value: IIconWFJSON;
}
