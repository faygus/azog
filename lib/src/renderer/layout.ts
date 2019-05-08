import { IfLayoutChild, LayoutChild, LayoutView } from "../parser/entities/layout";
import { DynamicViewModel } from "./dynamic-view-model";
import { watchViewProperty } from "./binding-resolver";
import { ContainerContentRendered } from "./container/container-content-rendered";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { IViewInserter } from "./interfaces/view-inserter";
import { applySize } from "./utils/apply-size";
import { IParentView } from "./interfaces/parent-view";

/**
 * layout with static content
 */
export class LayoutRenderer implements IBaseRenderer2<LayoutView> {
	constructor(private _componentRenderer: IComponentRenderer2) {
	}

	build(data: LayoutView, inserter: IViewInserter, viewModel?: DynamicViewModel): void {
		const divHtml = document.createElement('div');
		divHtml.style.height = '100%';
		divHtml.style.backgroundColor = 'orange';
		divHtml.style.display = 'flex';
		divHtml.style.flexDirection = data.direction === 'row' ? 'row' : 'column';
		const contentManager = new ContainerContentRendered(data);
		contentManager.containerDiv = divHtml;
		// children
		for (const child of data.children) {
			if (child instanceof LayoutChild) {
				this.addChild(child, child, contentManager, data.direction);
			} else if (child instanceof IfLayoutChild) {
				this.handleIf(child, contentManager, data.direction, viewModel);
			}
		}
		inserter.add(divHtml);
	}

	private handleIf(data: IfLayoutChild,
		contentManager: ContainerContentRendered,
		direction: 'row' | 'column',
		viewModel?: DynamicViewModel): void {
		watchViewProperty(data.condition, viewModel, value => {
			if (value) { // show
				this.addChild(data.child, data, contentManager, direction);
			} else { // do not show
				contentManager.remove(data);
			}
		});
	}

	private addChild(child: LayoutChild,
		reference: LayoutChild | IfLayoutChild,
		contentManager: ContainerContentRendered,
		direction: 'row' | 'column'): void {
		if (child.component) {
			const childInserter: IParentView = {
				add: (element: HTMLElement) => {
					applySize(child.size, element.style, direction);
					contentManager.add(reference, element);
				},
				clear: () => {
					contentManager.remove(child);
				},
				setPadding: (value: number) => {
	
				}
			};
			this._componentRenderer.build(child.component, childInserter);
		} else {
			const childHtml = document.createElement('div');
			applySize(child.size, childHtml.style, direction);
			contentManager.add(reference, childHtml);
		}
	}
}
