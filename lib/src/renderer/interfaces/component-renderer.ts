import { Component } from "../../models/component";
import { DynamicViewModel } from "../view-model/dynamic-view-model";

export interface IComponentRenderer {
	build(view: Component<any>, parentViewModel?: DynamicViewModel): HTMLElement;
}

export type RenderComponentInParentHtml = (component: Component<any>, parentHtml: HTMLElement, viewModel?: DynamicViewModel) => void;
