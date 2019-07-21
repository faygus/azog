import { RouterView } from "../models/views/router";
import { watchViewProperty } from "./binding-resolver";
import { DynamicViewModel } from "./view-model/dynamic-view-model";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { IParentView } from "./interfaces/parent-view";
import { getDefaultParentView } from "./utils/get-default-parent-view";

export class RouterRenderer implements IBaseRenderer2<RouterView> {

	constructor(private _componentRenderer: IComponentRenderer2) {
	}

	build(view: RouterView, inserter: IParentView, viewModel?: DynamicViewModel): void {
		watchViewProperty(view.activeRoute, viewModel, value => {
			const componentToDisplayedInfo = view.routes[value];
			const component = componentToDisplayedInfo.component;
			const inputs = componentToDisplayedInfo.inputs; // TODO use these inputs
			const contentInserter: IParentView = getDefaultParentView();
			contentInserter.add = (element: HTMLElement, fullHeight) => {
				inserter.clear();
				inserter.add(element, fullHeight);
			};
			contentInserter.clear = () => {
				inserter.clear();
			};
			contentInserter.centerContent = (h, v) => {
				inserter.centerContent(h, v);
			}
			this._componentRenderer.build(component, contentInserter);
		});
	}
}
