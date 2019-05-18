import { TestTools } from "../tools/tools";
import { IImageViewJSON } from "../../../lib/src/parser/interfaces/image";
import { imageParser } from "../../../lib/src/parser/code-analyse/parsers/image";
import { ImageRenderer } from "../../../lib/src/renderer/controls/image";
const image = require("../../../assets/images/nadal.jpg");

/**
 * Image
 */
export function run(): void {
	const dataJSON: IImageViewJSON = {
		src: image
	};
	const view = imageParser(dataJSON);
	const renderer = new ImageRenderer();
	const inserter = TestTools.getRootViewInserter();
	renderer.build(view, inserter);
}
