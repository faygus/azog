import { IconWFView } from "../../../parser/entities/controls/wireframe/icon";
import { DynamicViewModel } from "../../dynamic-view-model";
import { watchViewProperty } from "../binding-resolver";
import { BaseRenderer } from "../base-renderer";
import { WireframeSize } from "../../../parser/entities/controls/wireframe/enums/size";
import { WireframeColor } from "../../../parser/entities/controls/wireframe/enums/color";
import { WireframeSizeConverter } from "./converters/size";
import { WireframeColorConverter } from "./converters/color";

export class IconWFRenderer extends BaseRenderer<IconWFView> {
	build(icon: IconWFView, viewModel?: DynamicViewModel): HTMLElement {
		const htmlWrapper = document.createElement('div');
		htmlWrapper.style.display = 'flex';
		htmlWrapper.style.flexDirection = 'column';
		htmlWrapper.style.justifyContent = 'center';
		htmlWrapper.style.alignItems = 'center';
		// htmlWrapper.style.height = '100%';
		const htmlIcon = document.createElement('i');
		if (icon.style.size !== undefined) {
			watchViewProperty(icon.style.size, viewModel, (value) => {
				htmlIcon.style.fontSize = new WireframeSizeConverter().convert(value);
			});
		}
		if (icon.style.color !== undefined) {
			watchViewProperty(icon.style.color, viewModel, (value) => {
				htmlIcon.style.color = new WireframeColorConverter().convert(value);
			});
		}
		const handler = (iconName: string) => {
			htmlIcon.className = "fa fa-" + iconName;
		};
		if (icon.iconName) {
			watchViewProperty(icon.iconName, viewModel, handler);
		}
		htmlWrapper.appendChild(htmlIcon);
		return htmlWrapper;
	}
}
