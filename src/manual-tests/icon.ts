import { iconWFParser } from "../../lib/src/parsing/parsers/icon-wf";
import { IIconWFViewJSON } from "../../lib/src/interfaces/icon-wf";
import { IconWFRenderer } from "../../lib/src/renderer/wireframe/icon";
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
