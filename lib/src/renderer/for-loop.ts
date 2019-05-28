import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IViewInserter } from "./interfaces/view-inserter";
import { DynamicViewModel } from "./view-model/dynamic-view-model";
import { ForLoopView } from "../entities/for-loop";
import { watchViewProperty } from "./binding-resolver";
import { ExtensibleContainer } from "../entities/layout-composition";
import { applySize } from "./utils/apply-size";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { ContainerContentRendered } from "./container/container-content-rendered";
import { IParentView } from "./interfaces/parent-view";
import { CustomDynamicViewModel } from "./view-model/custom-dynamic-view-model";
import { IValueProviders } from "../entities/component";
import { Binding } from "../entities/controls/binding";

export class ForLoopRenderer implements IBaseRenderer2<ForLoopView> {

	constructor(private _componentRenderer: IComponentRenderer2) {
	}

	build(view: ForLoopView, inserter: IViewInserter, viewModel?: DynamicViewModel): void {
		const contentManager = new ContentManager(view.container, inserter);
		contentManager.render();
		watchViewProperty(view.array, viewModel, values => {
			contentManager.removeAll(); // remove existing children before add new
			for (const value of values) {
				const childComponent = view.template.component;
				const childViewModel = this.extendViewModel(value, childComponent.inputs, viewModel);
				const childInserter = contentManager.getNewChildInserter();
				const parentView: IParentView = {
					...childInserter,
					setPadding: (value) => {
						// TODO
					},
					centerContent: () => {
						// TODO
					}
				}
				this._componentRenderer.build(childComponent, parentView, childViewModel);
			}
		});
	}

	private extendViewModel(data: any, inputs: IValueProviders, viewModel?: DynamicViewModel): CustomDynamicViewModel {
		const res = new CustomDynamicViewModel(viewModel);
		for (const inputName in inputs) {
			const input = inputs[inputName];
			res.addInput({
				name: inputName,
				type: 'any' // TODO
			});
			if (isBinding(input.src) &&
				input.src.propertyName === 'elementInArray') {
				res.changeInput(inputName, data);
			}
			// TODO watch parent props
		}
		return res;
	}
}

function isBinding(data: any): data is Binding {
	return (<Binding>data).propertyName !== undefined;
}

/**
 * can dynamically change the content of a container
 */
export interface IContentManager {
	render(): void;
	removeAll(): void;
	getNewChildInserter(data: any): IViewInserter;
	hostElement: HTMLElement | undefined;
}

export class ContentManager implements IContentManager {
	private _contentRenderer: ContainerContentRendered;
	private _freeId = 0;

	constructor(private _layoutHost: ExtensibleContainer, private _viewInserter: IViewInserter) {
		this._contentRenderer = new ContainerContentRendered();
	}

	render(): void {
		const divHtml = this.createAncestorElementHtml();
		this._contentRenderer.containerDiv = divHtml;
		this._viewInserter.add(divHtml);
	}

	removeAll(): void {
		this._contentRenderer.clear();
	}

	getNewChildInserter(): IViewInserter {
		if (!this.hostElement) {
			throw new Error('the container must be rendered first');
		}
		const isFirstChild = this._contentRenderer.isEmpty;
		const id = ++this._freeId;
		this._contentRenderer.setChild(id);
		const res: IViewInserter = {
			add: (elementHtml: HTMLElement) => {
				applySize(this._layoutHost.size, elementHtml.style, this._layoutHost.direction);
				if (!isFirstChild) { // apply margin
					const margin = this._layoutHost.margin + 'px';
					if (this._layoutHost.direction === 'row') {
						elementHtml.style.marginLeft = margin;
					} else {
						elementHtml.style.marginTop = margin;
					}
				}
				this._contentRenderer.add(id, elementHtml);
			},
			clear: () => {
				this._contentRenderer.remove(id);
			}
		};
		return res;
	}

	get hostElement(): HTMLElement | undefined {
		return this._contentRenderer.containerDiv;
	}

	private createAncestorElementHtml(): HTMLElement {
		const divHtml = document.createElement('div');
		divHtml.style.height = '100%';
		divHtml.style.display = 'flex';
		divHtml.style.flexDirection = this._layoutHost.direction === 'row' ? 'row' : 'column';
		return divHtml;
	}
}
