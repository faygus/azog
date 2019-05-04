import { ISizeJSON } from "../container";

export interface ILayoutChildJSON {
	size: ISizeJSON;
	componentId?: number;
	inputs?: any; // TODO
}
