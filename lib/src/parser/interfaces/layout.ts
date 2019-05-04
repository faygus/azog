import { ILayoutChildJSON } from "./layout-child/layout-child";
import { IfLayoutChildJSON } from "./layout-child/if-host";

export interface ILayoutJSON {
	direction: 'row' | 'column';
	children: LayoutChildJSON[];
}

type LayoutChildJSON = ILayoutChildJSON | IfLayoutChildJSON;
