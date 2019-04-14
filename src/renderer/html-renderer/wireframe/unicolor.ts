import { IconWF } from "../../../builder/entities/controls/wireframe/icon";
import { DynamicViewModel } from "../../dynamic-view-model";
import { watchViewProperty } from "../binding-resolver";
import { BaseRenderer } from "../base-renderer";
import { WireframeSize } from "../../../builder/entities/controls/wireframe/enums/size";
import { WireframeColor } from "../../../builder/entities/controls/wireframe/enums/color";
import { WireframeSizeConverter } from "./converters/size";
import { WireframeColorConverter } from "./converters/color";
import { UniColorWF } from "../../../builder/entities/controls/wireframe/uniColor";

export class UniColorWFRenderer extends BaseRenderer<UniColorWF> {
	build(view: UniColorWF, viewModel?: DynamicViewModel): HTMLElement {
		const res = document.createElement('div');
		if (view.color) {
			watchViewProperty(view.color, viewModel, (value) => {
				res.style.background = new WireframeColorConverter().convert(value);
			});
		}
		return res;
	}
}
