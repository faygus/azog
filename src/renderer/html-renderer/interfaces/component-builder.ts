import { Component } from "../../../builder/entities/component";
import { Host } from "../../../builder/entities/host";
import { DynamicViewModel } from "../../dynamic-view-model";

export interface IComponentOrHostBuilder {
	build(a: Component | Host, parentViewModel?: DynamicViewModel): HTMLElement;
}
