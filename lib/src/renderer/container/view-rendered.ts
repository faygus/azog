export class ViewRendered {
	private rendering: HTMLElement[] = [];

	constructor(public view: any) {

	}

	clear(): void {
		for (const e of this.rendering) {
			e.remove();
		}
		this.rendering = [];
	}

	add(element: HTMLElement): void {
		this.rendering.push(element);
	}

	getLastElement(): HTMLElement | undefined {
		if (!this.rendering.length) {
			return undefined;
		}
		if (this.rendering.length) {
			return this.rendering[this.rendering.length - 1];
		}
	}
}
