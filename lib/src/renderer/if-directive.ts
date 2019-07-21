import { DynamicViewModel } from "./view-model/dynamic-view-model";
import { IfDirective } from "../models/views/directives/if-directive";
import { watchViewProperty } from "./binding-resolver";
import { IComponentOrHostBuilder } from "./interfaces/component-builder";
import { IViewInserter } from "./interfaces/view-inserter";

/**
 * responsible of insert/remove the component when needed
 */
export class IfDirectiveRenderer {
	private _show = false;

	constructor(
		private _directive: IfDirective,
		private _viewInserter: IViewInserter,
		private _componentBuilder: IComponentOrHostBuilder,
		private _viewModel?: DynamicViewModel) {
	}

	run(): void {
		const handler = (value: boolean) => {
			if (value === this._show) {
				return;
			}
			if (value) {
				this.insert();
			} else {
				this.remove();
			}
			this._show = value;
		}
		watchViewProperty(this._directive.input.condition, this._viewModel, handler);
	}

	private insert(): void {
		let element = this._componentBuilder.build(this._directive.template);
		this._viewInserter.add(element);
	}

	private remove(): void {
		this._viewInserter.clear();
	}
}
