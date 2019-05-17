import { UniColorWFView } from "../../parser/entities/controls/wireframe/uniColor";
import { BaseRenderer } from "../base-renderer";
import { watchViewProperty } from "../binding-resolver";
import { DynamicViewModel } from "../dynamic-view-model";
import { WireframeColorConverter } from "./converters/color";
import { IBaseRenderer2 } from "../interfaces/base-renderer2";
import { IViewInserter } from "../interfaces/view-inserter";

export class UniColorWFRenderer implements IBaseRenderer2<UniColorWFView> {
	build(view: UniColorWFView, inserter: IViewInserter, viewModel?: DynamicViewModel): void {
		const res = document.createElement('div');
		// res.style.height = '100%';
		if (view.color) {
			watchViewProperty(view.color, viewModel, (value) => {
				res.style.background = new WireframeColorConverter().convert(value);
			});
		}
		inserter.add(res);
	}
}
