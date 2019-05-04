import { IValueProviderJSON } from "../value-provider";
import { ILayoutChildJSON } from "./layout-child";

export interface IfLayoutChildJSON {
	if: IValueProviderJSON<boolean>;
	host: ILayoutChildJSON;
}
