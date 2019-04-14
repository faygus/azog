import { DynamicViewModel } from "../dynamic-view-model";

export abstract class BaseRenderer<T> {
	abstract build(control: T, viewModel?: DynamicViewModel): HTMLElement;
}
