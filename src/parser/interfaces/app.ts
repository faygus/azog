import { ViewTypeMap } from "./types";
import { IViewModelInterfaceJSON } from "./view-model";
import { IMockViewModelJSON } from "./mock-view-model";

export interface IViewDeclarationJSON<K extends keyof ViewTypeMap> {
	type: K;
	value: ViewTypeMap[K];
}

export type IViewAnyDeclarationJSON = IViewDeclarationJSON<keyof ViewTypeMap>; // warning this type
// allows using a type with a not matching value (for example {type: 'labelWF', value: {... icon})

export type IAppJSON = {
	views: { [id: number]: IViewAnyDeclarationJSON },
	viewModelInterfaces?: { [id: number]: IViewModelInterfaceJSON },
	mockViewModels?: { [id: number]: IMockViewModelJSON }
}
