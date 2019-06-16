import { IValueProviderJSON } from "./value-provider";

export interface IIconWFViewJSON {
	iconName: IValueProviderJSON<number>;
	style?: {
		color: IValueProviderJSON<number>,
		size: IValueProviderJSON<number>
	}
}
