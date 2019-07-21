import { Host } from "../../models/views/host";
import { DynamicViewModel } from "../view-model/dynamic-view-model";

export interface IHostRenderer {
	build(view: Host, parentViewModel?: DynamicViewModel): HTMLElement;
}
