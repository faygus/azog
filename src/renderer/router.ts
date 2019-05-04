import { RouterView } from "../parser/entities/router";
import { DynamicViewModel } from "./dynamic-view-model";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IViewInserter } from "./interfaces/view-inserter";
import { watchViewProperty } from "./binding-resolver";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { IParentView } from "./interfaces/parent-view";

export class RouterRenderer implements IBaseRenderer2<RouterView> {

	constructor(private _componentRenderer: IComponentRenderer2) {
	}

	build(view: RouterView, inserter: IParentView, viewModel?: DynamicViewModel): void {
		watchViewProperty(view.activeRoute, viewModel, value => {
			const componentToDisplayedInfo = view.routes[value];
			const component = componentToDisplayedInfo.component;
			const inputs = componentToDisplayedInfo.inputs; // TODO use these inputs
			const contentInserter: IParentView = {
				add: (element: HTMLElement) => {
					inserter.clear();
					inserter.add(element);
				},
				clear: () => {
					inserter.clear();
				},
				setPadding: (value: number) => {
					inserter.setPadding(value);
				}
			}
			this._componentRenderer.build(component, contentInserter);
		});
	}
}
