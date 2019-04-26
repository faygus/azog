import { ValueProviderJSON } from "./value-provider";

export interface IIconWFJSON {
	iconName: ValueProviderJSON<string>;
	style?: {
		color: ValueProviderJSON<number>,
		size: ValueProviderJSON<number>
	}
}

export interface IIconWFDeclaration {
	type: 'iconWF';
	value: IIconWFJSON;
}
