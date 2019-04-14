import { Component } from "../../../builder/entities/component";
import { DynamicViewModel } from "../../dynamic-view-model";

export interface IComponentRenderer {
	build(view: Component, parentViewModel?: DynamicViewModel): HTMLElement;
}
