import { LabelView } from "../parser/entities/controls/label";
import { DynamicViewModel } from "./dynamic-view-model";
import { watchViewProperty } from "./binding-resolver";
import { BaseRenderer } from "./base-renderer";
import { ViewComposition2 } from "../parser/entities/view-composition";
import { IComponentRenderer } from "./interfaces/component-renderer";
import { Host } from "../parser/entities/host";
import { Container } from "../parser/entities/container";
import { Container2, Direction, IfDirective, ContainerChild } from "../parser/entities/container2";
import { Unit } from "../parser/entities/unit";
import { Size } from "../parser/entities/size";
import { ViewModelCreator } from "./dynamic-view-model-creator";
import { ContainerContentRendered } from "./container/container-content-rendered";

export class ViewComposition2Renderer extends BaseRenderer<ViewComposition2> {

	constructor(private _componentRenderer: IComponentRenderer) {
		super();
	}

	build(view: ViewComposition2, viewModel?: DynamicViewModel): HTMLElement {
		const parentView = view.parentView;
		const children = view.children.map(childComponent => {
			return this._componentRenderer.build(childComponent); // TODO vm
		});
		let layoutViewModel: DynamicViewModel | undefined;
		if (parentView.viewModelInterface) {
			layoutViewModel = ViewModelCreator.createViewModel(parentView.viewModelInterface,
				parentView.mockViewModel,
				undefined, // TODO inputs
				undefined); // TODO parent vm
		}
		// We suppose that it is a container
		const res = renderContainer(parentView.view, children, layoutViewModel);
		return res;
	}
}

function renderContainer(container: Container2, children: HTMLElement[], viewModel?: DynamicViewModel): HTMLElement {
	const containerDiv = document.createElement('div');
	containerDiv.style.height = '100%';
	containerDiv.style.width = '100%';

	// flex
	containerDiv.style.display = 'flex';
	containerDiv.style.flexDirection = getFlexDirection(container.direction);

	let i = 0;
	const contentRendered = new ContainerContentRendered(container);
	contentRendered.div = containerDiv;
	for (const child of container.children) {
		const contentHtml = children[i];
		const space = child.spaceWithPrevious;
		const childHtml = document.createElement('div');
		applySize(child.size, childHtml.style, container.direction);
		if (i > 0) { // apply space
			const space = child.spaceWithPrevious + 'px';
			if (container.direction === Direction.ROW) {
				childHtml.style.marginLeft = space;
			} else { // column
				childHtml.style.marginTop = space;
			}
		}
		contentHtml.style.height = '100%';
		childHtml.appendChild(contentHtml);
		if (child.directive) {
			if (child.directive instanceof IfDirective) {
				handleIfDirective(child, child.directive, childHtml, contentRendered, viewModel);
			}
		} else {
			contentRendered.add(child, childHtml);
		}
		// TODO if and repeat directive
		i++;
	}
	return containerDiv;
}

function handleIfDirective(child: ContainerChild, directive: IfDirective,
	childHtml: HTMLElement,
	contentRendered: ContainerContentRendered,
	viewModel?: DynamicViewModel): void {
	watchViewProperty(directive.condition, viewModel, value => {
		if (value) {
			contentRendered.add(child, childHtml);
		} else {
			contentRendered.remove(child);
		}
	});
}

function getFlexDirection(direction: Direction): string {
	const map = {
		[Direction.ROW]: 'row',
		[Direction.COLUMN]: 'column'
	};
	return map[direction];
}

function getUnit(unit: Unit): string {
	const map = {
		[Unit.POURCENTAGE]: '%',
		[Unit.PX]: 'px'
	};
	return map[unit];
}

function applySize(size: Size, htmlStyle: any, direction: Direction): void {
	if (typeof size === 'object') {
		const unitStr = getUnit(size.unit);
		const sizeString = size.value + unitStr;
		if (direction === Direction.ROW) {
			htmlStyle.width = sizeString;
			htmlStyle.minWidth = sizeString;
		} else { // column
			htmlStyle.height = sizeString;
			htmlStyle.minHeight = sizeString;
		}
	} else {
		if (size === 'full') {
			htmlStyle.flex = '1';
		}
	}
}
