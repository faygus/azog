import { LabelView } from "../../builder/entities/controls/label";
import { DynamicViewModel } from "../dynamic-view-model";
import { watchViewProperty } from "./binding-resolver";
import { BaseRenderer } from "./base-renderer";
import { ViewComposition } from "../../builder/entities/view-composition";
import { IComponentRenderer } from "./interfaces/component-renderer";
import { Host } from "../../builder/entities/host";
import { Container } from "../../builder/entities/container";

export class ViewCompositionRenderer extends BaseRenderer<ViewComposition> {

	constructor(private _componentRenderer: IComponentRenderer) {
		super();
	}

	build(view: ViewComposition, viewModel?: DynamicViewModel): HTMLElement {
		const hostComponent = view.hostComponent!;
		const content = view.content!;
		// We suppose that it is a container
		const container = <Container>hostComponent.view;
		const host = container.children.find((host) => {
			if (host instanceof Host) {
				return host.hostContent === 'default';
			}
			return false;
		});
		if (host && host instanceof Host) {
			host.child = content;
		}
		const htmlWrapper = this._componentRenderer.build(hostComponent, viewModel);
		return htmlWrapper; // TODO

		/*const htmlWrapper = document.createElement('div');
		htmlWrapper.style.height = '100%';
		htmlWrapper.style.background = 'blue';
		return htmlWrapper;*/
	}
}
