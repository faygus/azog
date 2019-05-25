
import { DynamicViewModel } from "./view-model/dynamic-view-model";
import { ForDirective } from "../entities/directives/for-directive";
import { watchViewProperty } from "./binding-resolver";
import { IComponentOrHostBuilder } from "./interfaces/component-builder";
import { IViewInserter } from "./interfaces/view-inserter";
import { CustomDynamicViewModel } from "./view-model/custom-dynamic-view-model";

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
		this._viewInserter.clear();
	}

	private extendViewModel(data: any): CustomDynamicViewModel {
		const res = new CustomDynamicViewModel();
		/*res._inputs = [...this._viewModel!.getInputs()];
		res._properties = [...this._viewModel!.getProperties()];*/
		res.addProperty({
			name: 'item',
			type: 'any'
		});
		res.changeProperty('item', data)
		return res;
	}
}
