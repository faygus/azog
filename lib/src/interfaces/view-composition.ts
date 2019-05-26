import { IComponentInfosJSON } from "./utils/component-infos";

export interface IViewCompositionJSON {
	hostId: number,
	children: { [key: string]: IComponentInfosJSON };
}
