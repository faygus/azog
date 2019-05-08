import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IViewInserter } from "./interfaces/view-inserter";
import { DynamicViewModel } from "./dynamic-view-model";
import { ForLoopView } from "../parser/entities/for-loop";
import { watchViewProperty } from "./binding-resolver";
import { LayoutComposition } from "../parser/entities/layout-composition";
import { applySize } from "./utils/apply-size";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { ContainerContentRendered } from "./container/container-content-rendered";
import { IParentView } from "./interfaces/parent-view";

export class ForLoopRenderer implements IBaseRenderer2<ForLoopView> {

	constructor(private _componentRenderer: IComponentRenderer2,
		private _contentManagerProvider: IContentManagerProvider) {
	}

	build(view: ForLoopView, inserter: IViewInserter, viewModel?: DynamicViewModel): void {
		const contentManager = this._contentManagerProvider.get(view.container, inserter);
		contentManager.render();
		watchViewProperty(view.array, viewModel, values => {
			contentManager.removeAll(); // remove existing children before add new
			for (const value of values) {
				const childInserter = contentManager.getNewChildInserter(value);
				const parentView: IParentView = {
					...childInserter,
					setPadding: (value) => {
						// TODO
					}
				}
				this._componentRenderer.build(view.template.component, parentView);
			}
		});
	}
}

export interface IContentManagerProvider {
	get(container: any, inserter: IViewInserter): IContentManager;
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

	constructor(private _layoutHost: LayoutComposition, private _viewInserter: IViewInserter) {
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

	getNewChildInserter(data: any): IViewInserter {
		if (!this.hostElement) {
			throw new Error('the container must be rendered first');
		}
		const isFirstChild = this._contentRenderer.isEmpty;
		this._contentRenderer.setChild(data);
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
				this._contentRenderer.add(data, elementHtml);
			},
			clear: () => {
				this._contentRenderer.remove(data);
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
		divHtml.style.backgroundColor = 'orange';
		divHtml.style.display = 'flex';
		divHtml.style.flexDirection = this._layoutHost.direction === 'row' ? 'row' : 'column';
		return divHtml;
	}
}
