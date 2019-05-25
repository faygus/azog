import { Parser } from "../../../lib/src/parser/code-analyse/main";
import { HTMLRenderer } from "../../../lib/src/renderer/main";
import appJSON from '../../../tests/json/image';
import { TestTools } from "../tools/tools";
import { ImagesResources } from "../../../lib/src/renderer/images-loader";

const image1 = require("../../../assets/images/nadal.jpg");
const image2 = require("../../../assets/images/federer.jpg");

export function run(): void {
	ImagesResources.registerImages({
		'nadal': image1,
		'federer': image2,
	});
	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
