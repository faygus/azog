import { Component } from "../../entities/component";
import { Host } from "../../entities/host";
import { DynamicViewModel } from "../view-model/dynamic-view-model";

// Deprecated
export interface IComponentOrHostBuilder {
	build(a: Component<any> | Host, parentViewModel?: DynamicViewModel): HTMLElement;
}
