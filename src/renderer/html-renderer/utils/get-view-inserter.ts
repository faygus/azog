import { IViewInserter } from "../interfaces/view-inserter";

export function getViewInserter(htmlElement: HTMLElement) {
	const inserter: IViewInserter = {
		add: (element: HTMLElement) => {
			htmlElement.appendChild(element);
		},
		remove: () => {
			while (htmlElement.lastChild) {
				htmlElement.lastChild.remove();
			}
		},
	};
	return inserter;
}
