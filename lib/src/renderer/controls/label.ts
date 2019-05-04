import { LabelView } from "../../parser/entities/controls/label";
import { DynamicViewModel } from "../dynamic-view-model";
import { watchViewProperty } from "../binding-resolver";
import { BaseRenderer } from "../base-renderer";

export class LabelRenderer extends BaseRenderer<LabelView> {
	build(label: LabelView, viewModel?: DynamicViewModel): HTMLElement {
		const htmlWrapper = document.createElement('div');
		htmlWrapper.style.display = 'flex';
		htmlWrapper.style.flexDirection = 'column';
		htmlWrapper.style.justifyContent = 'center';
		htmlWrapper.style.alignItems = 'center';
		// htmlWrapper.style.height = '100%';
		const htmlLabel = document.createElement('p');
		const handler = (value: string) => {
			htmlLabel.innerText = value;
		};
		if (label.text) {
			watchViewProperty(label.text, viewModel, handler);
		}
		htmlLabel.style.margin = '0px';
		htmlWrapper.appendChild(htmlLabel);
		return htmlWrapper;
	}
}
