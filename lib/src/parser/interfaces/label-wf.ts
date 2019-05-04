import { IValueProviderJSON } from "./value-provider";

export interface ILabelWFViewJSON {
	text: IValueProviderJSON<string>,
	style?: {
		color: IValueProviderJSON<number>,
		size: IValueProviderJSON<number>
	}
}
