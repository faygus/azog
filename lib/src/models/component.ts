import { IViewModelInterface } from "./data/view-model";
import { IMockDataSource } from "./data/mock-data-source";
import { ValueProvider } from "./views/controls/binding";

export class Component<T> {
	viewModelInterface?: IViewModelInterface;
	view: T;
	mockViewModel?: IMockDataSource;
	inputs: IValueProviders = {};
	
	constructor(view: T) {
		this.view = view;
	}
}

export type IValueProviders = {[name: string]: ValueProvider<any>};
