import { Component } from "../../../parser/entities/component";
import { Host } from "../../../parser/entities/host";
import { DynamicViewModel } from "../../dynamic-view-model";

// Deprecated
export interface IComponentOrHostBuilder {
	build(a: Component | Host, parentViewModel?: DynamicViewModel): HTMLElement;
}
