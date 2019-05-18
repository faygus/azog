import { Component } from "../entities/component";
import { IMockDataSource } from "../entities/data/mock-data-source";
import { IViewModelInterface } from "../entities/data/view-model";
import { IAppJSON, IViewAnyDeclarationJSON } from "../interfaces/app";
import { IMockViewModelJSON } from "../interfaces/mock-view-model";
import { IViewModelInterfaceJSON } from "../interfaces/view-model";
import { GetView } from "./parsers/type";
import { ViewModelParsing } from "./view-model";
import { parsersMap } from "../parsers-types";

export class Parser {
	private _componentsCollection: ComponentsCollection;

	constructor(appJSON: IAppJSON) {
		this._componentsCollection = new ComponentsCollection(appJSON);
	}

	parse(componentId: number): Component {
		const res = new Component();
		const viewModelInterface = this.parseViewModelInterface(componentId);
		if (viewModelInterface) {
			const mockViewModel = this.parseMockViewModel(componentId);
			res.viewModelInterface = viewModelInterface;
			res.mockViewModel = mockViewModel;
		}
		const viewDeclarationJSON = this._componentsCollection.views.get(componentId);
		if (!viewDeclarationJSON) {
			throw new Error(`component ${componentId} does not exist`);
		}
		const parser = parsersMap[viewDeclarationJSON.type];
		if (!parser) {
			throw new Error('no parser found for type ' + viewDeclarationJSON.type);
		}
		const getView: GetView = (id: number) => {
			return this.parse(id);
		};
		const view = parser(viewDeclarationJSON.value, getView); // TODO handle optionnal parameters
		res.view = view;
		return res;
	}

	private parseViewModelInterface(componentId: number): IViewModelInterface | undefined {
		const viewModelInterfaceJSON = this._componentsCollection.viewModels.get(componentId);
		if (!viewModelInterfaceJSON) {
			return undefined;
		}
		const res = ViewModelParsing.getViewModel(viewModelInterfaceJSON);
		return res;
	}

	private parseMockViewModel(componentId: number): IMockDataSource | undefined {
		const mockViewModelJSON = this._componentsCollection.viewMockData.get(componentId);
		if (!mockViewModelJSON) {
			return undefined;
		}
		const res = ViewModelParsing.getMockData(mockViewModelJSON);
		return res;
	}
}

interface IDataSource<T> {
	get(id: number): T | undefined;
}

class ComponentsCollection {

	constructor(private _appJSON: IAppJSON) {
	}

	get views(): IDataSource<IViewAnyDeclarationJSON> {
		return {
			get: (id: number) => {
				return this._appJSON.views[id];
			}
		}
	}

	get viewModels(): IDataSource<IViewModelInterfaceJSON> {
		return {
			get: (id: number) => {
				if (!this._appJSON.viewModelInterfaces) return undefined;
				return this._appJSON.viewModelInterfaces[id];
			}
		}
	}

	get viewMockData(): IDataSource<IMockViewModelJSON> {
		return {
			get: (id: number) => {
				if (!this._appJSON.mockViewModels) return undefined;
				return this._appJSON.mockViewModels[id];
			}
		}
	}
}
