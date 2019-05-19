import { DynamicViewModel } from "./view-model/dynamic-view-model";

export abstract class BaseRenderer<T> {
	abstract build(control: T, viewModel?: DynamicViewModel): HTMLElement;
}
