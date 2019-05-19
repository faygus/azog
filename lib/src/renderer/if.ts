import { ConditionalView } from "../parser/entities/if";
import { watchViewProperty } from "./binding-resolver";
import { DynamicViewModel } from "./view-model/dynamic-view-model";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { IParentView } from "./interfaces/parent-view";

export class ConditionalViewRenderer implements IBaseRenderer2<ConditionalView> {

	constructor(private _componentRenderer: IComponentRenderer2) {
	}

	build(view: ConditionalView, inserter: IParentView, viewModel?: DynamicViewModel): void {
		watchViewProperty(view.condition, viewModel, value => {
			if (value) {
				this._componentRenderer.build(view.template.component, inserter); // TODO child viewModel
			} else {
				inserter.clear(); // TODO do not clear everything ?
			}
			// TODO inject value as input
		}
		);
	}
}
