import { DynamicViewModel } from "../dynamic-view-model";
import { IfDirective } from "../../builder/entities/directives/if-directive";
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
		const directive = this._directive;
		const viewModel = this._viewModel;
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
		watchViewProperty(directive.input.condition, viewModel, handler);
	}

	private insert(): void {
		let element = this._componentBuilder.build(this._directive.template);
		this._viewInserter.add(element);
	}

	private remove(): void {
		this._viewInserter.remove();
	}
}
