import { parseValueProvider } from "../parser/code-analyse/value-provider";
import { Component } from "../parser/entities/component";
import { Container } from "../parser/entities/container";
import { IconView } from "../parser/entities/controls/icon";
import { LabelView } from "../parser/entities/controls/label";
import { IconWFView } from "../parser/entities/controls/wireframe/icon";
import { LabelWFView } from "../parser/entities/controls/wireframe/label";
import { UniColorWFView } from "../parser/entities/controls/wireframe/uniColor";
import { IfDirective } from "../parser/entities/directives/if-directive";
import { RouterDirective } from "../parser/entities/directives/router-directive";
import { StructuralDirective } from "../parser/entities/directives/structural-directive";
import { ViewComposition, ViewComposition2 } from "../parser/entities/view-composition";
import { BaseRenderer } from "./base-renderer";
import { watchViewProperty } from "./binding-resolver";
import { IconRenderer } from "./controls/icon";
import { LabelRenderer } from "./controls/label";
import { DynamicViewModel } from "./dynamic-view-model";
import { ViewModelCreator } from "./dynamic-view-model-creator";
import { HostRenderer } from "./host-renderer";
import { IfDirectiveRenderer } from "./if-directive";
import { IComponentRenderer } from "./interfaces/component-renderer";
import { IHostRenderer } from "./interfaces/host-renderer";
import { IParentView } from "./interfaces/parent-view";
import { IViewInserter } from "./interfaces/view-inserter";
import { RendererProvider } from "./renderer-provider";
import { ViewComposition2Renderer } from "./view-composition2";
import { IconWFRenderer } from "./wireframe/icon";
import { LabelWFRenderer } from "./wireframe/label";
import { UniColorWFRenderer } from "./wireframe/unicolor";

const componentRenderer: IComponentRenderer = {
	build: (view: Component, viewModel?: DynamicViewModel) => {
		return buildComponent(view, viewModel);
	}
}

const hostRenderer: IHostRenderer = new HostRenderer(componentRenderer, renderComponentInParentHtml);

const rendererProvider = new RendererProvider(componentRenderer, hostRenderer);

function renderComponent(component: Component, parentView: IParentView, viewModel?: DynamicViewModel): void {
	console.log('renderComponent', component);
	if (component.view instanceof StructuralDirective) {
		let parentViewModel = viewModel;
		let dynamicViewModel = getViewModel(component, parentViewModel);
		if (component.view instanceof IfDirective) {
			handleIfDirective(component.view, parentView, dynamicViewModel);
		} else if (component.view instanceof RouterDirective) {
			handleRouterDirective(component.view, parentView, dynamicViewModel);
		}
	} else {
		renderComponentNotDirective(component, parentView, viewModel);
	}
}

export function renderComponentInParentHtml(component: Component, parentHtml: HTMLElement, viewModel?: DynamicViewModel): void {
	let parentView: IParentView = {
		add: (element: HTMLElement) => {
			parentHtml.appendChild(element);
		},
		clear: () => {
			while (parentHtml.lastChild) {
				parentHtml.lastChild.remove();
			}
		},
		setPadding: (value: number) => {
			parentHtml.style.padding = value + 'px';
		}
	}
	renderComponent(component, parentView, viewModel);
}

function renderComponentNotDirective(component: Component | undefined, parentView: IParentView,
	parentViewModel?: DynamicViewModel): void {
	let rendered = false;
	if (component) {
		let dynamicViewModel = getViewModel(component, parentViewModel);
		rendered = renderView(component.view, parentView, dynamicViewModel);
	}
	if (!rendered) {
		// no component defined, so we show a default label
		const label = new LabelView();
		label.text = parseValueProvider('component');
		const labelRenderer = rendererProvider.getControlRenderer(LabelRenderer);
		const labelHtml = labelRenderer!.build(label);
		parentView.add(labelHtml);
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
			component.mockViewModel,
			component.inputs,
			parentViewModel);
	}
	return dynamicViewModel;
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
		viewInserter.clear();
		viewInserter.add(htmlElement);
	};
	watchViewProperty(directive.activatedRoute, viewModel, handler);
}

/**
 * return true if something is rendered
 */
function renderView(control: any, parentView: IParentView, viewModel?: DynamicViewModel): boolean {
	/*if (control instanceof LayersView) {
		const layersRenderer = new LayersRenderer(componentRenderer);
		layersRenderer.show(control, parentView, viewModel);
		return true;
	} else {*/ // TODO
	const elementHtml = renderControl(control, viewModel);
	if (elementHtml) {
		elementHtml.style.width = '100%';
		elementHtml.style.height = '100%';
		parentView.add(elementHtml);
		return true;
	}
	// }
	return false;
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
	} else if (control instanceof IconWFView) {
		renderer = rendererProvider.getControlRenderer(IconWFRenderer);
	} else if (control instanceof LabelWFView) {
		renderer = rendererProvider.getControlRenderer(LabelWFRenderer);
	} else if (control instanceof UniColorWFView) {
		// renderer = new UniColorWFRenderer();
	} else if (control instanceof ViewComposition2) {
		const componentRenderer = rendererProvider.getComponentRenderer();
		renderer = new ViewComposition2Renderer(componentRenderer);
	}
	if (renderer) {
		return renderer.build(control, viewModel);
	} else {
		return undefined;
	}
}
