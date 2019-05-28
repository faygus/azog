import { IUniColorViewJSON } from "../../../lib/src/interfaces/controls/uni-color";
import { uniColorParser } from "../../../lib/src/parsing/parsers/uni-color";
import { UniColorRenderer } from "../../../lib/src/renderer/controls/uni-color";
import { TestTools } from "../tools/tools";

/**
 * Icon
 */
export function run(): void {
	const data: IUniColorViewJSON = {
		color: {
			red: 20,
			green: 200,
			blue: 100
		}
	};
	const view = uniColorParser(data);
	const renderer = new UniColorRenderer();
	const inserter = TestTools.getRootViewInserter();
	renderer.build(view, inserter);
}
