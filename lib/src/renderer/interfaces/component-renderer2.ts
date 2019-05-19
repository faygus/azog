import { Component } from "../../parser/entities/component";
import { DynamicViewModel } from "../view-model/dynamic-view-model";
import { IParentView } from "./parent-view";

export interface IComponentRenderer2 {
	build(view: Component<any>, inserter: IParentView, viewModel?: DynamicViewModel): void;
}
