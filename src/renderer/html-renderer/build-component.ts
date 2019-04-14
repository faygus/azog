import { Component } from "../../builder/entities/component";
import { DynamicViewModel } from "../dynamic-view-model";
import { ViewModelCreator } from "./dynamic-view-model-creator";
import { LabelView } from "../../builder/entities/controls/label";
import { IconView } from "../../builder/entities/controls/icon";
import { Container } from "../../builder/entities/container";
import { IfDirective } from "../../builder/entities/directives/if-directive";
import { Host } from "../../builder/entities/host";
import { Unit } from "../../builder/entities/unit";
import { IfDirectiveRenderer } from "./if-directive";
import { ForDirective } from "../../builder/entities/directives/for-directive";
import { IViewInserter } from "./interfaces/view-inserter";
import { BaseRenderer } from "./base-renderer";
import { LabelRenderer } from "./controls/label";
import { IconRenderer } from "./controls/icon";
import { IconWF } from "../../builder/entities/controls/wireframe/icon";
import { IconWFRenderer } from "./wireframe/icon";
import { LabelWFRenderer } from "./wireframe/label";
import { LabelWF } from "../../builder/entities/controls/wireframe/label";
import { parseValueProvider } from "../../builder/code-analyse/value-provider";
import { ViewComposition } from "../../builder/entities/view-composition";
import { RendererProvider } from "./renderer-provider";
import { IComponentRenderer } from "./interfaces/component-renderer";
import { IHostRenderer } from "./interfaces/host-renderer";
import { StructuralDirective } from "../../builder/entities/directives/structural-directive";
import { RouterDirective } from "../../builder/entities/directives/router-directive";
import { watchViewProperty } from "./binding-resolver";

const componentRenderer: IComponentRenderer = {
	build: (view: Component, viewModel?: DynamicViewModel) => {
		return buildComponent(view, viewModel);
	}
}

const hostRenderer: IHostRenderer = {
	build: (view: Host, viewModel?: DynamicViewModel) => {
		return buildHost(view, viewModel);
	}
}

const rendererProvider = new RendererProvider(componentRenderer, hostRenderer);

export function renderComponent(component: Component, parentHtml: HTMLElement, viewModel?: DynamicViewModel): void;
export function renderComponent(component: Component, viewInserter: IViewInserter, viewModel?: DynamicViewModel): void;
export function renderComponent(component: Component, insertion: HTMLElement | IViewInserter, viewModel?: DynamicViewModel): void {
	console.log('renderComponent', component);
	let viewInserter2: IViewInserter;
	if (insertion instanceof HTMLElement) {
		viewInserter2 = {
			add: (element: HTMLElement) => {
				insertion.appendChild(element);
			},
			remove: () => {
				while (insertion.lastChild) {
					insertion.lastChild.remove();
				}
			}
		}
	} else {
		viewInserter2 = insertion;
	}
	if (component.view instanceof StructuralDirective) {
		let parentViewModel = viewModel;
		let dynamicViewModel = getViewModel(component, parentViewModel);
		if (component.view instanceof IfDirective) {
			handleIfDirective(component.view, viewInserter2, dynamicViewModel);
		} else if (component.view instanceof RouterDirective) {
			handleRouterDirective(component.view, viewInserter2, dynamicViewModel);
		}
	} else {
		const div = buildComponent(component, viewModel);
		viewInserter2.add(div);
	}
}

export function buildComponent(component: Component | undefined,
	parentViewModel?: DynamicViewModel): HTMLElement {
	let res: HTMLElement | undefined = undefined;
	if (component) {
		let dynamicViewModel = getViewModel(component, parentViewModel);
		res = renderControl(component.view, dynamicViewModel);
	}
	if (!res) {
		// no component defined, so we show a default label
		const label = new LabelView();
		label.text = parseValueProvider('component');
		const labelRenderer = rendererProvider.getControlRenderer(LabelRenderer);
		res = labelRenderer!.build(label);
	}
	return res;
}

function getViewModel(component: Component, parentViewModel?: DynamicViewModel): DynamicViewModel | undefined {
	let dynamicViewModel: DynamicViewModel | undefined;
	if (component.viewModelInterface) {
		dynamicViewModel = ViewModelCreator.createViewModel(component.viewModelInterface,
			component.mockData,
			component.inputs,
			parentViewModel);
	}
	return dynamicViewModel;
}

export function buildHost(host: Host, viewModel?: DynamicViewModel): HTMLDivElement {
	const div = document.createElement('div');
	const width = host.width;
	if (width) {
		if (typeof width === 'object') {
			const unitStr = getUnit(width.unit);
			const widthString = width.value + unitStr;
			div.style.width = widthString;
		} else {
			if (width === 'full') {
				div.style.flex = '1';
			}
		}
	}
	const height = host.height;
	if (height) {
		if (typeof height === 'object') {
			div.style.height = height.value + getUnit(height.unit);
		} else {
			if (height === 'full') {
				div.style.flex = '1';
			}
		}
	}
	if (host.child) {
		if (host.child instanceof Component) {
			renderComponent(host.child, div, viewModel);
		} else {
			const directive = host.child;
			if (directive instanceof IfDirective) {
				const viewInserter: IViewInserter = {
					add: (element: HTMLElement) => {
						div.appendChild(element);
					},
					remove: () => {
						while (div.lastChild) {
							div.lastChild.remove();
						}
					}
				};
				handleIfDirective(directive, viewInserter, viewModel);
			} else if (directive instanceof ForDirective) {
				// Est ce que l'on peut vraiment avoir un for dans un host ?
			}
		}
	} else if (host.hostContent) {
		// TODO
		console.warn('host content not rendered yet');
	}
	return div;
}

function handleIfDirective(directive: IfDirective, viewInserter: IViewInserter,
	viewModel?: DynamicViewModel): void {
	const renderer = new IfDirectiveRenderer(directive, viewInserter,
		rendererProvider.getComponentOrHostRenderer(), viewModel);
	renderer.run();
}

function handleRouterDirective(directive: RouterDirective, viewInserter: IViewInserter,
	viewModel?: DynamicViewModel): void {
	console.log('handleRouterDirective', directive);
	const handler = (value: string) => {
		const component = directive.routes[value];
		if (!component) {
			throw new Error('no handler for route ' + value);
		}
		const htmlElement = rendererProvider.getComponentRenderer().build(component);
		viewInserter.remove();
		viewInserter.add(htmlElement);
	};
	watchViewProperty(directive.activatedRoute, viewModel, handler);
}

function getUnit(unit: Unit): string {
	const map = {
		[Unit.POURCENTAGE]: '%',
		[Unit.PX]: 'px'
	};
	return map[unit];
}

function renderControl(control: any, viewModel?: DynamicViewModel): HTMLElement | undefined {
	let renderer: BaseRenderer<any> | undefined;
	if (control instanceof ViewComposition) {
		renderer = rendererProvider.getViewCompositionRenderer();
	} else if (control instanceof LabelView) {
		renderer = rendererProvider.getControlRenderer(LabelRenderer);
	} else if (control instanceof IconView) {
		renderer = rendererProvider.getControlRenderer(IconRenderer);
	} else if (control instanceof Container) {
		renderer = rendererProvider.getContainerRenderer();
	} else if (control instanceof IconWF) {
		renderer = rendererProvider.getControlRenderer(IconWFRenderer);
	} else if (control instanceof LabelWF) {
		renderer = rendererProvider.getControlRenderer(LabelWFRenderer);
	}
	if (renderer) {
		return renderer.build(control, viewModel);
	} else {
		return undefined;
	}
}
