import { ViewTypeMap } from "./view-types";

export interface IViewDeclarationJSON<K extends keyof ViewTypeMap> {
	type: K;
	value: ViewTypeMap[K];
}
