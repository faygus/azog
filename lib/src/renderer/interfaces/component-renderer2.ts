import { Component } from "../../parser/entities/component";
import { DynamicViewModel } from "../dynamic-view-model";
import { IParentView } from "./parent-view";

export interface IComponentRenderer2 {
	build(view: Component, inserter: IParentView, viewModel?: DynamicViewModel): void;
}
