import { iconWFParser } from "../parser/code-analyse/parsers/icon-wf";
import { IIconWFViewJSON } from "../parser/interfaces/icon-wf";
import { IconWFRenderer } from "../renderer/wireframe/icon";
import { TestTools } from "./tools/tools";

/**
 * Icon
 */
export function run(): void {
	const iconViewJSON: IIconWFViewJSON = {
		iconName: 'calendar',
		style: {
			size: 2,
			color: 1
		}
	};
	const iconView = iconWFParser(iconViewJSON);
	const renderer = new IconWFRenderer();
	const inserter = TestTools.getRootViewInserter();
	renderer.build(iconView, inserter);
}
