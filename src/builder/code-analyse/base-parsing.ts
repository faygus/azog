import { Container } from "../entities/container";
import { Host } from "../entities/host";
import { Component } from "../entities/component";
import { StructuralDirective } from "../entities/directives/structural-directive";
import { IfDirective } from "../entities/directives/if-directive";
import { ForDirective } from "../entities/directives/for-directive";
import { ValueProvider } from "../entities/controls/binding";
import { ParsingUtils } from "./utils";
import { LabelView } from "../entities/controls/label";
import { IconView } from "../entities/controls/icon";
import { ViewModelParsing } from "./view-model";
import { parseValueProvider } from "./value-provider";
import { LabelWF } from "../entities/controls/wireframe/label";
import { IconWF } from "../entities/controls/wireframe/icon";
import { ViewComposition } from "../entities/view-composition";
import { RouterDirective } from "../entities/directives/router-directive";

export class BaseParsing {
	constructor(protected _componentCollection: IComponentCollection) {

	}

	getContainer(container: any): Container {
		const res = new Container();
		res.layoutManager.flexDirection = ParsingUtils.getDirection(container.direction); // TODO make value dynamic
		// TODO main and cross alignment
		for (const child of container.children) {
			if (child.structuralDirective) {
				const structuralDirective = this.getStructuralDirective(child);
				res.addChild(structuralDirective);
				// TODO
			} else {
				const host = this.getHost(child);
				res.addChild(host);
			}
		}
		return res;
	}

	getHost(host: any): Host {
		const res = new Host();
		if (host.width !== undefined) {
			res.width = ParsingUtils.getSize(host.width);
		}
		if (host.height !== undefined) {
			res.height = ParsingUtils.getSize(host.height);
		}
		if (host.hostContent) {
			res.hostContent = 'default'; // TODO
		} else if (host.child) {
			if (host.child.structuralDirective) {
				const structuralDirective = this.getStructuralDirective(host.child);
				res.child = structuralDirective;
			} else {
				let componentId: number;
				let inputs = [];
				if (typeof host.child === 'number') {
					componentId = host.child;
				} else {
					componentId = host.child.id;
					// TODO inputs
					for (const inputName in host.child.inputs) {
						inputs.push({
							name: inputName,
							value: parseValueProvider(host.child.inputs[inputName])
						});
					}
				}
				if (componentId === undefined) {
					throw new Error('component id undefined');
				}
				const component = this.getView(componentId);
				// TODO inputs
				for (const input of inputs) {
					component.inputs[input.name] = input.value;
				}
				res.child = component;
			}
		}
		return res;
	}

	getView(componentId: number): Component {
		const componentJSON = this._componentCollection.views.get(componentId);
		if (!componentJSON) {
			throw new Error('No component with id ' + componentId);
			// throw new ParsingException(ParsingErrorType.COMPONENT);
		}
		const res = new Component();
		const viewModelJSON = this._componentCollection.viewModels.get(componentId);
		res.viewModelInterface = ViewModelParsing.getViewModel(viewModelJSON);
		const mockDataJSON = this._componentCollection.viewMockData.get(componentId);
		res.mockData = ViewModelParsing.getMockData(mockDataJSON);
		switch (componentJSON.type) {
			case 'structuralDirective':
				const view = this.getStructuralDirective2(componentJSON);
				res.view = view;
				return res;
			case 'viewComposition':
				const viewComposition = this.getViewComposition(componentJSON.value);
				res.view = viewComposition;
				return res;
			case 'layout':
				const container = this.getContainer(componentJSON.value);
				res.view = container;
				return res;
			case 'label':
				const labelView = new LabelView();
				if (componentJSON.value && componentJSON.value.text) {
					labelView.text = parseValueProvider(componentJSON.value.text);
				}
				res.view = labelView;
				return res;
			case 'icon':
				const iconView = new IconView();
				if (componentJSON.value && componentJSON.value.iconName) {
					iconView.iconName = parseValueProvider(componentJSON.value.iconName);
				}
				res.view = iconView;
				return res;
			case 'labelWF':
				const labelWFView = new LabelWF();
				if (componentJSON.value && componentJSON.value.text) {
					labelWFView.text = parseValueProvider(componentJSON.value.text);
					if (componentJSON.value.style) {
						if (componentJSON.value.style.color) {
							labelWFView.style.color = parseValueProvider(componentJSON.value.style.color);
						}
						if (componentJSON.value.style.size) {
							labelWFView.style.size = parseValueProvider(componentJSON.value.style.size);
						}
					}
				}
				res.view = labelWFView;
				return res;
			case 'iconWF':
				const iconWFView = new IconWF();
				if (componentJSON.value && componentJSON.value.iconName) {
					iconWFView.iconName = parseValueProvider(componentJSON.value.iconName);
					iconWFView.style.color = parseValueProvider(componentJSON.value.style.color);
					iconWFView.style.size = parseValueProvider(componentJSON.value.style.size);
				}
				res.view = iconWFView;
				return res;
			default:
				return res;
		}
	}

