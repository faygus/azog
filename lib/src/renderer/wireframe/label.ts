import { LabelWFView } from "../../entities/controls/wireframe/label";
import { watchViewProperty } from "../binding-resolver";
import { IBaseRenderer2 } from "../interfaces/base-renderer2";
import { IParentView } from "../interfaces/parent-view";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { WireframeColorConverter } from "./converters/color";
import { WireframeSizeConverter } from "./converters/size";

export class LabelWFRenderer implements IBaseRenderer2<LabelWFView> {
	build(label: LabelWFView, inserter: IParentView, viewModel?: DynamicViewModel): void {
		const htmlWrapper = document.createElement('div');
		htmlWrapper.style.display = 'flex';
		htmlWrapper.style.flexDirection = 'column';
		htmlWrapper.style.justifyContent = 'center';
		htmlWrapper.style.alignItems = 'center';
		htmlWrapper.style.height = '100%';
		const htmlLabel = document.createElement('p');
		if (label.style.size !== undefined) {
			watchViewProperty(label.style.size, viewModel, (value) => {
				htmlLabel.style.fontSize = new WireframeSizeConverter().convert(value);
			});
		}
		if (label.style.color !== undefined) {
			watchViewProperty(label.style.color, viewModel, (value) => {
				htmlLabel.style.color = new WireframeColorConverter().convert(value);
			});
		}
		const handler = (value: string) => {
			htmlLabel.innerText = value;
		};
		if (label.text) {
			watchViewProperty(label.text, viewModel, handler);
		}
		htmlLabel.style.margin = '0px';
		htmlWrapper.appendChild(htmlLabel);
		inserter.centerContent(true, true);
		inserter.add(htmlWrapper, false);
	}
}
