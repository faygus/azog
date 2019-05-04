import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IViewInserter } from "./interfaces/view-inserter";
import { DynamicViewModel } from "./dynamic-view-model";
import { ForLoopView } from "../parser/entities/for-loop";
import { watchViewProperty } from "./binding-resolver";
import { LayoutComposition } from "../parser/entities/layout-composition";
import { applySize } from "./utils/apply-size";
import { IComponentRenderer } from "./interfaces/component-renderer";

export class ForLoopRenderer implements IBaseRenderer2<ForLoopView> {

	constructor(private _componentRenderer: IComponentRenderer,
		private _contentManagerProvider: IContentManagerProvider) {
	}

	build(view: ForLoopView, inserter: IViewInserter, viewModel?: DynamicViewModel): void {
		// TODO deal with viewModel
		const contentManager = this._contentManagerProvider.get(view.container, inserter);
		watchViewProperty(view.array, undefined, values => {
			contentManager.removeAll(); // remove existing children before add new
			const children: HTMLElement[] = []; // TODO use viewInserter instead
			for (const value of values) {
				const childHtml = this._componentRenderer.build(view.template.component);
				children.push(childHtml);
			}
			contentManager.updateChildren(children);
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
	removeAll(): void;
	updateChildren(children: any[]): void;
	getHostElement(): HTMLElement | undefined;
}

export class ContentManager implements IContentManager {
	private _elementHtml?: HTMLElement;
	private _children: any[] = [];

	constructor(private _layoutHost: LayoutComposition, private _viewInserter: IViewInserter) {
	}

	removeAll(): void {
		if (!this._elementHtml) {
			return;
		}
		while (this._elementHtml.lastChild) {
			this._elementHtml.lastChild.remove();
		}
		this._children = [];
	}

	updateChildren(children: any[]): void {
		let firstUpdate = false;
		if (!this._elementHtml) {
			this._elementHtml = this.createAncestorElementHtml();
			firstUpdate = true;
		}
		for (const child of children) {
			this.addChild(child);
		}
		if (firstUpdate) {
			this._viewInserter.add(this._elementHtml);
		}
	}

	getHostElement(): HTMLElement | undefined {
		return this._elementHtml;
	}

	private createAncestorElementHtml(): HTMLElement {
		const divHtml = document.createElement('div');
		divHtml.style.height = '100%';
		divHtml.style.backgroundColor = 'orange';
		divHtml.style.display = 'flex';
		divHtml.style.flexDirection = this._layoutHost.direction === 'row' ? 'row' : 'column';
		return divHtml;
	}

	private addChild(child: any): void {
		if (!this._elementHtml) {
			return;
		}
		const childHostHtml = document.createElement('div');
		applySize(this._layoutHost.size, childHostHtml.style, this._layoutHost.direction);
		if (this._children.length > 0) { // apply margin
			const margin = this._layoutHost.margin + 'px';
			if (this._layoutHost.direction === 'row') {
				childHostHtml.style.marginLeft = margin;
			} else {
				childHostHtml.style.marginTop = margin;
			}
		}
		// TODO add child inside the host (can be a router, ...)
		this._elementHtml.appendChild(childHostHtml);
		this._children.push(child);
	}
}
