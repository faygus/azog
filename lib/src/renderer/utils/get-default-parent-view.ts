import { IParentView } from "../interfaces/parent-view";

export function getDefaultParentView(): IParentView {
	const res: IParentView = {
		add: (element: HTMLElement) => {
		},
		clear: () => {
		},
		setPadding: (value: number) => {
		},
		centerContent: (horizontaly: boolean, verticaly: boolean) => {

		}
	}
	return res;
}
