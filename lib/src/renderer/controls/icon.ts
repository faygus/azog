import { IconView } from "../../parser/entities/controls/icon";
import { watchViewProperty } from "../binding-resolver";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { BaseRenderer } from "../base-renderer";

export class IconRenderer extends BaseRenderer<IconView> {
	build(icon: IconView, viewModel?: DynamicViewModel): HTMLElement {
		const htmlWrapper = document.createElement('div');
		htmlWrapper.style.display = 'flex';
		htmlWrapper.style.flexDirection = 'column';
		htmlWrapper.style.justifyContent = 'center';
		htmlWrapper.style.alignItems = 'center';
		// htmlWrapper.style.height = '100%';
		const htmlIcon = document.createElement('i');
		htmlIcon.style.fontSize = '25px'; // TODO
		htmlIcon.style.color = '#444'; // TODO
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
