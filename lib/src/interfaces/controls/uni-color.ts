import { IValueProviderJSON } from "../value-provider";
import { IColorJSON } from "../utils/color";

export interface IUniColorViewJSON {
	color: IValueProviderJSON<IColorJSON>;
}
