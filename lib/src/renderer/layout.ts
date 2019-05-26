import { IfLayoutChild, LayoutChild, LayoutView } from "../entities/layouts/layout";
import { watchViewProperty } from "./binding-resolver";
import { ContainerContentRendered } from "./container/container-content-rendered";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { IParentView } from "./interfaces/parent-view";
import { IViewInserter } from "./interfaces/view-inserter";
import { applySize } from "./utils/apply-size";
import { buildViewModel } from "./utils/build-view-model";
import { isRefComponent } from "./utils/component-infos-cast";
import { getDefaultParentView } from "./utils/get-default-parent-view";
import { DynamicViewModel } from "./view-model/dynamic-view-model";

/**
 * layout with static content
 */
export class LayoutRenderer implements IBaseRenderer2<LayoutView> {
	constructor(private _componentRenderer: IComponentRenderer2) {
	}

	build(data: LayoutView, inserter: IViewInserter, viewModel?: DynamicViewModel): void {
		const divHtml = document.createElement('div');
		divHtml.style.position = 'relative';
		divHtml.style.display = 'flex';
		divHtml.style.flexDirection = data.direction === 'row' ? 'row' : 'column';
		const contentManager = new ContainerContentRendered(data);
		contentManager.containerDiv = divHtml;
		// children
		for (const child of data.children) {
			if (child instanceof LayoutChild) {
				this.addChild(child, child, contentManager, data.direction, viewModel);
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
				this.addChild(data.child, data, contentManager, direction, viewModel);
			} else { // do not show
				contentManager.remove(data);
			}
		});
	}

	private addChild(child: LayoutChild,
		reference: LayoutChild | IfLayoutChild,
		contentManager: ContainerContentRendered,
		direction: 'row' | 'column',
		viewModel?: DynamicViewModel): void {

		const childHostHtml = document.createElement('div');
		childHostHtml.style.position = 'relative';
		applySize(child.size, childHostHtml.style, direction);
		contentManager.add(reference, childHostHtml);
		const childInserter: IParentView = getDefaultParentView();
		if (child.component && !isRefComponent(child.component)) {
			let childViewModel = buildViewModel(child.component, viewModel);
			Object.assign(childInserter, {
				add: (element: HTMLElement) => {
					childHostHtml.appendChild(element);
				},
				clear: () => {
					while (childHostHtml.lastChild) {
						childHostHtml.lastChild.remove();
					}
				}
			});
			this._componentRenderer.build(child.component, childInserter, childViewModel);
		}
	}
}
