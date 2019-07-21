import { Container } from "../../models/views/container";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { FlexDirection } from "../../models/views/old-layout";
import { Host } from "../../models/views/host";
import { IfDirective } from "../../models/views/directives/if-directive";
import { ForDirective } from "../../models/views/directives/for-directive";
import { IfDirectiveRenderer } from "../if-directive";
import { IComponentOrHostBuilder } from "../interfaces/component-builder";
import { ForDirectiveRenderer } from "../for-directive";
import { ContainerContentRendered } from "./container-content-rendered";

// Deprecated
export class ContainerRenderer {

	constructor(private _componentBuilder: IComponentOrHostBuilder) {
	}

	build(container: Container, viewModel?: DynamicViewModel): HTMLDivElement {
		const containerContentRendered = new ContainerContentRendered(container);
		const containerDiv = document.createElement('div');
		containerDiv.style.height = '100%';
		containerDiv.style.width = '100%';
		containerDiv.style.display = 'flex';
		containerDiv.style.flexDirection = this.convertFlexDirectionForHtml(container.layoutManager.flexDirection);
		containerContentRendered.containerDiv = containerDiv;
		// children
		for (const child of container.children) {
			if (child instanceof Host) {
				let childDiv = this._componentBuilder.build(child, viewModel);
				containerContentRendered.add(child, childDiv);
			} else if (child instanceof IfDirective) {
				this.handleIfDirective(child, containerContentRendered);
			} else if (child instanceof ForDirective) {
				this.handleForDirective(child, containerContentRendered, viewModel);
			}
		}
		return containerDiv;
	}

	private handleIfDirective(directive: IfDirective,
		containerContentRendered: ContainerContentRendered,
		viewModel?: DynamicViewModel): void {
		const viewInserter = {
			add: (element: HTMLElement) => {
				containerContentRendered.add(directive, element);
			},
			clear: () => {
				containerContentRendered.remove(directive);
			}
		};
		const renderer = new IfDirectiveRenderer(directive, viewInserter,
			this._componentBuilder, viewModel);
		renderer.run();
	}

	private handleForDirective(directive: ForDirective,
		containerContentRendered: ContainerContentRendered,
		viewModel?: DynamicViewModel): void {
		const viewInserter = {
			add: (element: HTMLElement) => {
				containerContentRendered.add(directive, element);
			},
			clear: () => {
				containerContentRendered.remove(directive);
			}
		};
		const renderer = new ForDirectiveRenderer(directive, this._componentBuilder,
			viewInserter, viewModel);
		renderer.run();
	}

	private convertFlexDirectionForHtml(direction: FlexDirection): string {
		const map = {
			[FlexDirection.ROW]: 'row',
			[FlexDirection.COLUMN]: 'column'
		};
		return map[direction];
	}
}
