import { IValueProviderJSON } from "./value-provider";

export interface IIconWFViewJSON {
	iconName: IValueProviderJSON<string>;
	style?: {
		color: IValueProviderJSON<number>,
		size: IValueProviderJSON<number>
	}
}
