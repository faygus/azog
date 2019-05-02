import { DynamicViewModel } from "../../dynamic-view-model";
import { IViewInserter } from "./view-inserter";

export interface IBaseRenderer2<T> {
	build(control: T, inserter: IViewInserter, viewModel?: DynamicViewModel): void;
}
