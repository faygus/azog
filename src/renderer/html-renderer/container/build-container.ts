import { Container } from "../../../builder/entities/container";
import { DynamicViewModel } from "../../dynamic-view-model";
import { FlexDirection } from "../../../builder/entities/layout";
import { Host } from "../../../builder/entities/host";
import { IfDirective } from "../../../builder/entities/directives/if-directive";
import { ForDirective } from "../../../builder/entities/directives/for-directive";
import { IfDirectiveRenderer } from "../if-directive";
import { IComponentOrHostBuilder } from "../interfaces/component-builder";
import { ForDirectiveRenderer } from "../for-directive";
import { ContainerContentRendered } from "./container-content-rendered";

export class ContainerRenderer {

	constructor(private _componentBuilder: IComponentOrHostBuilder) {
	}

	build(container: Container, viewModel?: DynamicViewModel): HTMLDivElement {
		const containerContentRendered = new ContainerContentRendered(container);
		const containerDiv = document.createElement('div');
		containerDiv.style.height = '100%';
		containerDiv.style.width = '100%';
		//containerDiv.style.backgroundColor = 'red';

		// flex
		containerDiv.style.display = 'flex';
		containerDiv.style.flexDirection = this.getFlexDirection(container.layoutManager.flexDirection);
		containerContentRendered.div = containerDiv;

		let i = 0;
		for (const child of container.children) {
			if (child instanceof Host) {
				let childDiv = this._componentBuilder.build(child, viewModel);
				const color1 = '#bebebe';
				const color2 = '#ccc';
				// childDiv.style.backgroundColor = i % 2 === 0 ? color1 : color2;
				containerContentRendered.add(child, childDiv);
			} else {
				if (child instanceof IfDirective) {
					this.handleIfDirective(child, containerContentRendered);
				} else if (child instanceof ForDirective) {
					this.handleForDirective(child, containerContentRendered, viewModel);
				}
			}
			i++;
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
			remove: () => {
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
			remove: () => {
				containerContentRendered.remove(directive);
			}
		};
		const renderer = new ForDirectiveRenderer(directive, this._componentBuilder,
			viewInserter, viewModel);
		renderer.run();
	}

	private getFlexDirection(direction: FlexDirection): string {
		const map = {
			[FlexDirection.ROW]: 'row',
			[FlexDirection.COLUMN]: 'column'
		};
		return map[direction];
	}
}