	// TODO update
	private getStructuralDirective(data: any): StructuralDirective {
		let template = data.template;
		if (data.template.componentId) {
			template = this.getView(data.template.componentId);
		} else { // template is host
			template = this.getHost(data.template);
		}
		if (data.structuralDirective === 'if') {
			const condition = parseValueProvider<boolean>(data.data.condition);
			const res = new IfDirective(condition, template);
			return res;
		} else if (data.structuralDirective === 'for') {
			const list: ValueProvider<any[]> = parseValueProvider(data.data.list);
			const res = new ForDirective(list, template);
			return res;
		}
		throw new Error(`structural directive ${data.structuralDirective} not known`);
	}

	private getStructuralDirective2(data: any): StructuralDirective {
		const getTemplate = () => {
			let template = data.value.template;
			if (template.componentId) {
				template = this.getView(template.componentId);
			} else { // template is host
				template = this.getHost(template);
			}
			return template;
		};
		switch (data.structuralDirective) {
			case 'router':
				return this.getRouterDirective(data.value);
				break;
			case 'if':
				const condition = parseValueProvider<boolean>(data.value.data.condition);
				return new IfDirective(condition, getTemplate());
			case 'for':
				const list: ValueProvider<any[]> = parseValueProvider(data.value.data.list);
				return new ForDirective(list, getTemplate());
		}
		throw new Error(`structural directive ${data.structuralDirective} not known`);
	}

	private getRouterDirective(data: any): RouterDirective {
		const routesJSON: { [key: string]: { componentId: number } } = data.data.routes;
		const routes: { [key: string]: Component } = {};
		for (const route in routesJSON) {
			const param = routesJSON[route];
			const component = this.getView(param.componentId);
			routes[route] = component;
		}
		const activatedRoute = parseValueProvider<string>(data.data.activatedRoute);
		const res = new RouterDirective(routes, activatedRoute);
		return res;
	}

	private getViewComposition(data: any): ViewComposition {
		const res = new ViewComposition();
		res.hostComponent = this.getView(data.hostComponentId);
		res.content = this.getView(data.content);
		return res;
	}
}

export interface IComponentCollection {
	views: IDataSource;
	viewModels: IDataSource;
	viewMockData: IDataSource;
}

interface IDataSource {
	get(id: number): any;
}

export class ComponentCollectionBuiler implements IComponentCollection {
	private _views: { [key: number]: any };
	private _viewModels?: { [key: number]: any };
	private _viewMockData?: { [key: number]: any };

	constructor(views: { [key: number]: any },
		viewModels?: { [key: number]: any },
		viewMockData?: { [key: number]: any }) { // TODO viewModels, viewMockData
		this._views = views;
		this._viewModels = viewModels;
		this._viewMockData = viewMockData;
	}

	get views(): IDataSource {
		return {
			get: (id: number) => {
				return this._views[id];
			}
		}
	}

	get viewModels(): IDataSource {
		return {
			get: (id: number) => {
				if (!this._viewModels) return null;
				return this._viewModels[id];
			}
		}
	}

	get viewMockData(): IDataSource {
		return {
			get: (id: number) => {
				if (!this._viewMockData) return null;
				return this._viewMockData[id];
			}
		}
	}
}
