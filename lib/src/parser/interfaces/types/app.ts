import { IMockViewModelJSON } from "../mock-view-model";
import { IViewModelInterfaceJSON } from "../view-model";
import { IViewAnyDeclarationJSON } from "./view-types";

export type IAppJSON = {
	views: { [id: number]: IViewAnyDeclarationJSON },
	viewModelInterfaces?: { [id: number]: IViewModelInterfaceJSON },
	mockViewModels?: { [id: number]: IMockViewModelJSON }
}
