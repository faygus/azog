import { RouterView } from "../../parser/entities/router";
import { DynamicViewModel } from "../dynamic-view-model";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IComponentRenderer } from "./interfaces/component-renderer";
import { IViewInserter } from "./interfaces/view-inserter";
import { watchViewProperty } from "./binding-resolver";

export class RouterRenderer implements IBaseRenderer2<RouterView> {

	constructor(private _componentRenderer: IComponentRenderer) {
	}

	build(view: RouterView, inserter: IViewInserter, viewModel?: DynamicViewModel): void {
		watchViewProperty(view.activeRoute, viewModel, value => {
			const componentToDisplayedInfo = view.routes[value];
			const component = componentToDisplayedInfo.component;
			const inputs = componentToDisplayedInfo.inputs; // TODO use these inputs
			const componentHtml = this._componentRenderer.build(component);
			componentHtml.style.height = '100%';
			inserter.remove();
			inserter.add(componentHtml);
		});
	}
}
