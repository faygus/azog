
import { DynamicViewModel } from "../dynamic-view-model";
import { ForDirective } from "../../builder/entities/directives/for-directive";
import { watchViewProperty } from "./binding-resolver";
import { CustomDynamicViewModel } from "./dynamic-view-model-creator";
import { IComponentOrHostBuilder } from "./interfaces/component-builder";
import { IViewInserter } from "./interfaces/view-inserter";

/**
 * responsible of insert/remove the component when needed
 */
export class ForDirectiveRenderer {

	constructor(private _directive: ForDirective,
		private _componentBuilder: IComponentOrHostBuilder,
		private _viewInserter: IViewInserter,
		private _viewModel?: DynamicViewModel) {
	}

	run(): void {
		const directive = this._directive;
		const viewModel = this._viewModel;
		const handler = (list: any[]) => {
			this.insert(list);
		};
		watchViewProperty(directive.input.list, viewModel, handler);
	}

	private insert(list: any[]): void {
		this.removeAll(); // TODO optimisation
		for (const data of list) {
			const vm = this.extendViewModel(data);
			let element: HTMLElement = this._componentBuilder.build(this._directive.template, vm);
			this._viewInserter.add(element);
		}
	}

	private removeAll(): void {
		this._viewInserter.remove();
	}

	private extendViewModel(data: any): CustomDynamicViewModel {
		const res = new CustomDynamicViewModel();
		res.inputs = [...this._viewModel!.inputs];
		res.properties = [...this._viewModel!.properties];
		res.addProperty({
			name: 'item',
			type: 'any'
		});
		res.changeProperty('item', data)
		return res;
	}
}
