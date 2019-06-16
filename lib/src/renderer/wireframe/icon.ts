import { IconWFView } from "../../entities/controls/wireframe/icon";
import { watchViewProperty } from "../binding-resolver";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { IBaseRenderer2 } from "../interfaces/base-renderer2";
import { IViewInserter } from "../interfaces/view-inserter";
import { WireframeColorConverter } from "./converters/color";
import { WireframeSizeConverter } from "./converters/size";

export class IconWFRenderer implements IBaseRenderer2<IconWFView> {
	build(icon: IconWFView, inserter: IViewInserter, viewModel?: DynamicViewModel): void {
		const htmlWrapper = document.createElement('div');
		htmlWrapper.style.display = 'flex';
		htmlWrapper.style.flexDirection = 'column';
		htmlWrapper.style.justifyContent = 'center';
		htmlWrapper.style.alignItems = 'center';
		htmlWrapper.style.height = '100%';
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
		const handler = (iconIndex: number) => {
			const iconName = ICON_NAMES[iconIndex];
			htmlIcon.className = "fa fa-" + iconName;
		};
		if (icon.iconNameIndex) {
			watchViewProperty(icon.iconNameIndex, viewModel, handler);
		}
		htmlWrapper.appendChild(htmlIcon);
		inserter.add(htmlWrapper);
	}
}

const ICON_NAMES = [
	'calendar',
	'user',
	'female',
	'users',
	'dashboard'
]