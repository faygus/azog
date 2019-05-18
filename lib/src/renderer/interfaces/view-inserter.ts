export interface IViewInserter {
	add(element: HTMLElement, style?: { [key: string]: string }): void;
	clear(): void;
	// TODO remove specific HTMLElement
}
