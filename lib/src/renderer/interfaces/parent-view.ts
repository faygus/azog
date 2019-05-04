import { IViewInserter } from "./view-inserter";

export interface IParentView extends IViewInserter {
	setPadding(value: number): void;
}
