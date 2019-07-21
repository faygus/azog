import { Component } from "../../models/component";
import { Host } from "../../models/views/host";
import { DynamicViewModel } from "../view-model/dynamic-view-model";

// Deprecated
export interface IComponentOrHostBuilder {
	build(a: Component<any> | Host, parentViewModel?: DynamicViewModel): HTMLElement;
}
