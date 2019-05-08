import { ViewRendered } from "./view-rendered";

export interface IParentView {
	children: any[];
}

/**
 * insert child views of a container at the right place
 */
export class ContainerContentRendered {
	containerDiv?: HTMLElement;
	private _views: ViewRendered[] = [];

	constructor(container?: IParentView) {
		if (container) {
			this.setChildren(container.children);
		}
	}

	clear(): void {
		for (const view of this._views) {
			view.clear();
		}
		this._views = [];
	}

	get isEmpty(): boolean {
		return this._views.length === 0;
	}

	setChildren(children: any[]): void {
		for (const child of children) {
			this.setChild(child);
		}
	}

	setChild(child: any): void {
		this._views.push(new ViewRendered(child));
	}

	add(anchor: any, element: HTMLElement): void {
		const viewRendered = this._views.find(v => v.view === anchor);
		if (!viewRendered) {
			throw new Error('can not add this element to the container');
		}
		let previousElement = viewRendered.getLastElement();
		if (!previousElement) {
			previousElement = this.findPreviousChildRendered(viewRendered);
		}
		if (previousElement) {
			previousElement.after(element);
		} else {
			this.containerDiv!.insertBefore(element, this.containerDiv!.firstChild);
		}
		viewRendered.add(element);
	}

	remove(view: any): void {
		const v = this._views.find(v => v.view === view);
		if (!v) {
			throw new Error();
		}
		v.clear();
	}

	private findPreviousChildRendered(viewRendered: ViewRendered): HTMLElement | undefined {
		const index = this._views.indexOf(viewRendered);
		for (let i = index - 1; i >= 0; i--) {
			const sibling = this._views[i];
			const elt = sibling.getLastElement();
			if (elt) {
				return elt;
			}
		}
		return undefined;
	}
}