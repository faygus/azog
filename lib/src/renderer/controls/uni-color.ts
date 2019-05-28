import { UniColorView } from "../../entities/controls/uni-color";
import { watchViewProperty } from "../binding-resolver";
import { IBaseRenderer2 } from "../interfaces/base-renderer2";
import { IViewInserter } from "../interfaces/view-inserter";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { ColorConverter } from "../converters/color";

export class UniColorRenderer implements IBaseRenderer2<UniColorView> {
	build(view: UniColorView, inserter: IViewInserter, viewModel?: DynamicViewModel): void {
		const res = document.createElement('div');
		res.style.height = '100%';
		if (view.color) {
			watchViewProperty(view.color, viewModel, (value) => {
				res.style.background = new ColorConverter().convert(value);
			});
		} else {
			console.error('no color defined for UniColorView');
		}
		inserter.add(res);
	}
}
