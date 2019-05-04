import { IViewModelInterface } from "./data/view-model";
import { IMockDataSource } from "./data/mock-data-source";
import { ValueProvider } from "./controls/binding";

export class Component {
	viewModelInterface?: IViewModelInterface;
	view: any;
	mockViewModel?: IMockDataSource;
	inputs: IValueProviders = {};
}

export type IValueProviders = {[name: string]: ValueProvider<any>};
