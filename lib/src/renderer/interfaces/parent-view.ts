import { IViewInserter } from "./view-inserter";

export type Padding = { top: string, right: string, bottom: string, left: string };
export interface IParentView extends IViewInserter {
	setPadding(value: number | Padding): void;
	centerContent(horizontaly: boolean, verticaly: boolean): void;
}
