import { Component } from "../entities/component";
import { IMockDataSource } from "../entities/data/mock-data-source";
import { IViewModelInterface } from "../entities/data/view-model";
import { IAppJSON, IViewAnyDeclarationJSON } from "../interfaces/app";
import { ViewType } from "../interfaces/types";
import { iconWFParser } from "./parsers/icon-wf";
import { labelWFParser } from "./parsers/label-wf";
import { layersParser } from "./parsers/layers";
import { GetView } from "./parsers/type";
import { uniColorWFParser } from "./parsers/uni-color-wf";
import { ViewModelParsing } from "./view-model";
import { IViewModelInterfaceJSON } from "../interfaces/view-model";
import { IMockViewModelJSON } from "../interfaces/mock-view-model";
import { routerParser } from "./parsers/router";
import { forLoopParser } from "./parsers/for-loop";

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
		const parser = map[viewDeclarationJSON.type];
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

const map: { [key: string]: any } = { // TODO parser type
	[ViewType.LABEL_WF]: labelWFParser,
	[ViewType.ICON_WF]: iconWFParser,
	[ViewType.UNI_COLOR_WF]: uniColorWFParser,
	[ViewType.LAYERS]: layersParser,
	[ViewType.ROUTER]: routerParser,
	[ViewType.FOR_LOOP]: forLoopParser,
};

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
