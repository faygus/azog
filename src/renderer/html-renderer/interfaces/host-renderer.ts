import { Host } from "../../../builder/entities/host";
import { DynamicViewModel } from "../../dynamic-view-model";

export interface IHostRenderer {
	build(view: Host, parentViewModel?: DynamicViewModel): HTMLElement;
}
