import { Component } from "../../../parser/entities/component";
import { DynamicViewModel } from "../../dynamic-view-model";

export interface IComponentRenderer {
	build(view: Component, parentViewModel?: DynamicViewModel): HTMLElement;
}

export type RenderComponentInParentHtml = (component: Component, parentHtml: HTMLElement, viewModel?: DynamicViewModel) => void;
