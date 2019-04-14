import { ViewRendered } from "./view-rendered";
import { Container } from "../../../builder/entities/container";

/**
 * insert child views of a container at the right place
 */
export class ContainerContentRendered {
	private _views: ViewRendered[] = [];
	private _containerDiv?: HTMLDivElement;

	constructor(private _container: Container) {
		for (const child of _container.children) {
			this._views.push(new ViewRendered(child));
		}
	}

	add(anchor: any, element: HTMLElement): void {
		const viewRendered = this._views.find(v => v.view === anchor);
		if (!viewRendered) {
			throw new Error();
		}
		let previousElement = viewRendered.getLastElement();
		if (!previousElement) {
			previousElement = this.findPreviousChildRendered(viewRendered);
		}
		if (previousElement) {
			previousElement.after(element);
		} else {
			this._containerDiv!.insertBefore(element, this._containerDiv!.firstChild);
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

	set div(value: HTMLDivElement) {
		this._containerDiv = value;
	}
}