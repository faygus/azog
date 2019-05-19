export interface IViewInserter {
	add(element: HTMLElement, fullHeight?: boolean): void;
	clear(): void;
	// TODO remove specific HTMLElement
}
